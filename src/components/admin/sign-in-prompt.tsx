import Link from "next/link";

/** Shown to anyone who reaches an admin page without admin access. */
export function AdminSignInPrompt() {
  return (
    <>
      <h1 className="text-3xl font-bold text-charcoal">Admin</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Sign in with an admin email address and you&apos;ll come straight back
        here. We&apos;ll send a one-time link, so there&apos;s nothing to
        remember and no secret to copy out of a dashboard.
      </p>
      <Link
        href="/portal/login?next=/admin/owners"
        className="mt-6 inline-block rounded-md bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark"
      >
        Email me a sign-in link
      </Link>
    </>
  );
}
