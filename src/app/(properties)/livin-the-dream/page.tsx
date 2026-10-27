import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhotoMosaic } from "@/components/property/photo-mosaic";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getPropertyBySlug, type PropertyImage } from "@/data/properties";
import { siteConfig } from "@/data/site";

const property = getPropertyBySlug("livin-the-dream");

const PAGE_URL = `${siteConfig.url}/livin-the-dream`;
const PAGE_TITLE = "Livin' the Dream: Broken Bow Cabin with Hot Tub, Opens Dec 1";
const PAGE_DESCRIPTION =
  "A 3-bedroom, 3-bath log cabin in the Broken Bow pines: hot tub, covered deck with a stone fireplace, fire pit and playground. Booking opens December 1.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  openGraph: {
    url: PAGE_URL,
    type: "website",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: property?.images?.[0]
      ? [{ url: property.images[0].src, width: 1200, height: 900, alt: property.images[0].alt }]
      : [],
  },
  alternates: { canonical: PAGE_URL },
};

/*
 * Everything below comes from the 2026-10-27 handover: what both prior
 * listings advertise and the photos show. Reviews, ratings, prices, pet
 * rules and check-in times belong to the previous manager and are left out
 * until Frontier sets its own.
 */

const AT_A_GLANCE = [
  { label: "Layout", value: "3 bedrooms and 3 full baths over two floors" },
  { label: "Beds", value: "Two kings and a queen, with a TV in every bedroom" },
  {
    label: "Outside",
    value: "Private hot tub, covered deck with a stone gas fireplace, fire pit and gas grill",
  },
  { label: "For the kids", value: "Playground, horseshoes and ladder ball" },
  {
    label: "Setting",
    value: "Pine woods in Broken Bow, a short drive from Hochatown and Beavers Bend",
  },
  { label: "Booking", value: "Opens December 1" },
];

const ROOMS = [
  {
    name: "Main-floor king",
    detail:
      "A king bed and a TV. The bath across the hall has a double vanity and a tile shower built for two, with two showerheads.",
  },
  {
    name: "Upstairs king",
    detail: "A king bed, a TV and its own full bath.",
  },
  {
    name: "Upstairs queen",
    detail: "A queen bed, a TV and its own full bath.",
  },
  {
    name: "The sofa",
    detail:
      "We're checking the living-room sofa sleeper in person before booking opens, and will post how many extra guests it fits then.",
  },
];

const OUTSIDE = [
  {
    name: "Hot tub",
    detail: "Private, at the end of the covered back deck, under the same roof as the fireplace.",
  },
  {
    name: "Deck fireplace",
    detail:
      "A stone gas fireplace with a TV above it, plus an outdoor dining table and seating along the deck.",
  },
  {
    name: "Fire pit and grill",
    detail: "An iron fire pit ringed by Adirondack chairs in the yard, and a gas grill on the deck.",
  },
  {
    name: "Playground and yard games",
    detail: "A wooden playset with a slide, a horseshoe pit and ladder ball, all in the pines.",
  },
];

const AMENITY_GROUPS = [
  {
    title: "Kitchen and dining",
    items: [
      "Full kitchen with granite counters",
      "Stove, oven and microwave",
      "Refrigerator and freezer",
      "Dishwasher",
      "Coffee maker and coffee bar",
      "Toaster and blender",
      "Cookware, dishes and utensils",
      "Dining table",
    ],
  },
  {
    title: "Living",
    items: [
      "Electric fireplace",
      "TV in the living room and every bedroom",
      "Board games",
      "Wi-Fi",
      "Dedicated workspace",
    ],
  },
  {
    title: "Comfort and laundry",
    items: [
      "Air conditioning and heating",
      "Ceiling fans",
      "Washer and dryer",
      "Bed linens and towels",
      "Shampoo, conditioner and body soap",
      "Hair dryer, iron and hangers",
    ],
  },
  {
    title: "Outside",
    items: [
      "Private hot tub",
      "Covered deck with a stone gas fireplace",
      "Outdoor dining and seating",
      "Fire pit",
      "Gas grill",
      "Playground",
      "Horseshoes and ladder ball",
    ],
  },
  {
    title: "Arrival and safety",
    items: [
      "Self check-in",
      "Free parking on a circle drive",
      "Private entrance",
      "Smoke and carbon monoxide alarms",
    ],
  },
];

