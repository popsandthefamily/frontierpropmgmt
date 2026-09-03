import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getSupabaseServer } from "@/lib/supabase/server";
import { newSigningToken, signingUrl } from "@/lib/sign/tokens";
import { sendSigningRequest } from "@/lib/sign/notify";

export const runtime = "nodejs";

/**
 * "Email me a sign-in link", decided server-side.
 *
 * Someone typing their address into the portal is telling us they expect to get
 * in. Three things can be true, and only the server can tell them apart:
 *
 *   - they have a portal account, so send the sign-in link;
 *   - they have no account but are waiting to sign something, so send that
 *     signing link instead — otherwise they sit staring at "check your email"
 *     while nothing arrives;
 *   - neither, in which case nothing is sent.
 *
 * The response is identical in all three cases. Saying which happened would
 * turn this form into a way to test whether someone is a Frontier client.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  const next = typeof body?.next === "string" && body.next.startsWith("/") ? body.next : "/portal";
  const neutral = NextResponse.json({ ok: true });

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const origin = new URL(request.url).origin;

  const { data: account } = await admin
    .from("owner_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (account) {
    const supabase = await getSupabaseServer();
    await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${origin}/portal/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    return neutral;
  }

  // No portal account. If they are mid-signature, the useful thing is their
  // signing link, not a sign-in link to a portal they do not have.
  const { data: signer } = await admin
    .from("signature_signers")
    .select("id, name, email, document_id, request_id, signed_at, owner_documents(title)")
    .eq("email", email)
    .is("signed_at", null)
    .not("request_id", "is", null)
    .maybeSingle();

  if (signer) {
    const { token, hash, expiresAt } = newSigningToken();
    await admin
      .from("signature_signers")
      .update({ token_hash: hash, token_expires_at: expiresAt })
      .eq("id", signer.id);

    await sendSigningRequest({
      to: signer.email!,
      signerName: signer.name,
      documentTitle:
        (signer.owner_documents as unknown as { title: string } | null)?.title ?? "your document",
      url: signingUrl(origin, token),
    });

    await admin.from("signature_events").insert({
      request_id: signer.request_id,
      event_type: "link_resent",
      detail: { signer: signer.name, via: "portal sign-in request" },
    });
  }

  return neutral;
}
