import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { IncomeCalculatorForm } from "@/components/forms/income-calculator-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title:
    "STR Income Calculator — Estimate Your Broken Bow Cabin Revenue",
  description:
    "Free income calculator for Broken Bow & Hochatown cabin owners. Estimate monthly STR revenue based on bedrooms, amenities, and location.",
  alternates: {
    canonical: "https://rentwithfrontier.com/income-calculator",
  },
};

export default function IncomeCalculatorPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        backgroundImage="/images/hero/foggy-mountain.jpg"
        title="Estimate Your Monthly STR Revenue"
        subtitle="No guesswork — just real income insights"
        size="medium"
        overlay="dark"
      />

      {/* 2. Form Section */}
      <SectionWrapper background="white">
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
      </SectionWrapper>

      {/* 3. CTA */}
      <SectionWrapper background="cream" className="text-center">
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
      </SectionWrapper>
    </>
  );
}
