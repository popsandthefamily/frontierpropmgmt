"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { PdfView } from "@/components/sign/pdf-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  // Where the last jump landed, so repeated clicks advance instead of sitting
  // on the same field.
  const cursor = useRef<string | null>(null);

  const missing = fields.filter((f) => f.required && !values[f.id]);
  const done = fields.length - missing.length;
  const canSign = consent && typedName.trim().length > 1 && missing.length === 0;

  // Reading order, not the order they were placed: down the page, page by page.
  const ordered = [...fields].sort(
    (a, b) => a.page_number - b.page_number || a.y_pct - b.y_pct || a.x_pct - b.x_pct,
  );

  /**
   * Advance to the next field still needing something.
   *
   * Cycles rather than always returning to the first one. Clicking twice and
   * not moving reads as a broken button, which is exactly what it looked like.
   * Wraps at the end so the last field leads back to the first outstanding one.
   */
  const goToNext = useCallback(() => {
    const outstanding = ordered.filter((f) => !values[f.id]);
    const pool = outstanding.length > 0 ? outstanding : ordered;
    if (pool.length === 0) return;

    const at = cursor.current ? pool.findIndex((f) => f.id === cursor.current) : -1;
    const target = pool[(at + 1) % pool.length];

    const el = boxes.current.get(target.id);
    if (!el) return;
    cursor.current = target.id;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlash(target.id);
    window.setTimeout(() => setFlash(null), 2400);
  }, [ordered, values]);

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
    if (status === "saving") return;
    setStatus("saving");
    setError(null);
    try {
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
        }),
      });
      if (res.ok) {
        window.location.replace(redirectTo);
        return;
      }
      setError((await res.json().catch(() => ({}))).error ?? "Could not complete the signature.");
    } catch {
      // A dropped connection used to leave the button on "Completing…" forever.
      setError("Couldn't reach Frontier. Check your connection and press Sign again.");
    }
    setStatus("error");
  }

  return (
    <>
      <Dialog open={drawingFor !== null} onOpenChange={(open) => !open && setDrawingFor(null)}>
        {drawingFor && (
          <SignaturePad
            onCancel={() => setDrawingFor(null)}
            onDone={(dataUrl) => {
              setValues((v) => ({ ...v, [drawingFor]: dataUrl }));
              setDrawingFor(null);
            }}
          />
        )}
      </Dialog>

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
                        aria-label={value ? `${f.label ?? "Signature"}: signed. Draw again` : `Draw your ${(f.label ?? "signature").toLowerCase()}`}
                        style={style}
                        className={`absolute flex items-center justify-center rounded border-2 ${
                          value ? "border-sage bg-white" : "border-dashed border-sage bg-sage/10 hover:bg-sage/20"
                        } ${flash === f.id ? "z-10 ring-4 ring-amber-500 ring-offset-2 ring-offset-white shadow-lg" : ""}`}
                      >
                        {value ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={value} alt="" className="max-h-full max-w-full" />
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
                      aria-label={f.label ?? "Field"}
                      aria-required={f.required}
                      maxLength={500}
                      style={style}
                      className={`absolute rounded border-2 border-dashed border-sage bg-sage/10 px-1 text-sm text-charcoal focus:border-solid focus:bg-white focus:outline-none ${
                        flash === f.id ? "z-10 ring-4 ring-amber-500 ring-offset-2 ring-offset-white shadow-lg" : ""
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

          {fields.length > 0 && (
            <button
              type="button"
              onClick={goToNext}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-sage px-3 py-1.5 text-sm font-medium text-sage-dark hover:bg-sage/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
            >
              {missing.length > 1
                ? `Next of ${missing.length}`
                : missing.length === 1
                  ? "Go to the field"
                  : "Review fields"}
              <ArrowDown className="size-4" aria-hidden />
            </button>
          )}

          {error && !confirming && (
            <span role="alert" className="text-sm text-destructive">
              {error}
            </span>
          )}

          <span className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Signing as {roleLabel}
            </span>
            <button
              type="button"
              disabled={missing.length > 0}
              onClick={() => setConfirming(true)}
              className="min-h-10 rounded-md bg-sage px-5 py-2 text-sm font-semibold text-white hover:bg-sage-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage disabled:opacity-40"
            >
              {missing.length > 0 ? `${missing.length} left to complete` : "Review and sign"}
            </button>
          </span>
        </div>
      </div>

      <Dialog
        open={confirming}
        // Not while saving: closing mid-request would hide the outcome.
        onOpenChange={(open) => status !== "saving" && setConfirming(open)}
      >
        <DialogContent className="bg-white sm:max-w-lg" showCloseButton={status !== "saving"}>
          <DialogHeader className="text-left">
            <DialogTitle className="font-heading text-xl font-semibold leading-snug text-charcoal">
              Sign {documentTitle}
            </DialogTitle>
            <DialogDescription>Signing as {roleLabel}.</DialogDescription>
          </DialogHeader>

          <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 shrink-0 accent-sage"
            />
            <span>{consentText}</span>
          </label>

          <div>
            <label htmlFor="typed-name" className="block text-sm font-medium text-charcoal">
              Your full legal name
            </label>
            <input
              id="typed-name"
              value={typedName}
              onChange={(e) => setTypedName(e.target.value)}
              autoComplete="name"
              maxLength={200}
              className="mt-2 w-full rounded-md border border-border px-3 py-2 text-base text-charcoal focus-visible:border-sage focus-visible:outline-2 focus-visible:outline-sage/40"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter className="items-center sm:justify-between">
            <Button
              type="button"
              variant="ghost"
              disabled={status === "saving"}
              onClick={() => setConfirming(false)}
              className="text-charcoal"
            >
              Back to the document
            </Button>
            <Button
              type="button"
              size="lg"
              disabled={!canSign || status === "saving"}
              onClick={submit}
              className="bg-sage text-white hover:bg-sage-dark disabled:opacity-40"
            >
              {status === "saving" ? "Completing…" : "Sign"}
            </Button>
          </DialogFooter>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Signing records the date and time, your IP address and browser, and
            a fingerprint of this exact document.
          </p>
        </DialogContent>
      </Dialog>
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

  // Captured, so a stroke that strays past the edge keeps drawing instead of
  // ending, and a cancelled touch (a scroll gesture, an incoming call) cannot
  // leave the pen stuck down.
  const stop = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <DialogContent className="bg-white sm:max-w-lg">
      <DialogHeader className="text-left">
        <DialogTitle className="font-heading text-xl font-semibold text-charcoal">
          Draw your signature
        </DialogTitle>
        <DialogDescription>Use your finger, a stylus, or the mouse.</DialogDescription>
      </DialogHeader>
      <canvas
        ref={canvasRef}
        width={800}
        height={260}
        aria-label="Signature drawing area"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drawing.current = true;
          const ctx = canvasRef.current!.getContext("2d")!;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = "#1f2421";
          const { x, y } = pos(e);
          ctx.beginPath();
          ctx.moveTo(x, y);
          // A tap leaves a dot rather than nothing.
          ctx.lineTo(x + 0.1, y + 0.1);
          ctx.stroke();
          setDirty(true);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          const ctx = canvasRef.current!.getContext("2d")!;
          const { x, y } = pos(e);
          ctx.lineTo(x, y);
          ctx.stroke();
        }}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="w-full cursor-crosshair touch-none rounded-md border-2 border-dashed border-border bg-cream"
        style={{ aspectRatio: "800 / 260" }}
      />
      <DialogFooter className="items-center sm:justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={!dirty}
          onClick={() => {
            const c = canvasRef.current!;
            c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
            setDirty(false);
          }}
          className="text-muted-foreground"
        >
          Clear
        </Button>
        <span className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="button" variant="ghost" onClick={onCancel} className="text-charcoal">
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!dirty}
            onClick={() => onDone(canvasRef.current!.toDataURL("image/png"))}
            className="bg-sage text-white hover:bg-sage-dark disabled:opacity-40"
          >
            Use this signature
          </Button>
        </span>
      </DialogFooter>
    </DialogContent>
  );
}
