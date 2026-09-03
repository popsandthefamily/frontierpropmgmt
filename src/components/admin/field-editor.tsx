"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PdfView, type PageBox } from "@/components/sign/pdf-view";

export interface EditorSigner {
  id?: string;
  name: string;
  email: string;
  role_label: string;
  kind: "external" | "owner" | "manager";
}

export interface EditorField {
  id?: string;
  signer_id?: string;
  /** Index into the signer list, used before signers have been saved. */
  signer_index: number;
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

/** One colour per signer, so who signs where is obvious at a glance. */
const PALETTE = [
  { ring: "border-sage", fill: "bg-sage/15", text: "text-sage-dark", solid: "bg-sage" },
  { ring: "border-amber-600", fill: "bg-amber-500/15", text: "text-amber-700", solid: "bg-amber-600" },
  { ring: "border-sky-600", fill: "bg-sky-500/15", text: "text-sky-700", solid: "bg-sky-600" },
  { ring: "border-violet-600", fill: "bg-violet-500/15", text: "text-violet-700", solid: "bg-violet-600" },
  { ring: "border-rose-600", fill: "bg-rose-500/15", text: "text-rose-700", solid: "bg-rose-600" },
];
const colour = (i: number) => PALETTE[i % PALETTE.length];

const input = "w-full rounded-md border border-border px-2 py-1.5 text-sm text-charcoal";

export function FieldEditor({
  documentId,
  fileUrl,
  initialFields,
  initialSigners,
  token,
  locked,
  ownerName,
  ownerEmail,
}: {
  documentId: string;
  fileUrl: string;
  initialFields: EditorField[];
  initialSigners: EditorSigner[];
  token: string;
  /** The cabin owner this document belongs to. */
  ownerName: string;
  ownerEmail: string;
  /** True while a request is open: signers and fields are part of the record. */
  locked: boolean;
}) {
  const router = useRouter();
  const [signers, setSigners] = useState<EditorSigner[]>(
    initialSigners.length > 0
      ? initialSigners
      // The cabin owner is almost always a signer, and is the only person who
      // can sign from the portal, so start with them filled in.
      : [{ name: ownerName, email: ownerEmail, role_label: "Owner", kind: "owner" }],
  );
  const [fields, setFields] = useState<EditorField[]>(initialFields);
  const [activeSigner, setActiveSigner] = useState(0);
  const [activeType, setActiveType] = useState<(typeof TYPES)[number]["type"]>("signature");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const draggingRef = useRef(false);

  const addField = useCallback(
    (page: PageBox, e: React.MouseEvent<HTMLDivElement>) => {
      if (locked) return;
      // Ignore clicks bubbling up from an existing field, and the click that a
      // drag release generates, which would otherwise clone the field.
      if (draggingRef.current) return;
      if (e.target !== e.currentTarget) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const spec = TYPES.find((t) => t.type === activeType)!;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setFields((f) => [
        ...f,
        {
          signer_index: activeSigner,
          page_number: page.pageNumber,
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
    [activeType, activeSigner, locked],
  );

  function moveField(index: number, e: React.MouseEvent) {
    if (locked) return;
    e.stopPropagation();
    draggingRef.current = true;
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
      setTimeout(() => {
        draggingRef.current = false;
      }, 0);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  async function save() {
    setStatus("saving");
    setMessage(null);

    // Signers first: fields are saved against signer ids, which only exist
    // once the signers themselves have been written.
    const sRes = await fetch("/api/admin/signers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId, token, signers }),
    });
    if (!sRes.ok) {
      setStatus("error");
      setMessage((await sRes.json().catch(() => ({}))).error ?? "Could not save signers.");
      return;
    }
    const savedSigners: { id: string }[] = (await sRes.json()).signers ?? [];

    const fRes = await fetch("/api/admin/signature-fields", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId,
        token,
        fields: fields.map((f) => ({
          ...f,
          signer_id: savedSigners[f.signer_index]?.id ?? null,
        })),
      }),
    });
    if (!fRes.ok) {
      setStatus("error");
      setMessage((await fRes.json().catch(() => ({}))).error ?? "Could not save fields.");
      return;
    }

    setStatus("saved");
    setMessage(
      `${signers.length} signer${signers.length === 1 ? "" : "s"}, ${fields.length} field${fields.length === 1 ? "" : "s"} saved.`,
    );
    // The request button reads server data and is disabled while that data has
    // no fields, so without this it stays disabled and looks broken.
    router.refresh();
  }

  const unassigned = signers
    .map((s, i) => ({ s, i, n: fields.filter((f) => f.signer_index === i).length }))
    .filter((x) => x.n === 0);

  return (
    <>
      {/* Signers */}
      <section className="mb-8 border-y border-border py-6">
        <h2 className="font-heading text-lg font-semibold text-charcoal">Signers</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone who has to sign, in order. The cabin owner
          {ownerEmail ? ` (${ownerEmail})` : ""} signs in their portal; everyone
          else gets their own one-time emailed link and needs no account.
          Frontier signs from here.
        </p>

        <div className="mt-4 space-y-3">
          {signers.map((s, i) => (
            <div key={i} className="grid items-center gap-3 sm:grid-cols-[1.5rem_1fr_1.4fr_1fr_1fr_8rem_2rem]">
              <span className={`size-4 rounded-full ${colour(i).solid}`} title="Field colour" />
              <input
                className={input}
                placeholder="Full name"
                value={s.name}
                disabled={locked}
                onChange={(e) =>
                  setSigners((prev) => prev.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                }
              />
              <input
                className={input}
                placeholder={s.kind === "manager" ? "not needed" : "email for their signing link"}
                value={s.email}
                disabled={locked || s.kind === "manager"}
                onChange={(e) =>
                  setSigners((prev) => prev.map((x, j) => (j === i ? { ...x, email: e.target.value } : x)))
                }
              />
              <input
                className={input}
                placeholder="Role, e.g. Co-owner"
                value={s.role_label}
                disabled={locked}
                onChange={(e) =>
                  setSigners((prev) => prev.map((x, j) => (j === i ? { ...x, role_label: e.target.value } : x)))
                }
              />
              <select
                className={input}
                value={s.kind === "manager" ? "manager" : "signer"}
                disabled={locked}
                onChange={(e) =>
                  setSigners((prev) =>
                    prev.map((x, j) =>
                      j === i
                        ? { ...x, kind: e.target.value === "manager" ? "manager" : "external" }
                        : x,
                    ),
                  )
                }
              >
                <option value="signer">Signer</option>
                <option value="manager">Frontier (signs from admin)</option>
              </select>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {s.kind === "manager"
                  ? "signs from admin"
                  : s.email.trim().toLowerCase() === ownerEmail.toLowerCase() && ownerEmail
                    ? "signs in their portal"
                    : "gets a one-time link"}
              </span>
              <button
                type="button"
                disabled={locked || signers.length === 1}
                onClick={() => {
                  setSigners((prev) => prev.filter((_, j) => j !== i));
                  setFields((prev) =>
                    prev
                      .filter((f) => f.signer_index !== i)
                      .map((f) => (f.signer_index > i ? { ...f, signer_index: f.signer_index - 1 } : f)),
                  );
                  setActiveSigner(0);
                }}
                className="text-lg text-muted-foreground disabled:opacity-30"
                title="Remove signer"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {!locked && (
          <button
            type="button"
            onClick={() =>
              setSigners((prev) => [...prev, { name: "", email: "", role_label: "Co-owner", kind: "external" }])
            }
            className="mt-4 text-sm font-medium text-charcoal underline underline-offset-4"
          >
            + Add another signer
          </button>
        )}
        {locked && (
          <p className="mt-4 text-sm text-amber-700">
            A signature request is open, so signers and fields are locked. Cancel
            the request above to change them.
          </p>
        )}
      </section>

      {/* Placement toolbar */}
      {!locked && (
        <div className="sticky top-20 z-10 mb-6 border-y border-border bg-white/95 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
              Placing for
            </span>
            {signers.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSigner(i)}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  activeSigner === i
                    ? `${colour(i).solid} border-transparent text-white`
                    : "border-border text-charcoal hover:border-charcoal"
                }`}
              >
                {s.name || s.role_label || `Signer ${i + 1}`}
                <span className="ml-2 opacity-70">
                  {fields.filter((f) => f.signer_index === i).length}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
              Field
            </span>
            {TYPES.map((t) => (
              <button
                key={t.type}
                type="button"
                onClick={() => setActiveType(t.type)}
                className={`rounded-md border px-3 py-1.5 text-sm ${
                  activeType === t.type
                    ? "border-charcoal bg-charcoal text-white"
                    : "border-border text-charcoal hover:border-charcoal"
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
                Clear fields
              </button>
              <button
                type="button"
                onClick={save}
                disabled={status === "saving"}
                className="rounded-md bg-charcoal px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {status === "saving" ? "Saving…" : "Save signers & fields"}
              </button>
            </span>
          </div>
        </div>
      )}

      {unassigned.length > 0 && !locked && (
        <p className="mb-4 text-sm text-amber-700">
          No fields yet for{" "}
          {unassigned.map((x) => x.s.name || x.s.role_label || `Signer ${x.i + 1}`).join(", ")}
          . A signer with no fields would be asked to sign nothing.
        </p>
      )}

      <PdfView
        url={fileUrl}
        overlay={(page) => (
          <div
            className={locked ? "absolute inset-0" : "absolute inset-0 cursor-crosshair"}
            onClick={(e) => addField(page, e)}
          >
            {fields.map((f, i) =>
              f.page_number !== page.pageNumber ? null : (
                <div
                  key={i}
                  onMouseDown={(e) => moveField(i, e)}
                  className={`group absolute rounded border-2 ${locked ? "" : "cursor-move"} ${
                    colour(f.signer_index).ring
                  } ${colour(f.signer_index).fill}`}
                  style={{
                    left: `${f.x_pct * 100}%`,
                    top: `${f.y_pct * 100}%`,
                    width: `${f.w_pct * 100}%`,
                    height: `${f.h_pct * 100}%`,
                  }}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden whitespace-nowrap text-[10px] font-medium uppercase tracking-wide ${
                      colour(f.signer_index).text
                    }`}
                  >
                    {signers[f.signer_index]?.name?.split(" ")[0] ||
                      signers[f.signer_index]?.role_label ||
                      `S${f.signer_index + 1}`}{" "}
                    · {f.label}
                  </span>
                  {!locked && (
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
                  )}
                </div>
              ),
            )}
          </div>
        )}
      />
    </>
  );
}
