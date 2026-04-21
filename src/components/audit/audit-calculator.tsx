import { HeroSnapshot } from "./hero-snapshot";
import { Tier2Form } from "./tier2-form";

interface Props {
  /**
   * Visual variant:
   * - "hero": Used on the homepage and Dallas page. Shows snapshot only; the
   *   primary CTA deep-links to /audit#full-audit so visitors don't get two
   *   stacked audit forms.
   * - "full": Used on /audit and /income-calculator. Snapshot + always-visible
   *   Tier 2 form; same-page anchor scroll.
   */
  variant?: "hero" | "full";
  /** Optional heading/subhead for the Tier 2 section */
  tier2Heading?: string;
  tier2Subhead?: string;
}

export function AuditCalculator({
  variant = "full",
  tier2Heading = "Get your full listing audit",
  tier2Subhead = "Takes 90 seconds. Free. We send the specific numbers for your listing to your email.",
}: Props) {
  const auditHref = variant === "full" ? "#full-audit" : "/audit#full-audit";

  return (
    <div className="space-y-8">
      <HeroSnapshot auditHref={auditHref} />

      {variant === "full" && (
        <div id="full-audit-wrap" className="mx-auto max-w-2xl">
          <div className="mb-5 text-center">
            <span className="inline-block rounded-full border border-sage/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage">
              Full audit
            </span>
            <h3 className="mt-4 text-2xl font-bold text-charcoal md:text-3xl">
              {tier2Heading}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {tier2Subhead}
            </p>
          </div>
          <Tier2Form />
        </div>
      )}
    </div>
  );
}
