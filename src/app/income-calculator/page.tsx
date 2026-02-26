import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { IncomeCalculatorForm } from "@/components/forms/income-calculator-form";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Income Calculator",
  description:
    "Estimate your monthly short-term rental revenue with our free income calculator. Get real insights for your Broken Bow or Hochatown cabin.",
};

export default function IncomeCalculatorPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        backgroundImage="/images/hero/hero-bg.jpg"
        title="Estimate Your Monthly STR Revenue"
        subtitle="No guesswork — just real income insights"
        size="medium"
        overlay="dark"
      />

      {/* 2. Form Section */}
      <SectionWrapper background="white">
        <AnimateInView>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-2 text-center text-2xl font-bold text-charcoal md:text-3xl">
              Free Income &amp; Occupancy Estimate
            </h2>
            <p className="mb-8 text-center text-muted-foreground">
              Answer a few quick questions to see how much your property could
              earn each month.
            </p>
            <IncomeCalculatorForm />
          </div>
        </AnimateInView>
      </SectionWrapper>

      {/* 3. CTA */}
      <SectionWrapper background="cream" className="text-center">
        <AnimateInView>
          <h2 className="mb-4 text-2xl font-bold text-charcoal md:text-3xl">
            Want to learn more about our management services?
          </h2>
          <Button
            asChild
            size="lg"
            className="bg-sage text-white hover:bg-sage-dark px-8 text-base font-semibold"
          >
            <Link href="/management-services">View Management Services</Link>
          </Button>
        </AnimateInView>
      </SectionWrapper>
    </>
  );
}
