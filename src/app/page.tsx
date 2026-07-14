import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
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
    stat: "Top-rated",
    label: "Airbnb Top-Rated Host on the cabin we run ourselves",
  },
  {
    stat: "A handful",
    label: "Owner partners we take on — not hundreds of doors",
  },
  {
    stat: "20%",
    label: "Flat management fee, all-in",
  },
  {
    stat: "$0",
    label: "Monthly minimum — you pay only when you earn",
  },
];

const PORTFOLIO_PRINCIPLES = [
  {
    title: "Communication you can count on",
    description:
      "You reach Hunter and the Frontier team directly — clear updates, quick answers, and honest reporting. Never a ticket number in a queue.",
  },
  {
    title: "A deliberately capped portfolio",
    description:
      "We limit how many cabins we manage so every owner gets senior attention. You're never just another line on a spreadsheet.",
  },
  {
    title: "Operator-grade management",
    description:
      "We run our own top-rated cabin and hold your listing to the same standard: pricing, guest care, and upkeep, handled like it's ours.",
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

      {/* ── 1. Owner-primary hero (editorial masthead) ───────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 md:pt-32 md:pb-20">
          {/* Masthead rule */}
          <div className="flex items-center justify-between gap-4 border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            <span>
              <Link
                href="/broken-bow-property-management"
                className="hover:text-charcoal"
              >
                Broken Bow
              </Link>
              {" & "}
              <Link
                href="/hochatown-property-management"
                className="hover:text-charcoal"
              >
                Hochatown
              </Link>
              , Oklahoma
            </span>
            <span className="hidden sm:inline">Boutique · Owner-operated</span>
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            {/* Left: pitch */}
            <div>
              <p className="text-sm font-medium text-sage md:text-base">
                Now taking a limited number of homes for the remainder of 2026.
              </p>
              <h1 className="mt-5 text-[2.7rem] font-bold leading-[0.92] tracking-tight text-charcoal sm:text-6xl lg:text-[4.25rem]">
                Boutique cabin management for a limited number of owners.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                We operate our own top-rated cabin in Broken Bow and Hochatown —
                and for the rest of 2026 we&apos;re taking on only a handful of
                new owners. As your property manager you get real communication
                and professionalism: clear reporting, quick answers, and a
                listing we treat like our own. 20% of nightly revenue, no
                monthly minimum.
              </p>
              <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-sage text-white hover:bg-sage-dark px-8 text-base"
                >
                  <Link href="/audit#full-audit">Run my free listing audit</Link>
                </Button>
                <DiscoveryCTALink
                  source="homepage_hero"
                  href="/contact#discovery"
                  className="group inline-flex items-center gap-2 text-base font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  Or schedule a discovery call
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </DiscoveryCTALink>
              </div>
            </div>

            {/* Right: framed photo plate with a caption, no floating chrome */}
            <figure>
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/6]">
                <Image
                  src="/images/properties/sublime/sublime-2.jpg"
                  alt="Sublime Retreat, a cabin in Hochatown that Frontier operates"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-charcoal/20 pt-3 text-xs text-muted-foreground">
                <span>Sublime Retreat — a Hochatown cabin we run ourselves.</span>
                <span className="whitespace-nowrap font-medium text-charcoal">
                  Hunter Collins, Owner
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 2. Trust ledger (verifiable, no icons) ───────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {TRUST_STATS.map((s) => (
            <div
              key={s.label}
              className="border-border px-5 py-9 lg:border-l lg:px-8 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:[&:first-child]:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
            >
              <div className="font-heading text-3xl font-bold leading-none text-charcoal md:text-4xl">
                {s.stat}
              </div>
              <div className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2.5 Portfolio principles (editorial ledger) ──────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            {/* Left: statement */}
            <div>
              <div className="border-t border-white/25 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/50">
                On keeping the portfolio small
              </div>
              <h2 className="mt-6 text-4xl font-bold leading-[0.92] text-white md:text-5xl lg:text-6xl">
                We keep our portfolio small — on purpose.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Most managers chase doors. We don&apos;t. A capped portfolio
                means your cabin is never one of two hundred — it&apos;s one of a
                few. For the remainder of 2026 we&apos;re accepting a limited
                number of new homes, and we&apos;d rather turn a listing away
                than dilute the attention every owner gets.
              </p>
              <DiscoveryCTALink
                source="homepage_exclusivity"
                href="/contact#discovery"
                className="group mt-8 inline-flex items-center gap-2 text-base font-medium text-white underline-offset-4 hover:underline"
              >
                Apply for a 2026 spot
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </DiscoveryCTALink>
            </div>

            {/* Right: numbered principles */}
            <ul>
              {PORTFOLIO_PRINCIPLES.map((p, i) => (
                <li
                  key={p.title}
                  className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/15 py-7 md:py-8"
                >
                  <span className="font-heading text-2xl font-bold leading-none text-white/35 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-heading text-xl font-semibold tracking-wide text-white md:text-2xl">
                      {p.title}
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                      {p.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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
