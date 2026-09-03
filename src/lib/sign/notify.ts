import { Resend } from "resend";
import { siteConfig } from "@/data/site";

/**
 * Emails to people who are not portal users.
 *
 * Sent from the portal address rather than the audit one so the two streams
 * stay separable in the Resend log, and so a signing request never looks like
 * marketing. Failures are reported to the caller rather than thrown: a signing
 * request that was created but not emailed is recoverable, and the admin needs
 * to be told which ones to chase.
 */
const FROM = "Frontier Property Management <portal@rentwithfrontier.com>";

// portal@ is a sending address with nobody behind it, so replies are pointed at
// the real inbox rather than disappearing. The footer says so too, because a
// Reply-To header is invisible to someone deciding whether it is worth replying.
const REPLY_TO = siteConfig.email;

// The canonical host, not siteConfig.url: the bare domain 307s to www, and not
// every email client's image proxy follows a redirect before giving up.
const SITE = "https://www.rentwithfrontier.com";
const LOGO = `${SITE}/images/logos/Asset-1-2.png`;

/** Shared shell so every portal email looks like it came from the same place. */
function layout(inner: string): string {
  return `<div style="background:#f6f5f2;padding:32px 16px">
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#414042;max-width:520px;margin:0 auto;background:#ffffff;border-radius:10px;padding:32px;line-height:1.6">
  <img src="${LOGO}" alt="Frontier Property Management" width="180" style="display:block;width:180px;max-width:60%;height:auto;margin:0 0 24px" />
  ${inner}
  <hr style="border:none;border-top:1px solid #e6e4df;margin:28px 0 16px" />
  <p style="color:#8a8a8a;font-size:12px;margin:0 0 6px">
    This message was sent from an unmonitored address, so please don't reply to it directly.
    Replies go to <a href="mailto:${REPLY_TO}" style="color:#4a6b52">${REPLY_TO}</a>, or call or text ${siteConfig.phone}.
  </p>
  <p style="color:#8a8a8a;font-size:12px;margin:0">
    Frontier Property Management LLC · Broken Bow, Oklahoma ·
    <a href="${SITE}" style="color:#4a6b52">rentwithfrontier.com</a>
  </p>
</div>
</div>`;
}

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function sendSigningRequest(params: {
  to: string;
  signerName: string;
  documentTitle: string;
  url: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = client();
  if (!resend) return { ok: false, error: "RESEND_API_KEY is not set" };

  const text = `Hi ${params.signerName},

${siteConfig.owner} at Frontier Property Management has asked you to sign "${params.documentTitle}".

Open this link to read it and sign:
${params.url}

The link is just for you, so please don't forward it. It expires in 30 days.

Please do not reply to this message — it comes from an unmonitored address.
Reach us at ${REPLY_TO} or call or text ${siteConfig.phone}.

Frontier Property Management
${SITE}`;

  const html = layout(`<p style="margin:0 0 14px">Hi ${escapeHtml(params.signerName)},</p>
<p style="margin:0 0 14px">${escapeHtml(siteConfig.owner)} at Frontier Property Management has asked you to sign
<strong>${escapeHtml(params.documentTitle)}</strong>.</p>
<p style="margin:28px 0">
  <a href="${params.url}" style="background:#4a6b52;color:#ffffff;padding:13px 24px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block">Read and sign the document</a>
</p>
<p style="color:#71717a;font-size:13px;margin:0">This link is just for you, so please don't forward it. It expires in 30 days.</p>`);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: params.to,
      subject: `Please sign: ${params.documentTitle}`,
      text,
      html,
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );
}
