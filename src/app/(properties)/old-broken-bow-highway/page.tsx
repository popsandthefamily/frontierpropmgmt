import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/property/image-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CTASection } from "@/components/sections/cta-section";
import { DiscoveryCTALink } from "@/components/analytics/discovery-cta";
import { getPropertyBySlug } from "@/data/properties";
import { siteConfig } from "@/data/site";

const property = getPropertyBySlug("old-broken-bow-highway");

const PAGE_TITLE = "Old Broken Bow Highway: The House Frontier Started On";
const PAGE_DESCRIPTION =
  "The 3BR poolside house on Old Broken Bow Highway was Frontier's first year in business: 15 booked nights a month through the slow season, five stars start to finish, and revenue that kept pace with bigger cabins. No longer available to book.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: "Old Broken Bow Highway | The House Frontier Learned On",
    description:
      "A retrospective on Frontier's first year running its own rental house in Broken Bow. This property is no longer available to book.",
    type: "article",
    images: property?.images?.[0]?.src
      ? [
          {
            url: property.images[0].src,
            width: 1200,
            height: 630,
            alt: "The poolside house on Old Broken Bow Highway",
          },
        ]
      : [],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/old-broken-bow-highway",
  },
};

/** The four numbers that defined the first year, stated plainly. */
const FIRST_YEAR_LEDGER = [
  {
    stat: "15 nights",
    label:
      "Booked per month on average, held through the slow season when most of the market went quiet.",
  },
  {
    stat: "Five stars",
    label:
      "The rating never slipped. Not for a season, not for a single stretch of the year.",
  },
  {
    stat: "Punched up",
    label:
      "Revenue that rivaled purpose-built cabins with more bedrooms, newer builds, and longer amenity lists.",
  },
  {
    stat: "Owner-run",
    label:
      "Every message, every turnover, every price change, handled by us. No vendor in between.",
  },
];

/** The year, told in four chapters. */
const CHAPTERS = [
  {
    title: "We started with one house and no shortcuts",
    body: "Frontier did not start as a management company. It started as a 3-bedroom, 3-bath house with a private pool on Old Broken Bow Highway, and two people who did all of it: the photos, the listing copy, the pricing calendar, the 11pm guest message, the turnover, the pool chemistry, the propane run. There was nobody to hand a problem to. That turns out to be the fastest way to learn a market.",
  },
  {
    title: "The off-season was the real test",
    body: "Anyone can fill a Broken Bow cabin in October. The business is decided in the months nobody talks about, when the calendar goes soft and owners start discounting out of panic. We kept the house at roughly 15 booked nights a month straight through those stretches, by working the calendar every single week instead of setting a rate in the spring and hoping: midweek stays, shoulder dates, minimum-night rules that flexed with demand instead of fighting it.",
  },
  {
    title: "A house that earned like a cabin",
    body: "It was a house, not a purpose-built cabin. No zip lines, no arcade, no eight-figure build, and none of the log-and-tin styling this market sells on. It competed on the things that are actually within an operator's control, presentation, responsiveness, and a stay that matched exactly what the listing promised, and it pulled revenue that rivaled cabins with more square footage and a longer amenity list. That gap is the whole thesis of the company: most cabins are not underperforming because of what they lack, they are underperforming because of how they are run.",
  },
  {
    title: "Five stars, one turnover at a time",
    body: "The rating held at five stars for the life of the listing, and there was no trick to it. Guests got answered fast, by the person who actually owned the problem. The house was inspected before every arrival by someone whose name was on it. When something broke, it got fixed that day and the guest heard about it from us first. Reliability, repeated, reads as luxury.",
  },
];

/** Why the owner-operator seat was worth sitting in. */
const OPERATOR_LESSONS = [
  {
    title: "You feel the whole P&L",
    body: "When the cleaning invoice, the platform fee, and the occupancy tax all come out of your own deposit, you stop talking about gross revenue. It is why Frontier's fee is charged on net rental income, and why we say so out loud.",
  },
  {
    title: "You learn what actually moves the calendar",
    body: "A year of adjusting rates on your own property teaches more than any pricing tool dashboard. You find out which levers matter in this market, and which ones are noise.",
  },
  {
    title: "You hear the feedback unfiltered",
    body: "No account manager softened a review before it reached us. Standing in the house reading what a guest actually wrote is a different kind of education, and it made us better at protecting somebody else's rating.",
  },
  {
    title: "You never have to guess what an owner is feeling",
    body: "The quiet week, the surprise repair, the review that stings. We have had all of it on our own balance sheet, which is why we manage other people's cabins the way we wanted ours managed.",
  },
];

