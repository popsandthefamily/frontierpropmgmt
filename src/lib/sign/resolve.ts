import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getCurrentOwner } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin/auth";
import { hashToken, tokensMatch } from "./tokens";

/**
 * Finds the signer behind a request, whichever door they came through.
 *
 * Three doors, one signing screen: an emailed token for someone with no
 * account, a portal session for an owner, and admin access for Frontier. The
 * authorisation differs; everything after it is identical, which is why there
 * is one implementation rather than three that can drift apart.
 */
export type SignerAccess =
  | { ok: true; signer: Record<string, unknown> }
  | { ok: false; reason: "not_found" | "expired" | "already_signed" | "void" | "forbidden" };

export async function resolveSigner(input: {
  token?: string;
  signerId?: string;
  adminToken?: string;
}): Promise<SignerAccess> {
  const admin = getSupabaseAdmin();
  let signer: Record<string, unknown> | null = null;

  if (input.token) {
    const candidate = hashToken(input.token);
    const { data } = await admin
      .from("signature_signers")
      .select("*")
      .eq("token_hash", candidate)
      .maybeSingle();
    // Compare again in constant time: the lookup above is an index probe, and
    // this keeps the comparison itself free of timing signal.
    if (!data || !tokensMatch(candidate, data.token_hash)) {
      return { ok: false, reason: "not_found" };
    }
    if (data.token_expires_at && new Date(data.token_expires_at) < new Date()) {
      return { ok: false, reason: "expired" };
    }
    signer = data;
  } else if (input.signerId) {
    const { data } = await admin
      .from("signature_signers")
      .select("*")
      .eq("id", input.signerId)
      .maybeSingle();
    if (!data) return { ok: false, reason: "not_found" };

    if (data.kind === "manager") {
      if (!(await isAdmin(input.adminToken))) return { ok: false, reason: "forbidden" };
    } else {
      // A portal signer is only themselves: the session's email has to match
      // the address the document was addressed to.
      const user = await getCurrentOwner();
      const email = (user?.email ?? "").toLowerCase();
      if (!email || email !== String(data.email ?? "").toLowerCase()) {
        return { ok: false, reason: "forbidden" };
      }
    }
    signer = data;
  }

  if (!signer) return { ok: false, reason: "not_found" };
  if (signer.signed_at) return { ok: false, reason: "already_signed" };

  const { data: req } = await admin
    .from("signature_requests")
    .select("id, status, document_id, source_sha256, signed_storage_path, signed_sha256, owner_id")
    .eq("id", signer.request_id as string)
    .maybeSingle();
  if (!req || req.status === "void") return { ok: false, reason: "void" };

  return { ok: true, signer: { ...signer, request: req } };
}
