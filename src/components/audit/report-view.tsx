"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditReport } from "@/lib/audit/types";

function fmt(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

export function ReportView({ report, siteUrl }: { report: AuditReport; siteUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const link = `${siteUrl}/audit/result/${report.id}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // noop
    }
  }

  const pricingRec = report.leaks.recommendations.find((r) => r.category === "pricing");
  const occRec = report.leaks.recommendations.find((r) => r.category === "occupancy");
  const amenityRec = report.leaks.recommendations.find((r) => r.category === "amenities");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-16">
      {/* Above the fold, big number */}
      <section className="rounded-3xl bg-gradient-to-br from-sage to-sage-dark px-6 py-14 text-center text-white md:px-12 md:py-20">
        <p className="text-sm uppercase tracking-widest text-white/80 md:text-base">
          Your listing is leaving
        </p>
        <p className="mt-4 font-heading text-6xl font-bold leading-none md:text-[7.5rem]">
          {fmt(report.leaks.revenueLeak)}
        </p>
        <p className="mt-4 text-lg text-white/85 md:text-xl">
          on the table per year
        </p>
        <p className="mx-auto mt-6 max-w-md text-sm text-white/70 md:text-base">
          Compared to similar properties in {report.listing.city || "your market"}.
        </p>
      </section>

      {/* Gap breakdown */}
      <section className="mt-10 grid gap-5 sm:grid-cols-3">
        <GapCard
          label="Pricing"
          metric={`$${Math.round(report.leaks.priceGap)}/night`}
          tag="below comps"
          impact={pricingRec ? fmt(pricingRec.dollar_impact) : undefined}
        />
        <GapCard
          label="Occupancy"
          metric={`${(report.leaks.occupancyGap * 100).toFixed(0)} points`}
          tag="below comps"
          impact={occRec ? fmt(occRec.dollar_impact) : undefined}
        />
        <GapCard
          label="Amenities"
          metric={
            report.leaks.amenityGaps.length > 0
              ? `${report.leaks.amenityGaps.length} missing`
              : "Fully stocked"
          }
          tag={
            report.leaks.amenityGaps.length > 0
              ? report.leaks.amenityGaps.slice(0, 2).join(", ")
              : "vs top comps"
          }
          // Intentionally no $/yr here, synthetic per-amenity dollar estimates
          // aren't defensible. The recommendation still surfaces below.
          footer={
            report.leaks.amenityGaps.length > 0
              ? "Premium amenities only"
              : undefined
          }
        />
      </section>

      {/* AI summary */}
      <section className="mt-10 rounded-2xl border bg-white p-6 md:p-10">
        <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
          The short version
        </h2>
        <div className="mt-4 space-y-3 whitespace-pre-wrap text-base leading-relaxed text-charcoal md:text-lg">
          {report.summary}
        </div>
      </section>

      {/* Recommendations */}
      {report.leaks.recommendations.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            What to fix, ranked by dollars
          </h2>
          <ol className="mt-6 space-y-4">
            {report.leaks.recommendations.slice(0, 5).map((r) => (
              <li
                key={r.priority}
                className="flex gap-4 rounded-2xl border bg-white p-5 md:p-6"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/10 font-bold text-sage md:size-12">
                  {r.priority}
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {r.category}
                    </span>
                    {r.dollar_impact > 0 && (
                      <span className="text-sm font-semibold text-sage">
                        ~{fmt(r.dollar_impact)}/yr
                      </span>
                    )}
                  </div>
                  <p className="text-base text-charcoal">{r.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12 rounded-3xl bg-charcoal px-6 py-12 text-center text-white md:px-12 md:py-16">
        <h2 className="text-3xl font-bold md:text-4xl">
          Want to actually capture this {fmt(report.leaks.revenueLeak)}?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/80 md:text-lg">
          Frontier handles the pricing optimization, listing rewrites, and amenity
          strategy for you. Most hosts see gains in 30–60 days.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-sage text-white hover:bg-sage-dark px-8 text-base"
        >
          <Link href="/contact?ref=audit">
            Book a 15-min call with Frontier
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <p className="mt-4 text-sm text-white/60">
          No pressure. We&apos;ll review your report and tell you if we can help.
        </p>
      </section>

      {/* Share */}
      <section className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button variant="outline" onClick={copyLink}>
          {copied ? (
            <>
              <Check className="size-4 text-sage" />
              Link copied
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy shareable link
            </>
          )}
        </Button>
        <Button variant="outline" asChild>
          <Link href="mailto:?subject=My%20Airbnb%20audit&body=My%20Frontier%20audit%3A%20">
            <Mail className="size-4" /> Email me the report
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a
            target="_blank"
            rel="noopener"
            href={`https://www.google.com/calendar/render?action=TEMPLATE&text=Re-audit%20my%20Airbnb%20with%20Frontier&dates=${nextCalDate()}/${nextCalDate(1)}`}
          >
            <Calendar className="size-4" /> Remind me in 90 days
          </a>
        </Button>
      </section>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted-foreground">
        Estimates based on AirROI market data (20M+ listings). Actual results depend
        on execution. Frontier is not affiliated with Airbnb.
      </p>
    </div>
  );
}

function GapCard({
  label,
  metric,
  tag,
  impact,
  footer,
}: {
  label: string;
  metric: string;
  tag: string;
  impact?: string;
  footer?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 text-3xl font-bold text-charcoal md:text-4xl">{metric}</div>
      <div className="mt-1 text-sm text-muted-foreground">{tag}</div>
      {impact ? (
        <div className="mt-4 border-t pt-3 text-sm font-semibold text-sage">
          = {impact}/yr
        </div>
      ) : footer ? (
        <div className="mt-4 border-t pt-3 text-xs uppercase tracking-widest text-muted-foreground">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function nextCalDate(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + 90 + offsetDays);
  // Google Calendar expects YYYYMMDDThhmmssZ for timed events,
  // or YYYYMMDD/YYYYMMDD for all-day. All-day is simpler.
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}
