import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  DollarSign,
  Calendar,
  Compass,
  TreePine,
  Waves,
  UtensilsCrossed,
  Music,
  Fish,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { WazeEmbed } from "@/components/embeds/waze-embed";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title:
    "Discover Broken Bow & Hochatown, Things to Do, Where to Stay, Local Tips",
  description:
    "Your guide to Broken Bow & Hochatown, Oklahoma. Best neighborhoods, Beavers Bend activities, fishing, hiking, restaurants & tips for the perfect cabin trip.",
  openGraph: {
    title: "Discover Broken Bow & Hochatown, Complete Visitor Guide",
    description:
      "Best spots, things to do, where to stay in Broken Bow & Hochatown. Plan your Oklahoma cabin getaway.",
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/discover-broken-bow",
  },
};

const neighborhoods = [
  {
    name: "North Hochatown",
    subtitle: "Near Beavers Bend Marina",
    description:
      "Great for lake access and families. Larger cabins and higher rates in summer. Close to the marina, state park, and outdoor adventures.",
    icon: Waves,
  },
  {
    name: "Central Hochatown",
    subtitle: "On Highway 259",
    description:
      "Walkable to restaurants, wineries, and mini-golf. Lively at night with easy access to shops and entertainment. The social hub of the area.",
    icon: MapPin,
  },
  {
    name: "South / Broken Bow City",
    subtitle: "Quieter & Value-Friendly",
    description:
      "Quieter atmosphere with value-friendly pricing. Just a 10-15 minute drive to Hochatown. Perfect for guests who prefer peace and privacy.",
    icon: TreePine,
  },
];

const moneyTips = [
  {
    icon: Calendar,
    tip: "Travel mid-week for approximately 10-25% lower nightly rates compared to weekends.",
  },
  {
    icon: DollarSign,
    tip: "Ask about additional fees upfront, cleaning fees, pet fees, and hot tub fees can add up.",
  },
  {
    icon: Ticket,
    tip: "Look for new listings with lower introductory pricing as owners build up reviews.",
  },
  {
    icon: MapPin,
    tip: "Check drive times to the lake and Hochatown strip before booking, some cabins are more remote.",
  },
  {
    icon: Compass,
    tip: "Verify amenities before booking, confirm Wi-Fi speed, EV charging, game rooms, and pool availability.",
  },
];

const activities = [
  {
    name: "Beavers Bend State Park",
    description:
      "Hiking, kayaking, fishing, and nature trails. The crown jewel of the Broken Bow area with year-round outdoor activities.",
    icon: TreePine,
  },
  {
    name: "Hochatown Attractions",
    description:
      "Mini-golf, go-karts, escape rooms, wineries, and shopping. The main strip offers entertainment for all ages.",
    icon: Ticket,
  },
  {
    name: "Local Restaurants",
    description:
      "From BBQ joints and pizza to fine dining and craft breweries. Hochatown's food scene has grown dramatically in recent years.",
    icon: UtensilsCrossed,
  },
  {
    name: "Fishing & Lake Activities",
    description:
      "Broken Bow Lake offers world-class trout fishing, kayaking, paddleboarding, and boat rentals.",
    icon: Fish,
  },
  {
    name: "Bars & Nightlife",
    description:
      "Live music venues, craft cocktail bars, and wineries make Hochatown surprisingly vibrant after dark.",
    icon: Music,
  },
];

const discoverFAQ = [
  {
    question: "How far is Hochatown from Broken Bow?",
    answer:
      "Hochatown is approximately 10-15 minutes north of Broken Bow along Highway 259. The two areas are closely connected, and most visitors use both interchangeably when planning their trip.",
  },
  {
    question: "Are there pet-friendly cabin options?",
    answer:
      "Yes! Many cabins in the Broken Bow and Hochatown area are pet-friendly, including several of our managed properties. Pet fees typically range from $50-$150 depending on the property. Always confirm pet policies before booking.",
  },
  {
    question: "When is the best time to book?",
    answer:
      "The area is popular year-round, but fall foliage season (October-November) and summer are peak times. We recommend booking 2-4 weeks in advance for peak dates and at least 1 week for off-season stays. The earlier you book, the more options you will have.",
  },
  {
    question: "Do you book cabins directly?",
    answer:
      "Yes! We manage several cabins in the Broken Bow and Hochatown area that can be booked directly through our website. Booking direct means you avoid platform fees and get the best rate guaranteed. Visit our search page to see available properties.",
  },
];

