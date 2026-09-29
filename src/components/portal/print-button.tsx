"use client";

/**
 * Hands the statement to the browser's own print dialog, which is also how
 * every browser saves a PDF.
 *
 * Owners need statements for their accountant and at tax time, and there was
 * previously no way to get one out of the portal at all — the figures could
 * only be read on screen. Printing to PDF avoids generating and storing a file
 * server-side for something the browser already does well.
 */
export function PrintButton({
  label = "Print or save as PDF",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-md border border-border px-3 py-1.5 text-sm font-medium text-charcoal transition-colors hover:border-charcoal print:hidden"
    >
      {label}
    </button>
  );
}
