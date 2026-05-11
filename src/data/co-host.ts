export type CoHostTierId = "standard" | "premier" | "custom";

export interface CoHostTier {
  id: CoHostTierId;
  name: string;
  priceLabel: string;
  priceSuffix?: string;
  bestFor: string;
  bestForDetail: string;
  bullets: string[];
  ownerHandles: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
}

export const CO_HOST_TIERS: CoHostTier[] = [
  {
    id: "standard",
    name: "Co-Host Standard",
    priceLabel: "$349",
    priceSuffix: "per month, flat",
    bestFor: "Properties up to 3 bedrooms",
    bestForDetail: "Annual gross under $80K. Standard residential rentals — cabins, condos, single-family homes.",
    bullets: [
      "Listing build or rebuild on Airbnb, VRBO, plus one channel of your choice",
      "SEO-optimized title, description, and amenities",
      "Photo audit with shot list",
      "PriceLabs setup and weekly oversight (Frontier-managed account)",
      "Calendar and channel sync",
      "4 social posts per month",
      "Reputation monitoring with monthly summary",
      "Monthly 60-minute strategy call",
      "Email support, 1 business day response",
    ],
    ownerHandles: [
      "Guest communications",
      "Cleaning logistics",
      "Maintenance dispatch",
      "Tax filings",
      "Supply restocking",
      "Review responses (we monitor and flag, you reply)",
    ],
    cta: { label: "Book a discovery call", href: "/audit#full-audit" },
  },
  {
    id: "premier",
    name: "Co-Host Premier",
    priceLabel: "$599",
    priceSuffix: "per month, flat",
    bestFor: "4+ bedroom or luxury properties",
    bestForDetail: "Annual gross between $80K and $150K. Design-forward, brand-sensitive, multi-channel.",
    bullets: [
      "Everything in Standard, plus:",
      "8 social posts per month plus one short-form video",
      "Active pricing management with daily algorithm review",
      "Annual professional photo coordination",
      "Review response handling (we draft, you approve)",
      "Vendor referral network access",
      "Quarterly tax document organization",
      "Direct booking link setup if applicable",
      "Bi-weekly 30-minute call or async equivalent",
      "Slack Connect + email support, 4 business hour response",
    ],
    ownerHandles: [
      "Guest communications (with templates we provide)",
      "Tax filing",
      "Supply restocking",
      "Maintenance dispatch decisions",
    ],
    cta: { label: "Book a discovery call", href: "/audit#full-audit" },
    highlight: true,
  },
  {
    id: "custom",
    name: "Co-Host Custom",
    priceLabel: "Quoted",
    priceSuffix: "always flat fee",
    bestFor: "Above $150K annual gross or 3+ properties",
    bestForDetail: "Unique operations like glamping, treehouses, or multi-unit buildings. Specialized requirements.",
    bullets: [
      "Custom scope across listing, pricing, content, and operations",
      "Multi-property coordination",
      "Dedicated point of contact",
      "Reporting cadence and SLAs per agreement",
      "Discovery call required, proposal within 5 business days",
    ],
    ownerHandles: ["Per agreement"],
    cta: { label: "Request a custom quote", href: "/audit#full-audit" },
  },
];

export interface CoHostAddon {
  service: string;
  price: string;
  notes?: string;
}

export const CO_HOST_ADDONS: CoHostAddon[] = [
  { service: "Professional photo session coordination", price: "$400", notes: "Excludes photographer fee" },
  { service: "Listing copy refresh", price: "$250", notes: "1 per channel per quarter" },
  { service: "Additional social content (8 posts/mo)", price: "$200/month" },
  { service: "Pricing intervention for events", price: "$150/event", notes: "Concerts, holidays, local events" },
  { service: "Owner training session (1:1)", price: "$200/hour" },
  { service: "Direct booking website setup", price: "$1,500 one-time" },
  { service: "Listing migration to new channel", price: "$200/channel", notes: "Booking.com, Hopper, Plum Guide, etc." },
  { service: "Off-cycle health audit", price: "$300" },
];

