"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Password sign-in for admins.
 *
 * Owners sign in with a one-time emailed link and have no password at all.
 * Admins get a password because waiting on an email to check a statement is
 * friction that a daily user should not have to accept.
 */
export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "signing" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("signing");
    setError(null);

    const { error } = await getSupabase().auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      // One message for a wrong address and a wrong password alike, so this
      // form can't be used to work out which accounts exist.
      setError("That email and password combination didn't work.");
      setStatus("error");
      return;
    }

    const raw = searchParams.get("next");
    const next = raw && raw.startsWith("/") ? raw : "/admin/owners";
    // A full navigation so the server picks up the session cookie just written.
    window.location.replace(next);
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 max-w-sm">
      <label
        htmlFor="admin-email"
        className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
      >
        Email
      </label>
      <Input
        id="admin-email"
        type="email"
        required
        autoComplete="username"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2"
      />

      <label
        htmlFor="admin-password"
        className="mt-5 block text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
      >
        Password
      </label>
      <Input
        id="admin-password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2"
      />

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={status === "signing"}
        className="mt-6 w-full bg-sage text-white hover:bg-sage-dark text-base"
      >
        {status === "signing" ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
