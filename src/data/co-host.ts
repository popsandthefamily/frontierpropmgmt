/**
 * Co-Host is a single offering. The feature list is identical for every
 * property; pricing scales with property size. Outliers (6+BR, portfolios)
 * get a custom quote but the same service.
 */

export interface CoHostPricingBand {
  id: "small" | "mid" | "large";
  label: string;
  size: string;
  price: string;
  priceSuffix: string;
  bestFor: string;
}

export const CO_HOST_PRICING_BANDS: CoHostPricingBand[] = [
  {
    id: "small",
    label: "Up to 3 bedrooms",
    size: "1–3 BR",
    price: "$349",
    priceSuffix: "per month, flat",
    bestFor: "Cabins, condos, single-family homes under ~$80K annual gross.",
  },
  {
    id: "mid",
    label: "4 to 5 bedrooms",
    size: "4–5 BR",
    price: "$599",
    priceSuffix: "per month, flat",
    bestFor: "Larger cabins or design-forward properties between $80K–$150K annual gross.",
  },
  {
    id: "large",
    label: "6+ bedrooms or portfolios",
    size: "6+ BR / 3+ properties",
    price: "Quoted",
    priceSuffix: "always flat fee",
    bestFor: "Estates, multi-unit buildings, glamping, or 3+ properties on the same plan.",
  },
];

/**
 * Identical for every Co-Host client regardless of property size. Service
 * intensity (e.g. response time) scales with the conversation, not the
 * marketing tier.
 */
export const CO_HOST_FEATURES = [
  "Listing build or rebuild on Airbnb, VRBO, plus one channel of your choice",
  "SEO-optimized title, description, and amenities",
  "Free premium listing on hocha.town with an interactive guest guidebook",
  "Owner website or direct-booking page tune-up at onboarding",
  "Google Business Profile claim, cleanup, and review monitoring",
  "PriceLabs setup and ongoing oversight (Frontier holds the account)",
  "Calendar and channel sync",
  "Social content production across Instagram and Facebook",
  "Quarterly listing copy refresh",
  "Reputation monitoring with monthly summary",
  "Strategy call cadence that fits your property",
  "Vendor referral network access (cleaners, photographers, handymen)",
  "Email + Slack Connect support during business hours",
];

export const CO_HOST_OWNER_HANDLES = [
  "Guest communications",
  "Cleaning logistics",
  "Maintenance dispatch",
  "Tax filings",
  "Supply restocking",
  "Final review responses (we monitor and draft, you approve)",
];

export interface CoHostAddon {
  service: string;
  price: string;
  notes?: string;
}

export const CO_HOST_ADDONS: CoHostAddon[] = [
  { service: "Owner website build", price: "$1,500 one-time", notes: "Direct booking, SEO, mobile-tested" },
  { service: "Website refresh or fixes (existing site)", price: "$400", notes: "Copy, layout, speed, broken links" },
  { service: "Additional listing copy refresh", price: "$250", notes: "Beyond the included quarterly refresh" },
  { service: "Additional social content (8 posts/mo)", price: "$200/month" },
  { service: "Short-form video production", price: "$300/month", notes: "4 reels/TikToks per month" },
  { service: "Listing migration to new channel", price: "$200/channel", notes: "Booking.com, Hopper, Plum Guide, etc." },
  { service: "Pricing intervention for events", price: "$150/event", notes: "Concerts, holidays, local events" },
  { service: "Owner training session (1:1)", price: "$200/hour" },
  { service: "Off-cycle listing or web health audit", price: "$300" },
];