export const CO_HOST_FAQ = [
  {
    question: "Is there a setup fee?",
    answer:
      "No. Both Co-Host tiers include onboarding at no additional cost.",
  },
  {
    question: "Is there a contract?",
    answer:
      "No annual contract. Month-to-month with 30 days notice to cancel.",
  },
  {
    question: "Can I switch tiers?",
    answer:
      "Yes. Upgrades take effect immediately. Downgrades take effect the following billing cycle. No penalty either direction.",
  },
  {
    question: "Do you handle guest communications?",
    answer:
      "Not under Co-Host. Owners handle guest communication on Standard and Premier. If you want guest comms handled, that's our Full Service tier (20% of bookings).",
  },
  {
    question: "Do I need to use specific software?",
    answer:
      "We use PriceLabs by default for dynamic pricing and we hold the account so you don't have a separate subscription to manage. Wheelhouse on request.",
  },
  {
    question: "What if I have multiple properties?",
    answer:
      "After the first property, additional properties on the same plan get a 10% discount each, capped at 30%.",
  },
  {
    question: "What's the difference between Co-Host and Full Service?",
    answer:
      "Co-Host is flat-fee marketing and revenue support. You stay involved in operations. Full Service is true hands-off management at 20% of bookings.",
  },
  {
    question: "Can I just buy à la carte without a Co-Host plan?",
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
];

export const CO_HOST_PRICING_ROW_KEYS = [
  "pricing",
  "bestFor",
  "setup",
  "contract",
  "listing",
  "pricingOversight",
  "social",
  "guestComms",
  "cleaning",
  "maintenance",
  "reviews",
  "strategyCall",
  "responseTime",
] as const;

export type PricingRowKey = (typeof CO_HOST_PRICING_ROW_KEYS)[number];

export interface PricingComparisonColumn {
  key: "standard" | "premier" | "fullService";
  label: string;
  highlight?: boolean;
}

export const PRICING_COLUMNS: PricingComparisonColumn[] = [
  { key: "standard", label: "Co-Host Standard" },
  { key: "premier", label: "Co-Host Premier", highlight: true },
  { key: "fullService", label: "Full Service" },
];

export const PRICING_ROWS: {
  key: PricingRowKey;
  label: string;
  values: Record<PricingComparisonColumn["key"], string>;
}[] = [
  {
    key: "pricing",
    label: "Pricing",
    values: {
      standard: "$349/month flat",
      premier: "$599/month flat",
      fullService: "20% of bookings",
    },
  },
  {
    key: "bestFor",
    label: "Best for",
    values: {
      standard: "Up to 3BR, under $80K/year",
      premier: "4+ BR or luxury",
      fullService: "Hands-off owners",
    },
  },
  {
    key: "setup",
    label: "Setup fee",
    values: { standard: "None", premier: "None", fullService: "None" },
  },
  {
    key: "contract",
    label: "Contract",
    values: {
      standard: "Month-to-month",
      premier: "Month-to-month",
      fullService: "30-day exit",
    },
  },
  {
    key: "listing",
    label: "Listing build",
    values: { standard: "Yes", premier: "Yes", fullService: "Yes" },
  },
  {
    key: "pricingOversight",
    label: "Pricing oversight",
    values: { standard: "Weekly", premier: "Daily", fullService: "Daily" },
  },
  {
    key: "social",
    label: "Social content",
    values: {
      standard: "4/month",
      premier: "8/month + video",
      fullService: "Custom",
    },
  },
  {
    key: "guestComms",
    label: "Guest communication",
    values: {
      standard: "Owner handles",
      premier: "Owner handles",
      fullService: "We handle",
    },
  },
  {
    key: "cleaning",
    label: "Cleaning coordination",
    values: {
      standard: "Owner handles",
      premier: "Owner handles",
      fullService: "We handle",
    },
  },
  {
    key: "maintenance",
    label: "Maintenance dispatch",
    values: {
      standard: "Owner handles",
      premier: "Owner handles",
      fullService: "We handle",
    },
  },
  {
    key: "reviews",
    label: "Review response",
    values: {
      standard: "Owner handles",
      premier: "We draft, you approve",
      fullService: "We handle",
    },
  },
  {
    key: "strategyCall",
    label: "Strategy call cadence",
    values: { standard: "Monthly", premier: "Bi-weekly", fullService: "Monthly" },
  },
  {
    key: "responseTime",
    label: "Response time",
    values: {
      standard: "1 business day",
      premier: "4 business hours",
      fullService: "Same day",
    },
  },
];
