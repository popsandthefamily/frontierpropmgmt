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
 */
export function AvailabilityNote({ className }: { className?: string }) {
  return (
    <div className={cn("bg-sage/10", className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:text-center">
        <span className="rounded-full bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
          {availability.short}
        </span>
        <span className="text-charcoal">
          {availability.sentence}{" "}
          <Link
            href="/contact#discovery"
            className="font-semibold text-sage-dark underline-offset-4 hover:underline"
          >
            Book a discovery call
          </Link>
        </span>
      </div>
    </div>
  );
}
