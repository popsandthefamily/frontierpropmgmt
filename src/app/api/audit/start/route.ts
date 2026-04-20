import { NextRequest } from "next/server";
import { validateTurnstile } from "@/lib/audit/turnstile";
import {
  burstLimit,
  checkEmailUsed,
  checkIPUsed,
} from "@/lib/audit/ratelimit";
import { checkDailyCap, checkMonthlyCap } from "@/lib/audit/caps";
import { extractListingId, isLikelyAirbnbUrl } from "@/lib/audit/airroi";
import { isDisposableEmail, isValidEmail } from "@/lib/audit/disposable";
import {
  generateCode,
  storePendingVerification,
} from "@/lib/audit/verification";
import { sendVerificationEmail } from "@/lib/audit/email";
import { json, getClientIp } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  email?: string;
  listingUrl?: string;
  turnstileToken?: string;
  honeypot?: string;
}

export async function POST(req: NextRequest) {
  if (process.env.AUDIT_DISABLED === "true") {
    return json({ error: "Audit is temporarily paused for maintenance." }, 503);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  const ip = getClientIp(req);

  // Honeypot, silently accept
  if (body.honeypot) return json({ ok: true, message: "Verification code sent" });

  // Turnstile
  const tsValid = await validateTurnstile(body.turnstileToken, ip);
  if (!tsValid) return json({ error: "Verification failed. Please refresh and try again." }, 400);

  // Burst limit
  const { success: burstOK } = await burstLimit().limit(ip);
  if (!burstOK) return json({ error: "Too many attempts. Wait a minute and retry." }, 429);

  // Validate inputs
  const email = (body.email || "").trim().toLowerCase();
  const listingUrl = (body.listingUrl || "").trim();
  if (!isValidEmail(email)) return json({ error: "Please enter a valid email." }, 400);
  if (!isLikelyAirbnbUrl(listingUrl)) {
    return json({ error: "This doesn't look like an Airbnb listing URL." }, 400);
  }
  const listingId = extractListingId(listingUrl);
  if (!listingId) return json({ error: "We couldn't read that listing URL. Use the format airbnb.com/rooms/12345" }, 400);

  if (isDisposableEmail(email)) {
    return json({ error: "Please use a permanent email. We only send one report." }, 400);
  }

  // Uniqueness
  const priorFromEmail = await checkEmailUsed(email);
  if (priorFromEmail && priorFromEmail !== "in-flight") {
    return json(
      {
        error: "You've already run an audit with this email.",
        priorReport: `/audit/result/${priorFromEmail}`,
      },
      409,
    );
  }
  const priorFromIP = await checkIPUsed(ip);
  if (priorFromIP && priorFromIP !== "in-flight") {
    return json(
      {
        error: "This device has already completed an audit. If this is shared, email hello@rentwithfrontier.com.",
      },
      409,
    );
  }

  // Caps
  if (!(await checkDailyCap(2)) || !(await checkMonthlyCap())) {
    return json(
      {
        error: "We've reached today's audit capacity. Come back tomorrow, or book a call to skip the line.",
      },
      429,
    );
  }

  // Create + send code
  const code = generateCode();
  try {
    await storePendingVerification(email, { code, listingId, listingUrl, ip });
    await sendVerificationEmail(email, code);
  } catch (err) {
    console.error("[audit/start] email send failed", err);
    return json({ error: "Couldn't send verification code. Try again in a moment." }, 500);
  }

  return json({ ok: true, message: "Verification code sent" });
}
