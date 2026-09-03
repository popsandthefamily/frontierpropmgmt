import { getSupabaseAdmin } from "@/lib/supabase/client";
import { resolveSigner } from "./resolve";
import type { SignField } from "@/components/sign/sign-document";

export const OWNER_CONSENT =
  "I agree to sign this document electronically, I intend my electronic signature to be my legally binding signature, and I agree that Frontier Property Management may deliver this and related records to me electronically.";

export const MANAGER_CONSENT =
  "I am authorised to sign on behalf of Frontier Property Management LLC, and I intend this electronic signature to be the company's legally binding signature on this agreement.";

/** Everything the signing screen needs, once the signer has been authorised. */
export async function loadSigningPage(input: {
  token?: string;
  signerId?: string;
  adminToken?: string;
}) {
  const access = await resolveSigner(input);
  if (!access.ok) return { ok: false as const, reason: access.reason };

  const signer = access.signer as Record<string, unknown> & {
    id: string;
    name: string;
    kind: string;
    role_label: string;
    request: Record<string, string | null>;
  };
  const req = signer.request;
  const admin = getSupabaseAdmin();

  const [{ data: doc }, { data: allFields }] = await Promise.all([
    admin.from("owner_documents").select("title, storage_path").eq("id", req.document_id!).single(),
    admin.from("signature_fields").select("*").eq("document_id", req.document_id!).order("sort_order"),
  ]);

  // Sign on top of whatever the previous party left behind, so each signer
  // sees the marks already made.
  const path = req.signed_storage_path ?? doc!.storage_path;
  const { data: url } = await admin.storage.from("owner-documents").createSignedUrl(path, 1800);

  await admin.from("signature_events").insert({
    request_id: req.id!,
    event_type: "viewed",
    detail: { signer: signer.name, role: signer.role_label },
  });

  const mine = (allFields ?? []).filter((f) => f.signer_id === signer.id);
  const theirs = (allFields ?? []).filter((f) => f.signer_id !== signer.id);

  return {
    ok: true as const,
    signer,
    documentTitle: doc!.title,
    fileUrl: url?.signedUrl ?? null,
    fields: mine as SignField[],
    otherFields: theirs as SignField[],
    consentText: signer.kind === "manager" ? MANAGER_CONSENT : OWNER_CONSENT,
  };
}

export const REASONS: Record<string, { title: string; body: string }> = {
  not_found: { title: "This link isn't valid", body: "Check you used the most recent link Frontier sent you. If in doubt, ask for a new one." },
  expired: { title: "This link has expired", body: "Signing links last 30 days. Ask Frontier to send a fresh one." },
  already_signed: { title: "You've already signed this", body: "Thank you — nothing further is needed from you. Once every party has signed, a completed copy with a certificate of completion is filed and sent out." },
  void: { title: "This request was cancelled", body: "Frontier withdrew this signature request. Contact them if you were expecting to sign." },
  forbidden: { title: "Not your document", body: "This document was addressed to someone else." },
};
