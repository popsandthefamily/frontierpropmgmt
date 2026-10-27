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

  // Refuse to move the goalposts under a live request: once a document is out
  // for signature, or signed, its field layout is part of the evidence. This
  // matches the signer lock, rather than only catching the partly signed case
  // and letting fields change under someone who has the document open.
  const { data: live } = await admin
    .from("signature_requests")
    .select("id")
    .eq("document_id", documentId)
    .neq("status", "void")
    .limit(1);
  if (live && live.length > 0) {
    return NextResponse.json(
      { error: "Cancel the open signature request before changing fields." },
      { status: 409 },
    );
  }

  // Every field has to belong to one of this document's signers and sit on the
  // page, or it can never be filled in and the request can never complete.
  const { data: signerRows } = await admin
    .from("signature_signers")
    .select("id")
    .eq("document_id", documentId);
  const signerIds = new Set((signerRows ?? []).map((s) => s.id));
  const types = new Set(["signature", "initials", "date", "name", "text"]);
  const inPage = (n: unknown) => typeof n === "number" && n >= 0 && n <= 1;
  for (const f of fields) {
    if (
      !signerIds.has(f.signer_id as string) ||
      !types.has(f.field_type as string) ||
      !Number.isInteger(f.page_number) ||
      (f.page_number as number) < 1 ||
      ![f.x_pct, f.y_pct, f.w_pct, f.h_pct].every(inPage)
    ) {
      return NextResponse.json(
        { error: "A field is missing its signer or sits off the page. Save again." },
        { status: 400 },
      );
    }
  }

  await admin.from("signature_fields").delete().eq("document_id", documentId);

  if (fields.length > 0) {
    const { error } = await admin.from("signature_fields").insert(
      fields.map((f, i) => ({
        document_id: documentId,
        signer_id: f.signer_id ?? null,
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
