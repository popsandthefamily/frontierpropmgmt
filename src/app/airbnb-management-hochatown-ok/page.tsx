import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FlagshipCaseStudySection } from "@/components/sections/flagship-case-study";
import { HeroSnapshot } from "@/components/audit/hero-snapshot";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Airbnb Management in Hochatown, OK | Frontier",
  description:
    "Airbnb management in Hochatown, OK from a boutique, owner-operated team that runs its own flagship cabin in this market. 20% of nightly-rental revenue, no monthly minimum, month-to-month.",
  keywords: [
    "Airbnb management Hochatown",
    "Hochatown Airbnb manager",
    "Airbnb property manager Hochatown OK",
    "Hochatown short-term rental manager",
    "boutique cabin manager Hochatown",
    "owner-operated Airbnb manager Oklahoma",
  ],
  openGraph: {
    title: "Airbnb Management in Hochatown, OK | Boutique & Owner-Operated",
    description:
      "Hands-on Airbnb management for Hochatown cabin owners. We operate our own flagship cabin in the same market.",
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
    canonical: "https://rentwithfrontier.com/airbnb-management-hochatown-ok",
  },
};

const evalCriteria = [
  {
    title: "Who is actually responsible for your cabin?",
    detail:
      "On a small team you talk to the operator. On a national or franchise PMS, your cabin is one of thousands and the person making pricing and listing decisions has never seen it.",
  },
  {
    title: "Do they operate in this market themselves?",
    detail:
      "Hochatown demand is shaped by Beavers Bend events, fall foliage, lake season, and Texas school calendars. The right manager prices to those rhythms, not a generic national model.",
  },
  {
    title: "How is the fee structured?",
    detail:
      "Watch for layered fees on top of the headline percentage: setup fees, monthly minimums, mandatory photo packages, mandatory marketing add-ons, or markups on cleaning and maintenance.",
  },
  {
    title: "How fast can someone be at the cabin?",
    detail:
      "Local matters when a hot tub fails on a Friday or a guest is locked out at midnight. Ask for response time in minutes, not hours.",
  },
  {
    title: "What happens if you want to leave?",
    detail:
      "Look for month-to-month with a clean 30-day exit, no listing-ownership lock-in, and reviews that transfer with you.",
  },
  {
    title: "How do they prove performance?",
    detail:
      "An honest manager will run your specific listing against current AirROI market data and show the gap. Anyone quoting a percentage uplift before seeing your cabin is guessing.",
  },
];

type ManagerType = {
  key: "boutique" | "largeLocal" | "national" | "self";
  label: string;
  highlight?: boolean;
};

const MANAGER_COLUMNS: ManagerType[] = [
  { key: "boutique", label: "Boutique owner-operated (Frontier)", highlight: true },
  { key: "largeLocal", label: "Large local portfolio manager" },
  { key: "national", label: "National PMS" },
  { key: "self", label: "Self-management" },
];

const COMPARISON_ROWS: {
  label: string;
  values: Record<ManagerType["key"], string>;
}[] = [
  {
    label: "Direct access to the decision-maker",
    values: {
      boutique: "Yes — you talk to the operator",
      largeLocal: "Sometimes — depends on portfolio size",
      national: "Rare — call center or ticket queue",
      self: "Always — it is you",
    },
  },
  {
    label: "Operates a cabin in this market themselves",
    values: {
      boutique: "Yes — flagship cabin in Hochatown",
      largeLocal: "Sometimes",
      national: "No",
      self: "Yes — your own",
    },
  },
  {
    label: "How many cabins compete for attention",
    values: {
      boutique: "A handful — by design",
      largeLocal: "Dozens to hundreds",
      national: "Thousands",
      self: "One",
    },
  },
  {
    label: "Pricing approach",
    values: {
      boutique: "Daily, market-aware, event-tuned",
      largeLocal: "Algorithmic, varies by team",
      national: "National algorithm",
      self: "Manual, often weekly",
    },
  },
  {
    label: "Local response time",
    values: {
      boutique: "Minutes — local team",
      largeLocal: "Minutes to hours",
      national: "Hours — through a queue",
      self: "Depends on where you live",
    },
  },
  {
    label: "Contract length",
    values: {
      boutique: "Month-to-month, 30-day exit",
      largeLocal: "Varies, often 12 months",
      national: "Often 12+ months",
      self: "None",
    },
  },
  {
    label: "Headline fee",
    values: {
      boutique: "20% of nightly-rental revenue",
      largeLocal: "20–30%",
      national: "25–40%",
      self: "0%, plus your time",
    },
  },
  {
    label: "Setup or monthly minimum",
    values: {
      boutique: "$0 setup, $0 monthly minimum",
      largeLocal: "Varies",
      national: "Common",
      self: "None",
    },
  },
];

const fitFor = [
  "You want hands-on attention from the person actually responsible for your cabin",
  "You want a manager who operates in the Hochatown market and sees the same demand swings you do",
  "You want a clean 20% / no-minimum / month-to-month structure with no lock-in",
  "You are willing to run a free audit on your listing first to see whether we can move the numbers",
];

const notFitFor = [
  "You own dozens of cabins and need an enterprise PMS dashboard with a self-serve API",
  "You want the cheapest possible fee and do not value local operations or hands-on attention",
  "You want a manager who will guarantee a percentage revenue uplift sight unseen",
  "Your cabin is outside the Broken Bow / Hochatown corridor",
];

