import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ContactFormTabbed } from "@/components/forms/contact-form-tabbed";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title:
    "Contact Us, Book a Cabin or Get a Free Management Estimate",
  description:
    "Contact Frontier Property Management to book a Broken Bow cabin or get a free management estimate. Call 580-207-7154 or fill out our form.",
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

      {/* Two-Column Layout */}
      <SectionWrapper background="white">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left, Contact Form (2/3 width) */}
          <div className="lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold text-charcoal md:text-3xl">
              How can we help?
            </h2>
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
