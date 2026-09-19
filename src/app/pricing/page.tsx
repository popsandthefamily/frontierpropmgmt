import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { HomeCarePackage } from "@/components/sections/home-care-package";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { availability, plans, siteConfig } from "@/data/site";
import {
  CTA,
  SERVICE_COMPARISON_COLUMNS,
  SERVICE_COMPARISON_ROWS,
  homeCare,
} from "@/data/home-care";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "STR Management & Home Care Pricing | Frontier" },
  description:
    "Compare full-service rental management with Home Care Concierge from $500/month. See service boundaries and request a property-specific scope.",
  openGraph: {
    title: "STR Management & Home Care Pricing | Frontier",
    description:
      "20% of net rental income for full management, or Home Care Concierge from $500 a month. What each includes, and what is quoted separately.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Frontier Property Management pricing",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/pricing`,
  },
};

const HEADLINE_CARDS = [
  {
    plan: plans.manager,
    eyebrow: "Full-Service STR Management",
    boundary:
      "A percentage of income: a $0 month costs $0 in management. Labor, parts, and vendor invoices are billed at cost. No setup fee.",
    cta: CTA.management,
    detail: { label: "How management works", href: plans.manager.href },
    highlight: true,
  },
  {
    plan: plans.concierge,
    eyebrow: "Home Care Concierge",
    boundary: homeCare.priceQualifier,
    cta: CTA.concierge,
    detail: { label: "What the plan includes", href: plans.concierge.href },
    highlight: false,
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageViewTracker event="pricing_page_viewed" />

      <JsonLd
        type="ItemList"
        data={{
          name: "Frontier Property Management services and pricing",
          url: `${siteConfig.url}/pricing`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "Offer",
                name: plans.manager.name,
                url: `${siteConfig.url}${plans.manager.href}`,
                description: plans.manager.feeDefinition,
                offeredBy: { "@id": `${siteConfig.url}/#business` },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  description: plans.manager.feeInline,
                },
                availability: "https://schema.org/LimitedAvailability",
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "Offer",
                name: `${plans.concierge.name} base plan`,
                url: `${siteConfig.url}${plans.concierge.href}`,
                description: plans.concierge.feeDefinition,
                offeredBy: { "@id": `${siteConfig.url}/#business` },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  minPrice: plans.concierge.basePrice,
                  priceCurrency: "USD",
                  description: `${homeCare.priceLine} ${homeCare.priceQualifier}`,
                },
                availability: "https://schema.org/LimitedAvailability",
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "Offer",
                name: plans.local.name,
                url: `${siteConfig.url}${plans.local.href}`,
                description: plans.local.feeDefinition,
                offeredBy: { "@id": `${siteConfig.url}/#business` },
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  description: "Quoted per property after an on-site walkthrough",
                },
              },
            },
          ],
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3079.webp"
        title="Services & Pricing"
        subtitle="Full-service rental management, or home care while you keep control. Both month to month. Here is what each one costs and where the line falls."
        size="medium"
        overlay="dark"
        cta={CTA.owner}
      />

      <Breadcrumbs items={[{ label: "Pricing" }]} />

      {/* Two-card top */}
      <SectionWrapper background="cream">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {HEADLINE_CARDS.map(({ plan, eyebrow, boundary, cta, detail, highlight }) => (
            <div
              key={plan.key}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                highlight
                  ? "border-sage shadow-md ring-1 ring-sage/40"
                  : "border-charcoal/10",
              )}
            >
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-heading text-xl font-bold text-charcoal">
                {plan.tagline}
              </h2>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-charcoal">
                  {plan.fee}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.feeSuffix}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {boundary}
              </p>
              <p className="mt-4 flex-1 text-sm text-muted-foreground">
                {plan.summary}
              </p>
              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-6 w-full text-base",
                  highlight
                    ? "bg-sage text-white hover:bg-sage-dark"
                    : "bg-charcoal text-white hover:bg-charcoal/90",
                )}
              >
                <PlanCTA
                  plan={plan.key}
                  source="pricing_page_headline_card"
                  event="pricing_tier_cta_clicked"
                  href={cta.href}
                >
                  {cta.label}
                </PlanCTA>
              </Button>
              <Link
                href={detail.href}
                className="mt-3 text-center text-sm font-medium text-sage hover:text-sage-dark hover:underline"
              >
                {detail.label} &rarr;
              </Link>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Both services are month to month with 30 days notice to cancel and
          no setup fee. Management has no monthly minimum because it is a
          share of income. Home Care Concierge is a monthly plan fee for
          scheduled work, so it is billed whether or not the home is rented.
          Vendor invoices pass through at cost on both. {availability.sentence}
        </p>
      </SectionWrapper>

      {/* Fee definitions, the precise version */}
      <SectionWrapper background="cream" id="what-the-fee-means">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              What each number actually means
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Headline rates are easy to state and easy to hide things behind.
              Here is the unabbreviated version of both.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[plans.manager, plans.concierge].map((plan) => (
              <div
                key={plan.key}
                className="rounded-2xl border border-charcoal/10 bg-white p-6"
              >
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  {plan.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {plan.feeDefinition}
                </p>
                <Link
                  href={plan.href}
                  className="mt-4 inline-block text-sm font-medium text-sage hover:text-sage-dark hover:underline"
                >
                  Full detail &rarr;
                </Link>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl border-t border-charcoal/20 pt-6 sm:grid sm:grid-cols-[11rem_1fr] sm:gap-10">
            <p className="text-[0.72rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-charcoal/60">
              Why two 20% quotes are not the same price
            </p>
            <p className="mt-3 text-base leading-relaxed text-charcoal sm:mt-0">
              {plans.manager.feeComparisonNote}
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Full comparison */}
      <SectionWrapper background="white" id="compare">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Management vs. Home Care, side by side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The difference is who operates the rental business versus who
              performs agreed physical care of the property.
            </p>
          </div>

          {/* Desktop / tablet */}
          <div className="mt-10 hidden overflow-x-auto rounded-2xl border bg-white shadow-sm md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Feature
                  </th>
                  {SERVICE_COMPARISON_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest",
                        col.highlight
                          ? "bg-sage/10 text-sage"
                          : "text-muted-foreground",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICE_COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.key}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 text-left text-sm font-medium text-charcoal align-top"
                    >
                      {row.label}
                    </th>
                    {SERVICE_COMPARISON_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-4 align-top text-sm",
                          col.highlight
                            ? "bg-sage/5 font-medium text-charcoal"
                            : "text-muted-foreground",
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {row.values[col.key] === "We handle" && (
                            <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                          )}
                          <span>{row.values[col.key]}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="mt-10 grid gap-6 md:hidden">
            {SERVICE_COMPARISON_COLUMNS.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "rounded-2xl border bg-white p-5 shadow-sm",
                  col.highlight
                    ? "border-sage ring-1 ring-sage/40"
                    : "border-charcoal/10",
                )}
              >
                <h3
                  className={cn(
                    "text-base font-semibold uppercase tracking-wider",
                    col.highlight ? "text-sage" : "text-charcoal",
                  )}
                >
                  {col.label}
                </h3>
                <dl className="mt-4 divide-y divide-cream">
                  {SERVICE_COMPARISON_ROWS.map((row) => (
                    <div key={row.key} className="grid grid-cols-2 gap-3 py-3">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className="text-sm text-charcoal">
                        {row.values[col.key]}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Home care package, price and exclusions together */}
      <SectionWrapper background="cream" id="home-care">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What $500 includes, and what it does not
          </h2>
        </div>
        <HomeCarePackage />
      </SectionWrapper>

      {/* STR local support, beneath the comparison */}
      <SectionWrapper background="white" id="local-support">
        <div className="mx-auto max-w-3xl rounded-2xl border border-charcoal/10 bg-cream/40 p-6 md:p-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            Also available
          </p>
          <h2 className="mt-3 text-2xl font-bold text-charcoal md:text-3xl">
            {plans.local.name}: {plans.local.fee.toLowerCase()} quote
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {plans.local.summary}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {plans.local.feeDefinition} This is the right fit when you need
            turnovers on a booking calendar rather than one monthly care
            cycle. It is a custom scope, not a third flagship plan, and it is
            never a percentage of your bookings.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.local.href}>See what local support covers</Link>
            </Button>
            <PlanCTA
              plan="local"
              source="pricing_page_local_block"
              href={CTA.localSupport.href}
              className="text-sm font-medium text-sage hover:text-sage-dark hover:underline"
            >
              {CTA.localSupport.label} &rarr;
            </PlanCTA>
          </div>
        </div>
      </SectionWrapper>

      {/* Internal links */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Want the detail behind each service?
          </h2>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.manager.href}>Full management detail</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.concierge.href}>Home Care Concierge detail</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">
                What 20% should include
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/faq">Owner FAQ</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Not sure which fits?"
        subtext={`Tell us about the property and we'll give you the honest answer, even when it isn't us. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.owner}
        secondaryCta={{ label: "Book a discovery call", href: "/contact#discovery" }}
      />
    </>
  );
}
