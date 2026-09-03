import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { SubmitButton } from "@/components/sign/submit-button";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel } from "@/lib/portal/format";
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

const input = "mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-charcoal";
const label = "text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60";
const button = "mt-4 rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white disabled:opacity-50";
const eyebrow = "border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60";

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
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
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

  const [{ data: props }, { data: stmts }, { data: docs }, { data: signers }] = await Promise.all([
    admin.from("owner_properties").select("*").eq("owner_id", id).order("name"),
    admin.from("owner_statements").select("*").eq("owner_id", id).order("period_start", { ascending: false }),
    admin.from("owner_documents").select("*").eq("owner_id", id).order("created_at", { ascending: false }),
    admin.from("owner_documents").select("id").eq("owner_id", id),
  ]);

  const properties = props ?? [];
  const statements = stmts ?? [];
  const documents = docs ?? [];

  // Progress per document counts every signer on it, not just the owner: a
  // co-owner and Frontier are the whole point of the count.
  const docIds = (signers ?? []).map((d) => d.id);
  const { data: allSigners } = docIds.length
    ? await admin
        .from("signature_signers")
        .select("document_id, signed_at, request_id")
        .in("document_id", docIds)
    : { data: [] };

  const signing = new Map<string, { signed: number; total: number }>();
  for (const s of allSigners ?? []) {
    if (!s.request_id) continue;
    const cur = signing.get(s.document_id) ?? { signed: 0, total: 0 };
    signing.set(s.document_id, { signed: cur.signed + (s.signed_at ? 1 : 0), total: cur.total + 1 });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
      <Link href={`/admin/owners${qs}`} className="text-sm font-medium text-charcoal underline-offset-4 hover:underline">
        ← All owners
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-charcoal">{owner.full_name || owner.email}</h1>
      <div className="mt-1 flex flex-wrap items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {owner.email}
          {owner.phone ? ` · ${owner.phone}` : ""}
        </p>
        <form action={sendOwnerInvite}>
          <input type="hidden" name="token" value={token ?? ""} />
          <input type="hidden" name="owner_id" value={owner.id} />
          <SubmitButton
            pendingLabel="Sending…"
            className="text-sm font-medium text-charcoal underline underline-offset-4"
          >
            Send portal invite
          </SubmitButton>
        </form>
      </div>

      {/* Properties */}
      <section className="mt-12">
        <div className={eyebrow}>Properties</div>
        {properties.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">None yet.</p>
        ) : (
          <ul className="mt-2 text-sm">
            {properties.map((p) => (
              <li key={p.id} className="flex items-center justify-between border-b border-border py-3">
                <span className="text-charcoal">
                  {p.name}
                  {p.city && <span className="text-muted-foreground"> · {p.city}</span>}
                </span>
                <span className="capitalize text-muted-foreground">{p.status}</span>
              </li>
            ))}
          </ul>
        )}
        <form action={addProperty} className="mt-4">
          <input type="hidden" name="token" value={token ?? ""} />
          <input type="hidden" name="owner_id" value={owner.id} />
          <div className="grid gap-4 sm:grid-cols-4">
            <div><label className={label} htmlFor="p-name">Property name</label><input id="p-name" className={input} name="name" required /></div>
            <div><label className={label} htmlFor="p-city">City</label><input id="p-city" className={input} name="city" /></div>
            <div><label className={label} htmlFor="p-addr">Address</label><input id="p-addr" className={input} name="address" /></div>
            <div><label className={label} htmlFor="p-hosp">Hospitable ID</label><input id="p-hosp" className={input} name="hospitable_id" /></div>
          </div>
          <SubmitButton pendingLabel="Adding…" className={button}>Add property</SubmitButton>
        </form>
      </section>

      {/* Documents */}
      <section className="mt-14">
        <div className={eyebrow}>Documents and signatures</div>
        {documents.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nothing uploaded yet.</p>
        ) : (
          <ul className="mt-2 text-sm">
            {documents.map((d) => {
              const sig = signing.get(d.id);
              return (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
                  <span className="text-charcoal">
                    {d.title}
                    <span className="text-muted-foreground">
                      {" "}· {d.kind}
                      {d.period_label ? ` · ${d.period_label}` : ""}
                      {d.size_bytes ? ` · ${Math.round(d.size_bytes / 1024)} KB` : ""}
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center gap-4">
                    {sig && (
                      <span className={sig.signed === sig.total ? "text-sage" : "text-amber-600"}>
                        {sig.signed === sig.total ? "fully signed" : `${sig.signed} of ${sig.total} signed`}
                      </span>
                    )}
                    <span className={d.published_at ? "text-sage" : "text-amber-600"}>
                      {d.published_at ? "Published" : "Draft"}
                    </span>
                    <Link href={`/admin/documents/${d.id}${qs}`} className="font-medium text-charcoal underline underline-offset-4">
                      Fields &amp; signature
                    </Link>
                    <form action={setDocumentPublished}>
                      <input type="hidden" name="token" value={token ?? ""} />
                      <input type="hidden" name="document_id" value={d.id} />
                      <input type="hidden" name="publish" value={d.published_at ? "false" : "true"} />
                      <SubmitButton pendingLabel="…" className="font-medium text-charcoal underline underline-offset-4">
                        {d.published_at ? "Unpublish" : "Publish"}
                      </SubmitButton>
                    </form>
                    <form action={deleteDocument}>
                      <input type="hidden" name="token" value={token ?? ""} />
                      <input type="hidden" name="document_id" value={d.id} />
                      <SubmitButton pendingLabel="…" className="font-medium text-destructive underline underline-offset-4">
                        Delete
                      </SubmitButton>
                    </form>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        <form action={uploadDocument} className="mt-4">
          <input type="hidden" name="token" value={token ?? ""} />
          <input type="hidden" name="owner_id" value={owner.id} />
          <div className="grid gap-4 sm:grid-cols-4">
            <div><label className={label} htmlFor="d-file">File</label><input id="d-file" className={input} name="file" type="file" required accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls" /></div>
            <div><label className={label} htmlFor="d-title">Title</label><input id="d-title" className={input} name="title" placeholder="Defaults to the filename" /></div>
            <div>
              <label className={label} htmlFor="d-kind">Kind</label>
              <select id="d-kind" className={input} name="kind" defaultValue="agreement">
                <option value="agreement">Agreement</option>
                <option value="tax">Tax document</option>
                <option value="statement">Statement</option>
                <option value="inspection">Inspection</option>
                <option value="invoice">Invoice</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div><label className={label} htmlFor="d-period">Period</label><input id="d-period" className={input} name="period_label" placeholder="2026" /></div>
          </div>
          <SubmitButton pendingLabel="Uploading…" className={button}>Upload document</SubmitButton>
        </form>
      </section>

      {/* Statements */}
      <section className="mt-14">
        <div className={eyebrow}>Monthly statements</div>
        {statements.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">None yet.</p>
        ) : (
          <ul className="mt-2 text-sm">
            {statements.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-3">
                <span className="text-charcoal">{monthLabel(s.period_start)}</span>
                <span className="text-muted-foreground">{money(s.gross_revenue)} gross</span>
                <span className="font-medium text-charcoal">{money(s.owner_payout)} payout</span>
                <span className={s.published_at ? "text-sage" : "text-amber-600"}>
                  {s.published_at ? "Published" : "Draft"}
                </span>
                <form action={setPublished}>
                  <input type="hidden" name="token" value={token ?? ""} />
                  <input type="hidden" name="statement_id" value={s.id} />
                  <input type="hidden" name="publish" value={s.published_at ? "false" : "true"} />
                  <SubmitButton pendingLabel="…" className="font-medium text-charcoal underline underline-offset-4">
                    {s.published_at ? "Unpublish" : "Publish"}
                  </SubmitButton>
                </form>
              </li>
            ))}
          </ul>
        )}

        {properties.length === 0 ? (
          <p className="mt-4 text-sm text-amber-700">Add a property before entering a statement.</p>
        ) : (
          <form action={saveStatement} className="mt-4">
            <input type="hidden" name="token" value={token ?? ""} />
            <input type="hidden" name="owner_id" value={owner.id} />
            <p className="text-sm text-muted-foreground">
              Enter the four figures off the payout report. Net rental income,
              the 20% fee and the payout are calculated from them.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-4">
              <div>
                <label className={label} htmlFor="s-prop">Property</label>
                <select id="s-prop" className={input} name="property_id" required>
                  {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><label className={label} htmlFor="s-per">Month (first day)</label><input id="s-per" className={input} name="period_start" type="date" required /></div>
              <div><label className={label} htmlFor="s-gross">Gross revenue</label><input id="s-gross" className={input} name="gross_revenue" type="number" step="0.01" required /></div>
              <div><label className={label} htmlFor="s-plat">Platform fees</label><input id="s-plat" className={input} name="platform_fees" type="number" step="0.01" /></div>
              <div><label className={label} htmlFor="s-tax">Occupancy taxes</label><input id="s-tax" className={input} name="occupancy_taxes" type="number" step="0.01" /></div>
              <div><label className={label} htmlFor="s-pass">Pass-through costs</label><input id="s-pass" className={input} name="pass_through_costs" type="number" step="0.01" /></div>
              <div><label className={label} htmlFor="s-nb">Nights booked</label><input id="s-nb" className={input} name="nights_booked" type="number" /></div>
              <div><label className={label} htmlFor="s-na">Nights available</label><input id="s-na" className={input} name="nights_available" type="number" /></div>
            </div>
            <div className="mt-4">
              <label className={label} htmlFor="s-notes">Notes to the owner</label>
              <textarea id="s-notes" className={input} name="notes" rows={2} />
            </div>
            <SubmitButton pendingLabel="Saving…" className={button}>Save statement as draft</SubmitButton>
          </form>
        )}
      </section>
    </div>
  );
}
