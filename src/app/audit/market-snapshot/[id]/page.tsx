import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSnapshot } from "@/lib/audit/report-store";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Market Snapshot, Frontier",
  robots: { index: false, follow: false },
};

export default async function MarketSnapshotPage({ params }: Props) {
  const { id } = await params;
  let snapshot = null;
  try {
    snapshot = await getSnapshot(id);
  } catch {
    // ignore
  }
  if (!snapshot) notFound();

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-sage">
        Market snapshot, {snapshot.city}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-charcoal md:text-5xl">
        {snapshot.bedrooms === 0 ? "Studio" : `${snapshot.bedrooms}-bedroom`} {snapshot.propertyType.toLowerCase()} in {snapshot.city}
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Market median</div>
          <div className="mt-2 text-3xl font-bold text-charcoal">{fmt(snapshot.marketMedian)}</div>
          <div className="text-xs text-muted-foreground">per year</div>
        </div>
        <div className="rounded-2xl border-2 border-sage bg-sage/5 p-6">
          <div className="text-xs uppercase tracking-widest text-sage">Top quartile</div>
          <div className="mt-2 text-3xl font-bold text-sage">{fmt(snapshot.marketTopQuartile)}</div>
          <div className="text-xs text-muted-foreground">per year</div>
        </div>
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Occupancy</div>
          <div className="mt-2 text-3xl font-bold text-charcoal">
            {(snapshot.occupancyRate * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">market median</div>
        </div>
      </div>

      <p className="mt-8 text-lg text-charcoal">
        Top performers in {snapshot.city} earn{" "}
        <strong>{fmt(snapshot.gapToTop)}</strong> more than the median, often the
        same properties with slightly tighter pricing and a few better amenities.
      </p>

      <div className="mt-10 rounded-2xl border bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
          Ready for specifics?
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Run the full audit on your listing. 90 seconds, free, emailed to you.
        </p>
        <Button asChild size="lg" className="mt-5 bg-sage text-white hover:bg-sage-dark">
          <Link href="/audit#full-audit">
            Run my full audit
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
