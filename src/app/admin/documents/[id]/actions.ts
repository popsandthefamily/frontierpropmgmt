"use server";

import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";

/**
 * Ask an owner to sign a document.
 *
 * The document is hashed at this moment, before the owner ever sees it, so the
 * record shows exactly which bytes were presented for signature. If the file
 * were ever swapped afterwards the hashes would not line up.
 */
export async function requestSignature(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  if (!(await isAdmin(token))) throw new Error("Not authorised.");

  const documentId = String(formData.get("document_id"));
  const ownerId = String(formData.get("owner_id"));
  const admin = getSupabaseAdmin();

  const { data: doc } = await admin
    .from("owner_documents")
    .select("storage_path")
    .eq("id", documentId)
    .single();

  const { data: file } = await admin.storage
    .from("owner-documents")
    .download(doc!.storage_path);
  const bytes = Buffer.from(await file!.arrayBuffer());
  const sourceSha = createHash("sha256").update(bytes).digest("hex");

  const { data: created, error } = await admin
    .from("signature_requests")
    .insert({
      document_id: documentId,
      owner_id: ownerId,
      status: "sent",
      source_sha256: sourceSha,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  await admin.from("signature_events").insert({
    request_id: created.id,
    event_type: "requested",
    detail: { source_sha256: sourceSha },
  });

  // A document awaiting signature has to be visible to the owner to be signed.
  await admin
    .from("owner_documents")
    .update({ published_at: new Date().toISOString() })
    .eq("id", documentId)
    .is("published_at", null);

  revalidatePath(`/admin/documents/${documentId}`);
  revalidatePath("/admin/owners");
}

/**
 * Cancel a signature request.
 *
 * Voided rather than deleted: the request, and the fact it was withdrawn, are
 * part of the history. Voiding also frees the document to be requested again,
 * because the uniqueness rule only counts requests that are not void.
 */
export async function voidRequest(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  if (!(await isAdmin(token))) throw new Error("Not authorised.");

  const requestId = String(formData.get("request_id"));
  const documentId = String(formData.get("document_id"));
  const admin = getSupabaseAdmin();

  const { data: req } = await admin
    .from("signature_requests")
    .select("status")
    .eq("id", requestId)
    .single();
  if (req?.status === "executed") {
    throw new Error("An executed agreement can't be cancelled.");
  }

  await admin.from("signature_requests").update({ status: "void" }).eq("id", requestId);
  await admin.from("signature_events").insert({
    request_id: requestId,
    event_type: "voided",
  });

  revalidatePath(`/admin/documents/${documentId}`);
  revalidatePath("/admin/owners");
}
