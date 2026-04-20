"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Shield,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { TurnstileWidget } from "./turnstile-widget";
import { VerifyCode } from "./verify-code";
import { LoadingAudit } from "./loading-audit";
import { track } from "@/lib/analytics";

type Stage = "form" | "verify" | "running" | "done";
type Status = "idle" | "submitting" | "error";

function validateAirbnbUrl(url: string): "empty" | "invalid" | "valid" {
  if (!url.trim()) return "empty";
  if (/airbnb\.com\/(rooms|h)\//i.test(url) || /abnb\.me\//i.test(url)) return "valid";
  return "invalid";
}

function validateEmailShape(email: string): "empty" | "invalid" | "valid" {
  if (!email.trim()) return "empty";
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "valid";
  return "invalid";
}

export function Tier2Form() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("form");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [priorReport, setPriorReport] = useState<string | null>(null);

  const [listingUrl, setListingUrl] = useState("");
  const [email, setEmail] = useState("");
  const [ownsListing, setOwnsListing] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const urlState = validateAirbnbUrl(listingUrl);
  const emailState = validateEmailShape(email);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPriorReport(null);

    if (urlState !== "valid") {
      setError("Enter a valid Airbnb listing URL (airbnb.com/rooms/…).");
      setStatus("error");
      return;
    }
    if (emailState !== "valid") {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }
    if (!ownsListing) {
      setError("Please confirm you own or manage this listing.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch("/api/audit/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          listingUrl,
          turnstileToken,
          honeypot: fd.get("website_url_2"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.priorReport) setPriorReport(data.priorReport);
        throw new Error(data.error || "Something went wrong.");
      }
      setStage("verify");
      setStatus("idle");
      track("audit_email_submitted");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (stage === "verify") {
    return (
      <VerifyCode
        email={email}
        onVerified={(reportId) => {
          setStage("running");
          track("audit_completed", { report_id: reportId });
          // Give the loader a moment, then push to the report.
          setTimeout(() => {
            router.push(`/audit/result/${reportId}`);
          }, 2500);
        }}
        onReset={() => {
          setStage("form");
          setStatus("idle");
          setError(null);
        }}
      />
    );
  }

  if (stage === "running") {
    return <LoadingAudit />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="full-audit"
      className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
      noValidate
    >
      <h3 className="text-2xl font-bold text-charcoal md:text-3xl">
        Get your full listing audit
      </h3>
      <p className="mt-2 text-base text-muted-foreground">
        Takes 90 seconds. Free. We send the report to your email.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website_url_2"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="tier2-url">Airbnb listing URL</Label>
          <div className="relative">
            <Input
              id="tier2-url"
              type="url"
              inputMode="url"
              autoCapitalize="off"
              autoComplete="off"
              placeholder="https://www.airbnb.com/rooms/12345678"
              value={listingUrl}
              onChange={(e) => setListingUrl(e.target.value)}
              aria-invalid={urlState === "invalid"}
              className="pr-10"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              {urlState === "valid" && <CheckCircle2 className="size-4 text-sage" />}
              {urlState === "invalid" && <XCircle className="size-4 text-destructive" />}
            </span>
          </div>
          {urlState === "invalid" && (
            <p className="text-sm text-destructive">
              This doesn&apos;t look like an Airbnb listing URL. Format: airbnb.com/rooms/12345
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tier2-email">Email</Label>
          <div className="relative">
            <Input
              id="tier2-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailState === "invalid"}
              className="pr-10"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              {emailState === "valid" && <CheckCircle2 className="size-4 text-sage" />}
              {emailState === "invalid" && <XCircle className="size-4 text-destructive" />}
            </span>
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-md border border-input px-4 py-3 text-sm">
          <input
            type="checkbox"
            checked={ownsListing}
            onChange={(e) => setOwnsListing(e.target.checked)}
            className="mt-1 size-4 accent-[var(--color-sage)]"
          />
          <span className="text-charcoal">I own or manage this listing.</span>
        </label>

        <TurnstileWidget onVerify={setTurnstileToken} />

        {status === "error" && error && (
          <div
            role="alert"
            className={cn(
              "flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive",
            )}
          >
            <AlertCircle className="size-4 mt-0.5 shrink-0" />
            <div>
              {error}
              {priorReport && (
                <>
                  {" "}
                  <Link href={priorReport} className="underline font-semibold">
                    View your report
                  </Link>
                  .
                </>
              )}
            </div>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full bg-sage text-white hover:bg-sage-dark"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending verification code…
            </>
          ) : (
            <>
              Run my audit
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="size-3.5" />
          By continuing you agree to our terms. We&apos;ll send one report email. No marketing spam.
        </p>
      </div>
    </form>
  );
}
