import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ContactFormTabbed } from "@/components/forms/contact-form-tabbed";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Frontier Property Management for cabin management services in Broken Bow and Hochatown, Oklahoma. Call, email, or fill out our contact form.",
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
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage="/images/hero/hero-bg.jpg"
        title="Get in Touch"
        subtitle="Looking to book a cabin or need help managing your property? We're here for both."
        size="medium"
        overlay="dark"
      />

      {/* Two-Column Layout */}
      <SectionWrapper background="white">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left — Contact Form (2/3 width) */}
          <div className="lg:col-span-2">
            <AnimateInView direction="left">
              <h2 className="mb-2 text-2xl font-bold text-charcoal md:text-3xl">
                How can we help?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Select your situation below and we&apos;ll show you the right
                form.
              </p>
              <ContactFormTabbed />
            </AnimateInView>
          </div>

          {/* Right — Contact Info (1/3 width) */}
          <div className="flex flex-col gap-5">
            {contactOptions.map((option, i) => (
              <AnimateInView key={option.label} direction="right" delay={i * 0.1}>
                <div className="flex items-start gap-4">
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
              </AnimateInView>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
