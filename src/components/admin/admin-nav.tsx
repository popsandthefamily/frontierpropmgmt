"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { SignOutButton } from "@/components/portal/sign-out-button";

const SECTIONS = [
  { label: "Overview", href: "/admin" },
  { label: "Owners", href: "/admin/owners" },
  { label: "Audit stats", href: "/admin/audit-stats" },
  { label: "Social", href: "/admin/social" },
];

function Nav({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();
  const token = useSearchParams().get("token");

  // The sign-in page is the one admin route that should not offer navigation
  // to places the visitor cannot reach yet.
  if (pathname === "/admin/login") return null;

  // A layout cannot read searchParams, so the session check is done on the
  // server and the token path — the fallback for bookmarks and local testing —
  // is recognised here, where the query string is readable.
  if (!signedIn && !token) return null;

  const qs = token ? `?token=${encodeURIComponent(token)}` : "";

  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-1 gap-y-2 px-4 py-3">
        <span className="mr-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-charcoal/50">
          Frontier Admin
        </span>

        {SECTIONS.map((s) => {
          // /admin must match exactly, or it would light up on every page.
          const active =
            s.href === "/admin"
              ? pathname === "/admin"
              : pathname === s.href || pathname.startsWith(s.href + "/");

          return (
            <Link
              key={s.href}
              href={`${s.href}${qs}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "bg-charcoal text-white"
                  : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal",
              )}
            >
              {s.label}
            </Link>
          );
        })}

        <span className="ml-auto flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          <Link href="/portal" className="hover:text-charcoal">
            Owner view
          </Link>
          {signedIn && <SignOutButton redirectTo="/admin/login" />}
        </span>
      </div>
    </nav>
  );
}

/**
 * Shared navigation for every admin page.
 *
 * Until this existed the admin pages had no links between them at all, so
 * reaching audit stats or social meant typing the URL from memory. Every link
 * carries the ?token= through, because losing it mid-session drops you back to
 * the sign-in prompt.
 */
export function AdminNav({ signedIn }: { signedIn: boolean }) {
  // useSearchParams needs a Suspense boundary to avoid opting the whole tree
  // into client-side rendering.
  return (
    <Suspense fallback={null}>
      <Nav signedIn={signedIn} />
    </Suspense>
  );
}
