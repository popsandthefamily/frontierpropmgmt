"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { plans } from "@/data/site";
import { CTA } from "@/data/home-care";

type Rent = "never" | "sometimes" | "regularly";
type Control = "me" | "someone";
type Turnover = "rarely" | "weekly";

interface Recommendation {
  key: "concierge" | "manager" | "local";
  title: string;
  why: string;
  href: string;
  cta: { label: string; href: string };
}

const RECS: Record<Recommendation["key"], Omit<Recommendation, "why">> = {
  concierge: {
    key: "concierge",
    title: plans.concierge.name,
    href: plans.concierge.href,
    cta: CTA.concierge,
  },
  manager: {
    key: "manager",
    title: "Full-Service STR Management",
    href: plans.manager.href,
    cta: CTA.management,
  },
  local: {
    key: "local",
    title: plans.local.name,
    href: plans.local.href,
    cta: CTA.localSupport,
  },
};

/**
 * The same logic the page's comparison table describes, as four clicks.
 * Deterministic and explained: every result says why it was chosen.
 */
function recommend(rent: Rent, control?: Control, turnover?: Turnover): Recommendation {
  if (rent === "never") {
    return {
      ...RECS.concierge,
      why: "A home you don't rent needs care, not management: a monthly clean, hot-tub attention, a visual check, and a report. There is no listing to run.",
    };
  }
  if (control === "someone") {
    return {
      ...RECS.manager,
      why: "You want someone else answering guests and setting prices. That is full management: the listing, pricing, guests, cleaning, maintenance, and taxes.",
    };
  }
  if (rent === "regularly" || turnover === "weekly") {
    return {
      ...RECS.local,
      why: "You run the listing and it turns over often, so you need turnover cleans on your booking calendar and someone local for maintenance. You keep the guests and the pricing.",
    };
  }
  return {
    ...RECS.concierge,
    why: "The cabin is mostly yours and rents now and then. A monthly care plan covers the house, and an occasional guest turnover is quoted as its own line.",
  };
}

const OPTION =
  "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function Options<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-2 sm:grid-cols-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            OPTION,
            value === o.value
              ? "border-sage bg-sage/10 text-charcoal"
              : "border-charcoal/15 bg-white text-charcoal hover:border-sage",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function ServiceQuiz() {
  const [rent, setRent] = useState<Rent>();
  const [control, setControl] = useState<Control>();
  const [turnover, setTurnover] = useState<Turnover>();

  const needsControl = rent !== undefined && rent !== "never";
  const needsTurnover = needsControl && control === "me";
  const complete =
    rent === "never" ||
    (needsControl && control === "someone") ||
    (needsTurnover && turnover !== undefined);

  const result = complete ? recommend(rent!, control, turnover) : undefined;

  function reset() {
    setRent(undefined);
    setControl(undefined);
    setTurnover(undefined);
  }

  function choose<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      track("service_select", { source: "service_quiz" });
    };
  }

  return (
    <div className="rounded-2xl border border-charcoal/10 bg-white p-6 md:p-8">
      <ol className="space-y-7">
        <li>
          <p className="mb-3 text-base font-semibold text-charcoal">
            1. Do you rent the property to guests?
          </p>
          <Options<Rent>
            name="Do you rent the property to guests?"
            value={rent}
            onChange={(v) => {
              choose(setRent)(v);
              setControl(undefined);
              setTurnover(undefined);
            }}
            options={[
              { value: "never", label: "No, it's ours" },
              { value: "sometimes", label: "A few times a year" },
              { value: "regularly", label: "Yes, regularly" },
            ]}
          />
        </li>

        {needsControl && (
          <li>
            <p className="mb-3 text-base font-semibold text-charcoal">
              2. Who should answer guests and set prices?
            </p>
            <Options<Control>
              name="Who should answer guests and set prices?"
              value={control}
              onChange={(v) => {
                choose(setControl)(v);
                setTurnover(undefined);
              }}
              options={[
                { value: "me", label: "Me, I'll keep that" },
                { value: "someone", label: "Someone else" },
              ]}
            />
          </li>
        )}

        {needsTurnover && (
          <li>
            <p className="mb-3 text-base font-semibold text-charcoal">
              3. How often do guests check out?
            </p>
            <Options<Turnover>
              name="How often do guests check out?"
              value={turnover}
              onChange={choose(setTurnover)}
              options={[
                { value: "rarely", label: "Now and then" },
                { value: "weekly", label: "Most weekends" },
              ]}
            />
          </li>
        )}
      </ol>

      <div aria-live="polite">
        {result && (
          <div className="mt-8 rounded-2xl border border-sage bg-sage/5 p-5">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-sage">
              Best fit
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-charcoal">
              {result.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {result.why}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={result.cta.href}
                className="inline-flex h-10 items-center justify-center rounded-md bg-sage px-5 text-sm font-semibold text-white hover:bg-sage-dark"
              >
                {result.cta.label}
              </Link>
              <Link
                href={result.href}
                className="group inline-flex items-center gap-1 text-sm font-medium text-sage hover:underline"
              >
                What it includes
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-charcoal sm:ml-auto"
              >
                <RotateCcw className="size-3.5" /> Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
