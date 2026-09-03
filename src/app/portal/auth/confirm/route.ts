import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Where the emailed sign-in link lands.
 *
 * This route exists instead of relying on Supabase's default confirmation URL,
 * which redirects back with the tokens in the URL *fragment*
 * (#access_token=...). A fragment is never sent to the server, so a server-side
 * handler receives an empty request and every sign-in fails. Pointing the email
 * template at this route with `token_hash` instead puts the value in the query
 * string, where the server can actually read it and mint a session cookie.
 *
 * It also means the link works when it is opened somewhere other than where it
 * was requested, which is the normal case: request it on a laptop, open the
 * email on a phone.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = (searchParams.get("type") ?? "magiclink") as EmailOtpType;
  const next = searchParams.get("next") ?? "/portal";

  if (tokenHash) {
    const supabase = await getSupabaseServer();
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });
    if (!error) {
      // Only ever redirect within this site, never to a URL from the query.
      const target = next.startsWith("/") ? next : "/portal";
      return NextResponse.redirect(`${origin}${target}`);
    }
  }

  return NextResponse.redirect(`${origin}/portal/login?error=link`);
}
