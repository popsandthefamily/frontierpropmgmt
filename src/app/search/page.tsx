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
import { JsonLd } from "@/components/seo/json-ld";
import { properties } from "@/data/properties";
import { siteConfig } from "@/data/site";

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
    description: "Message your host directly, faster responses, better service.",
  },
  {
    icon: Headphones,
    title: "Local Support",
    description: "Our team is based in Broken Bow and available when you need us.",
  },
];

export const metadata: Metadata = {
  title: "Broken Bow Cabins for Rent: Book Direct, No Platform Fees",
  description:
    "Browse luxury cabins in Broken Bow & Hochatown for direct booking. Hot tubs, pools, game rooms & more. Skip Airbnb fees, best rate guaranteed.",
  openGraph: {
    title: "Broken Bow Cabins for Rent: Book Direct & Save",
    description:
      "Luxury Hochatown & Broken Bow cabins. Book direct, skip the platform fees, get the best rate guaranteed.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury cabins for rent in Broken Bow and Hochatown, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/search",
  },
};

export default function SearchPage() {
  return (
    <>
      {/* JSON-LD, ItemList of VacationRentals */}
      <JsonLd
        type="ItemList"
        data={{
          name: "Broken Bow & Hochatown Cabins for Rent",
          description:
            "Professionally managed vacation rental cabins available for direct booking in Broken Bow and Hochatown, Oklahoma.",
          numberOfItems: properties.length,
          itemListElement: properties.map((property, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${siteConfig.url}/${property.slug}`,
            name: property.name,
            image: `${siteConfig.url}${property.images[0].src}`,
          })),
        }}
      />

      {/* Hero */}
      <HeroSection
        backgroundImage="/images/discover/hochatown-area.png"
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
          {properties.map((property) => (
            <PropertyCard
              key={property.slug}
              slug={property.slug}
              name={property.name}
              tagline={property.tagline}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              sleeps={property.sleeps}
              featuredImage={property.images[0].src}
            />
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
          {bookDirectBenefits.map((benefit) => (
            <Card key={benefit.title} className="h-full text-center">
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

        {/* Hospitable direct property search widget */}
        <div className="mx-auto max-w-4xl">
          <Script
            src="https://hospitable.b-cdn.net/direct-property-search-widget/hospitable-search-widget.prod.js"
            strategy="lazyOnload"
          />
          {/* @ts-expect-error, custom web component from Hospitable */}
          <hospitable-direct-mps
            identifier="1a10c870-8304-4205-a5d4-995f468ccc08"
            type="custom"
          />
        </div>
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Own a cabin? Let us manage it for you."
        subtext="Frontier Property Management handles everything from listings and pricing to guest communication and maintenance, so you earn more while doing less."
        cta={{ label: "Learn About Management", href: "/management-services" }}
      />
    </>
  );
}
