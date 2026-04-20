import { NextRequest } from "next/server";
import { getUsageStats } from "@/lib/audit/caps";
import { json } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") || req.headers.get("x-admin-token");
  const expected = process.env.ADMIN_AUTH_SECRET;
  if (!expected || token !== expected) {
    return json({ error: "unauthorized" }, 401);
  }
  const stats = await getUsageStats();
  return json({
    ...stats,
    killSwitchOn: process.env.AUDIT_DISABLED === "true",
  });
}
