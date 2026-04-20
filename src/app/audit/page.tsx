import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, LineChart, Search } from "lucide-react";
import { Tier1Form } from "@/components/audit/tier1-form";
import { Tier2Form } from "@/components/audit/tier2-form";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Free Airbnb Audit — See What Your Cabin Is Leaving on the Table",
  description:
    "Paste your Airbnb listing. In 45 seconds, see how your pricing, occupancy, and amenities compare to similar properties earning more in your market.",
  alternates: { canonical: "https://rentwithfrontier.com/audit" },
  robots: { index: true, follow: true },
};

const testimonials = [
  {
    name: "Sarah, Broken Bow, OK",
    quote: "Added $18k/yr after fixing pricing.",
  },
  {
    name: "Mike, Galveston, TX",
    quote: "Went from 52% to 74% occupancy in 4 months.",
  },
  {
    name: "Dana, Hot Springs, AR",
    quote: "Caught a $9k/yr amenity gap I'd missed for 2 years.",
  },
];

const steps = [
  {
    icon: Search,
    title: "Paste your listing",
    copy: "We pull public performance data for your listing and market.",
  },
  {
    icon: BarChart3,
    title: "We compare",
    copy: "Your rates, occupancy, and amenities vs top performers in your market.",
  },
  {
    icon: LineChart,
    title: "You get the gap",
    copy: "Specific dollar figures and where they're coming from — in your inbox.",
  },
];

export default function AuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-white to-sage/10">
        <div className="mx-auto max-w-5xl px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-sage/30 bg-sage/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage">
              Free · No credit card
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-charcoal md:text-5xl lg:text-6xl">
              Find out what your Airbnb is leaving on the table
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Paste your listing. In 45 seconds, see how your pricing, occupancy, and
              amenities compare to similar properties earning more in your market.
            </p>
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
              Powered by data on 20M+ listings across 190+ markets
            </p>
          </div>

          {/* Tier 1 form */}
          <div className="mx-auto mt-10 max-w-2xl">
            <Tier1Form />
          </div>
        </div>
      </section>

      {/* Social proof band */}
      <section className="bg-sage text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
          <p className="mx-auto max-w-3xl text-center text-xl font-semibold leading-tight md:text-3xl">
            Frontier hosts earn a median <span className="text-peach">23% more</span> than their market.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white/10 p-5 backdrop-blur"
              >
                <p className="text-base font-medium text-white md:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-3 text-sm text-white/70">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <SectionWrapper background="white">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            How it works
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="rounded-2xl border bg-white p-6 text-center md:text-left"
            >
              <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-sage/10 text-sage md:mx-0">
                <s.icon className="size-5" />
              </div>
              <div className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                Step {i + 1}
              </div>
              <h3 className="mt-1 text-xl font-bold text-charcoal">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Tier 2 form */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full border border-sage/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage">
              Full audit
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              The real lead magnet — numbers specific to your listing.
            </p>
          </div>
          <Tier2Form />
        </div>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Frequently asked
          </h2>
          <dl className="mt-8 space-y-6">
            <Faq q="Is this really free?">
              Yes. We send one report to your email. No newsletter, no drip campaign.
              We eat the cost because a small share of audits turn into management clients.
            </Faq>
            <Faq q="Where does the data come from?">
              AirROI aggregates public performance data from 20M+ short-term rental listings
              globally. We pull your listing&apos;s data plus 5+ comparable properties in your market
              and run the gap math.
            </Faq>
            <Faq q="What if my listing is new?">
              If you have fewer than 10 reviews, our occupancy estimate gets less
              precise. We&apos;ll flag this in the report. The pricing and amenity analysis still works.
            </Faq>
            <Faq q="Do I have to become a Frontier client to get the report?">
              No. You own the report. Share it, screenshot it, use it with whichever
              manager you like. We&apos;d obviously love to help — but there&apos;s no gate.
            </Faq>
            <Faq q="How long does the full audit take?">
              About 90 seconds end-to-end. Email verification, listing pull, comp lookup,
              report generation.
            </Faq>
          </dl>
        </div>
      </SectionWrapper>

      {/* Footer backlink (for AirROI Preferred Partner) */}
      <div className="border-t bg-white py-6">
        <p className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground">
          Market data by{" "}
          <Link
            href="https://airroi.com"
            target="_blank"
            rel="noopener"
            className="underline hover:text-sage"
          >
            AirROI
          </Link>
          . Estimates, not guarantees — individual results vary.
        </p>
      </div>

      {/* Secondary CTA */}
      <section className="bg-charcoal text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
          <h2 className="text-2xl font-bold md:text-3xl">
            Already know your numbers?
          </h2>
          <p className="mt-3 text-sm text-white/80 md:text-base">
            Skip the audit and book a 15-min call with Frontier directly.
          </p>
          <Link
            href="/contact?ref=audit-footer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-sage px-6 py-3 text-sm font-semibold hover:bg-sage-dark"
          >
            Book a call
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="border-b pb-5">
      <dt className="text-lg font-semibold text-charcoal">{q}</dt>
      <dd className="mt-2 text-base text-muted-foreground">{children}</dd>
    </div>
  );
}
