import type {
  AirROIListing,
  LeakAnalysis,
  Recommendation,
  RevenueEstimate,
} from "./types";

function median(values: number[]): number {
  const filtered = values.filter((v) => Number.isFinite(v));
  if (filtered.length === 0) return 0;
  const sorted = [...filtered].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function findMissingAmenities(
  target: AirROIListing,
  comps: AirROIListing[],
): string[] {
  if (comps.length === 0) return [];
  const targetSet = new Set((target.property_details.amenities ?? []).map((a) => a.toLowerCase()));
  const amenityCounts = new Map<string, number>();
  for (const comp of comps) {
    const seen = new Set<string>();
    for (const raw of comp.property_details.amenities ?? []) {
      const key = raw.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      amenityCounts.set(key, (amenityCounts.get(key) ?? 0) + 1);
    }
  }
  const threshold = comps.length * 0.5;
  const highValueSignals = new Set([
    "hot tub",
    "pool",
    "sauna",
    "ev charger",
    "fire pit",
    "game room",
    "arcade",
    "outdoor kitchen",
    "pool table",
    "washer",
    "dryer",
    "dedicated workspace",
    "high chair",
    "crib",
    "pets allowed",
  ]);
  return Array.from(amenityCounts.entries())
    .filter(([amenity, count]) => {
      if (count < threshold) return false;
      if (targetSet.has(amenity)) return false;
      return highValueSignals.has(amenity) || count / comps.length > 0.7;
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([amenity]) => capitalize(amenity));
}

function buildRecommendations(
  target: AirROIListing,
  comps: AirROIListing[],
  partial: Omit<LeakAnalysis, "recommendations">,
): Recommendation[] {
  const recs: Recommendation[] = [];
  const targetADR = target.performance_metrics?.ttm_avg_rate ?? 0;
  const targetOcc = target.performance_metrics?.ttm_occupancy ?? 0;
  const targetPhotos = target.listing_info.photos_count ?? 0;

  if (partial.priceGap > 0 && targetADR > 0 && partial.priceGap / targetADR > 0.1) {
    const nightsBooked = Math.max(1, Math.round(targetOcc * 365));
    const dollarImpact = Math.round(partial.priceGap * nightsBooked);
    recs.push({
      priority: 1,
      category: "pricing",
      description: `Your nightly rate is $${Math.round(partial.priceGap)} below comparable listings. Aligning pricing with comps recovers roughly $${dollarImpact.toLocaleString()}/yr.`,
      dollar_impact: dollarImpact,
    });
  }

  if (partial.occupancyGap > 0.08 && targetADR > 0) {
    const extraNights = Math.round(partial.occupancyGap * 365);
    const dollarImpact = Math.round(extraNights * targetADR);
    recs.push({
      priority: 2,
      category: "occupancy",
      description: `You're booked ${(partial.occupancyGap * 100).toFixed(0)} points fewer nights than similar properties — roughly ${extraNights} unbooked nights worth about $${dollarImpact.toLocaleString()}/yr.`,
      dollar_impact: dollarImpact,
    });
  }

  if (partial.amenityGaps.length > 0) {
    recs.push({
      priority: 3,
      category: "amenities",
      description: `Top comps offer ${partial.amenityGaps.slice(0, 3).join(", ")}. Adding these aligns you with what books.`,
      dollar_impact: Math.round(partial.amenityGaps.length * 1000),
    });
  }

  if (partial.photoGap > 5) {
    const compMedian = Math.round(partial.photoGap + targetPhotos);
    recs.push({
      priority: 4,
      category: "photos",
      description: `Comparable listings show a median of ${compMedian} photos. You have ${targetPhotos}. More professional shots lift click-through and book rate.`,
      dollar_impact: 1500,
    });
  }

  if (partial.ratingGap > 0.3) {
    recs.push({
      priority: 5,
      category: "rating",
      description: `Your rating trails comps by ${partial.ratingGap.toFixed(2)} points. Tighter cleaning protocols and pre-arrival messaging typically close this within 10–15 stays.`,
      dollar_impact: 2000,
    });
  }

  void comps;
  return recs
    .sort((a, b) => b.dollar_impact - a.dollar_impact)
    .map((r, i) => ({ ...r, priority: i + 1 }));
}

export function calculateLeaks(
  target: AirROIListing,
  estimate: RevenueEstimate,
  comps: AirROIListing[],
): LeakAnalysis {
  const pm = target.performance_metrics ?? {};
  const targetRevenue = pm.ttm_revenue ?? 0;
  const targetADR = pm.ttm_avg_rate ?? 0;
  const targetOcc = pm.ttm_occupancy ?? 0;
  const targetPhotos = target.listing_info.photos_count ?? 0;
  const targetRating = target.ratings?.rating_overall ?? 0;

  const medianRevenue = estimate.percentiles?.revenue?.p50 ?? estimate.revenue ?? 0;
  const topQuartileRevenue = estimate.percentiles?.revenue?.p75 ?? 0;
  const marketADRMedian = estimate.percentiles?.average_daily_rate?.p50 ?? estimate.average_daily_rate ?? 0;
  const marketOccMedian = estimate.percentiles?.occupancy?.p50 ?? estimate.occupancy ?? 0;

  // Prefer comp-based comparisons when we have enough comps (more listing-relevant than market-wide)
  const validComps = comps.filter((c) => Number.isFinite(c.performance_metrics?.ttm_avg_rate));
  const compADRMedian = validComps.length >= 3
    ? median(validComps.map((c) => c.performance_metrics?.ttm_avg_rate ?? 0))
    : marketADRMedian;
  const compOccMedian = validComps.length >= 3
    ? median(validComps.map((c) => c.performance_metrics?.ttm_occupancy ?? 0))
    : marketOccMedian;
  const compPhotosMedian = median(validComps.map((c) => c.listing_info.photos_count ?? 0));
  const compRatingMedian = median(validComps.map((c) => c.ratings?.rating_overall ?? 0));

  const priceGap = Math.max(0, compADRMedian - targetADR);
  const occupancyGap = Math.max(0, compOccMedian - targetOcc);

  const rawLeak = Math.max(0, medianRevenue - targetRevenue);
  const displayLeak = Math.min(rawLeak, 75000);

  const partial = {
    targetAnnualRevenue: Math.round(targetRevenue),
    marketMedianAnnualRevenue: Math.round(medianRevenue),
    topQuartileAnnualRevenue: Math.round(topQuartileRevenue),
    revenueLeak: Math.round(displayLeak),
    priceGap,
    occupancyGap,
    amenityGaps: findMissingAmenities(target, validComps),
    photoGap: Math.max(0, compPhotosMedian - targetPhotos),
    ratingGap: Math.max(0, compRatingMedian - targetRating),
  };

  const recommendations = buildRecommendations(target, validComps, partial);

  return { ...partial, recommendations };
}
