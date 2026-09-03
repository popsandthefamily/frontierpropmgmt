import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getCurrentOwner } from "@/lib/supabase/server";
import { appendCertificate, burnSignature, sha256, type PlacedField } from "@/lib/sign/burn";

export const runtime = "nodejs";
export const maxDuration = 60;

const MANAGER_CONSENT =
  "I am authorised to sign on behalf of Frontier Property Management LLC, and I intend this electronic signature to be the company's legally binding signature on this agreement.";

/**
 * Frontier's countersignature, which executes the agreement.
 *
 * This burns onto the owner-signed copy rather than the blank original, so the
 * finished file carries both marks, and only now is the certificate appended:
 * it describes a completed agreement rather than one that was half done.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body?.requestId || !body?.signerName || body?.consent !== true) {
    return NextResponse.json({ error: "Incomplete signature." }, { status: 400 });
  }
  if (!(await isAdmin(body.token))) {
    return NextResponse.json({ error: "Not authorised." }, { status: 403 });
  }

  const admin = getSupabaseAdmin();
  const { data: req } = await admin
    .from("signature_requests")
    .select("*")
    .eq("id", body.requestId)
    .maybeSingle();
  if (!req) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (req.status !== "signed") {
    return NextResponse.json(
      { error: "This agreement isn't waiting for a countersignature." },
      { status: 409 },
    );
  }

  const { data: allFields } = await admin
    .from("signature_fields")
    .select("*")
    .eq("document_id", req.document_id)
    .order("sort_order");
  const managerFields = (allFields ?? []).filter((f) => f.signer_role === "manager");

  const placed: PlacedField[] = [];
  for (const f of managerFields) {
    const value = String(body.values?.[f.id] ?? "");
    if (f.required && !value) {
      return NextResponse.json({ error: "Please complete every field." }, { status: 400 });
    }
    if (value) placed.push({ ...f, value });
  }

  const { data: doc } = await admin
    .from("owner_documents")
    .select("id, title, owner_id")
    .eq("id", req.document_id)
    .single();

  // Start from the owner-signed copy and confirm it is untouched since.
  const { data: file } = await admin.storage
    .from("owner-documents")
    .download(req.signed_storage_path);
  if (!file) return NextResponse.json({ error: "Could not read the signed copy." }, { status: 500 });
  const ownerSigned = new Uint8Array(await file.arrayBuffer());
  if (req.signed_sha256 && sha256(ownerSigned) !== req.signed_sha256) {
    return NextResponse.json(
      { error: "The owner-signed copy changed after signing. Stopping." },
      { status: 409 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const now = new Date();
  const user = await getCurrentOwner();

  let output = await burnSignature(ownerSigned, placed);
  output = await appendCertificate(output, {
    documentTitle: doc!.title,
    signerName: `${req.signer_name} (Owner) and ${String(body.signerName)} (Frontier Property Management)`,
    signerEmail: `${req.signer_email ?? ""} / ${user?.email ?? ""}`,
    signedAt: `${req.signed_at} (owner), ${now.toISOString()} (Frontier)`,
    ip: `${req.signer_ip ?? "unknown"} (owner), ${ip} (Frontier)`,
    userAgent: `${req.signer_user_agent ?? "unknown"} (owner)`,
    consentText: `${req.consent_text ?? ""} / ${MANAGER_CONSENT}`,
    consentAt: `${req.consent_at} (owner), ${now.toISOString()} (Frontier)`,
    sourceSha256: req.source_sha256 ?? "",
    requestId: req.id,
  });

  const executedSha = sha256(output);
  const executedPath = `${req.owner_id}/${crypto.randomUUID()}-executed-${doc!.title.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 60)}.pdf`;

  const { error: upError } = await admin.storage
    .from("owner-documents")
    .upload(executedPath, Buffer.from(output), { contentType: "application/pdf", upsert: false });
  if (upError) {
    return NextResponse.json({ error: "Could not save the executed document." }, { status: 500 });
  }

  if (placed.length > 0) {
    await admin.from("signature_field_values").insert(
      placed.map((f, i) => ({
        request_id: req.id,
        field_id: managerFields[i].id,
        value: f.value,
        signer_role: "manager",
      })),
    );
  }

  await admin
    .from("signature_requests")
    .update({
      status: "executed",
      manager_signed_at: now.toISOString(),
      manager_name: String(body.signerName),
      manager_email: user?.email ?? null,
      manager_ip: ip,
      manager_user_agent: userAgent,
      signed_storage_path: executedPath,
      signed_sha256: executedSha,
    })
    .eq("id", req.id);

  await admin.from("signature_events").insert([
    { request_id: req.id, event_type: "countersigned", ip, user_agent: userAgent, detail: { by: String(body.signerName) } },
    { request_id: req.id, event_type: "executed", ip, user_agent: userAgent, detail: { executed_sha256: executedSha } },
  ]);

  // Now the owner gets their copy: a fully executed agreement.
  await admin.from("owner_documents").insert({
    owner_id: req.owner_id,
    title: `${doc!.title} — executed`,
    kind: "agreement",
    storage_path: executedPath,
    mime_type: "application/pdf",
    size_bytes: output.byteLength,
    published_at: now.toISOString(),
  });

  return NextResponse.json({ ok: true });
}
