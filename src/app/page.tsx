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
  MessageCircle,
  Lock,
  Home,
  CalendarClock,
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
import { FlagshipCaseStudySection } from "@/components/sections/flagship-case-study";
import { TwoWaysToWork } from "@/components/sections/two-ways-to-work";
import { JsonLd } from "@/components/seo/json-ld";
import { properties } from "@/data/properties";
import { homepageOwnerFAQ } from "@/data/homepage-faq";

export const metadata: Metadata = {
  title: {
    absolute: "Broken Bow Property Management | 20% Flat | Frontier",
  },
  description:
    "Boutique, owner-operated cabin management in Broken Bow & Hochatown. For the remainder of 2026 we're accepting a limited number of new properties — one owner, one manager, a portfolio kept deliberately small. 20% of nightly-rental revenue, no monthly minimum.",
  openGraph: {
    title: "Broken Bow Property Management | Boutique & Owner-Operated | Frontier",
    description:
      "For the rest of 2026 we're taking on a limited number of Broken Bow & Hochatown cabins. Operator-led management, free listing audit, no monthly minimum, month-to-month.",
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
    stat: "Flagship cabin",
    label: "Airbnb Top Rated Host on the cabin we operate ourselves",
  },
  {
    icon: Star,
    stat: "Boutique",
    label: "Hands-on management for a limited number of owner partners",
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

const EXCLUSIVITY_PILLARS = [
  {
    icon: MessageCircle,
    title: "Communication you can count on",
    description:
      "You reach Hunter and the Frontier team directly — clear updates, quick answers, and honest reporting. Never a ticket number in a queue.",
  },
  {
    icon: Lock,
    title: "A deliberately capped portfolio",
    description:
      "We limit how many cabins we manage so every owner gets senior attention — you're never just another line on a spreadsheet.",
  },
  {
    icon: Home,
    title: "Professional, operator-grade management",
    description:
      "We run our own top-rated cabin and hold your listing to the same standard: pricing, guest care, and upkeep, all handled like it's ours.",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-sage/5">
        {/* Soft decorative glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-[34rem] rounded-full bg-sage/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-14 md:pt-32 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            {/* Left: pitch */}
            <div>
              {/* Live availability pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/25 bg-sage/10 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-sage-dark sm:text-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-sage" />
                </span>
                Accepting a few properties · Remainder of 2026
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-sage">
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
                Boutique cabin management for a limited number of owners.
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                We operate our own top-rated cabin in the Broken Bow and
                Hochatown market — and for the remainder of 2026 we&apos;re
                taking on only a handful of new owners. As your property manager
                you get real communication and professionalism: clear reporting,
                quick answers, and a listing we treat like our own — never a
                support ticket or a line on a spreadsheet. 20% of nightly
                revenue, no monthly minimum.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-sage text-white hover:bg-sage-dark px-8 text-base"
                >
                  <Link href="/audit#full-audit">
                    Run my free listing audit
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
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
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="size-3.5 shrink-0 text-sage" />
                Limited 2026 availability — we cap how many cabins we manage.
              </p>
            </div>

            {/* Right: photo with floating credibility cards */}
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 lg:aspect-[5/6]">
                <Image
                  src="/images/properties/sublime/sublime-2.jpg"
                  alt="Sublime Retreat, a luxury cabin in Hochatown managed by Frontier"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              {/* Top-rated floating badge */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-lg backdrop-blur md:right-6">
                <Star className="size-3.5 fill-peach text-peach" />
                Airbnb Top-Rated Host
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

      {/* ── 2.5 Exclusivity / limited-availability band ──────────────── */}
      <section className="relative overflow-hidden bg-forest text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_0%,rgba(255,255,255,0.08),transparent)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Left: statement */}
            <AnimateInView direction="left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-white/80 sm:text-xs">
                <CalendarClock className="size-3.5" />
                By design, not by capacity
              </div>
              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                We keep our portfolio small — on purpose.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                Most managers chase doors. We don&apos;t. A capped portfolio
                means your cabin is never one of two hundred — it&apos;s one of a
                few. For the remainder of 2026 we&apos;re accepting a limited
                number of new properties, and we&apos;d rather turn a listing
                away than dilute the attention and communication every owner
                gets.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-forest hover:bg-cream px-8 text-base font-semibold"
                >
                  <DiscoveryCTALink
                    source="homepage_exclusivity"
                    href="/contact#discovery"
                  >
                    Apply for a 2026 spot
                    <ArrowRight className="ml-2 size-4" />
                  </DiscoveryCTALink>
                </Button>
                <span className="text-xs text-white/60">
                  A short call. We&apos;ll tell you honestly if we&apos;re a fit.
                </span>
              </div>
            </AnimateInView>

            {/* Right: three pillars */}
            <AnimateInView direction="right">
              <ul className="space-y-4">
                {EXCLUSIVITY_PILLARS.map((p) => (
                  <li
                    key={p.title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition hover:border-white/25 hover:bg-white/10"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <p.icon className="size-5" />
                    </div>
                    <div>
                      <div className="font-heading text-lg font-semibold tracking-wide text-white">
                        {p.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-white/70">
                        {p.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </AnimateInView>
          </div>
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

      {/* ── 3.5 Flagship case study ──────────────────────────────────── */}
      <FlagshipCaseStudySection background="white" />

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

      {/* ── 5.5 Two ways to work with us ─────────────────────────────── */}
      <TwoWaysToWork />

      {/* ── 6. Team ──────────────────────────────────────────────────── */}
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

      {/* ── 6.5 Owner-intent resources ──────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Keep researching
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Honest landings on the questions every Hochatown / Broken Bow
            cabin owner asks before signing with anyone.
          </p>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
            <li>
              <Link
                href="/airbnb-management-hochatown-ok"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Airbnb management in Hochatown
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Boutique vs scale vs national PMS — category trade-offs.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/best-hochatown-property-management-company"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Best Hochatown management company
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  How to evaluate any manager in this market.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/broken-bow-cabin-management-fees"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Broken Bow management fees
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  What 20% should include and the hidden fees.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/switch-property-managers-broken-bow"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Switching property managers
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Without losing reviews or booking momentum.
                </p>
              </Link>
            </li>
          </ul>
        </div>
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
        heading="Ready to see the revenue gap on your listing?"
        subtext="Free, takes about 90 seconds, built for Broken Bow and Hochatown cabin owners. Or book a 30-minute call with Hunter."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Run my free listing audit", href: "/audit#full-audit" }}
        secondaryCta={{
          label: "Schedule a Call",
          href: "/contact#discovery",
        }}
      />
    </>
  );
}
