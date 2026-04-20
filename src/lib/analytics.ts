/**
 * Thin wrapper around gtag() for conversion events.
 *
 * gtag is loaded in the root layout (see /src/app/layout.tsx). It may not
 * exist if an ad blocker is running or if this runs before the script
 * fires, so every call is null-safe.
 */

type GtagArgs =
  | ["event", string, Record<string, unknown>?]
  | ["set", Record<string, unknown>]
  | [string, ...unknown[]];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "calculator_interaction"
  | "calculator_snapshot_viewed"
  | "audit_tier1_submitted"
  | "audit_tier2_started"
  | "audit_email_submitted"
  | "audit_completed"
  | "discovery_call_cta_clicked"
  | "comparison_table_viewed"
  | "guest_strip_clicked"
  | "nav_get_estimate_clicked";

export function track(
  event: AnalyticsEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {
    // never let tracking break the UI
  }
}
