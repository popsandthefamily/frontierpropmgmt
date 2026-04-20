import type {
  LeakAnalysis,
  ListingData,
  MarketSummary,
  Recommendation,
  RevenueEstimate,
} from "./types";

export function median(values: number[]): number {
  const filtered = values.filter((v) => Number.isFinite(v));
  if (filtered.length === 0) return 0;
  const sorted = [...filtered].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function findMissingAmenities(
  target: ListingData,
  comps: ListingData[],
): string[] {
  if (comps.length === 0) return [];
  const targetSet = new Set((target.amenities || []).map((a) => a.toLowerCase()));
  const amenityCounts = new Map<string, number>();
  for (const comp of comps) {
    const seen = new Set<string>();
    for (const raw of comp.amenities || []) {
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
    "workspace",
    "high chair",
    "crib",
    "pet friendly",
  ]);
  return Array.from(amenityCounts.entries())
    .filter(([amenity, count]) => {
      if (count < threshold) return false;
      if (targetSet.has(amenity)) return false;
      // Favor high-signal amenities first
      return highValueSignals.has(amenity) || count / comps.length > 0.7;
    })
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([amenity]) => capitalize(amenity));
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildRecommendations(
  target: ListingData,
  _estimate: RevenueEstimate,
  comps: ListingData[],
  _market: MarketSummary,
  leaks: Omit<LeakAnalysis, "recommendations">,
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Pricing gap — if we're >10% below comp median ADR
  if (leaks.priceGap > 0 && target.adr > 0 && leaks.priceGap / target.adr > 0.1) {
    const nightsBooked = Math.round(target.occupancy_rate * 365);
    const dollarImpact = Math.round(leaks.priceGap * nightsBooked);
    recs.push({
      priority: 1,
      category: "pricing",
      description: `Your nightly rate is $${Math.round(leaks.priceGap)} below comparable listings. Align pricing with comps to capture ~$${dollarImpact.toLocaleString()}/yr.`,
      dollar_impact: dollarImpact,
    });
  }

  // Occupancy gap — >8 points below comps
  if (leaks.occupancyGap > 0.08) {
    const extraNights = Math.round(leaks.occupancyGap * 365);
    const dollarImpact = Math.round(extraNights * target.adr);
    recs.push({
      priority: 2,
      category: "occupancy",
      description: `You're booked ${(leaks.occupancyGap * 100).toFixed(0)} points fewer nights than similar properties — roughly ${extraNights} unbooked nights worth ~$${dollarImpact.toLocaleString()}/yr.`,
      dollar_impact: dollarImpact,
    });
  }

  // Amenity gaps
  if (leaks.amenityGaps.length > 0) {
    recs.push({
      priority: 3,
      category: "amenities",
      description: `Top-performing comps offer ${leaks.amenityGaps.slice(0, 3).join(", ")}. Adding these aligns you with what books.`,
      dollar_impact: Math.round(leaks.amenityGaps.length * 1000),
    });
  }

  // Photo count
  if (leaks.photoGap > 5) {
    recs.push({
      priority: 4,
      category: "photos",
      description: `Comp listings use a median of ${Math.round(leaks.photoGap + target.photos_count)} photos. You have ${target.photos_count}. Add professional shots to lift click-through.`,
      dollar_impact: 1500,
    });
  }

  // Rating
  if (leaks.ratingGap > 0.3) {
    recs.push({
      priority: 5,
      category: "rating",
      description: `Your rating trails comps by ${leaks.ratingGap.toFixed(2)} points. Tighter cleaning protocols and pre-arrival messaging typically close this within 10–15 stays.`,
      dollar_impact: 2000,
    });
  }

  // Normalize priorities
  return recs
    .sort((a, b) => b.dollar_impact - a.dollar_impact)
    .map((r, i) => ({ ...r, priority: i + 1 }));
}

export function calculateLeaks(
  target: ListingData,
  estimate: RevenueEstimate,
  comps: ListingData[],
  market: MarketSummary,
): LeakAnalysis {
  const targetRevenue = estimate.annual_revenue_projection ?? 0;
  const medianRevenue = market.revenue_p50 ?? 0;
  const topQuartileRevenue = market.revenue_p75 ?? 0;

  const validComps = comps.filter((c) => c && Number.isFinite(c.adr));
  const compADRMedian = median(validComps.map((c) => c.adr));
  const compOccMedian = median(validComps.map((c) => c.occupancy_rate));
  const compPhotosMedian = median(validComps.map((c) => c.photos_count ?? 0));
  const compRatingMedian = median(validComps.map((c) => c.rating ?? 0));

  const priceGap = Math.max(0, compADRMedian - target.adr);
  const occupancyGap = Math.max(0, compOccMedian - target.occupancy_rate);

  const rawLeak = Math.max(0, medianRevenue - targetRevenue);
  const displayLeak = Math.min(rawLeak, 75000);

  const photoGap = Math.max(0, compPhotosMedian - (target.photos_count ?? 0));
  const ratingGap = Math.max(0, compRatingMedian - (target.rating ?? 0));

  const partial = {
    targetAnnualRevenue: Math.round(targetRevenue),
    marketMedianAnnualRevenue: Math.round(medianRevenue),
    topQuartileAnnualRevenue: Math.round(topQuartileRevenue),
    revenueLeak: Math.round(displayLeak),
    priceGap,
    occupancyGap,
    amenityGaps: findMissingAmenities(target, validComps),
    photoGap,
    ratingGap,
  };

  const recommendations = buildRecommendations(target, estimate, validComps, market, partial);

  return { ...partial, recommendations };
}
