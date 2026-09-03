import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createHash } from "crypto";

/**
 * Flattens a signature onto a PDF.
 *
 * Two coordinate systems meet here and they disagree about which way is up. The
 * browser places fields from the top-left as a fraction of the page; PDF draws
 * from the bottom-left in points. Converting once, here, is why a box dragged
 * on screen ends up exactly where it looked like it would.
 *
 * The result is flattened: the signature becomes page content, not an
 * annotation or a form field, so it cannot be deleted or edited by a PDF
 * reader. Both the input and the output are hashed so it is provable later that
 * this signature belongs to this exact document.
 */

export interface PlacedField {
  page_number: number;
  x_pct: number;
  y_pct: number;
  w_pct: number;
  h_pct: number;
  field_type: string;
  value: string;
}

export function sha256(bytes: Uint8Array | Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

export async function burnSignature(
  sourceBytes: Uint8Array,
  fields: PlacedField[],
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(sourceBytes);
  const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();

  for (const field of fields) {
    const page = pages[field.page_number - 1];
    if (!page || !field.value) continue;

    const { width: pw, height: ph } = page.getSize();
    const x = field.x_pct * pw;
    const w = field.w_pct * pw;
    const h = field.h_pct * ph;
    // Flip the origin: the browser measures y down from the top, PDF measures
    // up from the bottom.
    const y = ph - field.y_pct * ph - h;

    if (field.field_type === "signature" || field.field_type === "initials") {
      if (!field.value.startsWith("data:image/png;base64,")) continue;
      const png = await pdf.embedPng(field.value);
      // Fit inside the box without distorting the drawn stroke.
      const scale = Math.min(w / png.width, h / png.height);
      const dw = png.width * scale;
      const dh = png.height * scale;
      page.drawImage(png, {
        x: x + (w - dw) / 2,
        y: y + (h - dh) / 2,
        width: dw,
        height: dh,
      });
    } else {
      // Shrink to fit rather than overflow the box the admin drew.
      let size = Math.min(h * 0.7, 14);
      while (size > 5 && helvetica.widthOfTextAtSize(field.value, size) > w) {
        size -= 0.5;
      }
      page.drawText(field.value, {
        x: x + 2,
        y: y + (h - size) / 2 + size * 0.15,
        size,
        font: helvetica,
        color: rgb(0.1, 0.1, 0.1),
      });
    }
  }

  return pdf.save();
}

/**
 * A plain-language audit page appended to the signed document.
 *
 * The evidence lives in the database, but a PDF that travels on its own — to a
 * lender, an accountant, or a court — should carry its own proof rather than
 * depending on a system the reader cannot query.
 */
export async function appendCertificate(
  signedBytes: Uint8Array,
  info: {
    documentTitle: string;
    signerName: string;
    signerEmail: string;
    signedAt: string;
    ip: string;
    userAgent: string;
    consentText: string;
    consentAt: string;
    sourceSha256: string;
    requestId: string;
  },
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(signedBytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const page = pdf.addPage();
  const { height } = page.getSize();

  let y = height - 64;
  const left = 56;
  const line = (text: string, opts: { bold?: boolean; size?: number; gap?: number } = {}) => {
    const size = opts.size ?? 10;
    page.drawText(text, {
      x: left,
      y,
      size,
      font: opts.bold ? bold : font,
      color: rgb(0.15, 0.15, 0.15),
    });
    y -= opts.gap ?? size + 6;
  };

  line("Certificate of Completion", { bold: true, size: 18, gap: 28 });
  line("Frontier Property Management LLC", { size: 10, gap: 22 });

  line("Document", { bold: true, gap: 16 });
  line(info.documentTitle, { gap: 14 });
  line(`SHA-256 of the document presented for signature:`, { gap: 13 });
  line(info.sourceSha256, { size: 8, gap: 20 });

  line("Signer", { bold: true, gap: 16 });
  line(`${info.signerName} (${info.signerEmail})`, { gap: 20 });

  line("Consent to sign electronically", { bold: true, gap: 16 });
  for (const chunk of wrap(info.consentText, 95)) line(chunk, { size: 9, gap: 12 });
  line(`Consent recorded ${info.consentAt}`, { size: 9, gap: 20 });

  line("Signature event", { bold: true, gap: 16 });
  line(`Signed at:    ${info.signedAt}`, { gap: 13 });
  line(`IP address:   ${info.ip}`, { gap: 13 });
  for (const chunk of wrap(`Browser:      ${info.userAgent}`, 95)) line(chunk, { size: 9, gap: 12 });
  line(`Reference:    ${info.requestId}`, { gap: 24 });

  page.drawText(
    "This certificate is generated from an append-only audit record. Any change to the",
    { x: left, y, size: 8, font, color: rgb(0.45, 0.45, 0.45) },
  );
  y -= 11;
  page.drawText(
    "signed document after this point will cause its hash to stop matching the record.",
    { x: left, y, size: 8, font, color: rgb(0.45, 0.45, 0.45) },
  );

  return pdf.save();
}

function wrap(text: string, chars: number): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > chars) {
      out.push(current.trim());
      current = word;
    } else {
      current = `${current} ${word}`;
    }
  }
  if (current.trim()) out.push(current.trim());
  return out;
}