export default function DiscoverBrokenBowPage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: discoverFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      {/* Hero */}
      <HeroSection
        backgroundImage="/images/discover/hochatown-area.png"
        title="Discover Broken Bow & Hochatown"
        subtitle="Learn more about what makes this place so special"
        size="medium"
        overlay="dark"
      />

      {/* Hocha.Town partner highlight */}
      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-12">
            <a
              href="https://hocha.town"
              target="_blank"
              rel="noopener noreferrer"
              className="block shrink-0 transition-opacity hover:opacity-80"
              aria-label="Visit Hocha.Town"
            >
              <Image
                src="/images/partners/hocha-town-logo.webp"
                alt="Hocha.Town logo"
                width={240}
                height={240}
                className="mx-auto h-40 w-auto md:h-48"
                priority
              />
            </a>
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-peach">
                Trusted local resource
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                Planning a trip? Check Hocha.Town first.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                Hocha.Town is the most complete local guide to Hochatown and
                Broken Bow, curated by people who live here. Restaurants,
                activities, event calendars, and honest recommendations for
                every kind of trip. We send every guest there.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 bg-peach text-charcoal hover:bg-peach/90 px-6 text-base font-semibold"
              >
                <a
                  href="https://hocha.town"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Hocha.Town
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Spots */}
      <SectionWrapper background="white">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Best Spots in Hochatown
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Each area has its own personality. Here is what to expect depending
            on where you stay.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {neighborhoods.map((area) => (
            <Card key={area.name} className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-sage/10 p-3">
                  <area.icon className="size-6 text-sage" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-charcoal">
                  {area.name}
                </h3>
                <p className="mb-3 text-sm font-medium text-sage">
                  {area.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Money-Saving Tips */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Money-Saving Tips
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get the most out of your Broken Bow trip without breaking the
              bank.
            </p>
          </div>

          <div className="space-y-4">
            {moneyTips.map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage/10">
                  <item.icon className="size-5 text-sage" />
                </div>
                <p className="text-charcoal">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Things To Do */}
      <SectionWrapper background="white">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Things To Do Near Your Cabin
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From outdoor adventures to nightlife, there is something for
            everyone in the Broken Bow area.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Card key={activity.name} className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex rounded-lg bg-sage/10 p-3">
                  <activity.icon className="size-6 text-sage" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  {activity.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Owner CTA */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateInView>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Own a Hochatown Cabin?
            </h2>
            <p className="mb-4 text-lg text-white/90">
              Turn views into bookings. Frontier Property Management handles
              everything from professional photography and listing optimization
              to guest communication and cleaning coordination.
            </p>
            <p className="mb-8 text-white/80">
              Our owners typically see a 15-30% revenue increase within the
              first 6 months.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
            >
              <Link href="/management-services">Learn About Our Services</Link>
            </Button>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* Traffic Map */}
      <SectionWrapper background="white">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Live Traffic Map
          </h2>
          <p className="mt-4 text-muted-foreground">
            Check real-time traffic conditions around Broken Bow and Hochatown
            before you hit the road.
          </p>
        </div>
        <WazeEmbed className="mx-auto max-w-4xl" />
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="cream">
        <FAQSection questions={discoverFAQ} />
      </SectionWrapper>

      {/* Final CTA */}
      <CTASection
        heading="Need help choosing or promoting a cabin?"
        subtext="Whether you are looking for the perfect getaway or want to maximize your cabin's revenue, Frontier is here to help."
        cta={{ label: "Explore Properties", href: "/search" }}
        secondaryCta={{
          label: "Management Services",
          href: "/management-services",
        }}
      />
    </>
  );
}
