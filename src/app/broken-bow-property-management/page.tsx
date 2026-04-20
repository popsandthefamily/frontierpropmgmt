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
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { managementFAQ } from "@/data/services";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Broken Bow Cabin Property Management",
  openGraph: {
    title: "Broken Bow Cabin Property Management | Frontier",
    description:
      "Local Broken Bow cabin management. 20% of nightly-rental revenue, no monthly minimum, Airbnb Top Rated Host on every cabin.",
    images: [
      {
        url: "/images/properties/old-broken-bow-highway/featured.jpg",
        width: 1200,
        height: 630,
        alt: "Broken Bow cabin managed by Frontier Property Management",
      },
    ],
  },
  description:
    "Broken Bow, OK cabin management by a locally based team. 20% of nightly-rental revenue, no monthly minimum, dynamic pricing, 24/7 guest support, cleaning, and maintenance.",
  keywords: [
    "Broken Bow property management",
    "Broken Bow cabin management",
    "Broken Bow vacation rental management",
    "Broken Bow Airbnb management",
    "cabin manager Broken Bow",
    "short-term rental management Broken Bow OK",
  ],
  alternates: {
    canonical: "https://rentwithfrontier.com/broken-bow-property-management",
  },
};

const valueProps = [
  {
    icon: "Megaphone",
    title: "Professional Marketing",
    description:
      "HDR photography, compelling copywriting, and optimized listings across Airbnb, Vrbo, Booking.com, and our direct booking site. Your Broken Bow cabin gets maximum exposure.",
  },
  {
    icon: "MessageSquare",
    title: "Guest Communication (24/7)",
    description:
      "Our team responds to every inquiry, manages check-ins and check-outs, and handles guest issues day and night. Fast, professional communication earns 5-star reviews.",
  },
  {
    icon: "Sparkles",
    title: "Cleaning & Maintenance",
    description:
      "Vetted local Broken Bow cleaning teams with detailed turnover checklists, linen programs, and proactive maintenance coordination to keep your cabin guest-ready.",
  },
  {
    icon: "TrendingUp",
    title: "Revenue Optimization",
    description:
      "Dynamic pricing adjusted daily based on Broken Bow market demand, seasonality, local events, and comp activity. Runs our free audit to see the specific gap on your listing.",
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

export default function BrokenBowPropertyManagementPage() {
  return (
    <>
      {/* JSON-LD, FAQPage */}
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: managementFAQ.slice(0, 6).map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      {/* JSON-LD, LocalBusiness */}
      <JsonLd
        type="LocalBusiness"
        data={{
          name: "Frontier Property Management, Broken Bow",
          description:
            "Professional short-term rental management for Broken Bow cabin owners. Marketing, guest support, cleaning, maintenance, and revenue optimization.",
          url: `${siteConfig.url}/broken-bow-property-management`,
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
            name: "Broken Bow, Oklahoma",
          },
        }}
      />

      {/* Hero */}
      <HeroSection
        backgroundImage="/images/discover/downtown-broken-bow.png"
        title="Broken Bow Cabin Property Management"
        subtitle="Professional short-term rental management for Broken Bow cabin owners."
        size="large"
        overlay="gradient"
        cta={{
          label: "Schedule a Free Consultation",
          href: "/contact",
        }}
      />

      <Breadcrumbs
        items={[
          { label: "Management Services", href: "/management-services" },
          { label: "Broken Bow" },
        ]}
      />

      {/* Why Choose Frontier */}
      <SectionWrapper background="cream">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Why Broken Bow Cabin Owners Choose Frontier
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We are a locally owned company based right here in Broken Bow. Our
            team knows the market, the vendors, and what guests expect from a
            Broken Bow cabin experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {valueProps.map((prop) => (
            <ServiceCard
              key={prop.title}
              icon={prop.icon}
              title={prop.title}
              description={prop.description}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Our Services */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
              Full-Service Broken Bow Cabin Management
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              From listing setup to turnover inspections, Frontier handles
              every detail of your Broken Bow cabin rental.
            </p>
          </div>

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
              &ldquo;Frontier made the transition seamless. Our Broken Bow
              cabin is earning more than ever and we do not have to worry about
              a thing. They handle everything professionally and keep us
              informed every step of the way.&rdquo;
            </blockquote>
            <p className="mt-4 text-white/80">
             , Satisfied Cabin Owner, Broken Bow
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
        heading="Own a Broken Bow cabin? Let Frontier maximize your revenue."
        subtext="Professional photography, data-driven pricing, and hands-on management from a team that knows the Broken Bow market inside and out."
        cta={{ label: "Get Started", href: "/management-services" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