export const CO_HOST_FAQ = [
  {
    question: "Is there a setup fee?",
    answer: "No. Onboarding is included.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No annual contract. Month-to-month with 30 days notice to cancel.",
  },
  {
    question: "What if my property changes size or I add another?",
    answer:
      "We just adjust to the right pricing band. Additional properties on the same plan get 10% off each, capped at 30%.",
  },
  {
    question: "Do you handle guest communications?",
    answer:
      "Not under Co-Host. You handle guest comms. If you want guest communication handled, that's our Full Service tier (20% of bookings).",
  },
  {
    question: "What software do you use?",
    answer:
      "PriceLabs by default for dynamic pricing — and we hold the account so you don't have a separate subscription to manage. Wheelhouse on request.",
  },
  {
    question: "What's the difference between Co-Host and Full Service?",
    answer:
      "Co-Host is flat-fee marketing, listing, and revenue support. You stay involved in operations. Full Service is true hands-off cabin management at 20% of bookings — guest comms, cleaning, maintenance, taxes, all of it.",
  },
  {
    question: "Can I just buy à la carte without Co-Host?",
    answer:
      "Yes. À la carte services are available to non-clients at a 25% premium.",
  },
  {
    question: "What markets do you serve?",
    answer:
      "Co-Host is currently offered to owners with properties in Broken Bow and Hochatown, Oklahoma — the same footprint as our full-service management.",
  },
  {
    question: "I'm currently with Frontier full-service — can I switch to Co-Host?",
    answer:
      "Reach out and we'll talk through it case-by-case. Co-Host is a different operating model, so the fit depends on how much of the work you want to take back on.",
  },
  {
    question: "What's the hocha.town listing?",
    answer:
      "Hocha.town is the destination guide for Hochatown — restaurants, things to do, local services. Frontier Co-Host clients get a free premium cabin listing on hocha.town with an interactive guest guidebook, which doubles as a marketing channel and a guest-experience touchpoint.",
  },
];

/**
 * Two-column comparison: Co-Host vs Full Service. Used by /pricing.
 */
export interface PricingComparisonColumn {
  key: "cohost" | "fullService";
  label: string;
  highlight?: boolean;
}

export const PRICING_COLUMNS: PricingComparisonColumn[] = [
  { key: "cohost", label: "Co-Host", highlight: true },
  { key: "fullService", label: "Full Service" },
];

export const PRICING_ROWS: {
  key: string;
  label: string;
  values: Record<PricingComparisonColumn["key"], string>;
}[] = [
  {
    key: "pricing",
    label: "Pricing",
    values: {
      cohost: "$349–$599/mo flat (by size)",
      fullService: "20% of bookings",
    },
  },
  {
    key: "setup",
    label: "Setup fee",
    values: { cohost: "None", fullService: "None" },
  },
  {
    key: "contract",
    label: "Contract",
    values: {
      cohost: "Month-to-month, 30-day exit",
      fullService: "Month-to-month, 30-day exit",
    },
  },
  {
    key: "listing",
    label: "Listing build + SEO",
    values: { cohost: "Yes", fullService: "Yes" },
  },
  {
    key: "hochatown",
    label: "Free premium hocha.town listing + guidebook",
    values: { cohost: "Yes", fullService: "Yes" },
  },
  {
    key: "website",
    label: "Owner website / direct booking help",
    values: { cohost: "Yes", fullService: "Yes" },
  },
  {
    key: "pricingOversight",
    label: "Dynamic pricing (PriceLabs)",
    values: { cohost: "Yes", fullService: "Yes" },
  },
  {
    key: "social",
    label: "Social content production",
    values: { cohost: "Yes", fullService: "Yes" },
  },
  {
    key: "guestComms",
    label: "Guest communication",
    values: { cohost: "Owner handles", fullService: "We handle" },
  },
  {
    key: "cleaning",
    label: "Cleaning coordination",
    values: { cohost: "Owner handles", fullService: "We handle" },
  },
  {
    key: "maintenance",
    label: "Maintenance dispatch",
    values: { cohost: "Owner handles", fullService: "We handle" },
  },
  {
    key: "taxes",
    label: "Tax filings",
    values: { cohost: "Owner handles", fullService: "We handle" },
  },
  {
    key: "monthlyStatement",
    label: "Monthly owner statement",
    values: { cohost: "Strategy summary", fullService: "Full P&L + payout" },
  },
];
