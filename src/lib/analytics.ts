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
  | "discovery_call_booked"
  | "comparison_table_viewed"
  | "guest_strip_clicked"
  | "nav_get_estimate_clicked"
  | "local_services_page_viewed"
  | "plan_cta_clicked"
  | "pricing_page_viewed"
  | "pricing_tier_cta_clicked"
  | "home_care_page_viewed"
  /** Visitor chooses management, concierge, or local support. */
  | "service_select"
  /** First meaningful interaction with a form, once per form session. */
  | "form_start"
  /** A valid inquiry was accepted by the submission endpoint. Never a click. */
  | "generate_lead"
  /** Telephone or email link clicked. Not a completed conversation. */
  | "contact_click"
  /** Scheduling path opened. */
  | "schedule_call_click";

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
