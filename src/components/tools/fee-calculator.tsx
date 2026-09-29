"use client";

import { useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import {
  computeFees,
  EXAMPLE_INPUTS,
  OTHER_BASE_LABELS,
  pctLabel,
  usd,
  type OtherBase,
} from "@/lib/fee-math";

const inputClass =
  "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-md border px-3 text-base shadow-xs outline-none focus-visible:ring-[3px]";

/** Parse a user-typed number: strips $ , % and spaces; empty is 0. */
function parseNumber(raw: string): number {
  const n = Number(raw.replace(/[$,%\s]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * "What will I actually pay?" Compares Frontier's 20% of net rental revenue
 * with another manager's rate on whatever base they use, on the owner's own
 * numbers. All arithmetic lives in src/lib/fee-math.ts.
 */
export function FeeCalculator() {
  const id = useId();
  const [rent, setRent] = useState(String(EXAMPLE_INPUTS.rent));
  const [guestFees, setGuestFees] = useState(String(EXAMPLE_INPUTS.guestFees));
  const [hostFee, setHostFee] = useState(String(EXAMPLE_INPUTS.hostFeeRate * 100));
  const [otherRate, setOtherRate] = useState(String(EXAMPLE_INPUTS.otherRate * 100));
  const [otherBase, setOtherBase] = useState<OtherBase>(EXAMPLE_INPUTS.otherBase);
  const tracked = useRef(false);

  const result = useMemo(
    () =>
      computeFees({
        rent: parseNumber(rent),
        guestFees: parseNumber(guestFees),
        hostFeeRate: Math.min(parseNumber(hostFee), 100) / 100,
        otherRate: Math.min(parseNumber(otherRate), 100) / 100,
        otherBase,
        frontierRate: 0.2,
      }),
    [rent, guestFees, hostFee, otherRate, otherBase],
  );

  function onFirstUse() {
    if (tracked.current) return;
    tracked.current = true;
    track("calculator_interaction", { tool: "management_fee_calculator" });
  }

  const cheaper =
    Math.abs(result.difference) < 1
      ? "The two fees are about the same on these numbers."
      : result.difference > 0
        ? `On these numbers the other manager's fee is ${usd(result.difference)} a year more than Frontier's.`
        : `On these numbers Frontier's fee is ${usd(-result.difference)} a year more than the other manager's.`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]" onInput={onFirstUse} onChange={onFirstUse}>
      <form
        className="space-y-5 rounded-2xl border border-charcoal/10 bg-white p-6"
        onSubmit={(e) => e.preventDefault()}
        aria-describedby={`${id}-note`}
      >
        <div className="space-y-1.5">
          <label htmlFor={`${id}-rent`} className="text-sm font-medium text-charcoal">
            Nightly-rate revenue for the year
          </label>
          <input
            id={`${id}-rent`}
            inputMode="decimal"
            className={inputClass}
            value={rent}
            onChange={(e) => setRent(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            What guests paid for the nights, before cleaning fees and taxes.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${id}-fees`} className="text-sm font-medium text-charcoal">
            Cleaning and pet fees collected
          </label>
          <input
            id={`${id}-fees`}
            inputMode="decimal"
            className={inputClass}
            value={guestFees}
            onChange={(e) => setGuestFees(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor={`${id}-host`} className="text-sm font-medium text-charcoal">
            Platform host fee (%)
          </label>
          <input
            id={`${id}-host`}
            inputMode="decimal"
            className={inputClass}
            value={hostFee}
            onChange={(e) => setHostFee(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            What Airbnb or VRBO withholds from you. Airbnb&apos;s host-only
            fee is 15.5%; it replaced the older 3% split fee for every U.S.
            host by September 2026. Your payout report shows yours.
          </p>
        </div>

        <fieldset className="space-y-3 border-t border-charcoal/10 pt-5">
          <legend className="text-sm font-semibold text-charcoal">
            The other manager&apos;s quote
          </legend>
          <div className="space-y-1.5">
            <label htmlFor={`${id}-other`} className="text-sm font-medium text-charcoal">
              Their rate (%)
            </label>
            <input
              id={`${id}-other`}
              inputMode="decimal"
              className={inputClass}
              value={otherRate}
              onChange={(e) => setOtherRate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-charcoal">It is charged on</p>
            {(Object.keys(OTHER_BASE_LABELS) as OtherBase[]).map((key) => (
              <label key={key} className="flex items-start gap-2 text-sm text-charcoal">
                <input
                  type="radio"
                  name={`${id}-base`}
                  value={key}
                  checked={otherBase === key}
                  onChange={() => setOtherBase(key)}
                  className="mt-1 size-4 accent-sage"
                />
                <span>{OTHER_BASE_LABELS[key]}</span>
              </label>
            ))}
            <p className="text-xs text-muted-foreground">
              Not sure? Ask them. Most managers do not say on their website.
            </p>
          </div>
        </fieldset>
      </form>

      <div className="rounded-2xl border border-sage bg-white p-6 ring-1 ring-sage/30" aria-live="polite">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
          Yearly management fee
        </p>
        <dl className="mt-5 space-y-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-4">
            <dt className="text-sm text-charcoal">
              Frontier: 20% of {usd(result.frontierBase)} net rental revenue
            </dt>
            <dd className="font-heading text-3xl font-bold text-charcoal">{usd(result.frontierFee)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-charcoal/10 pb-4">
            <dt className="text-sm text-charcoal">
              Other manager: {pctLabel(Math.min(parseNumber(otherRate), 100) / 100)} of{" "}
              {usd(result.otherBaseAmount)}
            </dt>
            <dd className="font-heading text-3xl font-bold text-charcoal">{usd(result.otherFee)}</dd>
          </div>
        </dl>
        <p
          className={cn(
            "mt-5 rounded-xl p-4 text-sm leading-relaxed",
            result.difference >= 0 ? "bg-sage/10 text-charcoal" : "bg-cream text-charcoal",
          )}
        >
          {cheaper}
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          As a share of the {usd(result.grossBooking)} guests paid in rent and
          fees: Frontier {pctLabel(result.frontierEffectiveRate)}, the other
          manager {pctLabel(result.otherEffectiveRate)}.
        </p>
        <p id={`${id}-note`} className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Management fee only. Cleaning fees go to the cleaners either way, and
          other costs (setup, technology, or monthly fees, maintenance markups)
          are not included; ask each manager for those separately. Taxes are
          collected on top of the stay and remitted, so they are never part of
          either base here.
        </p>
      </div>
    </div>
  );
}
