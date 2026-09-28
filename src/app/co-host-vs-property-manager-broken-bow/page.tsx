import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceQuiz } from "@/components/tools/service-quiz";
import { plans, siteConfig } from "@/data/site";
import { CTA } from "@/data/home-care";
import { cn } from "@/lib/utils";

const PATH = "/co-host-vs-property-manager-broken-bow";

export const metadata: Metadata = {
  title: { absolute: "Co-Host vs Property Manager in Broken Bow | Frontier" },
  description:
    "Airbnb co-host, full property manager, local support, or home care: which level of help fits your Broken Bow cabin, what each covers, and a 3-question quiz.",
  openGraph: {
    url: `${siteConfig.url}${PATH}`,
    title: "Co-Host vs Property Manager: Which Fits Your Broken Bow Cabin?",
    description:
      "Four levels of help for a Broken Bow or Hochatown cabin, what each covers, and a short quiz.",
    images: [
      {
        url: "/images/local-services/hero-og.jpg",
        width: 1200,
        height: 630,
        alt: "Cabin porch in Broken Bow, Oklahoma",
      },
    ],
  },
  alternates: { canonical: `${siteConfig.url}${PATH}` },
};

type Col = "cohost" | "manager" | "local" | "care";

const COLUMNS: { key: Col; label: string; frontier?: string }[] = [
  { key: "cohost", label: "Airbnb co-host" },
  { key: "manager", label: "Full property manager", frontier: plans.manager.href },
  { key: "local", label: "Local support", frontier: plans.local.href },
  { key: "care", label: "Second home care", frontier: plans.concierge.href },
];

const ROWS: { label: string; values: Record<Col, string> }[] = [
  {
    label: "Best for",
    values: {
      cohost: "Owners who want help on the listing but keep the business",
      manager: "Owners who want the rental run for them",
      local: "Self-managers who need hands on site",
      care: "Second homes, or cabins rented only now and then",
    },
  },
  {
    label: "Who owns the listing",
    values: {
      cohost: "You; the co-host is added to it",
      manager: "Operated by the manager",
      local: "You",
      care: "You, if there is one",
    },
  },
  {
    label: "Guest messages and pricing",
    values: {
      cohost: "Shared, by agreement",
      manager: "The manager",
      local: "You",
      care: "You",
    },
  },
  {
    label: "Cleaning",
    values: {
      cohost: "Varies; often coordinated, not done",
      manager: "Turnover after every stay",
      local: "Turnovers on your booking calendar",
      care: "One maintenance clean a month; turnovers quoted",
    },
  },
  {
    label: "Someone on site",
    values: {
      cohost: "Only if the co-host is local",
      manager: "Yes",
      local: "Yes",
      care: "Yes, monthly and by agreement",
    },
  },
  {
    label: "How it is priced",
    values: {
      cohost: "Usually a percentage of bookings",
      manager: `Frontier: ${plans.manager.feeInline}`,
      local: "Frontier: custom quote per property",
      care: `Frontier: ${plans.concierge.feeInline}`,
    },
  },
];

const FAQ = [
  {
    question: "What is an Airbnb co-host?",
    answer:
      "Someone you add to your own Airbnb listing to help run it. You keep the listing, the reviews, and the payouts, and agree with the co-host which tasks are theirs: often guest messages, listing updates, or pricing. What a co-host does on site varies a lot, and many are not local.",
  },
  {
    question: "Should I hire a co-host or a full property manager?",
    answer:
      "Ask two questions. Do you want to keep answering guests and setting prices? If not, you want a full manager. And do you need someone physically at the cabin? A remote co-host cannot clean, meet a plumber, or check the hot tub after a freeze. If you keep the listing but need hands on site, local support fits better than either.",
  },
  {
    question: "What do co-hosts charge in Hochatown?",
    answer:
      "Rates vary and few are published. One national manager's Hochatown page says co-hosting or partial-service arrangements usually run 15% to 20%, against 22% to 30% for full service. Ask any co-host what the percentage is charged on and what is not included, the same questions you would ask a full manager.",
  },
  {
    question: "Does Frontier offer co-hosting?",
    answer: `Not as a separate plan. We used to sell one and retired it, because owners needed either someone running the whole rental or someone on the ground, and a co-host sat awkwardly between the two. We offer full management at ${plans.manager.feeInline}, local support on a custom quote for self-managers, and second home care ${plans.concierge.feeInline}.`,
  },
  {
    question: "What if I don't rent the cabin at all?",
    answer: `Then you do not need a co-host or a property manager. You need someone to care for the house: clean it, check it, look after the hot tub, and tell you what needs attention. That is our second home care plan, ${plans.concierge.feeInline}.`,
  },
];

export default function CoHostVsPropertyManagerPage() {
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
        backgroundImage="/images/local-services/hero.webp"
        title="Co-Host vs Property Manager in Broken Bow"
        subtitle="Four levels of help for a Broken Bow or Hochatown cabin, what each one covers, and a three-question quiz to find yours."
        size="medium"
        overlay="dark"
      />

      <Breadcrumbs items={[{ label: "Co-Host vs Property Manager" }]} />

      <SectionWrapper background="cream" id="quiz">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Which kind of help fits your cabin?
          </h2>
          <p className="mt-4 mb-8 text-base text-muted-foreground md:text-lg">
            Three questions at most. Every answer explains why.
          </p>
          <ServiceQuiz />
        </div>
      </SectionWrapper>

      <SectionWrapper background="white" id="compare">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              The four options, side by side
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              The real difference is who runs the rental business, if there is
              one, and who is physically at the cabin.
            </p>
          </div>
          <div className="mt-10 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">Compare</th>
                  {COLUMNS.map((c) => (
                    <th key={c.key} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      {c.frontier ? (
                        <Link href={c.frontier} className="text-sage hover:underline">{c.label}</Link>
                      ) : (
                        c.label
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={row.label} className={cn("align-top", i % 2 ? "bg-cream/20" : "bg-white")}>
                    <th scope="row" className="px-4 py-3 text-left font-medium text-charcoal">{row.label}</th>
                    {COLUMNS.map((c) => (
                      <td key={c.key} className="px-4 py-3 text-muted-foreground">{row.values[c.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
            Comparing managers on price? See{" "}
            <Link href="/broken-bow-cabin-management-fees#published-rates" className="font-medium text-sage hover:underline">
              what Broken Bow managers publish
            </Link>{" "}
            and run the numbers in the{" "}
            <Link href="/management-fee-calculator" className="font-medium text-sage hover:underline">
              fee calculator
            </Link>
            .
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="cream">
        <FAQSection title="Co-hosts and managers, common questions" questions={FAQ} />
      </SectionWrapper>

      <CTASection
        heading="Still not sure?"
        subtext="Tell us about the cabin and how you use it. We'll tell you which fits, even when the answer is none of ours."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.owner}
        secondaryCta={{ label: "Compare services & pricing", href: "/pricing" }}
      />
    </>
  );
}
