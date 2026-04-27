import type { Metadata } from "next";
import Link from "next/link";
import { Check, Clock, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FlagshipCaseStudySection } from "@/components/sections/flagship-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title:
    "How to Switch Property Managers in Broken Bow Without Losing Reviews | Frontier",
  description:
    "Step-by-step guide to switching cabin property managers in Broken Bow / Hochatown — what to check in your current contract, how listing ownership transfers, and how to keep your Airbnb / VRBO reviews.",
  keywords: [
    "switch property manager Broken Bow",
    "change cabin manager Hochatown",
    "transfer Airbnb listing property manager",
    "keep Airbnb reviews when switching managers",
    "leave property management company Broken Bow",
    "property management transition Broken Bow",
  ],
  openGraph: {
    title: "How to Switch Property Managers in Broken Bow Without Losing Reviews",
    description:
      "Honest guide to a clean handoff — contract review, listing transfer, review preservation, and the full transition timeline.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Cabin managed by Frontier Property Management",
      },
    ],
  },
  alternates: {
    canonical:
      "https://rentwithfrontier.com/switch-property-managers-broken-bow",
  },
};

const beforeYouLeave = [
  {
    title: "Check the cancellation clause",
    detail:
      "Find the notice period (typically 30 to 60 days) and any early-termination fees. If your contract has automatic renewal, note the renewal date — that's often the cleanest exit window.",
  },
  {
    title: "Confirm who owns the listings",
    detail:
      "Most owner-friendly contracts say the Airbnb, VRBO, and Booking.com listings are owned by you. Some contracts give the manager listing ownership — that's the single biggest red flag for switching, because it can mean reviews stay with them, not with you.",
  },
  {
    title: "Pull copies of your data",
    detail:
      "Owner statements, guest databases (where allowed), maintenance logs, supply inventories, and high-quality photos. Get them now — manager systems sometimes lock you out fast after notice.",
  },
  {
    title: "Block the calendar past your exit",
    detail:
      "If your current manager keeps taking bookings during your notice period, you'll inherit them. That's fine if the new manager is ready — frustrating if they're not.",
  },
  {
    title: "Inventory the cabin",
    detail:
      "Photo and document everything provided by the current manager (linens, consumables, supplies). Anything they own should be reconciled at handoff, not after.",
  },
];

const transitionSteps = [
  {
    days: "Days 0–2",
    title: "Notice + kickoff",
    description:
      "You give written notice to your current manager per their contract. Frontier signs a simple owner-protective agreement with you. We pull your current listing and pricing data and start the audit.",
  },
  {
    days: "Days 3–5",
    title: "Listing ownership transfer",
    description:
      "We coordinate the listing transfer on Airbnb, VRBO, and Booking.com so reviews and ratings stay with the listing, not the prior manager. If the previous manager held listing ownership, we walk through the platform-specific dispute path.",
  },
  {
    days: "Days 5–7",
    title: "Listing rewrite + pricing setup",
    description:
      "Listing copy refreshed, photos audited, dynamic pricing configured for Hochatown demand and event weekends. Local cleaning and maintenance vendors onboarded for your cabin.",
  },
  {
    days: "Days 7–10",
    title: "Calendar sync + go live",
    description:
      "We sync all platform calendars, set up your owner portal, test the full guest communication workflow, and go live. Bookings start flowing through Frontier.",
  },
  {
    days: "Days 10–14",
    title: "Fine-tuning + first owner statement",
    description:
      "We monitor performance, adjust pricing for the season, and handle any first-booking edge cases. You receive your first weekly update, then your first monthly owner statement.",
  },
];

const reviewsAnswer = [
  {
    point: "Reviews live on the listing, not the manager",
    detail:
      "On Airbnb, VRBO, and Booking.com, ratings and review history are attached to the listing. If listing ownership transfers cleanly to your account or your new manager's account, the reviews come with it.",
  },
  {
    point: "Listing ownership is the linchpin",
    detail:
      "Whoever has admin access to the listing controls the asset. Your current contract should say the listings are owned by you. If it doesn't, that's the conversation to have — ideally before notice.",
  },
  {
    point: "Direct booking review history is a separate asset",
    detail:
      "If you have a direct booking site or off-platform review collection, get exports before transition. These don't auto-transfer.",
  },
];

const switchingMyths = [
  {
    myth: "I'll lose all my reviews if I switch.",
    truth:
      "Not true on Airbnb, VRBO, or Booking.com if listing ownership transfers cleanly. Reviews are tied to the listing.",
  },
  {
    myth: "There will be a long booking gap during the transition.",
    truth:
      "There doesn't need to be. With the calendar sync done right, bookings keep flowing — sometimes the new manager simply takes over the next reservation.",
  },
  {
    myth: "Switching is too much work for the savings.",
    truth:
      "If a 5–10% revenue gap exists on your listing, switching pays for itself within months. Run the free audit first to see whether the gap is real for your specific cabin.",
  },
  {
    myth: "My current manager won't cooperate.",
    truth:
      "Some don't, which is why your contract terms matter. Even with a non-cooperative outgoing manager, the platforms have owner-side processes for reclaiming a listing.",
  },
];

