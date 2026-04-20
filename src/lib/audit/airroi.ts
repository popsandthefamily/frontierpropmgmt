import type { AirROIListing, RevenueEstimate } from "./types";

const BASE = (process.env.AIRROI_BASE_URL || "https://api.airroi.com").replace(/\/$/, "");
const KEY = process.env.AIRROI_API_KEY;

export class AirROIError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "AirROIError";
    this.status = status;
  }
}

async function airroi<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!KEY) throw new AirROIError("AIRROI_API_KEY not configured", 500);
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "X-API-KEY": KEY,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AirROIError(
      `AirROI ${path} ${res.status}: ${body.slice(0, 300)}`,
      res.status,
    );
  }
  return (await res.json()) as T;
}

// ----- Endpoints --------------------------------------------------------

export async function lookupMarket(lat: number, lng: number) {
  return airroi<{
    full_name: string;
    country: string;
    region: string;
    locality: string;
    district: string | null;
  }>(`/markets/lookup?lat=${lat}&lng=${lng}`);
}

export async function getListing(listingId: string): Promise<AirROIListing> {
  return airroi<AirROIListing>(`/listings?id=${encodeURIComponent(listingId)}&currency=usd`);
}

export interface CalculatorParams {
  address?: string;
  lat?: number;
  lng?: number;
  bedrooms: number;
  baths: number;
  guests: number;
}

export async function getRevenueEstimate(p: CalculatorParams): Promise<RevenueEstimate> {
  const qs = new URLSearchParams();
  if (p.address) qs.set("address", p.address);
  if (p.lat != null) qs.set("lat", String(p.lat));
  if (p.lng != null) qs.set("lng", String(p.lng));
  qs.set("bedrooms", String(Math.max(1, p.bedrooms))); // studio → 1
  qs.set("baths", String(p.baths));
  qs.set("guests", String(p.guests));
  qs.set("currency", "usd");
  return airroi<RevenueEstimate>(`/calculator/estimate?${qs.toString()}`);
}

export async function getComparables(params: {
  latitude: number;
  longitude: number;
  bedrooms: number;
  baths: number;
  guests: number;
}): Promise<{ listings: AirROIListing[] }> {
  const qs = new URLSearchParams({
    latitude: String(params.latitude),
    longitude: String(params.longitude),
    bedrooms: String(Math.max(1, params.bedrooms)),
    baths: String(params.baths),
    guests: String(params.guests),
    currency: "usd",
  }).toString();
  return airroi<{ listings: AirROIListing[] }>(`/listings/comparables?${qs}`);
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

// ----- Helpers ----------------------------------------------------------

export function guestsFromBedrooms(bedrooms: number): number {
  return bedrooms === 0 ? 2 : bedrooms * 2 + 2;
}

export function bathsFromBedrooms(bedrooms: number): number {
  if (bedrooms <= 1) return 1;
  if (bedrooms === 2) return 1.5;
  return 2;
}
