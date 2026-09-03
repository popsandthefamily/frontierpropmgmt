import Link from "next/link";

/** Shown to anyone who reaches an admin page without admin access. */
export function AdminSignInPrompt() {
  return (
    <>
      <h1 className="text-3xl font-bold text-charcoal">Admin</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Sign in with your admin email and password and you&apos;ll come straight
        back here.
      </p>
      <Link
        href="/admin/login?next=/admin/owners"
        className="mt-6 inline-block rounded-md bg-sage px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-dark"
      >
        Sign in
      </Link>
    </>
  );
}
