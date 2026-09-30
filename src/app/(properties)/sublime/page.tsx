import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Minus,
  PawPrint,
  Phone,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhotoMosaic } from "@/components/property/photo-mosaic";
import { HospitableBooking } from "@/components/property/hospitable-booking";
import { MobileBookingBar } from "@/components/property/mobile-booking-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSection } from "@/components/sections/faq-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { getPropertyBySlug, type PropertyImage } from "@/data/properties";
import { siteConfig } from "@/data/site";
import {
  sublimeAmenityGroups,
  sublimeAtAGlance,
  sublimeFacts,
  sublimeGameNight,
  sublimeGoodFit,
  sublimeGuestFAQ,
  sublimeHero,
  sublimeHouseRules,
  sublimeNearby,
  sublimeNotAFit,
  sublimeOutside,
  sublimePets,
  sublimeRating,
  sublimeReviewSummary,
  sublimeReviews,
  sublimeRooms,
  sublimeStory,
  sublimeSummary,
} from "@/data/sublime";

const property = getPropertyBySlug("sublime");

const PAGE_URL = `${siteConfig.url}/sublime`;
const PAGE_TITLE = "Sublime Retreat: Quiet Hochatown Cabin with Hot Tub, Sleeps 8";
const PAGE_DESCRIPTION =
  "A quiet, modern cabin tucked into the pines near Broken Bow, about five minutes from Hwy 259. Two king suites, hot tub, fire pit. Sleeps 8, dogs welcome.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: [
    "Broken Bow cabin sleeps 8",
    "Sublime Retreat Broken Bow",
    "Hochatown cabin with hot tub",
    "pet friendly cabin Hochatown",
    "Broken Bow cabin for two couples",
    "cabin near Beavers Bend State Park",
  ],
  openGraph: {
    url: PAGE_URL,
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: property?.images?.[0]
      ? [
          {
            url: property.images[0].src,
            width: 2560,
            height: 1568,
            alt: property.images[0].alt,
          },
        ]
      : [],
  },
  alternates: { canonical: PAGE_URL },
};

/** Rooms in the order the photo tour walks them. */
const PHOTO_ROOMS = ["Living", "Bedrooms", "Baths", "Game night", "Outdoors"];

const EXPLORE_LINKS = [
  {
    label: "Discover Broken Bow and Hochatown",
    note: "What to do, where to eat, when to come",
    href: "/discover-broken-bow",
  },
  {
    label: "Lessons from running our own Hochatown cabin",
    note: "What hosting Sublime has taught us",
    href: "/blogs/lessons-from-running-our-own-hochatown-cabin",
  },
  {
    label: "Old Broken Bow Highway",
    note: "Where Frontier started, now retired",
    href: "/old-broken-bow-highway",
  },
  {
    label: "All Frontier cabins",
    note: "Everything you can book direct",
    href: "/search",
  },
];

/** The small ruled label that opens each chapter of the page. */
function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "border-t pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em]",
        tone === "dark"
          ? "border-charcoal/20 text-charcoal/60"
          : "border-white/25 text-white/55",
      )}
    >
      {children}
    </div>
  );
}

