"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

interface PlanCTAProps extends LinkProps {
  /** Which plan the click is attributed to. */
  plan: "manager" | "local";
  source: string;
  event?: Extract<
    AnalyticsEvent,
    "plan_cta_clicked" | "pricing_tier_cta_clicked"
  >;
}

export function PlanCTA({
  plan,
  source,
  event = "plan_cta_clicked",
  onClick,
  children,
  ...rest
}: PlanCTAProps) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, { plan, source });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
