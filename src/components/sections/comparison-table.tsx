"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  COMPARISON_FOOTNOTE,
  comparisonRows,
  type ComparisonRow,
} from "@/data/comparison";

interface Column {
  key: ColKey;
  label: string;
  highlight?: boolean;
}

const COLUMNS: Column[] = [
  { key: "selfManage", label: "Self-manage" },
  { key: "vacasa", label: "Vacasa" },
  { key: "evolve", label: "Evolve" },
  { key: "frontier", label: "Frontier", highlight: true },
];

type ColKey = "selfManage" | "vacasa" | "evolve" | "frontier";

export function ComparisonTable() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-cream/60">
              <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Compare
              </th>
              {COLUMNS.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-4 text-left text-xs font-semibold uppercase tracking-widest",
                    c.highlight
                      ? "bg-sage/10 text-sage"
                      : "text-muted-foreground",
                  )}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <Row key={row.label} row={row} zebra={i % 2 === 0} />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-muted-foreground">
        {COMPARISON_FOOTNOTE}
      </p>
    </div>
  );
}

function Row({ row, zebra }: { row: ComparisonRow; zebra: boolean }) {
  const [showSources, setShowSources] = useState(false);
  const cellFor = (key: ColKey) => {
    const value = row[key];
    const isFrontier = key === "frontier";
    return (
      <td
        className={cn(
          "px-4 py-4 align-top",
          isFrontier && "bg-sage/5 font-semibold text-charcoal",
        )}
      >
        <div className="flex items-start gap-2">
          {isFrontier && (
            <Check className="mt-0.5 size-4 shrink-0 text-sage" />
          )}
          <span>{value}</span>
        </div>
      </td>
    );
  };

  return (
    <>
      <tr className={zebra ? "bg-white" : "bg-cream/20"}>
        <th
          scope="row"
          className="px-4 py-4 text-left text-sm font-medium text-charcoal align-top"
        >
          <div className="flex items-start gap-2">
            <span>{row.label}</span>
            {row.sources && row.sources.length > 0 && (
              <button
                type="button"
                onClick={() => setShowSources((v) => !v)}
                className="text-[10px] font-semibold text-sage hover:text-sage-dark"
                aria-label="Toggle sources"
              >
                [{row.sources.length}]
              </button>
            )}
          </div>
        </th>
        {cellFor("selfManage")}
        {cellFor("vacasa")}
        {cellFor("evolve")}
        {cellFor("frontier")}
      </tr>
      {showSources && row.sources && (
        <tr className={zebra ? "bg-white" : "bg-cream/20"}>
          <td
            colSpan={5}
            className="border-t border-dashed px-4 pb-4 pt-1 text-xs text-muted-foreground"
          >
            <div className="flex items-start gap-2">
              <ChevronDown className="size-3.5" />
              <div>
                Sources:
                <ul className="mt-1 list-disc pl-5">
                  {row.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-sage"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
