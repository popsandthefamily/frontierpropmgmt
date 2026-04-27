import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { flagshipCaseStudy } from "@/data/flagship-case-study";

interface FlagshipCaseStudySectionProps {
  background?: "white" | "cream";
  eyebrow?: string;
}

export function FlagshipCaseStudySection({
  background = "cream",
  eyebrow = "Flagship cabin",
}: FlagshipCaseStudySectionProps) {
  const c = flagshipCaseStudy;

  return (
    <SectionWrapper background={background}>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
        <AnimateInView direction="left">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg md:aspect-[4/3]">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateInView>

        <AnimateInView direction="right">
          <p className="text-xs font-semibold uppercase tracking-widest text-sage">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-bold text-charcoal md:text-4xl">
            {c.headline}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {c.name} — {c.location}
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {c.summary}
          </p>
          <ul className="mt-6 space-y-3">
            {c.proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-charcoal">
                <Check className="mt-0.5 size-5 shrink-0 text-sage" />
                <span className="text-base">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-sage text-white hover:bg-sage-dark px-7 text-base"
            >
              <Link href={c.cta.href}>
                {c.cta.label}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-7 text-base"
            >
              <Link href={c.propertyHref}>See the cabin</Link>
            </Button>
          </div>
        </AnimateInView>
      </div>
    </SectionWrapper>
  );
}
