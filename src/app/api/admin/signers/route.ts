import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";

/** Replaces the signer list for a document. Admin only. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || !(await isAdmin(body.token))) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  const documentId: string = body.documentId;
  const signers: { id?: string; name: string; email?: string; role_label: string; kind: string }[] =
    Array.isArray(body.signers) ? body.signers : [];

  const admin = getSupabaseAdmin();

  // A live request pins the signer list: it is who was asked, and changing it
  // afterwards would rewrite the record.
  const { data: live } = await admin
    .from("signature_requests")
    .select("id, status")
    .eq("document_id", documentId)
    .neq("status", "void")
    .limit(1);
  if (live && live.length > 0) {
    return NextResponse.json(
      { error: "Cancel the open signature request before changing signers." },
      { status: 409 },
    );
  }

  for (const s of signers) {
    if (!s.name?.trim()) {
      return NextResponse.json({ error: "Every signer needs a name." }, { status: 400 });
    }
    if (s.kind !== "manager" && !s.email?.trim()) {
      return NextResponse.json(
        { error: `${s.name} needs an email address to receive a signing link.` },
        { status: 400 },
      );
    }
  }

  // Keep the ids that are staying so their placed fields survive the edit.
  const keep = signers.filter((s) => s.id).map((s) => s.id as string);
  let del = admin.from("signature_signers").delete().eq("document_id", documentId);
  if (keep.length > 0) del = del.not("id", "in", `(${keep.join(",")})`);
  await del;

  for (const [i, s] of signers.entries()) {
    const row = {
      document_id: documentId,
      name: s.name.trim(),
      email: s.email?.trim().toLowerCase() || null,
      role_label: s.role_label?.trim() || "Owner",
      kind: s.kind === "manager" ? "manager" : s.kind === "owner" ? "owner" : "external",
      sort_order: i,
    };
    if (s.id) {
      await admin.from("signature_signers").update(row).eq("id", s.id);
    } else {
      await admin.from("signature_signers").insert(row);
    }
  }

  const { data: saved } = await admin
    .from("signature_signers")
    .select("id, name, email, role_label, kind, sort_order")
    .eq("document_id", documentId)
    .order("sort_order");

  return NextResponse.json({ ok: true, signers: saved ?? [] });
}
