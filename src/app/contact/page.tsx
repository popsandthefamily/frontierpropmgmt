import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { SocialProofStrip } from "@/components/sections/social-proof-strip";
import { ContactFormTabbed } from "@/components/forms/contact-form-tabbed";
import { DiscoveryCallEmbed } from "@/components/book/discovery-call-embed";
import { ContactLink } from "@/components/analytics/contact-link";
import { googleProfileUrl, plans, siteConfig } from "@/data/site";
import {
  type ContactIntent,
  DEFAULT_CONTACT_INTENT,
  isContactIntent,
} from "@/data/home-care";

export const metadata: Metadata = {
  title: { absolute: "Discuss Your Broken Bow Property | Frontier" },
  description:
    "Ask about STR management, Home Care Concierge, or local support for your cabin. Contact Frontier in Broken Bow and Hochatown.",
  openGraph: {
    title: "Discuss Your Broken Bow Property | Frontier",
    description:
      "Tell us about your property and we'll tell you what a practical plan looks like. Based in Broken Bow, OK.",
    images: [
      {
        url: "/images/discover/hochatown-drive-og.jpg",
        width: 1200,
        height: 630,
        alt: "Scenic road through Hochatown, Oklahoma",
      },
    ],
  },
  alternates: {
    // The ?type= variants only pre-select a form; they all canonicalise
    // to the clean contact page.
    canonical: `${siteConfig.url}/contact`,
  },
};

/** Intent-aware copy. Everything else on the page is shared. */
const INTENT_COPY: Record<
  ContactIntent,
  { heroTitle: string; heroSubtitle: string; formHeading: string; formLead: string }
> = {
  management: {
    heroTitle: "Let's talk about your rental",
    heroSubtitle:
      "Full-service STR management in Broken Bow and Hochatown. Tell us about the cabin and we'll tell you honestly whether we can help.",
    formHeading: "Discuss STR management",
    formLead:
      "A few details about the property and how it is listed today. A listing link is helpful if you have one, never required.",
  },
  concierge: {
    heroTitle: "Request a property walkthrough",
    heroSubtitle:
      "Home Care Concierge for private second homes, owner-used vacation homes, and cabins you rent out yourself. You keep control; we care for the property.",
    formHeading: "Tell us about your property",
    formLead:
      "No listing, rental income, or occupancy figures needed. Where it is, how you use it, and whether there is a hot tub is plenty to start.",
  },
  "local-support": {
    heroTitle: "Build your local support plan",
    heroSubtitle:
      "Turnovers, maintenance, and local hands for a short-term rental you run yourself. You keep the listing and the bookings.",
    formHeading: "Tell us what needs handling",
    formLead:
      "What is breaking, what is falling through, and how often you are driving down to fix it yourself.",
  },
  owner: {
    heroTitle: "Talk about your property",
    heroSubtitle:
      "Full-service rental management, or local home care while you keep control. We'll help you work out which fits.",
    formHeading: "Tell us about your property",
    formLead:
      "Pick the service you are asking about, or choose “not sure yet” and we'll sort it out together.",
  },
  guest: {
    heroTitle: "Ask about a stay",
    heroSubtitle:
      "Questions about one of our cabins, your dates, or the area. We're happy to help.",
    formHeading: "Send us a message",
    formLead: "Tell us which cabin and when, and we'll get back to you.",
  },
};

interface ContactPageProps {
  searchParams: Promise<{ type?: string | string[] }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.type) ? params.type[0] : params.type;
  // Anything outside the allowlist falls back to the general owner form.
  // The raw value is never rendered.
  const intent: ContactIntent = isContactIntent(raw) ? raw : DEFAULT_CONTACT_INTENT;
  const copy = INTENT_COPY[intent];

  const contactOptions = [
    {
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/-/g, "")}`,
      channel: "phone" as const,
    },
    {
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      channel: "email" as const,
    },
    { label: "Address", value: siteConfig.address },
    { label: "Hours", value: siteConfig.hours },
    { label: "Reviews", value: "See us on Google", href: googleProfileUrl },
  ];

  return (
    <>
      <HeroSection
        backgroundImage="/images/discover/hochatown-drive.webp"
        title={copy.heroTitle}
        subtitle={copy.heroSubtitle}
        size="medium"
        overlay="dark"
      />

      {/* Inquiry form, first, because every service CTA lands here. */}
      <SectionWrapper background="white" id="inquiry" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-charcoal md:text-3xl">
              {copy.formHeading}
            </h2>
            <p className="mb-8 text-muted-foreground">{copy.formLead}</p>
            <ContactFormTabbed initialIntent={intent} />
          </div>

          <div className="flex flex-col gap-5">
            {contactOptions.map((option) => (
              <div key={option.label}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {option.label}
                </p>
                {option.href && option.channel ? (
                  <ContactLink
                    channel={option.channel}
                    source="contact_page"
                    href={option.href}
                    className="text-base font-medium text-charcoal transition-colors hover:text-sage"
                  >
                    {option.value}
                  </ContactLink>
                ) : option.href ? (
                  <a
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium text-charcoal transition-colors hover:text-sage"
                  >
                    {option.value}
                  </a>
                ) : (
                  <p className="text-base font-medium text-charcoal">
                    {option.value}
                  </p>
                )}
              </div>
            ))}

            <div className="mt-4 rounded-2xl border border-charcoal/10 bg-cream/60 p-5 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-charcoal">Not sure which service?</p>
              <p className="mt-2">
                <Link href="/pricing" className="text-sage hover:underline">
                  Compare management and home care
                </Link>
                , or read what each one covers:{" "}
                <Link href={plans.manager.href} className="text-sage hover:underline">
                  full management
                </Link>
                ,{" "}
                <Link href={plans.concierge.href} className="text-sage hover:underline">
                  Home Care Concierge
                </Link>
                ,{" "}
                <Link href={plans.local.href} className="text-sage hover:underline">
                  STR cleaning and local support
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Discovery call, for owners who would rather talk. */}
      <SectionWrapper background="cream" id="discovery" className="scroll-mt-20">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-block rounded-full border border-sage/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage">
            For Owners
          </span>
          <h2 className="mt-4 text-3xl font-bold text-charcoal md:text-4xl">
            Prefer to talk? Book a free 30-minute call
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            {intent === "concierge"
              ? "We'll ask about the home, how you use it, and what you want handled, then tell you what a practical monthly care plan looks like."
              : intent === "management"
                ? "We'll look at your cabin's current performance, answer your questions about the management model, and tell you honestly whether we think we can help."
                : "Rental management or home care, we'll work out which fits and tell you honestly whether we can help. No pressure, no obligation."}
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <DiscoveryCallEmbed />
        </div>
      </SectionWrapper>

      <SocialProofStrip />
    </>
  );
}
