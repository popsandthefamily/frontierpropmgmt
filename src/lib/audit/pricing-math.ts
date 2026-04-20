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

/**
 * Premium amenity signals — things a guest actively shops for that
 * genuinely change booking behavior. Matched by substring against the
 * lowercased amenity label, so "Private hot tub" still matches "hot tub".
 *
 * Intentionally excludes baseline items (hair dryer, heating, wifi,
 * fridge, microwave, essentials, smoke alarm, etc). Those are
 * table-stakes — missing them on a listing doesn't actually move revenue.
 */
const PREMIUM_AMENITY_PATTERNS: ReadonlyArray<{ pattern: string; label: string }> = [
  { pattern: "hot tub", label: "Hot tub" },
  { pattern: "pool", label: "Pool" },
  { pattern: "sauna", label: "Sauna" },
  { pattern: "ev charger", label: "EV charger" },
  { pattern: "fire pit", label: "Fire pit" },
  { pattern: "outdoor kitchen", label: "Outdoor kitchen" },
  { pattern: "outdoor shower", label: "Outdoor shower" },
  { pattern: "game room", label: "Game room" },
  { pattern: "arcade", label: "Arcade" },
  { pattern: "pool table", label: "Pool table" },
  { pattern: "ping pong", label: "Ping pong" },
  { pattern: "foosball", label: "Foosball" },
  { pattern: "air hockey", label: "Air hockey" },
  { pattern: "bbq grill", label: "BBQ grill" },
  { pattern: "grill", label: "Grill" },
  { pattern: "fire place", label: "Fireplace" },
  { pattern: "fireplace", label: "Fireplace" },
  { pattern: "wood stove", label: "Wood stove" },
  { pattern: "waterfront", label: "Waterfront" },
  { pattern: "lake access", label: "Lake access" },
  { pattern: "lake view", label: "Lake view" },
  { pattern: "water view", label: "Water view" },
  { pattern: "mountain view", label: "Mountain view" },
  { pattern: "kayak", label: "Kayaks" },
  { pattern: "paddleboard", label: "Paddleboards" },
  { pattern: "gym", label: "Home gym" },
  { pattern: "exercise equipment", label: "Exercise equipment" },
  { pattern: "projector", label: "Projector" },
  { pattern: "theater", label: "Theater room" },
  { pattern: "pets allowed", label: "Pet friendly" },
  { pattern: "pet friendly", label: "Pet friendly" },
  { pattern: "crib", label: "Crib" },
  { pattern: "high chair", label: "High chair" },
  { pattern: "pack n play", label: "Pack n play" },
  { pattern: "ski in", label: "Ski in/out" },
  { pattern: "beach access", label: "Beach access" },
  { pattern: "private entrance", label: "Private entrance" },
  { pattern: "ev level 2", label: "EV charger" },
];

function matchPremium(amenity: string): { pattern: string; label: string } | null {
  const lower = amenity.toLowerCase();
  for (const p of PREMIUM_AMENITY_PATTERNS) {
    if (lower.includes(p.pattern)) return p;
  }
  return null;
}

export function findMissingAmenities(
  target: AirROIListing,
  comps: AirROIListing[],
): string[] {
  if (comps.length === 0) return [];

  const targetAmenityRaw = target.property_details.amenities ?? [];
  const targetPremiums = new Set<string>();
  for (const a of targetAmenityRaw) {
    const m = matchPremium(a);
    if (m) targetPremiums.add(m.pattern);
  }

  // Count how many comps have each premium amenity (by canonical pattern)
  const counts = new Map<string, { count: number; label: string }>();
  for (const comp of comps) {
    const seen = new Set<string>();
    for (const a of comp.property_details.amenities ?? []) {
      const m = matchPremium(a);
      if (!m || seen.has(m.pattern)) continue;
      seen.add(m.pattern);
      const prev = counts.get(m.pattern);
      counts.set(m.pattern, { count: (prev?.count ?? 0) + 1, label: m.label });
    }
  }

  const threshold = Math.max(2, Math.ceil(comps.length * 0.5));
  return Array.from(counts.entries())
    .filter(([pattern, { count }]) => count >= threshold && !targetPremiums.has(pattern))
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4)
    .map(([, { label }]) => label);
}
// Preserved for potential future use; `capitalize` no longer needed directly.
void capitalize;

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
      description: `Most top-performing comps offer ${partial.amenityGaps.slice(0, 3).join(", ")}. Adding these lifts click-through and lets you charge a premium.`,
      // No defensible synthetic $ estimate — leave impact at 0 so it sorts
      // below pricing/occupancy and the UI can omit the bogus $/yr number.
      dollar_impact: 0,
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
