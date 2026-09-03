"use client";

import { useCallback, useState } from "react";
import { PdfView, type PageBox } from "@/components/sign/pdf-view";

export interface EditorField {
  id?: string;
  page_number: number;
  x_pct: number;
  y_pct: number;
  w_pct: number;
  h_pct: number;
  field_type: string;
  label: string | null;
  required: boolean;
}

const TYPES = [
  { type: "signature", label: "Signature", w: 0.26, h: 0.055 },
  { type: "initials", label: "Initials", w: 0.09, h: 0.045 },
  { type: "date", label: "Date", w: 0.16, h: 0.03 },
  { type: "name", label: "Full name", w: 0.24, h: 0.03 },
  { type: "text", label: "Text", w: 0.24, h: 0.03 },
] as const;

/**
 * Click a page to drop a field, drag to move it.
 *
 * Everything is stored as a fraction of the page rather than pixels, so the
 * layout survives a different screen, a different zoom, and the conversion into
 * PDF points when the document is signed.
 */
export function FieldEditor({
  documentId,
  fileUrl,
  initialFields,
  token,
}: {
  documentId: string;
  fileUrl: string;
  initialFields: EditorField[];
  token: string;
}) {
  const [fields, setFields] = useState<EditorField[]>(initialFields);
  const [active, setActive] = useState<(typeof TYPES)[number]["type"]>("signature");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const addField = useCallback(
    (page: PageBox, e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const spec = TYPES.find((t) => t.type === active)!;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setFields((f) => [
        ...f,
        {
          page_number: page.pageNumber,
          // Drop centred on the click, kept inside the page.
          x_pct: Math.min(Math.max(x - spec.w / 2, 0), 1 - spec.w),
          y_pct: Math.min(Math.max(y - spec.h / 2, 0), 1 - spec.h),
          w_pct: spec.w,
          h_pct: spec.h,
          field_type: spec.type,
          label: spec.label,
          required: true,
        },
      ]);
    },
    [active],
  );

  function moveField(index: number, page: PageBox, e: React.MouseEvent) {
    e.stopPropagation();
    const pageEl = (e.currentTarget as HTMLElement).parentElement;
    if (!pageEl) return;
    const rect = pageEl.getBoundingClientRect();
    const field = fields[index];
    const grabX = e.clientX - (rect.left + field.x_pct * rect.width);
    const grabY = e.clientY - (rect.top + field.y_pct * rect.height);

    function onMove(ev: MouseEvent) {
      const nx = (ev.clientX - grabX - rect.left) / rect.width;
      const ny = (ev.clientY - grabY - rect.top) / rect.height;
      setFields((prev) =>
        prev.map((f, i) =>
          i === index
            ? {
                ...f,
                x_pct: Math.min(Math.max(nx, 0), 1 - f.w_pct),
                y_pct: Math.min(Math.max(ny, 0), 1 - f.h_pct),
              }
            : f,
        ),
      );
    }
    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  async function save() {
    setStatus("saving");
    setMessage(null);
    const res = await fetch("/api/admin/signature-fields", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, token, fields }),
    });
    if (res.ok) {
      setStatus("saved");
      setMessage(`${fields.length} field${fields.length === 1 ? "" : "s"} saved.`);
    } else {
      setStatus("error");
      setMessage((await res.json().catch(() => ({}))).error ?? "Could not save.");
    }
  }

  return (
    <>
      <div className="sticky top-20 z-10 mb-6 flex flex-wrap items-center gap-3 border-y border-border bg-white/95 py-3 backdrop-blur">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
          Place
        </span>
        {TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => setActive(t.type)}
            className={`rounded-md border px-3 py-1.5 text-sm ${
              active === t.type
                ? "border-sage bg-sage text-white"
                : "border-border text-charcoal hover:border-sage"
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-3">
          {message && (
            <span className={status === "error" ? "text-sm text-destructive" : "text-sm text-sage"}>
              {message}
            </span>
          )}
          <button
            type="button"
            onClick={() => setFields([])}
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {status === "saving" ? "Saving…" : "Save fields"}
          </button>
        </span>
      </div>

      <p className="mb-4 text-sm text-muted-foreground">
        Click anywhere on the page to drop the selected field. Drag a field to
        move it, or click the × to remove it.
      </p>

      <PdfView
        url={fileUrl}
        overlay={(page) => (
          <div className="absolute inset-0 cursor-crosshair" onClick={(e) => addField(page, e)}>
            {fields.map((f, i) =>
              f.page_number !== page.pageNumber ? null : (
                <div
                  key={i}
                  onMouseDown={(e) => moveField(i, page, e)}
                  className="group absolute cursor-move rounded border-2 border-sage bg-sage/15"
                  style={{
                    left: `${f.x_pct * 100}%`,
                    top: `${f.y_pct * 100}%`,
                    width: `${f.w_pct * 100}%`,
                    height: `${f.h_pct * 100}%`,
                  }}
                >
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-wide text-sage-dark">
                    {f.label}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFields((prev) => prev.filter((_, j) => j !== i));
                    }}
                    className="absolute -right-2 -top-2 size-5 rounded-full bg-charcoal text-xs text-white opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ),
            )}
          </div>
        )}
      />
    </>
  );
}
