import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel, occupancy } from "@/lib/portal/format";

export const dynamic = "force-dynamic";

interface Statement {
  id: string;
  period_start: string;
  gross_revenue: number;
  owner_payout: number;
  nights_booked: number | null;
  nights_available: number | null;
  property_id: string;
}

interface Property {
  id: string;
  name: string;
  city: string | null;
  status: string;
}

interface OwnerDocument {
  id: string;
  title: string;
  kind: string;
  period_label: string | null;
  size_bytes: number | null;
  storage_path: string;
}

export default async function PortalDashboard() {
  const supabase = await getSupabaseServer();

  // Both queries run as the signed-in owner, so row level security scopes them.
  // There is no owner_id filter here on purpose: the database applies it, which
  // means forgetting one cannot leak another owner's numbers.
  const [{ data: properties }, { data: statements }, { data: documents }] =
    await Promise.all([
      supabase
        .from("owner_properties")
        .select("id, name, city, status")
        .order("name"),
      supabase
        .from("owner_statements")
        .select(
          "id, period_start, gross_revenue, owner_payout, nights_booked, nights_available, property_id",
        )
        .order("period_start", { ascending: false })
        .limit(12),
      supabase
        .from("owner_documents")
        .select("id, title, kind, period_label, size_bytes, storage_path")
        .order("created_at", { ascending: false }),
    ]);

  const { data: pending } = await supabase
    .from("signature_requests")
    .select("id, document_id, status")
    .in("status", ["sent", "viewed"]);

  const props = (properties ?? []) as Property[];
  const docs = (documents ?? []) as OwnerDocument[];

  // The rows above came back through row level security as this owner, so
  // ownership is already proven. Signing is done with the service role because
  // the bucket is private and nothing is reachable by URL alone; each link is
  // good for five minutes, so a forwarded or logged URL goes stale quickly.
  const docLinks = new Map<string, string>();
  if (docs.length > 0) {
    const { data: signed } = await getSupabaseAdmin()
      .storage.from("owner-documents")
      .createSignedUrls(docs.map((d) => d.storage_path), 300);
    for (const entry of signed ?? []) {
      if (entry.path && entry.signedUrl) docLinks.set(entry.path, entry.signedUrl);
    }
  }
  const stmts = (statements ?? []) as Statement[];
  const latest = stmts[0];
  const trailing = stmts.slice(0, 12);
  const trailingPayout = trailing.reduce((sum, s) => sum + Number(s.owner_payout), 0);

  return (
    <>
      {(pending ?? []).length > 0 && (
        <section className="mt-10 border-l-4 border-sage bg-sage/8 p-6">
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {(pending ?? []).length === 1
              ? "One document needs your signature"
              : `${(pending ?? []).length} documents need your signature`}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Read it through and sign online. It takes a couple of minutes and
            you get a signed copy straight away.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {(pending ?? []).map((r) => (
              <Link
                key={r.id}
                href={`/portal/sign/${r.id}`}
                className="rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white hover:bg-sage-dark"
              >
                Review and sign
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <h1 className="text-[2.2rem] font-bold leading-[0.95] tracking-tight text-charcoal sm:text-5xl">
          {props.length === 1 ? props[0].name : "Your properties"}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {latest
            ? `Statements through ${monthLabel(latest.period_start)}. Every figure below is what actually cleared, not an estimate.`
            : "Your monthly statements will appear here as soon as the first one is published."}
        </p>
      </div>

      {/* Headline numbers */}
      {latest && (
        <section className="mt-10 grid grid-cols-2 border-y border-border lg:grid-cols-4">
          {[
            { stat: money(latest.owner_payout), label: `Your payout, ${monthLabel(latest.period_start)}` },
            { stat: money(latest.gross_revenue), label: "Gross revenue that month" },
            {
              stat: occupancy(latest.nights_booked, latest.nights_available),
              label: latest.nights_booked ? `Occupancy, ${latest.nights_booked} nights booked` : "Occupancy",
            },
            { stat: money(trailingPayout), label: `Paid out across the last ${trailing.length} statement${trailing.length === 1 ? "" : "s"}` },
          ].map((s) => (
            <div
              key={s.label}
              className="border-border px-5 py-8 lg:border-l lg:px-7 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:[&:first-child]:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
            >
              <div className="font-heading text-3xl font-bold leading-none text-charcoal md:text-4xl">
                {s.stat}
              </div>
              <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Statements */}
      <section className="mt-14">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Monthly statements
        </div>

        {stmts.length === 0 ? (
          <div className="mt-6 border-b border-border pb-8">
            <h2 className="font-heading text-xl font-semibold text-charcoal">
              Nothing published yet
            </h2>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-muted-foreground">
              Statements are published after each month closes and the platform
              payouts have settled. When yours is ready it will show up here, and
              you&apos;ll get an email. If you expected one already, reply to any
              message from Hunter and we&apos;ll sort it out.
            </p>
          </div>
        ) : (
          <ul className="mt-2">
            {stmts.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/portal/statements/${s.id}`}
                  className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5 sm:grid-cols-[1fr_auto_auto]"
                >
                  <span className="font-heading text-lg font-semibold text-charcoal group-hover:text-sage">
                    {monthLabel(s.period_start)}
                  </span>
                  <span className="hidden text-sm text-muted-foreground sm:block">
                    {money(s.gross_revenue)} gross
                  </span>
                  <span className="text-right font-medium text-charcoal">
                    {money(s.owner_payout)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Properties */}
      {props.length > 0 && (
        <section className="mt-14">
          <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            Under management
          </div>
          <ul className="mt-2">
            {props.map((p) => (
              <li
                key={p.id}
                className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5"
              >
                <span className="font-heading text-lg font-semibold text-charcoal">
                  {p.name}
                  {p.city && (
                    <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">
                      {p.city}
                    </span>
                  )}
                </span>
                <span className="text-sm capitalize text-muted-foreground">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Documents */}
      <section className="mt-14">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Documents
        </div>
        {docs.length === 0 ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Tax documents and signed paperwork will appear here. Nothing to
            download yet.
          </p>
        ) : (
          <ul className="mt-2">
            {docs.map((d) => {
              const href = docLinks.get(d.storage_path);
              return (
                <li
                  key={d.id}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-5"
                >
                  <span>
                    <span className="font-heading text-lg font-semibold text-charcoal">
                      {d.title}
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {d.period_label ? `${d.period_label} · ` : ""}
                      {d.kind}
                    </span>
                  </span>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-charcoal underline underline-offset-4"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Unavailable
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="mt-14 border-t border-border pt-4 text-sm text-muted-foreground">
        Questions about a number on any statement? Call or text Hunter at{" "}
        <a href="tel:580-207-7154" className="font-medium text-charcoal underline underline-offset-4">
          580-207-7154
        </a>
        . You get a person, not a ticket.
      </p>
    </>
  );
}
