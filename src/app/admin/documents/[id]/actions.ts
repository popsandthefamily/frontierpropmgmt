"use server";

import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { newSigningToken, signingUrl } from "@/lib/sign/tokens";
import { sendSigningRequest } from "@/lib/sign/notify";

/**
 * Send a document out for signature.
 *
 * The document is hashed at this moment, before anyone sees it, so the record
 * shows exactly which bytes were presented. Each signer who is not Frontier
 * gets a single-use link; only its hash is stored, so the database never holds
 * a working credential.
 *
 * Email failures do not roll the request back. The request is valid and the
 * links exist; what is needed is for someone to be told which addresses did not
 * receive one, which is what the returned message is for.
 */
export async function requestSignature(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  if (!(await isAdmin(token))) throw new Error("Not authorised.");

  const documentId = String(formData.get("document_id"));
  const ownerId = String(formData.get("owner_id"));
  const admin = getSupabaseAdmin();

  const { data: signers } = await admin
    .from("signature_signers")
    .select("*")
    .eq("document_id", documentId)
    .order("sort_order");
  if (!signers || signers.length === 0) {
    throw new Error("Add at least one signer before requesting a signature.");
  }

  const { data: fields } = await admin
    .from("signature_fields")
    .select("id, signer_id")
    .eq("document_id", documentId);
  const withFields = new Set((fields ?? []).map((f) => f.signer_id));
  const idle = signers.filter((s) => !withFields.has(s.id));
  if (idle.length > 0) {
    throw new Error(
      `${idle.map((s) => s.name).join(", ")} ${idle.length === 1 ? "has" : "have"} no fields to complete. Place their fields first.`,
    );
  }

  const { data: doc } = await admin
    .from("owner_documents")
    .select("title, storage_path")
    .eq("id", documentId)
    .single();
  const { data: file } = await admin.storage.from("owner-documents").download(doc!.storage_path);
  const bytes = Buffer.from(await file!.arrayBuffer());
  const sourceSha = createHash("sha256").update(bytes).digest("hex");

  const { data: created, error } = await admin
    .from("signature_requests")
    .insert({
      document_id: documentId,
      owner_id: ownerId,
      status: "sent",
      source_sha256: sourceSha,
      signers_total: signers.length,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  await admin.from("signature_events").insert({
    request_id: created.id,
    event_type: "requested",
    detail: { source_sha256: sourceSha, signers: signers.length },
  });

  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rentwithfrontier.com").replace(/\/$/, "");
  const failures: string[] = [];

  for (const signer of signers) {
    const patch: Record<string, unknown> = { request_id: created.id };

    // Frontier signs from the admin side and needs no link. Portal owners are
    // authenticated by their session. Only true external signers get a token.
    if (signer.kind === "external") {
      const { token: raw, hash, expiresAt } = newSigningToken();
      patch.token_hash = hash;
      patch.token_expires_at = expiresAt;
      await admin.from("signature_signers").update(patch).eq("id", signer.id);

      const sent = await sendSigningRequest({
        to: signer.email,
        signerName: signer.name,
        documentTitle: doc!.title,
        url: signingUrl(origin, raw),
      });
      if (!sent.ok) failures.push(`${signer.email}: ${sent.error}`);
    } else {
      await admin.from("signature_signers").update(patch).eq("id", signer.id);
    }
  }

  // Owners sign in the portal, so the document has to be visible there.
  await admin
    .from("owner_documents")
    .update({ published_at: new Date().toISOString() })
    .eq("id", documentId)
    .is("published_at", null);

  revalidatePath(`/admin/documents/${documentId}`);
  revalidatePath("/admin/owners");

  if (failures.length > 0) {
    throw new Error(`Request created, but these emails failed: ${failures.join("; ")}`);
  }
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
