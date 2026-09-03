import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { appendCertificate, burnSignature, sha256, type PlacedField } from "@/lib/sign/burn";

export const runtime = "nodejs";
export const maxDuration = 60;

const CONSENT_TEXT =
  "I agree to sign this document electronically, I intend my electronic signature to be my legally binding signature, and I agree that Frontier Property Management may deliver this and related records to me electronically.";

/**
 * Completes a signature.
 *
 * Identity comes from the session, never from the request body: the signer is
 * whoever is actually signed in, and the request must already belong to them or
 * row level security returns nothing. A signer therefore cannot sign on
 * somebody else's behalf by editing a payload.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.requestId || !body?.values || !body?.signerName || body?.consent !== true) {
    return NextResponse.json({ error: "Incomplete signature." }, { status: 400 });
  }

  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  // Read through RLS as the owner: this both finds the request and proves it
  // belongs to the person signing.
  const { data: req } = await supabase
    .from("signature_requests")
    .select("id, document_id, owner_id, status, source_sha256")
    .eq("id", body.requestId)
    .maybeSingle();
  if (!req) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (req.status === "signed") {
    return NextResponse.json({ error: "Already signed." }, { status: 409 });
  }

  const admin = getSupabaseAdmin();
  const { data: allFields } = await admin
    .from("signature_fields")
    .select("*")
    .eq("document_id", req.document_id)
    .order("sort_order");

  // The owner completes their own fields only. Frontier's are countersigned
  // afterwards, so requiring them here would block the owner entirely.
  const fields = (allFields ?? []).filter((f) => f.signer_role !== "manager");
  const managerFields = (allFields ?? []).filter((f) => f.signer_role === "manager");

  const placed: PlacedField[] = [];
  for (const f of fields ?? []) {
    const value = String(body.values[f.id] ?? "");
    if (f.required && !value) {
      return NextResponse.json(
        { error: `Please complete every required field.` },
        { status: 400 },
      );
    }
    if (value) placed.push({ ...f, value });
  }

  const { data: doc } = await admin
    .from("owner_documents")
    .select("id, title, storage_path, owner_id")
    .eq("id", req.document_id)
    .single();

  const { data: file, error: dlError } = await admin.storage
    .from("owner-documents")
    .download(doc!.storage_path);
  if (dlError || !file) {
    return NextResponse.json({ error: "Could not read the document." }, { status: 500 });
  }
  const sourceBytes = new Uint8Array(await file.arrayBuffer());

  // The document must be byte-identical to what was hashed when the signature
  // was requested. If it is not, something replaced the file and signing it
  // would attest to the wrong thing.
  const currentSha = sha256(sourceBytes);
  if (req.source_sha256 && req.source_sha256 !== currentSha) {
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

  // Burn the owner's marks now. The certificate is only appended when both
  // parties are done, so the finished PDF carries one complete record rather
  // than a certificate that was true halfway through.
  let output = await burnSignature(sourceBytes, placed);
  const awaitingCountersign = managerFields.length > 0;

  if (!awaitingCountersign) {
    output = await appendCertificate(output, {
      documentTitle: doc!.title,
      signerName: String(body.signerName),
      signerEmail: user.email ?? "",
      signedAt: now.toISOString(),
      ip,
      userAgent,
      consentText: CONSENT_TEXT,
      consentAt: now.toISOString(),
      sourceSha256: currentSha,
      requestId: req.id,
    });
  }

  const signedSha = sha256(output);
  const signedPath = `${req.owner_id}/${crypto.randomUUID()}-signed-${doc!.title.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60)}.pdf`;

  const { error: upError } = await admin.storage
    .from("owner-documents")
    .upload(signedPath, Buffer.from(output), { contentType: "application/pdf", upsert: false });
  if (upError) {
    return NextResponse.json({ error: "Could not save the signed document." }, { status: 500 });
  }

  await admin.from("signature_field_values").insert(
    placed.map((f, i) => ({
      request_id: req.id,
      field_id: fields[i].id,
      value: f.value,
      signer_role: "owner",
    })),
  );

  await admin
    .from("signature_requests")
    .update({
      status: awaitingCountersign ? "signed" : "executed",
      signed_at: now.toISOString(),
      signer_name: String(body.signerName),
      signer_email: user.email,
      signer_ip: ip,
      signer_user_agent: userAgent,
      consent_at: now.toISOString(),
      consent_text: CONSENT_TEXT,
      signed_storage_path: signedPath,
      signed_sha256: signedSha,
    })
    .eq("id", req.id);

  await admin.from("signature_events").insert([
    { request_id: req.id, event_type: "consented", ip, user_agent: userAgent, detail: { text: CONSENT_TEXT } },
    { request_id: req.id, event_type: "signed", ip, user_agent: userAgent, detail: { signed_sha256: signedSha } },
  ]);

  // Only file a copy to the owner once it is fully executed. Handing them a
  // half-signed agreement would look like the finished thing.
  if (!awaitingCountersign) {
    await admin.from("owner_documents").insert({
      owner_id: req.owner_id,
      title: `${doc!.title} — signed`,
      kind: "agreement",
      storage_path: signedPath,
      mime_type: "application/pdf",
      size_bytes: output.byteLength,
      published_at: now.toISOString(),
    });
  }

  return NextResponse.json({ ok: true, awaitingCountersign });
}
