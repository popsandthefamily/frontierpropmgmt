import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FeeCalculator } from "@/components/tools/fee-calculator";
import { plans, siteConfig } from "@/data/site";
import { CTA } from "@/data/home-care";
import {
  computeFees,
  EXAMPLE_INPUTS,
  pctLabel,
  usd,
} from "@/lib/fee-math";

const PATH = "/management-fee-calculator";

export const metadata: Metadata = {
  title: { absolute: "Property Management Fee Calculator: Net vs Gross | Frontier" },
  description:
    "Is 20% of net cheaper than 20% of gross? Compare a cabin management fee on your own numbers: rent, cleaning fees, platform host fee, and the base used.",
  openGraph: {
    url: `${siteConfig.url}${PATH}`,
    title: "What Will I Actually Pay? Management Fee Calculator",
    description:
      "Compare 20% of net rental revenue with another manager's rate on your own cabin's numbers.",
    images: [
      {
        url: "/images/services/DSC3079-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cabin management fee calculator",
      },
    ],
  },
  alternates: { canonical: `${siteConfig.url}${PATH}` },
};

/**
 * The worked example is computed with the same function the calculator
 * uses, on the server, so the page carries crawlable numbers that always
 * match what the tool shows on first load.
 */
const example = computeFees(EXAMPLE_INPUTS);
const exampleNet = computeFees({ ...EXAMPLE_INPUTS, otherBase: "netRent" });
const exampleGrossRent = computeFees({ ...EXAMPLE_INPUTS, otherBase: "grossRent" });

const FAQ = [
  {
    question: "Is 20% of net cheaper than 20% of gross?",
    answer: `Yes, when both managers charge the same rate, because the net base is smaller. On a cabin with ${usd(EXAMPLE_INPUTS.rent)} in nightly revenue, ${usd(EXAMPLE_INPUTS.guestFees)} in cleaning and pet fees, and a ${pctLabel(EXAMPLE_INPUTS.hostFeeRate)} platform host fee, 20% of gross booking revenue is ${usd(example.otherFee)} a year and 20% of net rental revenue is ${usd(example.frontierFee)}, a difference of ${usd(example.difference)}.`,
  },
  {
    question: "What does 'net rental revenue' mean?",
    answer: `${plans.manager.feeDefinition}`,
  },
  {
    question: "Do management fees apply to cleaning fees?",
    answer:
      "It depends on the manager, and most do not say on their website. Some charge on the whole booking total, cleaning fee included. Frontier's base never includes cleaning or pet fees, and at least one other Broken Bow manager publishes the same exclusion. Ask any manager you are comparing.",
  },
  {
    question: "What else should I compare besides the percentage?",
    answer:
      "Setup or onboarding fees, monthly or technology fees, markups on cleaning and maintenance, required photo packages, and contract length. A lower headline rate with a monthly fee and a gross base can cost more than a higher rate on net. Our Broken Bow management fee comparison lists what local managers publish.",
  },
];

export default function ManagementFeeCalculatorPage() {
  return (
    <>
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3079.webp"
        title="What Will I Actually Pay?"
        subtitle="A property management fee calculator: 20% of net rental revenue against any other quote, on your own numbers."
        size="medium"
        overlay="dark"
      />

      <Breadcrumbs
        items={[
          { label: "Management Fees", href: "/broken-bow-cabin-management-fees" },
          { label: "Fee Calculator" },
        ]}
      />

      <SectionWrapper background="cream">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Two quotes, one set of numbers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The percentage is only half a quote. The other half is what it is
              charged on. Enter a year of your cabin&apos;s numbers, or keep the
              example, and change the other manager&apos;s rate and base.
            </p>
          </div>
          <FeeCalculator />
        </div>
      </SectionWrapper>

      {/* Crawlable worked example, computed with the calculator's own math */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            A worked example
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A cabin books {usd(EXAMPLE_INPUTS.rent)} in nightly revenue in a
            year and collects {usd(EXAMPLE_INPUTS.guestFees)} in cleaning and
            pet fees. The platform withholds a{" "}
            {pctLabel(EXAMPLE_INPUTS.hostFeeRate)} host fee. Here is 20% on
            each common base:
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-charcoal/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-charcoal/10 bg-cream/60">
                  <th scope="col" className="px-4 py-3 font-semibold text-charcoal">20% charged on</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold text-charcoal">Base</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold text-charcoal">Yearly fee</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-charcoal/5">
                  <th scope="row" className="px-4 py-3 font-normal text-charcoal">Gross booking revenue, cleaning fees included</th>
                  <td className="px-4 py-3 text-right">{usd(example.otherBaseAmount)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{usd(example.otherFee)}</td>
                </tr>
                <tr className="border-b border-charcoal/5">
                  <th scope="row" className="px-4 py-3 font-normal text-charcoal">Gross rent, cleaning fees excluded</th>
                  <td className="px-4 py-3 text-right">{usd(exampleGrossRent.otherBaseAmount)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{usd(exampleGrossRent.otherFee)}</td>
                </tr>
                <tr className="bg-sage/5">
                  <th scope="row" className="px-4 py-3 font-medium text-charcoal">Net rental revenue, after the host fee (Frontier)</th>
                  <td className="px-4 py-3 text-right">{usd(exampleNet.otherBaseAmount)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{usd(exampleNet.otherFee)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Same percentage, three prices: {usd(example.otherFee - exampleNet.otherFee)} a
            year apart from top to bottom. That is why it is worth asking every
            manager what their percentage is charged on, and why{" "}
            <Link href="/broken-bow-cabin-management-fees#published-rates" className="font-medium text-sage hover:underline">
              the rates Broken Bow managers publish
            </Link>{" "}
            are only comparable once you know the base.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="cream">
        <FAQSection title="Management fee questions" questions={FAQ} />
      </SectionWrapper>

      <CTASection
        heading="Want a quote you can check?"
        subtext={`Frontier's fee is ${plans.manager.feeInline}, with no setup fee and no monthly minimum. Tell us about the cabin.`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.management}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
