import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { partners } from "@/data/site";

interface HotTubPartnerProps {
  /**
   * `inline`: a one-line badge to sit under any list that mentions hot-tub
   * work. `card`: a fuller block for the concierge and about pages.
   */
  variant?: "inline" | "card";
  className?: string;
}

/**
 * Co-branded credit for Broken Bow Hot Tub Co., which performs the hot-tub
 * cleaning, service, and repair on every Frontier plan. Rendered wherever
 * hot-tub work is described so the partnership is visible, not buried.
 */
export function HotTubPartner({ variant = "inline", className }: HotTubPartnerProps) {
  const p = partners.hotTub;

  if (variant === "card") {
    return (
      <div
        className={cn(
          "mx-auto flex max-w-3xl flex-col gap-5 rounded-2xl border border-sage/30 bg-white p-6 sm:flex-row sm:items-center md:p-8",
          className,
        )}
      >
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 self-start sm:self-center"
          aria-label={`${p.name} website`}
        >
          <Image
            src={p.logo}
            alt={`${p.name} logo`}
            width={96}
            height={96}
            className="size-24 rounded-full"
          />
        </a>
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
            Hot-tub partner
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal">
            {p.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {p.blurb}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-sage hover:text-sage-dark hover:underline"
            >
              {p.displayUrl}
              <ArrowUpRight className="size-4" />
            </a>
            <a
              href={`tel:${p.phone.replace(/\D/g, "")}`}
              className="font-medium text-charcoal hover:text-sage"
            >
              {p.phone}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group mx-auto flex max-w-3xl items-center gap-4 rounded-xl border border-sage/30 bg-white px-4 py-3 text-sm text-charcoal transition-colors hover:border-sage",
        className,
      )}
    >
      <Image
        src={p.logo}
        alt={`${p.name} logo`}
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-full"
      />
      <span className="leading-snug">
        {p.sentence}{" "}
        <span className="inline-flex items-center gap-0.5 font-semibold text-sage group-hover:underline">
          {p.displayUrl}
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </a>
  );
}
