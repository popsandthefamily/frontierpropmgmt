import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { availability, plans, siteConfig } from "@/data/site";
import { PRICING_COLUMNS, PRICING_ROWS } from "@/data/local-services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing | Two Plans, Stated Plainly | Frontier Property Management",
  description:
    "Frontier's two plans for Broken Bow and Hochatown cabin owners: Property Manager at 20% of net rental income, or Local Services (cleaning, maintenance, logistics) on a custom quote. No setup fees, no monthly minimum, month to month.",
  keywords: [
    "Frontier property management pricing",
    "STR management pricing Broken Bow",
    "Broken Bow property management fees",
    "Hochatown cabin management cost",
    "vacation rental management fee Oklahoma",
  ],
  openGraph: {
    title: "Pricing | Frontier Property Management",
    description:
      "Two plans. 20% of net rental income for full management, or a custom quote for local cleaning and maintenance.",
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
    canonical: "https://rentwithfrontier.com/pricing",
  },
};

const HEADLINE_CARDS = [
  {
    plan: plans.manager,
    cta: { label: "See the Property Manager plan", href: plans.manager.href },
    highlight: true,
  },
  {
    plan: plans.local,
    cta: { label: "See Local Services", href: plans.local.href },
    highlight: false,
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageViewTracker event="pricing_page_viewed" />

      <JsonLd
        type="Service"
        data={{
          name: "Frontier Property Management, plans and pricing",
          provider: {
            "@type": "LocalBusiness",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
          },
          areaServed: [
            { "@type": "City", name: "Broken Bow" },
            { "@type": "Place", name: "Hochatown" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          offers: [
            {
              "@type": "Offer",
              name: plans.manager.name,
              description: plans.manager.feeDefinition,
              url: `${siteConfig.url}${plans.manager.href}`,
              availability: "https://schema.org/LimitedAvailability",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                description: "20% of net rental income",
              },
            },
            {
              "@type": "Offer",
              name: plans.local.name,
              description: plans.local.feeDefinition,
              url: `${siteConfig.url}${plans.local.href}`,
              availability: "https://schema.org/LimitedAvailability",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "USD",
                description:
                  "Quoted per property after an on-site walkthrough",
              },
            },
          ],
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3079.jpg"
        title="Pricing"
        subtitle="Two plans, both month to month. Pick the one that matches how much of the cabin you want to keep running yourself."
        size="medium"
        overlay="dark"
        cta={{ label: "Book a discovery call", href: "/contact#discovery" }}
      />

      <Breadcrumbs items={[{ label: "Pricing" }]} />

      {/* Two-card top */}
      <SectionWrapper background="cream">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {HEADLINE_CARDS.map(({ plan, cta, highlight }) => (
            <div
              key={plan.key}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                highlight
                  ? "border-sage shadow-md ring-1 ring-sage/40"
                  : "border-charcoal/10",
              )}
            >
              <h2 className="font-heading text-xl font-bold text-charcoal">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm font-medium text-sage-dark">
                {plan.tagline}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-charcoal">
                  {plan.fee}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.feeSuffix}
                </span>
              </div>
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
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Both plans are month to month with 30 days notice to cancel. No setup
          fee and no monthly minimum on either, and we do not mark up cleaning,
          maintenance, or vendor invoices on either. {availability.sentence}
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
            {[plans.manager, plans.local].map((plan) => (
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
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            Curious how 20% compares to the national operators?{" "}
            <Link
              href="/broken-bow-cabin-management-fees"
              className="font-medium text-sage hover:text-sage-dark hover:underline"
            >
              We break down the real cost of each fee model &rarr;
            </Link>
          </p>
        </div>
      </SectionWrapper>

      {/* Full comparison */}
      <SectionWrapper background="white" id="compare">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Property Manager vs Local Services, side by side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Same operator, same standards. The difference is where the line
              falls on what you keep doing yourself.
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
                  {PRICING_COLUMNS.map((col) => (
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
                {PRICING_ROWS.map((row, i) => (
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
                    {PRICING_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-4 align-top text-sm",
                          col.highlight
                            ? "bg-sage/5 font-semibold text-charcoal"
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
            {PRICING_COLUMNS.map((col) => (
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
                  {PRICING_ROWS.map((row) => (
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

      {/* Internal links */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Want the detail behind each plan?
          </h2>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.manager.href}>Property Manager detail</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.local.href}>Local Services detail</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">
                What 20% should include
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Not sure which fits?"
        subtext={`Book a free 30-minute discovery call. We'll look at your numbers and tell you the honest answer, even when it isn't us. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/contact#discovery" }}
        secondaryCta={{ label: "Run my free listing audit", href: "/audit" }}
      />
    </>
  );
}
