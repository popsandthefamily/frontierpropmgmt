import type { Metadata } from "next";
import Link from "next/link";

import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { centralDate, money, monthLabel } from "@/lib/portal/format";
import { sectionHeading } from "@/components/app/styles";

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
      admin.from("owner_documents").select("id, owner_id, title, published_at, created_at"),
      admin
        .from("signature_signers")
        .select("id, name, email, document_id, owner_documents(title)")
        .is("signed_at", null)
        .not("request_id", "is", null),
    ]);

  const ownerList = owners ?? [];
  const stmts = (statements ?? []) as Statement[];
  const docs = (documents ?? []) as {
    id: string;
    owner_id: string;
    title: string;
    published_at: string | null;
    created_at: string;
  }[];
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

  // Each count links to the list that explains it. A number you cannot click
  // through to is a number you then go hunting for.
  const queue = [
    {
      n: awaiting.length,
      label: awaiting.length === 1 ? "signature outstanding" : "signatures outstanding",
      tone: awaiting.length > 0,
      href: "#awaiting",
    },
    {
      n: draftStatements.length,
      label: draftStatements.length === 1 ? "unpublished statement" : "unpublished statements",
      tone: draftStatements.length > 0,
      href: "#draft-statements",
    },
    {
      n: draftDocuments.length,
      label: draftDocuments.length === 1 ? "unpublished document" : "unpublished documents",
      tone: draftDocuments.length > 0,
      href: "#draft-documents",
    },
    {
      n: ownerList.length,
      label: ownerList.length === 1 ? "owner" : "owners",
      tone: false,
      href: `/admin/owners${qs}`,
    },
  ];

  const nothingWaiting =
    awaiting.length === 0 && draftStatements.length === 0 && draftDocuments.length === 0;

  const row =
    "group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-4 transition-colors";

  return (
    <div className="mx-auto max-w-5xl px-4 pt-10">
      <h1 className="text-3xl font-bold text-charcoal">Overview</h1>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">
        {latest
          ? `Books are current through ${monthLabel(latest.period_start)}.`
          : "No statement has been published yet."}
      </p>

      <ul className="mt-8 grid grid-cols-2 border-y border-border lg:grid-cols-4">
        {queue.map((q) => (
          <li
            key={q.label}
            className="border-border [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:border-l lg:[&:first-child]:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
          >
            <Link
              href={q.href}
              aria-disabled={q.n === 0 && q.href.startsWith("#") ? true : undefined}
              className={`block h-full px-5 py-6 transition-colors hover:bg-cream/60 lg:px-7 ${
                q.n === 0 && q.href.startsWith("#") ? "pointer-events-none" : ""
              }`}
            >
              <span
                className={`block font-heading text-4xl font-bold leading-none tabular-nums ${
                  q.tone ? "text-amber-800" : "text-charcoal"
                }`}
              >
                {q.n}
              </span>
              <span className="mt-2 block text-sm leading-snug text-muted-foreground">{q.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {nothingWaiting && (
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          Nothing is waiting. Every statement and document is published and no
          signature is outstanding.
        </p>
      )}

      {awaiting.length > 0 && (
        <section id="awaiting" aria-labelledby="awaiting-h" className="mt-12 scroll-mt-28">
          <h2 id="awaiting-h" className={sectionHeading}>Awaiting signature</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {awaiting.map((s) => {
              const title =
                (s.owner_documents as unknown as { title: string } | null)?.title ?? "Document";
              return (
                <li key={s.id}>
                  <Link href={`/admin/documents/${s.document_id}${qs}`} className={row}>
                    <span className="truncate font-medium text-charcoal group-hover:text-sage-dark">{title}</span>
                    <span className="text-right text-sm text-muted-foreground">{s.name || s.email}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {draftStatements.length > 0 && (
        <section id="draft-statements" aria-labelledby="draft-statements-h" className="mt-12 scroll-mt-28">
          <h2 id="draft-statements-h" className={sectionHeading}>Unpublished statements</h2>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {draftStatements
              .sort((a, b) => b.period_start.localeCompare(a.period_start))
              .map((s) => (
                <li key={s.id}>
                  <Link href={`/admin/owners/${s.owner_id}${qs}#statements`} className={row}>
                    <span className="truncate font-medium text-charcoal group-hover:text-sage-dark">
                      {ownerName.get(s.owner_id) ?? "Owner"}
                      <span className="font-normal text-muted-foreground"> · {monthLabel(s.period_start)}</span>
                    </span>
                    <span className="text-right text-sm tabular-nums text-charcoal">{money(s.owner_payout)}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}

      {draftDocuments.length > 0 && (
        <section id="draft-documents" aria-labelledby="draft-documents-h" className="mt-12 scroll-mt-28">
          <h2 id="draft-documents-h" className={sectionHeading}>Unpublished documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">Owners can&rsquo;t see these until they&rsquo;re published.</p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {draftDocuments
              .sort((a, b) => b.created_at.localeCompare(a.created_at))
              .map((d) => (
                <li key={d.id}>
                  <Link href={`/admin/owners/${d.owner_id}${qs}#documents`} className={row}>
                    <span className="truncate font-medium text-charcoal group-hover:text-sage-dark">{d.title}</span>
                    <span className="text-right text-sm text-muted-foreground">
                      {ownerName.get(d.owner_id) ?? "Owner"} · added {centralDate(d.created_at)}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
