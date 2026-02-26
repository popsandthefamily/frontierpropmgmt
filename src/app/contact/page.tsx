import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { ContactFormTabbed } from "@/components/forms/contact-form-tabbed";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Frontier Property Management for cabin management services in Broken Bow and Hochatown, Oklahoma. Call, email, or fill out our contact form.",
};

const contactCards = [
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/-/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteConfig.address,
    href: undefined,
  },
  {
    icon: Clock,
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

          {/* Right — Contact Info Cards (1/3 width) */}
          <div className="flex flex-col gap-4">
            {contactCards.map((card, i) => (
              <AnimateInView key={card.label} direction="right" delay={i * 0.1}>
                <Card>
                  <CardContent className="flex items-start gap-4 pt-6">
                    <div className="rounded-lg bg-sage/10 p-2.5">
                      <card.icon className="size-5 text-sage" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {card.label}
                      </p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="text-sm font-medium text-charcoal hover:text-sage transition-colors"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-charcoal">
                          {card.value}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </AnimateInView>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
