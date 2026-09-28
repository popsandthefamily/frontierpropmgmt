import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { FAQSection } from "@/components/sections/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { plans, siteConfig } from "@/data/site";
import { CTA } from "@/data/home-care";
import {
  GUIDE_SECTIONS,
  HOCHATOWN_STR_FAQ,
  LAST_VERIFIED,
  LAST_VERIFIED_ISO,
  SOURCES,
  TAX_ROWS,
  TAX_TOTALS,
} from "@/data/hochatown-str";

const PATH = "/hochatown-str-license-lodging-tax";

export const metadata: Metadata = {
  title: { absolute: "Hochatown STR License & Lodging Tax (2026) | Frontier" },
  description:
    "Hochatown short-term rental license fees, renewal dates, the 4% lodging tax, who files it, and how Broken Bow and county rules differ. Sourced to the Town.",
  openGraph: {
    url: `${siteConfig.url}${PATH}`,
    title: "Hochatown STR License & Lodging Tax Guide (2026)",
    description:
      "License fees, renewal dates, the 4% lodging tax, filing, and which rules apply to your cabin. Every figure linked to the Town's own documents.",
    type: "article",
    images: [
      {
        url: "/images/services/DSC3082-og.jpg",
        width: 1200,
        height: 630,
        alt: "Hochatown, Oklahoma",
      },
    ],
  },
  alternates: { canonical: `${siteConfig.url}${PATH}` },
};

/**
 * The maintained reference on Hochatown STR licensing and lodging tax. It
 * replaces the dated blog post on the Granicus switch (which now redirects
 * here) and is the page every tax and permit FAQ on the site points to.
 * Facts and sources live in src/data/hochatown-str.ts.
 */
