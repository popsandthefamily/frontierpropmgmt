"use client";

import { useState } from "react";
import { ArrowRight, TrendingUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DefaultMarketSnapshot } from "@/lib/audit/default-snapshot";
import { Tier1Form } from "./tier1-form";

interface Props {
  snapshot: DefaultMarketSnapshot | null;
}

export function HeroSnapshot({ snapshot }: Props) {
  const [showCompare, setShowCompare] = useState(false);

  if (!snapshot) {
    // Fallback to the interactive form if the server fetch failed
    return <Tier1Form />;
  }

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div>
      <div className="rounded-2xl border border-sage/20 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2 text-sage">
          <TrendingUp className="size-5" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Broken Bow / Hochatown market, 3-bedroom cabin
          </span>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Market median
            </div>
            <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
              {fmt(snapshot.marketMedian)}
            </div>
            <div className="text-xs text-muted-foreground">per year</div>
          </div>
          <div className="rounded-lg border border-sage/30 bg-sage/5 p-3 -m-3">
            <div className="text-xs uppercase tracking-widest text-sage">
              Top quartile
            </div>
            <div className="mt-1 text-3xl font-bold text-sage md:text-4xl">
              {fmt(snapshot.marketTopQuartile)}
            </div>
            <div className="text-xs text-muted-foreground">per year</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Occupancy
            </div>
            <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
              {(snapshot.occupancyRate * 100).toFixed(0)}%
            </div>
            <div className="text-xs text-muted-foreground">market median</div>
          </div>
        </div>

        <p className="mt-6 text-base text-charcoal md:text-lg">
          Top-performing 3-bedroom cabins in Broken Bow earn{" "}
          <strong>{fmt(snapshot.gapToTop)} more</strong> per year than the market
          median. That gap is what an audit surfaces for your specific listing.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-sage text-white hover:bg-sage-dark"
          >
            <a href="#full-audit">
              Run the audit on my listing
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <button
            type="button"
            onClick={() => setShowCompare((v) => !v)}
            className="inline-flex items-center justify-center gap-1 text-sm font-medium text-sage hover:text-sage-dark sm:ml-2"
          >
            Compare a different market
            <ChevronDown
              className={`size-4 transition-transform ${
                showCompare ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {showCompare && (
        <div className="mt-6">
          <Tier1Form />
        </div>
      )}
    </div>
  );
}
