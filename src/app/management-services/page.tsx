import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Clock, ArrowRight } from "lucide-react";
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
import { StepCard } from "@/components/cards/step-card";
import { AddonCard } from "@/components/cards/addon-card";
import { ServiceCard } from "@/components/cards/service-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
import {
  onboardingSteps,
  addOns,
  detailedServices,
  managementFAQ,
} from "@/data/services";

export const metadata: Metadata = {
  title:
    "Cabin Management Services — Full-Service STR Management in Broken Bow & Hochatown",
  description:
    "Hire the top-rated Broken Bow cabin management company. Dynamic pricing, Airbnb/VRBO listing optimization, 24/7 guest communication, professional cleaning, maintenance & transparent reporting — 20% of gross bookings, no setup fees. Contract transitions welcome.",
  openGraph: {
    title: "Full-Service Cabin Management in Broken Bow & Hochatown",
    description:
      "20% of gross bookings, no setup fees. Dynamic pricing, guest communication, cleaning, maintenance — we handle everything.",
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

const pricingFeatures = [
  "High-converting Airbnb/VRBO + direct listing setup",
  "Dynamic pricing tuned to Hochatown demand",
  "Full guest communication and issue resolution",
  "Cleaner coordination with property-specific turnover checklists",
  "Maintenance coordination and issue tracking",
  "Owner portal + clear monthly statements",
];

const notIncludedItems = [
  "Cleaning fees (charged to guests)",
  "Maintenance and repair costs",
  "Utilities, supplies, linens, and consumables",
  "Platform service fees (Airbnb, VRBO, etc.)",
];

export default function ManagementServicesPage() {
  return (
    <>
      {/* JSON-LD — Service */}
      <JsonLd
        type="Service"
        data={{
          name: "Full-Service Vacation Rental Management",
          description:
            "Complete short-term rental management for cabin owners in Broken Bow and Hochatown, Oklahoma. Dynamic pricing, guest communication, cleaning coordination, maintenance, and reporting — 20% of gross bookings.",
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
            description: "20% of gross bookings, no setup fees",
            priceCurrency: "USD",
          },
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <HeroSection
        backgroundImage="/images/services/DSC3079.jpg"
        title="Hochatown Short-Term Rental Management"
        subtitle="We take over pricing, guests, cleanings, and issues — so you stop babysitting your cabin."
        size="large"
        overlay="gradient"
        cta={{
          label: "Request Management Information",
          href: "/contact",
        }}
      />

      {/* ── What We Do ──────────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <AnimateInView>
            <h2 className="text-center text-3xl font-bold text-charcoal md:text-4xl">
              What We Do
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted-foreground">
              Everything you need to run a profitable short-term rental — handled
              by our local team.
            </p>
          </AnimateInView>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {whatWeDoItems.map((item, i) => (
              <AnimateInView key={item} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                  <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                  <span className="text-lg text-charcoal">{item}</span>
                </li>
              </AnimateInView>
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
          {onboardingSteps.map((step, i) => (
            <AnimateInView key={step.number} delay={i * 0.08}>
              <StepCard
                number={step.number}
                title={step.title}
                description={step.description}
              />
            </AnimateInView>
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
              Top-Rated Across Every Platform
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              We don&apos;t just manage cabins — we earn 5-star reviews on every
              booking platform.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-[#FF5A5F]/10">
                  <svg viewBox="0 0 24 24" className="size-6" fill="#FF5A5F">
                    <path d="M12 0C5.4 0 0 5.4 0 12c0 3.1 1.2 6 3.2 8.2.3.3.7.3 1 0l.3-.4c.2-.3.2-.7-.1-1C2.5 17 1.5 14.6 1.5 12 1.5 6.2 6.2 1.5 12 1.5S22.5 6.2 22.5 12c0 2.6-1 5-2.9 6.8-.3.3-.3.7-.1 1l.3.4c.3.3.7.3 1 0C22.8 18 24 15.1 24 12c0-6.6-5.4-12-12-12zm0 7c-2.8 0-5 2.2-5 5 0 1.7.8 3.1 2.1 4.1.2.1.4.1.5-.1l.2-.3c.1-.2.1-.4-.1-.6C8.7 14.3 8 13.2 8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.2-.7 2.3-1.7 3.1-.2.2-.2.4-.1.6l.2.3c.1.2.3.2.5.1C16.2 15.1 17 13.7 17 12c0-2.8-2.2-5-5-5zm0 3.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5 1.5-.7 1.5-1.5-.7-1.5-1.5-1.5z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-charcoal">Airbnb</p>
                <p className="mt-1 text-sm font-semibold text-[#FF5A5F]">Top Rated Host</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  &ldquo;Most Loved&rdquo; designation
                </p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-[#0E4DA4]/10">
                  <svg viewBox="0 0 24 24" className="size-6" fill="#0E4DA4">
                    <path d="M3 12l9-8 9 8v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z" />
                    <path d="M9 22V12h6v10" fill="white" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-charcoal">VRBO</p>
                <p className="mt-1 text-sm font-semibold text-[#0E4DA4]">5-Star Rated</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Premier host status
                </p>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-[#003580]/10">
                  <svg viewBox="0 0 24 24" className="size-6" fill="none">
                    <text x="4" y="18" fontFamily="Arial,sans-serif" fontWeight="bold" fontSize="18" fill="#003580">B.</text>
                  </svg>
                </div>
                <p className="text-2xl font-bold text-charcoal">Booking.com</p>
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
          { value: "+14%", label: "Shoulder-Season Nights in 60 Days" },
          { value: "+$28", label: "ADR After Photo/Pricing Update" },
          { value: "4.95★", label: "Avg Rating Across Platforms" },
          { value: "< 15min", label: "Average Response Time" },
        ]}
      />

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold text-charcoal md:text-4xl">
            Our Pricing
          </h2>

          <AnimateInView>
            <Card className="mt-10 border-2 border-sage">
              <CardHeader className="text-center">
                <p className="text-base font-medium uppercase tracking-wider text-sage">
                  Full-Service STR Management Plan
                </p>
                <CardTitle className="mt-2 text-4xl font-bold text-charcoal md:text-5xl">
                  20%{" "}
                  <span className="text-lg font-normal text-muted-foreground md:text-xl">
                    of Gross Bookings
                  </span>
                </CardTitle>
                <p className="mt-2 text-base text-muted-foreground">
                  Pro marketing, pricing, and guest comms
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {pricingFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-lg text-charcoal"
                    >
                      <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className="mt-8 w-full bg-sage text-white hover:bg-sage-dark text-base"
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── What's NOT Included ──────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What&apos;s Not Included
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            There are no setup fees and no hidden charges.
          </p>
        </div>

        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {notIncludedItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-lg text-charcoal"
            >
              <X className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
                    { category: "Revenue optimization", self: "Leave money on table", frontier: "+14% occupancy typical" },
                    { category: "Tax & permit compliance", self: "Research it yourself", frontier: "We set it up for you" },
                    { category: "Net revenue after fee", self: "Often less (gaps & underpricing)", frontier: "More — even after 20%" },
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
              Most owners net <span className="font-semibold text-charcoal">more income with Frontier</span> —
              even after the 20% fee — because professional pricing, listing optimization,
              and gap-filling recapture revenue that self-managers leave on the table.
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
          {addOns.map((addon, i) => (
            <AnimateInView key={addon.name} delay={i * 0.1}>
              <AddonCard
                name={addon.name}
                description={addon.description}
                features={addon.features}
              />
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Contract Transition — Detailed Timeline ─────────────────── */}
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
                "We review your current listings, calendar, pricing, and vendor setup. You sign our simple agreement — no long-term lock-in.",
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
          ].map((step, i) => (
            <AnimateInView key={step.days} delay={i * 0.08}>
              <div className="flex gap-4 border-l-2 border-white/30 py-4 pl-6">
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
            </AnimateInView>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl text-center">
          <AnimateInView>
            <p className="text-sm text-white/70">
              30-day cancellation policy — if you&apos;re not happy, you can leave.
              No penalties.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
            >
              <Link href="/contact">Talk to Us About Switching</Link>
            </Button>
          </AnimateInView>
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
          {detailedServices.map((service, i) => (
            <AnimateInView key={service.title} delay={i * 0.08}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                className="h-full"
              />
            </AnimateInView>
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
        heading="Ready to Simplify Your Rental Management?"
        subtext="Let us handle the day-to-day so you can focus on what matters. Reach out today for a free, no-obligation consultation."
        cta={{
          label: "Request Management Information",
          href: "/contact",
        }}
      />
    </>
  );
}
