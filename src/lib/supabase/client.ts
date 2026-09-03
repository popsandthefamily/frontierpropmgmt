import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase clients for the Frontier site.
 *
 * Two clients, because they carry very different authority:
 *
 * - `getSupabase()` uses the publishable key. It is safe to ship to the
 *   browser and is constrained entirely by row level security, so every
 *   table it touches needs a policy that says what anonymous callers may do.
 *
 * - `getSupabaseAdmin()` uses the service role key, which bypasses RLS
 *   completely. It exists for route handlers that write records a visitor
 *   must not be able to read back, such as lead capture. It throws if it is
 *   ever reached from the browser bundle, because a leaked service role key
 *   is a full database compromise, not a bad afternoon.
 */

let browserClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

/**
 * Publishable-key client. Subject to row level security.
 *
 * The two env vars are read as literal `process.env.NEXT_PUBLIC_*` expressions
 * rather than through a lookup, because Next inlines them into the client bundle
 * only when it can see the property access statically. `process.env[name]` looks
 * equivalent and is not: it compiles to undefined in the browser.
 */
export function getSupabase(): SupabaseClient {
  if (browserClient) return browserClient;
  // createBrowserClient, not createClient: it stores the session and the PKCE
  // verifier in cookies rather than in memory. That is what lets the server read
  // the session at all — the sign-in link is opened by the server callback
  // route, which can only complete the exchange if the verifier travelled in a
  // cookie. With plain createClient every magic link would fail on arrival.
  browserClient = createBrowserClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    requireEnv(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    ),
  );
  return browserClient;
}

/** Service-role client. Server only, bypasses row level security. */
export function getSupabaseAdmin(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error(
      "getSupabaseAdmin() was called in the browser. The service role key must never reach the client.",
    );
  }
  if (adminClient) return adminClient;
  adminClient = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return adminClient;
}
