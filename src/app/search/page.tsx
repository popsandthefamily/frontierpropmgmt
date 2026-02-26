import type { Metadata } from "next";
import Script from "next/script";
import {
  DollarSign,
  ShieldCheck,
  Headphones,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { PropertyCard } from "@/components/cards/property-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { properties } from "@/data/properties";

const bookDirectBenefits = [
  {
    icon: DollarSign,
    title: "No Platform Fees",
    description: "Save money by booking directly with us instead of third-party platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Best Rate Guaranteed",
    description: "Our direct rates match or beat any listing site price.",
  },
  {
    icon: MessageSquare,
    title: "Direct Host Communication",
    description: "Message your host directly — faster responses, better service.",
  },
  {
    icon: Headphones,
    title: "Local Support",
    description: "Our team is based in Broken Bow and available when you need us.",
  },
];

export const metadata: Metadata = {
  title: "Search Properties",
  description:
    "Explore our collection of vacation rental cabins in Broken Bow and Hochatown, Oklahoma. Find your perfect getaway with private pools, hot tubs, and luxury amenities.",
};

export default function SearchPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage="/images/hero/hero-bg.jpg"
        title="Explore Available Properties"
        subtitle="Find your perfect Broken Bow getaway"
        size="medium"
        overlay="dark"
      />

      {/* Property Grid */}
      <SectionWrapper background="white">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Our Cabins
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Each of our properties is hand-selected and professionally managed
            to deliver an exceptional guest experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {properties.map((property, i) => (
            <AnimateInView key={property.slug} delay={i * 0.1}>
              <PropertyCard
                slug={property.slug}
                name={property.name}
                tagline={property.tagline}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                sleeps={property.sleeps}
                featuredImage={property.images[0].src}
              />
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* Why Book Direct? */}
      <SectionWrapper background="cream">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Why Book Direct?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Skip the booking platforms and get a better experience.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bookDirectBenefits.map((benefit, i) => (
            <AnimateInView key={benefit.title} delay={i * 0.08}>
              <Card className="h-full text-center">
                <CardContent className="flex flex-col items-center pt-6 pb-5">
                  <div className="mb-3 rounded-full bg-sage/10 p-3">
                    <benefit.icon className="size-6 text-sage" />
                  </div>
                  <h3 className="mb-1 font-semibold text-charcoal">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* Hospitable Search Widget */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            Search Availability
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Select your dates to see real-time availability and pricing across
            all of our properties.
          </p>
        </div>

        {/* Hospitable search widget container */}
        <div
          id="hospitable-search"
          className="mx-auto min-h-[300px] max-w-4xl rounded-lg border bg-white p-8 shadow-sm"
        >
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <p className="text-center text-sm">
              Search widget loading...
            </p>
          </div>
        </div>

        {/*
          TODO: Replace the script src below with the actual Hospitable search widget CDN URL.
          Example: https://app.hospitable.com/widgets/search/YOUR_WIDGET_ID.js
          The widget will mount into the #hospitable-search div above.
        */}
        <Script
          src="https://app.hospitable.com/widgets/search.js"
          strategy="lazyOnload"
        />
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Own a cabin? Let us manage it for you."
        subtext="Frontier Property Management handles everything from listings and pricing to guest communication and maintenance — so you earn more while doing less."
        cta={{ label: "Learn About Management", href: "/management-services" }}
      />
    </>
  );
}
