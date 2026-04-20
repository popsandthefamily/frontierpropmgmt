// Server-only helper — fetches the default Hochatown / Broken Bow market snapshot
// so /audit can render a live $ number the moment a visitor lands.
//
// Uses Next.js fetch cache so we only pay AirROI's $0.20 once per revalidate window
// instead of on every page view.

import type { RevenueEstimate } from "./types";

export interface DefaultMarketSnapshot {
  city: string;
  bedrooms: number;
  propertyType: string;
  marketMedian: number;
  marketTopQuartile: number;
  occupancyRate: number;
  gapToTop: number;
}

const DEFAULT_PARAMS = {
  address: "Hochatown, OK",
  bedrooms: 3,
  baths: 2,
  guests: 8,
  displayName: "Broken Bow / Hochatown",
  propertyType: "Cabin",
} as const;

export async function getDefaultMarketSnapshot(): Promise<DefaultMarketSnapshot | null> {
  const key = process.env.AIRROI_API_KEY;
  const base = (process.env.AIRROI_BASE_URL || "https://api.airroi.com").replace(/\/$/, "");
  if (!key) return null;

  const qs = new URLSearchParams({
    address: DEFAULT_PARAMS.address,
    bedrooms: String(DEFAULT_PARAMS.bedrooms),
    baths: String(DEFAULT_PARAMS.baths),
    guests: String(DEFAULT_PARAMS.guests),
    currency: "usd",
  }).toString();

  try {
    const res = await fetch(`${base}/calculator/estimate?${qs}`, {
      headers: { "X-API-KEY": key, Accept: "application/json" },
      // Cache for 6 hours — market percentiles don't change minute-to-minute
      next: { revalidate: 60 * 60 * 6, tags: ["audit-default-snapshot"] },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RevenueEstimate;
    const p50 = Math.round(data.percentiles?.revenue?.p50 ?? data.revenue ?? 0);
    const p75 = Math.round(data.percentiles?.revenue?.p75 ?? 0);
    const occ = data.percentiles?.occupancy?.p50 ?? data.occupancy ?? 0;
    if (p50 === 0) return null;
    return {
      city: DEFAULT_PARAMS.displayName,
      bedrooms: DEFAULT_PARAMS.bedrooms,
      propertyType: DEFAULT_PARAMS.propertyType,
      marketMedian: p50,
      marketTopQuartile: p75,
      occupancyRate: occ,
      gapToTop: Math.max(0, p75 - p50),
    };
  } catch {
    return null;
  }
}
