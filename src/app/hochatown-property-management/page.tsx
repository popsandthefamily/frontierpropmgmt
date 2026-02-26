import type { Metadata } from "next";
import Link from "next/link";
import { Star, Check } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ServiceCard } from "@/components/cards/service-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { JsonLd } from "@/components/seo/json-ld";
import { managementFAQ } from "@/data/services";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Hochatown Cabin Property Management",
  description:
    "Full-service Hochatown cabin property management by Frontier. Professional marketing, 24/7 guest support, cleaning, maintenance, and revenue optimization for short-term rental owners.",
  openGraph: {
    title: "Hochatown Cabin Property Management | Frontier Property Management",
    description:
      "Maximize your Hochatown cabin rental income. Frontier handles pricing, guests, cleaning, and maintenance so you can relax.",
  },
};

const valueProps = [
  {
    icon: "Megaphone",
    title: "Professional Marketing",
    description:
      "Professional photography, optimized listings on Airbnb, Vrbo, and Booking.com, plus a direct booking website with SEO and paid ads to maximize your visibility in the competitive Hochatown market.",
  },
  {
    icon: "MessageSquare",
    title: "Guest Communication (24/7)",
    description:
      "From first inquiry to post-checkout review, our team handles all guest communication around the clock. Fast response times and professional messaging earn 5-star reviews.",
  },
  {
    icon: "Sparkles",
    title: "Cleaning & Maintenance",
    description:
      "Reliable turnover cleaning teams with detailed checklists, linen programs, and proactive maintenance coordination with vetted local Hochatown vendors.",
  },
  {
    icon: "TrendingUp",
    title: "Revenue Optimization",
    description:
      "Data-driven dynamic pricing adjusted daily based on demand, seasonality, local events, and competitor analysis. Our owners typically see 15-30% revenue increases.",
  },
];

const servicesList = [
  "Airbnb, VRBO & direct booking setup and management",
  "Owner portal with transparent monthly reporting",
  "Local vendor network for repairs and upgrades",
  "Revenue optimization with dynamic pricing",
  "Turnover inspections and quality assurance",
  "Tax and compliance support (STR permits, Granicus)",
];

export default function HochatownPropertyManagementPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        type="LocalBusiness"
        data={{
          name: "Frontier Property Management — Hochatown",
          description:
            "Full-service Hochatown cabin property management. Marketing, guest support, cleaning, maintenance, and revenue optimization.",
          url: `${siteConfig.url}/hochatown-property-management`,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "3156 Old Broken Bow Hwy",
            addressLocality: "Broken Bow",
            addressRegion: "OK",
            postalCode: "74728",
            addressCountry: "US",
          },
          areaServed: {
            "@type": "Place",
            name: "Hochatown, Oklahoma",
          },
        }}
      />

      {/* Hero */}
      <HeroSection
        backgroundImage="/images/discover/hochatown-pm-featured.png"
        title="Hochatown Cabin Property Management"
        subtitle="Maximize your rental income. We handle the details so you can relax."
        size="large"
        overlay="gradient"
        cta={{
          label: "Schedule a Free Consultation",
          href: "/contact",
        }}
      />

      {/* Why Choose Frontier */}
      <SectionWrapper background="cream">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Why Hochatown Cabin Owners Choose Frontier
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We are locally owned and operated in Broken Bow. Our team lives here,
            works here, and treats every property like our own.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {valueProps.map((prop, i) => (
            <AnimateInView key={prop.title} delay={i * 0.1}>
              <ServiceCard
                icon={prop.icon}
                title={prop.title}
                description={prop.description}
              />
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* Our Services */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <AnimateInView>
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
                Full-Service Hochatown Cabin Management
              </h2>
              <p className="mb-10 text-lg text-muted-foreground">
                From listing setup to turnover inspections, Frontier handles
                every detail of your Hochatown cabin rental.
              </p>
            </div>
          </AnimateInView>

          <AnimateInView>
            <div className="rounded-lg border bg-cream/50 p-8">
              <ul className="space-y-4">
                {servicesList.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-3 text-charcoal"
                  >
                    <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                    <span className="text-base">{service}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Link
                  href="/management-services"
                  className="inline-flex items-center text-sm font-medium text-sage transition-colors hover:text-sage-dark hover:underline"
                >
                  View all services and pricing
                  <svg
                    className="ml-1 size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* Testimonial */}
      <SectionWrapper background="sage">
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
            <blockquote className="text-xl font-medium leading-relaxed text-white md:text-2xl">
              &ldquo;Very nice home clean and all new furniture is very nice
              decor casual elegance pool great quiet neighborhood.&rdquo;
            </blockquote>
            <p className="mt-4 text-white/80">
              — Dirk, Waurika, OK
            </p>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="white">
        <FAQSection questions={managementFAQ.slice(0, 6)} />
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Own a Hochatown cabin? Turn views into bookings."
        subtext="Professional photography, video tours, and targeted ad campaigns that put your cabin in front of the right guests. Let Frontier handle the marketing while you enjoy the returns."
        cta={{ label: "Get Started", href: "/management-services" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
