import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { AnswerBlock } from "@/components/seo/answer-block";
import { AvailabilityNote } from "@/components/sections/availability-note";
import { availability, plans, siteConfig } from "@/data/site";
import { allFAQItems, faqGroups } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ | Cabin Management in Broken Bow & Hochatown | Frontier",
  description:
    "Straight answers about Frontier's two plans, what the 20% fee is actually calculated on, switching managers, cleaning, taxes, permits, and the Broken Bow and Hochatown market.",
  keywords: [
    "Broken Bow property management questions",
    "Hochatown cabin management FAQ",
    "short term rental management fee explained",
    "how does property management work Broken Bow",
    "switching property managers Oklahoma",
  ],
  openGraph: {
    title: "Frequently Asked Questions | Frontier Property Management",
    description:
      "What the two plans cost, what the 20% is calculated on, and how switching works.",
    images: [
      {
        url: "/images/services/DSC3082.jpg",
        width: 1200,
        height: 630,
        alt: "Frontier Property Management, Broken Bow Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/faq",
  },
};

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
        backgroundImage="/images/services/DSC3082.jpg"
        title="Questions, answered"
        subtitle="Everything owners ask us before signing, in one place. Including the ones where the honest answer is not the flattering one."
        size="medium"
        overlay="dark"
        cta={{ label: "Book a discovery call", href: "/contact#discovery" }}
      />

      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <AvailabilityNote />

      <SectionWrapper background="cream">
        <AnswerBlock heading="The short version">
          <p>
            Frontier Property Management is a boutique, owner-operated cabin
            management company in Broken Bow and Hochatown, Oklahoma, running
            two plans. The <strong>{plans.manager.name}</strong> plan is
            full-service management at <strong>{plans.manager.feeInline}</strong>{" "}
            &mdash; {plans.manager.feeBase} &mdash; with no setup fee, no
            monthly minimum, and no annual contract. <strong>
              {plans.local.name}
            </strong>{" "}
            is cleaning, maintenance, and on-the-ground logistics on a custom
            quote, for owners who keep their own bookings. Cleaning and vendor
            invoices pass through at cost on both plans.{" "}
            {availability.sentence}
          </p>
        </AnswerBlock>

        {/* Jump links, so the page is navigable at this length */}
        <nav
          aria-label="FAQ sections"
          className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {faqGroups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm font-medium text-charcoal transition hover:border-sage hover:text-sage"
            >
              {group.title}
            </a>
          ))}
        </nav>
      </SectionWrapper>

      {faqGroups.map((group, i) => (
        <SectionWrapper
          key={group.id}
          id={group.id}
          background={i % 2 === 0 ? "white" : "cream"}
        >
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
              {group.title}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
              {group.blurb}
            </p>
          </div>
          <FAQSection title="" questions={group.items} />
        </SectionWrapper>
      ))}

      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            Still deciding?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            These pages go deeper than an accordion answer can.
          </p>
          <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/pricing">Both plans compared</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/broken-bow-cabin-management-fees">
                What 20% should include
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/switch-property-managers-broken-bow">
                How switching works
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href="/audit">Free listing audit</Link>
            </Button>
          </div>
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
