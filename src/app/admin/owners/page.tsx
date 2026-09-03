import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel } from "@/lib/portal/format";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import {
  addProperty,
  createOwner,
  deleteDocument,
  saveStatement,
  setDocumentPublished,
  setPublished,
  uploadDocument,
} from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owners, Admin",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ token?: string }>;
}

const input =
  "mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-charcoal";
const label =
  "text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60";
const button =
  "mt-4 rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white hover:bg-sage-dark";

export default async function AdminOwnersPage({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!(await isAdmin(token))) {
    return (
      <Shell>
        <AdminSignInPrompt />
      </Shell>
    );
  }

  const admin = getSupabaseAdmin();
  const { data: owners } = await admin
    .from("owner_profiles")
    .select(
      "id, email, full_name, phone, owner_properties(id, name, city), owner_statements(id, period_start, owner_payout, published_at, property_id), owner_documents(id, title, kind, period_label, size_bytes, published_at)",
    )
    .order("created_at");

  const list = owners ?? [];

  return (
    <Shell>
      <h1 className="text-3xl font-bold text-charcoal">Owners</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Create an owner, add their property, then enter each month&apos;s
        statement. A statement is a draft until you publish it, and only
        published statements are visible in the portal.
      </p>

      {/* New owner */}
      <section className="mt-10 border-t border-border pt-6">
        <h2 className="font-heading text-xl font-semibold text-charcoal">
          Add an owner
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Creates their portal account. They sign in at /portal with a link
          emailed to this address, so it has to be one they can receive.
        </p>
        <form action={createOwner} className="mt-4 max-w-2xl">
          <input type="hidden" name="token" value={token ?? ""} />
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={label} htmlFor="o-email">Email</label>
              <input id="o-email" className={input} name="email" type="email" required />
            </div>
            <div>
              <label className={label} htmlFor="o-name">Full name</label>
              <input id="o-name" className={input} name="full_name" />
            </div>
            <div>
              <label className={label} htmlFor="o-phone">Phone</label>
              <input id="o-phone" className={input} name="phone" />
            </div>
          </div>
          <button className={button} type="submit">Create owner</button>
        </form>
      </section>

      {list.length === 0 && (
        <p className="mt-12 border-t border-border pt-6 text-muted-foreground">
          No owners yet.
        </p>
      )}

      {list.map((owner) => {
        const properties = (owner.owner_properties ?? []) as {
          id: string; name: string; city: string | null;
        }[];
        const statements = ((owner.owner_statements ?? []) as {
          id: string; period_start: string; owner_payout: number;
          published_at: string | null; property_id: string;
        }[]).sort((a, b) => b.period_start.localeCompare(a.period_start));
        const documents = (owner.owner_documents ?? []) as {
          id: string; title: string; kind: string; period_label: string | null;
          size_bytes: number | null; published_at: string | null;
        }[];

        return (
          <section key={owner.id} className="mt-14 border-t border-charcoal/25 pt-6">
            <h2 className="font-heading text-2xl font-semibold text-charcoal">
              {owner.full_name || owner.email}
            </h2>
            <p className="text-sm text-muted-foreground">
              {owner.email}
              {owner.phone ? ` · ${owner.phone}` : ""}
            </p>

            {/* Properties */}
            <h3 className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
              Properties
            </h3>
            {properties.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">None yet.</p>
            ) : (
              <ul className="mt-2 text-sm">
                {properties.map((p) => (
                  <li key={p.id} className="border-b border-border py-2 text-charcoal">
                    {p.name}
                    {p.city ? <span className="text-muted-foreground"> · {p.city}</span> : null}
                  </li>
                ))}
              </ul>
            )}

            <form action={addProperty} className="mt-4 max-w-2xl">
              <input type="hidden" name="token" value={token ?? ""} />
              <input type="hidden" name="owner_id" value={owner.id} />
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className={label} htmlFor={`p-name-${owner.id}`}>Property name</label>
                  <input id={`p-name-${owner.id}`} className={input} name="name" required />
                </div>
                <div>
                  <label className={label} htmlFor={`p-city-${owner.id}`}>City</label>
                  <input id={`p-city-${owner.id}`} className={input} name="city" />
                </div>
                <div>
                  <label className={label} htmlFor={`p-addr-${owner.id}`}>Address</label>
                  <input id={`p-addr-${owner.id}`} className={input} name="address" />
                </div>
                <div>
                  <label className={label} htmlFor={`p-hosp-${owner.id}`}>Hospitable ID</label>
                  <input id={`p-hosp-${owner.id}`} className={input} name="hospitable_id" />
                </div>
              </div>
              <button className={button} type="submit">Add property</button>
            </form>

            {/* Statements */}
            <h3 className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
              Statements
            </h3>
            {statements.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">None yet.</p>
            ) : (
              <ul className="mt-2 text-sm">
                {statements.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4 border-b border-border py-2">
                    <span className="text-charcoal">{monthLabel(s.period_start)}</span>
                    <span className="text-muted-foreground">{money(s.owner_payout)} payout</span>
                    <span className={s.published_at ? "text-sage" : "text-amber-600"}>
                      {s.published_at ? "Published" : "Draft"}
                    </span>
                    <form action={setPublished}>
                      <input type="hidden" name="token" value={token ?? ""} />
                      <input type="hidden" name="statement_id" value={s.id} />
                      <input type="hidden" name="publish" value={s.published_at ? "false" : "true"} />
                      <button className="text-sm font-medium text-charcoal underline underline-offset-4" type="submit">
                        {s.published_at ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}

            {/* Documents */}
            <h3 className="mt-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60">
              Documents
            </h3>
            {documents.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">None yet.</p>
            ) : (
              <ul className="mt-2 text-sm">
                {documents.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-2">
                    <span className="text-charcoal">
                      {d.title}
                      <span className="text-muted-foreground">
                        {" "}· {d.kind}
                        {d.period_label ? ` · ${d.period_label}` : ""}
                        {d.size_bytes ? ` · ${Math.round(d.size_bytes / 1024)} KB` : ""}
                      </span>
                    </span>
                    <span className="flex items-center gap-4">
                      <Link
                        href={`/admin/documents/${d.id}${token ? `?token=${encodeURIComponent(token)}` : ""}`}
                        className="text-sm font-medium text-charcoal underline underline-offset-4"
                      >
                        Fields &amp; signature
                      </Link>
                      <span className={d.published_at ? "text-sage" : "text-amber-600"}>
                        {d.published_at ? "Published" : "Draft"}
                      </span>
                      <form action={setDocumentPublished}>
                        <input type="hidden" name="token" value={token ?? ""} />
                        <input type="hidden" name="document_id" value={d.id} />
                        <input type="hidden" name="publish" value={d.published_at ? "false" : "true"} />
                        <button className="text-sm font-medium text-charcoal underline underline-offset-4" type="submit">
                          {d.published_at ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <form action={deleteDocument}>
                        <input type="hidden" name="token" value={token ?? ""} />
                        <input type="hidden" name="document_id" value={d.id} />
                        <button className="text-sm font-medium text-destructive underline underline-offset-4" type="submit">
                          Delete
                        </button>
                      </form>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <form action={uploadDocument} className="mt-4 max-w-3xl">
              <input type="hidden" name="token" value={token ?? ""} />
              <input type="hidden" name="owner_id" value={owner.id} />
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <label className={label} htmlFor={`d-file-${owner.id}`}>File</label>
                  <input id={`d-file-${owner.id}`} className={input} name="file" type="file" required
                    accept=".pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls" />
                </div>
                <div>
                  <label className={label} htmlFor={`d-title-${owner.id}`}>Title</label>
                  <input id={`d-title-${owner.id}`} className={input} name="title" placeholder="Defaults to the filename" />
                </div>
                <div>
                  <label className={label} htmlFor={`d-kind-${owner.id}`}>Kind</label>
                  <select id={`d-kind-${owner.id}`} className={input} name="kind" defaultValue="tax">
                    <option value="tax">Tax document</option>
                    <option value="statement">Statement</option>
                    <option value="agreement">Agreement</option>
                    <option value="inspection">Inspection</option>
                    <option value="invoice">Invoice</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor={`d-period-${owner.id}`}>Period</label>
                  <input id={`d-period-${owner.id}`} className={input} name="period_label" placeholder="2026" />
                </div>
              </div>
              <button className={button} type="submit">Upload document</button>
            </form>

            {properties.length > 0 && (
              <form action={saveStatement} className="mt-4 max-w-3xl">
                <input type="hidden" name="token" value={token ?? ""} />
                <input type="hidden" name="owner_id" value={owner.id} />
                <p className="text-sm text-muted-foreground">
                  Enter the four figures off the payout report. Net rental
                  income, the 20% fee and the payout are calculated from them.
                </p>
                <div className="mt-3 grid gap-4 sm:grid-cols-4">
                  <div>
                    <label className={label} htmlFor={`s-prop-${owner.id}`}>Property</label>
                    <select id={`s-prop-${owner.id}`} className={input} name="property_id" required>
                      {properties.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-per-${owner.id}`}>Month (first day)</label>
                    <input id={`s-per-${owner.id}`} className={input} name="period_start" type="date" required />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-gross-${owner.id}`}>Gross revenue</label>
                    <input id={`s-gross-${owner.id}`} className={input} name="gross_revenue" type="number" step="0.01" required />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-plat-${owner.id}`}>Platform fees</label>
                    <input id={`s-plat-${owner.id}`} className={input} name="platform_fees" type="number" step="0.01" />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-tax-${owner.id}`}>Occupancy taxes</label>
                    <input id={`s-tax-${owner.id}`} className={input} name="occupancy_taxes" type="number" step="0.01" />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-pass-${owner.id}`}>Pass-through costs</label>
                    <input id={`s-pass-${owner.id}`} className={input} name="pass_through_costs" type="number" step="0.01" />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-nb-${owner.id}`}>Nights booked</label>
                    <input id={`s-nb-${owner.id}`} className={input} name="nights_booked" type="number" />
                  </div>
                  <div>
                    <label className={label} htmlFor={`s-na-${owner.id}`}>Nights available</label>
                    <input id={`s-na-${owner.id}`} className={input} name="nights_available" type="number" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className={label} htmlFor={`s-notes-${owner.id}`}>Notes to the owner</label>
                  <textarea id={`s-notes-${owner.id}`} className={input} name="notes" rows={2} />
                </div>
                <button className={button} type="submit">Save statement as draft</button>
              </form>
            )}
          </section>
        );
      })}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">{children}</div>
  );
}
