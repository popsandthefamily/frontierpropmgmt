import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CoHostTierCTA } from "@/components/analytics/cohost-tier-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { siteConfig } from "@/data/site";
import { PRICING_COLUMNS, PRICING_ROWS } from "@/data/co-host";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing | Co-Host or Full Service | Frontier Property Management",
  description:
    "Compare Frontier's full-service property management and flat-fee Co-Host plans. Transparent pricing, no setup fees, no hidden percentages.",
  keywords: [
    "Frontier property management pricing",
    "STR management pricing Broken Bow",
    "co host vs property manager",
    "flat fee property management",
  ],
  openGraph: {
    title: "Pricing | Frontier Property Management",
    description:
      "Compare Co-Host Standard, Co-Host Premier, and Full Service. Side-by-side. No surprises.",
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

const TIER_HEADLINES: Record<
  "standard" | "premier" | "fullService",
  {
    name: string;
    price: string;
    priceSuffix: string;
    pitch: string;
    cta: { label: string; href: string };
    highlight?: boolean;
    target: "standard" | "premier" | "fullService";
  }
> = {
  standard: {
    name: "Co-Host Standard",
    price: "$349",
    priceSuffix: "/month flat",
    pitch: "Listing, pricing, and content support for self-managing owners up to 3BR.",
    cta: { label: "Start with Standard", href: "/audit#full-audit" },
    target: "standard",
  },
  premier: {
    name: "Co-Host Premier",
    price: "$599",
    priceSuffix: "/month flat",
    pitch: "Active pricing, premium content, and review handling for 4+ BR or luxury properties.",
    cta: { label: "Start with Premier", href: "/audit#full-audit" },
    highlight: true,
    target: "premier",
  },
  fullService: {
    name: "Full Service",
    price: "20%",
    priceSuffix: "of bookings",
    pitch: "Hands-off cabin management. Guest comms, cleaning, maintenance, taxes — all of it.",
    cta: { label: "See full-service details", href: "/management-services" },
    target: "fullService",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageViewTracker event="pricing_page_viewed" />

      <JsonLd
        type="Service"
        data={{
          name: "Frontier Property Management — Pricing",
          provider: {
            "@type": "LocalBusiness",
            name: "Frontier Property Management",
            url: "https://rentwithfrontier.com",
          },
          areaServed: [
            { "@type": "City", name: "Broken Bow" },
            { "@type": "Place", name: "Hochatown" },
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Co-Host Standard",
              price: "349",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Co-Host Premier",
              price: "599",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Full Service Property Management",
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "20% of nightly-rental revenue",
              },
            },
          ],
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3079.jpg"
        title="Pricing"
        subtitle="Three ways to work with Frontier. Pick the level of involvement that fits the property."
        size="medium"
        overlay="dark"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
      />

      <Breadcrumbs items={[{ label: "Pricing" }]} />

      {/* Tier headline cards */}
      <SectionWrapper background="cream">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {(["standard", "premier", "fullService"] as const).map((key) => {
            const tier = TIER_HEADLINES[key];
            return (
              <div
                key={key}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                  tier.highlight ? "border-sage shadow-md ring-1 ring-sage/40" : "border-charcoal/10",
                )}
              >
                <h3 className="text-lg font-semibold text-charcoal">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-charcoal">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.priceSuffix}</span>
                </div>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{tier.pitch}</p>
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "mt-6 w-full text-base",
                    tier.highlight
                      ? "bg-sage text-white hover:bg-sage-dark"
                      : "bg-charcoal text-white hover:bg-charcoal/90",
                  )}
                >
                  <CoHostTierCTA
                    tier={tier.target}
                    source="pricing_page_tier_card"
                    event="pricing_tier_cta_clicked"
                    href={tier.cta.href}
                  >
                    {tier.cta.label}
                  </CoHostTierCTA>
                </Button>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Comparison table — desktop */}
      <SectionWrapper background="white" id="compare">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Compare plans side-by-side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Same property, three operating models. Where does the line fall on what you
              want to keep doing yourself?
            </p>
          </div>

          {/* Desktop / tablet table */}
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
                        col.highlight ? "bg-sage/10 text-sage" : "text-muted-foreground",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRICING_ROWS.map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}>
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
                          {col.highlight && (
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

          {/* Mobile stacked cards */}
          <div className="mt-10 grid gap-6 md:hidden">
            {PRICING_COLUMNS.map((col) => (
              <div
                key={col.key}
                className={cn(
                  "rounded-2xl border bg-white p-5 shadow-sm",
                  col.highlight ? "border-sage ring-1 ring-sage/40" : "border-charcoal/10",
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
                      <dd className="text-sm text-charcoal">{row.values[col.key]}</dd>
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
              <Link href="/co-host">Co-Host details</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/management-services">Full-service details</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">What 20% should include</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Not sure which plan fits?"
        subtext={`Book a free 30-minute discovery call. We'll look at your numbers and tell you the honest answer. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
        secondaryCta={{ label: "Run my free listing audit", href: "/audit" }}
      />
    </>
  );
}
