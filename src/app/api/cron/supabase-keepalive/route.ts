import { NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { json } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Keeps the free-tier Supabase project awake.
 *
 * Supabase pauses a free project after about a week with no database
 * activity, and the owner portal can easily go that long without a sign-in.
 * One tiny read a day through the API counts as activity, so Vercel cron
 * calls this daily. It counts one table's rows and returns nothing sensitive.
 */
export async function GET(req: NextRequest) {
  // Same auth as the other cron: Vercel's CRON_SECRET, or ?token= with
  // ADMIN_AUTH_SECRET for a manual check.
  const authHeader = req.headers.get("authorization");
  const token = new URL(req.url).searchParams.get("token");
  const expected = process.env.ADMIN_AUTH_SECRET;

  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET || ""}`;
  const isManual = expected && token === expected;
  if (!isVercelCron && !isManual) return json({ error: "unauthorized" }, 401);

  const { error } = await getSupabaseAdmin()
    .from("admin_users")
    .select("email", { head: true, count: "exact" })
    .limit(1);

  if (error) {
    console.error("[supabase-keepalive] query failed:", error.message);
    return json({ ok: false, error: error.message }, 500);
  }

  return json({ ok: true, at: new Date().toISOString() });
}
