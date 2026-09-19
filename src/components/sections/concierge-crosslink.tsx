import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { plans } from "@/data/site";
import { CTA, homeCare } from "@/data/home-care";

interface ConciergeCrossLinkProps {
  /** Page-specific heading so locality pages do not read as duplicates. */
  heading: string;
  /** Page-specific lead. Say something true about this page's audience. */
  body: string;
  background?: "white" | "cream";
}

/**
 * A short, contextual pointer from a management-focused page to Home Care
 * Concierge. Deliberately brief: the locality and management pages keep
 * their rental-management intent, and this only tells a private-home owner
 * who landed there that they are in the right place too.
 */
export function ConciergeCrossLink({
  heading,
  body,
  background = "cream",
}: ConciergeCrossLinkProps) {
  return (
    <SectionWrapper background={background}>
      <div className="mx-auto max-w-3xl rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
          Not renting the property?
        </p>
        <h2 className="mt-3 text-2xl font-bold text-charcoal md:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {homeCare.name}, {plans.concierge.feeInline}. {homeCare.priceQualifier}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={plans.concierge.href}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-sage hover:text-sage-dark hover:underline"
          >
            Explore Home Care Concierge
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href={CTA.concierge.href}
            className="text-sm font-medium text-charcoal underline-offset-4 hover:underline"
          >
            {CTA.concierge.label}
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
