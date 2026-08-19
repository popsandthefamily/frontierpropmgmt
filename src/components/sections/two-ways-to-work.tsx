import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { availability, plans } from "@/data/site";

const CARDS = [
  {
    plan: plans.manager,
    cta: "Learn more about full management",
  },
  {
    plan: plans.local,
    cta: "Learn more about Local Services",
  },
] as const;

export function TwoWaysToWork() {
  return (
    <SectionWrapper background="white" id="two-ways">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Two ways to work with us
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Hand over the whole cabin, or keep your bookings and let us cover the
          work that has to happen on site. {availability.sentence}
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {CARDS.map(({ plan, cta }) => (
          <Link
            key={plan.key}
            href={plan.href}
            className="group flex flex-col rounded-2xl border border-charcoal/10 bg-cream/40 p-6 transition hover:border-sage hover:bg-sage/5"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                {plan.name}
              </h3>
              <p className="mt-2 text-base font-semibold text-sage-dark">
                {plan.tagline}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {plan.summary}
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="font-heading text-lg font-bold text-charcoal">
                {plan.fee}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  {plan.feeSuffix}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-right text-sm font-semibold text-sage transition group-hover:gap-2">
                {cta}
                <ArrowRight className="size-4 shrink-0" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
        Not sure which fits?{" "}
        <Link
          href="/pricing"
          className="font-medium text-sage hover:text-sage-dark hover:underline"
        >
          See both plans compared &rarr;
        </Link>
      </p>
    </SectionWrapper>
  );
}
