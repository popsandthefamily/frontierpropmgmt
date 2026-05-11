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
import { PRICING_COLUMNS, PRICING_ROWS, CO_HOST_PRICING_BANDS } from "@/data/co-host";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing | Co-Host or Full Service | Frontier Property Management",
  description:
    "Compare Frontier's Co-Host (flat fee, from $349/mo) and Full Service (20% of bookings). Same operator, two ways to work together. No setup fees, no hidden percentages.",
  keywords: [
    "Frontier property management pricing",
    "STR management pricing Broken Bow",
    "co host vs property manager",
    "flat fee property management",
  ],
  openGraph: {
    title: "Pricing | Frontier Property Management",
    description:
      "Co-Host or Full Service. Side-by-side. No surprises.",
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
    key: "cohost" as const,
    name: "Co-Host",
    price: "$349–$599",
    priceSuffix: "/month flat",
    pitch: "Listing, pricing, social, and owner-website help. You keep guest comms and cleaning. Pricing scales with property size.",
    cta: { label: "See Co-Host details", href: "/co-host" },
    highlight: true,
  },
  {
    key: "fullService" as const,
    name: "Full Service",
    price: "20%",
    priceSuffix: "of bookings",
    pitch: "Hands-off cabin management. Guest comms, cleaning, maintenance, taxes — all of it.",
    cta: { label: "See Full Service details", href: "/management-services" },
  },
];

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
              name: "Co-Host (1–3 BR)",
              price: "349",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: "Co-Host (4–5 BR)",
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
        subtitle="Two ways to work with Frontier. Pick the level of involvement that fits the property."
        size="medium"
        overlay="dark"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
      />

      <Breadcrumbs items={[{ label: "Pricing" }]} />

      {/* Two-card top */}
      <SectionWrapper background="cream">
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {HEADLINE_CARDS.map((card) => (
            <div
              key={card.key}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                card.highlight ? "border-sage shadow-md ring-1 ring-sage/40" : "border-charcoal/10",
              )}
            >
              <h3 className="text-lg font-semibold text-charcoal">{card.name}</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-charcoal">{card.price}</span>
                <span className="text-sm text-muted-foreground">{card.priceSuffix}</span>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{card.pitch}</p>
              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-6 w-full text-base",
                  card.highlight
                    ? "bg-sage text-white hover:bg-sage-dark"
                    : "bg-charcoal text-white hover:bg-charcoal/90",
                )}
              >
                <CoHostTierCTA
                  tier={card.key}
                  source="pricing_page_headline_card"
                  event="pricing_tier_cta_clicked"
                  href={card.cta.href}
                >
                  {card.cta.label}
                </CoHostTierCTA>
              </Button>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Co-Host pricing band detail */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
              Co-Host pricing by property size
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Same feature list at every size. The only thing that changes is the monthly fee.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Property size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Best for
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Monthly fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {CO_HOST_PRICING_BANDS.map((band, i) => (
                  <tr key={band.id} className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}>
                    <td className="px-4 py-3 align-top text-sm font-medium text-charcoal">
                      <div>{band.label}</div>
                      <div className="text-xs text-muted-foreground">{band.size}</div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-muted-foreground">
                      {band.bestFor}
                    </td>
                    <td className="px-4 py-3 text-right align-top text-sm font-semibold text-charcoal whitespace-nowrap">
                      {band.price}
                      <div className="text-xs font-normal text-muted-foreground">{band.priceSuffix}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* Full comparison */}
      <SectionWrapper background="cream" id="compare">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Co-Host vs Full Service, side-by-side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Same operator. Two operating models. Where does the line fall on what you
              want to keep doing yourself?
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

          {/* Mobile stacked */}
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
      <SectionWrapper background="white">
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
        heading="Not sure which fits?"
        subtext={`Book a free 30-minute discovery call. We'll look at your numbers and tell you the honest answer. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
        secondaryCta={{ label: "Run my free listing audit", href: "/audit" }}
      />
    </>
  );
}