const pageFAQ = [
  {
    question:
      "Will I lose my Airbnb or VRBO reviews if I switch property managers?",
    answer:
      "No, as long as listing ownership transfers cleanly to your account or your new manager's account. Reviews are attached to the listing on Airbnb, VRBO, and Booking.com — they move with the listing, not the manager.",
  },
  {
    question: "How long does it take to switch managers?",
    answer:
      "Most transitions take 10 to 14 days from the day you give notice — assuming your current contract allows a 30-day exit and your current manager cooperates with the listing transfer. Frontier handles the entire transition operation; the only thing required from you is the notice itself.",
  },
  {
    question: "What if my current contract has a long lock-in?",
    answer:
      "Read the cancellation clause carefully — many \"long\" contracts have an annual renewal date with a clean exit window in front of it. Even with a strict early-termination fee, the math sometimes still works if a real revenue gap exists on your listing. Run the free audit first to know.",
  },
  {
    question:
      "Will there be a gap in bookings during the transition?",
    answer:
      "Not necessarily. Calendars stay synced through the handoff, and the next reservation simply transitions to the new manager. The bigger risk is your previous manager taking bookings into your post-exit window — handle that by blocking the calendar past your exit date.",
  },
  {
    question: "Does Frontier charge to onboard a switched listing?",
    answer:
      "No. Frontier charges $0 setup, $0 monthly minimum, and 20% of nightly-rental revenue going forward. The transition is part of how we earn your business.",
  },
  {
    question:
      "What documentation should I pull from my current manager before switching?",
    answer:
      "Owner statements, the full booking calendar, guest databases where you're allowed access, maintenance logs, supply inventory, and high-quality photo originals. The goal is to leave with the asset history, not just the cabin keys.",
  },
  {
    question: "Where do I start?",
    answer: `Run the free listing audit. It analyzes your specific Airbnb or VRBO listing against current AirROI market data and shows the revenue gap before any transition conversation. If the gap is real, switching is worth the work. If it isn't, we'll tell you that. Phone: ${siteConfig.phone}.`,
  },
];

export default function SwitchPropertyManagersBrokenBowPage() {
  return (
    <>
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: pageFAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <HeroSection
        backgroundImage="/images/discover/downtown-broken-bow.png"
        title="How to Switch Property Managers in Broken Bow"
        subtitle="Without losing reviews, without a booking gap, without surprises. The honest playbook."
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
          { label: "Switching Property Managers" },
        ]}
      />

      {/* Honest intro */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Switching is mostly a paperwork problem
          </h2>
          <p>
            The two questions every Broken Bow / Hochatown owner asks before
            switching managers are: &ldquo;Will I lose my reviews?&rdquo; and
            &ldquo;Will I lose bookings during the transition?&rdquo; The
            honest answers are: no and no — provided listing ownership is set
            up correctly and the new manager handles the calendar handoff
            cleanly.
          </p>
          <p>
            Below is the full playbook: what to check before you give notice,
            what the transition timeline actually looks like, what the myths
            are vs the reality, and where the real risks sit.
          </p>
        </div>
      </SectionWrapper>

      {/* Before you leave */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Five things to do before you give notice
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Do these in order. They take an evening of work and protect
              the asset history of your cabin.
            </p>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {beforeYouLeave.map((item, idx) => (
              <li
                key={item.title}
                className="rounded-2xl border border-sage/20 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                  Step {idx + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      {/* Transition timeline */}
      <SectionWrapper background="sage">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            The transition timeline with Frontier
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Most Broken Bow / Hochatown transitions land in 10 to 14 days end
            to end. Here is exactly what happens.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-0">
          {transitionSteps.map((step) => (
            <div
              key={step.days}
              className="flex gap-4 border-l-2 border-white/30 py-4 pl-6"
            >
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <Clock className="size-3" />
                  {step.days}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/80">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-white/70">
            30-day cancellation policy with Frontier going forward. Listing
            ownership and reviews stay yours.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
          >
            <Link href="/contact#discovery">Talk through a switch</Link>
          </Button>
        </div>
      </SectionWrapper>

      {/* Reviews explainer */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              How reviews actually transfer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The single most-asked question, answered straight.
            </p>
          </div>
          <ul className="mt-10 space-y-5">
            {reviewsAnswer.map((item) => (
              <li
                key={item.point}
                className="rounded-2xl border bg-cream/30 p-5"
              >
                <div className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-sage" />
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">
                      {item.point}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Myths */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Switching myths vs reality
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The four worries that keep owners stuck — and what&apos;s
              actually true.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {switchingMyths.map((item) => (
              <li
                key={item.myth}
                className="rounded-2xl border bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <X className="mt-1 size-5 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-muted-foreground line-through">
                      {item.myth}
                    </p>
                    <div className="mt-3 flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                      <p className="text-sm leading-relaxed text-charcoal">
                        {item.truth}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Real risk callout */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl rounded-2xl border border-amber-300 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 size-5 shrink-0 text-amber-600" />
            <div>
              <h3 className="text-lg font-semibold text-charcoal">
                The one real risk: listing ownership
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                The single switching scenario that does cause review loss is
                when the previous manager held listing ownership and refuses
                to transfer it. If your contract gives the manager listing
                ownership, address that before giving notice. Frontier&apos;s
                agreement keeps listings in your name, always.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Flagship */}
      <FlagshipCaseStudySection
        background="cream"
        eyebrow="Why Frontier writes this from experience"
      />

      {/* Internal links */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Keep researching
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Specifics on services, fees, and what good Hochatown management
            looks like.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/management-services">
                Full services and pricing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">
                Broken Bow management fees
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/best-hochatown-property-management-company">
                Best Hochatown management company
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="cream">
        <FAQSection
          title="Switching property managers — common questions"
          questions={pageFAQ}
        />
      </SectionWrapper>

      <CTASection
        heading="Thinking about switching?"
        subtext="Run the audit on your listing first — if the revenue gap is real, switching pays for itself fast."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Run my free listing audit", href: "/audit#full-audit" }}
        secondaryCta={{
          label: "Schedule a Discovery Call",
          href: "/contact#discovery",
        }}
      />
    </>
  );
}
