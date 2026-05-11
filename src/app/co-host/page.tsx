import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CoHostTierCTA } from "@/components/analytics/cohost-tier-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { siteConfig } from "@/data/site";
import {
  CO_HOST_FEATURES,
  CO_HOST_OWNER_HANDLES,
  CO_HOST_PRICING_BANDS,
  CO_HOST_ADDONS,
  CO_HOST_FAQ,
} from "@/data/co-host";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Co-Host for STR Owners | Flat-Fee Listing & Web Help | Frontier",
  description:
    "Flat-fee co-host for short-term rental owners in Broken Bow & Hochatown. Listing optimization, social, owner-website help, and a free premium hocha.town listing. From $349/month.",
  keywords: [
    "co host short term rental",
    "flat fee property manager",
    "Airbnb co host services Broken Bow",
    "STR co-host Hochatown",
    "vacation rental co host Oklahoma",
    "Airbnb listing optimization service",
  ],
  openGraph: {
    title: "STR Co-Host. Flat fee. No percentages.",
    description:
      "Listing, pricing, social, and owner-website help while you keep guest communication. From $349/month.",
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

const HOW_IT_WORKS = [
  { step: 1, title: "Discovery call", body: "30 minutes, free. We confirm fit and look at your numbers." },
  { step: 2, title: "Property intake", body: "Async form covering existing listings, pricing tool status, and owner site." },
  { step: 3, title: "Setup sprint", body: "Two weeks to build or rebuild listings, configure PriceLabs, and tune your web presence." },
  { step: 4, title: "Launch review", body: "Walk through what's live and set the cadence that fits your property." },
  { step: 5, title: "Monthly cycle", body: "Strategy calls, pricing oversight, content production, and reporting." },
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
          offers: CO_HOST_PRICING_BANDS.filter((b) => b.id !== "large").map((band) => ({
            "@type": "Offer",
            name: `Co-Host — ${band.label}`,
            price: band.price.replace("$", ""),
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: band.price.replace("$", ""),
              priceCurrency: "USD",
              billingIncrement: "1",
              unitCode: "MON",
            },
          })),
        }}
      />

      {/* Custom 2-column hero — handshake illustration alongside pitch */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-dark via-sage to-sage/80">
        <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 md:pt-36 md:pb-24 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/80">
                Frontier Co-Host
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                One Co-Host service. Flat fee. No percentages.
              </h1>
              <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
                Listing, pricing, social, and owner-website help — while you keep guest
                communication and cleaning. From $349/month.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-white px-8 text-base font-semibold text-sage-dark hover:bg-cream"
                >
                  <Link href="/audit#full-audit">
                    Book a discovery call
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white px-8 text-base text-white hover:bg-white/10"
                >
                  <Link href="/pricing">Compare with Full Service</Link>
                </Button>
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:justify-end">
              <Image
                src="/images/co-host/handshake.webp"
                alt="A handshake — partnership between cabin owner and Frontier Co-Host"
                width={600}
                height={400}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="w-full max-w-md drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Co-Host" }]} />

      {/* Why flat fee */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            For owners who want more out of their cabin without handing over the keys.
          </h2>
          <p>
            You already pay state and county occupancy taxes, sales tax, platform service
            fees, and cleaning passthrough. A 20–30% management fee on top of that is hard
            to swallow if you&apos;re still doing some of the work yourself.
          </p>
          <p>
            Co-Host is one flat monthly fee for the marketing, listing, and revenue work
            that&apos;s hardest to do well as a self-manager. Same service for every
            owner — pricing scales with your property size.
          </p>
        </div>
      </SectionWrapper>

      {/* What's included */}
      <SectionWrapper background="white" id="included">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              What&apos;s included with Co-Host
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Every Co-Host owner gets the same feature list. Pricing is based on the
              property, not the package.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-sage/30 bg-sage/5 p-6">
              <h3 className="text-xl font-semibold text-sage-dark">We handle</h3>
              <ul className="mt-4 space-y-3">
                {CO_HOST_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal md:text-base">
                    <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
              <h3 className="text-xl font-semibold text-charcoal">You handle</h3>
              <ul className="mt-4 space-y-3">
                {CO_HOST_OWNER_HANDLES.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-charcoal md:text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-charcoal/40" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Want guest comms, cleaning, and maintenance handled too?{" "}
                <Link href="/management-services" className="font-medium text-sage hover:text-sage-dark hover:underline">
                  See Full Service →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing bands */}
      <SectionWrapper background="cream" id="pricing">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            One service. Three sizes.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Same feature list on every plan. The price scales with your property — that&apos;s it.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-3">
          {CO_HOST_PRICING_BANDS.map((band) => (
            <div
              key={band.id}
              className={cn(
                "flex flex-col rounded-2xl border bg-white p-6 shadow-sm",
                band.id === "mid" ? "border-sage shadow-md ring-1 ring-sage/40" : "border-charcoal/10",
              )}
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-sage">
                {band.size}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-charcoal">{band.label}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-heading text-4xl font-bold text-charcoal">{band.price}</span>
                <span className="text-sm text-muted-foreground">{band.priceSuffix}</span>
              </div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{band.bestFor}</p>
              <Button
                asChild
                size="lg"
                className={cn(
                  "mt-6 w-full text-base",
                  band.id === "mid"
                    ? "bg-sage text-white hover:bg-sage-dark"
                    : "bg-charcoal text-white hover:bg-charcoal/90",
                )}
              >
                <CoHostTierCTA tier={band.id} source="cohost_page_pricing_band" href="/audit#full-audit">
                  Book a discovery call
                </CoHostTierCTA>
              </Button>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
          Multiple properties? 10% off per additional property on the same plan, capped at 30%.
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
              À la carte add-ons available to any Co-Host client. Non-clients pay a 25% premium.
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
              <Link href="/pricing">Co-Host vs Full Service</Link>
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
        heading="Get more out of your cabin without handing over the keys."
        subtext={`Book a free 30-minute discovery call. Same flat fee for everyone — pricing scales with your property. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/audit#full-audit" }}
        secondaryCta={{ label: "See pricing comparison", href: "/pricing" }}
      />
    </>
  );
}
