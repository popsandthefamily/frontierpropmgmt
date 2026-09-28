/**
 * Management fees that Broken Bow and Hochatown managers publish on their
 * own websites, for the comparison on /broken-bow-cabin-management-fees.
 *
 * Every entry was read on the manager's own site (or, for Book Broken Bow,
 * the onboarding guide PDF linked from its property-management page) on
 * FEES_CHECKED. Quotes are verbatim. Nothing is inferred: where a manager
 * does not say what the percentage is charged on, `base` says so rather
 * than assuming gross. Where a rate is not published, it says that too.
 *
 * Rates change, and what a manager publishes is not always what an
 * individual owner pays. The page says both. Re-check every entry, and
 * FEES_CHECKED, before relying on it again.
 */

export const FEES_CHECKED = "September 27, 2026";

export interface PublishedFee {
  name: string;
  /** Headline rate as the manager states it. */
  rate: string;
  /** What the percentage is charged on, only if the manager says. */
  base: string;
  /** Other published fees or terms worth knowing. */
  other: string;
  /** Verbatim line the rate comes from. */
  quote: string;
  sourceLabel: string;
  sourceUrl: string;
  isFrontier?: boolean;
}

/** Alphabetical, so the order carries no ranking. */
export const PUBLISHED_FEES: PublishedFee[] = [
  {
    name: "Book Broken Bow",
    rate: "18%",
    base: "Not stated",
    other:
      "Its guide lists cabin maintenance, filters and bulbs, lawn care, deep cleans, and holiday decorating as not included in the fee.",
    quote: "18% MANAGEMENT FEE",
    sourceLabel: "Property management onboarding guide (PDF)",
    sourceUrl:
      "http://bookbrokenbow.com/wp-content/uploads/2026/04/Property-MGT-Onboarding-US-Letter-3.pdf",
  },
  {
    name: "Escape 2 Broken Bow",
    rate: "25%",
    base: "Not stated",
    other: "No other fees published.",
    quote:
      "We charge a 25% rental fee while most other companies in the area charge over 30%.",
    sourceLabel: "escape2brokenbow.com/property-management",
    sourceUrl: "https://escape2brokenbow.com/property-management/",
  },
  {
    name: "Frontier Property Management",
    rate: "20%",
    base:
      "Net rental revenue: after platform host fees and occupancy taxes. Cleaning and pet fees never enter the base.",
    other: "No setup fee, no monthly minimum, no technology fee. Month to month.",
    quote: "20% of net rental revenue",
    sourceLabel: "rentwithfrontier.com/pricing",
    sourceUrl: "https://www.rentwithfrontier.com/pricing",
    isFrontier: true,
  },
  {
    name: "Grand Welcome Broken Bow",
    rate: "Not published",
    base: "Not stated",
    other: "Says local fees range from 20% to 35% and that it customizes rates.",
    quote:
      "Management fees for short term rental property management in Broken Bow, and Hochatown can range from 20-35%",
    sourceLabel: "brokenbowhost.com",
    sourceUrl: "https://www.brokenbowhost.com/",
  },
  {
    name: "Great Escapes Homes",
    rate: "20%",
    base: "“Manageable revenue”: not cleaning fees, not platform fees.",
    other:
      "$125 per month technology fee. Existing bookings honored, with no management fee on pre-existing reservations.",
    quote:
      "20% management fee on manageable revenue only. Not on cleaning fees. Not on platform fees.",
    sourceLabel: "greatescapeshomes.com/broken-bow-property-management",
    sourceUrl: "https://www.greatescapeshomes.com/broken-bow-property-management",
  },
  {
    name: "Hochatown Property Management Group",
    rate: "20%",
    base: "Not stated",
    other:
      "A one-time onboarding fee for new clients (amount not published). No long-term agreement.",
    quote:
      "We operate on just 20% commission with a one-time on-boarding fee for new clients.",
    sourceLabel: "hochatownpropertymanagement.com/services",
    sourceUrl: "https://www.hochatownpropertymanagement.com/services",
  },
  {
    name: "Luxury Broken Bow Cabins",
    rate: "20% (under 3 properties), 15% (3 or more)",
    base: "Not stated",
    other: "No other fees published.",
    quote:
      "New owners pay 20% for fewer than three properties and 15% for three or more properties.",
    sourceLabel: "luxurybrokenbowcabins.com/property-management",
    sourceUrl: "https://www.luxurybrokenbowcabins.com/property-management",
  },
  {
    name: "StayHocha",
    rate: "From 15%",
    base: "Not stated",
    other: "No onboarding fees and no monthly fees.",
    quote: "Packages start at 15% with no onboarding fees.",
    sourceLabel: "stayhocha.com/broken-bow-property-management",
    sourceUrl: "https://www.stayhocha.com/broken-bow-property-management",
  },
  {
    name: "The Hills Property Management",
    rate: "Not published",
    base: "Not stated",
    other: "Confirms a management fee exists; no rate on the page.",
    quote: "What does your management fee include?",
    sourceLabel: "thehillscabins.com/property-management",
    sourceUrl: "https://www.thehillscabins.com/property-management",
  },
];
