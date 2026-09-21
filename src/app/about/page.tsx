import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Shield, TrendingUp, Check } from "lucide-react";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { SocialProofStrip } from "@/components/sections/social-proof-strip";
import { StepCard } from "@/components/cards/step-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { HotTubPartner } from "@/components/sections/hot-tub-partner";
import { plans, siteConfig } from "@/data/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "About Frontier: Local Broken Bow & Hochatown STR Experts",
  description:
    "Meet Hunter Collins, owner of Frontier Property Management, and advisor Beth Collins. Based in Broken Bow with lifelong local roots and a 4.95-star guest rating.",
  openGraph: {
    title: "About Frontier Property Management",
    description:
      "Owner-operated Broken Bow cabin management with lifelong local roots. Hunter Collins, owner. 4.95★.",
    images: [
      {
        url: "/images/team/hunter-collins-og.jpg",
        width: 1200,
        height: 630,
        alt: "Hunter Collins, owner of Frontier Property Management in Broken Bow",
      },
    ],
  },
  alternates: {
    canonical: `${siteConfig.url}/about`,
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
    title: "Two Ways to Work With Us",
    description:
      "Full-service rental management from listing to checkout, or Home Care Concierge for owners who keep control and want the property looked after.",
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
          "@id": `${siteConfig.url}/#business`,
          description: siteConfig.description,
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
          ],
          // Beth advises the business; she is not an owner, employee, or
          // officer, so she is declared as an advisor rather than a member.
          advisors: {
            "@type": "Person",
            name: "Beth Collins",
            jobTitle: "Advisor",
          },
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
        subtitle="Owner-operated. Locally rooted. Built on trust."
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
            Frontier is owner-operated by Hunter Collins, with Beth Collins
            advising. One perspective is from outside Broken Bow, the other is
            native to it. Decisions get looked at through both lenses.
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

      {/* 2.5 What the company does now */}
      <SectionWrapper background="cream">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
            One local team, two services
          </h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Frontier started as a short-term rental manager, and full-service
              management is still the core of what we do: we run rental cabins
              for owners who want the whole operation handled, at{" "}
              {plans.manager.feeInline}.
            </p>
            <p>
              The same owners kept asking for something else: a private second
              home that is never rented, a family cabin that rents a few
              weekends a year, or a self-managed rental that just needs a local
              person to clean, check the hot tub, and look the place over once
              a month. That is {plans.concierge.name}, {plans.concierge.feeInline},
              with the scope written down after a walkthrough. The owner keeps
              control; we perform the agreed care.
            </p>
            <p>
              Both services are delivered by the same people, using the same
              cleaners and technicians we use on the cabin we run ourselves.
              Hot-tub cleaning, service, and repair on every plan is performed
              with our partner Broken Bow Hot Tub Co.
            </p>
          </div>
          <HotTubPartner variant="card" className="mt-8" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.manager.href}>Full-service management</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-sm">
              <Link href={plans.concierge.href}>Home Care Concierge</Link>
            </Button>
          </div>
        </div>
      </SectionWrapper>

      {/* 3. Why Choose Frontier */}
      <SectionWrapper background="white">
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
            20% of Net Rental Revenue
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
      <SocialProofStrip background="white" />

      <CTASection
        heading="Ready to Partner With Frontier?"
        subtext="Let's talk about your cabin and how we can help you earn more with less stress."
        cta={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
