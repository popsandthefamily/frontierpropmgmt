import type {
  ListingData,
  MarketSummary,
  RevenueEstimate,
} from "./types";

const BASE = process.env.AIRROI_BASE_URL || "https://api.airroi.com/v1";
const KEY = process.env.AIRROI_API_KEY;

export class AirROIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AirROIError";
    this.status = status;
  }
}

async function airroiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  if (!KEY) throw new AirROIError("AIRROI_API_KEY not configured", 500);
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    // No caching — pricing/occupancy data must be fresh
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AirROIError(`AirROI ${path} ${res.status}: ${body.slice(0, 300)}`, res.status);
  }
  return (await res.json()) as T;
}

// ----- Endpoint wrappers ------------------------------------------------

export async function lookupMarket(lat: number, lng: number) {
  return airroiRequest<{ market_id: string; name?: string }>(
    `/markets/lookup?lat=${lat}&lng=${lng}`,
  );
}

export async function searchMarkets(query: string) {
  return airroiRequest<{ results: Array<{ market_id: string; name: string; city?: string; region?: string }> }>(
    `/markets/search?q=${encodeURIComponent(query)}`,
  );
}

export async function getMarketSummary(marketId: string): Promise<MarketSummary> {
  return airroiRequest<MarketSummary>("/markets/summary", {
    method: "POST",
    body: JSON.stringify({ market_id: marketId }),
  });
}

export async function getMarketOccupancy(marketId: string) {
  return airroiRequest<{ occupancy_p50: number; occupancy_p75: number }>(
    `/markets/metrics/occupancy?market_id=${encodeURIComponent(marketId)}`,
  );
}

export async function getListing(listingId: string): Promise<ListingData> {
  return airroiRequest<ListingData>(`/listings?id=${encodeURIComponent(listingId)}`);
}

export async function getRevenueEstimate(params: {
  lat: number;
  lng: number;
  bedrooms: number;
  bathrooms: number;
  accommodates: number;
  propertyType: string;
}): Promise<RevenueEstimate> {
  const qs = new URLSearchParams({
    lat: String(params.lat),
    lng: String(params.lng),
    bedrooms: String(params.bedrooms),
    bathrooms: String(params.bathrooms),
    accommodates: String(params.accommodates),
    property_type: params.propertyType,
  }).toString();
  return airroiRequest<RevenueEstimate>(`/calculator/estimate?${qs}`);
}

export async function getComparables(listingId: string): Promise<{ comparables: ListingData[] }> {
  return airroiRequest<{ comparables: ListingData[] }>(
    `/listings/comparables?id=${encodeURIComponent(listingId)}`,
  );
}

export async function getFutureRates(listingId: string) {
  return airroiRequest<{ avg_future_rate: number; bookings_on_books: number }>(
    `/listings/future/rates?id=${encodeURIComponent(listingId)}`,
  );
}

// ----- URL parsing ------------------------------------------------------

export function extractListingId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  const roomsMatch = trimmed.match(/\/rooms\/(\d+)/);
  if (roomsMatch) return roomsMatch[1];
  const hMatch = trimmed.match(/\/h\/[a-z0-9-]*?(\d{6,})/i);
  if (hMatch) return hMatch[1];
  const bareId = trimmed.match(/^\d{6,}$/);
  if (bareId) return trimmed;
  return null;
}

export function isLikelyAirbnbUrl(url: string): boolean {
  return /airbnb\.com\/(rooms|h)\//i.test(url) || /abnb\.me\//i.test(url);
}
