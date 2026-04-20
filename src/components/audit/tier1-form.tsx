"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TurnstileWidget } from "./turnstile-widget";
import type { MarketSnapshot } from "@/lib/audit/types";
import { track } from "@/lib/analytics";

const BEDROOM_OPTIONS = ["Studio", "1", "2", "3", "4", "5+"] as const;
const TYPE_OPTIONS = [
  { value: "Entire home", label: "Entire home" },
  { value: "Apartment", label: "Apartment / condo" },
  { value: "Cabin", label: "Cabin" },
  { value: "Unique", label: "Unique stay" },
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export function Tier1Form() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const bedroomsStr = String(fd.get("bedrooms") ?? "");
    const bedrooms = bedroomsStr === "Studio" ? 0 : bedroomsStr === "5+" ? 5 : parseInt(bedroomsStr, 10);

    setStatus("submitting");
    try {
      const res = await fetch("/api/audit/tier1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: fd.get("city"),
          bedrooms,
          propertyType: fd.get("propertyType"),
          turnstileToken,
          honeypot: fd.get("website_url_2"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSnapshot(data.snapshot as MarketSnapshot);
      setStatus("success");
      track("audit_tier1_submitted", {
        city: String(fd.get("city") || ""),
        bedrooms,
        property_type: String(fd.get("propertyType") || ""),
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success" && snapshot) {
    const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;
    return (
      <div className="rounded-2xl border border-sage/20 bg-sage/5 p-6 md:p-8">
        <div className="flex items-center gap-2 text-sage">
          <TrendingUp className="size-5" />
          <span className="text-xs uppercase tracking-widest font-semibold">
            Market snapshot, {snapshot.city}
          </span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <div className="text-sm text-muted-foreground">Market median</div>
            <div className="text-2xl font-bold text-charcoal">{fmt(snapshot.marketMedian)}/yr</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Top quartile</div>
            <div className="text-2xl font-bold text-sage">{fmt(snapshot.marketTopQuartile)}/yr</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Occupancy</div>
            <div className="text-2xl font-bold text-charcoal">
              {(snapshot.occupancyRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        <p className="mt-5 text-base text-charcoal">
          Top performers in {snapshot.city} with {snapshot.bedrooms === 0 ? "a studio" : `${snapshot.bedrooms} bedroom${snapshot.bedrooms === 1 ? "" : "s"}`} earn{" "}
          <strong>{fmt(snapshot.gapToTop)} more</strong> than the median.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="bg-sage text-white hover:bg-sage-dark">
            <a href="#full-audit">
              See what your specific listing is missing
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" onClick={() => setStatus("idle")}>
            Run another snapshot
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Snapshot link: <Link className="underline" href={`/audit/market-snapshot/${snapshot.id}`}>/audit/market-snapshot/{snapshot.id}</Link>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-white p-6 shadow-sm md:p-8"
      noValidate
    >
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-sage font-semibold">
        <TrendingUp className="size-4" />
        60-second market snapshot
      </div>
      <h3 className="text-2xl font-bold text-charcoal md:text-3xl">
        No email required
      </h3>
      <p className="mt-2 text-base text-muted-foreground">
        Just your city and bedroom count. We&apos;ll show you what top performers are earning.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website_url_2"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="tier1-city">City or ZIP</Label>
          <Input
            id="tier1-city"
            name="city"
            type="text"
            placeholder="Broken Bow, OK"
            required
            autoComplete="address-level2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tier1-bedrooms">Bedrooms</Label>
          <select
            id="tier1-bedrooms"
            name="bedrooms"
            required
            defaultValue=""
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          >
            <option value="" disabled>Select…</option>
            {BEDROOM_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="tier1-type">Property type</Label>
          <select
            id="tier1-type"
            name="propertyType"
            required
            defaultValue=""
            className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          >
            <option value="" disabled>Select…</option>
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <TurnstileWidget onVerify={setTurnstileToken} />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
        >
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-6 w-full bg-sage text-white hover:bg-sage-dark"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Pulling numbers…
          </>
        ) : (
          <>
            Show me the numbers
            <ArrowRight className="ml-2 size-4" />
          </>
        )}
      </Button>
    </form>
  );
}
