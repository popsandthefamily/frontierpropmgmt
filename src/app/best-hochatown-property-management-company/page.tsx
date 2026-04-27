import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
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
  title: "Best Hochatown Property Management Company: Honest Guide | Frontier",
  description:
    "How to pick the best Hochatown property management company for your cabin — boutique vs scale operator trade-offs, fee structure, and what \"best\" actually means in this small, seasonal market.",
  keywords: [
    "best Hochatown property management company",
    "best Hochatown cabin manager",
    "top Hochatown property management",
    "Hochatown property management reviews",
    "boutique Hochatown property manager",
  ],
  openGraph: {
    title: "Best Hochatown Property Management Company: Honest Guide",
    description:
      "Boutique vs scale, fee structure, local presence — how to pick the right Hochatown property management company.",
    images: [
      {
        url: "/images/properties/sublime/sublime-2.jpg",
        width: 1200,
        height: 630,
        alt: "Hochatown cabin managed by Frontier Property Management",
      },
    ],
  },
  alternates: {
    canonical:
      "https://rentwithfrontier.com/best-hochatown-property-management-company",
  },
};

const bestForWhom = [
  {
    profile: "Owners who want hands-on attention",
    best: "A boutique, owner-operated manager",
    why: "On a small team you talk to the operator. The person making pricing and listing decisions has actually walked the cabin.",
  },
  {
    profile: "Owners who want enterprise dashboards and a self-serve API",
    best: "A national PMS",
    why: "Scale operators are built for thousands of properties and provide standardized owner portals at the cost of personalized attention.",
  },
  {
    profile: "Owners willing to put 15–25 hours a month into operations",
    best: "Self-management",
    why: "If you genuinely want to run guest messaging, pricing, and vendor coordination yourself, no manager beats keeping 100% of the revenue.",
  },
  {
    profile: "Owners with multiple cabins across different states",
    best: "A multi-market national operator",
    why: "Single point of billing and a single dashboard can outweigh local nuance when you have geographic spread.",
  },
];

const bestCriteria = [
  {
    title: "Operator-in-market test",
    detail:
      "Does the company run a cabin in this market themselves? Hochatown demand is shaped by Beavers Bend events, fall foliage, lake season, and Texas school calendars — operators living the same demand cycle make better calls.",
  },
  {
    title: "Fee transparency test",
    detail:
      "A clean headline percentage with no setup fee, no monthly minimum, and no markup on cleaning or maintenance is the floor. Anything else is layered cost.",
  },
  {
    title: "Lock-in test",
    detail:
      "Month-to-month with a 30-day exit, listing ownership that stays yours, and reviews that transfer with the listing. Anything longer is the company protecting itself, not earning your business each month.",
  },
  {
    title: "Response-time test",
    detail:
      "Ask, in writing, what the worst-case response time is when a guest calls at 11 PM about a hot tub. Local manager: minutes. National call center: hours.",
  },
  {
    title: "Audit-first test",
    detail:
      "The honest first step is running your specific listing against current AirROI market data — before signing anything. If a manager quotes you a percentage uplift sight unseen, that is a sales tactic, not a forecast.",
  },
];

type ProfileKey = "boutique" | "scale" | "self";

const PROFILE_COLUMNS: { key: ProfileKey; label: string; highlight?: boolean }[] =
  [
    {
      key: "boutique",
      label: "Boutique owner-operated (Frontier)",
      highlight: true,
    },
    { key: "scale", label: "Scale or national PMS" },
    { key: "self", label: "Self-management" },
  ];

const PROFILE_ROWS: {
  label: string;
  values: Record<ProfileKey, string>;
}[] = [
  {
    label: "Best for",
    values: {
      boutique: "Owners who want hands-on attention from the operator",
      scale: "Owners who want enterprise dashboards across many properties",
      self: "Owners with the time and willingness to operate the cabin",
    },
  },
  {
    label: "Local presence in Hochatown",
    values: {
      boutique: "Yes — based in Broken Bow, flagship cabin in Hochatown",
      scale: "Sometimes — varies by team",
      self: "You are local in your own way",
    },
  },
  {
    label: "Decision-maker access",
    values: {
      boutique: "Direct — you talk to the operator",
      scale: "Indirect — call center or ticket queue",
      self: "Direct — it is you",
    },
  },
  {
    label: "Pricing approach",
    values: {
      boutique: "Daily, market-aware, event-tuned",
      scale: "National algorithm with local overrides",
      self: "Manual — usually weekly at best",
    },
  },
  {
    label: "Fee model",
    values: {
      boutique: "20% of nightly-rental revenue, no monthly minimum",
      scale: "20–40% plus possible setup, marketing, photo, monthly fees",
      self: "0% fee, but 15–25 hrs/mo of your time",
    },
  },
  {
    label: "Contract length",
    values: {
      boutique: "Month-to-month, 30-day exit",
      scale: "Often 12+ months",
      self: "None",
    },
  },
];

const fitFor = [
  "You want a manager who actually operates a cabin in this market",
  "You want hands-on attention and direct access to the operator",
  "You want a clean fee structure with no setup, no monthly minimum, no lock-in",
  "You are willing to run a free audit on your listing first",
];

const notFitFor = [
  "You manage a multi-state portfolio and need an enterprise PMS dashboard",
  "You want the absolute lowest possible fee and do not value local operations",
  "You want a guaranteed percentage revenue uplift sight unseen",
  "Your cabin is outside the Broken Bow / Hochatown corridor",
];

