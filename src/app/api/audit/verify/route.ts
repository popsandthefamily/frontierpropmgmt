import { NextRequest } from "next/server";
import {
  codeAttemptLimit,
  markCompleted,
  markInFlight,
  refundSlot,
} from "@/lib/audit/ratelimit";
import {
  checkDailyCap,
  checkMonthlyCap,
  decrementCaps,
  incrementCaps,
} from "@/lib/audit/caps";
import {
  clearPendingVerification,
  getPendingVerification,
} from "@/lib/audit/verification";
import { runFullAudit } from "@/lib/audit/run-audit";
import { sendReportEmail } from "@/lib/audit/email";
import { json, getClientIp } from "@/lib/audit/http";
import { isValidEmail } from "@/lib/audit/disposable";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface Body {
  email?: string;
  code?: string;
}

export async function POST(req: NextRequest) {
  if (process.env.AUDIT_DISABLED === "true") {
    return json({ error: "Audit is temporarily paused." }, 503);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  const ip = getClientIp(req);

  const email = (body.email || "").trim().toLowerCase();
  const code = (body.code || "").trim();
  if (!isValidEmail(email) || !/^\d{6}$/.test(code)) {
    return json({ error: "Email and 6-digit code required." }, 400);
  }

  const { success: attemptOK } = await codeAttemptLimit().limit(email);
  if (!attemptOK) {
    return json({ error: "Too many attempts. Wait 15 minutes before trying again." }, 429);
  }

  const stored = await getPendingVerification(email);
  if (!stored || stored.code !== code) {
    return json({ error: "Invalid or expired code." }, 400);
  }

  // Re-check caps before spending money
  if (!(await checkDailyCap(2)) || !(await checkMonthlyCap())) {
    return json({ error: "We've reached today's audit capacity." }, 429);
  }

  // Reserve slot and increment BEFORE hitting AirROI
  await markInFlight(ip, email);
  await incrementCaps(2);

  try {
    const report = await runFullAudit({
      listingId: stored.listingId,
      listingUrl: stored.listingUrl,
      email,
    });
    await markCompleted(ip, email, report.id);
    await clearPendingVerification(email);

    // Fire-and-forget report email, don't fail the flow if email is down
    sendReportEmail(email, report).catch((err) => {
      console.error("[audit/verify] report email failed", err);
    });

    return json({ ok: true, reportId: report.id });
  } catch (err) {
    console.error("[audit/verify] audit failed", err);
    await refundSlot(ip, email);
    await decrementCaps(2);
    return json(
      { error: "Something went wrong running your audit. We didn't charge you anything. Try again in a few minutes." },
      500,
    );
  }
}
