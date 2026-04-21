/**
 * Hochatown / Broken Bow 3-bedroom cabin market snapshot.
 *
 * Static data captured directly from the AirROI /calculator/estimate
 * endpoint so the homepage and related pages render instantly with real
 * numbers and cost zero AirROI credits per visitor.
 *
 * Refresh cadence: manual, monthly (first of each month is a reasonable
 * cadence). Market percentiles don't move fast enough for daily updates
 * to matter for marketing copy. When you refresh, update all four
 * fields + asOf + dataMonth, and double-check the live /audit Tier-2
 * flow still gives consistent numbers.
 */
export interface HochatownMarketSnapshot {
  /** Display string shown to visitors, e.g. "April 2026". */
  asOf: string;
  /** YYYY-MM — used for comparisons and auto-refresh reminders. */
  dataMonth: string;
  /** Median expected annual revenue for a 3BR cabin in Hochatown. */
  marketMedian: number;
  /** 75th-percentile annual revenue (top performers). */
  marketTopQuartile: number;
  /** Median market-wide occupancy rate, 0-1. */
  occupancyRate: number;
  /** Derived: gap between top quartile and median. */
  gapToTop: number;
}

export const hochatownMarket: HochatownMarketSnapshot = {
  asOf: "April 2026",
  dataMonth: "2026-04",
  marketMedian: 52_482,
  marketTopQuartile: 71_750,
  occupancyRate: 0.36,
  gapToTop: 19_268,
};