export default function HochatownStrGuidePage() {
  return (
    <>
      <JsonLd
        type="Article"
        data={{
          "@id": `${siteConfig.url}${PATH}#article`,
          headline: "Hochatown STR License & Lodging Tax Guide (2026)",
          description: metadata.description,
          url: `${siteConfig.url}${PATH}`,
          dateModified: LAST_VERIFIED_ISO,
          author: { "@id": `${siteConfig.url}/about#hunter-collins` },
          publisher: { "@id": `${siteConfig.url}/#business` },
          about: [
            { "@type": "Place", name: "Hochatown, Oklahoma" },
            { "@type": "Thing", name: "Short-term rental licensing" },
            { "@type": "Thing", name: "Lodging tax" },
          ],
          citation: Object.values(SOURCES).map((s) => s.url),
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: HOCHATOWN_STR_FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <HeroSection
        backgroundImage="/images/services/DSC3082.webp"
        title="Hochatown STR License & Lodging Tax Guide"
        subtitle={`What a short-term rental owner owes the Town, and when. Checked against the Town's own documents on ${LAST_VERIFIED}.`}
        size="medium"
        overlay="dark"
      />

      <Breadcrumbs items={[{ label: "Hochatown STR License & Lodging Tax" }]} />

      {/* Answer first: the numbers most people came for */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
            The short version
          </p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-charcoal">
            <li>
              <strong>License:</strong> required inside Hochatown town limits.
              $400 the first year ($300 one-time + $100 annual), then $100 a
              year, due July 1. $250 a month if late or never registered.
            </li>
            <li>
              <strong>Lodging tax:</strong> 4% of everything the guest pays,
              including cleaning and pet fees. Filed with the Town monthly, by
              the 15th.
            </li>
            <li>
              <strong>Who pays:</strong> the operator. The Town says it has not
              received this tax from Airbnb or VRBO.
            </li>
            <li>
              <strong>All taxes on a stay:</strong> {TAX_TOTALS.inTown} inside
              Hochatown, {TAX_TOTALS.county} in unincorporated McCurtain County.
            </li>
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Last verified {LAST_VERIFIED}. Rules change: confirm with the Town
            of Hochatown before you rely on any figure here. This is a summary
            of public documents, not legal or tax advice.
          </p>
          <nav aria-label="On this page" className="mt-6 border-t border-charcoal/10 pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
              {GUIDE_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sage hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <article className="mx-auto max-w-3xl">
          {GUIDE_SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 border-b border-charcoal/10 py-10 first:pt-0 last:border-0">
              <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
                {section.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {section.points && (
                <ul className="mt-5 space-y-3">
                  {section.points.map((pt) => (
                    <li key={pt.slice(0, 40)} className="flex items-start gap-3 text-base leading-relaxed text-charcoal">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sage" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.id === "all-taxes" && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-charcoal/10">
                  <table className="w-full text-left text-sm">
                    <caption className="border-b border-charcoal/10 bg-cream/60 px-4 py-3 text-left text-xs uppercase tracking-widest text-muted-foreground">
                      Taxes on a short-term stay, from the Town of Hochatown&apos;s breakdown
                    </caption>
                    <thead>
                      <tr className="border-b border-charcoal/10">
                        <th scope="col" className="px-4 py-3 font-semibold text-charcoal">Tax</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold text-charcoal">Inside Hochatown</th>
                        <th scope="col" className="px-4 py-3 text-right font-semibold text-charcoal">Unincorporated county</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TAX_ROWS.map((r) => (
                        <tr key={r.tax} className="border-b border-charcoal/5">
                          <th scope="row" className="px-4 py-3 font-normal text-charcoal">{r.tax}</th>
                          <td className="px-4 py-3 text-right text-charcoal">{r.inTown}</td>
                          <td className="px-4 py-3 text-right text-charcoal">{r.county}</td>
                        </tr>
                      ))}
                      <tr className="bg-cream/40">
                        <th scope="row" className="px-4 py-3 font-semibold text-charcoal">Total</th>
                        <td className="px-4 py-3 text-right font-semibold text-charcoal">{TAX_TOTALS.inTown}</td>
                        <td className="px-4 py-3 text-right font-semibold text-charcoal">{TAX_TOTALS.county}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {section.id === "lodging-tax" && (
                <p className="mt-5 rounded-xl border border-sage/30 bg-sage/5 p-4 text-sm leading-relaxed text-charcoal">
                  In July 2026 the Town sued Airbnb, alleging that taxes on some
                  rentals inside Hochatown were allocated to Broken Bow.{" "}
                  <Link href="/blogs/hochatown-airbnb-lodging-tax-lawsuit" className="font-medium text-sage hover:underline">
                    What the Hochatown v. Airbnb case is about
                  </Link>
                  .
                </p>
              )}

              <p className="mt-5 text-xs text-muted-foreground">
                Source{section.sources.length > 1 ? "s" : ""}:{" "}
                {section.sources.map((s, i) => (
                  <span key={s.url}>
                    {i > 0 && "; "}
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-sage">
                      {s.label}
                      <ExternalLink className="size-3" />
                    </a>
                  </span>
                ))}
              </p>
            </section>
          ))}
        </article>
      </SectionWrapper>

      {/* Where Frontier fits, stated plainly and briefly */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
            If you would rather not track this yourself
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            On our full-service plan, lodging-tax filing and license renewals
            are part of the job, at {plans.manager.feeInline}. If you run the
            rental yourself, it stays with you, but{" "}
            <Link href={plans.local.href} className="font-medium text-sage hover:underline">
              local support
            </Link>{" "}
            can take the on-site work off your plate. And if the cabin is a
            second home you never rent, none of this applies, and{" "}
            <Link href={plans.concierge.href} className="font-medium text-sage hover:underline">
              second home care
            </Link>{" "}
            is the more relevant page.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <FAQSection
          title="Hochatown STR license and tax questions"
          questions={HOCHATOWN_STR_FAQ}
        />
      </SectionWrapper>

      <CTASection
        heading="Questions about your cabin's compliance?"
        subtext="Tell us where the property is and how you rent it. We'll tell you what applies and what we'd handle."
        backgroundImage="/images/hero/foggy-mountain.jpg"
        cta={CTA.management}
        secondaryCta={CTA.localSupport}
      />
    </>
  );
}
