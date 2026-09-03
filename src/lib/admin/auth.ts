import { getCurrentOwner } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

/**
 * Who is allowed into /admin.
 *
 * Two ways in, and the session is the one to use.
 *
 * A signed-in account whose email is in `admin_users` is an admin. That is a
 * real login: it can be granted and revoked per person, it expires, and nothing
 * privileged ends up in a URL.
 *
 * ADMIN_AUTH_SECRET still works as a fallback so existing bookmarks and the
 * /api/audit/admin-stats endpoint keep functioning. It is the weaker path — a
 * shared string that leaks through browser history, referrer headers and logs,
 * and cannot be revoked for one person without breaking it for everyone — so
 * prefer the session and treat the token as a way in when email is unavailable.
 */
export async function isAdmin(token?: string): Promise<boolean> {
  const expected = process.env.ADMIN_AUTH_SECRET;
  if (expected && token === expected) return true;

  const user = await getCurrentOwner();
  if (!user?.email) return false;

  // Checked with the service role: the allowlist is an inventory of privileged
  // accounts, so it is never readable through the publishable key.
  const { data } = await getSupabaseAdmin()
    .from("admin_users")
    .select("email")
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  return Boolean(data);
}
