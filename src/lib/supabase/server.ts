import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Request-scoped Supabase client for the owner portal.
 *
 * This is the client that carries the signed-in owner's session, so every query
 * it makes runs as that owner and is filtered by row level security. That is
 * deliberate: the portal never queries owner data with the service role, which
 * means a forgotten `.eq("owner_id", ...)` cannot leak one owner's payouts to
 * another. The database refuses, not the route handler.
 */
export async function getSupabaseServer(): Promise<SupabaseClient> {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component, where cookies are read-only.
            // Refresh is handled in middleware, so this is safe to ignore.
          }
        },
      },
    },
  );
}

/** The signed-in owner, or null. */
export async function getCurrentOwner() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}