function Figure({
  image,
  className,
  sizes,
}: {
  image: PropertyImage;
  className?: string;
  sizes: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-cream">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
      {image.caption && (
        <figcaption className="mt-2 text-xs text-current opacity-60">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

export default function SublimePage() {
  if (!property) return notFound();

  const photo = (name: string) => {
    const image = property.images.find((img) =>
      img.src.endsWith(`/sublime-retreat-${name}.jpg`),
    );
    if (!image) throw new Error(`sublime: no photo named ${name}`);
    return image;
  };
  const hero = property.images[0];
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;

  return (
    <>
      {/* ── Structured data: every value here is also visible below ───── */}
      <JsonLd
        type="VacationRental"
        data={{
          "@id": `${PAGE_URL}#rental`,
          additionalType: "Cabin",
          name: property.name,
          url: PAGE_URL,
          identifier: "frontier-sublime-retreat",
          description: sublimeSummary,
          image: property.images.map((img) => `${siteConfig.url}${img.src}`),
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hochatown",
            addressRegion: "OK",
            addressCountry: "US",
          },
          checkinTime: "16:00:00",
          checkoutTime: "11:00:00",
          petsAllowed: true,
          smokingAllowed: false,
          containsPlace: {
            "@type": "Accommodation",
            additionalType: "EntirePlace",
            occupancy: { "@type": "QuantitativeValue", value: property.sleeps },
            numberOfBedrooms: property.bedrooms,
            numberOfBathroomsTotal: property.bathrooms,
            bed: [
              {
                "@type": "BedDetails",
                numberOfBeds: sublimeFacts.kingSuites,
                typeOfBed: "King",
              },
              {
                "@type": "BedDetails",
                numberOfBeds: sublimeFacts.twinXlBunks,
                typeOfBed: "Twin XL",
              },
            ],
            amenityFeature: [
              ["hotTub", true],
              ["fireplace", true],
              ["kitchen", true],
              ["outdoorGrill", true],
              ["washerDryer", true],
              ["wifi", true],
              ["tv", true],
              ["ac", true],
              ["heating", true],
              ["patio", true],
              ["selfCheckinCheckout", true],
              ["petsAllowed", true],
              ["parkingType", "Free"],
              ["Outdoor fireplace", true],
              ["Tabletop arcade", true],
              ["Shuffleboard", true],
              ["Fire pit", true],
            ].map(([name, value]) => ({
              "@type": "LocationFeatureSpecification",
              name,
              value,
            })),
          },
          provider: { "@id": `${siteConfig.url}/#business` },
          sameAs: [sublimeFacts.airbnbUrl],
          ...(sublimeRating.show
            ? {
                aggregateRating: {
                  "@type": "AggregateRating",
                  ratingValue: sublimeRating.value,
                  ratingCount: sublimeRating.count,
                  reviewCount: sublimeRating.count,
                  bestRating: 5,
                },
              }
            : {}),
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: sublimeGuestFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────── */}
      <section
        id="sublime-hero"
        className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-forest text-white md:min-h-[88svh]"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[center_35%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/45"
        />

        <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-32 md:pb-16 lg:px-8">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-peach">
            {sublimeHero.kicker}
          </p>
          <h1 className="mt-4 max-w-4xl">
            <span className="block text-[4rem] font-bold leading-[0.85] sm:text-8xl lg:text-[8.5rem]">
              {sublimeHero.title}
            </span>
            <span className="mt-5 block font-body text-lg font-medium normal-case tracking-normal text-white/90 md:text-2xl">
              {sublimeHero.subtitle}
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {sublimeHero.tagline}
          </p>

          <ul className="mt-8 flex max-w-4xl flex-wrap gap-x-5 gap-y-2 border-t border-white/20 pt-5 text-sm text-white/85">
            {sublimeHero.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <span aria-hidden className="size-1 rounded-full bg-peach" />
                {fact}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button
              asChild
              size="lg"
              className="h-12 bg-white px-7 text-base font-semibold text-forest hover:bg-cream"
            >
              <a href="#book">
                <CalendarDays className="size-5" />
                Check dates
              </a>
            </Button>
            <a
              href={phoneHref}
              className="inline-flex items-center gap-2 text-base font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
            >
              <Phone className="size-4" />
              Call {siteConfig.phone}
            </a>
            {sublimeRating.show && (
              <a
                href={sublimeFacts.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
              >
                <Star className="size-4 fill-peach text-peach" />
                {sublimeRating.value} · {sublimeRating.count} guest reviews on
                Airbnb
                <span className="text-white/50">(as of {sublimeRating.asOf})</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. At a glance, and the calendar ─────────────────────────── */}
      <section className="bg-white">
        <Breadcrumbs
          items={[
            { label: "Properties", href: "/search" },
            { label: "Sublime Retreat" },
          ]}
        />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-4 md:pb-24 lg:px-8">
          {/* Phones read summary → calendar → spec sheet; desktop puts the
              calendar in a right-hand rail beside both. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
            <div>
              <Eyebrow>Sublime Retreat at a glance</Eyebrow>
              <p className="mt-6 text-xl leading-relaxed text-charcoal md:text-2xl md:leading-relaxed">
                {sublimeSummary}
              </p>
            </div>

            <aside
              id="book"
              aria-labelledby="book-heading"
              className="scroll-mt-24 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            >
              <div className="rounded-xl border border-border bg-off-white p-5 shadow-sm md:p-6 lg:sticky lg:top-24">
                <h2
                  id="book-heading"
                  className="text-3xl font-bold leading-none text-charcoal"
                >
                  Check dates and book direct
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter your dates for an exact total, including fees, before
                  you pay.
                </p>
                <div className="mt-5">
                  <HospitableBooking propertyId={sublimeFacts.hospitablePropertyId} />
                </div>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-charcoal">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                    Book direct and skip Airbnb&apos;s guest service fees
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                    Book with the people who run the cabin
                  </li>
                </ul>
                <a
                  href={phoneHref}
                  className="mt-5 flex items-center justify-center gap-2 rounded-md bg-sage/10 p-3 text-base font-semibold text-charcoal transition-colors hover:bg-sage/20"
                >
                  <Phone className="size-4 text-sage" />
                  Prefer to call? {siteConfig.phone}
                </a>
                <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                  Hosted by Hunter. Managed by Frontier Property Management,
                  based in Broken Bow.
                </p>
              </div>
            </aside>

            <dl className="text-sm md:text-base">
              {sublimeAtAGlance.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 border-b border-border py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                >
                  <dt className="font-medium text-charcoal">{row.label}</dt>
                  <dd className="text-muted-foreground">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── 3. The story ─────────────────────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <Eyebrow tone="light">The idea behind the cabin</Eyebrow>
              <h2 className="mt-6 text-5xl font-bold leading-[0.9] text-white md:text-6xl lg:text-7xl">
                A sublime experience
              </h2>
              {sublimeStory.paragraphs.map((text) => (
                <p
                  key={text.slice(0, 24)}
                  className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
                >
                  {text}
                </p>
              ))}

              <figure className="mt-12 flex max-w-xl gap-5 border-t border-white/15 pt-8">
                <Image
                  src="/images/team/hunter-collins-thumb.jpg"
                  alt="Hunter Collins, host of Sublime Retreat"
                  width={64}
                  height={64}
                  className="size-16 shrink-0 rounded-full object-cover"
                />
                <div>
                  <blockquote className="font-heading text-2xl leading-snug tracking-wide text-white md:text-[1.7rem]">
                    &ldquo;{sublimeStory.hostNote.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-white/60">
                    {sublimeStory.hostNote.name} · {sublimeStory.hostNote.role}
                  </figcaption>
                </div>
              </figure>
            </div>

            <ol className="lg:pt-24">
              {sublimeStory.chapters.map((chapter, i) => (
                <li
                  key={chapter.title}
                  className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/15 py-7 md:py-8"
                >
                  <span className="font-heading text-2xl font-bold leading-none text-white/35 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-wide text-white md:text-2xl">
                      {chapter.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                      {chapter.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 grid gap-4 text-white md:grid-cols-[1.35fr_1fr] md:gap-5">
            <Figure
              image={photo("front-at-dusk")}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            <Figure
              image={photo("great-room")}
              sizes="(max-width: 768px) 100vw, 42vw"
              className="md:mt-16"
            />
          </div>
        </div>
      </section>

      {/* ── 4. Where everyone sleeps ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Inside</Eyebrow>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
                Where everyone sleeps
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Two kings and four Twin XL bunks: six beds for eight guests,
                across three bedrooms, with {sublimeFacts.bathsInWords}.
              </p>

              <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
                {sublimeRooms.map((room) => (
                  <div key={room.name} className="border-t border-border py-5">
                    <h3 className="text-xl font-semibold text-charcoal">
                      {room.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {room.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid content-start gap-4 text-charcoal sm:grid-cols-2">
              <Figure
                image={photo("king-suite-one")}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="sm:col-span-2"
              />
              {["king-suite-two", "bunk-room", "suite-patio", "walk-in-shower"].map(
                (name) => (
                  <Figure
                    key={name}
                    image={photo(name)}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Outside, and game night ───────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Outside</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Outside: deck, hot tub and fire pit
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="grid content-start gap-4 text-charcoal sm:grid-cols-2">
              <Figure
                image={photo("covered-deck-fireplace")}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="sm:col-span-2"
              />
              {["hot-tub", "fire-pit"].map((name) => (
                <Figure
                  key={name}
                  image={photo(name)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                />
              ))}
            </div>
            <div>
              {sublimeOutside.map((item) => (
                <div key={item.name} className="border-t border-charcoal/15 py-5">
                  <h3 className="text-xl font-semibold text-charcoal">{item.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-8 rounded-xl bg-white p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-charcoal md:text-4xl">Game night</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {sublimeGameNight.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-4 py-1.5 text-sm text-charcoal"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                When it rains, or once the fire pit burns down, there&apos;s
                still plenty to do without getting back in the car.
              </p>
            </div>
            <div className="grid gap-4 text-charcoal sm:grid-cols-2">
              {["loft-shuffleboard", "arcade-table"].map((name) => (
                <Figure
                  key={name}
                  image={photo(name)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Photos ────────────────────────────────────────────────── */}
      <section id="photos" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Photos</Eyebrow>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
              Photos of Sublime Retreat, room by room
            </h2>
            <a
              href={sublimeFacts.airbnbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
            >
              More photos on Airbnb
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <PhotoMosaic
            className="mt-10"
            propertyName={property.name}
            images={property.images}
            roomOrder={PHOTO_ROOMS}
          />
        </div>
      </section>

      {/* ── 7. What guests say ───────────────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow tone="light">Guest reviews</Eyebrow>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-4xl font-bold leading-[0.95] md:text-5xl">
                What guests say
              </h2>
              {sublimeRating.show && (
                <div className="mt-8">
                  <p className="flex items-end gap-4">
                    <span className="font-heading text-7xl font-bold leading-[0.8] text-white md:text-8xl">
                      {sublimeRating.value}
                    </span>
                    <span className="pb-1 text-sm leading-snug text-white/70">
                      <span className="flex gap-0.5" aria-hidden>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-4 fill-peach text-peach" />
                        ))}
                      </span>
                      <span className="mt-1.5 block">
                        out of 5 from {sublimeRating.count} reviews on Airbnb
                      </span>
                      <span className="block text-white/45">
                        as of {sublimeRating.asOf}
                      </span>
                    </span>
                  </p>
                  <dl className="mt-6 flex flex-wrap gap-2">
                    {sublimeRating.categories.map((c) => (
                      <div
                        key={c.label}
                        className="flex gap-1.5 rounded-full px-3.5 py-1.5 text-sm ring-1 ring-white/20"
                      >
                        <dt className="text-white/65">{c.label}</dt>
                        <dd className="font-semibold text-white">{c.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              <figure className="mt-10">
                <blockquote className="font-heading text-2xl leading-snug tracking-wide text-white md:text-3xl">
                  &ldquo;{sublimeReviewSummary}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-white/55">
                  Airbnb&apos;s summary of Sublime Retreat&apos;s guest reviews
                </figcaption>
              </figure>
              <a
                href={sublimeFacts.airbnbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Read every review on Airbnb
                <ArrowUpRight className="size-4" />
              </a>
            </div>

            <div>
              <p className="mb-4 text-sm text-white/60">
                A few of our five-star reviews, word for word
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {sublimeReviews.map((review) => (
                  <li key={review.name}>
                    <figure className="flex h-full flex-col rounded-lg bg-white/[0.06] p-6 ring-1 ring-white/10">
                      <span className="mb-3 flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-peach text-peach" />
                        ))}
                      </span>
                      <blockquote className="flex-1 text-sm leading-relaxed text-white/85 md:text-base">
                        &ldquo;{review.quote}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 border-t border-white/10 pt-4 text-sm">
                        <span className="font-semibold text-white">{review.name}</span>
                        <span className="text-white/55">
                          {" "}
                          · {review.date} · {review.trip}
                        </span>
                        <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-white/40">
                          Airbnb review
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Amenities ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Everything that&apos;s here</Eyebrow>
          <h2 className="mt-6 text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Amenities
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {sublimeAmenityGroups.map((group) => (
              <div key={group.title} className="border-t border-border pt-5">
                <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground md:text-base">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-1 size-4 shrink-0 text-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Pets, and the neighborhood ────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <Eyebrow>Bring the dog</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-[0.95] text-charcoal md:text-4xl">
              Pets at Sublime Retreat
            </h2>
            <ul className="mt-8 space-y-3 text-base text-charcoal">
              {sublimePets.map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <PawPrint className="mt-1 size-4 shrink-0 text-sage" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Eyebrow>The neighborhood</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-[0.95] text-charcoal md:text-4xl">
              Around Sublime: Hochatown and Hwy 259
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Sublime sits in {sublimeFacts.neighborhood},{" "}
              {sublimeFacts.access}. These are a short drive away.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-charcoal">Nearby</h3>
            <ul className="mt-2">
              {sublimeNearby.map((place) => (
                <li
                  key={place.name}
                  className="grid gap-1 border-t border-charcoal/15 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
                >
                  <span className="font-medium text-charcoal">{place.name}</span>
                  <span className="text-sm text-muted-foreground md:text-base">
                    {place.detail}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-lg font-semibold text-charcoal">Getting here</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Come in on US-259 through Hochatown. The address and directions
              are sent after you book. For what&apos;s open and what&apos;s on,
              see our{" "}
              <Link
                href="/discover-broken-bow"
                className="font-medium text-charcoal underline underline-offset-4"
              >
                Broken Bow and Hochatown guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. Good to know, and who it suits ───────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Before you book</Eyebrow>
          <h2 className="mt-6 text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Good to know
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
            <div className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                Check-in and checkout
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                Check in after {sublimeFacts.checkIn} and check out by{" "}
                {sublimeFacts.checkOut}. Check-in is self check-in with a keypad
                smart lock, and your code is sent before you arrive.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                Minimum stay and cancellation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                Minimum stays vary by season, and peak season and spring break
                may require a 2-night minimum. The minimum for your dates and the
                cancellation policy are shown at checkout.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                House rules
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground md:text-base">
                {sublimeHouseRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sage" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                Cameras
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                There are exterior security cameras on the property.
              </p>
            </div>
          </div>

          <div className="mt-20 border-t border-charcoal/20 pt-10">
            <h2 className="max-w-2xl text-3xl font-bold leading-[0.95] text-charcoal md:text-4xl">
              Is Sublime Retreat right for your trip?
            </h2>
            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">A good fit for</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground md:text-base">
                  {sublimeGoodFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-sage" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-charcoal">
                  Not the right cabin for
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground md:text-base">
                  {sublimeNotAFit.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Minus className="mt-1 size-4 shrink-0 text-charcoal/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Questions guests ask ─────────────────────────────────── */}
      <SectionWrapper background="cream">
        <FAQSection title="Questions guests ask" questions={sublimeGuestFAQ} />
      </SectionWrapper>

      {/* ── 12. Close ────────────────────────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-24 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
          <div>
            <p className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-[0.02em] md:text-6xl">
              Come see it for yourself.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              Pick your dates and see the full total before you pay. Questions
              first? Give us a call.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button
                asChild
                size="lg"
                className="h-12 bg-white px-7 text-base font-semibold text-forest hover:bg-cream"
              >
                <a href="#book">
                  <CalendarDays className="size-5" />
                  Check dates
                </a>
              </Button>
              <a
                href={phoneHref}
                className="inline-flex items-center gap-2 text-base font-medium text-white/90 underline-offset-4 hover:text-white hover:underline"
              >
                <Phone className="size-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div>
            <Eyebrow tone="light">Keep reading</Eyebrow>
            <h2 className="mt-6 text-3xl font-bold leading-none md:text-4xl">
              Explore more
            </h2>
            <ul className="mt-6">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href} className="border-t border-white/15">
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-medium text-white">{link.label}</span>
                      <span className="block text-sm text-white/55">{link.note}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MobileBookingBar propertyName={property.name} heroId="sublime-hero" />
    </>
  );
}
