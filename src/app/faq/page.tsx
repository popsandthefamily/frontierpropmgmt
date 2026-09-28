import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FaqActiveSection } from "@/components/sections/faq-active-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AvailabilityNote } from "@/components/sections/availability-note";
import { siteConfig } from "@/data/site";
import { CTA } from "@/data/home-care";
import { allFAQItems, faqGroups } from "@/data/faq";

export const metadata: Metadata = {
  title: {
    absolute: "FAQ: Cabin Management in Broken Bow & Hochatown | Frontier",
  },
  description:
    "Answers for Broken Bow and Hochatown cabin owners: what 20% of net rental revenue means, second home care, switching managers, cleaning, and taxes.",
  keywords: [
    "Broken Bow property management questions",
    "Hochatown cabin management FAQ",
    "short term rental management fee explained",
    "how does property management work Broken Bow",
    "switching property managers Oklahoma",
  ],
  openGraph: {
    url: "https://www.rentwithfrontier.com/faq",
    title: "Frequently Asked Questions | Frontier Property Management",
    description:
      "What the two plans cost, what the 20% is calculated on, and how switching works.",
    images: [
      {
        url: "/images/services/DSC3082-og.jpg",
        width: 1200,
        height: 630,
        alt: "Frontier Property Management, Broken Bow Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://www.rentwithfrontier.com/faq",
  },
};

const DEEPER_READING = [
  { label: "Compare services & pricing", href: "/pricing", note: "Full management and home care, side by side." },
  { label: "Management fees compared", href: "/broken-bow-cabin-management-fees", note: "What local managers publish, and what 20% should include." },
  { label: "Management fee calculator", href: "/management-fee-calculator", note: "Net against gross, on your own numbers." },
  { label: "Hochatown STR license & taxes", href: "/hochatown-str-license-lodging-tax", note: "Fees, renewal dates, and the 4% lodging tax." },
  { label: "Switching property managers", href: "/switch-property-managers-broken-bow", note: "Keeping your reviews and bookings." },
  { label: "Co-host vs property manager", href: "/co-host-vs-property-manager-broken-bow", note: "Which kind of help fits, with a short quiz." },
];

export default function FAQPage() {
  return (
    <>
      {/* One FAQPage entity covering every question on the page. */}
      <JsonLd
        type="FAQPage"
        data={{
          name: "Frontier Property Management, frequently asked questions",
          url: `${siteConfig.url}/faq`,
          mainEntity: allFAQItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3082.webp"
        title="Broken Bow & Hochatown Cabin Owner FAQ"
        subtitle="Everything owners ask us before signing, in one place. Including the ones where the honest answer is not the flattering one."
        size="medium"
        overlay="dark"
        cta={{ label: "Book a discovery call", href: "/contact#discovery" }}
      />

      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <AvailabilityNote />

      {/* One continuous FAQ. On desktop a sticky table of contents sits
          beside the questions; on small screens a sticky, scrollable chip
          row does the same job. Answers stay collapsed, so the page reads as
          a list of questions rather than a wall of text. */}
      <section className="bg-white">
        {/* Mobile section chips */}
        <nav
          aria-label="FAQ sections"
          data-faq-nav
          className="sticky top-20 z-30 border-b border-border bg-white/95 backdrop-blur lg:hidden"
        >
          <ul data-faq-chips className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {faqGroups.map((group) => (
              <li key={group.id} className="shrink-0">
                <a
                  href={`#${group.id}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 bg-cream/60 px-3.5 py-2 text-sm font-medium text-charcoal transition-colors hover:border-sage hover:text-sage aria-[current=true]:border-sage aria-[current=true]:bg-sage aria-[current=true]:text-white"
                >
                  {group.title}
                  <span className="text-xs text-muted-foreground group-aria-[current=true]:text-white/80">
                    {group.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 md:py-16 lg:grid-cols-[15rem_1fr] lg:gap-16 lg:px-8">
          {/* Desktop table of contents */}
          <aside className="hidden lg:block">
            <nav aria-label="FAQ sections" data-faq-nav className="sticky top-28">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
                Topics
              </p>
              <ul className="mt-4 space-y-1 border-l border-border">
                {faqGroups.map((group) => (
                  <li key={group.id}>
                    <a
                      href={`#${group.id}`}
                      className="-ml-px flex items-baseline justify-between gap-3 border-l-2 border-transparent py-1.5 pl-4 pr-1 text-sm text-charcoal/80 transition-colors hover:border-sage hover:text-sage aria-[current=true]:border-sage aria-[current=true]:font-semibold aria-[current=true]:text-sage"
                    >
                      <span>{group.title}</span>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {group.items.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href={CTA.owner.href}
                className="mt-8 inline-flex text-sm font-semibold text-sage hover:text-sage-dark hover:underline"
              >
                Ask us something else &rarr;
              </Link>
            </nav>
          </aside>

          <div className="min-w-0 space-y-14 md:space-y-16">
            {faqGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-40 lg:scroll-mt-28">
                <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
                  {group.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  {group.blurb}
                </p>
                <FAQSection title="" questions={group.items} className="mx-0 mt-4 max-w-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqActiveSection ids={faqGroups.map((g) => g.id)} />

      {/* Deeper reading: a tidy grid instead of a row of buttons */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Still deciding?
          </h2>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            These pages go deeper than an FAQ answer can.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {DEEPER_READING.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full items-start justify-between gap-3 rounded-xl border border-charcoal/10 bg-white p-4 transition-colors hover:border-sage"
                >
                  <span>
                    <span className="block text-sm font-semibold text-charcoal group-hover:text-sage">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {item.note}
                    </span>
                  </span>
                  <ArrowRight className="mt-0.5 size-4 shrink-0 text-sage transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      <CTASection
        heading="Question we didn't answer?"
        subtext={`Call or book a free 30-minute discovery call. We'll give you the real answer, even when it isn't the one that wins us the business. ${siteConfig.phone}`}
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={{ label: "Book a discovery call", href: "/contact#discovery" }}
        secondaryCta={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
