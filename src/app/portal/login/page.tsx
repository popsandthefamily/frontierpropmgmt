import { Suspense } from "react";
import { LoginForm } from "@/components/portal/login-form";

export default function PortalLoginPage() {
  return (
    <div className="mx-auto mt-16 max-w-md">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-charcoal md:text-4xl">
        Owner sign in
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        Enter the email address on your management agreement and we&apos;ll send
        you a sign-in link. No password to remember, and the link is good for
        one use.
      </p>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
      <p className="mt-10 border-t border-border pt-4 text-sm text-muted-foreground">
        Not a Frontier owner yet?{" "}
        <a
          href="/audit#full-audit"
          className="font-medium text-charcoal underline underline-offset-4"
        >
          Run a free listing audit
        </a>{" "}
        or{" "}
        <a
          href="/contact#discovery"
          className="font-medium text-charcoal underline underline-offset-4"
        >
          book a call
        </a>
        .
      </p>
    </div>
  );
}
