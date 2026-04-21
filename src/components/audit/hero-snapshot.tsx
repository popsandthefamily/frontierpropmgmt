"use client";

import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hochatownMarket } from "@/data/hochatown-market";
import { track } from "@/lib/analytics";

interface Props {
  /** Where the primary CTA points. Same-page anchor on /audit; /audit URL elsewhere. */
  auditHref?: string;
}

const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

/**
 * Market-snapshot card. Numbers are static, captured monthly from AirROI
 * and stored in src/data/hochatown-market.ts. No network calls, no AirROI
 * cost per visitor. The primary CTA ("Run the audit on my listing") is
 * the main conversion path.
 */
export function HeroSnapshot({ auditHref = "#full-audit" }: Props) {
  const m = hochatownMarket;

  return (
    <div className="rounded-2xl border border-sage/20 bg-white p-6 shadow-sm md:p-8">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sage">
          <TrendingUp className="size-5" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Broken Bow / Hochatown, 3-bedroom cabin
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          As of {m.asOf}
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Market median
          </div>
          <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
            {fmt(m.marketMedian)}
          </div>
          <div className="text-xs text-muted-foreground">per year</div>
        </div>
        <div className="rounded-lg border border-sage/30 bg-sage/5 p-3 -m-3">
          <div className="text-xs uppercase tracking-widest text-sage">
            Top quartile
          </div>
          <div className="mt-1 text-3xl font-bold text-sage md:text-4xl">
            {fmt(m.marketTopQuartile)}
          </div>
          <div className="text-xs text-muted-foreground">per year</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Occupancy
          </div>
          <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
            {(m.occupancyRate * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">market median</div>
        </div>
      </div>

      <p className="mt-6 text-base text-charcoal md:text-lg">
        Top-performing 3-bedroom cabins in Broken Bow earn{" "}
        <strong>{fmt(m.gapToTop)} more</strong> per year than the market
        median. That gap is what an audit surfaces for your specific listing.
      </p>

      <div className="mt-6 border-t border-sage/10 pt-6">
        <Button
          asChild
          size="lg"
          className="w-full bg-sage text-white hover:bg-sage-dark sm:w-auto"
          onClick={() => track("audit_tier2_started", { from: "hero_snapshot" })}
        >
          {auditHref.startsWith("#") ? (
            <a href={auditHref}>
              Run the audit on my listing
              <ArrowRight className="ml-2 size-4" />
            </a>
          ) : (
            <Link href={auditHref}>
              Run the audit on my listing
              <ArrowRight className="ml-2 size-4" />
            </Link>
          )}
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Live AirROI market data, captured monthly. Paste your Airbnb URL on
        the audit to see your listing&apos;s gap against these benchmarks.
      </p>
    </div>
  );
}
