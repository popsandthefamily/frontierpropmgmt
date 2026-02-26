import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
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
import {
  onboardingSteps,
  addOns,
  detailedServices,
  managementFAQ,
} from "@/data/services";

export const metadata: Metadata = {
  title: "Management Services",
  description:
    "Full-service short-term rental management in Hochatown and Broken Bow, Oklahoma. Dynamic pricing, guest communication, cleaning coordination, maintenance, and transparent reporting — all for 20% of gross bookings.",
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

      {/* ── Results Stats ───────────────────────────────────────────── */}
      <StatsSection
        stats={[
          { value: "+14%", label: "Shoulder-Season Nights in 60 Days" },
          { value: "+$28", label: "ADR After Photo/Pricing Update" },
          { value: "4.95", label: "Average Guest Rating" },
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
                <p className="text-sm font-medium uppercase tracking-wider text-sage">
                  Full-Service STR Management Plan
                </p>
                <CardTitle className="mt-2 text-4xl font-bold text-charcoal md:text-5xl">
                  20%{" "}
                  <span className="text-lg font-normal text-muted-foreground md:text-xl">
                    of Gross Bookings
                  </span>
                </CardTitle>
                <p className="mt-2 text-muted-foreground">
                  Pro marketing, pricing, and guest comms
                </p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {pricingFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-base text-charcoal"
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
              className="flex items-start gap-3 text-base text-charcoal"
            >
              <X className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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

      {/* ── Contract Transition ──────────────────────────────────────── */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Contracts Ending?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Switching property managers does not have to be stressful. We
              handle the entire transition — transferring listings, preserving
              your reviews, onboarding vendors, and coordinating the handoff
              timeline with your current company. Most transitions are complete
              in under two weeks.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
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
