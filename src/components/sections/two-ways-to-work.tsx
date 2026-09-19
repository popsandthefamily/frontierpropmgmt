import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { plans } from "@/data/site";
import { CTA, homeCare } from "@/data/home-care";

/**
 * The two primary services, side by side. Each card states the audience,
 * the outcome, the pricing basis, and the boundary, so a visitor can tell
 * whether Frontier will run the rental or care for the property without
 * leaving the homepage.
 */
const CARDS = [
  {
    plan: plans.manager,
    eyebrow: "Full-Service STR Management",
    audience: "For owners who want the rental run for them.",
    outcome:
      "We run the whole property: pricing, listings, guest communication, cleaning turns, maintenance, taxes, and a monthly statement. You own the cabin, we operate it.",
    boundary:
      "A percentage of income, so a $0 month costs $0. Vendor invoices pass through at cost. Month to month.",
    cta: CTA.management,
    learn: { label: "How management works", href: plans.manager.href },
  },
  {
    plan: plans.concierge,
    eyebrow: "Home Care Concierge",
    audience:
      "For private second homes, owner-used vacation homes, and cabins you rent out yourself.",
    outcome:
      "One scheduled care cycle a month: an interior maintenance clean, hot-tub attention, light exterior upkeep, a visual property check, and a dated report. You keep control of the bookings, if there are any.",
    boundary: homeCare.priceQualifier,
    cta: CTA.concierge,
    learn: { label: "What the plan includes", href: plans.concierge.href },
  },
] as const;

export function TwoWaysToWork({
  background = "white",
}: {
  background?: "white" | "cream";
}) {
  return (
    <SectionWrapper background={background} id="two-ways">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Two ways to work with Frontier
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          The difference is who operates the rental business, if there is
          one, versus who performs agreed physical care of the property.
          Neither is a cheaper version of the other.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {CARDS.map(({ plan, eyebrow, audience, outcome, boundary, cta, learn }) => (
          <article
            key={plan.key}
            className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm md:p-8"
          >
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
              {eyebrow}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-charcoal md:text-3xl">
              {plan.tagline}
            </h3>
            <p className="mt-3 text-sm font-medium text-charcoal">{audience}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {outcome}
            </p>

            <div className="mt-6 border-t border-charcoal/10 pt-5">
              <div className="font-heading text-2xl font-bold text-charcoal">
                {plan.fee}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  {plan.feeSuffix}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {boundary}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PlanCTA
                plan={plan.key}
                source="homepage_two_ways"
                href={cta.href}
                className="inline-flex h-10 items-center justify-center rounded-md bg-sage px-6 text-sm font-semibold text-white transition-colors hover:bg-sage-dark"
              >
                {cta.label}
              </PlanCTA>
              <Link
                href={learn.href}
                className="group inline-flex items-center gap-1 text-sm font-medium text-sage hover:text-sage-dark hover:underline"
              >
                {learn.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        Rent your cabin yourself and need turnovers on a booking calendar?{" "}
        <Link
          href={plans.local.href}
          className="font-medium text-sage hover:text-sage-dark hover:underline"
        >
          See STR Cleaning &amp; Local Support
        </Link>
        . Not sure which fits?{" "}
        <Link
          href="/pricing"
          className="font-medium text-sage hover:text-sage-dark hover:underline"
        >
          Compare services and pricing
        </Link>
        .
      </p>
    </SectionWrapper>
  );
}
