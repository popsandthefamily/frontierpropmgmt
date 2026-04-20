export interface ListingData {
  id: string;
  title?: string;
  bedrooms: number;
  bathrooms: number;
  accommodates: number;
  property_type: string;
  lat: number;
  lng: number;
  adr: number;
  occupancy_rate: number;
  photos_count: number;
  rating: number;
  reviews_count: number;
  amenities: string[];
  market_id?: string;
  city?: string;
  region?: string;
}

export interface RevenueEstimate {
  annual_revenue_projection: number;
  adr_projection: number;
  occupancy_projection: number;
}

export interface MarketSummary {
  market_id: string;
  name?: string;
  revenue_p25: number;
  revenue_p50: number;
  revenue_p75: number;
  adr_p50: number;
  occupancy_p50: number;
}

export interface Recommendation {
  priority: number;
  category: "pricing" | "occupancy" | "amenities" | "photos" | "rating";
  description: string;
  dollar_impact: number;
}

export interface LeakAnalysis {
  targetAnnualRevenue: number;
  marketMedianAnnualRevenue: number;
  topQuartileAnnualRevenue: number;
  revenueLeak: number;
  priceGap: number;
  occupancyGap: number;
  amenityGaps: string[];
  photoGap: number;
  ratingGap: number;
  recommendations: Recommendation[];
}

export interface AuditReport {
  id: string;
  createdAt: number;
  email: string;
  listingId: string;
  listingUrl: string;
  listing: {
    title?: string;
    city?: string;
    region?: string;
    bedrooms: number;
    bathrooms: number;
    propertyType: string;
  };
  leaks: LeakAnalysis;
  summary: string;
}

export interface MarketSnapshot {
  id: string;
  createdAt: number;
  city: string;
  bedrooms: number;
  propertyType: string;
  marketMedian: number;
  marketTopQuartile: number;
  occupancyRate: number;
  gapToTop: number;
}
