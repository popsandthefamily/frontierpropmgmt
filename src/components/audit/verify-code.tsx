"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  email: string;
  onVerified: (reportId: string) => void;
  onReset: () => void;
}

export function VerifyCode({ email, onVerified, onReset }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [status, setStatus] = useState<"idle" | "verifying" | "error" | "resending">("idle");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function updateDigit(idx: number, value: string) {
    const char = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = char;
      return next;
    });
    if (char && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function onKeyDown(idx: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < 5) inputsRef.current[idx + 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6).fill("").map((_, i) => pasted[i] ?? "");
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  }

  async function submit() {
    const code = digits.join("");
    if (code.length !== 6) {
      setError("Enter all 6 digits.");
      setStatus("error");
      return;
    }
    setStatus("verifying");
    setError(null);
    try {
      const res = await fetch("/api/audit/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code.");
      onVerified(data.reportId as string);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Invalid code.");
    }
  }

  async function resend() {
    if (cooldown > 0) return;
    setStatus("resending");
    setError(null);
    try {
      const res = await fetch("/api/audit/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resend: true }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Couldn't resend code.");
      }
      setCooldown(60);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Couldn't resend code.");
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-2xl font-bold text-charcoal md:text-3xl">Check your email</h3>
      <p className="mt-2 text-base text-muted-foreground">
        We sent a 6-digit code to <strong className="text-charcoal">{email}</strong>
      </p>

      <div className="mt-6 flex justify-center gap-2" onPaste={onPaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
            className="size-12 rounded-md border border-input text-center text-xl font-semibold tabular-nums shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:size-14 md:text-2xl"
          />
        ))}
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <Button
        onClick={submit}
        disabled={status === "verifying" || digits.some((d) => !d)}
        size="lg"
        className="mt-6 w-full bg-sage text-white hover:bg-sage-dark"
      >
        {status === "verifying" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Verifying…
          </>
        ) : (
          <>
            Verify and run audit
            <ArrowRight className="ml-2 size-4" />
          </>
        )}
      </Button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <button
          type="button"
          onClick={resend}
          disabled={cooldown > 0 || status === "resending"}
          className="text-sage hover:text-sage-dark disabled:text-muted-foreground"
        >
          {cooldown > 0 ? `Resend available in ${cooldown}s` : status === "resending" ? "Sending…" : "Didn't get it? Resend"}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="text-muted-foreground hover:text-charcoal"
        >
          Wrong email? Start over
        </button>
      </div>
    </div>
  );
}
