import type { Metadata } from "next";
import Link from "next/link";

import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel } from "@/lib/portal/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

interface Statement {
  id: string;
  owner_id: string;
  period_start: string;
  owner_payout: number;
  published_at: string | null;
}

/**
 * The admin landing page.
 *
 * /admin used to 404, so the only way in was to know that the real page was
 * /admin/owners. This answers the question you actually arrive with — is there
 * anything waiting on me — and then gets out of the way.
 */
export default async function AdminHomePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
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

  const [{ data: owners }, { data: statements }, { data: documents }, { data: signers }] =
    await Promise.all([
      admin.from("owner_profiles").select("id, full_name, email"),
      admin
        .from("owner_statements")
        .select("id, owner_id, period_start, owner_payout, published_at"),
      admin.from("owner_documents").select("id, owner_id, published_at"),
      admin
        .from("signature_signers")
        .select("id, name, email, document_id, owner_documents(title)")
        .is("signed_at", null)
        .not("request_id", "is", null),
    ]);

  const ownerList = owners ?? [];
  const stmts = (statements ?? []) as Statement[];
  const docs = (documents ?? []) as { id: string; owner_id: string; published_at: string | null }[];
  const awaiting = signers ?? [];

  const draftStatements = stmts.filter((s) => !s.published_at);
  const draftDocuments = docs.filter((d) => !d.published_at);

  // Most recent published statement, so the overview says how current the books
  // are rather than just how many rows exist.
  const published = stmts
    .filter((s) => s.published_at)
    .sort((a, b) => b.period_start.localeCompare(a.period_start));
  const latest = published[0];
  const ownerName = new Map(ownerList.map((o) => [o.id, o.full_name || o.email]));

  const queue = [
    {
      n: awaiting.length,
      label: awaiting.length === 1 ? "signature outstanding" : "signatures outstanding",
      tone: awaiting.length > 0,
    },
    {
      n: draftStatements.length,
      label: draftStatements.length === 1 ? "unpublished statement" : "unpublished statements",
      tone: draftStatements.length > 0,
    },
    {
      n: draftDocuments.length,
      label: draftDocuments.length === 1 ? "unpublished document" : "unpublished documents",
      tone: draftDocuments.length > 0,
    },
    { n: ownerList.length, label: ownerList.length === 1 ? "owner" : "owners", tone: false },
  ];

  const nothingWaiting =
    awaiting.length === 0 && draftStatements.length === 0 && draftDocuments.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10">
      <h1 className="text-3xl font-bold text-charcoal">Overview</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {latest
          ? `Books are current through ${monthLabel(latest.period_start)}.`
          : "No statement has been published yet."}
      </p>

      <section className="mt-8 grid grid-cols-2 border-y border-border lg:grid-cols-4">
        {queue.map((q) => (
          <div
            key={q.label}
            className="border-border px-5 py-7 lg:border-l lg:px-7 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:[&:first-child]:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
          >
            <div
              className={`font-heading text-3xl font-bold leading-none ${
                q.tone ? "text-amber-700" : "text-charcoal"
              }`}
            >
              {q.n}
            </div>
            <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {q.label}
            </div>
          </div>
        ))}
      </section>

      {nothingWaiting ? (
        <p className="mt-8 border-b border-border pb-8 text-base leading-relaxed text-muted-foreground">
          Nothing is waiting. Every statement and document is published and no
          signature is outstanding.
        </p>
      ) : (
        <>
          {awaiting.length > 0 && (
            <section className="mt-12">
              <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                Awaiting signature
              </div>
              <ul className="mt-2">
                {awaiting.map((s) => {
                  const title =
                    (s.owner_documents as unknown as { title: string } | null)?.title ??
                    "Document";
                  return (
                    <li key={s.id}>
                      <Link
                        href={`/admin/documents/${s.document_id}${qs}`}
                        className="group grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border py-4"
                      >
                        <span className="font-heading text-base font-semibold text-charcoal group-hover:text-sage">
                          {title}
                        </span>
                        <span className="text-right text-sm text-muted-foreground">
                          {s.name || s.email}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {draftStatements.length > 0 && (
            <section className="mt-12">
              <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                Unpublished statements
              </div>
              <ul className="mt-2">
                {draftStatements
                  .sort((a, b) => b.period_start.localeCompare(a.period_start))
                  .map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/admin/owners/${s.owner_id}${qs}`}
                        className="group grid grid-cols-[1fr_auto_auto] items-baseline gap-4 border-b border-border py-4"
                      >
                        <span className="font-heading text-base font-semibold text-charcoal group-hover:text-sage">
                          {ownerName.get(s.owner_id) ?? "Owner"}
                        </span>
                        <span className="hidden text-sm text-muted-foreground sm:block">
                          {monthLabel(s.period_start)}
                        </span>
                        <span className="text-right text-sm text-charcoal">
                          {money(s.owner_payout)}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </section>
          )}
        </>
      )}

      <section className="mt-12">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Go to
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            { label: "Owners", href: "/admin/owners" },
            { label: "Audit stats", href: "/admin/audit-stats" },
            { label: "Social posts", href: "/admin/social" },
          ].map((l) => (
            <Link
              key={l.href}
              href={`${l.href}${qs}`}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-charcoal transition-colors hover:border-charcoal"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
