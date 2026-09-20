import type { Metadata } from "next";
import Link from "next/link";
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
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { HomeCarePackage } from "@/components/sections/home-care-package";
import { HotTubPartner } from "@/components/sections/hot-tub-partner";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PlanCTA } from "@/components/analytics/plan-cta";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { plans, siteConfig } from "@/data/site";
import {
  CTA,
  HOME_CARE_AUDIENCES,
  HOME_CARE_FAQ,
  HOME_CARE_SAMPLE_REPORT,
  HOME_CARE_SCOPE,
  HOME_CARE_STEPS,
  HOME_CARE_STR_NOTE,
  homeCare,
} from "@/data/home-care";

export const metadata: Metadata = {
  title: { absolute: "Broken Bow Home Care Concierge | Frontier" },
  description:
    "Home care for private second homes and rental cabins in Broken Bow and Hochatown. Monthly plans from $500; scope confirmed after a walkthrough.",
  openGraph: {
    title: "Home Care Concierge in Broken Bow & Hochatown | Frontier",
    description:
      "Your place here, cared for while you're away. Agreed cleaning, hot-tub care, light exterior upkeep, and property checks, without handing over your bookings.",
    images: [
      {
        url: "/images/local-services/hero-og.jpg",
        width: 1200,
        height: 630,
        alt: "Covered porch of a cabin in Broken Bow, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}${plans.concierge.href}`,
  },
};

const ICONS: Record<string, LucideIcon> = {
  Sparkles,
  Waves,
  TreePine,
  ShieldCheck,
  Package,
  ClipboardList,
};

export default function HomeCareConciergePage() {
  return (
    <>
      <PageViewTracker event="home_care_page_viewed" />

      {/* Service schema, tied to the single business entity in the root
          layout. The offer mirrors the visible price and qualifier. */}
      <JsonLd
        type="Service"
        data={{
          "@id": `${siteConfig.url}${plans.concierge.href}#service`,
          name: `${homeCare.name}, Broken Bow and Hochatown`,
          serviceType: "Second-home and cabin care: scheduled cleaning, hot-tub attention, light exterior upkeep, and property checks",
          description: plans.concierge.summary,
          url: `${siteConfig.url}${plans.concierge.href}`,
          provider: { "@id": `${siteConfig.url}/#business` },
          areaServed: [
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "Hochatown, Oklahoma" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          audience: {
            "@type": "Audience",
            audienceType:
              "Owners of private second homes, owner-used vacation homes, and self-managed short-term rentals",
          },
          offers: {
            "@type": "Offer",
            name: `${homeCare.name} base plan`,
            url: `${siteConfig.url}${plans.concierge.href}`,
            description: plans.concierge.feeDefinition,
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: plans.concierge.basePrice,
              priceCurrency: "USD",
              description: `${homeCare.priceLine} ${homeCare.priceQualifier}`,
            },
            availability: "https://schema.org/LimitedAvailability",
          },
        }}
      />

      <HeroSection
        backgroundImage="/images/local-services/hero.webp"
        title="Home Care Concierge in Broken Bow & Hochatown"
        subtitle={homeCare.lead}
        size="large"
        overlay="dark"
        cta={CTA.concierge}
        secondaryCta={{ label: "Compare With Full Management", href: "/pricing" }}
      />

      <Breadcrumbs items={[{ label: "Home Care Concierge" }]} />

      {/* Price and qualification, above the fold on scroll */}
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                {homeCare.name}
              </p>
              <div className="mt-1 font-heading text-4xl font-bold text-charcoal md:text-5xl">
                {plans.concierge.fee}
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  {plans.concierge.feeSuffix}
                </span>
              </div>
              <p className="mt-1 text-sm text-charcoal">{homeCare.priceLine}</p>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {homeCare.priceQualifier}
            </p>
          </div>
        </div>
      </section>

      {/* 1. Your home does not have to be a rental */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Your home does not have to be a rental.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              A private second home or a cabin you rent out still needs local
              attention. Frontier coordinates agreed cleaning, hot-tub care,
              light exterior upkeep, and property checks without asking you to
              hand over your bookings.
            </p>
            <p>
              Come back to a cared-for home without coordinating every small
              task from out of town. We agree on the work, schedule the monthly
              service, and tell you what we completed and what needs
              attention.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {HOME_CARE_AUDIENCES.map((a) => (
            <div
              key={a.key}
              className="rounded-2xl border border-charcoal/10 bg-cream/40 p-5"
            >
              <h3 className="font-heading text-xl font-bold text-charcoal">
                {a.label}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* 2. One monthly plan, a defined list of responsibilities */}
      <SectionWrapper background="cream" id="included">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            One monthly plan. A defined list of responsibilities.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Every item states its frequency or its boundary. A long list of
            unqualified checkmarks would look like more than we can deliver
            for the base price, and we would rather you know exactly what you
            are buying.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {HOME_CARE_SCOPE.map((block) => {
            const Icon = ICONS[block.icon] ?? Sparkles;
            return (
              <div
                key={block.id}
                className="flex flex-col rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-charcoal">
                    {block.title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal">
                  {block.body}
                </p>
                <p className="mt-3 border-t border-charcoal/10 pt-3 text-xs leading-relaxed text-muted-foreground">
                  {block.boundary}
                </p>
              </div>
            );
          })}
        </div>
        <HotTubPartner variant="card" className="mt-10" />
      </SectionWrapper>

      {/* 3. Keep your bookings, add local support */}
      <SectionWrapper background="white" id="str">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Keep your bookings. Add local support.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {HOME_CARE_STR_NOTE}
          </p>
          <div className="mt-6 rounded-2xl border border-sage/30 bg-sage/5 p-5">
            <p className="text-sm font-semibold text-charcoal">
              Guest turnovers and extra visits are quoted separately.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The base plan includes one scheduled maintenance clean a month.
              If you want it timed after a particular stay, say so and it is
              never billed twice. A rental that turns over every weekend needs
              a different plan, and we will scope it honestly rather than
              force it into the monthly baseline.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.local.href}>
                Turnovers on a booking calendar: STR Cleaning &amp; Local Support
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.manager.href}>
                Want the rental run for you? Full management
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            If another company already manages your cabin, we can still care
            for the property with your written authorization and a clear line
            between their responsibilities and ours. We identify what is
            genuinely incremental before quoting anything.
          </p>
        </div>
      </SectionWrapper>

      {/* 4. Know what happened while you were away */}
      <SectionWrapper background="cream" id="report">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Know what happened while you were away.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              After every care cycle you get a dated checklist: what was
              completed, what we noticed, photos where you have authorized
              them, anything unresolved, and anything that needs your approval
              before we spend your money.
            </p>
          </div>
          <div
            className="rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm"
            aria-label="Sample service report"
          >
            <p className="inline-block rounded-full border border-charcoal/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-charcoal/60">
              {HOME_CARE_SAMPLE_REPORT.label}
            </p>
            <dl className="mt-5 divide-y divide-cream">
              {HOME_CARE_SAMPLE_REPORT.fields.map((f) => (
                <div key={f.label} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-charcoal">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionWrapper>

      {/* 5. What $500 includes, and what it does not */}
      <SectionWrapper background="white" id="pricing">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What $500 includes, and what it does not
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            The base plan is a genuine package we sell, not a starting figure
            that grows once you call. What grows is only what you add.
          </p>
        </div>
        <HomeCarePackage showDetailLink={false} />
      </SectionWrapper>

      {/* 6. Simple onboarding */}
      <SectionWrapper background="cream" id="how-it-works">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Simple onboarding
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Property discussion, walkthrough, written scope, scheduled care.
              Arrival dates are coordinated, not guaranteed on demand.
            </p>
          </div>
          <ol className="mt-10 space-y-4">
            {HOME_CARE_STEPS.map((s) => (
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
          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="bg-sage px-8 text-base text-white hover:bg-sage-dark"
            >
              <PlanCTA
                plan="concierge"
                source="home_care_onboarding"
                href={CTA.concierge.href}
              >
                {CTA.concierge.label}
                <ArrowRight className="ml-2 size-4" />
              </PlanCTA>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* 7. FAQs */}
      <SectionWrapper background="white">
        <FAQSection
          title="Home Care Concierge, common questions"
          questions={HOME_CARE_FAQ}
        />
      </SectionWrapper>

      {/* 8. Final CTA */}
      <CTASection
        heading="Tell us about your property."
        subtext="We'll tell you what a practical care plan looks like. No listing, rental income, or occupancy figures required."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.concierge}
        secondaryCta={{ label: "Compare With Full Management", href: "/pricing" }}
      />
    </>
  );
}
