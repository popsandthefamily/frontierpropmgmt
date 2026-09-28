import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { HeroSnapshot } from "@/components/audit/hero-snapshot";
import { Tier2Form } from "@/components/audit/tier2-form";
import { Button } from "@/components/ui/button";
import { hochatownMarket } from "@/data/hochatown-market";
import { plans, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Broken Bow Cabin Rental Income Calculator | Frontier" },
  description: `What a 3-bedroom Broken Bow or Hochatown cabin earns: median and top-quartile revenue and occupancy from AirROI, as of ${hochatownMarket.asOf}. Free listing audit.`,
  openGraph: {
    url: "https://www.rentwithfrontier.com/income-calculator",
    title: "Broken Bow Cabin Rental Income Calculator",
    description:
      "Median and top-quartile revenue for a 3-bedroom Broken Bow or Hochatown cabin, plus a free audit of your own listing.",
    images: [
      {
        url: "/images/hero/foggy-mountain.jpg",
        width: 1200,
        height: 630,
        alt: "Broken Bow cabin revenue calculator",
      },
    ],
  },
  alternates: {
    canonical: "https://www.rentwithfrontier.com/income-calculator",
  },
};

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const pct = (n: number) => `${Math.round(n * 100)}%`;

/**
 * Crawlable context around the calculator. The snapshot figures are static,
 * captured monthly from AirROI into src/data/hochatown-market.ts; nothing
 * here is a live feed and the copy says so. Only 3-bedroom data exists, so
 * no other bedroom counts are shown or estimated.
 */
export default function IncomeCalculatorPage() {
  const m = hochatownMarket;
  const rows = [
    { label: "Median annual revenue", value: fmt(m.marketMedian) },
    { label: "Top-quartile annual revenue (75th percentile)", value: fmt(m.marketTopQuartile) },
    { label: "Gap between median and top quartile", value: fmt(m.gapToTop) },
    { label: "Median occupancy", value: pct(m.occupancyRate) },
  ];

  return (
    <>
      <HeroSection
        backgroundImage="/images/hero/foggy-mountain.jpg"
        title="Broken Bow Cabin Rental Income Calculator"
        subtitle="What a 3-bedroom cabin earns here, from real market data"
        size="medium"
        overlay="dark"
      />

      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Free income &amp; occupancy estimate
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The benchmark below is an AirROI market snapshot for a
              3-bedroom Broken Bow or Hochatown cabin, captured {m.asOf}. Want
              figures for your own listing? Paste its URL and we&apos;ll run
              the full audit against current data.
            </p>
          </div>
          <div className="space-y-8">
            <HeroSnapshot auditHref="#full-audit" />
            <Tier2Form />
          </div>
        </div>
      </SectionWrapper>

      {/* Crawlable version of the numbers, and how to read them */}
      <SectionWrapper background="cream" id="benchmarks">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How much does a 3-bedroom cabin make in Broken Bow?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            For a 3-bedroom cabin in the Broken Bow and Hochatown market, the
            median expected annual revenue is {fmt(m.marketMedian)} at about{" "}
            {pct(m.occupancyRate)} occupancy. Cabins in the top
            quarter of the market earn {fmt(m.marketTopQuartile)} or more.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
            <table className="w-full text-left text-sm">
              <caption className="border-b border-charcoal/10 px-5 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground">
                3-bedroom cabin, Broken Bow / Hochatown. Source: AirROI, captured {m.asOf}.
              </caption>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-charcoal/5 last:border-0">
                    <th scope="row" className="px-5 py-3 font-medium text-charcoal">
                      {r.label}
                    </th>
                    <td className="px-5 py-3 text-right font-semibold text-charcoal">
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-10 text-xl font-bold text-charcoal">
            What these numbers are, and are not
          </h3>
          <ul className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-charcoal">Revenue, not take-home.</strong>{" "}
              This is AirROI&apos;s estimate of what the cabin books, before
              the costs of running it: platform fees, taxes, cleaning,
              supplies, utilities, maintenance, insurance, and any
              management fee.
            </li>
            <li>
              <strong className="text-charcoal">A snapshot, not a live feed.</strong>{" "}
              We capture the benchmark from AirROI roughly monthly so the page
              loads instantly. The listing audit queries current data for your
              specific cabin.
            </li>
            <li>
              <strong className="text-charcoal">3-bedroom cabins only.</strong>{" "}
              Two-bedroom and four-plus-bedroom cabins earn differently, and we
              do not publish figures we have not measured. Run the audit on
              your own listing for a like-for-like comparison.
            </li>
            <li>
              <strong className="text-charcoal">The gap is the opportunity.</strong>{" "}
              The {fmt(m.gapToTop)} between the median and top-quartile cabin
              is mostly pricing, listing quality, reviews, and amenities, not
              location. That is what the audit looks for.
            </li>
          </ul>

          <h3 className="mt-10 text-xl font-bold text-charcoal">
            From gross revenue to what you keep
          </h3>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Management fees are where two quotes that look the same diverge.
            Frontier&apos;s full-service fee is {plans.manager.feeInline},
            meaning {plans.manager.feeBase}, and cleaning fees never enter the
            base. See{" "}
            <Link href="/broken-bow-cabin-management-fees" className="font-medium text-sage hover:underline">
              how Broken Bow management fees compare
            </Link>{" "}
            or{" "}
            <Link href="/pricing" className="font-medium text-sage hover:underline">
              our pricing
            </Link>
            . If the cabin is a second home you do not rent, the question is
            care rather than revenue: see{" "}
            <Link href={plans.concierge.href} className="font-medium text-sage hover:underline">
              second home care
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-charcoal md:text-3xl">
          Want the cabin run for you?
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-base text-muted-foreground">
          {siteConfig.name} manages cabins in Broken Bow and Hochatown at{" "}
          {plans.manager.feeInline}.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-sage px-8 text-base font-semibold text-white hover:bg-sage-dark"
        >
          <Link href={plans.manager.href}>See full-service management</Link>
        </Button>
      </SectionWrapper>
    </>
  );
}
