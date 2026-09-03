import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";

/** Replaces the field layout for a document. Admin only. */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  if (!(await isAdmin(body.token))) {
    return NextResponse.json({ error: "Not authorised" }, { status: 403 });
  }

  const documentId: string = body.documentId;
  const fields: Record<string, unknown>[] = Array.isArray(body.fields) ? body.fields : [];

  const admin = getSupabaseAdmin();

  // Refuse to move the goalposts under a signature that already exists: once a
  // document has been signed, its field layout is part of the evidence.
  const { data: signed } = await admin
    .from("signature_requests")
    .select("id")
    .eq("document_id", documentId)
    .eq("status", "signed")
    .limit(1);
  if (signed && signed.length > 0) {
    return NextResponse.json(
      { error: "This document has already been signed. Its fields can't be changed." },
      { status: 409 },
    );
  }

  await admin.from("signature_fields").delete().eq("document_id", documentId);

  if (fields.length > 0) {
    const { error } = await admin.from("signature_fields").insert(
      fields.map((f, i) => ({
        document_id: documentId,
        signer_role: f.signer_role === "manager" ? "manager" : "owner",
        page_number: f.page_number,
        x_pct: f.x_pct,
        y_pct: f.y_pct,
        w_pct: f.w_pct,
        h_pct: f.h_pct,
        field_type: f.field_type,
        label: f.label ?? null,
        required: f.required ?? true,
        sort_order: i,
      })),
    );
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, count: fields.length });
}
