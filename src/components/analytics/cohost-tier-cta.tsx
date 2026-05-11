"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

interface TierCTAProps extends LinkProps {
  tier: string;
  source: string;
  event?: Extract<AnalyticsEvent, "cohost_tier_cta_clicked" | "pricing_tier_cta_clicked">;
}

export function CoHostTierCTA({
  tier,
  source,
  event = "cohost_tier_cta_clicked",
  onClick,
  children,
  ...rest
}: TierCTAProps) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, { tier, source });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
