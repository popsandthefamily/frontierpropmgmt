"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PdfView } from "@/components/sign/pdf-view";
import { Button } from "@/components/ui/button";

export interface SignField {
  id: string;
  page_number: number;
  x_pct: number;
  y_pct: number;
  w_pct: number;
  h_pct: number;
  field_type: string;
  label: string | null;
  required: boolean;
}

/**
 * The signing screen, shared by all three doors: an emailed link, a portal
 * owner, and Frontier. Only how the signer was authorised differs.
 */
export function SignDocument({
  fileUrl,
  fields,
  otherFields,
  documentTitle,
  signerName,
  roleLabel,
  consentText,
  token,
  signerId,
  adminToken,
  redirectTo,
}: {
  fileUrl: string;
  fields: SignField[];
  otherFields: SignField[];
  documentTitle: string;
  signerName: string;
  roleLabel: string;
  consentText: string;
  token?: string;
  signerId?: string;
  adminToken?: string;
  redirectTo: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const today = new Date().toLocaleDateString("en-US");
    const seed: Record<string, string> = {};
    for (const f of fields) {
      if (f.field_type === "date") seed[f.id] = today;
      if (f.field_type === "name") seed[f.id] = signerName;
    }
    return seed;
  });
  const [drawingFor, setDrawingFor] = useState<string | null>(null);
  const [typedName, setTypedName] = useState(signerName);
  const [consent, setConsent] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const boxes = useRef(new Map<string, HTMLElement>());

  const missing = fields.filter((f) => f.required && !values[f.id]);
  const done = fields.length - missing.length;
  const canSign = consent && typedName.trim().length > 1 && missing.length === 0;

  /**
   * Jump to the next field that still needs something, the way every other
   * e-signature tool does. On a long agreement the fields are easy to miss,
   * and "1 field still to complete" is useless if you can't find which one.
   */
  const goToNext = useCallback(() => {
    const target = missing[0] ?? fields[0];
    if (!target) return;
    const el = boxes.current.get(target.id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlash(target.id);
    window.setTimeout(() => setFlash(null), 1600);
  }, [missing, fields]);

  // Nudge the signer to the first field once the document has rendered.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (boxes.current.size > 0) goToNext();
    }, 1200);
    return () => window.clearTimeout(t);
    // Only on first render: re-running would yank the page around mid-signing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit() {
    setStatus("saving");
    setError(null);
    const res = await fetch("/api/sign/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        signerId,
        adminToken,
        values,
        signerName: typedName.trim(),
        consent: true,
        consentText,
      }),
    });
    if (res.ok) {
      window.location.replace(redirectTo);
    } else {
      setError((await res.json().catch(() => ({}))).error ?? "Could not complete the signature.");
      setStatus("error");
    }
  }

  return (
    <>
      {drawingFor && (
        <SignaturePad
          onCancel={() => setDrawingFor(null)}
          onDone={(dataUrl) => {
            setValues((v) => ({ ...v, [drawingFor]: dataUrl }));
            setDrawingFor(null);
          }}
        />
      )}

      <div className="mt-8">
        <PdfView
          url={fileUrl}
          maxWidth={1100}
          overlay={(page) => (
            <>
              {otherFields
                .filter((f) => f.page_number === page.pageNumber)
                .map((f) => (
                  <div
                    key={f.id}
                    style={{
                      left: `${f.x_pct * 100}%`,
                      top: `${f.y_pct * 100}%`,
                      width: `${f.w_pct * 100}%`,
                      height: `${f.h_pct * 100}%`,
                    }}
                    className="absolute flex items-center justify-center rounded border border-dashed border-charcoal/25 bg-charcoal/5"
                  >
                    <span className="overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-wide text-charcoal/40">
                      {f.label}
                    </span>
                  </div>
                ))}
              {fields
                .filter((f) => f.page_number === page.pageNumber)
                .map((f) => {
                  const value = values[f.id];
                  const style = {
                    left: `${f.x_pct * 100}%`,
                    top: `${f.y_pct * 100}%`,
                    width: `${f.w_pct * 100}%`,
                    height: `${f.h_pct * 100}%`,
                  };
                  if (f.field_type === "signature" || f.field_type === "initials") {
                    return (
                      <button
                        key={f.id}
                        ref={(el) => {
                          if (el) boxes.current.set(f.id, el);
                        }}
                        type="button"
                        onClick={() => setDrawingFor(f.id)}
                        style={style}
                        className={`absolute flex items-center justify-center rounded border-2 ${
                          value ? "border-sage bg-white" : "border-dashed border-sage bg-sage/10 hover:bg-sage/20"
                        } ${flash === f.id ? "ring-4 ring-amber-400 ring-offset-2" : ""}`}
                      >
                        {value ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={value} alt="Your signature" className="max-h-full max-w-full" />
                        ) : (
                          <span className="text-[10px] font-medium uppercase tracking-wide text-sage-dark">
                            {f.label ?? "Sign"}
                          </span>
                        )}
                      </button>
                    );
                  }
                  return (
                    <input
                      key={f.id}
                      ref={(el) => {
                        if (el) boxes.current.set(f.id, el);
                      }}
                      value={value ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                      placeholder={f.label ?? ""}
                      style={style}
                      className={`absolute rounded border-2 border-dashed border-sage bg-sage/10 px-1 text-sm text-charcoal focus:border-solid focus:bg-white focus:outline-none ${
                        flash === f.id ? "ring-4 ring-amber-400 ring-offset-2" : ""
                      }`}
                    />
                  );
                })}
            </>
          )}
        />
      </div>

      {/* A slim bar: the document is the thing being read, so the controls stay
          out of its way. Consent and the typed name move into the final step,
          which also stops anyone agreeing before they have scrolled anything. */}
      <div className="sticky bottom-0 z-20 mt-6 border-t border-charcoal/20 bg-white/95 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-1">
          <span className="text-sm text-muted-foreground">
            <span className="font-medium text-charcoal">
              {done} of {fields.length}
            </span>{" "}
            complete
          </span>

          {missing.length > 0 && (
            <button
              type="button"
              onClick={goToNext}
              className="rounded-md border border-sage px-3 py-1.5 text-sm font-medium text-sage-dark hover:bg-sage/10"
            >
              Next field ↓
            </button>
          )}

          {error && <span className="text-sm text-destructive">{error}</span>}

          <span className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Signing as {roleLabel}
            </span>
            <button
              type="button"
              disabled={missing.length > 0}
              onClick={() => setConfirming(true)}
              className="rounded-md bg-sage px-5 py-2 text-sm font-semibold text-white hover:bg-sage-dark disabled:opacity-40"
            >
              {missing.length > 0 ? `${missing.length} left to complete` : "Review and sign"}
            </button>
          </span>
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <h2 className="font-heading text-xl font-semibold text-charcoal">
              Sign {documentTitle}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Signing as {roleLabel}.</p>

            <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-charcoal">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4 shrink-0"
              />
              <span>{consentText}</span>
            </label>

            <label
              htmlFor="typed-name"
              className="mt-5 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
            >
              Type your full legal name
            </label>
            <input
              id="typed-name"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              className="mt-2 w-full rounded-md border border-border px-3 py-2 text-charcoal"
            />

            {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-sm font-medium text-charcoal"
              >
                Back to the document
              </button>
              <Button
                type="button"
                size="lg"
                disabled={!canSign || status === "saving"}
                onClick={submit}
                className="bg-sage text-white hover:bg-sage-dark disabled:opacity-40"
              >
                {status === "saving" ? "Completing…" : "Sign"}
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Signing records the date and time, your IP address and browser, and
              a fingerprint of this exact document.
            </p>
          </div>
        </div>
      )}

    </>
  );
}

function SignaturePad({ onDone, onCancel }: { onDone: (d: string) => void; onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [dirty, setDirty] = useState(false);

  function pos(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/60 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="font-heading text-xl font-semibold text-charcoal">Draw your signature</h2>
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          onPointerDown={(e) => {
            drawing.current = true;
            const ctx = canvasRef.current!.getContext("2d")!;
            ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.strokeStyle = "#1f2421";
            const { x, y } = pos(e);
            ctx.beginPath(); ctx.moveTo(x, y);
            setDirty(true);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = canvasRef.current!.getContext("2d")!;
            const { x, y } = pos(e);
            ctx.lineTo(x, y); ctx.stroke();
          }}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
          className="mt-4 w-full touch-none rounded-md border-2 border-dashed border-border bg-cream"
          style={{ aspectRatio: "800 / 260" }}
        />
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              const c = canvasRef.current!;
              c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
              setDirty(false);
            }}
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            Clear
          </button>
          <span className="flex gap-3">
            <button type="button" onClick={onCancel} className="text-sm font-medium text-charcoal">Cancel</button>
            <button
              type="button"
              disabled={!dirty}
              onClick={() => onDone(canvasRef.current!.toDataURL("image/png"))}
              className="rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Use this signature
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
