"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Loader2,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DefaultMarketSnapshot } from "@/lib/audit/default-snapshot";
import { Tier1Form } from "./tier1-form";
import { track } from "@/lib/analytics";

interface Props {
  /** Where the primary CTA points. Same-page anchor on /audit; /audit URL elsewhere. */
  auditHref?: string;
}

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; snapshot: DefaultMarketSnapshot }
  | { status: "error" };

/**
 * Market-snapshot card. Numbers are gated behind a button click —
 * zero AirROI request until a visitor affirmatively asks to see them.
 * The "Run the audit" CTA is visible regardless, so visitors who don't
 * care about the benchmark can still convert.
 *
 * Server-side, /api/audit/snapshot caches the result in Redis for 24h,
 * so the first visitor who clicks eats the AirROI hit and everyone after
 * them reads from cache.
 */
export function HeroSnapshot({ auditHref = "#full-audit" }: Props) {
  const [showCompare, setShowCompare] = useState(false);
  const [state, setState] = useState<FetchState>({ status: "idle" });

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  async function loadSnapshot() {
    if (state.status === "loading" || state.status === "ready") return;
    setState({ status: "loading" });
    track("calculator_snapshot_viewed", { source: "hero_snapshot_button" });
    try {
      const res = await fetch("/api/audit/snapshot", { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = (await res.json()) as {
        ok: boolean;
        snapshot?: DefaultMarketSnapshot;
      };
      if (!data.ok || !data.snapshot) throw new Error("missing snapshot");
      setState({ status: "ready", snapshot: data.snapshot });
    } catch {
      setState({ status: "error" });
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-sage/20 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-2 text-sage">
          <TrendingUp className="size-5" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Broken Bow / Hochatown market, 3-bedroom cabin
          </span>
        </div>

        {state.status === "ready" ? (
          <>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Market median
                </div>
                <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
                  {fmt(state.snapshot.marketMedian)}
                </div>
                <div className="text-xs text-muted-foreground">per year</div>
              </div>
              <div className="rounded-lg border border-sage/30 bg-sage/5 p-3 -m-3">
                <div className="text-xs uppercase tracking-widest text-sage">
                  Top quartile
                </div>
                <div className="mt-1 text-3xl font-bold text-sage md:text-4xl">
                  {fmt(state.snapshot.marketTopQuartile)}
                </div>
                <div className="text-xs text-muted-foreground">per year</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Occupancy
                </div>
                <div className="mt-1 text-3xl font-bold text-charcoal md:text-4xl">
                  {(state.snapshot.occupancyRate * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">market median</div>
              </div>
            </div>

            <p className="mt-6 text-base text-charcoal md:text-lg">
              Top-performing 3-bedroom cabins in Broken Bow earn{" "}
              <strong>{fmt(state.snapshot.gapToTop)} more</strong> per year than
              the market median. That gap is what an audit surfaces for your
              specific listing.
            </p>
          </>
        ) : state.status === "error" ? (
          <div className="mt-5 rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            Live market data is temporarily unavailable. You can still run the
            audit on your specific listing below.
          </div>
        ) : (
          // Idle or loading — show the reveal button + explainer
          <div className="mt-5">
            <p className="text-base text-charcoal md:text-lg">
              Pull live AirROI market data for Broken Bow / Hochatown cabins:
              median annual revenue, top-quartile revenue, and occupancy rate.
              Free, anonymous, updated every 24 hours.
            </p>
            <button
              type="button"
              onClick={loadSnapshot}
              disabled={state.status === "loading"}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-sage bg-sage/5 px-5 py-2.5 text-sm font-semibold text-sage transition-colors hover:bg-sage/10 disabled:opacity-70"
            >
              {state.status === "loading" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Pulling live data…
                </>
              ) : (
                <>
                  <BarChart3 className="size-4" />
                  Show live market numbers
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 border-t border-sage/10 pt-6 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-sage text-white hover:bg-sage-dark"
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
