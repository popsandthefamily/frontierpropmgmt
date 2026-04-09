import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Check, MapPin, Clock, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { StepCard } from "@/components/cards/step-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Dallas Cabin Owners — Broken Bow Property Management from DFW",
  description:
    "Own a cabin in Broken Bow? Frontier gives Dallas & DFW owners local, hands-on STR management — 20% fee, no contracts, 15-30% revenue increases.",
  keywords: [
    "Dallas cabin owner property management",
    "DFW Broken Bow cabin management",
    "remote cabin management Dallas",
    "Dallas vacation rental management",
    "Broken Bow cabin investment Dallas",
    "Hochatown cabin manager for Dallas owners",
    "Dallas STR management Oklahoma",
  ],
  openGraph: {
    title: "Dallas & DFW Cabin Owners — Broken Bow Property Management",
    description:
      "Local Broken Bow management for out-of-town owners. Frontier handles everything so you can invest from Dallas with confidence.",
    images: [
      {
        url: "/images/hero/forest-aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial view of Broken Bow forest cabins — managed by Frontier Property Management",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/dallas-cabin-owners",
  },
};

const dallasFAQ = [
  {
    question: "How do you manage my cabin if I live in Dallas?",
    answer:
      "We handle everything on-site — guest check-ins, turnovers, maintenance, inspections, and emergencies. You get real-time updates and monthly reports through our owner portal. Most of our owners are remote and never need to visit for operational reasons.",
  },
  {
    question: "How often will I need to visit my cabin?",
    answer:
      "You do not need to visit at all for management purposes. We handle all day-to-day operations, vendor coordination, and property inspections. Many owners visit a few times a year for personal stays, but it is entirely up to you.",
  },
  {
    question: "What is your management fee?",
    answer:
      "We charge 20% of gross booking revenue. This covers all core services including listing management, guest communication, cleaning coordination, maintenance oversight, and owner reporting. There are no hidden fees or setup costs.",
  },
  {
    question: "Can I switch from my current management company?",
    answer:
      "Absolutely. We handle the full transition — transferring existing listings and reviews, setting up new systems, and coordinating the handoff timeline with your current company. Most transitions are completed within 2 weeks.",
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No. Our management agreements can be cancelled with 30 days written notice. No early termination fees, no penalties. We earn your business every month.",
  },
  {
    question: "How do I know my cabin is being taken care of?",
    answer:
      "You receive monthly owner statements, have 24/7 access to our owner portal, and get real-time notifications for maintenance issues. We also conduct regular property inspections and send photo reports after every turnover cleaning.",
  },
  {
    question: "What kind of revenue can I expect?",
    answer:
      "Results vary by property, but our owners typically see a 15-30% increase in revenue within the first 6 months through optimized pricing, professional listings, and higher occupancy rates. We are happy to run a free revenue estimate for your specific property.",
  },
  {
    question: "Do you help with purchasing a cabin investment?",
    answer:
      "While we are not real estate agents, we are happy to share market insights, connect you with trusted local realtors, and provide projected revenue estimates for properties you are considering. Many Dallas investors consult us before buying.",
  },
];

const painPoints = [
  {
    icon: MapPin,
    title: "3+ Hours Away",
    description:
      "Your cabin is a 3-hour drive from Dallas. When a pipe bursts at 2 AM or a guest locks themselves out, you need someone local who can respond in minutes — not hours.",
  },
  {
    icon: Clock,
    title: "Time You Do Not Have",
    description:
      "Managing guest messages, coordinating cleaners, adjusting pricing, handling reviews — it is a part-time job. Let us handle operations while you focus on your career and family in DFW.",
  },
  {
    icon: TrendingUp,
    title: "Leaving Revenue on the Table",
    description:
      "Without daily dynamic pricing, multi-platform distribution, and professional photography, most self-managed cabins earn 15-30% less than their potential.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Regulations",
    description:
      "STR permits, Granicus registration, occupancy taxes, noise monitoring — McCurtain County regulations are changing fast. We stay on top of it so you do not get fined.",
  },
];

export default function DallasCabinOwnersPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        type="Service"
        data={{
          name: "Remote Cabin Management for Dallas & DFW Owners",
          description:
            "Full-service short-term rental management for Dallas and DFW cabin owners with properties in Broken Bow and Hochatown, Oklahoma.",
          provider: {
            "@type": "RealEstateAgent",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "3156 Old Broken Bow Hwy",
              addressLocality: "Broken Bow",
              addressRegion: "OK",
              postalCode: "74728",
              addressCountry: "US",
            },
          },
          areaServed: [
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "Hochatown, Oklahoma" },
          ],
          serviceType: "Vacation Rental Property Management",
          audience: {
            "@type": "Audience",
            geographicArea: {
              "@type": "Place",
              name: "Dallas-Fort Worth, Texas",
            },
          },
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: dallasFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      {/* Hero */}
      <HeroSection
        backgroundImage="/images/hero/forest-aerial.jpg"
        title="Dallas Cabin Owner? We Have Got You Covered."
        subtitle="Local Broken Bow management for out-of-town owners. Your cabin earns more while you stay in DFW."
        size="large"
        overlay="gradient"
        cta={{
          label: "Get a Free Revenue Estimate",
          href: "/contact",
        }}
        secondaryCta={{
          label: "Try the Income Calculator",
          href: "/income-calculator",
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Management Services", href: "/management-services" },
          { label: "Dallas Cabin Owners" },
        ]}
      />

      {/* The Problem */}
      <SectionWrapper background="cream">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Managing a Cabin from Dallas Is Hard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            You bought your Broken Bow cabin as an investment — not a second
            job. Here is why most DFW owners eventually hire a local manager.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {painPoints.map((point) => (
            <Card key={point.title} className="h-full">
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="shrink-0 rounded-full bg-sage/10 p-3">
                  <point.icon className="size-6 text-sage" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-charcoal">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-base text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Why Dallas Owners Choose Frontier */}
      <SectionWrapper background="white">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Why Dallas Owners Choose Frontier
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Over half of our managed cabins are owned by investors in the
              Dallas-Fort Worth area. We built our entire operation around
              making remote ownership simple and profitable.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Boots-on-the-ground team based in Broken Bow",
                "Real-time owner portal — check performance anytime from Dallas",
                "Monthly owner statements with full financial transparency",
                "24/7 emergency response for guest and property issues",
                "Dynamic pricing that adapts daily to Broken Bow market demand",
                "No long-term contracts — cancel with 30 days notice",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-charcoal">
                  <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-sage text-white hover:bg-sage-dark px-8 text-base"
            >
              <Link href="/management-services">
                View All Services
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <AnimateInView direction="right">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl">
              <Image
                src="/images/services/computer.jpg"
                alt="Owner portal showing cabin performance data"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper background="sage">
        <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "3 hrs", label: "Dallas to Broken Bow — we are already here" },
            { value: "4.95★", label: "Avg rating across all platforms" },
            { value: "15-30%", label: "Typical revenue increase for new owners" },
            { value: "20%", label: "Simple management fee — no setup costs" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Getting Started from Dallas
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Three steps and you are done. We handle the rest from Broken Bow.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Free Discovery Call"
            description="Schedule a 30-minute call from Dallas. We will learn about your cabin, your goals, and give you an honest revenue estimate."
          />
          <StepCard
            number={2}
            title="We Handle the Setup"
            description="Professional photography, listing creation, pricing strategy, vendor onboarding, and compliance — all done without you leaving DFW."
          />
          <StepCard
            number={3}
            title="You Earn, We Manage"
            description="Bookings roll in, guests are taken care of, and you get monthly deposits and reports. It is that simple."
          />
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateInView>
            <div className="mb-4 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-6 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <blockquote className="text-xl font-medium leading-relaxed text-charcoal md:text-2xl">
              &ldquo;We live in Dallas and were nervous about managing a cabin
              three hours away. Frontier took over and within two months our
              revenue was up 25%. The monthly reports are clear, the
              communication is great, and we do not worry about a thing.&rdquo;
            </blockquote>
            <p className="mt-4 text-muted-foreground">
              — DFW Cabin Owner, Broken Bow
            </p>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* Income Calculator CTA */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What Could Your Cabin Earn?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Use our free income calculator to see projected monthly revenue
            based on your cabin&apos;s bedrooms, amenities, and location. No
            commitment required.
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
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="cream">
        <FAQSection
          title="Questions from Dallas Cabin Owners"
          questions={dallasFAQ}
        />
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Ready to stop managing from Dallas?"
        subtext="Get a free revenue estimate for your Broken Bow cabin. No contracts, no pressure — just an honest conversation about what your property could earn under professional management."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Schedule a Free Call", href: "/contact" }}
        secondaryCta={{
          label: "View Management Services",
          href: "/management-services",
        }}
      />
    </>
  );
}
