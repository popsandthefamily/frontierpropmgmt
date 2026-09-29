import { AdminNav } from "@/components/admin/admin-nav";
import { isAdmin } from "@/lib/admin/auth";

/**
 * Frame shared by every admin page.
 *
 * It owns the top spacing so the pages do not each have to clear the fixed site
 * header themselves — which audit stats and social had got wrong, leaving their
 * headings tucked underneath it.
 *
 * The check here is session-only: a layout cannot read searchParams, so the
 * ?token= path is resolved inside the nav, which can. Nothing here grants
 * access; every page still calls isAdmin() with the token before it renders
 * anything privileged.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const signedIn = await isAdmin();

  return (
    <div className="min-h-screen bg-white pt-20">
      <AdminNav signedIn={signedIn} />
      <div className="pb-24">{children}</div>
    </div>
  );
}
