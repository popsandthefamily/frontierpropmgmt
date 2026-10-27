"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/portal/sign-out-button";

const SECTIONS = [
  { label: "Overview", href: "/portal" },
  { label: "Sign-in & security", href: "/portal/security" },
];

/**
 * The portal's own navigation, under the site header.
 *
 * It used to be a strip of tiny letter-spaced capitals with no sign of where
 * you were. Real links with a current state, and the account it is signed in
 * as, so a shared family laptop never leaves anyone guessing whose numbers
 * they are looking at.
 */
export function PortalNav({ email }: { email: string | null }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Owner portal" data-print="hide" className="border-b border-border bg-cream/60 print:hidden">
      <div className="mx-auto flex max-w-5xl items-center gap-x-1 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
        <span className={cn("mr-3 shrink-0 text-sm font-semibold text-charcoal", email && "hidden sm:inline")}>
          Owner portal
        </span>
        {email &&
          SECTIONS.map((s) => {
            const active =
              s.href === "/portal"
                ? pathname === "/portal" || pathname.startsWith("/portal/statements")
                : pathname.startsWith(s.href);
            return (
              <Link
                key={s.href}
                href={s.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors",
                  active ? "bg-charcoal text-white" : "text-charcoal/80 hover:bg-charcoal/5 hover:text-charcoal",
                )}
              >
                {s.label}
              </Link>
            );
          })}
        {email && (
          <span className="ml-auto flex min-w-0 shrink-0 items-center gap-4 pl-3 text-sm">
            <span className="hidden truncate text-muted-foreground sm:inline" title="Signed in as">
              {email}
            </span>
            <SignOutButton />
          </span>
        )}
      </div>
    </nav>
  );
}
