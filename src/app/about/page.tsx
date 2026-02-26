import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Shield, TrendingUp, Check } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { StepCard } from "@/components/cards/step-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Frontier Property Management — family-owned, locally operated cabin management in Broken Bow and Hochatown, Oklahoma.",
};

const whyChooseItems = [
  {
    icon: MapPin,
    title: "Trusted Local Knowledge",
    description:
      "We live and work in McCurtain County. We know the roads, the vendors, the seasons, and the market.",
  },
  {
    icon: Shield,
    title: "Hands-Off Property Management",
    description:
      "From listing to checkout, we handle it all so you don't have to.",
  },
  {
    icon: TrendingUp,
    title: "Revenue Growth",
    description:
      "Smart pricing and optimization strategies that drive results even during slow seasons.",
  },
];

const whatYouGetItems = [
  "Local manager committed to staying long-term",
  "Owner-operator who understands financial realities",
  "Experienced guest perspective on quality stays",
  "Partnership valuing woods, community, and returns equally",
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        backgroundImage="/images/hero/forest-aerial.jpg"
        title="About Frontier Property Management"
        subtitle="Family-owned. Locally operated. Built on trust."
        size="medium"
        overlay="dark"
      />

      {/* 2. Owner Bio */}
      <SectionWrapper background="white">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AnimateInView direction="left">
            <Image
              src="/images/team/hunter-collins.jpg"
              alt="Hunter Collins — Owner of Frontier Property Management"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </AnimateInView>

          <AnimateInView direction="right" delay={0.2}>
            <h2 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">
              Meet Hunter Collins
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              I&apos;m Hunter Collins. I didn&apos;t grow up in Broken Bow, but
              I married into it. My background is in Maine woodlands — a place
              with real seasons, real storms, and real quiet. I bring a triple
              perspective: cabin owner, property manager, and frequent Airbnb
              guest. That combination shapes everything we do at Frontier.
            </p>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* 3. Why Choose Frontier */}
      <SectionWrapper background="cream">
        <AnimateInView>
          <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
            Why Choose Frontier?
          </h2>
        </AnimateInView>

        <div className="grid gap-8 md:grid-cols-3">
          {whyChooseItems.map((item, i) => (
            <AnimateInView key={item.title} delay={i * 0.15}>
              <Card className="h-full text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 inline-flex rounded-lg bg-sage/10 p-3">
                    <item.icon className="size-6 text-sage" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Why Broken Bow */}
      <SectionWrapper background="white">
        <AnimateInView>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-charcoal md:text-4xl">
              Why Broken Bow Matters To Me
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Broken Bow has something most vacation towns don&apos;t — vintage
                small-town character. Old storefronts with stories behind them.
                Neighbors who still wave. A pace of life that hasn&apos;t been
                fully rewritten by tourism yet.
              </p>
              <p>
                Meanwhile, cabin tourism is growing nearby at a serious clip. The
                surrounding woods provide real seasons — vibrant fall color, quiet
                winter snow, spring thunderstorms, and long summer evenings on the
                deck. Guests come here to unplug from the noise and reconnect with
                nature.
              </p>
              <p>
                That contrast — small-town heart, booming outdoor tourism — is
                exactly what makes this area special and worth protecting with
                quality management.
              </p>
            </div>
          </div>
        </AnimateInView>
      </SectionWrapper>

      {/* 5. Vision & Mission */}
      <SectionWrapper background="cream">
        <div className="grid gap-8 md:grid-cols-2">
          <AnimateInView direction="left">
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="mb-3 text-xl font-bold text-sage">
                  Our Vision
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  To redefine property management through exceptional service and
                  maximizing rental potential while building owner trust.
                </p>
              </CardContent>
            </Card>
          </AnimateInView>

          <AnimateInView direction="right" delay={0.15}>
            <Card className="h-full">
              <CardContent className="pt-6">
                <h3 className="mb-3 text-xl font-bold text-sage">
                  Our Mission
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Handle rental management with integrity, precision, and care —
                  from listing through checkout — for consistent income with
                  minimal stress.
                </p>
              </CardContent>
            </Card>
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* 6. How It Works */}
      <SectionWrapper background="white">
        <AnimateInView>
          <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
            How It Works
          </h2>
        </AnimateInView>

        <div className="grid gap-8 md:grid-cols-3">
          <AnimateInView delay={0}>
            <StepCard
              number={1}
              title="Discovery Call"
              description="We learn about your property, goals, and expectations. You get a custom management proposal within 48 hours."
            />
          </AnimateInView>
          <AnimateInView delay={0.15}>
            <StepCard
              number={2}
              title="Custom Plan"
              description="We build a tailored management plan including pricing strategy, listing optimization, and vendor coordination."
            />
          </AnimateInView>
          <AnimateInView delay={0.3}>
            <StepCard
              number={3}
              title="We Handle It All"
              description="From professional photography to guest checkout, we manage every detail so you can enjoy stress-free income."
            />
          </AnimateInView>
        </div>
      </SectionWrapper>

      {/* 7. What You Get */}
      <SectionWrapper background="cream">
        <AnimateInView>
          <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
            What You Get With Frontier
          </h2>
        </AnimateInView>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {whatYouGetItems.map((item, i) => (
            <AnimateInView key={i} delay={i * 0.1}>
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-sage" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 8. Pricing */}
      <SectionWrapper background="sage" className="text-center">
        <AnimateInView>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Full-Service STR Management
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-xl text-white/90">
            20% of Gross Bookings
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
          >
            <Link href="/management-services">View Management Services</Link>
          </Button>
        </AnimateInView>
      </SectionWrapper>

      {/* 9. CTA */}
      <CTASection
        heading="Ready to Partner With Frontier?"
        subtext="Let's talk about your cabin and how we can help you earn more with less stress."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
