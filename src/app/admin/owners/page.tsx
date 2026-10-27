import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { isAdmin } from "@/lib/admin/auth";
import { AdminSignInPrompt } from "@/components/admin/sign-in-prompt";
import { ActionForm } from "@/components/admin/action-form";
import { SubmitButton } from "@/components/sign/submit-button";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { money, monthLabel } from "@/lib/portal/format";
import {
  disclosureSummary,
  fieldInput,
  fieldLabel,
  pill,
  primaryButton,
} from "@/components/app/styles";
import { createOwner } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Owners, Admin",
  robots: { index: false, follow: false },
};

export default async function AdminOwnersPage({
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

  // Just enough per owner to decide who needs attention, and no more. The
  // detail is a click away rather than stacked on one page.
  const { data: owners } = await admin
    .from("owner_profiles")
    .select(
      "id, email, full_name, phone, owner_properties(id, name), owner_statements(id, period_start, owner_payout, published_at), owner_documents(id, published_at)",
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
    <div className="mx-auto max-w-5xl px-4 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Owners</h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            {list.length === 0
              ? "No owners yet. Add the first one below."
              : `${list.length} owner${list.length === 1 ? "" : "s"}. Open one to manage their properties, documents, signatures and statements.`}
          </p>
        </div>
      </div>

      {list.length > 0 && (
        // A list, not a wall of cards: it is scanned for who needs attention,
        // and a row per owner keeps names, status and numbers aligned.
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {list.map((o) => {
            const properties = (o.owner_properties ?? []) as { id: string; name: string }[];
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
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-4 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto_auto]"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-heading text-xl font-semibold text-charcoal group-hover:text-sage-dark">
                      {o.full_name || o.email}
                    </span>
                    <span className="block truncate text-sm text-muted-foreground">
                      {[
                        o.full_name ? o.email : null,
                        properties.length === 1
                          ? properties[0].name
                          : properties.length > 1
                            ? `${properties.length} properties`
                            : "No property yet",
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="order-last col-span-2 text-sm text-muted-foreground sm:order-none sm:col-span-1">
                    {latest
                      ? `Last statement ${monthLabel(latest.period_start)} · ${money(latest.owner_payout)}`
                      : "No published statement yet"}
                  </span>
                  <span className="hidden flex-wrap justify-end gap-2 sm:flex">
                    {awaiting > 0 && <span className={pill.waiting}>{awaiting} awaiting signature</span>}
                    {drafts > 0 && <span className={pill.neutral}>{drafts} unpublished</span>}
                  </span>
                  <ChevronRight className="size-5 text-charcoal/40 group-hover:text-charcoal" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <section className="mt-14">
        <details open={list.length === 0}>
          <summary className={disclosureSummary}>
            <Plus className="size-4" aria-hidden />
            Add an owner
          </summary>
          <div className="mt-5 max-w-2xl">
            <p className="text-sm text-muted-foreground">
              Creates their portal account. Leave the box ticked to email them a
              welcome with the sign-in link, so use an address they can receive.
            </p>
            <ActionForm action={createOwner} className="mt-4 flex flex-col gap-4">
              <input type="hidden" name="token" value={token ?? ""} />
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className={fieldLabel} htmlFor="o-email">Email</label>
                  <input id="o-email" className={fieldInput} name="email" type="email" autoComplete="off" required />
                </div>
                <div>
                  <label className={fieldLabel} htmlFor="o-name">Full name</label>
                  <input id="o-name" className={fieldInput} name="full_name" autoComplete="off" />
                </div>
                <div>
                  <label className={fieldLabel} htmlFor="o-phone">Phone</label>
                  <input id="o-phone" className={fieldInput} name="phone" type="tel" autoComplete="off" />
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm text-charcoal">
                <input type="checkbox" name="invite" value="on" defaultChecked className="size-4" />
                Email them a welcome with the sign-in link
              </label>
              <div>
                <SubmitButton pendingLabel="Creating…" className={primaryButton}>
                  Create owner
                </SubmitButton>
              </div>
            </ActionForm>
          </div>
        </details>
      </section>
    </div>
  );
}
