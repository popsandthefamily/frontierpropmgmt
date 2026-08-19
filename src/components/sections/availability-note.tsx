import Link from "next/link";
import { availability } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * The one-line version of Frontier's core positioning claim.
 *
 * Being deliberately small is the differentiator a national operator cannot
 * copy, which makes it the thing worth repeating in the same words on every
 * page rather than paraphrasing. The wording lives in src/data/site.ts so
 * the date only has to be updated once.
 *
 * Set as a ruled band in the same register as the trust ledger: hairline
 * borders, tracked caps, no badge and no tinted panel.
 */
export function AvailabilityNote({ className }: { className?: string }) {
  return (
    <div className={cn("border-y border-border bg-cream", className)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-center sm:gap-6 lg:px-8">
        <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          {availability.short}
        </span>
        <span className="text-sm text-charcoal">
          {availability.sentence}{" "}
          <Link
            href="/contact#discovery"
            className="font-medium underline underline-offset-4 hover:text-sage"
          >
            Book a discovery call
          </Link>
        </span>
      </div>
    </div>
  );
}