const GOOD_TO_KNOW = [
  {
    title: "The road in",
    body: "The last stretch is gravel, and in dry weather the dust reaches the porches and cars. The address and directions are sent after you book.",
  },
  {
    title: "The yard",
    body: "The backyard is not fully fenced, so keep an eye on little ones near the drive.",
  },
  {
    title: "The cabin",
    body: "It's an established log cabin, not a new build, and some rooms are more updated than others. We'd rather you hear that from us now.",
  },
  {
    title: "Set before December 1",
    body: "Rates, minimum stays, check-in times, the pet policy and the final guest count. Call and we'll tell you where each one stands.",
  },
];

/** Rooms in the order the photo tour walks them. */
const PHOTO_ROOMS = ["Living", "Kitchen", "Bedrooms", "Baths", "Outdoors"];

const EXPLORE_LINKS = [
  {
    label: "Sublime Retreat",
    note: "Our Hochatown cabin, bookable today",
    href: "/sublime",
  },
  {
    label: "Discover Broken Bow and Hochatown",
    note: "What to do, where to eat, when to come",
    href: "/discover-broken-bow",
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

export default function LivinTheDreamPage() {
  if (!property) return notFound();

  const photo = (name: string) => {
    const image = property.images.find((img) =>
      img.src.endsWith(`/livin-the-dream-${name}.jpg`),
    );
    if (!image) throw new Error(`livin-the-dream: no photo named ${name}`);
    return image;
  };
  const hero = property.images[0];
  const phoneHref = `tel:${siteConfig.phone.replace(/-/g, "")}`;
  const notifyHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "Livin' the Dream: tell me when booking opens",
  )}`;

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
          identifier: "frontier-livin-the-dream",
          description: property.description,
          image: property.images.map((img) => `${siteConfig.url}${img.src}`),
          address: {
            "@type": "PostalAddress",
            addressLocality: "Broken Bow",
            addressRegion: "OK",
            addressCountry: "US",
          },
          containsPlace: {
            "@type": "Accommodation",
            additionalType: "EntirePlace",
            occupancy: { "@type": "QuantitativeValue", value: property.sleeps },
            numberOfBedrooms: property.bedrooms,
            numberOfBathroomsTotal: property.bathrooms,
            bed: [
              { "@type": "BedDetails", numberOfBeds: 2, typeOfBed: "King" },
              { "@type": "BedDetails", numberOfBeds: 1, typeOfBed: "Queen" },
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
              ["parkingType", "Free"],
              ["Fire pit", true],
              ["Playground", true],
            ].map(([name, value]) => ({
              "@type": "LocationFeatureSpecification",
              name,
              value,
            })),
          },
          provider: { "@id": `${siteConfig.url}/#business` },
        }}
      />

      {/* ── 1. Masthead ──────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 md:pb-20 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Properties", href: "/search" },
              { label: property.name },
            ]}
          />

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            <span>Broken Bow, Oklahoma</span>
            <span className="whitespace-nowrap">Coming {property.opensOn}</span>
          </div>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-sage/10 px-3.5 py-1.5 text-sm font-semibold text-charcoal">
                <CalendarDays className="size-4 text-sage" />
                Booking opens {property.opensOn}
              </p>
              <h1 className="mt-6 text-[3.25rem] font-bold leading-[0.88] tracking-tight text-charcoal sm:text-7xl lg:text-[5.5rem]">
                Livin&apos; the Dream
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                A three-bedroom, three-bath log cabin in the Broken Bow pines,
                with a private hot tub on a covered deck, a stone fireplace
                beside it, a fire pit and a playground out back. Frontier is
                taking it over, and the calendar opens December 1.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 bg-sage px-7 text-base font-semibold text-white hover:bg-sage-dark"
                >
                  <a href={notifyHref}>
                    <Mail className="size-5" />
                    Tell me when it opens
                  </a>
                </Button>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 text-base font-medium text-charcoal underline-offset-4 hover:underline"
                >
                  <Phone className="size-4" />
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-cream">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. At a glance ───────────────────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20 lg:px-8">
          <Eyebrow>Livin&apos; the Dream at a glance</Eyebrow>
          <dl className="mt-6 grid gap-x-16 text-sm md:grid-cols-2 md:text-base">
            {AT_A_GLANCE.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-charcoal/15 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <dt className="font-medium text-charcoal">{row.label}</dt>
                <dd className="text-muted-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── 3. Photos ────────────────────────────────────────────────── */}
      <section id="photos" className="scroll-mt-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Photos</Eyebrow>
          <h2 className="mt-6 text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Photos of Livin&apos; the Dream, room by room
          </h2>
          <PhotoMosaic
            className="mt-10"
            propertyName={property.name}
            images={property.images}
            roomOrder={PHOTO_ROOMS}
          />
        </div>
      </section>

      {/* ── 4. Where everyone sleeps ─────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-20 md:pb-28 lg:px-8">
          <Eyebrow>Inside</Eyebrow>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
                Where everyone sleeps
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Two kings and a queen, one bedroom on the main floor and two
                upstairs, with three full baths so nobody waits in the morning.
              </p>

              <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
                {ROOMS.map((room) => (
                  <div key={room.name} className="border-t border-border py-5">
                    <h3 className="text-xl font-semibold text-charcoal">{room.name}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {room.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid content-start gap-4 text-charcoal sm:grid-cols-2">
              <Figure
                image={photo("downstairs-king")}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="sm:col-span-2"
              />
              {[
                "upstairs-bedroom-one",
                "upstairs-bedroom-two",
                "downstairs-double-vanity",
                "downstairs-tile-shower",
              ].map((name) => (
                <Figure
                  key={name}
                  image={photo(name)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Outside ───────────────────────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow tone="light">Outside</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-4xl font-bold leading-[0.95] md:text-5xl">
            Hot tub, fireplace and fire pit, out back in the pines
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div className="grid content-start gap-4 sm:grid-cols-2">
              <Figure
                image={photo("hot-tub-fireplace")}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="sm:col-span-2"
              />
              {["fire-pit", "playground"].map((name) => (
                <Figure
                  key={name}
                  image={photo(name)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                />
              ))}
            </div>
            <div>
              {OUTSIDE.map((item) => (
                <div key={item.name} className="border-t border-white/15 py-5">
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70 md:text-base">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Amenities ─────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Everything that&apos;s here</Eyebrow>
          <h2 className="mt-6 text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Amenities
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITY_GROUPS.map((group) => (
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

      {/* ── 7. Good to know ──────────────────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-8">
          <Eyebrow>Before you book</Eyebrow>
          <h2 className="mt-6 text-4xl font-bold leading-[0.95] text-charcoal md:text-5xl">
            Good to know
          </h2>
          <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {GOOD_TO_KNOW.map((item) => (
              <div key={item.title} className="border-t border-charcoal/15 pt-5">
                <h3 className="text-lg font-semibold text-charcoal md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Close ─────────────────────────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 md:py-24 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
          <div>
            <p className="font-heading text-5xl font-bold uppercase leading-[0.9] tracking-[0.02em] md:text-6xl">
              Booking opens {property.opensOn}.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
              Want first pick of dates? Email us and we&apos;ll let you know the
              day the calendar goes live, or call with questions now.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button
                asChild
                size="lg"
                className="h-12 bg-white px-7 text-base font-semibold text-forest hover:bg-cream"
              >
                <a href={notifyHref}>
                  <Mail className="size-5" />
                  Tell me when it opens
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
    </>
  );
}
