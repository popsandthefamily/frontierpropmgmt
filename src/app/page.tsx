import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  ShieldCheck,
  DollarSign,
  Headphones,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { StepCard } from "@/components/cards/step-card";
import { PropertyCard } from "@/components/cards/property-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title:
    "Broken Bow Cabin Rentals & Property Management | Frontier Property Management",
  description:
    "Book a cabin in Broken Bow & Hochatown or let us manage your vacation rental. Direct booking — no platform fees. Full-service STR management at 20% of gross.",
};

const bookDirectBenefits = [
  {
    icon: DollarSign,
    title: "No Platform Fees",
    description:
      "Book directly and skip the service fees charged by major booking platforms.",
  },
  {
    icon: ShieldCheck,
    title: "Best Rate Guaranteed",
    description:
      "Our direct rates are always the same or lower than any listing site.",
  },
  {
    icon: Headphones,
    title: "Local Host Support",
    description:
      "Reach a real person in Broken Bow — not an overseas call center.",
  },
  {
    icon: Star,
    title: "Professionally Managed",
    description:
      "Every stay is backed by our full-service property management team.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. Dual-Audience Hero ──────────────────────────────────── */}
      <HeroSection
        backgroundImage="/images/properties/sublime/sublime-2.jpg"
        title="Broken Bow Cabin Rentals & Property Management"
        subtitle="Book your Hochatown getaway — or let us manage your cabin"
        overlay="gradient"
        size="full"
        cta={{ label: "Browse Cabins", href: "/search" }}
        secondaryCta={{
          label: "Cabin Owners: Learn More",
          href: "/management-services",
        }}
      />

      {/* ── Hospitable Search Bar ────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <Script
            src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
            strategy="lazyOnload"
          />
          {/* @ts-expect-error — custom web component from Hospitable */}
          <hospitable-direct-mps
            identifier="1a10c870-8304-4205-a5d4-995f468ccc08"
            type="custom"
            results-url="/search"
          />
        </div>
      </SectionWrapper>

      {/* ── 2. Featured Cabins ─────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Book Your Broken Bow Getaway
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Professionally managed cabins with direct booking — skip the
              platform fees.
            </p>
          </AnimateInView>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
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
                startingPrice={property.startingPrice}
              />
            </AnimateInView>
          ))}
        </div>

        <div className="mt-10 text-center">
          <AnimateInView>
            <Button
              asChild
              size="lg"
              className="bg-sage text-white hover:bg-sage-dark px-8 text-base"
            >
              <Link href="/search">
                View All Properties
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 3. Why Book Direct? ────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Why Book Direct?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Better rates, better service, better experience.
            </p>
          </AnimateInView>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bookDirectBenefits.map((benefit, i) => (
            <AnimateInView key={benefit.title} delay={i * 0.1}>
              <Card className="h-full text-center">
                <CardContent className="flex flex-col items-center pt-8 pb-6">
                  <div className="mb-4 rounded-full bg-sage/10 p-4">
                    <benefit.icon className="size-7 text-sage" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-charcoal">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* ── 4. Stats Bar ───────────────────────────────────────────── */}
      <StatsSection
        stats={[
          { value: "4.95", label: "Average Guest Rating" },
          { value: "5★", label: "Reviews Across Platforms" },
          { value: "0%", label: "Platform Fees When You Book Direct" },
          { value: "20%", label: "Simple Management Fee" },
        ]}
      />

      {/* ── 5. Owner Section Divider ───────────────────────────────── */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Own a Cabin in Broken Bow?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Full-service STR management — 20% of gross bookings, no setup
              fees. We handle pricing, guests, cleanings, and maintenance so you
              can enjoy stress-free rental income.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
            >
              <Link href="/management-services">
                Management Services
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 6. How It Works (Owners) ───────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How It All Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Just three simple steps to start earning more with less stress.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <AnimateInView delay={0}>
            <StepCard
              number={1}
              title="Discovery Call"
              description="Schedule a free 30-minute call so we can learn about your property, your goals, and what you need from a management partner."
            />
          </AnimateInView>
          <AnimateInView delay={0.15}>
            <StepCard
              number={2}
              title="Custom Plan"
              description="We build a personalized management plan tailored to your cabin — covering pricing strategy, listing optimization, and operations."
            />
          </AnimateInView>
          <AnimateInView delay={0.3}>
            <StepCard
              number={3}
              title="We Handle It All"
              description="From professional photography to guest check-out, we manage every detail end-to-end so you can sit back and collect revenue."
            />
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 7. Team Teaser ─────────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AnimateInView direction="left">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl">
              <Image
                src="/images/team/hunter-collins.jpg"
                alt="Hunter Collins — Owner of Frontier Property Management"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateInView>

          <AnimateInView direction="right">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Your Frontier Property Management Team
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Frontier Property Management is a family-owned, locally operated
              company based right here in Broken Bow, Oklahoma. We are not a
              franchise or a remote call center — we live and work in the
              community we serve.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our team combines deep local knowledge with modern technology and
              data-driven strategies to help cabin owners maximize revenue while
              delivering five-star guest experiences.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-sage text-white hover:bg-sage-dark px-8 text-base"
            >
              <Link href="/about">
                Meet the Team
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 8. Income Calculator Teaser ────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Estimate Your Monthly STR Revenue
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Curious what your cabin could earn under professional management?
              Use our free income calculator to see projected monthly revenue
              based on your property details, location, and amenities.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-sage text-white hover:bg-sage-dark px-8 text-base"
            >
              <Link href="/income-calculator">
                Try the Income Calculator
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── 9. Final Dual CTA ──────────────────────────────────────── */}
      <CTASection
        heading="Ready to Get Started?"
        subtext="Whether you're looking for a Broken Bow cabin getaway or you want expert management for your rental property — we're here to help."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Browse Cabins", href: "/search" }}
        secondaryCta={{
          label: "Management Info",
          href: "/management-services",
        }}
      />
    </>
  );
}
