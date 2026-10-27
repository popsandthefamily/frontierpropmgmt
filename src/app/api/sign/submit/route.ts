import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { centralWithUtc } from "@/lib/portal/format";
import { resolveSigner } from "@/lib/sign/resolve";
import { MANAGER_CONSENT, OWNER_CONSENT } from "@/lib/sign/page-data";
import {
  appendCertificate,
  burnSignature,
  sha256,
  type CertificateSigner,
  type PlacedField,
} from "@/lib/sign/burn";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Records one party's signature.
 *
 * Signatures are burned in as each party finishes, onto the copy the previous
 * signer left behind, and the certificate is appended only when the last of
 * them is done. That way the finished PDF describes a completed agreement
 * rather than carrying a certificate that was true halfway through.
 */
const MAX_IMAGE_CHARS = 2_000_000;
const MAX_TEXT_CHARS = 500;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const typedName = String(body?.signerName ?? "").trim();
  if (typedName.length < 2 || typedName.length > 200 || body?.consent !== true) {
    return NextResponse.json({ error: "Incomplete signature." }, { status: 400 });
  }

  const access = await resolveSigner({
    token: body.token,
    signerId: body.signerId,
    adminToken: body.adminToken,
  });
  if (!access.ok) {
    const messages: Record<string, string> = {
      not_found: "This signing link isn't valid.",
      expired: "This signing link has expired. Ask Frontier for a new one.",
      already_signed: "You've already signed this document.",
      void: "This signature request was cancelled.",
      forbidden: "You're not the signer this document was sent to.",
    };
    return NextResponse.json({ error: messages[access.reason] }, { status: 403 });
  }

  const signer = access.signer as Record<string, unknown> & {
    request: Record<string, unknown>;
  };
  const req = signer.request;
  const admin = getSupabaseAdmin();

  const { data: fields } = await admin
    .from("signature_fields")
    .select("*")
    .eq("signer_id", signer.id as string)
    .order("sort_order");

  // A drawn field has to be a drawing: the burner skips anything else, so a
  // "signature" of plain text would pass as complete and leave the box empty.
  const placed: (PlacedField & { id: string })[] = [];
  for (const f of fields ?? []) {
    const value = String(body.values?.[f.id] ?? "").trim();
    if (f.required && !value) {
      return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
    }
    if (!value) continue;
    const drawn = f.field_type === "signature" || f.field_type === "initials";
    if (drawn && (!value.startsWith("data:image/png;base64,") || value.length > MAX_IMAGE_CHARS)) {
      return NextResponse.json({ error: "Please draw your signature again." }, { status: 400 });
    }
    if (!drawn && value.length > MAX_TEXT_CHARS) {
      return NextResponse.json({ error: `"${f.label ?? "A field"}" is too long.` }, { status: 400 });
    }
    placed.push({ ...f, value });
  }

  if (req.status === "executed") {
    return NextResponse.json({ error: "This agreement has already been signed by everyone." }, { status: 409 });
  }

  const { data: doc } = await admin
    .from("owner_documents")
    .select("id, title, storage_path, owner_id")
    .eq("id", req.document_id as string)
    .single();

  // Build on whatever the previous signer left, or the original if first.
  const currentPath = (req.signed_storage_path as string) ?? doc!.storage_path;
  const expectedHash = (req.signed_storage_path ? req.signed_sha256 : req.source_sha256) as string | null;

  const { data: file } = await admin.storage.from("owner-documents").download(currentPath);
  if (!file) return NextResponse.json({ error: "Could not read the document." }, { status: 500 });
  const bytes = new Uint8Array(await file.arrayBuffer());

  // Refuse to sign something that changed since it was presented.
  if (expectedHash && sha256(bytes) !== expectedHash) {
    return NextResponse.json(
      { error: "This document changed after it was sent for signature. Contact Frontier." },
      { status: 409 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const now = new Date();
  // The wording comes from the server, never the browser: it is what the
  // certificate swears the signer agreed to.
  const consentText = signer.kind === "manager" ? MANAGER_CONSENT : OWNER_CONSENT;

  // Claim the signer. Conditional on not having signed, so a double click or a
  // second tab cannot record the same person twice.
  const { data: claimed, error: claimError } = await admin
    .from("signature_signers")
    .update({
      signed_at: now.toISOString(),
      typed_name: typedName,
      signer_ip: ip,
      signer_user_agent: userAgent,
      consent_at: now.toISOString(),
      consent_text: consentText,
    })
    .eq("id", signer.id as string)
    .is("signed_at", null)
    .select("id");
  if (claimError) {
    return NextResponse.json({ error: "Could not record the signature." }, { status: 500 });
  }
  if (!claimed || claimed.length === 0) {
    return NextResponse.json({ error: "You've already signed this document." }, { status: 409 });
  }

  // Undo the claim when anything after it fails, so the signer can try again
  // rather than being told they signed a document that never changed.
  const release = async (uploaded?: string) => {
    await admin
      .from("signature_signers")
      .update({
        signed_at: null,
        typed_name: null,
        signer_ip: null,
        signer_user_agent: null,
        consent_at: null,
        consent_text: null,
      })
      .eq("id", signer.id as string);
    if (uploaded) await admin.storage.from("owner-documents").remove([uploaded]);
  };

  // Completion is judged from the snapshot this signature is built on, not a
  // fresh count: another party mid-signature would otherwise count as done, and
  // the certificate would be appended to a copy missing their marks. The
  // compare-and-swap below makes the snapshot the truth or rejects the write.
  const completedBefore = Number(req.signers_completed ?? 0);
  const total = Number(req.signers_total ?? 0);
  const complete = total > 0 && completedBefore + 1 >= total;

  let output: Uint8Array;
  try {
    output = await burnSignature(bytes, placed);
    if (complete) {
      const { data: allSigners } = await admin
        .from("signature_signers")
        .select("*")
        .eq("request_id", req.id as string)
        .order("sort_order");
      output = await appendCertificate(output, {
        documentTitle: doc!.title,
        sourceSha256: (req.source_sha256 as string) ?? "",
        requestId: req.id as string,
        signers: (allSigners ?? []).map<CertificateSigner>((s) => ({
          name: s.name,
          typedName: s.typed_name ?? s.name,
          email: s.email ?? "",
          roleLabel: s.role_label ?? "Signer",
          signedAt: centralWithUtc(s.signed_at),
          ip: s.signer_ip ?? "unknown",
          userAgent: s.signer_user_agent ?? "unknown",
          consentText: s.consent_text ?? "",
          consentAt: centralWithUtc(s.consent_at),
        })),
      });
    }
  } catch {
    await release();
    return NextResponse.json({ error: "Could not apply the signature to the document." }, { status: 500 });
  }

  const outHash = sha256(output);
  const suffix = complete ? "executed" : "partial";
  const path = `${req.owner_id}/${crypto.randomUUID()}-${suffix}-${doc!.title.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 50)}.pdf`;
  const { error: upError } = await admin.storage
    .from("owner-documents")
    .upload(path, Buffer.from(output), { contentType: "application/pdf", upsert: false });
  if (upError) {
    await release();
    return NextResponse.json({ error: "Could not save the signed document." }, { status: 500 });
  }

  // Only move the request forward if nobody else did since this signer's copy
  // was read. Two parties signing at once would otherwise each burn onto the
  // same base, and the later save would erase the earlier signature.
  let swap = admin
    .from("signature_requests")
    .update({
      status: complete ? "executed" : "signed",
      signed_storage_path: path,
      signed_sha256: outHash,
      signers_completed: completedBefore + 1,
    })
    .eq("id", req.id as string)
    .neq("status", "void");
  swap = req.signed_sha256
    ? swap.eq("signed_sha256", req.signed_sha256 as string)
    : swap.is("signed_sha256", null);
  const { data: swapped, error: swapError } = await swap.select("id");
  if (swapError || !swapped || swapped.length === 0) {
    await release(path);
    return NextResponse.json(
      { error: "Someone else signed at the same moment. Reload the page and sign again." },
      { status: 409 },
    );
  }

  if (placed.length > 0) {
    const { error: valuesError } = await admin.from("signature_field_values").insert(
      placed.map((f) => ({
        request_id: req.id as string,
        field_id: f.id,
        signer_id: signer.id as string,
        value: f.value,
      })),
    );
    // The signature is already burned in and recorded; these rows are a
    // secondary copy of what was typed, so a failure is logged, not fatal.
    if (valuesError) console.error("signature_field_values insert failed", valuesError.message);
  }

  await admin.from("signature_events").insert({
    request_id: req.id as string,
    event_type: complete ? "executed" : "signed",
    ip,
    user_agent: userAgent,
    detail: { signer: signer.name, role: signer.role_label, sha256: outHash },
  });

  // The owner gets their copy only once every party is done: a partly signed
  // agreement handed over looks like the finished thing.
  if (complete) {
    const { error: copyError } = await admin.from("owner_documents").insert({
      owner_id: req.owner_id as string,
      title: `${doc!.title} — executed`,
      kind: "agreement",
      storage_path: path,
      mime_type: "application/pdf",
      size_bytes: output.byteLength,
      published_at: now.toISOString(),
    });
    if (copyError) console.error("executed copy insert failed", copyError.message);
  }

  return NextResponse.json({ ok: true, complete, remaining: Math.max(total - completedBefore - 1, 0) });
}
