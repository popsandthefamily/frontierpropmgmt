import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  Star,
  Award,
  DollarSign,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { StepCard } from "@/components/cards/step-card";
import { PropertyCard } from "@/components/cards/property-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { HeroSnapshot } from "@/components/audit/hero-snapshot";
import { DiscoveryCTALink } from "@/components/analytics/discovery-cta";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { JsonLd } from "@/components/seo/json-ld";
import { properties } from "@/data/properties";
import { homepageOwnerFAQ } from "@/data/homepage-faq";

export const metadata: Metadata = {
  title: {
    absolute: "Broken Bow Property Management | 20% Flat | Frontier",
  },
  description:
    "Full-service cabin management in Broken Bow & Hochatown. 20% of nightly-rental revenue, no monthly minimum, Airbnb Top Rated Host on every cabin. Local team.",
  openGraph: {
    title: "Broken Bow Property Management | 20% Flat Fee | Frontier",
    description:
      "Cabin management that actually answers the phone. Free revenue estimate, no monthly minimum, month-to-month.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury cabin interior in Hochatown, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com",
  },
};

const TRUST_STATS = [
  {
    icon: Award,
    stat: "Top Rated",
    label: "Airbnb Top Rated Host, every cabin",
  },
  {
    icon: Star,
    stat: "4.9★",
    label: "Across Airbnb, VRBO & Booking.com",
  },
  {
    icon: DollarSign,
    stat: "20%",
    label: "Flat management fee",
  },
  {
    icon: Rocket,
    stat: "$0",
    label: "Monthly minimum (pay only when you earn)",
  },
];

export default function HomePage() {
  return (
    <>
      {/* FAQPage structured data, owner questions answered here */}
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: homepageOwnerFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      {/* ── 1. Owner-primary hero ───────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-cream via-white to-sage/5">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 md:pt-32 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Left: pitch */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                <Link
                  href="/hochatown-property-management"
                  className="hover:text-sage-dark hover:underline"
                >
                  Hochatown
                </Link>
                {" & "}
                <Link
                  href="/broken-bow-property-management"
                  className="hover:text-sage-dark hover:underline"
                >
                  Broken Bow
                </Link>
                {" "}Property Management
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
                Cabin management that actually answers the phone.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                Family-owned, locally operated. 20% of nightly-rental revenue,
                no monthly minimum. Airbnb Top Rated Host on every cabin we
                manage.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-sage text-white hover:bg-sage-dark px-8 text-base"
                >
                  <a href="#calculator">
                    Get a Free Revenue Estimate
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="px-8 text-base"
                >
                  <DiscoveryCTALink
                    source="homepage_hero"
                    href="/contact#discovery"
                  >
                    Schedule a Discovery Call
                  </DiscoveryCTALink>
                </Button>
              </div>
            </div>

            {/* Right: photo with owner badge */}
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-[5/6]">
                <Image
                  src="/images/properties/sublime/sublime-2.jpg"
                  alt="Sublime Retreat, a luxury cabin in Hochatown managed by Frontier"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              {/* Owner floating card */}
              <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 p-3 shadow-lg backdrop-blur md:left-6 md:right-auto md:max-w-xs">
                <Image
                  src="/images/team/hunter-collins.jpg"
                  alt="Hunter Collins"
                  width={96}
                  height={96}
                  quality={90}
                  className="size-12 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-charcoal">
                    Hunter Collins, Owner
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based in Broken Bow, OK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Trust strip (verifiable only) ─────────────────────────── */}
      <section className="border-y bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <s.icon className="mt-1 size-5 shrink-0 text-sage" />
              <div>
                <div className="font-heading text-2xl font-bold text-charcoal md:text-3xl">
                  {s.stat}
                </div>
                <div className="text-xs text-muted-foreground md:text-sm">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Market snapshot (primary owner hook) ──────────────────── */}
      <SectionWrapper background="cream" id="calculator">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What cabins earn in Broken Bow right now
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Live AirROI market data, refreshed every 6 hours. Want the
            specific numbers for your listing? Run the free audit.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <HeroSnapshot auditHref="/audit#full-audit" />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Takes 90 seconds. Free. No credit card.
          </p>
        </div>
      </SectionWrapper>

      {/* ── 4. Compared to the alternatives ──────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Compared to the alternatives
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            If you&apos;re weighing self-management or a national PMS, here&apos;s
            how the numbers line up.
          </p>
        </div>
        <ComparisonTable />
      </SectionWrapper>

      {/* ── 5. How it works ──────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How it works
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Discovery call"
            description="30 minutes, free, no pressure. We look at your numbers, not just your cabin, and tell you whether we think we can help."
          />
          <StepCard
            number={2}
            title="Custom plan"
            description="Pricing strategy, listing rewrite, photography audit, operations setup. You see the plan before you sign anything."
          />
          <StepCard
            number={3}
            title="We run it"
            description="Guest communication, cleaning, maintenance, taxes, reviews. Monthly statement, direct payout. Cancel with 30 days notice."
          />
        </div>
      </SectionWrapper>

      {/* ── 5. Team ──────────────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AnimateInView direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/team/hunter-collins.jpg"
                alt="Hunter Collins, Owner of Frontier Property Management"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateInView>

          <AnimateInView direction="right">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              A local team, not a call center
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Frontier is family-owned and based at 3156 Old Broken Bow Hwy.
              We&apos;re the people you&apos;ll actually work with, not a
              regional franchise or an overseas dispatch desk. That means fast
              response times, hands-on relationships with local cleaners and
              contractors, and someone who can be at your cabin in 20 minutes
              when something breaks.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-sage text-white hover:bg-sage-dark px-8 text-base"
            >
              <Link href="/about">
                Meet the team
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 6. Owner FAQ ─────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <FAQSection
          title="Owner questions, answered"
          questions={homepageOwnerFAQ}
        />
      </SectionWrapper>

      {/* ── 7. Guest-facing strip (demoted) ──────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold text-charcoal md:text-3xl">
              Looking to book a stay instead?
            </h3>
            <p className="mt-3 text-base text-muted-foreground">
              We have two cabins available for direct booking. No platform fees.
            </p>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {properties.map((property) => (
              <PropertyCard
                key={property.slug}
                slug={property.slug}
                name={property.name}
                tagline={property.tagline}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                sleeps={property.sleeps}
                featuredImage={property.images[0].src}
                startingPrice={property.startingPrice}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 text-base"
            >
              <Link href="/search">
                Browse all cabins
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
          {/* Hospitable search widget, kept, but down here instead of above */}
          <div className="mx-auto mt-10 max-w-4xl">
            <Script
              src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
              strategy="lazyOnload"
            />
            {/* @ts-expect-error, custom web component from Hospitable */}
            <hospitable-direct-mps
              identifier="1a10c870-8304-4205-a5d4-995f468ccc08"
              type="custom"
              results-url="/search"
            />
          </div>
        </div>
      </section>

      {/* ── 7. Final owner CTA ───────────────────────────────────────── */}
      <CTASection
        heading="Ready to earn more with less stress?"
        subtext="Get a free revenue estimate on your cabin, or book a 30-minute call with Hunter."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Get a Revenue Estimate", href: "/#calculator" }}
        secondaryCta={{
          label: "Schedule a Call",
          href: "/contact#discovery",
        }}
      />
    </>
  );
}
