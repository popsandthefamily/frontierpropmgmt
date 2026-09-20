import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { HotTubPartner } from "@/components/sections/hot-tub-partner";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { availability, plans, siteConfig } from "@/data/site";
import { CTA, homeCare } from "@/data/home-care";
import {
  LOCAL_SERVICE_GROUPS,
  LOCAL_SERVICES_FAQ,
  LOCAL_SERVICES_NOT_INCLUDED,
  LOCAL_SERVICES_STEPS,
} from "@/data/local-services";

export const metadata: Metadata = {
  title: { absolute: "STR Cleaning & Local Support in Broken Bow | Frontier" },
  description:
    "Keep your bookings and get local support. Turnover cleaning, cabin maintenance, and agreed on-site services in Broken Bow and Hochatown.",
  keywords: [
    "Broken Bow cabin cleaning service",
    "Hochatown vacation rental turnover cleaning",
    "cabin maintenance Broken Bow Oklahoma",
    "Airbnb turnover service Hochatown",
    "short term rental cleaning McCurtain County",
    "remote cabin owner local help Broken Bow",
    "vacation rental maintenance Oklahoma",
  ],
  openGraph: {
    title: "STR Cleaning & Local Support | Frontier Property Management",
    description:
      "Turnover cleaning, maintenance, and logistics for cabin owners who keep their own bookings. Custom quote, month to month.",
    images: [
      {
        url: "/images/local-services/hero-og.jpg",
        width: 1200,
        height: 630,
        alt: "Covered porch of a Frontier-maintained cabin in Broken Bow",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}${plans.local.href}`,
  },
};

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Wrench,
  ShieldCheck,
  Truck,
};

export default function LocalServicesPage() {
  return (
    <>
      <PageViewTracker event="local_services_page_viewed" />

      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: LOCAL_SERVICES_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <JsonLd
        type="Service"
        data={{
          "@id": `${siteConfig.url}${plans.local.href}#service`,
          name: `${plans.local.name}, Broken Bow and Hochatown`,
          alternateName: "Local Services",
          description: plans.local.summary,
          url: `${siteConfig.url}${plans.local.href}`,
          provider: { "@id": `${siteConfig.url}/#business` },
          serviceType:
            "Short-term rental cleaning, maintenance, and property logistics",
          areaServed: [
            { "@type": "City", name: "Broken Bow" },
            { "@type": "Place", name: "Hochatown" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          offers: {
            "@type": "Offer",
            name: plans.local.name,
            description: plans.local.feeDefinition,
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "USD",
              description:
                "Quoted per property after an on-site walkthrough. Recurring work is billed as a flat monthly fee; on-call work is billed at a pre-approved rate.",
            },
            availability: "https://schema.org/LimitedAvailability",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: plans.local.name,
            itemListElement: LOCAL_SERVICE_GROUPS.map((group) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: group.title,
                description: group.items.join(". "),
              },
            })),
          },
        }}
      />

      <HeroSection
        backgroundImage="/images/local-services/hero.webp"
        title="STR Cleaning & Local Support"
        subtitle="Turnover cleaning, maintenance, and logistics for owners who keep their own bookings. You stay in control of the listing. We handle what needs a person on site."
        size="medium"
        overlay="dark"
        cta={CTA.localSupport}
        secondaryCta={{ label: "Compare services & pricing", href: "/pricing" }}
      />

      <Breadcrumbs items={[{ label: "STR Cleaning & Local Support" }]} />

      {/* Why this plan exists */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            The problem this solves is distance.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Plenty of owners are good at running their own cabin. They price
              it well, they write better listing copy than any agency would, and
              they genuinely enjoy talking to guests. What they can&apos;t do
              from Dallas or Oklahoma City is meet the hot tub technician on a
              Tuesday, or walk the property after a hard freeze, or find out why
              the cleaner didn&apos;t show up until the guest tells them.
            </p>
            <p>
              That gap is where money leaks out of a short-term rental. Not in
              the management fee, but in the four-star review about a dirty
              cabin, the burst pipe nobody caught for three days, and the
              weekend blocked off because you had to drive down yourself.
            </p>
            <p>
              Local support closes it without asking you to hand over the
              property. You keep the listing, the calendar, the pricing, and the
              guest relationship. We become the part of your operation that
              lives fifteen minutes away.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Relationship to Home Care Concierge */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-charcoal/10 bg-cream/40 p-6 md:p-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
            Which one do you need?
          </p>
          <h2 className="mt-3 text-2xl font-bold text-charcoal md:text-3xl">
            Turnovers on a calendar, or one monthly care cycle?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            This page is for a rental that turns over on a booking calendar:
            departure and arrival cleans, restocking, and the maintenance that
            comes with guests. It is scoped per property because no two
            rentals want the same list.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            If the property is a private second home, or a cabin you rent only
            occasionally, {homeCare.name} is the recurring option:{" "}
            {plans.concierge.feeInline}, one scheduled care cycle a month
            covering a maintenance clean, hot-tub attention, light exterior
            upkeep, a visual check, and a report. Guest turnovers and extra
            visits are added to that plan as their own quoted line, never
            folded into the base price.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={plans.concierge.href}
              className="group inline-flex items-center gap-1 text-sm font-semibold text-sage hover:text-sage-dark hover:underline"
            >
              See Home Care Concierge
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              Compare services and pricing
            </Link>
          </div>
        </div>
      </SectionWrapper>

      {/* What's covered */}
      <SectionWrapper background="white" id="included">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              What we cover
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Pick the pieces you need. Most owners start with turnovers and
              maintenance, then add the rest once they stop driving down on
              weekends.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {LOCAL_SERVICE_GROUPS.map((group) => {
              const Icon = ICONS[group.icon] ?? Sparkles;
              return (
                <div
                  key={group.id}
                  className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="font-heading text-xl font-bold text-charcoal">
                      {group.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {group.summary}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-charcoal"
                      >
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <HotTubPartner className="mt-8" />

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-charcoal/10 bg-white p-6">
            <h3 className="text-lg font-semibold text-charcoal">
              What local support does not include
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Anything touching your guests, your revenue, or your listing lives
              on the other plan. We would rather say that plainly than have it
              surface later.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {LOCAL_SERVICES_NOT_INCLUDED.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-charcoal/30" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Want all of that handled too?{" "}
              <Link
                href={plans.manager.href}
                className="font-medium text-sage hover:text-sage-dark hover:underline"
              >
                See the Property Manager plan &rarr;
              </Link>
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Pricing explanation, no price list */}
      <SectionWrapper background="cream" id="pricing">
        <div className="mx-auto max-w-3xl">
          <div>
            <p className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
              Pricing
            </p>
            <h2 className="mt-6 text-3xl font-bold text-charcoal md:text-4xl">
              Quoted per property. On purpose.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                There is no rate card on this page, and that is a deliberate
                choice rather than a sales tactic. A two-bedroom that needs
                turnover cleaning and nothing else is a different job from a
                five-bedroom with a pool, a hot tub, a well, and a quarter mile
                of gravel drive. Any number we published would overcharge the
                first owner or quietly exclude half of what the second one
                needs.
              </p>
              <p>
                So we walk the property, write down exactly what we will handle,
                and give you a figure. Recurring work is a flat monthly amount.
                On-call work is a rate you approve before we do anything.
                Vendor invoices pass through at cost, with no markup. If the
                scope changes, we requote instead of letting the invoice creep.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-sage px-8 text-base text-white hover:bg-sage-dark"
              >
                <PlanCTA
                  plan="local"
                  source="local_services_pricing_block"
                  href={CTA.localSupport.href}
                >
                  {CTA.localSupport.label}
                  <ArrowRight className="ml-2 size-4" />
                </PlanCTA>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8 text-base"
              >
                <Link href="/pricing">Compare services &amp; pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              From first call to first turnover: scoping call, walkthrough,
              written quote, handoff.
            </p>
          </div>
          <ol className="mt-10 space-y-4">
            {LOCAL_SERVICES_STEPS.map((s) => (
              <li
                key={s.step}
                className="flex items-start gap-4 rounded-xl border bg-white p-5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-base font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-charcoal">
                    {s.title}
                  </h3>
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
            Weighing this against full management?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            The two plans solve different problems. The pricing page puts them
            side by side.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/pricing">Compare services &amp; pricing</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.manager.href}>Full-service management</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.concierge.href}>Home Care Concierge</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="cream">
        <FAQSection
          title="Local support, common questions"
          questions={LOCAL_SERVICES_FAQ}
        />
      </SectionWrapper>

      <CTASection
        heading="Stop driving down to fix things yourself."
        subtext={`Book a free scoping call and we'll walk the property. ${availability.sentence} ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.localSupport}
        secondaryCta={{ label: "Compare services & pricing", href: "/pricing" }}
      />
    </>
  );
}
