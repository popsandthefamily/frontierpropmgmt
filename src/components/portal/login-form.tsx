"use client";

import { useState, type FormEvent } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const { error } = await getSupabase().auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        // Frontier creates owner accounts. Signing in must never create one,
        // or anyone with an email address could mint a portal login.
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/portal/auth/callback`,
      },
    });

    // Deliberately not distinguishing "no such owner" from "sent". Saying which
    // would turn this form into a way to test whether someone is a client.
    if (error && !/signups not allowed|not found/i.test(error.message)) {
      setError("Something went wrong sending that link. Try again in a moment.");
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="mt-8 border-t border-border pt-6">
        <h2 className="font-heading text-xl font-semibold text-charcoal">
          Check your email
        </h2>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          If <span className="font-medium text-charcoal">{email}</span> is on a
          Frontier management agreement, a sign-in link is on its way. It expires
          in an hour.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-charcoal underline underline-offset-4"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8">
      <label
        htmlFor="portal-email"
        className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
      >
        Email address
      </label>
      <Input
        id="portal-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mt-3"
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-5 w-full bg-sage text-white hover:bg-sage-dark text-base"
      >
        {status === "sending" ? "Sending…" : "Email me a sign-in link"}
      </Button>
    </form>
  );
}
