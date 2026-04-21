// Mirrors AirROI's nested response shape.
export interface AirROIListing {
  listing_info: {
    listing_id: number | string;
    listing_name?: string;
    description?: string | null;
    listing_type?: string;
    room_type?: string;
    photos_count?: number;
  };
  host_info?: {
    host_id?: number | string;
    host_name?: string;
    superhost?: boolean;
  };
  location_info: {
    latitude: number;
    longitude: number;
    country?: string;
    region?: string;
    locality?: string;
    district?: string;
  };
  property_details: {
    guests: number;
    bedrooms: number;
    beds?: number;
    baths: number;
    amenities?: string[];
  };
  ratings?: {
    num_reviews?: number;
    rating_overall?: number;
  };
  performance_metrics?: {
    ttm_revenue?: number;
    ttm_avg_rate?: number;
    ttm_occupancy?: number;
  };
}

export interface RevenueEstimate {
  location: { latitude: number; longitude: number };
  revenue: number;
  average_daily_rate: number;
  occupancy: number;
  percentiles: {
    revenue: { avg: number; p25: number; p50: number; p75: number; p90: number };
    average_daily_rate: { avg: number; p25: number; p50: number; p75: number; p90: number };
    occupancy: { avg: number; p25: number; p50: number; p75: number; p90: number };
  };
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
  priceGap: number;          // $/night
  occupancyGap: number;      // 0-1 fraction
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

