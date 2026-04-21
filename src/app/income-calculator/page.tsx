import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { HeroSnapshot } from "@/components/audit/hero-snapshot";
import { Tier2Form } from "@/components/audit/tier2-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "STR Income Calculator: Estimate Your Broken Bow Cabin Revenue",
  description:
    "Free revenue estimate for Broken Bow & Hochatown cabin owners. Live market data from 20M+ listings, plus a full audit when you paste your listing URL.",
  openGraph: {
    title: "Free Broken Bow STR Income Calculator",
    description:
      "Live AirROI market data on 20M+ listings. Estimate your cabin's revenue in under 60 seconds.",
    images: [
      {
        url: "/images/hero/foggy-mountain.jpg",
        width: 1200,
        height: 630,
        alt: "Broken Bow cabin revenue calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/income-calculator",
  },
};

export default function IncomeCalculatorPage() {
  return (
    <>
      <HeroSection
        backgroundImage="/images/hero/foggy-mountain.jpg"
        title="Estimate your cabin's revenue"
        subtitle="Live market data, not a pricing guess"
        size="medium"
        overlay="dark"
      />

      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Free income &amp; occupancy estimate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The numbers below come from live AirROI data on 20M+ short-term
              rental listings. Want specifics for your listing? Paste the URL
              and we&apos;ll run the full audit.
            </p>
          </div>
          <div className="space-y-8">
            <HeroSnapshot auditHref="#full-audit" />
            <Tier2Form />
          </div>
        </div>
      </SectionWrapper>

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
