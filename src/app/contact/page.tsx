import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ContactFormTabbed } from "@/components/forms/contact-form-tabbed";
import { DiscoveryCallEmbed } from "@/components/book/discovery-call-embed";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us: Book a Cabin or Get a Free Management Estimate",
  description:
    "Contact Frontier Property Management to book a Broken Bow cabin or get a free management estimate. Call 580-207-7154 or schedule a discovery call.",
  openGraph: {
    title: "Contact Frontier Property Management",
    description:
      "Schedule a free discovery call or reach out for cabin booking assistance. Based in Broken Bow, OK.",
    images: [
      {
        url: "/images/discover/hochatown-drive.png",
        width: 1200,
        height: 630,
        alt: "Scenic road through Hochatown, Oklahoma",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/contact",
  },
};

const contactOptions = [
  {
    emoji: "\u{1F4DE}",
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/-/g, "")}`,
  },
  {
    emoji: "\u{2709}\u{FE0F}",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    emoji: "\u{1F4CD}",
    label: "Address",
    value: siteConfig.address,
    href: undefined,
  },
  {
    emoji: "\u{1F552}",
    label: "Hours",
    value: siteConfig.hours,
    href: undefined,
  },
  {
    emoji: "\u{2B50}",
    label: "Reviews",
    value: "See us on Google",
    href: siteConfig.social.google,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage="/images/discover/hochatown-drive.png"
        title="Get in Touch"
        subtitle="Looking to book a cabin or need help managing your property? We're here for both."
        size="medium"
        overlay="dark"
      />

      {/* Discovery Call: Cal.com embed */}
      <SectionWrapper background="cream" id="discovery">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="inline-block rounded-full border border-sage/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-sage">
            For Owners
          </span>
          <h2 className="mt-4 text-3xl font-bold text-charcoal md:text-4xl">
            Schedule a free 30-minute discovery call
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
            Pick a time that works. We&apos;ll look at your cabin&apos;s
            current performance, answer your questions about our management
            model, and tell you honestly whether we think we can help.
            No-pressure, no obligation.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <DiscoveryCallEmbed />
        </div>
      </SectionWrapper>

      {/* Two-Column Layout */}
      <SectionWrapper background="white">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Prefer to send a message?
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            If you&apos;re not ready to book a time, or you&apos;re here to ask
            about a cabin stay, use the form below.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left, Contact Form (2/3 width) */}
          <div className="lg:col-span-2">
            <h3 className="mb-2 text-2xl font-bold text-charcoal md:text-3xl">
              How can we help?
            </h3>
            <p className="mb-8 text-muted-foreground">
              Select your situation below and we&apos;ll show you the right
              form.
            </p>
            <ContactFormTabbed />
          </div>

          {/* Right, Contact Info (1/3 width) */}
          <div className="flex flex-col gap-5">
            {contactOptions.map((option) => (
              <div key={option.label} className="flex items-start gap-4">
                <span className="text-2xl leading-none" role="img" aria-label={option.label}>
                  {option.emoji}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {option.label}
                  </p>
                  {option.href ? (
                    <a
                      href={option.href}
                      className="text-base font-medium text-charcoal hover:text-sage transition-colors"
                    >
                      {option.value}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-charcoal">
                      {option.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
