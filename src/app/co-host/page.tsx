import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CoHostTierCTA } from "@/components/analytics/cohost-tier-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { siteConfig } from "@/data/site";
import {
  CO_HOST_TIERS,
  CO_HOST_ADDONS,
  CO_HOST_FAQ,
} from "@/data/co-host";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Co-Host Services for STR Owners | Flat Fee, No Percentages | Frontier",
  description:
    "Flat-fee co-host services for short-term rental owners in Broken Bow & Hochatown. Pro listing, pricing, and content support starting at $349/month. No percentages, ever.",
  keywords: [
    "co host short term rental",
    "flat fee property manager",
    "Airbnb co host services Broken Bow",
    "STR co-host Hochatown",
    "vacation rental co host Oklahoma",
    "Airbnb listing optimization service",
  ],
  openGraph: {
    title: "STR Co-Host Services. Flat fee. No percentages.",
    description:
      "Pro listing, pricing, and content support while you keep guest communication. Starting at $349 per month.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Frontier Co-Host services for STR owners",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/co-host",
  },
};

const YOU_HANDLE = [
  "Guest communications",
  "Cleaning logistics",
  "Maintenance dispatch",
  "Tax filings",
  "Supply restocking",
];

const WE_HANDLE = [
  "Listing optimization across Airbnb, VRBO, and one channel of your choice",
  "Dynamic pricing setup and oversight (PriceLabs, Frontier-managed)",
  "Social content production",
  "Reputation monitoring",
  "Monthly strategy and revenue review",
  "Async support during business hours",
];

const HOW_IT_WORKS = [
  { step: 1, title: "Discovery call", body: "30 minutes, free. We confirm tier fit and review your property." },
  { step: 2, title: "Property intake", body: "Async form covering existing listings, pricing tool status, photos, branding." },
  { step: 3, title: "Setup sprint", body: "Two weeks to build or rebuild your listings, configure pricing, and sync channels." },
  { step: 4, title: "Launch review", body: "Walk through what's live and set the monthly cadence." },
  { step: 5, title: "Monthly cycle", body: "Strategy calls, weekly pricing oversight, content production, and reporting." },
];

export default function CoHostPage() {
  return (
    <>
      <PageViewTracker event="cohost_page_viewed" />

      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: CO_HOST_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <JsonLd
        type="Service"
        data={{
          name: "Frontier Co-Host",
          provider: {
            "@type": "LocalBusiness",
            name: "Frontier Property Management",
            url: "https://rentwithfrontier.com",
          },
          serviceType: "Short-term rental co-host service",
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
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "349",
                priceCurrency: "USD",
                billingIncrement: "1",
                unitCode: "MON",
              },
            },
            {
              "@type": "Offer",
              name: "Co-Host Premier",
              price: "599",
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "599",
                priceCurrency: "USD",
                billingIncrement: "1",
                unitCode: "MON",
              },
            },
          ],
        }}
      />

      <HeroSection
        backgroundImage="/images/properties/sublime/sublime-2.jpg"
        title="STR Co-Host. Flat fee. No percentages."
        subtitle="You handle the parts you want to control. We handle the parts you'd rather not. One flat monthly fee, billed monthly, cancel anytime."
        size="large"
        overlay="gradient"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
        secondaryCta={{ label: "Compare with Full Service", href: "/pricing" }}
      />

      <Breadcrumbs items={[{ label: "Co-Host" }]} />

      {/* Why flat fee */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Owners are tired of being nickel and dimed.
          </h2>
          <p>
            You already pay state and county occupancy taxes. Sales tax. Platform service
            fees. Cleaning passthrough. Then a property manager wants 20–30% on top.
          </p>
          <p>
            Frontier Co-Host removes one of those percentages entirely. One flat monthly
            fee covers expert listing, pricing, and content support. No revenue clawbacks.
            No surprises at month-end.
          </p>
        </div>
      </SectionWrapper>

      {/* What you keep / what we handle */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              What you keep, what we handle
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Co-Host is built for owners who want expert help on the marketing and revenue
              side without giving up operational control.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <h3 className="text-xl font-semibold text-charcoal">You handle</h3>
              <ul className="mt-4 space-y-3">
                {YOU_HANDLE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal md:text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-charcoal/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-sage/30 bg-sage/5 p-6">
              <h3 className="text-xl font-semibold text-sage-dark">We handle</h3>
              <ul className="mt-4 space-y-3">
                {WE_HANDLE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal md:text-base">
                    <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Tier cards */}
      <SectionWrapper background="cream" id="tiers">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Two tiers, plus custom
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Same flat-fee model across the board. Pick the tier that matches the property.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
          {CO_HOST_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                tier.highlight ? "border-sage shadow-md ring-1 ring-sage/40" : "border-charcoal/10",
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  <Star className="size-3" /> Most popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-charcoal">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-bold text-charcoal">
                    {tier.priceLabel}
                  </span>
                  {tier.priceSuffix && (
                    <span className="text-sm text-muted-foreground">{tier.priceSuffix}</span>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold text-charcoal">{tier.bestFor}</p>
                <p className="mt-1 text-sm text-muted-foreground">{tier.bestForDetail}</p>
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-charcoal">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {tier.ownerHandles.length > 0 && (
                <div className="mt-6 rounded-lg bg-cream/60 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Owner handles
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {tier.ownerHandles.map((item) => (
                      <li key={item}>· {item}</li>
                    ))}
                  </ul>
                </div>
              )}

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
                <CoHostTierCTA tier={tier.id} source="cohost_page_tier_card" href={tier.cta.href}>
                  {tier.cta.label}
                </CoHostTierCTA>
              </Button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Multi-property pricing: 10% off per additional property on the same plan, capped at 30%.
        </p>
      </SectionWrapper>

      {/* Add-ons */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Need something extra? Add it on.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              À la carte services available to any tier. Non-clients pay a 25% premium.
            </p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[480px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Service
                  </th>
                  <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {CO_HOST_ADDONS.map((addon, i) => (
                  <tr
                    key={addon.service}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}
                  >
                    <td className="px-4 py-4 align-top text-sm text-charcoal">
                      <div className="font-medium">{addon.service}</div>
                      {addon.notes && (
                        <div className="mt-1 text-xs text-muted-foreground">{addon.notes}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-right align-top text-sm font-semibold text-charcoal whitespace-nowrap">
                      {addon.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              From discovery to launch in about three weeks.
            </p>
          </div>
          <ol className="mt-10 space-y-4">
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step} className="flex items-start gap-4 rounded-xl border bg-white p-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-base font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-charcoal">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      {/* Internal links */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Comparing this with full-service?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Co-Host and full-service solve different problems. The pricing page lays them
            out side-by-side.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/pricing">See all three plans compared</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/management-services">Full-service management</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="cream">
        <FAQSection title="Co-Host — common questions" questions={CO_HOST_FAQ} />
      </SectionWrapper>

      <CTASection
        heading="Stop paying percentages on your own revenue."
        subtext={`Book a free 30-minute discovery call and we'll match you to the right tier. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
        secondaryCta={{ label: "See pricing comparison", href: "/pricing" }}
      />
    </>
  );
}
