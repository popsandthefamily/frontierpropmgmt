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
import { hochatownFAQ } from "@/data/hochatown-faq";
import { AuditCalculator } from "@/components/audit/audit-calculator";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Hochatown Cabin Property Management | Local, Full-Service, 20% Flat",
  description:
    "Hochatown, OK cabin management by a locally based team. 20% of nightly-rental revenue, no monthly minimum, dynamic pricing, 24/7 guest support, cleaning, and maintenance.",
  keywords: [
    "Hochatown property management",
    "Hochatown cabin management",
    "Hochatown vacation rental management",
    "Hochatown Airbnb management",
    "cabin management Hochatown Oklahoma",
    "short-term rental management Hochatown",
    "Hochatown STR management",
    "Beavers Bend cabin management",
    "Broken Bow / Hochatown property manager",
  ],
  openGraph: {
    title: "Hochatown Cabin Property Management | Frontier",
    description:
      "Local Hochatown cabin management. 20% of nightly-rental revenue, no monthly minimum, Airbnb Top Rated Host on every cabin.",
    images: [
      {
        url: "/images/discover/hochatown-pm-featured.png",
        width: 1200,
        height: 630,
        alt: "Hochatown cabin managed by Frontier Property Management",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/hochatown-property-management",
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
      "Dynamic pricing adjusted daily based on Hochatown demand, seasonality, local events (Beavers Bend marathon, Choctaw rodeo), and comp activity. Runs our free audit to see the specific gap on your listing.",
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
      {/* JSON-LD, FAQPage (Hochatown-specific questions first, then general) */}
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: [
            ...hochatownFAQ,
            ...managementFAQ.slice(0, 3),
          ].map((item) => ({
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
          name: "Frontier Property Management, Hochatown",
          description:
            "Full-service Hochatown cabin property management. Marketing, guest support, cleaning, maintenance, and revenue optimization.",
          url: `${siteConfig.url}/hochatown-property-management`,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "3156 Old Broken Bow Hwy",
            addressLocality: "Hochatown",
            addressRegion: "OK",
            postalCode: "74728",
            addressCountry: "US",
          },
          // Approximate Hochatown coordinates (town center)
          geo: {
            "@type": "GeoCoordinates",
            latitude: 34.1606,
            longitude: -94.7447,
          },
          areaServed: [
            { "@type": "Place", name: "Hochatown, Oklahoma" },
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "Beavers Bend State Park" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          priceRange: "$$",
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

      <Breadcrumbs
        items={[
          { label: "Management Services", href: "/management-services" },
          { label: "Hochatown" },
        ]}
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
              Full-Service Hochatown Cabin Management
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              From listing setup to turnover inspections, Frontier handles
              every detail of your Hochatown cabin rental.
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

      {/* Live Hochatown market snapshot */}
      <SectionWrapper background="white" id="market">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            The Hochatown short-term rental market, right now
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Live AirROI data on comparable cabins in the Hochatown market.
            Paste your listing URL for a full gap analysis.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <AuditCalculator variant="hero" />
        </div>
      </SectionWrapper>

      {/* About the Hochatown market */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Why Hochatown is one of Oklahoma&apos;s strongest STR markets
          </h2>
          <p>
            Hochatown sits directly at the gateway to{" "}
            <a
              href="https://www.travelok.com/listings/view.profile/id.6919"
              target="_blank"
              rel="noopener noreferrer"
            >
              Beavers Bend State Park
            </a>
            , which is Oklahoma&apos;s most visited park and the primary demand
            driver for cabin rentals in the region. The town is a 2.5-hour
            drive from Dallas-Fort Worth, which is why a large share of
            Hochatown cabins are owned by DFW investors and booked by Texas
            families. Oklahoma City and Tulsa owners and guests round out the
            core drive-market pool.
          </p>
          <p>
            Hochatown became Oklahoma&apos;s newest incorporated town in 2024,
            meaning STR regulations are actively evolving. Owners here need a
            management partner who follows these changes closely, handles
            permit and occupancy-tax compliance, and adjusts pricing around
            local peak events (Beavers Bend Marathon, fall foliage, spring
            break, winter holidays) rather than applying a generic national
            model.
          </p>
          <p>
            Frontier is based at 3156 Old Broken Bow Hwy, in the Hochatown and
            Broken Bow corridor. Our full team lives here, our cleaners and
            maintenance vendors are local, and our response times are measured
            in minutes rather than hours. If you own a cabin anywhere from
            downtown Hochatown down to Broken Bow Lake, we can reach your
            property faster than any national PMS.
          </p>
          <p>
            <Link href="/discover-broken-bow" className="underline hover:text-sage-dark">
              See our complete visitor guide to the Broken Bow and Hochatown area →
            </Link>
          </p>
        </div>
      </SectionWrapper>

      {/* Hochatown-specific FAQ */}
      <SectionWrapper background="white">
        <FAQSection
          title="Hochatown owner questions"
          questions={hochatownFAQ}
        />
      </SectionWrapper>

      {/* General management FAQ */}
      <SectionWrapper background="cream">
        <FAQSection
          title="General management questions"
          questions={managementFAQ.slice(0, 6)}
        />
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
