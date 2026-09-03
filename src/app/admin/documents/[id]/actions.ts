"use server";

import { revalidatePath } from "next/cache";
import { createHash } from "crypto";
import { isAdmin } from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { newSigningToken, signingUrl } from "@/lib/sign/tokens";
import { sendPortalSigningNotice, sendSigningRequest } from "@/lib/sign/notify";

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

    if (signer.kind === "manager" || !signer.email) {
      await admin.from("signature_signers").update(patch).eq("id", signer.id);
      continue;
    }

    // Someone with a portal account is pointed at the portal: it never expires,
    // it is where their documents already live, and signing there still
    // requires them to be signed in as themselves. Everyone else gets a
    // one-time link, which is the only way in for a signer with no account.
    const { data: portalAccount } = await admin
      .from("owner_profiles")
      .select("id")
      .eq("email", signer.email.toLowerCase())
      .maybeSingle();

    if (portalAccount) {
      await admin.from("signature_signers").update(patch).eq("id", signer.id);
      const sent = await sendPortalSigningNotice({
        to: signer.email,
        signerName: signer.name,
        documentTitle: doc!.title,
      });
      if (!sent.ok) failures.push(`${signer.email}: ${sent.error}`);
    } else {
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

/**
 * Send a signer their link again.
 *
 * Emails get lost, forwarded, or filed in spam, and a signer who was set up as
 * a portal owner without an account has no other way in. Each resend mints a
 * fresh token and retires the previous one, so an old email in someone's inbox
 * stops working rather than lingering as a second live credential.
 */
export async function resendSignerLink(formData: FormData): Promise<void> {
  const token = String(formData.get("token") ?? "");
  if (!(await isAdmin(token))) throw new Error("Not authorised.");

  const signerId = String(formData.get("signer_id"));
  const documentId = String(formData.get("document_id"));
  const admin = getSupabaseAdmin();

  const { data: signer } = await admin
    .from("signature_signers")
    .select("*, owner_documents(title)")
    .eq("id", signerId)
    .single();

  if (!signer) throw new Error("Signer not found.");
  if (signer.signed_at) throw new Error(`${signer.name} has already signed.`);
  if (!signer.email) throw new Error(`${signer.name} has no email address.`);
  if (!signer.request_id) throw new Error("This document hasn't been sent for signature yet.");

  const title =
    (signer.owner_documents as unknown as { title: string } | null)?.title ?? "your document";

  const { data: portalAccount } = await admin
    .from("owner_profiles")
    .select("id")
    .eq("email", signer.email.toLowerCase())
    .maybeSingle();

  let sent: { ok: boolean; error?: string };
  if (portalAccount) {
    sent = await sendPortalSigningNotice({
      to: signer.email,
      signerName: signer.name,
      documentTitle: title,
    });
  } else {
    const { token: raw, hash, expiresAt } = newSigningToken();
    await admin
      .from("signature_signers")
      .update({ token_hash: hash, token_expires_at: expiresAt })
      .eq("id", signerId);

    const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rentwithfrontier.com").replace(/\/$/, "");
    sent = await sendSigningRequest({
      to: signer.email,
      signerName: signer.name,
      documentTitle: title,
      url: signingUrl(origin, raw),
    });
  }

  await admin.from("signature_events").insert({
    request_id: signer.request_id,
    event_type: "link_resent",
    detail: { signer: signer.name, delivered: sent.ok },
  });

  revalidatePath(`/admin/documents/${documentId}`);
  if (!sent.ok) throw new Error(`Could not email ${signer.email}: ${sent.error}`);
}
