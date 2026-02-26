import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Bed, Bath, Users, Phone, Star, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ImageGallery } from "@/components/property/image-gallery";
import { AmenityGrid } from "@/components/property/amenity-grid";
import { BookingWidget } from "@/components/property/booking-widget";
import { HospitableBooking } from "@/components/property/hospitable-booking";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { MobileBookingBar } from "@/components/property/mobile-booking-bar";
import { getPropertyBySlug } from "@/data/properties";
import { siteConfig } from "@/data/site";

const property = getPropertyBySlug("old-broken-bow-highway");

export const metadata: Metadata = {
  title: property?.name ?? "Cabin Details",
  description:
    property?.description?.slice(0, 160) ??
    "Book your stay at this beautiful Broken Bow cabin.",
  openGraph: {
    title: property?.name,
    description: property?.tagline,
    images: property?.images?.[0]?.src
      ? [{ url: property.images[0].src }]
      : [],
  },
};

export default function OldBrokenBowHighwayPage() {
  if (!property) return notFound();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd
        type="VacationRental"
        data={{
          name: property.name,
          description: property.description,
          url: `${siteConfig.url}/old-broken-bow-highway`,
          image: property.images.map((img) => `${siteConfig.url}${img.src}`),
          address: {
            "@type": "PostalAddress",
            addressLocality: "Broken Bow",
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
      <div className="mx-auto max-w-7xl px-4 pt-24">
        <ImageGallery
          images={property.images}
          propertyName={property.name}
        />
      </div>

      {/* Property Header */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <AnimateInView>
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
                  About This Property
                </h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{property.description}</p>
                </div>
              </div>
            </AnimateInView>

            {/* Amenities */}
            <AnimateInView>
              <div>
                <h2 className="mb-6 text-2xl font-bold text-charcoal">
                  Amenities
                </h2>
                <AmenityGrid amenities={property.amenities} />
              </div>
            </AnimateInView>

            {/* Sleeping Arrangements */}
            {property.sleepingArrangements &&
              property.sleepingArrangements.length > 0 && (
                <AnimateInView>
                  <div>
                    <h2 className="mb-4 text-2xl font-bold text-charcoal">
                      Sleeping Arrangements
                    </h2>
                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                      {property.sleepingArrangements.map((arrangement) => (
                        <div key={arrangement.room} className="flex items-center gap-3 py-1">
                          <Bed className="size-5 shrink-0 text-sage" />
                          <div>
                            <h3 className="font-semibold text-charcoal">
                              {arrangement.room}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {arrangement.details}
                            </p>
                          </div>
                        </div>
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
                </ul>
              </div>
            </AnimateInView>
          </div>

          {/* Right Column — Sticky Booking Sidebar (1/3) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Book Direct & Save Card */}
              <Card className="border-2 border-sage bg-sage/5 shadow-lg">
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldCheck className="size-6 text-sage" />
                    <h3 className="text-xl font-bold text-charcoal">
                      Book Direct &amp; Save
                    </h3>
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Skip the platform fees. Book directly with Frontier Property
                    Management for the best rate guaranteed on your Broken Bow
                    cabin getaway.
                  </p>
                  <div className="mb-4 flex items-center gap-2 rounded-md bg-sage/10 p-3">
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
                    <Link href="/contact">Check Availability</Link>
                  </Button>
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
            Check Availability &amp; Book Your Stay
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Select your dates below to see real-time pricing and availability
            for this property.
          </p>
        </div>

        <HospitableBooking propertyId="1874670" />
      </SectionWrapper>

      {/* CTA */}
      <CTASection
        heading="Looking for something different?"
        subtext="Browse all of our professionally managed cabins in Broken Bow and Hochatown."
        cta={{ label: "Explore All Properties", href: "/search" }}
        secondaryCta={{ label: "Contact Us", href: "/contact" }}
      />

      {/* Mobile Booking Bar */}
      <MobileBookingBar propertyName={property.name} />
    </>
  );
}
