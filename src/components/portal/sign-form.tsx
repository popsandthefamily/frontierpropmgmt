"use client";

import { useRef, useState } from "react";
import { PdfView } from "@/components/sign/pdf-view";
import { Button } from "@/components/ui/button";

export interface SignField {
  id: string;
  signer_role?: string;
  page_number: number;
  x_pct: number;
  y_pct: number;
  w_pct: number;
  h_pct: number;
  field_type: string;
  label: string | null;
  required: boolean;
}

const OWNER_CONSENT =
  "I agree to sign this document electronically, I intend my electronic signature to be my legally binding signature, and I agree that Frontier Property Management may deliver this and related records to me electronically.";

const MANAGER_CONSENT =
  "I am authorised to sign on behalf of Frontier Property Management LLC, and I intend this electronic signature to be the company's legally binding signature on this agreement.";

export function SignForm({
  requestId,
  fileUrl,
  fields,
  defaultName,
  documentTitle,
  role = "owner",
  submitUrl = "/api/portal/sign",
  redirectTo = "/portal",
  token,
  /** Fields belonging to the other party, drawn but not editable. */
  otherPartyFields = [],
}: {
  requestId: string;
  fileUrl: string;
  fields: SignField[];
  defaultName: string;
  documentTitle: string;
  role?: "owner" | "manager";
  submitUrl?: string;
  redirectTo?: string;
  token?: string;
  otherPartyFields?: SignField[];
}) {
  const CONSENT_TEXT = role === "manager" ? MANAGER_CONSENT : OWNER_CONSENT;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const today = new Date().toLocaleDateString("en-US");
    const seed: Record<string, string> = {};
    for (const f of fields) {
      if (f.field_type === "date") seed[f.id] = today;
      if (f.field_type === "name") seed[f.id] = defaultName;
    }
    return seed;
  });
  const [drawingFor, setDrawingFor] = useState<string | null>(null);
  const [signerName, setSignerName] = useState(defaultName);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const missing = fields.filter((f) => f.required && !values[f.id]);
  const canSign = consent && signerName.trim().length > 1 && missing.length === 0;

  async function submit() {
    setStatus("saving");
    setError(null);
    const res = await fetch(submitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId, values, signerName: signerName.trim(), consent: true, token }),
    });
    if (res.ok) {
      setStatus("done");
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
          overlay={(page) => (
            <>
              {otherPartyFields
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
                    <span className="overflow-hidden text-[10px] uppercase tracking-wide text-charcoal/40">
                      {f.signer_role === "manager" ? "Frontier" : "Owner"}
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
                        type="button"
                        onClick={() => setDrawingFor(f.id)}
                        style={style}
                        className={`absolute flex items-center justify-center rounded border-2 ${
                          value ? "border-sage bg-white" : "border-dashed border-sage bg-sage/10 hover:bg-sage/20"
                        }`}
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
                      value={value ?? ""}
                      onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                      placeholder={f.label ?? ""}
                      style={style}
                      className="absolute rounded border-2 border-dashed border-sage bg-sage/10 px-1 text-sm text-charcoal focus:border-solid focus:bg-white focus:outline-none"
                    />
                  );
                })}
            </>
          )}
        />
      </div>

      {/* Consent and completion, deliberately below the document: it should not
          be possible to agree before the thing being agreed to has been shown. */}
      <div className="sticky bottom-0 mt-8 border-t border-charcoal/25 bg-white/95 py-6 backdrop-blur">
        <div className="mx-auto max-w-2xl">
          <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 size-4 shrink-0"
            />
            <span>{CONSENT_TEXT}</span>
          </label>

          <label
            htmlFor="signer-name"
            className="mt-5 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
          >
            Type your full legal name
          </label>
          <input
            id="signer-name"
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            className="mt-2 w-full rounded-md border border-border px-3 py-2 text-charcoal"
          />

          {missing.length > 0 && (
            <p className="mt-3 text-sm text-amber-700">
              {missing.length} field{missing.length === 1 ? "" : "s"} still to
              complete on the document above.
            </p>
          )}
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <Button
            type="button"
            size="lg"
            disabled={!canSign || status === "saving"}
            onClick={submit}
            className="mt-5 w-full bg-sage text-white hover:bg-sage-dark text-base disabled:opacity-40"
          >
            {status === "saving" ? "Completing…" : `Sign ${documentTitle}`}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Signing records the date and time, your IP address and browser, and a
            fingerprint of this exact document. A copy with a certificate of
            completion is filed to your portal immediately.
          </p>
        </div>
      </div>
    </>
  );
}

/** Draw-your-signature pad. */
function SignaturePad({
  onDone,
  onCancel,
}: {
  onDone: (dataUrl: string) => void;
  onCancel: () => void;
}) {
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
        <h2 className="font-heading text-xl font-semibold text-charcoal">
          Draw your signature
        </h2>
        <canvas
          ref={canvasRef}
          width={800}
          height={260}
          onPointerDown={(e) => {
            drawing.current = true;
            const ctx = canvasRef.current!.getContext("2d")!;
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#1f2421";
            const { x, y } = pos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
            setDirty(true);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = canvasRef.current!.getContext("2d")!;
            const { x, y } = pos(e);
            ctx.lineTo(x, y);
            ctx.stroke();
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
            <button type="button" onClick={onCancel} className="text-sm font-medium text-charcoal">
              Cancel
            </button>
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
