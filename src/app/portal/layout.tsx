import type { Metadata } from "next";
import { getCurrentOwner } from "@/lib/supabase/server";
import { PortalNav } from "@/components/portal/portal-nav";

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
    <div data-app className="min-h-screen bg-white pt-20 print:pt-0">
      <PortalNav email={owner?.email ?? null} />
      <div className="mx-auto max-w-5xl px-4 pb-20">{children}</div>
    </div>
  );
}
