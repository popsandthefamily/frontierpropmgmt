import { Suspense } from "react";
import { AuthCallback } from "@/components/portal/auth-callback";

export const metadata = { robots: { index: false, follow: false } };

export default function PortalAuthCallbackPage() {
  return (
    <Suspense fallback={<CallbackShell />}>
      <AuthCallback />
    </Suspense>
  );
}

function CallbackShell() {
  return (
    <div className="mx-auto mt-24 max-w-md text-center">
      <p className="text-base text-muted-foreground">Signing you in…</p>
    </div>
  );
}
