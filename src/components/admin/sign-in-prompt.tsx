"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Shown to anyone who reaches an admin page without admin access.
 *
 * The return path is taken from the current URL rather than hardcoded, so
 * signing in brings you back to the page you were trying to open — including
 * a specific owner or document — instead of dropping everyone on the owners
 * list to find their way again.
 */
export function AdminSignInPrompt() {
  const pathname = usePathname();
  const next = pathname && pathname.startsWith("/admin") ? pathname : "/admin";

  return (
    <>
      <h1 className="text-3xl font-bold text-charcoal">Admin</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Sign in with your admin email and password and you&apos;ll come straight
        back here.
      </p>
      <Link
        href={`/admin/login?next=${encodeURIComponent(next)}`}
        className="mt-6 inline-block rounded-md bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark"
      >
        Sign in
      </Link>
    </>
  );
}
