import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-28 pb-24">
      <h1 className="text-3xl font-bold tracking-tight text-charcoal md:text-4xl">
        Admin sign in
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        For Frontier staff. Owners sign in at{" "}
        <a href="/portal" className="font-medium text-charcoal underline underline-offset-4">
          the owner portal
        </a>{" "}
        instead.
      </p>
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
