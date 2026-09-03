import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { centralWithUtc } from "@/lib/portal/format";
import { resolveSigner } from "@/lib/sign/resolve";
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
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.signerName || body?.consent !== true) {
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

  const placed: PlacedField[] = [];
  for (const f of fields ?? []) {
    const value = String(body.values?.[f.id] ?? "");
    if (f.required && !value) {
      return NextResponse.json({ error: "Please complete every required field." }, { status: 400 });
    }
    if (value) placed.push({ ...f, value });
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
  const consentText = String(body.consentText ?? "");

  await admin
    .from("signature_signers")
    .update({
      signed_at: now.toISOString(),
      typed_name: String(body.signerName),
      signer_ip: ip,
      signer_user_agent: userAgent,
      consent_at: now.toISOString(),
      consent_text: consentText,
    })
    .eq("id", signer.id as string);

  if (placed.length > 0) {
    await admin.from("signature_field_values").insert(
      placed.map((f, i) => ({
        request_id: req.id as string,
        field_id: (fields ?? [])[i].id,
        signer_id: signer.id as string,
        value: f.value,
      })),
    );
  }

  let output = await burnSignature(bytes, placed);

  const { data: allSigners } = await admin
    .from("signature_signers")
    .select("*")
    .eq("request_id", req.id as string)
    .order("sort_order");
  const remaining = (allSigners ?? []).filter((s) => !s.signed_at);
  const complete = remaining.length === 0;

  if (complete) {
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

  const outHash = sha256(output);
  const suffix = complete ? "executed" : "partial";
  const path = `${req.owner_id}/${crypto.randomUUID()}-${suffix}-${doc!.title.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 50)}.pdf`;
  const { error: upError } = await admin.storage
    .from("owner-documents")
    .upload(path, Buffer.from(output), { contentType: "application/pdf", upsert: false });
  if (upError) {
    return NextResponse.json({ error: "Could not save the signed document." }, { status: 500 });
  }

  await admin
    .from("signature_requests")
    .update({
      status: complete ? "executed" : "signed",
      signed_storage_path: path,
      signed_sha256: outHash,
      signers_completed: (allSigners ?? []).filter((s) => s.signed_at).length,
    })
    .eq("id", req.id as string);

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
    await admin.from("owner_documents").insert({
      owner_id: req.owner_id as string,
      title: `${doc!.title} — executed`,
      kind: "agreement",
      storage_path: path,
      mime_type: "application/pdf",
      size_bytes: output.byteLength,
      published_at: now.toISOString(),
    });
  }

  return NextResponse.json({ ok: true, complete, remaining: remaining.length });
}
