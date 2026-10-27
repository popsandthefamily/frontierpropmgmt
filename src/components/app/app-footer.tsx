"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { isAppRoute } from "./app-routes";

/**
 * Swaps the marketing footer for a one-line one on the working screens.
 *
 * The marketing footer is a server component, so it is passed in as children
 * and rendered untouched everywhere else.
 */
export function FooterSwitch({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (!isAppRoute(pathname)) return <>{children}</>;

  return (
    <footer data-print="hide" className="border-t border-border bg-white print:hidden">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-sm text-muted-foreground">
        <span>Frontier Property Management LLC · Broken Bow, Oklahoma</span>
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
            className="font-medium text-charcoal underline-offset-4 hover:underline"
          >
            Call or text {siteConfig.phone}
          </a>
          <Link href="/privacy-policy" className="underline-offset-4 hover:text-charcoal hover:underline">
            Privacy
          </Link>
        </span>
      </div>
    </footer>
  );
}