export default function OldBrokenBowHighwayPage() {
  if (!property) return notFound();

  return (
    <>
      <JsonLd
        type="Article"
        data={{
          headline: PAGE_TITLE,
          description: PAGE_DESCRIPTION,
          url: `${siteConfig.url}/old-broken-bow-highway`,
          image: property.images.map((img) => `${siteConfig.url}${img.src}`),
          author: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          about: {
            "@type": "Place",
            name: "Old Broken Bow Highway",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Broken Bow",
              addressRegion: "OK",
              addressCountry: "US",
            },
          },
        }}
      />

      {/* ── 1. Editorial masthead ────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 md:pb-20">
          <Breadcrumbs
            items={[
              { label: "Properties", href: "/search" },
              { label: "Old Broken Bow Highway" },
            ]}
          />

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            <span>Broken Bow, Oklahoma</span>
            <span>Retired from the rental program</span>
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-sm font-medium text-sage md:text-base">
                Frontier&apos;s first year, in one house.
              </p>
              <h1 className="mt-5 text-[2.7rem] font-bold leading-[0.92] tracking-tight text-charcoal sm:text-6xl lg:text-[4.25rem]">
                The house we learned this business on.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Old Broken Bow Highway was a 3-bedroom poolside house, and for
                Frontier&apos;s first year it was the whole company. We listed
                it, priced it, cleaned it, and hosted it ourselves. It is no
                longer available to book — but every standard we hold an
                owner&apos;s cabin to today was written here first.
              </p>
            </div>

            <div className="lg:pt-4">
              <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                The property
              </div>
              <dl className="mt-4 text-sm">
                {[
                  ["Layout", `${property.bedrooms}BR / ${property.bathrooms}BA house, sleeps ${property.sleeps}`],
                  ["Standout", "Private outdoor pool and firepit"],
                  ["Role", "Frontier's original owner-operated rental"],
                  ["Status", "No longer available to book"],
                ].map(([term, detail]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-3"
                  >
                    <dt className="text-muted-foreground">{term}</dt>
                    <dd className="font-medium text-charcoal">{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. The first-year ledger ─────────────────────────────────── */}
      <section className="border-y border-border bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {FIRST_YEAR_LEDGER.map((item) => (
            <div
              key={item.stat}
              className="border-border px-5 py-9 lg:border-l lg:px-8 [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:[&:first-child]:border-l-0 lg:[&:nth-child(n+3)]:border-t-0"
            >
              <div className="font-heading text-3xl font-bold leading-none text-charcoal md:text-4xl">
                {item.stat}
              </div>
              <div className="mt-3 text-xs leading-relaxed text-muted-foreground md:text-sm">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Archive photography ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            From the archive
          </div>
          <div className="mt-8">
            <ImageGallery images={property.images} propertyName={property.name} />
          </div>
          <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
            Listing photography from the years Frontier operated the house on
            Old Broken Bow Highway.
          </p>
        </div>
      </section>

      {/* ── 4. The year, in four chapters ────────────────────────────── */}
      <section className="bg-forest text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <div className="border-t border-white/25 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/50">
                How the first year went
              </div>
              <h2 className="mt-6 text-4xl font-bold leading-[0.92] text-white md:text-5xl lg:text-6xl">
                One house, run properly, for a full calendar year.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                No portfolio to hide a bad month in, and no staff to blame a bad
                clean on. Just a single listing and whatever we could learn from
                it before the next guest arrived.
              </p>
            </div>

            <ul>
              {CHAPTERS.map((chapter, i) => (
                <li
                  key={chapter.title}
                  className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/15 py-7 md:py-8"
                >
                  <span className="font-heading text-2xl font-bold leading-none text-white/35 md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-heading text-xl font-semibold tracking-wide text-white md:text-2xl">
                      {chapter.title}
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                      {chapter.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 5. Why owner-operating was worth it ──────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
            On being the owner and the operator
          </div>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold leading-[1.05] tracking-tight text-charcoal md:text-4xl lg:text-5xl">
            Sitting in both seats is the best thing that ever happened to this
            company.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Managing your own rental is a slower way to build a management
            business and a much better one. You cannot learn any of the
            following from a spreadsheet.
          </p>

          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {OPERATOR_LESSONS.map((lesson) => (
              <div key={lesson.title} className="border-t border-border pt-5">
                <h3 className="font-heading text-lg font-semibold text-charcoal md:text-xl">
                  {lesson.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {lesson.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Where the standard lives now ──────────────────────────── */}
      <section className="border-t border-border bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                This property is no longer available
              </div>
              <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-tight text-charcoal md:text-3xl">
                Old Broken Bow Highway is out of the rental program. The way it
                was run is not.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                The same weekly pricing work, the same turnover standard, and
                the same answer-the-guest-yourself habit now run on{" "}
                <Link
                  href="/sublime"
                  className="font-medium text-charcoal underline underline-offset-4"
                >
                  Sublime Retreat
                </Link>{" "}
                and on every owner&apos;s cabin Frontier manages.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:shrink-0">
              <Button
                asChild
                size="lg"
                className="bg-sage text-white hover:bg-sage-dark px-8 text-base"
              >
                <Link href="/search">Browse available cabins</Link>
              </Button>
              <DiscoveryCTALink
                source="old_broken_bow_highway_retrospective"
                href="/contact#discovery"
                className="group inline-flex items-center gap-2 text-base font-medium text-charcoal underline-offset-4 hover:underline"
              >
                I own a cabin, let&apos;s talk
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </DiscoveryCTALink>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Want your cabin run the way we ran ours?"
        subtext="Free listing audit for Broken Bow and Hochatown owners, or a 30-minute call with Hunter."
        cta={{ label: "Run my free listing audit", href: "/audit#full-audit" }}
        secondaryCta={{ label: "Schedule a Call", href: "/contact#discovery" }}
      />
    </>
  );
}
