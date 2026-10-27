"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

export function SignOutButton({ redirectTo = "/portal/login" }: { redirectTo?: string } = {}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await getSupabase().auth.signOut();
        router.push(redirectTo);
        router.refresh();
      }}
      className="inline-flex min-h-9 items-center text-sm font-medium text-charcoal/80 underline-offset-4 hover:text-charcoal hover:underline disabled:opacity-50"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
