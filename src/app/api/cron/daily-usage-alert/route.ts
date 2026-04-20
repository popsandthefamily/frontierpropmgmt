import { NextRequest } from "next/server";
import { getUsageStats } from "@/lib/audit/caps";
import { sendAdminAlert } from "@/lib/audit/email";
import { json } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Vercel cron sends a specific header with the project deploy secret.
  // Allow manual calls with ADMIN_AUTH_SECRET as ?token= for debugging.
  const authHeader = req.headers.get("authorization");
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const expected = process.env.ADMIN_AUTH_SECRET;

  const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET || ""}`;
  const isManual = expected && token === expected;
  if (!isVercelCron && !isManual) return json({ error: "unauthorized" }, 401);

  const stats = await getUsageStats();
  const messages: string[] = [];
  if (stats.tier2Today >= stats.dailyCap * 0.8) {
    messages.push(`Tier 2 daily at ${stats.tier2Today}/${stats.dailyCap} (>=80%).`);
  }
  if (stats.tier2Month >= stats.monthlyCap * 0.8) {
    messages.push(`Tier 2 monthly at ${stats.tier2Month}/${stats.monthlyCap} (>=80%).`);
  }
  if (stats.tier1Today >= stats.tier1DailyCap * 0.8) {
    messages.push(`Tier 1 daily at ${stats.tier1Today}/${stats.tier1DailyCap} (>=80%).`);
  }

  if (messages.length > 0) {
    await sendAdminAlert(
      "Audit usage approaching cap",
      messages.join("\n") + "\n\nhttps://rentwithfrontier.com/admin/audit-stats",
    );
  }

  return json({ ok: true, stats, alerted: messages.length > 0 });
}
