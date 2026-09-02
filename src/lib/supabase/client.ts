import { createClient, type SupabaseClient } from "@supabase/supabase-js";

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

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

/** Publishable-key client. Subject to row level security. */
export function getSupabase(): SupabaseClient {
  if (browserClient) return browserClient;
  browserClient = createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    { auth: { persistSession: false } },
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
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return adminClient;
}
