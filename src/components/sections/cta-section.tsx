import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  heading: string;
  subtext?: string;
  backgroundImage?: string;
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

export function CTASection({
  heading,
  subtext,
  backgroundImage,
  cta,
  secondaryCta,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn("relative overflow-hidden", className)}
    >
      {/* Background — either image or sage fallback */}
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      ) : (
        <div className="absolute inset-0 bg-sage" />
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {heading}
        </h2>

        {subtext && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">
            {subtext}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-white text-sage hover:bg-cream px-8 text-base font-semibold"
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>

          {secondaryCta && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 text-base"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
