import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

const CARDS = [
  {
    name: "Co-Host",
    pitch: "Flat monthly fee. No percentages, ever.",
    body: "Pro listing, pricing, and content support while you keep guest communication and cleaning.",
    price: "Starting at $349/month",
    href: "/co-host",
    cta: "Learn more about Co-Host",
  },
  {
    name: "Full Service",
    pitch: "Truly hands-off cabin management.",
    body: "We handle guest communication, cleaning, maintenance, taxes, and monthly reporting end-to-end.",
    price: "20% of bookings",
    href: "/management-services",
    cta: "Learn more about Full Service",
  },
];

export function TwoWaysToWork() {
  return (
    <SectionWrapper background="white" id="two-ways">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">
          Two ways to work with us
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          Whether you want truly hands-off management or just expert help on the parts you
          don&apos;t have time for, Frontier has a tier that fits.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.name}
            href={card.href}
            className="group flex flex-col rounded-2xl border border-charcoal/10 bg-cream/40 p-6 transition hover:border-sage hover:bg-sage/5"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-charcoal">
                {card.name}
              </h3>
              <p className="mt-2 text-base font-semibold text-sage-dark">
                {card.pitch}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{card.body}</p>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div className="font-heading text-lg font-bold text-charcoal">
                {card.price}
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-sage transition group-hover:gap-2">
                {card.cta}
                <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
        Not sure which fits?{" "}
        <Link href="/pricing" className="font-medium text-sage hover:text-sage-dark hover:underline">
          See all plans compared →
        </Link>
      </p>
    </SectionWrapper>
  );
}
