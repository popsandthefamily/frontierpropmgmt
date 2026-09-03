import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { SubmitButton } from "@/components/sign/submit-button";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel } from "@/lib/portal/format";
import { createOwner } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Owners, Admin",
  robots: { index: false, follow: false },
};

const input = "mt-1 w-full rounded-md border border-border px-3 py-2 text-sm text-charcoal";
const label = "text-[0.68rem] font-medium uppercase tracking-[0.18em] text-charcoal/60";

export default async function AdminOwnersPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
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

  // Just enough per owner to decide who needs attention, and no more. The
  // detail is a click away rather than stacked on one page.
  const { data: owners } = await admin
    .from("owner_profiles")
    .select(
      "id, email, full_name, phone, owner_properties(id), owner_statements(id, period_start, owner_payout, published_at), owner_documents(id, published_at)",
    )
    .order("created_at");

  const list = owners ?? [];

  // Signers hang off documents, not off owners, so there is no relation to
  // embed above. Fetch the outstanding ones and match them up by email.
  const { data: pendingSigners } = await admin
    .from("signature_signers")
    .select("email")
    .is("signed_at", null)
    .not("request_id", "is", null);
  const awaitingByEmail = new Map<string, number>();
  for (const s of pendingSigners ?? []) {
    const key = (s.email ?? "").toLowerCase();
    if (key) awaitingByEmail.set(key, (awaitingByEmail.get(key) ?? 0) + 1);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
      <h1 className="text-3xl font-bold text-charcoal">Owners</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {list.length === 0
          ? "No owners yet. Add the first one below."
          : `${list.length} owner${list.length === 1 ? "" : "s"}. Open one to manage their properties, statements, documents and signatures.`}
      </p>

      {list.length > 0 && (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {list.map((o) => {
            const properties = (o.owner_properties ?? []) as { id: string }[];
            const statements = ((o.owner_statements ?? []) as {
              id: string; period_start: string; owner_payout: number; published_at: string | null;
            }[]).sort((a, b) => b.period_start.localeCompare(a.period_start));
            const documents = (o.owner_documents ?? []) as { id: string; published_at: string | null }[];
            const drafts =
              statements.filter((s) => !s.published_at).length +
              documents.filter((d) => !d.published_at).length;
            const awaiting = awaitingByEmail.get((o.email ?? "").toLowerCase()) ?? 0;
            const latest = statements.find((s) => s.published_at);

            return (
              <li key={o.id}>
                <Link
                  href={`/admin/owners/${o.id}${qs}`}
                  className="group block h-full rounded-lg border border-border p-5 transition-colors hover:border-charcoal"
                >
                  <h2 className="font-heading text-xl font-semibold text-charcoal group-hover:text-sage">
                    {o.full_name || o.email}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">{o.email}</p>

                  <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
                    {[
                      { n: properties.length, l: properties.length === 1 ? "Property" : "Properties" },
                      { n: statements.length, l: statements.length === 1 ? "Statement" : "Statements" },
                      { n: documents.length, l: documents.length === 1 ? "Document" : "Documents" },
                    ].map((x) => (
                      <div key={x.l}>
                        <dt className="font-heading text-2xl font-bold leading-none text-charcoal">{x.n}</dt>
                        <dd className="mt-1 text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">{x.l}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-4 text-sm text-muted-foreground">
                    {latest
                      ? `Last statement ${monthLabel(latest.period_start)} · ${money(latest.owner_payout)}`
                      : "No published statement yet"}
                  </p>

                  {(drafts > 0 || awaiting > 0) && (
                    <p className="mt-3 flex flex-wrap gap-2">
                      {awaiting > 0 && (
                        <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-700">
                          {awaiting} awaiting signature
                        </span>
                      )}
                      {drafts > 0 && (
                        <span className="rounded-full bg-charcoal/8 px-2.5 py-1 text-xs font-medium text-charcoal/70">
                          {drafts} unpublished
                        </span>
                      )}
                    </p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="font-heading text-xl font-semibold text-charcoal">Add an owner</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Creates their portal account. They sign in at /portal with a link
          emailed to this address, so it has to be one they can receive. Nothing
          is sent to them now.
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
          <SubmitButton
            pendingLabel="Creating…"
            className="mt-4 rounded-md bg-sage px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Create owner
          </SubmitButton>
        </form>
      </section>
    </div>
  );
}
