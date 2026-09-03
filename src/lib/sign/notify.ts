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

Questions about anything in the document? Call or text ${siteConfig.phone}.

Frontier Property Management
${siteConfig.url}`;

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;color:#414042;max-width:520px;margin:0 auto;padding:24px;line-height:1.6">
<p>Hi ${escapeHtml(params.signerName)},</p>
<p>${escapeHtml(siteConfig.owner)} at Frontier Property Management has asked you to sign
<strong>${escapeHtml(params.documentTitle)}</strong>.</p>
<p style="margin:28px 0">
  <a href="${params.url}" style="background:#4a6b52;color:#fff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600">Read and sign the document</a>
</p>
<p style="color:#71717a;font-size:13px">This link is just for you, so please don't forward it. It expires in 30 days.</p>
<p style="color:#71717a;font-size:13px">Questions about anything in the document? Call or text ${escapeHtml(siteConfig.phone)}.</p>
<p style="color:#71717a;font-size:13px">Frontier Property Management</p>
</div>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
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
