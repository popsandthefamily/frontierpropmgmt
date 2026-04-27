import type { Metadata } from "next";
import Link from "next/link";
import { Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FlagshipCaseStudySection } from "@/components/sections/flagship-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Broken Bow Cabin Management Fees: What 20% Should Include | Frontier",
  description:
    "What property management fees actually cover in Broken Bow — what a clean 20% should include, what's billed separately at cost, and the hidden fees to watch for before you sign.",
  keywords: [
    "Broken Bow cabin management fees",
    "Hochatown property management fees",
    "vacation rental management cost Broken Bow",
    "cabin management percentage Broken Bow",
    "STR management fees Oklahoma",
    "Airbnb management fee Broken Bow",
  ],
  openGraph: {
    title: "Broken Bow Cabin Management Fees: What 20% Should Include",
    description:
      "Honest fee breakdown for Broken Bow STR management. What's bundled, what's pass-through, and what's a red flag.",
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
      "https://rentwithfrontier.com/broken-bow-cabin-management-fees",
  },
};

const includedInFee = [
  "Daily dynamic pricing and revenue management",
  "Listing build, copy, and optimization on Airbnb, VRBO, and Booking.com",
  "Direct booking site integration to lower platform dependence",
  "Guest communication, screening, and review handling",
  "Cleaner scheduling and post-clean photo QC",
  "Maintenance vendor dispatch and oversight",
  "Owner financial reporting and tax documentation",
  "Permit and occupancy-tax compliance support",
];

const passThrough = [
  {
    label: "Cleaning turnovers",
    detail: "Charged to guests, no markup, zero owner impact.",
  },
  {
    label: "Maintenance and repairs",
    detail:
      "Itemized at cost on the monthly statement. Anything over $300 needs your approval.",
  },
  {
    label: "Utilities, internet, streaming",
    detail: "Stay on your existing accounts. We do not touch them.",
  },
  {
    label: "Consumables and linens",
    detail: "Billed at vendor cost when restocked.",
  },
  {
    label: "Platform host fees (Airbnb 3%, VRBO 5%)",
    detail:
      "Deducted by the platform before payout reaches us — separate from the management fee.",
  },
  {
    label: "Permit renewals and tax filings",
    detail: "Whatever the city or state agency charges, no coordination markup.",
  },
];

const redFlags = [
  {
    title: "Headline percentage that does not include marketing",
    detail:
      "If listing copy, dynamic pricing, and platform marketing are billed separately on top of the percentage, the real cost is much higher than advertised.",
  },
  {
    title: "Setup or onboarding fee",
    detail:
      "Common range is $0 to $1,500. Frontier charges $0. A setup fee is the manager hedging against you cancelling — it usually correlates with longer lock-in contracts too.",
  },
  {
    title: "Monthly minimum",
    detail:
      "Some managers charge a flat monthly minimum regardless of bookings. That is fine if you have a high-occupancy cabin, but devastating during shoulder season or after a maintenance closure.",
  },
  {
    title: "Markup on cleaning or maintenance",
    detail:
      "Pass-through costs should be at vendor cost. A 10–20% markup on cleaning and maintenance is invisible on the headline rate but adds real dollars per booking.",
  },
  {
    title: "Mandatory photo packages",
    detail:
      "Professional photos are valuable, but they should be optional add-ons, not a required line item that turns a 20% rate into 25% on year one.",
  },
  {
    title: "Long lock-in contracts with early-termination fees",
    detail:
      "Month-to-month with a 30-day exit is the cabin-owner-friendly default. Anything longer protects the manager more than it protects you.",
  },
];

type FeeKey = "frontier" | "typicalLocal" | "national";

const FEE_COLUMNS: { key: FeeKey; label: string; highlight?: boolean }[] = [
  { key: "frontier", label: "Frontier (boutique)", highlight: true },
  { key: "typicalLocal", label: "Typical local manager" },
  { key: "national", label: "National PMS" },
];

const FEE_ROWS: { label: string; values: Record<FeeKey, string> }[] = [
  {
    label: "Headline management fee",
    values: {
      frontier: "20% of nightly-rental revenue",
      typicalLocal: "20–30%",
      national: "25–40%",
    },
  },
  {
    label: "Setup fee",
    values: {
      frontier: "$0",
      typicalLocal: "$0–$1,500",
      national: "Often required",
    },
  },
  {
    label: "Monthly minimum",
    values: {
      frontier: "$0",
      typicalLocal: "Sometimes",
      national: "Common",
    },
  },
  {
    label: "Cleaning markup",
    values: {
      frontier: "$0 — pass-through at vendor cost",
      typicalLocal: "Varies",
      national: "Common, often hidden",
    },
  },
  {
    label: "Maintenance markup",
    values: {
      frontier: "$0 — itemized at cost",
      typicalLocal: "Varies",
      national: "Common",
    },
  },
  {
    label: "Required photo package",
    values: {
      frontier: "Optional add-on",
      typicalLocal: "Sometimes required",
      national: "Often required",
    },
  },
  {
    label: "Contract length",
    values: {
      frontier: "Month-to-month, 30-day exit",
      typicalLocal: "Often 12 months",
      national: "Often 12+ months",
    },
  },
];