const pageFAQ = [
  {
    question:
      "What is the best property management company in Hochatown?",
    answer:
      "There is no single \"best\" — best depends on what you want. Owners who want hands-on attention from a local operator do better with a boutique, owner-operated manager like Frontier. Owners with multi-state portfolios who want a single enterprise dashboard usually prefer a national PMS. The honest test is the audit: run your listing against current market data first, then evaluate whichever manager can credibly close that gap.",
  },
  {
    question: "How is Frontier different from a national property manager?",
    answer:
      "Frontier is boutique and owner-operated. We run our own high-performing cabin in Hochatown and only take on a limited number of owner partners. The pricing, listing, cleaning, and guest-messaging systems on your cabin are the same ones tested on the cabin we operate ourselves.",
  },
  {
    question:
      "What should the management fee be for a Hochatown cabin?",
    answer:
      "Most professional managers charge between 20% and 40%. Frontier charges 20% of nightly-rental revenue with $0 setup and $0 monthly minimum. Watch for layered fees — setup, monthly minimum, mandatory photo packages, and markups on cleaning or maintenance can add 5–10 percentage points to the real cost.",
  },
  {
    question: "Do reviews transfer if I switch property managers?",
    answer:
      "Yes — Airbnb, VRBO, and Booking.com listings carry their reviews and ratings as long as listing ownership is properly transferred. The right manager handles that handoff, not the wrong one.",
  },
  {
    question: "Can I see the gap on my cabin before signing?",
    answer:
      "Yes. The free listing audit runs your specific Airbnb or VRBO listing against current AirROI market data and shows the revenue gap. It is the honest first step before any conversation about management.",
  },
  {
    question: "Where is Frontier based?",
    answer: `Frontier is based at 3156 Old Broken Bow Hwy in the Broken Bow / Hochatown corridor. Phone: ${siteConfig.phone}.`,
  },
];

export default function BestHochatownPropertyManagementPage() {
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
        backgroundImage="/images/discover/hochatown-pm-featured.png"
        title="Best Hochatown Property Management Company"
        subtitle='"Best" depends on what kind of owner you are. Here is the honest version.'
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
          { label: "Best Hochatown Property Management Company" },
        ]}
      />

      {/* Honest intro */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            There is no single &ldquo;best&rdquo; — and anyone who tells you
            otherwise is selling
          </h2>
          <p>
            Hochatown is a small, seasonal market with a few categories of
            management company serving it. The honest answer to &ldquo;who is
            best&rdquo; depends on what kind of owner you are.
          </p>
          <p>
            This page is written by Frontier, but the framing is not
            &ldquo;Frontier is best for everyone.&rdquo; Frontier is boutique
            and owner-operated. We run our own high-performing Hochatown cabin
            and only take on a limited number of owner partners. That is
            genuinely better for some owners and genuinely wrong for others.
            Below is how to tell the difference for your cabin.
          </p>
        </div>
      </SectionWrapper>

      {/* Best for whom */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              &ldquo;Best&rdquo; depends on the owner
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Four owner profiles, four different right answers.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {bestForWhom.map((item) => (
              <li
                key={item.profile}
                className="rounded-2xl border bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                  If you are…
                </p>
                <h3 className="mt-1 text-lg font-semibold text-charcoal">
                  {item.profile}
                </h3>
                <p className="mt-3 text-sm font-semibold text-charcoal">
                  Best fit:{" "}
                  <span className="text-sage">{item.best}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.why}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Five tests */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Five tests for picking the best Hochatown manager
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Same five questions, no matter which company you are evaluating.
            </p>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {bestCriteria.map((item, idx) => (
              <li
                key={item.title}
                className="rounded-2xl border border-sage/20 bg-white p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-sage">
                  Test {idx + 1}
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

      {/* Profile comparison table */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Boutique vs scale vs self-management
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Side-by-side trade-offs. Manager type matters more than brand.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Compare
                  </th>
                  {PROFILE_COLUMNS.map((col) => (
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
                {PROFILE_ROWS.map((row, i) => (
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
                    {PROFILE_COLUMNS.map((col) => (
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
        background="cream"
        eyebrow="Why Frontier writes this from experience"
      />

      {/* Fit / not fit */}
      <SectionWrapper background="white">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
              Frontier is probably best for your cabin if…
            </h2>
            <ul className="mt-6 space-y-4">
              {fitFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-charcoal">
                  <Check className="mt-1 size-5 shrink-0 text-sage" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
              Frontier is probably not the right pick if…
            </h2>
            <ul className="mt-6 space-y-4">
              {notFitFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <X className="mt-1 size-5 shrink-0 text-muted-foreground" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>

      {/* Internal links */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Keep researching
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            More on what good Hochatown management actually looks like.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/airbnb-management-hochatown-ok">
                Airbnb management in Hochatown, OK
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/hochatown-property-management">
                Hochatown cabin management
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">
                Broken Bow management fees
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
          title="Best Hochatown property management — common questions"
          questions={pageFAQ}
        />
      </SectionWrapper>

      <CTASection
        heading="See whether Frontier is the right fit for your cabin"
        subtext="Free, takes about 90 seconds. Run the audit on your listing first — then we can have an honest conversation."
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
