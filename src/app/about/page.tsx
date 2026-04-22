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
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/data/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Frontier: Local Broken Bow & Hochatown STR Experts",
  description:
    "Meet Hunter and Beth Collins, the husband-and-wife team behind Frontier Property Management. Based in Broken Bow with lifelong local roots and a 4.95-star guest rating.",
  openGraph: {
    title: "About Frontier Property Management",
    description:
      "Hunter and Beth Collins, the family-owned Broken Bow cabin management team. Local, lifelong, 4.95★.",
    images: [
      {
        url: "/images/team/hunter-collins.jpg",
        width: 1200,
        height: 630,
        alt: "Hunter Collins, owner of Frontier Property Management in Broken Bow",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/about",
  },
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
      {/* JSON-LD, Organization */}
      <JsonLd
        type="Organization"
        data={{
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/images/logos/Asset-1-2.png`,
          description:
            "Family-owned, locally operated vacation rental management company in Broken Bow and Hochatown, Oklahoma.",
          founder: {
            "@type": "Person",
            name: "Hunter Collins",
            jobTitle: "Owner & Founder",
          },
          member: [
            {
              "@type": "Person",
              name: "Hunter Collins",
              jobTitle: "Owner & Founder",
            },
            {
              "@type": "Person",
              name: "Beth Collins",
              jobTitle: "Co-Owner & Director of Local Operations",
            },
          ],
          areaServed: [
            { "@type": "Place", name: "Broken Bow, Oklahoma" },
            { "@type": "Place", name: "Hochatown, Oklahoma" },
          ],
          sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
          ],
        }}
      />

      {/* 1. Hero */}
      <HeroSection
        backgroundImage="/images/hero/forest-aerial.jpg"
        title="About Frontier Property Management"
        subtitle="Family-owned. Locally operated. Built on trust."
        size="medium"
        overlay="dark"
      />

      {/* 2. Meet the Team */}
      <SectionWrapper background="white">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            Meet the team
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Frontier is a husband-and-wife business. One of us is the
            out-of-town perspective, the other is the Broken Bow native. Every
            decision runs through both lenses.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {team.map((member, i) => (
            <AnimateInView
              key={member.name}
              direction={i === 0 ? "left" : "right"}
              delay={i * 0.1}
            >
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-charcoal">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-sage">
                  {member.role}
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>

      {/* 3. Why Choose Frontier */}
      <SectionWrapper background="cream">
        <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
          Why Choose Frontier?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {whyChooseItems.map((item) => (
            <Card key={item.title} className="h-full text-center">
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
          ))}
        </div>
      </SectionWrapper>

      {/* 4. Why Broken Bow */}
      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-3xl font-bold text-charcoal md:text-4xl">
            Why Broken Bow Matters To Us
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Broken Bow has something most vacation towns don&apos;t, vintage
              small-town character. Old storefronts with stories behind them.
              Neighbors who still wave. A pace of life that hasn&apos;t been
              fully rewritten by tourism yet.
            </p>
            <p>
              Meanwhile, cabin tourism is growing nearby at a serious clip. The
              surrounding woods provide real seasons, vibrant fall color, quiet
              winter snow, spring thunderstorms, and long summer evenings on the
              deck. Guests come here to unplug from the noise and reconnect with
              nature.
            </p>
            <p>
              That contrast, small-town heart, booming outdoor tourism, is
              exactly what makes this area special and worth protecting with
              quality management.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* 5. Vision & Mission */}
      <SectionWrapper background="cream">
        <div className="grid gap-8 md:grid-cols-2">
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

          <Card className="h-full">
            <CardContent className="pt-6">
              <h3 className="mb-3 text-xl font-bold text-sage">
                Our Mission
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                Handle rental management with integrity, precision, and care,
                from listing through checkout, for consistent income with
                minimal stress.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      {/* 6. How It Works */}
      <SectionWrapper background="white">
        <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
          How It Works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Discovery Call"
            description="We learn about your property, goals, and expectations. You get a custom management proposal within 48 hours."
          />
          <StepCard
            number={2}
            title="Custom Plan"
            description="We build a tailored management plan including pricing strategy, listing optimization, and vendor coordination."
          />
          <StepCard
            number={3}
            title="We Handle It All"
            description="From professional photography to guest checkout, we manage every detail so you can enjoy stress-free income."
          />
        </div>
      </SectionWrapper>

      {/* 7. What You Get */}
      <SectionWrapper background="cream">
        <h2 className="mb-12 text-center text-3xl font-bold text-charcoal md:text-4xl">
          What You Get With Frontier
        </h2>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {whatYouGetItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <Check className="mt-1 size-5 shrink-0 text-sage" />
              <p className="text-muted-foreground leading-relaxed">{item}</p>
            </div>
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
