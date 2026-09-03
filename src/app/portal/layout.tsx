import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentOwner } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/portal/sign-out-button";

export const metadata: Metadata = {
  title: "Owner Portal",
  description:
    "Sign in to see your Frontier-managed property: monthly statements, payouts, and performance.",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const owner = await getCurrentOwner();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20">
        <div className="flex items-center justify-between gap-4 border-t border-charcoal/20 pt-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          <Link href="/portal" className="hover:text-charcoal">
            Owner Portal
          </Link>
          {owner ? (
            <span className="flex items-center gap-4">
              <span className="hidden normal-case tracking-normal sm:inline">
                {owner.email}
              </span>
              <SignOutButton />
            </span>
          ) : (
            <span>Frontier Property Management</span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
