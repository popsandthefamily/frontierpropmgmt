import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus, Upload } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { ActionForm } from "@/components/admin/action-form";
import { SubmitButton } from "@/components/sign/submit-button";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { centralDate, centralTime, money, monthLabel } from "@/lib/portal/format";
import {
  dangerAction,
  disclosureSummary,
  documentKind,
  DOCUMENT_KINDS,
  fieldInput,
  fieldLabel,
  pill,
  primaryButton,
  sectionHeading,
  textAction,
} from "@/components/app/styles";
import {
  addProperty,
  deleteDocument,
  saveStatement,
  setDocumentPublished,
  sendOwnerInvite,
  setPublished,
  uploadDocument,
} from "../actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Owner, Admin",
  robots: { index: false, follow: false },
};

export default async function OwnerWorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const { id } = await params;
  const { token } = await searchParams;

  if (!(await isAdmin(token))) {
    return (
      <div className="mx-auto max-w-5xl px-4 pt-10">
        <AdminSignInPrompt />
      </div>
    );
  }

  const qs = token ? `?token=${encodeURIComponent(token)}` : "";
  const admin = getSupabaseAdmin();

  const { data: owner } = await admin
    .from("owner_profiles")
    .select("id, email, full_name, phone")
    .eq("id", id)
    .maybeSingle();
  if (!owner) return notFound();

  const [{ data: props }, { data: stmts }, { data: docs }, { data: requests }] = await Promise.all([
    admin.from("owner_properties").select("*").eq("owner_id", id).order("name"),
    admin.from("owner_statements").select("*").eq("owner_id", id).order("period_start", { ascending: false }),
    admin.from("owner_documents").select("*").eq("owner_id", id).order("created_at", { ascending: false }),
    // Requests decide what is locked: an original with a live request, and any
    // executed copy, are records rather than drafts, so they lose Delete and the
    // copy opens read-only instead of in the field editor.
    admin
      .from("signature_requests")
      .select("id, document_id, status, signed_storage_path")
      .eq("owner_id", id),
  ]);

  const properties = props ?? [];
  const statements = stmts ?? [];
  const documents = docs ?? [];

  const liveRequests = new Set((requests ?? []).filter((r) => r.status !== "void").map((r) => r.id));
  const lockedDocs = new Set((requests ?? []).filter((r) => r.status !== "void").map((r) => r.document_id));
  const signedCopies = new Set((requests ?? []).map((r) => r.signed_storage_path).filter(Boolean));

  // Progress per document counts every signer on it, not just the owner: a
  // co-owner and Frontier are the whole point of the count.
  const { data: allSigners } = documents.length
    ? await admin
        .from("signature_signers")
        .select("document_id, signed_at, request_id")
        .in("document_id", documents.map((d) => d.id))
    : { data: [] };

  const signing = new Map<string, { signed: number; total: number }>();
  for (const s of allSigners ?? []) {
    // A cancelled request's signers no longer count towards anything.
    if (!s.request_id || !liveRequests.has(s.request_id)) continue;
    const cur = signing.get(s.document_id) ?? { signed: 0, total: 0 };
    signing.set(s.document_id, { signed: cur.signed + (s.signed_at ? 1 : 0), total: cur.total + 1 });
  }

  const hidden = (
    <>
      <input type="hidden" name="token" value={token ?? ""} />
      <input type="hidden" name="owner_id" value={owner.id} />
    </>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pt-8">
      <Link href={`/admin/owners${qs}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal underline-offset-4 hover:underline">
        <ArrowLeft className="size-4" aria-hidden /> All owners
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-border pb-6">
        <div className="min-w-0">
          <h1 className="text-3xl font-bold text-charcoal">{owner.full_name || owner.email}</h1>
          <p className="mt-1 text-base text-muted-foreground">
            <a href={`mailto:${owner.email}`} className="underline-offset-4 hover:text-charcoal hover:underline">
              {owner.email}
            </a>
            {owner.phone && (
              <>
                {" · "}
                <a href={`tel:${owner.phone}`} className="underline-offset-4 hover:text-charcoal hover:underline">
                  {owner.phone}
                </a>
              </>
            )}
          </p>
        </div>
        <ActionForm
          action={sendOwnerInvite}
          confirm={`Email ${owner.email} a portal sign-in link?`}
          className="flex flex-col items-start gap-2 sm:items-end"
        >
          {hidden}
          <SubmitButton pendingLabel="Sending…" className={textAction}>
            Send portal invite
          </SubmitButton>
        </ActionForm>
      </header>

      {/* Properties */}
      <section aria-labelledby="properties" className="mt-10">
        <h2 id="properties" className={sectionHeading}>
          Properties <span className="font-sans text-base font-normal text-muted-foreground">{properties.length}</span>
        </h2>
        {properties.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No property yet. Add one before entering statements.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {properties.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <span className="text-base text-charcoal">
                  {p.name}
                  {p.city && <span className="text-muted-foreground"> · {p.city}</span>}
                </span>
                <span className={p.status === "active" ? pill.ok : pill.neutral}>
                  <span className="capitalize">{p.status}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
        <details open={properties.length === 0} className="mt-4">
          <summary className={disclosureSummary}>
            <Plus className="size-4" aria-hidden /> Add a property
          </summary>
          <ActionForm action={addProperty} className="mt-4 flex flex-col gap-4">
            {hidden}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div><label className={fieldLabel} htmlFor="p-name">Property name</label><input id="p-name" className={fieldInput} name="name" required /></div>
              <div><label className={fieldLabel} htmlFor="p-city">City</label><input id="p-city" className={fieldInput} name="city" /></div>
              <div><label className={fieldLabel} htmlFor="p-addr">Address</label><input id="p-addr" className={fieldInput} name="address" /></div>
              <div><label className={fieldLabel} htmlFor="p-hosp">Hospitable ID <span className="font-normal text-muted-foreground">(optional)</span></label><input id="p-hosp" className={fieldInput} name="hospitable_id" /></div>
            </div>
            <div><SubmitButton pendingLabel="Adding…" className={primaryButton}>Add property</SubmitButton></div>
          </ActionForm>
        </details>
      </section>

      {/* Documents */}
      <section aria-labelledby="documents" className="mt-14">
        <h2 id="documents" className={sectionHeading}>
          Documents and signatures <span className="font-sans text-base font-normal text-muted-foreground">{documents.length}</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The owner sees a document only once it&rsquo;s published.
        </p>
        {documents.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing uploaded yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {documents.map((d) => {
              const sig = signing.get(d.id);
              const isCopy = signedCopies.has(d.storage_path);
              const locked = lockedDocs.has(d.id) || isCopy;
              return (
                <li key={d.id} className="grid gap-x-6 gap-y-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/documents/${d.id}${qs}`}
                      className="font-medium text-charcoal underline-offset-4 hover:underline"
                    >
                      {d.title}
                    </Link>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {[
                        documentKind(d.kind),
                        d.period_label,
                        d.size_bytes ? `${Math.max(1, Math.round(d.size_bytes / 1024))} KB` : null,
                        `added ${centralDate(d.created_at)}`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <p className="mt-2 flex flex-wrap gap-2">
                      <span
                        className={d.published_at ? pill.ok : pill.waiting}
                        title={d.published_at ? `Published ${centralTime(d.published_at)}` : undefined}
                      >
                        {d.published_at ? "Published" : "Draft, owner can't see it"}
                      </span>
                      {isCopy && <span className={pill.ok}>Executed copy</span>}
                      {sig && (
                        <span className={sig.signed === sig.total ? pill.ok : pill.waiting}>
                          {sig.signed === sig.total ? "Fully signed" : `${sig.signed} of ${sig.total} signed`}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
                    <Link href={`/admin/documents/${d.id}${qs}`} className={textAction}>
                      {isCopy ? "View & download" : lockedDocs.has(d.id) ? "Signatures" : "Fields & signature"}
                    </Link>
                    <ActionForm action={setDocumentPublished} className="flex flex-col gap-1">
                      <input type="hidden" name="token" value={token ?? ""} />
                      <input type="hidden" name="document_id" value={d.id} />
                      <input type="hidden" name="publish" value={d.published_at ? "false" : "true"} />
                      <SubmitButton pendingLabel="Saving…" className={textAction}>
                        {d.published_at ? "Unpublish" : "Publish"}
                      </SubmitButton>
                    </ActionForm>
                    {!locked && (
                      <ActionForm
                        action={deleteDocument}
                        confirm={`Delete "${d.title}"? The file is removed and can't be recovered.`}
                        className="flex flex-col gap-1"
                      >
                        <input type="hidden" name="token" value={token ?? ""} />
                        <input type="hidden" name="document_id" value={d.id} />
                        <SubmitButton pendingLabel="Deleting…" className={dangerAction}>
                          Delete
                        </SubmitButton>
                      </ActionForm>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <details open={documents.length === 0} className="mt-4">
          <summary className={disclosureSummary}>
            <Upload className="size-4" aria-hidden /> Upload a document
          </summary>
          <ActionForm action={uploadDocument} className="mt-4 flex flex-col gap-4">
            {hidden}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <label className={fieldLabel} htmlFor="d-file">File</label>
                <input
                  id="d-file"
                  className={`${fieldInput} file:mr-3 file:rounded file:border-0 file:bg-cream file:px-2 file:py-1 file:text-sm file:font-medium file:text-charcoal`}
                  name="file"
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls"
                />
              </div>
              <div><label className={fieldLabel} htmlFor="d-title">Title</label><input id="d-title" className={fieldInput} name="title" placeholder="Defaults to the file name" /></div>
              <div>
                <label className={fieldLabel} htmlFor="d-kind">Kind</label>
                <select id="d-kind" className={fieldInput} name="kind" defaultValue="agreement">
                  {Object.entries(DOCUMENT_KINDS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div><label className={fieldLabel} htmlFor="d-period">Period <span className="font-normal text-muted-foreground">(optional)</span></label><input id="d-period" className={fieldInput} name="period_label" placeholder="e.g. 2026" /></div>
            </div>
            <p className="text-sm text-muted-foreground">Uploads start as drafts. Publish one to show it to the owner.</p>
            <div><SubmitButton pendingLabel="Uploading…" className={primaryButton}>Upload document</SubmitButton></div>
          </ActionForm>
        </details>
      </section>

      {/* Statements */}
      <section aria-labelledby="statements" className="mt-14">
        <h2 id="statements" className={sectionHeading}>
          Monthly statements <span className="font-sans text-base font-normal text-muted-foreground">{statements.length}</span>
        </h2>
        {statements.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">None yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-y border-border text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th scope="col" className="py-2 pr-4 font-medium">Month</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Gross</th>
                  <th scope="col" className="py-2 pr-4 text-right font-medium">Payout</th>
                  <th scope="col" className="py-2 pr-4 font-medium">Status</th>
                  <th scope="col" className="py-2 font-medium"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {statements.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3 pr-4 text-base text-charcoal">{monthLabel(s.period_start)}</td>
                    <td className="py-3 pr-4 text-right text-muted-foreground">{money(s.gross_revenue)}</td>
                    <td className="py-3 pr-4 text-right font-medium text-charcoal">{money(s.owner_payout)}</td>
                    <td className="py-3 pr-4">
                      <span className={s.published_at ? pill.ok : pill.waiting}>
                        {s.published_at ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <ActionForm action={setPublished} className="flex flex-col items-end gap-1">
                        <input type="hidden" name="token" value={token ?? ""} />
                        <input type="hidden" name="statement_id" value={s.id} />
                        <input type="hidden" name="publish" value={s.published_at ? "false" : "true"} />
                        <SubmitButton pendingLabel="Saving…" className={textAction}>
                          {s.published_at ? "Unpublish" : "Publish"}
                        </SubmitButton>
                      </ActionForm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {properties.length === 0 ? (
          <p className="mt-4 text-sm text-amber-800">Add a property above before entering a statement.</p>
        ) : (
          <details open={statements.length === 0} className="mt-4">
            <summary className={disclosureSummary}>
              <Plus className="size-4" aria-hidden /> Enter a statement
            </summary>
            <ActionForm action={saveStatement} className="mt-4 flex flex-col gap-4">
              {hidden}
              <p className="max-w-2xl text-sm text-muted-foreground">
                Enter the figures off the payout report. Net rental revenue, the
                20% fee and the payout are calculated for you. Saving a month that
                already has a draft replaces it.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className={fieldLabel} htmlFor="s-prop">Property</label>
                  <select id="s-prop" className={fieldInput} name="property_id" required>
                    {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div><label className={fieldLabel} htmlFor="s-per">Month</label><input id="s-per" className={fieldInput} name="period_month" type="month" required /></div>
                <div><label className={fieldLabel} htmlFor="s-gross">Gross revenue ($)</label><input id="s-gross" className={fieldInput} name="gross_revenue" type="number" inputMode="decimal" step="0.01" min="0" required /></div>
                <div><label className={fieldLabel} htmlFor="s-plat">Platform fees ($)</label><input id="s-plat" className={fieldInput} name="platform_fees" type="number" inputMode="decimal" step="0.01" min="0" /></div>
                <div><label className={fieldLabel} htmlFor="s-tax">Occupancy taxes ($)</label><input id="s-tax" className={fieldInput} name="occupancy_taxes" type="number" inputMode="decimal" step="0.01" min="0" /></div>
                <div><label className={fieldLabel} htmlFor="s-pass">Pass-through costs ($)</label><input id="s-pass" className={fieldInput} name="pass_through_costs" type="number" inputMode="decimal" step="0.01" min="0" /></div>
                <div><label className={fieldLabel} htmlFor="s-nb">Nights booked</label><input id="s-nb" className={fieldInput} name="nights_booked" type="number" inputMode="numeric" min="0" /></div>
                <div><label className={fieldLabel} htmlFor="s-na">Nights available</label><input id="s-na" className={fieldInput} name="nights_available" type="number" inputMode="numeric" min="0" /></div>
              </div>
              <div>
                <label className={fieldLabel} htmlFor="s-notes">Notes to the owner <span className="font-normal text-muted-foreground">(optional, shown on the statement)</span></label>
                <textarea id="s-notes" className={fieldInput} name="notes" rows={3} />
              </div>
              <div><SubmitButton pendingLabel="Saving…" className={primaryButton}>Save as draft</SubmitButton></div>
            </ActionForm>
          </details>
        )}
      </section>
    </div>
  );
}
