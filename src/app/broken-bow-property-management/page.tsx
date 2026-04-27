import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
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
      "Boutique, owner-operated Broken Bow cabin management from a team that runs its own flagship cabin in the same market. 20% of nightly-rental revenue, no monthly minimum.",
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
      "Dynamic pricing adjusted daily based on Broken Bow market demand, seasonality, local events, and comp activity. Run our free audit to see the specific gap on your listing.",
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
        title="Boutique Broken Bow Cabin Management"
        subtitle="Owner-operated. We run our own flagship cabin nearby and take on a limited number of Broken Bow owner partners."
        size="large"
        overlay="gradient"
        cta={{
          label: "Run my free listing audit",
          href: "/audit#full-audit",
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
            Boutique and owner-operated, based right here in Broken Bow. We run
            our own cabin in the same market, so the systems, vendors, and
            playbook on your cabin are the ones we test on our own.
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

      {/* What owners get from a small shop */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-3xl">
          <AnimateInView>
            <h2 className="text-center text-3xl font-bold text-white md:text-4xl">
              What owners get from a small shop
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/85 md:text-lg">
              Frontier is intentionally small. That changes the things you
              actually feel as an owner.
            </p>
            <ul className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
              {[
                "Direct access to the person responsible for the result",
                "Fewer properties competing for attention",
                "Local vendor coordination, not remote ticket handling",
                "Pricing and listing decisions made by someone operating in the same market",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-white/10 p-4 text-white"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-white" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="white">
        <FAQSection questions={managementFAQ.slice(0, 6)} />
      </SectionWrapper>

      {/* Resources for Broken Bow owners */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            More for Broken Bow cabin owners
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            The honest details: what to pay, what to ask, and how to switch
            without losing reviews.
          </p>
          <ul className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            <li>
              <Link
                href="/broken-bow-cabin-management-fees"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Broken Bow cabin management fees
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  What 20% should include and the hidden fees to watch for.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/switch-property-managers-broken-bow"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Switching property managers
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  How to switch without losing reviews or booking momentum.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/best-hochatown-property-management-company"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">
                  Best Hochatown management company
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  How to evaluate any cabin manager — boutique, scale, or
                  self-manage.
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/dallas-cabin-owners"
                className="block rounded-xl border bg-white p-4 transition hover:border-sage hover:text-sage"
              >
                <div className="text-sm font-semibold">Dallas cabin owners</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Remote-owner specifics for DFW investors.
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Own a Broken Bow cabin? See the gap on your listing."
        subtext="Free, takes about 90 seconds, built for Broken Bow and Hochatown cabin owners. Then decide if Frontier is a fit."
        cta={{ label: "Run my free listing audit", href: "/audit#full-audit" }}
        secondaryCta={{ label: "Schedule a Discovery Call", href: "/contact#discovery" }}
      />
    </>
  );
}