const pageFAQ = [
  {
    question:
      "What is the typical Broken Bow cabin management fee?",
    answer:
      "Most professional STR managers in the Broken Bow / Hochatown area charge between 20% and 30% of nightly-rental revenue. National PMS companies range from 25% to 40%. Frontier charges 20% with $0 setup and $0 monthly minimum.",
  },
  {
    question: "Is the management fee taken out before or after platform fees?",
    answer:
      "Platform host fees (Airbnb 3%, VRBO 5%) are deducted by the platform before any payout reaches the manager. The 20% management fee is then calculated on nightly-rental revenue. Cleaning and pet fees pass through directly to cleaners and are not part of the 20%.",
  },
  {
    question: "Are there hidden fees on top of the 20%?",
    answer:
      "Not at Frontier. There is no setup fee, no monthly minimum, no markup on cleaning or maintenance, and no mandatory photo package. Pass-through costs (linens, consumables, vendor invoices) are billed at vendor cost. Anything over $300 in maintenance requires your approval first.",
  },
  {
    question: "What does a 20% fee actually cover?",
    answer:
      "Daily dynamic pricing, listing optimization across Airbnb / VRBO / Booking.com, direct booking site integration, guest communication and screening, cleaner scheduling and QC, vendor dispatch and oversight, owner financial reporting, and permit / tax compliance support. The detail page is /management-services.",
  },
  {
    question: "What if my cabin earns $0 in a month?",
    answer:
      "You owe Frontier $0. The 20% is a percentage of revenue — there is no monthly minimum.",
  },
  {
    question: "Can I cancel if the fee structure stops working for me?",
    answer:
      "Yes. Frontier is month-to-month with a 30-day cancellation. No early-termination fees. Listing ownership and reviews stay yours.",
  },
  {
    question: "Where can I see the gap on my own listing first?",
    answer:
      "Run the free listing audit. It analyzes your specific Airbnb or VRBO listing against current AirROI market data and shows the revenue gap before any fee discussion.",
  },
];

export default function BrokenBowCabinManagementFeesPage() {
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
        backgroundImage="/images/services/DSC3079.jpg"
        title="Broken Bow Cabin Management Fees"
        subtitle="What a clean 20% should include, what's billed separately at cost, and the hidden fees that turn 20% into 30% on year one."
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
          { label: "Broken Bow Cabin Management Fees" },
        ]}
      />

      {/* Honest intro */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What 20% should actually buy you
          </h2>
          <p>
            Most Broken Bow cabin managers quote a percentage and stop there.
            The honest comparison is what is bundled into that percentage and
            what is layered on top of it.
          </p>
          <p>
            Frontier&apos;s headline rate is 20% of nightly-rental revenue,
            with $0 setup, $0 monthly minimum, and no markup on cleaning,
            maintenance, or vendor invoices. Below is exactly what that 20%
            covers, what is billed separately at cost, and the patterns to
            watch for in any management agreement before you sign.
          </p>
        </div>
      </SectionWrapper>

      {/* What 20% covers */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What the 20% covers
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Bundled into the headline rate. No add-ons required.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {includedInFee.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-lg bg-cream/50 p-4"
              >
                <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                <span className="text-sm text-charcoal md:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Pass-through */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Billed separately, at cost
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Real cabin costs that exist regardless of who manages the
              property. Pass-through items show up itemized on the monthly
              owner statement, with the receipt.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {passThrough.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-sage/20 bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <Check className="mt-1 size-5 shrink-0 text-sage" />
                  <div>
                    <div className="text-base font-semibold text-charcoal">
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Red flags */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Six fee patterns to watch for before you sign
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              These are not always deal-breakers — but they should be priced
              into the &ldquo;real&rdquo; rate, not the headline one.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {redFlags.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-1 size-5 shrink-0 text-amber-500" />
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">
                      {item.title}
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

      {/* Side-by-side fee model */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Fee structure side-by-side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Category-level. Specific managers vary; this is the typical
              shape of each tier.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Compare
                  </th>
                  {FEE_COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest",
                        col.highlight
                          ? "bg-sage/10 text-sage"
                          : "text-muted-foreground",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 text-left text-sm font-medium text-charcoal align-top"
                    >
                      {row.label}
                    </th>
                    {FEE_COLUMNS.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          "px-4 py-4 align-top text-sm",
                          col.highlight
                            ? "bg-sage/5 font-semibold text-charcoal"
                            : "text-muted-foreground",
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {col.highlight && (
                            <Check className="mt-0.5 size-4 shrink-0 text-sage" />
                          )}
                          <span>{row.values[col.key]}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SectionWrapper>

      {/* Flagship */}
      <FlagshipCaseStudySection
        background="white"
        eyebrow="Why Frontier writes this from experience"
      />

      {/* Internal links */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Keep researching
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Specific service detail and how the audit funnel works.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/management-services">
                Full services and pricing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/best-hochatown-property-management-company">
                Best Hochatown management company
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/switch-property-managers-broken-bow">
                Switching property managers
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="white">
        <FAQSection
          title="Broken Bow management fees — common questions"
          questions={pageFAQ}
        />
      </SectionWrapper>

      <CTASection
        heading="See the real revenue side of the fee equation"
        subtext={`Free, takes about 90 seconds. Run the audit on your listing first — then compare it to whatever fee any manager quotes you. ${siteConfig.phone}`}
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
