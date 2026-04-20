"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Pulling your listing data",
  "Finding comparable properties",
  "Calculating revenue gaps",
  "Writing your report",
] as const;

export function LoadingAudit() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) return;
    const ms = [5000, 8000, 8000, 7000][step] ?? 6000;
    const t = setTimeout(() => setStep((s) => s + 1), ms);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm md:p-10">
      <h3 className="text-2xl font-bold text-charcoal md:text-3xl">
        Auditing your listing…
      </h3>
      <p className="mt-2 text-base text-muted-foreground">
        This takes about 30 seconds.
      </p>

      <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-md border px-4 py-3 transition-colors",
                done && "border-sage/30 bg-sage/5 text-charcoal",
                active && "border-sage/40 bg-white text-charcoal",
                !done && !active && "border-input bg-muted/50 text-muted-foreground",
              )}
            >
              {done ? (
                <CheckCircle2 className="size-5 shrink-0 text-sage" />
              ) : active ? (
                <Loader2 className="size-5 shrink-0 animate-spin text-sage" />
              ) : (
                <span className="size-5 shrink-0 rounded-full border border-input" />
              )}
              <span className={cn("text-sm font-medium", done && "text-charcoal")}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
