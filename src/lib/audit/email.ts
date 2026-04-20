import { Resend } from "resend";
import type { AuditReport } from "./types";

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const FROM = process.env.RESEND_FROM || "Frontier Audit <audit@rentwithfrontier.com>";

function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://rentwithfrontier.com";
}

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  const client = getClient();
  if (!client) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[audit] Resend not configured. Verification code for ${email}: ${code}`);
      return;
    }
    throw new Error("Resend not configured");
  }
  const text = `Your verification code is:\n\n  ${code}\n\nIt expires in 15 minutes.\n\nDidn't request this? Ignore this email.\n\n— Frontier\n${siteUrl()}`;
  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#414042;max-width:480px;margin:0 auto;padding:24px">
<p>Your verification code is:</p>
<p style="font-size:32px;letter-spacing:6px;font-weight:700;background:#f6f6f6;padding:16px;text-align:center;border-radius:8px">${code}</p>
<p>It expires in 15 minutes.</p>
<p style="color:#71717a;font-size:13px;margin-top:24px">Didn't request this? Ignore this email.</p>
<p style="color:#71717a;font-size:13px">— Frontier</p>
</body></html>`;

  await client.emails.send({
    from: FROM,
    to: email,
    subject: `Your Frontier audit code: ${code}`,
    text,
    html,
  });
}

export async function sendReportEmail(email: string, report: AuditReport): Promise<void> {
  const client = getClient();
  if (!client) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[audit] Resend not configured. Report for ${email}: ${report.id}`);
      return;
    }
    throw new Error("Resend not configured");
  }
  const leak = report.leaks.revenueLeak.toLocaleString();
  const marketName = report.listing.city || "your market";
  const top3 = report.leaks.recommendations.slice(0, 3);
  const reportLink = `${siteUrl()}/audit/result/${report.id}`;
  const bookLink = `${siteUrl()}/contact`;

  const textLines = [
    "Your audit is ready.",
    "",
    "The short version:",
    `Your listing earns an estimated $${report.leaks.targetAnnualRevenue.toLocaleString()}/yr.`,
    `Similar properties in ${marketName} earn a median $${report.leaks.marketMedianAnnualRevenue.toLocaleString()}/yr.`,
    `That's a $${leak}/yr gap.`,
    "",
    "Top reasons (in order of $ impact):",
    ...top3.map((r, i) => `${i + 1}. ${r.description}`),
    "",
    `Full report (shareable): ${reportLink}`,
    "",
    `Want help closing this gap? ${bookLink}`,
    "",
    "— Frontier",
  ];

  const html = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#414042;max-width:560px;margin:0 auto;padding:24px">
<h2 style="font-family:'Yanone Kaffeesatz',sans-serif;text-transform:uppercase;letter-spacing:1px;color:#4a6e5d">Your audit is ready</h2>
<p style="font-size:16px;line-height:1.5">Your listing earns an estimated <strong>$${report.leaks.targetAnnualRevenue.toLocaleString()}/yr</strong>. Similar properties in ${marketName} earn a median of <strong>$${report.leaks.marketMedianAnnualRevenue.toLocaleString()}/yr</strong>.</p>
<p style="background:#4a6e5d;color:white;padding:20px;border-radius:8px;font-size:22px;text-align:center;margin:20px 0">
  <span style="opacity:.85;font-size:14px;text-transform:uppercase;letter-spacing:1px">Revenue gap</span><br>
  <strong style="font-size:32px">$${leak}/yr</strong>
</p>
<h3 style="font-family:'Yanone Kaffeesatz',sans-serif;text-transform:uppercase">Top reasons</h3>
<ol style="padding-left:20px;line-height:1.5">
${top3.map((r) => `<li style="margin-bottom:12px">${r.description}</li>`).join("")}
</ol>
<p style="text-align:center;margin:30px 0">
  <a href="${reportLink}" style="background:#4a6e5d;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600">View your full report</a>
</p>
<p style="text-align:center;margin:20px 0">
  <a href="${bookLink}" style="color:#673da6;text-decoration:underline">Book a 15-min call with Frontier →</a>
</p>
<p style="color:#71717a;font-size:12px;text-align:center;margin-top:30px">Estimates based on AirROI market data. Individual results vary.</p>
</body></html>`;

  await client.emails.send({
    from: FROM,
    to: email,
    subject: `Your Airbnb audit: $${leak}/yr gap found`,
    text: textLines.join("\n"),
    html,
  });
}

export async function sendAdminAlert(subject: string, body: string): Promise<void> {
  const client = getClient();
  const to = process.env.ADMIN_ALERT_EMAIL;
  if (!client || !to) return;
  await client.emails.send({
    from: FROM,
    to,
    subject: `[Audit] ${subject}`,
    text: body,
  });
}
