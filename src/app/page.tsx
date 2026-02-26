import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { ServiceCard } from "@/components/cards/service-card";
import { StepCard } from "@/components/cards/step-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { servicePillars } from "@/data/services";

export const metadata: Metadata = {
  description:
    "Full-service cabin management in Broken Bow and Hochatown, Oklahoma. We handle pricing, guests, cleanings, and maintenance so you can enjoy stress-free rental income.",
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <HeroSection
        backgroundImage="/images/hero/hero-bg.jpg"
        title="Full-Service Cabin Management in Hochatown"
        subtitle="Locally owned and operated — contract transitions welcome"
        overlay="gradient"
        size="full"
        cta={{ label: "Get a Free Estimate", href: "/income-calculator" }}
        secondaryCta={{ label: "Our Services", href: "/management-services" }}
      />

      {/* ── Income Calculator Teaser ────────────────────────────────── */}
      <SectionWrapper background="cream">
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

      {/* ── How It Works ────────────────────────────────────────────── */}
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

      {/* ── Services Overview ───────────────────────────────────────── */}
      <SectionWrapper background="cream">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What We Do
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Comprehensive vacation rental management built for Hochatown cabin
            owners.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {servicePillars.map((pillar, i) => (
            <AnimateInView key={pillar.title} delay={i * 0.1}>
              <ServiceCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                features={pillar.features}
              />
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* ── About / Team Teaser ─────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image */}
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

          {/* Text */}
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
              delivering five-star guest experiences. When you partner with
              Frontier, you get a hands-on team that treats your property like
              it is our own.
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

      {/* ── Stats Bar ───────────────────────────────────────────────── */}
      <StatsSection
        stats={[
          { value: "4.95", label: "Average Guest Rating" },
          { value: "+14%", label: "Shoulder-Season Nights" },
          { value: "+$28", label: "ADR After Optimization" },
          { value: "20%", label: "Simple Management Fee" },
        ]}
      />

      {/* ── Pricing Teaser ──────────────────────────────────────────── */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateInView>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Full-Service STR Management — 20% of Gross Bookings. No setup
              fees. No hidden charges.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
            >
              <Link href="/management-services">
                View Full Details
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <CTASection
        heading="Ready to Take Your Rental to the Next Level?"
        subtext="Let's talk about how we can simplify your property management and help you earn more from your Hochatown cabin."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{
          label: "Request Management Information",
          href: "/contact",
        }}
      />
    </>
  );
}
