import Link from "next/link";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans } from "@/data/site";
import {
  HOME_CARE_NOT_INCLUDED,
  HOME_CARE_PRICING_NOTES,
  HOME_CARE_SCOPE,
  HOME_CARE_STR_NOTE,
  homeCare,
} from "@/data/home-care";

interface HomeCarePackageProps {
  className?: string;
  /** Show the link to the full concierge page. Off on the page itself. */
  showDetailLink?: boolean;
}

/**
 * "What $500 includes, and what it does not." Shared by the concierge page
 * and the pricing page so the price, the qualifier, the included scope, and
 * the exclusions are always shown together and always read from the same
 * data.
 */
export function HomeCarePackage({
  className,
  showDetailLink = true,
}: HomeCarePackageProps) {
  return (
    <div className={cn("mx-auto max-w-5xl", className)}>
      <div className="rounded-2xl border border-sage bg-white p-6 shadow-sm ring-1 ring-sage/30 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
              {homeCare.name}
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-heading text-4xl font-bold text-charcoal md:text-5xl">
                {plans.concierge.fee}
              </span>
              <span className="text-base text-muted-foreground">
                {plans.concierge.feeSuffix}
              </span>
            </div>
            <p className="mt-2 text-base text-charcoal">{homeCare.priceLine}</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-right">
            {homeCare.priceQualifier}
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h3 className="text-base font-semibold text-charcoal">
              In the base plan
            </h3>
            <ul className="mt-4 space-y-3">
              {HOME_CARE_SCOPE.map((block) => (
                <li key={block.id} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                  <div>
                    <span className="text-sm font-medium text-charcoal">
                      {block.title}
                    </span>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {block.boundary}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-charcoal">
              Quoted separately
            </h3>
            <ul className="mt-4 space-y-2.5">
              {HOME_CARE_NOT_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <X className="mt-0.5 size-4 shrink-0 text-charcoal/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-charcoal/10 bg-cream/60 p-5">
          <p className="text-sm leading-relaxed text-charcoal">{HOME_CARE_STR_NOTE}</p>
        </div>

        <ul className="mt-6 grid gap-2 text-xs leading-relaxed text-muted-foreground sm:grid-cols-2">
          {HOME_CARE_PRICING_NOTES.map((note) => (
            <li key={note} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
              {note}
            </li>
          ))}
        </ul>

        {showDetailLink && (
          <p className="mt-6 text-sm text-muted-foreground">
            Full detail, sample report, and FAQs on the{" "}
            <Link
              href={plans.concierge.href}
              className="font-medium text-sage hover:text-sage-dark hover:underline"
            >
              Home Care Concierge page &rarr;
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
