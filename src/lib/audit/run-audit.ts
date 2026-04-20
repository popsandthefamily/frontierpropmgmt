import {
  getComparables,
  getFutureRates,
  getListing,
  getMarketSummary,
  getRevenueEstimate,
  lookupMarket,
} from "./airroi";
import { calculateLeaks } from "./pricing-math";
import { summarizeAudit } from "./groq";
import { newId, saveReport } from "./report-store";
import type {
  AuditReport,
  ListingData,
  MarketSummary,
  RevenueEstimate,
} from "./types";

function unwrap<T>(r: PromiseSettledResult<T>): T | null {
  return r.status === "fulfilled" ? r.value : null;
}

export async function runFullAudit(params: {
  listingId: string;
  listingUrl: string;
  email: string;
}): Promise<AuditReport> {
  const listing = await getListing(params.listingId);

  const marketLookup = listing.market_id
    ? Promise.resolve({ market_id: listing.market_id, name: undefined })
    : lookupMarket(listing.lat, listing.lng);

  const results = await Promise.allSettled([
    Promise.resolve(listing),
    getRevenueEstimate({
      lat: listing.lat,
      lng: listing.lng,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      accommodates: listing.accommodates,
      propertyType: listing.property_type,
    }),
    getComparables(params.listingId),
    getFutureRates(params.listingId).catch(() => null),
    marketLookup.then((m) => getMarketSummary(m.market_id)),
  ]);

  const listingOK = unwrap(results[0]) as ListingData | null;
  const estimate = unwrap(results[1]) as RevenueEstimate | null;
  const compsData = unwrap(results[2]) as { comparables: ListingData[] } | null;
  const market = unwrap(results[4]) as MarketSummary | null;

  const successCount = [listingOK, estimate, compsData, market].filter(Boolean).length;
  if (successCount < 3 || !listingOK || !estimate || !market) {
    throw new Error("Insufficient data from provider");
  }

  const comps = compsData?.comparables ?? [];
  const leaks = calculateLeaks(listingOK, estimate, comps, market);
  const summary = await summarizeAudit(leaks);

  const report: AuditReport = {
    id: newId(),
    createdAt: Date.now(),
    email: params.email,
    listingId: params.listingId,
    listingUrl: params.listingUrl,
    listing: {
      title: listingOK.title,
      city: listingOK.city,
      region: listingOK.region,
      bedrooms: listingOK.bedrooms,
      bathrooms: listingOK.bathrooms,
      propertyType: listingOK.property_type,
    },
    leaks,
    summary,
  };

  await saveReport(report);
  return report;
}
