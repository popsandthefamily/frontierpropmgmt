import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  ClipboardList,
  Package,
  ShieldCheck,
  Sparkles,
  TreePine,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { StepCard } from "@/components/cards/step-card";
import { PropertyCard } from "@/components/cards/property-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { HeroSnapshot } from "@/components/audit/hero-snapshot";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { TwoWaysToWork } from "@/components/sections/two-ways-to-work";
import { HotTubPartner } from "@/components/sections/hot-tub-partner";
import { properties } from "@/data/properties";
import { homepageOwnerFAQ } from "@/data/homepage-faq";
import { plans, siteConfig } from "@/data/site";
import {
  CTA,
  HOME_CARE_SCOPE,
  OWNER_JOURNEYS,
  homeCare,
} from "@/data/home-care";

export const metadata: Metadata = {
  title: {
    absolute: "Broken Bow Property Management & Home Care | Frontier",
  },
  description:
    "Full-service STR management and home care concierge in Broken Bow and Hochatown. Local care for rental cabins and private second homes.",
  openGraph: {
    title: "Broken Bow Property Management & Home Care | Frontier",
    description:
      "Let us run your short-term rental, or keep your home clean, checked, and cared for while you keep control. One local team for rental cabins and private second homes.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Cabin interior in Hochatown, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const TRUST_LEDGER = [
  {
    stat: "Owner-operated",
    label: "Hunter Collins runs the company and answers the phone",
  },
  {
    stat: "Broken Bow",
    label: "Based at 3156 Old Broken Bow Hwy, not a regional franchise",
  },
  {
    stat: "Top-rated",
    label: "Airbnb Top-Rated Host on the Hochatown cabin we run ourselves",
  },
  {
    stat: "Month to month",
    label: "Both services, 30 days notice to cancel",
  },
];

const SCOPE_ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Waves,
  TreePine,
  ShieldCheck,
  Package,
  ClipboardList,
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero: both services, no scroll required ───────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="flex items-center justify-between gap-4 border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            <span>Frontier Property Management</span>
            <span className="hidden sm:inline">
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
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div>
              <h1 className="text-[2.6rem] font-bold leading-[0.95] tracking-tight text-charcoal sm:text-6xl lg:text-[4.1rem]">
                Property management and home care in Broken Bow &amp;
                Hochatown.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Let us run your short-term rental, or keep your home clean,
                checked, and cared for while you keep control. One local point
                of contact for rental cabins and private second homes.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-sage px-8 text-base text-white hover:bg-sage-dark"
                >
                  <PlanCTA
                    plan="manager"
                    source="homepage_hero"
                    href={plans.manager.href}
                  >
                    Manage My Rental
                  </PlanCTA>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-charcoal/30 px-8 text-base text-charcoal hover:border-sage hover:text-sage"
                >
                  <PlanCTA
                    plan="concierge"
                    source="homepage_hero"
                    href={plans.concierge.href}
                  >
                    Explore Home Care
                  </PlanCTA>
                </Button>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                Here for a stay?{" "}
                <Link
                  href="/search"
                  className="font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  Book a cabin
                </Link>
              </p>
            </div>

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
                <span>Sublime Retreat, a Hochatown cabin we run ourselves.</span>
                <span className="whitespace-nowrap font-medium text-charcoal">
                  Hunter Collins, Owner
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── 2. Two ways to work with Frontier ────────────────────────── */}
      <TwoWaysToWork background="cream" />

      {/* ── 3. Which kind of owner are you? ──────────────────────────── */}
      <SectionWrapper background="white" id="which-owner">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Which kind of owner are you?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Three situations cover almost everyone who calls. Pick yours and
            we&apos;ll point you at the right page.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {OWNER_JOURNEYS.map((journey) => (
            <div
              key={journey.key}
              className="flex flex-col rounded-2xl border border-charcoal/10 bg-cream/40 p-6"
            >
              <h3 className="font-heading text-xl font-bold text-charcoal md:text-2xl">
                {journey.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {journey.body}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href={journey.cta.href}
                  className="group inline-flex items-center gap-1 text-sm font-semibold text-sage hover:text-sage-dark hover:underline"
                >
                  {journey.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                {journey.secondary && (
                  <Link
                    href={journey.secondary.href}
                    className="text-sm font-medium text-charcoal underline-offset-4 hover:underline"
                  >
                    {journey.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── 4. Local accountability ──────────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {TRUST_LEDGER.map((s) => (
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

      <SectionWrapper background="white">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AnimateInView direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/team/hunter-collins.webp"
                alt="Hunter Collins, Owner of Frontier Property Management"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateInView>

          <AnimateInView direction="right">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
              Local accountability
            </p>
            <h2 className="mt-4 text-3xl font-bold text-charcoal md:text-4xl">
              A local team, not a call center
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Frontier is owner-operated and based in Broken Bow. We run our
              own top-rated cabin in Hochatown, so the cleaners, hot-tub
              technicians, and contractors who work on your property are the
              ones we use on ours. You reach Hunter directly, whether we are
              operating your rental or caring for your home, and we keep the
              client list small enough that the person making decisions about
              your property has actually stood in it.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-sage px-8 text-base text-white hover:bg-sage-dark"
            >
              <Link href="/about">
                Meet the team
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 5. What care looks like ──────────────────────────────────── */}
      <SectionWrapper background="cream" id="what-care-looks-like">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
            {homeCare.name}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
            What care looks like
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            One scheduled care cycle a month, {plans.concierge.feeInline}.
            Every item has a stated frequency or boundary, because a list of
            unqualified checkmarks would be a promise we cannot keep.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_CARE_SCOPE.map((block) => {
            const Icon = SCOPE_ICONS[block.icon] ?? Sparkles;
            return (
              <div
                key={block.id}
                className="rounded-2xl border border-charcoal/10 bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-lg font-bold text-charcoal">
                    {block.title}
                  </h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {block.boundary}
                </p>
              </div>
            );
          })}
        </div>
        <HotTubPartner className="mt-8" />
        <div className="mt-8 text-center">
          <Link
            href={plans.concierge.href}
            className="group inline-flex items-center gap-1 text-sm font-semibold text-sage hover:text-sage-dark hover:underline"
          >
            See what $500 includes, and what it does not
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </SectionWrapper>

      {/* ── 6. Full-service management ───────────────────────────────── */}
      <SectionWrapper background="white" id="management">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
              Full-Service STR Management
            </p>
            <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
              Or hand us the whole rental
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {plans.manager.summary} The fee is {plans.manager.feeInline},
              meaning {plans.manager.feeBase}. Cleaning fees pass to cleaners,
              vendor invoices pass through at cost, and a $0 month costs you
              $0.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-sage px-8 text-base text-white hover:bg-sage-dark"
              >
                <PlanCTA
                  plan="manager"
                  source="homepage_management_block"
                  href={plans.manager.href}
                >
                  How management works
                </PlanCTA>
              </Button>
              <Link
                href="/audit#full-audit"
                className="group inline-flex items-center gap-1 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
              >
                Already listed? Run the free listing audit
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
          <div id="calculator">
            <HeroSnapshot auditHref="/audit#full-audit" />
          </div>
        </div>
      </SectionWrapper>

      {/* ── 7. How it works ──────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            The same three steps for either service.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Talk about the property"
            description="A short call or a message. Where it is, how you use it, and what you want handled. No listing or revenue figures required."
          />
          <StepCard
            number={2}
            title="Agree the scope"
            description="A walkthrough, then a written scope: what is included, what it costs, and what is quoted separately. Nothing starts until you approve it."
          />
          <StepCard
            number={3}
            title="Scheduled service and reporting"
            description="Management clients get a monthly statement. Home care clients get a dated checklist and photos after every care cycle."
          />
        </div>
      </SectionWrapper>

      {/* ── 8. Owner FAQs ────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <FAQSection
          title="Owner questions, answered"
          questions={homepageOwnerFAQ}
        />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link
            href="/faq"
            className="font-medium text-sage hover:text-sage-dark hover:underline"
          >
            All owner questions, both services &rarr;
          </Link>
        </p>
      </SectionWrapper>

      {/* ── 9. Final owner CTA ───────────────────────────────────────── */}
      <CTASection
        heading="Tell us about your property."
        subtext="We'll tell you what a practical plan looks like: a monthly care scope for the home, or full management for the rental."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.concierge}
        secondaryCta={CTA.management}
      />

      {/* ── 10. Guest booking, compact and separate ──────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
              For guests
            </p>
            <h2 className="mt-3 text-2xl font-bold text-charcoal md:text-3xl">
              Looking to book a stay instead?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Book direct with us, no platform fees.
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
                former={property.former}
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
          {/* Hospitable search widget, kept for guests. */}
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
    </>
  );
}