const pageFAQ = [
  {
    question: "How is Frontier different from a national Airbnb manager?",
    answer:
      "Frontier is boutique and owner-operated. We run our own high-performing cabin in Hochatown and only take on a limited number of owner partners. National managers are built for thousands of properties and a national pricing algorithm; we are built for hands-on attention in one market.",
  },
  {
    question: "What is the fee for Hochatown Airbnb management?",
    answer:
      "20% of nightly-rental revenue, with no setup fee and no monthly minimum. Cleaning and pet fees pass through to cleaners and are not part of the 20%. Maintenance is itemized at cost.",
  },
  {
    question: "Do you charge for photography or marketing?",
    answer:
      "Professional photography is an optional add-on, not a required setup cost. Listing copy, dynamic pricing, and marketing across Airbnb, VRBO, Booking.com, and the direct booking site are included in the 20% fee.",
  },
  {
    question: "How long is the contract?",
    answer:
      "Month-to-month with a 30-day cancellation. No long-term lock-in. Listing ownership and reviews stay yours.",
  },
  {
    question: "Can I see what my cabin should be earning before signing?",
    answer:
      "Yes. The free listing audit runs your specific Airbnb or VRBO listing against current AirROI market data and shows the revenue gap. It is the honest first step before any conversation about management.",
  },
  {
    question: "Where is Frontier based?",
    answer: `Frontier is based at 3156 Old Broken Bow Hwy in the Broken Bow / Hochatown corridor. Phone: ${siteConfig.phone}.`,
  },
];

export default function AirbnbManagementHochatownPage() {
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
      <JsonLd
        type="Service"
        data={{
          name: "Airbnb Management in Hochatown, Oklahoma",
          description:
            "Boutique, owner-operated Airbnb and short-term rental management for Hochatown cabin owners. Daily dynamic pricing, guest communication, cleaning coordination, maintenance, and reporting. 20% of nightly-rental revenue, no monthly minimum.",
          provider: {
            "@type": "RealEstateAgent",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
          },
          areaServed: [
            { "@type": "Place", name: "Hochatown, Oklahoma" },
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "McCurtain County, Oklahoma" },
          ],
          serviceType: "Airbnb / Short-Term Rental Management",
        }}
      />

      <HeroSection
        backgroundImage="/images/discover/hochatown-pm-featured.png"
        title="Airbnb Management in Hochatown, OK"
        subtitle="Boutique, owner-operated. We run our own flagship cabin in this market and take on a limited number of owner partners."
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
          { label: "Airbnb Management in Hochatown, OK" },
        ]}
      />

      {/* Honest intro */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl prose prose-lg prose-charcoal">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What kind of Airbnb manager you actually want in Hochatown
          </h2>
          <p>
            Hochatown is a small, seasonal, event-driven market. The cabin
            inventory has grown faster than the demand, which means listings
            that were quietly profitable two years ago are now leaving real
            revenue on the table without daily pricing and serious listing
            work.
          </p>
          <p>
            Most owners we talk to do not need a bigger management company.
            They need a smaller one — close enough to the cabin to actually
            look at it, with a operator whose own income depends on these
            same Hochatown weekends.
          </p>
          <p>
            Frontier is intentionally that. We operate our own high-performing
            Hochatown cabin and take on a limited number of owner partners
            where direct, local management can move the numbers. If your
            cabin is a fit, we treat it like a second flagship, not another
            unit in a spreadsheet.
          </p>
        </div>
      </SectionWrapper>

      {/* Live market snapshot */}
      <SectionWrapper background="white" id="market">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            What Hochatown cabins earn right now
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Live AirROI data on comparable Hochatown cabins. Paste your
            Airbnb URL for a specific gap analysis on your listing.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <HeroSnapshot auditHref="/audit#full-audit" />
        </div>
      </SectionWrapper>

      {/* Evaluation criteria */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              How to evaluate any Airbnb manager in Hochatown
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Six questions that surface the difference between hands-on
              local operators and remote managers running a national
              playbook.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {evalCriteria.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-sage/20 bg-white p-5"
              >
                <h3 className="text-lg font-semibold text-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      {/* Category comparison */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              Four ways to run an Airbnb in Hochatown
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Manager type matters more than brand. Here is the honest
              category-by-category trade-off.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b bg-cream/60">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Compare
                  </th>
                  {MANAGER_COLUMNS.map((col) => (
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
                {COMPARISON_ROWS.map((row, i) => (
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
                    {MANAGER_COLUMNS.map((col) => (
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
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">
            Category-level comparison. Specific managers in each category
            vary; this is the structural trade-off.
          </p>
        </div>
      </SectionWrapper>

      {/* Flagship credibility */}
      <FlagshipCaseStudySection
        background="cream"
        eyebrow="Why our take on Hochatown is grounded"
      />

      {/* Fit / not a fit */}
      <SectionWrapper background="white">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
              Frontier is probably a fit if…
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
              Frontier is probably not a fit if…
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

      {/* Internal link block */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Keep digging
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            More on how Frontier works and what the local market is doing.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/hochatown-property-management">
                Hochatown cabin management
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/management-services">
                Full services and pricing
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/dallas-cabin-owners">
                Dallas cabin owners
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
          title="Hochatown Airbnb management — common questions"
          questions={pageFAQ}
        />
      </SectionWrapper>

      {/* Final CTA */}
      <CTASection
        heading="See the revenue gap on your Hochatown listing"
        subtext="Free, takes about 90 seconds, built for Broken Bow and Hochatown cabin owners. Then decide if Frontier is a fit."
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
