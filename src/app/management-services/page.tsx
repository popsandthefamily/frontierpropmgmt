import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { DiscoveryCTALink } from "@/components/analytics/discovery-cta";
import { StepCard } from "@/components/cards/step-card";
import { AddonCard } from "@/components/cards/addon-card";
import { ServiceCard } from "@/components/cards/service-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { FlagshipCaseStudySection } from "@/components/sections/flagship-case-study";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site";
import {
  onboardingSteps,
  addOns,
  detailedServices,
  managementFAQ,
} from "@/data/services";

export const metadata: Metadata = {
  title: "Cabin Management Services: Broken Bow & Hochatown STR",
  description:
    "Full-service Broken Bow & Hochatown cabin management. Dynamic pricing, Airbnb/VRBO, guest support, cleaning. 20% of nightly-rental revenue, no monthly minimum.",
  openGraph: {
    title: "Full-Service Cabin Management in Broken Bow & Hochatown",
    description:
      "20% of nightly-rental revenue, no monthly minimum. Dynamic pricing, guest communication, cleaning, maintenance — we handle everything.",
    images: [
      {
        url: "/images/services/DSC3079.jpg",
        width: 1200,
        height: 630,
        alt: "Frontier Property Management office and team in Broken Bow, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/management-services",
  },
};

/* ------------------------------------------------------------------ */
/*  Data constants                                                     */
/* ------------------------------------------------------------------ */

const whatWeDoItems = [
  "Pro listing build & optimization",
  "Dynamic pricing & orphan-gap rules",
  "Guest messaging 7am-10pm",
  "Cleaner scheduling + post-clean photo QC",
  "Vendor dispatch & oversight",
  "Permits & tax account setup",
  "Copywriting for properties",
  "KPI reporting",
];

/** What the 20% management fee covers */
const feeIncludes = [
  "Dynamic pricing and revenue management",
  "Guest communication (24/7 response)",
  "Listing optimization across Airbnb, VRBO, and Booking.com",
  "Cleaning and maintenance coordination",
  "Owner financial reporting and tax documentation",
  "Marketing and direct-booking infrastructure",
];

/** Pass-through costs: billed separately, at cost, no FPM markup */
const passThroughItems = [
  {
    label: "Cleaning turnovers",
    detail: "Charged to guests, zero owner impact.",
  },
  {
    label: "Maintenance and repairs",
    detail:
      "Itemized on your monthly statement. Anything over $300 requires your approval first.",
  },
  {
    label: "Utilities, internet, streaming",
    detail: "Stay on your existing accounts. We don't touch them.",
  },
  {
    label: "Consumables (coffee, toiletries, paper goods)",
    detail: "Billed quarterly at our vendor cost.",
  },
  {
    label: "Linens and replenishment",
    detail: "Billed as needed at our vendor cost.",
  },
  {
    label: "Platform host fees (Airbnb 3%, VRBO 5%)",
    detail: "Deducted by the platform before your payout reaches us.",
  },
];

/** Optional add-ons and out-of-scope items — clearly not bundled */
const notIncludedItems = [
  {
    label: "Professional photography (optional)",
    price: "$750",
    detail:
      "Full HDR photo shoot, edited deliverables, and reshoots when you upgrade the cabin. Optional — bring your own photos if you prefer.",
  },
  {
    label: "Pool and hot-tub service contracts",
    price: "Billed direct",
    detail:
      "We coordinate the vendor, they invoice you directly. No coordination markup.",
  },
  {
    label: "Permit renewals and tax registrations",
    price: "At agency cost",
    detail: "Filing fees are whatever the city or state charges.",
  },
  {
    label: "Owner-stay turnover cleans",
    price: "At cost",
    detail: "Clean after your own visit, billed at the cleaner's direct rate.",
  },
];

export default function ManagementServicesPage() {
  return (
    <>
      {/* JSON-LD, FAQPage */}
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: managementFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      {/* JSON-LD, Service */}
      <JsonLd
        type="Service"
        data={{
          name: "Full-Service Vacation Rental Management",
          description:
            "Complete short-term rental management for cabin owners in Broken Bow and Hochatown, Oklahoma. Dynamic pricing, guest communication, cleaning coordination, maintenance, and reporting, 20% of gross bookings.",
          provider: {
            "@type": "RealEstateAgent",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
          },
          areaServed: [
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "Hochatown, Oklahoma" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          serviceType: "Vacation Rental Property Management",
          offers: {
            "@type": "Offer",
            description:
              "20% of nightly-rental revenue, no monthly minimum, no setup fee.",
            priceCurrency: "USD",
          },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <HeroSection
        backgroundImage="/images/services/DSC3079.jpg"
        title="Boutique Hochatown STR Management"
        subtitle="We operate our own flagship cabin in the same market and take on a limited number of owner partners. Pricing, guests, cleanings, issues — handled."
        size="large"
        overlay="gradient"
        cta={{
          label: "Run my free listing audit",
          href: "/audit#full-audit",
        }}
      />

      <Breadcrumbs
        items={[{ label: "Management Services" }]}
      />

      {/* ── Flagship case study ─────────────────────────────────────── */}
      <FlagshipCaseStudySection background="white" />

      {/* ── What We Do ──────────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold text-charcoal md:text-4xl">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
            Everything you need to run a profitable short-term rental, handled
            by our local team.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatWeDoItems.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                <span className="text-lg text-charcoal">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* ── Onboarding Timeline ─────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Getting Started
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Six steps from first call to fully managed.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {onboardingSteps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ── Inline Contact Form ─────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Considering a New Property Manager?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No contracts. No pressure. We will review your setup and tell you
              if we are a fit.
            </p>
          </div>
          <ContactForm className="mt-10" />
        </div>
      </SectionWrapper>

      {/* ── Platform Trust Badges ─────────────────────────────────── */}
      <SectionWrapper background="white">
        <AnimateInView>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Where our flagship cabin ranks
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Frontier&apos;s management approach was built and tested on the
              cabin we operate ourselves. These are the badges and ratings that
              cabin holds across the major booking platforms.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 items-center justify-center">
                  <Image
                    src="/images/platforms/airbnb.png"
                    alt="Airbnb"
                    width={174}
                    height={192}
                    className="h-12 w-auto"
                  />
                </div>
                <p className="mt-1 text-sm font-semibold text-[#FF5A5F]">Top Rated Host</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  &ldquo;Most Loved&rdquo; designation
                </p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 items-center justify-center">
                  <Image
                    src="/images/platforms/vrbo.png"
                    alt="VRBO"
                    width={2000}
                    height={1140}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="mt-1 text-sm font-semibold text-[#0E4DA4]">5-Star Rated</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Premier host status
                </p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 items-center justify-center">
                  <Image
                    src="/images/platforms/booking.svg"
                    alt="Booking.com"
                    width={200}
                    height={40}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="mt-1 text-sm font-semibold text-[#003580]">Top Rated</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Exceptional guest scores
                </p>
              </div>
            </div>
          </div>
        </AnimateInView>
      </SectionWrapper>

      {/* ── Results Stats ───────────────────────────────────────────── */}
      <StatsSection
        stats={[
          { value: "Boutique", label: "We take a limited number of owner partners" },
          { value: "Local", label: "Based in Broken Bow, not a regional franchise" },
          { value: "Flagship", label: "We operate our own cabin in this market" },
          { value: "< 15min", label: "Average Response Time" },
        ]}
      />

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold text-charcoal md:text-4xl">
            Our Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground md:text-lg">
            One fee. No monthly minimum. If your cabin makes $0 in a month,
            you owe us $0.
          </p>

          <AnimateInView>
            <Card className="mt-10 border-2 border-sage">
              <CardHeader className="text-center">
                <p className="text-base font-medium uppercase tracking-wider text-sage">
                  Full-Service STR Management
                </p>
                <CardTitle className="mt-2 text-4xl font-bold text-charcoal md:text-5xl">
                  20%{" "}
                  <span className="text-lg font-normal text-muted-foreground md:text-xl">
                    of nightly-rental revenue
                  </span>
                </CardTitle>
                <p className="mt-2 text-base text-muted-foreground">
                  Calculated on nightly rate (plus any extra-guest or
                  premium-stay fees). Cleaning and pet fees pass through
                  directly to cleaners and are not part of the 20%.
                </p>
              </CardHeader>

              <CardContent>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sage">
                  What the 20% covers
                </p>
                <ul className="space-y-3">
                  {feeIncludes.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-base text-charcoal md:text-lg"
                    >
                      <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-lg border border-sage/20 bg-sage/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                    $0 setup. $0 monthly minimum.
                  </p>
                  <p className="mt-2 text-sm text-charcoal">
                    No onboarding fee, no platform setup charge, no lock-in.
                    If your cabin earns $0 in a month, you owe us $0.
                    Professional photography is an optional add-on (see below),
                    not a required setup cost.
                  </p>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 w-full bg-sage text-white hover:bg-sage-dark text-base"
                >
                  <DiscoveryCTALink
                    source="management_services_pricing"
                    href="/contact#discovery"
                  >
                    Schedule a Discovery Call
                  </DiscoveryCTALink>
                </Button>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── Billed separately (pass-through, at cost) ───────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Billed separately, at cost
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Running a cabin has real costs. Frontier doesn&apos;t mark any of
              them up. Every pass-through item shows on your monthly owner
              statement with the receipt.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {passThroughItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-sage/20 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-sage" />
                  <div>
                    <div className="text-base font-semibold text-charcoal">
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── What's NOT Included ──────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              What&apos;s not included
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              One-time, out-of-scope, or paid directly to a specialist.
              These are always stated up front, never surprises on a statement.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {notIncludedItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <X className="mt-1 size-5 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-base font-semibold text-charcoal">
                        {item.label}
                      </span>
                      <span className="text-sm font-semibold text-sage">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Self-Manage vs. Frontier Comparison ─────────────────────── */}
      <SectionWrapper background="white">
        <AnimateInView>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-charcoal md:text-4xl">
              Self-Manage vs. Hire Frontier
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
              Most owners who self-manage underestimate the time, revenue leakage,
              and stress. Here&apos;s a honest comparison.
            </p>

            <div className="mt-10 overflow-hidden rounded-lg border">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cream">
                    <th className="px-4 py-3 text-sm font-semibold text-charcoal sm:px-6" />
                    <th className="px-4 py-3 text-center text-sm font-semibold text-muted-foreground sm:px-6">
                      Self-Manage
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-sage sm:px-6">
                      Frontier
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { category: "Time investment", self: "15-25 hrs/mo", frontier: "0 hrs/mo" },
                    { category: "Dynamic pricing", self: "Manual guesswork", frontier: "Daily algorithm adjustments" },
                    { category: "Guest communication", self: "You, 24/7", frontier: "Our team, 7am-10pm" },
                    { category: "Cleaning coordination", self: "You manage vendors", frontier: "Photo-verified QC turnover" },
                    { category: "Listing optimization", self: "DIY copy & photos", frontier: "Pro copy, SEO, photography" },
                    { category: "Maintenance issues", self: "Midnight calls to you", frontier: "We dispatch & oversee" },
                    { category: "Revenue optimization", self: "Leave money on table", frontier: "Daily pricing adjusted to local demand" },
                    { category: "Tax & permit compliance", self: "Research it yourself", frontier: "We set it up for you" },
                    { category: "Net revenue after fee", self: "Often less (gaps & underpricing)", frontier: "More, even after 20%" },
                  ].map((row) => (
                    <tr key={row.category} className="hover:bg-cream/50">
                      <td className="px-4 py-3 text-sm font-medium text-charcoal sm:px-6">
                        {row.category}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-muted-foreground sm:px-6">
                        {row.self}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-sage sm:px-6">
                        {row.frontier}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Run the <Link href="/audit#full-audit" className="font-semibold text-sage underline hover:text-sage-dark">free listing audit</Link>
              {" "}to see whether daily pricing, listing optimization, and gap-filling can recapture revenue
              your current setup is leaving on the table — before you compare it against the 20% fee.
            </p>
          </div>
        </AnimateInView>
      </SectionWrapper>

      {/* ── Add-Ons ─────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Available Add-Ons
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Optional services to accelerate your launch or boost performance.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {addOns.map((addon) => (
            <AddonCard
              key={addon.name}
              name={addon.name}
              description={addon.description}
              features={addon.features}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ── Contract Transition, Detailed Timeline ─────────────────── */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Switching Property Managers?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              We handle the entire transition. Zero booking downtime. Your
              reviews stay intact. Here&apos;s exactly what happens:
            </p>
          </AnimateInView>
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-0">
          {[
            {
              days: "Days 1–2",
              title: "Kickoff & Audit",
              description:
                "We review your current listings, calendar, pricing, and vendor setup. You sign our simple agreement, no long-term lock-in.",
            },
            {
              days: "Days 3–5",
              title: "Listing Transfer",
              description:
                "We coordinate with your current PM to transfer listing ownership on Airbnb, VRBO, and Booking.com. All existing reviews and ratings transfer with the listing.",
            },
            {
              days: "Days 5–7",
              title: "Optimization & Vendor Onboarding",
              description:
                "We rewrite your listing copy, update photos if needed, configure dynamic pricing, and onboard our local cleaning and maintenance teams for your property.",
            },
            {
              days: "Days 7–10",
              title: "Calendar Sync & Go Live",
              description:
                "We sync all platform calendars, set up your owner portal, test the full guest communication workflow, and go live. Bookings start flowing.",
            },
            {
              days: "Days 10–14",
              title: "Fine-Tuning",
              description:
                "We monitor performance, adjust pricing for the season, and handle any first-booking details. You get your first weekly update.",
            },
          ].map((step) => (
            <div key={step.days} className="flex gap-4 border-l-2 border-white/30 py-4 pl-6">
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <Clock className="size-3" />
                  {step.days}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-white/70">
            30-day cancellation policy, if you&apos;re not happy, you can leave.
            No penalties.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
          >
            <Link href="/contact">Talk to Us About Switching</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* ── Detailed Services ───────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Our Services in Detail
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            A closer look at everything included in your management plan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {detailedServices.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              className="h-full"
            />
          ))}
        </div>
      </SectionWrapper>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <FAQSection
          title="Frequently Asked Questions"
          questions={managementFAQ}
        />
      </SectionWrapper>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <CTASection
        heading="See the revenue gap on your listing"
        subtext="Free, takes about 90 seconds, built for Broken Bow and Hochatown cabin owners. Then decide if Frontier is a fit."
        cta={{
          label: "Run my free listing audit",
          href: "/audit#full-audit",
        }}
        secondaryCta={{
          label: "Schedule a Discovery Call",
          href: "/contact#discovery",
        }}
      />
    </>
  );
}
