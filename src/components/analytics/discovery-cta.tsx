"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { track } from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

/**
 * Drop-in wrapper around next/link that fires discovery_call_cta_clicked
 * when the link is activated. Use on any "Schedule a Discovery Call" /
 * "Book a call" button that leads to /contact#discovery (Cal.com embed)
 * so we can measure the Facebook-ad-to-call funnel end to end.
 */
export function DiscoveryCTALink({
  source,
  onClick,
  children,
  ...rest
}: LinkProps & { source: string }) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track("discovery_call_cta_clicked", { source });
        onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}
