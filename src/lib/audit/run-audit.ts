import {
  bathsFromBedrooms,
  getComparables,
  getListing,
  getRevenueEstimate,
  guestsFromBedrooms,
} from "./airroi";
import { calculateLeaks } from "./pricing-math";
import { summarizeAudit } from "./groq";
import { newId, saveReport } from "./report-store";
import type { AuditReport } from "./types";

export async function runFullAudit(params: {
  listingId: string;
  listingUrl: string;
  email: string;
}): Promise<AuditReport> {
  const listing = await getListing(params.listingId);
  const { latitude, longitude } = listing.location_info;
  const { bedrooms, baths, guests } = {
    bedrooms: listing.property_details.bedrooms,
    baths: listing.property_details.baths || bathsFromBedrooms(listing.property_details.bedrooms),
    guests: listing.property_details.guests || guestsFromBedrooms(listing.property_details.bedrooms),
  };

  const [estimateRes, compsRes] = await Promise.allSettled([
    getRevenueEstimate({ lat: latitude, lng: longitude, bedrooms, baths, guests }),
    getComparables({ latitude, longitude, bedrooms, baths, guests }),
  ]);

  const estimate =
    estimateRes.status === "fulfilled" ? estimateRes.value : null;
  const comps =
    compsRes.status === "fulfilled" ? compsRes.value.listings : [];

  if (!estimate) {
    throw new Error("Market estimate unavailable from AirROI");
  }

  const leaks = calculateLeaks(listing, estimate, comps);
  const summary = await summarizeAudit(leaks);

  const report: AuditReport = {
    id: newId(),
    createdAt: Date.now(),
    email: params.email,
    listingId: String(params.listingId),
    listingUrl: params.listingUrl,
    listing: {
      title: listing.listing_info.listing_name,
      city: listing.location_info.locality,
      region: listing.location_info.region,
      bedrooms: listing.property_details.bedrooms,
      bathrooms: listing.property_details.baths,
      propertyType: listing.listing_info.listing_type || listing.listing_info.room_type || "home",
    },
    leaks,
    summary,
  };

  await saveReport(report);
  return report;
}
