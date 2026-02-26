import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import {
  Bed,
  Bath,
  Users,
  Phone,
  Star,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageGallery } from "@/components/property/image-gallery";
import { AmenityGrid } from "@/components/property/amenity-grid";
import { BookingWidget } from "@/components/property/booking-widget";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { getPropertyBySlug } from "@/data/properties";
import { siteConfig } from "@/data/site";

const property = getPropertyBySlug("sublime");

export const metadata: Metadata = {
  title: "Sublime Retreat: Hot Tub, 2 Zip Lines, 2 Kings in Hochatown",
  description:
    "Book Sublime Retreat — a brand-new boho-modern luxury cabin in Hochatown with 2 private zip lines, hot tub with Bluetooth speakers, arcade, Calcutta quartz kitchen, and bamboo floors. Sleeps 8.",
  openGraph: {
    title: "Sublime Retreat: Hot Tub, 2 Zip Lines, 2 Kings in Hochatown",
    description:
      "New boho-modern luxury cabin in Hochatown. 2 zip lines, hot tub, arcade, Calcutta quartz kitchen, bamboo floors. Sleeps 8.",
    images: property?.images?.[0]?.src
      ? [{ url: property.images[0].src }]
      : [],
  },
};

export default function SublimePage() {
  if (!property) return notFound();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd
        type="VacationRental"
        data={{
          name: property.name,
          description: property.description,
          url: `${siteConfig.url}/sublime`,
          image: property.images.map((img) => `${siteConfig.url}${img.src}`),
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochatown",
            addressRegion: "OK",
            addressCountry: "US",
          },
          numberOfBedrooms: property.bedrooms,
          numberOfBathroomsTotal: property.bathrooms,
          occupancy: {
            "@type": "QuantitativeValue",
            value: property.sleeps,
          },
          petsAllowed: true,
          amenityFeature: property.amenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a.label,
          })),
        }}
      />

      {/* Image Gallery */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <ImageGallery
          images={property.images}
          propertyName={property.name}
        />
      </div>

      {/* Property Header */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <AnimateInView>
          <div className="mb-3 flex items-center gap-2">
            <Badge className="gap-1.5 bg-sage px-3 py-1 text-sm text-white">
              <Sparkles className="size-3.5" />
              Luxury Cabin
            </Badge>
            <Badge className="gap-1.5 bg-amber-500 px-3 py-1 text-sm text-white">
              <Star className="size-3.5" />
              Premium Listing
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-charcoal md:text-4xl lg:text-5xl">
            {property.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {property.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm">
              <Bed className="size-4" />
              {property.bedrooms} Bedrooms
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm">
              <Bath className="size-4" />
              {property.bathrooms} Bathrooms
            </Badge>
            <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm">
              <Users className="size-4" />
              Sleeps {property.sleeps}
            </Badge>
          </div>
        </AnimateInView>
      </div>

      {/* Two-Column Layout */}
      <div className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column — Content (2/3) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <AnimateInView>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-charcoal">
                  About Sublime Retreat
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{property.description}</p>
                </div>
              </div>
            </AnimateInView>

            {/* Luxury Highlights */}
            <AnimateInView>
              <div>
                <h2 className="mb-6 text-2xl font-bold text-charcoal">
                  Luxury Highlights
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "2 Private Zip Lines",
                      description:
                        "Soar through the trees on two thrilling zip lines right on the property.",
                    },
                    {
                      title: "Hot Tub with Bluetooth",
                      description:
                        "Unwind under the stars with your favorite music playing through built-in Bluetooth speakers.",
                    },
                    {
                      title: "Full-Size Arcade Machine",
                      description:
                        "Classic arcade fun for the whole family, plus shuffleboard and cornhole.",
                    },
                    {
                      title: "Calcutta Quartz Kitchen",
                      description:
                        "A stunning designer kitchen with premium Calcutta quartz countertops.",
                    },
                    {
                      title: "Bamboo Hardwood Floors",
                      description:
                        "Beautiful, eco-friendly bamboo hardwood throughout the cabin.",
                    },
                    {
                      title: "Dual-Sided Fireplace",
                      description:
                        "An indoor/outdoor fireplace that connects the living room to the covered deck.",
                    },
                  ].map((highlight) => (
                    <Card key={highlight.title} className="border-l-4 border-l-sage">
                      <CardContent className="pt-4 pb-4">
                        <h3 className="mb-1 font-semibold text-charcoal">
                          {highlight.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </AnimateInView>

            {/* Amenities */}
            <AnimateInView>
              <div>
                <h2 className="mb-6 text-2xl font-bold text-charcoal">
                  All Amenities
                </h2>
                <AmenityGrid amenities={property.amenities} />
              </div>
            </AnimateInView>

            {/* Sleeping Arrangements */}
            {property.sleepingArrangements &&
              property.sleepingArrangements.length > 0 && (
                <AnimateInView>
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-charcoal">
                      Sleeping Arrangements
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {property.sleepingArrangements.map((arrangement) => (
                        <Card key={arrangement.room}>
                          <CardContent className="pt-6">
                            <div className="mb-2 flex items-center gap-2">
                              <Bed className="size-5 text-sage" />
                              <h3 className="font-semibold text-charcoal">
                                {arrangement.room}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {arrangement.details}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </AnimateInView>
              )}

            {/* House Rules */}
            <AnimateInView>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-charcoal">
                  House Rules
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    Check-in: 4:00 PM / Check-out: 10:00 AM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    No smoking inside the cabin
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    Pets welcome (pet fee may apply)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    No parties or events
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    Quiet hours: 10:00 PM - 8:00 AM
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    Maximum occupancy: {property.sleeps} guests
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-sage" />
                    Zip lines: Adult supervision required for minors
                  </li>
                </ul>
              </div>
            </AnimateInView>
          </div>

          {/* Right Column — Sticky Booking Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Book Your Luxury Escape — Primary CTA */}
              <Card className="border-2 border-sage bg-gradient-to-br from-sage/10 to-sage/5 shadow-xl">
                <CardContent className="pt-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="size-6 text-sage" />
                    <h3 className="text-xl font-bold text-charcoal">
                      Book Your Luxury Escape
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Experience Hochatown like never before. Sublime Retreat is
                    one of the most sought-after cabins in the area — book
                    early to secure your dates.
                  </p>
                  <div className="mb-4 flex items-center gap-2 rounded-md bg-white p-3 shadow-sm">
                    <Phone className="size-5 shrink-0 text-sage" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Call or text to book
                      </p>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-lg font-bold text-charcoal hover:text-sage"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-sage text-lg font-semibold text-white hover:bg-sage-dark"
                  >
                    <Link href="/contact">Book Now</Link>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    <ShieldCheck className="mb-0.5 inline size-3.5" /> Best
                    rate guaranteed when you book direct
                  </p>
                </CardContent>
              </Card>

              {/* Booking Widget */}
              <BookingWidget
                propertyName={property.name}
                bookingUrl={property.bookingUrl}
              />

              {/* Trust Signals */}
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Professionally managed by{" "}
                  <span className="font-medium text-charcoal">
                    Frontier Property Management
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hospitable Booking Embed — Full Width */}
      <SectionWrapper background="cream">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
            Check Availability &amp; Book Sublime Retreat
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Select your dates below to see real-time pricing and availability
            for this luxury cabin.
          </p>
        </div>

        {/*
          Hospitable property-specific booking widget for Sublime Retreat.
          TODO: Set the data-property-id attribute to this property's Hospitable widget ID.
          The Hospitable embed script will mount the booking calendar into this container.
        */}
        <div
          id="hospitable-booking"
          data-property-id="sublime"
          className="mx-auto min-h-[400px] max-w-4xl rounded-lg border bg-white p-8 shadow-sm"
        >
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <p className="text-center text-sm">
              Booking calendar loading...
            </p>
          </div>
        </div>

        {/*
          TODO: Replace the script src below with the actual Hospitable booking widget CDN URL
          for the Sublime Retreat property.
          Example: https://app.hospitable.com/widgets/booking/YOUR_PROPERTY_WIDGET_ID.js
        */}
        <Script
          src="https://app.hospitable.com/widgets/booking.js"
          strategy="lazyOnload"
        />
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Looking for something different?"
        subtext="Browse all of our professionally managed cabins in Broken Bow and Hochatown."
        cta={{ label: "Explore All Properties", href: "/search" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
