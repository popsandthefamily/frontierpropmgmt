import type { AuditReport } from "./types";
import { getSupabaseAdmin } from "@/lib/supabase/client";

/**
 * The durable half of an audit.
 *
 * `saveReport` puts the report in Redis under a 90-day TTL, which serves
 * /audit/result/:id quickly and then forgets the lead. This writes the same
 * report to Postgres, where it stays: the owner's email, the listing they
 * asked about, the gap we found, and a status column so follow-up has
 * somewhere to live.
 *
 * It is deliberately best-effort. An owner who just waited through an audit
 * must get their report even if the database is unreachable or the service
 * role key has not been set yet, so every failure here is logged and
 * swallowed rather than thrown. Redis remains the source of truth for
 * serving the report; this is the source of truth for the relationship.
 */
export async function saveLead(report: AuditReport): Promise<void> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      "[audit] SUPABASE_SERVICE_ROLE_KEY is not set, lead not persisted:",
      report.id,
    );
    return;
  }

  try {
    const { leaks, listing } = report;
    const { error } = await getSupabaseAdmin()
      .from("audit_leads")
      // Upsert rather than insert: re-running the same report id should
      // refresh the row, never fail the audit on a duplicate key.
      .upsert(
        {
          id: report.id,
          created_at: new Date(report.createdAt).toISOString(),
          email: report.email,
          listing_id: report.listingId,
          listing_url: report.listingUrl,
          listing_title: listing.title ?? null,
          listing_city: listing.city ?? null,
          listing_region: listing.region ?? null,
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          property_type: listing.propertyType,
          revenue_leak: leaks.revenueLeak,
          target_annual_revenue: leaks.targetAnnualRevenue,
          market_median_annual_revenue: leaks.marketMedianAnnualRevenue,
          top_quartile_annual_revenue: leaks.topQuartileAnnualRevenue,
          price_gap: leaks.priceGap,
          occupancy_gap: leaks.occupancyGap,
          photo_gap: leaks.photoGap,
          rating_gap: leaks.ratingGap,
          summary: report.summary,
          report,
        },
        { onConflict: "id" },
      );

    if (error) {
      console.error("[audit] failed to persist lead", report.id, error.message);
    }
  } catch (err) {
    console.error("[audit] failed to persist lead", report.id, err);
  }
}
