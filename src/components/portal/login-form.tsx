"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const searchParams = useSearchParams();
  // The welcome email links here with the address already filled in, so the
  // owner only has to press the button.
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  // Owners who set a password can skip waiting on an email. The link stays the
  // default because it always works, password or not.
  const [mode, setMode] = useState<"link" | "password">("link");
  const [password, setPassword] = useState("");

  async function signInWithPassword(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const { error } = await getSupabase().auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      setError("That email and password combination didn't work.");
      setStatus("error");
      return;
    }
    const raw = searchParams.get("next");
    window.location.replace(raw && raw.startsWith("/") ? raw : "/portal");
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const raw = searchParams.get("next");
    const next = raw && raw.startsWith("/") ? raw : "";

    // Decided on the server: an account gets a sign-in link, a pending signer
    // with no account gets their signing link instead, and anyone else gets
    // nothing — all with the same answer back, so this can't be used to test
    // who is a client.
    const res = await fetch("/api/portal/access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), next }),
    });
    if (!res.ok) {
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
          Frontier management agreement, or has a document waiting to be signed,
          a link is on its way. Sign-in links expire in an hour.
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

  if (mode === "password") {
    return (
      <form onSubmit={signInWithPassword} className="mt-8">
        <label htmlFor="portal-email" className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Email address
        </label>
        <Input
          id="portal-email"
          type="email"
          required
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-3"
        />
        <label htmlFor="portal-password" className="mt-5 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60">
          Password
        </label>
        <Input
          id="portal-password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-3"
        />
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <Button
          type="submit"
          size="lg"
          disabled={status === "sending"}
          className="mt-5 w-full bg-sage text-white hover:bg-sage-dark text-base"
        >
          {status === "sending" ? "Signing in…" : "Sign in"}
        </Button>
        <button
          type="button"
          onClick={() => { setMode("link"); setError(null); }}
          className="mt-4 text-sm font-medium text-charcoal underline underline-offset-4"
        >
          Email me a link instead
        </button>
      </form>
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
      <button
        type="button"
        onClick={() => { setMode("password"); setError(null); }}
        className="mt-4 text-sm font-medium text-charcoal underline underline-offset-4"
      >
        I have a password
      </button>
    </form>
  );
}
