import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { money, moneyExact, monthLabel, occupancy } from "@/lib/portal/format";
import { plans } from "@/data/site";

export const dynamic = "force-dynamic";

export default async function StatementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServer();

  // RLS restricts this to the owner's own published statements, so a guessed id
  // returns nothing rather than someone else's numbers.
  const { data } = await supabase
    .from("owner_statements")
    .select("*, owner_properties(name, city)")
    .eq("id", id)
    .maybeSingle();

  if (!data) return notFound();

  const property = data.owner_properties as { name: string; city: string | null } | null;

  // The arithmetic, in the order it runs. Each row is the previous row minus a
  // deduction, so the statement can be checked line by line rather than trusted.
  const ledger: { label: string; value: number; note?: string; running?: boolean }[] = [
    { label: "Gross booking revenue", value: Number(data.gross_revenue), running: true },
    { label: "Platform host fees", value: -Number(data.platform_fees), note: "What Airbnb or Vrbo withheld" },
    { label: "Occupancy taxes remitted", value: -Number(data.occupancy_taxes), note: "Collected from the guest and paid to the county" },
    { label: "Net rental income", value: Number(data.net_rental_income), running: true, note: "The base the management fee is calculated on" },
    { label: `Management fee (${plans.manager.feeInline})`, value: -Number(data.management_fee) },
    { label: "Pass-through costs", value: -Number(data.pass_through_costs), note: "Cleaning, maintenance, and vendor invoices, at cost with no markup" },
    { label: "Your payout", value: Number(data.owner_payout), running: true },
  ];

  return (
    <>
      <div className="mt-10">
        <Link
          href="/portal"
          className="text-sm font-medium text-charcoal underline-offset-4 hover:underline"
        >
          ← All statements
        </Link>
        <h1 className="mt-5 text-[2.2rem] font-bold leading-[0.95] tracking-tight text-charcoal sm:text-5xl">
          {monthLabel(data.period_start)}
        </h1>
        {property && (
          <p className="mt-3 text-base text-muted-foreground">
            {property.name}
            {property.city ? `, ${property.city}` : ""}
          </p>
        )}
      </div>

      <section className="mt-10 max-w-2xl">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          How the payout was calculated
        </div>
        <dl className="mt-2">
          {ledger.map((row) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_auto] items-baseline gap-6 border-b py-4 ${
                row.running ? "border-charcoal/25" : "border-border"
              }`}
            >
              <dt>
                <span
                  className={
                    row.running
                      ? "font-heading text-lg font-semibold text-charcoal"
                      : "text-charcoal"
                  }
                >
                  {row.label}
                </span>
                {row.note && (
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {row.note}
                  </span>
                )}
              </dt>
              <dd
                className={`text-right tabular-nums ${
                  row.running
                    ? "font-heading text-lg font-semibold text-charcoal"
                    : "text-muted-foreground"
                }`}
              >
                {moneyExact(row.value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 max-w-2xl">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          The month
        </div>
        <div className="mt-4 grid grid-cols-3 gap-6">
          {[
            { stat: data.nights_booked ?? "—", label: "Nights booked" },
            {
              stat: occupancy(data.nights_booked, data.nights_available),
              label: "Occupancy",
            },
            { stat: money(data.average_daily_rate), label: "Average nightly rate" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading text-2xl font-bold leading-none text-charcoal md:text-3xl">
                {s.stat}
              </div>
              <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {data.notes && (
        <section className="mt-12 max-w-2xl">
          <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            Notes from Hunter
          </div>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-muted-foreground">
            {data.notes}
          </p>
        </section>
      )}

      <p className="mt-14 max-w-2xl border-t border-border pt-4 text-sm text-muted-foreground">
        {plans.manager.feeDefinition} If a line here doesn&apos;t match what you
        expected, call or text{" "}
        <a href="tel:580-207-7154" className="font-medium text-charcoal underline underline-offset-4">
          580-207-7154
        </a>{" "}
        and we&apos;ll walk through it together.
      </p>
    </>
  );
}
