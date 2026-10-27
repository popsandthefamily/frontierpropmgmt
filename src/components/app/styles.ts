/**
 * Shared look for the working screens: admin, the owner portal, and signing.
 *
 * These pages used to style each label and section by hand, mostly as tiny
 * letter-spaced capitals at 60% charcoal. That read as decoration, fell under
 * WCAG contrast at its size, and was never a real heading, so a screen reader
 * saw one flat page. One set of classes keeps every screen the same.
 */

/** A section's heading. Always rendered as an h2. */
export const sectionHeading = "scroll-mt-28 font-heading text-2xl font-bold leading-tight text-charcoal";

/** A form field's label, sentence case and full contrast. */
export const fieldLabel = "block text-sm font-medium text-charcoal";

export const fieldInput =
  "mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-base text-charcoal placeholder:text-muted-foreground focus-visible:border-sage focus-visible:outline-2 focus-visible:outline-sage/30 sm:text-sm";

export const primaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:opacity-50";

export const secondaryButton =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-border bg-white px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:opacity-50";

export const textAction =
  "inline-flex items-center gap-1.5 text-sm font-medium text-charcoal underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage";

export const dangerAction =
  "inline-flex items-center gap-1.5 text-sm font-medium text-destructive underline underline-offset-4 decoration-destructive/30 hover:decoration-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive";

/** The open/close row of an "add something" disclosure. */
export const disclosureSummary =
  "inline-flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage [&::-webkit-details-marker]:hidden";

/** Small status pill. Tone carries meaning, so it is never decorative. */
export const pill = {
  ok: "inline-flex items-center rounded-full bg-sage/12 px-2.5 py-0.5 text-xs font-medium text-sage-dark",
  waiting: "inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-800",
  neutral: "inline-flex items-center rounded-full bg-charcoal/8 px-2.5 py-0.5 text-xs font-medium text-charcoal/80",
};

/** Plain-language names for document kinds, which are stored as slugs. */
export const DOCUMENT_KINDS: Record<string, string> = {
  agreement: "Agreement",
  tax: "Tax document",
  statement: "Statement",
  inspection: "Inspection",
  invoice: "Invoice",
  other: "Other",
};
export const documentKind = (kind: string | null | undefined) =>
  DOCUMENT_KINDS[kind ?? ""] ?? "Document";
