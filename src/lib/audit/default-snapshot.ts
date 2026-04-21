// Server-only helper, fetches the default Hochatown / Broken Bow market snapshot
// so /audit can render a live $ number the moment a visitor lands.
//
// Uses Redis (persistent across deploys and builds) with a 24h TTL. The
// previous implementation used Next.js fetch cache with 6h revalidate, but
// that cache got nuked on every build and didn't dedupe across the five
// pages that embed <AuditCalculator>, driving AirROI costs up.

import type { RevenueEstimate } from "./types";
import { getRedis } from "./redis";

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

const REDIS_KEY = "audit:snapshot:default:hochatown-3br";
const REDIS_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function getDefaultMarketSnapshot(): Promise<DefaultMarketSnapshot | null> {
  const key = process.env.AIRROI_API_KEY;
  const base = (process.env.AIRROI_BASE_URL || "https://api.airroi.com").replace(/\/$/, "");
  if (!key) return null;

  // Redis cache hit path — free, zero AirROI calls
  try {
    const redis = getRedis();
    const cached = await redis.get<DefaultMarketSnapshot>(REDIS_KEY);
    if (cached && typeof cached === "object" && cached.marketMedian > 0) {
      return cached;
    }
  } catch {
    // Redis unreachable — fall through to live AirROI fetch
  }

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
      // No Next.js fetch cache — Redis handles dedup across pages/deploys
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as RevenueEstimate;
    const p50 = Math.round(data.percentiles?.revenue?.p50 ?? data.revenue ?? 0);
    const p75 = Math.round(data.percentiles?.revenue?.p75 ?? 0);
    const occ = data.percentiles?.occupancy?.p50 ?? data.occupancy ?? 0;
    if (p50 === 0) return null;

    const snapshot: DefaultMarketSnapshot = {
      city: DEFAULT_PARAMS.displayName,
      bedrooms: DEFAULT_PARAMS.bedrooms,
      propertyType: DEFAULT_PARAMS.propertyType,
      marketMedian: p50,
      marketTopQuartile: p75,
      occupancyRate: occ,
      gapToTop: Math.max(0, p75 - p50),
    };

    // Persist to Redis so the next 24h of page loads (across all pages and
    // deploys) are served without another AirROI hit.
    try {
      const redis = getRedis();
      await redis.set(REDIS_KEY, snapshot, { ex: REDIS_TTL_SECONDS });
    } catch {
      // Cache write failure is non-fatal
    }

    return snapshot;
  } catch {
    return null;
  }
}
