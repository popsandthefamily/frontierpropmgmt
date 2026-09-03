import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentOwner } from "@/lib/supabase/server";
import { PasswordForm } from "@/components/portal/password-form";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function PortalSecurityPage() {
  const owner = await getCurrentOwner();
  if (!owner) redirect("/portal/login?next=/portal/security");

  // Supabase records which providers an account uses; "email" with a password
  // set shows up here once one exists.
  const hasPassword = Boolean(
    (owner.identities ?? []).some((i) => i.provider === "email") &&
      owner.user_metadata?.has_password,
  );

  return (
    <>
      <div className="mt-10">
        <h1 className="text-[2rem] font-bold leading-tight tracking-tight text-charcoal sm:text-4xl">
          Sign-in and security
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
          You can sign in either way, and you can change this whenever you like.
        </p>
      </div>

      <section className="mt-10 max-w-xl">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Emailed sign-in link
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Enter your email at the sign-in page and we send you a one-time link.
          Nothing to remember, and nothing to steal. This works whether or not
          you set a password.
        </p>
      </section>

      <section className="mt-12 max-w-xl">
        <div className="border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Password
        </div>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {hasPassword
            ? "You have a password set. You can change it below."
            : "Optional. Worth setting if you check in often and would rather not wait on an email each time."}
        </p>
        <PasswordForm email={owner.email ?? ""} hasPassword={hasPassword} />
      </section>

      <p className="mt-12 border-t border-border pt-4 text-sm text-muted-foreground">
        <Link href="/portal" className="font-medium text-charcoal underline underline-offset-4">
          Back to your portal
        </Link>
      </p>
    </>
  );
}
