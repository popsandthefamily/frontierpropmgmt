"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { MIN_LENGTH, checkPasswordShape, timesBreached } from "@/lib/auth/password";

/**
 * Set or change a portal password.
 *
 * Passwords are optional here: an owner who is happy with emailed sign-in links
 * never needs one. This is for people who sign in often enough that waiting on
 * an email is friction.
 */
export function PasswordForm({
  email,
  hasPassword,
}: {
  email: string;
  hasPassword: boolean;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<"idle" | "checking" | "saved" | "error">("idle");
  const [problems, setProblems] = useState<string[]>([]);

  async function save() {
    setStatus("checking");
    setProblems([]);

    const shape = checkPasswordShape(password, [email.split("@")[0], "frontier", "rentwithfrontier"]);
    if (!shape.ok) {
      setProblems(shape.problems);
      setStatus("error");
      return;
    }

    const breached = await timesBreached(password);
    if (breached && breached > 0) {
      setProblems([
        `This password has appeared in ${breached.toLocaleString()} known data breaches, so it's already on attackers' lists. Please pick a different one.`,
      ]);
      setStatus("error");
      return;
    }

    const { error } = await getSupabase().auth.updateUser({ password });
    if (error) {
      setProblems([error.message]);
      setStatus("error");
      return;
    }
    setPassword("");
    setStatus("saved");
  }

  return (
    <div className="mt-6 max-w-md">
      <label
        htmlFor="new-password"
        className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-charcoal/60"
      >
        {hasPassword ? "New password" : "Choose a password"}
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="new-password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setStatus("idle");
          }}
          className="w-full rounded-md border border-border px-3 py-2 text-charcoal"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="shrink-0 rounded-md border border-border px-3 text-sm text-charcoal"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        At least {MIN_LENGTH} characters. No required symbols or numbers — a
        phrase you can actually remember is stronger than a short jumble. We
        check it against known breaches before accepting it.
      </p>

      {problems.length > 0 && (
        <ul className="mt-3 space-y-1">
          {problems.map((p) => (
            <li key={p} className="text-sm text-destructive">
              {p}
            </li>
          ))}
        </ul>
      )}
      {status === "saved" && (
        <p className="mt-3 text-sm text-sage">
          Saved. You can now sign in with your email and password, or keep using
          emailed links — both work.
        </p>
      )}

      <Button
        type="button"
        onClick={save}
        disabled={password.length === 0 || status === "checking"}
        className="mt-4 bg-sage text-white hover:bg-sage-dark disabled:opacity-40"
      >
        {status === "checking" ? "Checking…" : hasPassword ? "Change password" : "Set password"}
      </Button>
    </div>
  );
}
