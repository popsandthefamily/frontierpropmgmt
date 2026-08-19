export const siteConfig = {
  name: "Frontier Property Management",
  tagline: "Boutique Cabin Management in Broken Bow & Hochatown",
  description:
    "Boutique, owner-operated vacation rental management in Broken Bow and Hochatown, Oklahoma. A deliberately small portfolio.",
  url: "https://rentwithfrontier.com",
  phone: "580-207-7154",
  email: "info@rentwithfrontier.com",
  address: "3156 Old Broken Bow Hwy, Broken Bow, OK 74728",
  hours: "Monday - Friday, 9:00 AM - 5:00 PM",
  owner: "Hunter Collins",
  formspreeEndpoint: "https://formspree.io/f/mwpgdawq",
  social: {
    instagram: "https://www.instagram.com/rentwithfrontier/",
    facebook: "https://www.facebook.com/rentwithfrontier/",
    // A share.google shortlink is a redirect, which is a weaker `sameAs`
    // signal than a canonical URL. Set NEXT_PUBLIC_GOOGLE_PLACE_ID and
    // `googleProfileUrl` below resolves to the canonical Maps place URL
    // instead. Find the Place ID at
    // https://developers.google.com/maps/documentation/places/web-service/place-id
    google: "https://share.google/eUdBwccDQJoLWdX3f",
  },
  /**
   * Google Place ID for the Business Profile.
   *
   * Unlocks two things once set: the canonical `sameAs` URL, and the
   * one-tap review link behind /review. Left blank until someone pastes
   * the real value in, and everything degrades to the shortlink.
   */
  googlePlaceId: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? "",
  analytics: {
    ga: "GT-K4TS7SM2",
    ads: "AW-17777139722",
  },
} as const;

/**
 * Scarcity is the core positioning claim: Frontier is small on purpose and
 * takes a limited number of owners. It is stated in exactly these words
 * everywhere it appears so search engines and answer engines see one
 * consistent claim instead of five paraphrases.
 */
export const availability = {
  /** Eyebrow / badge length. */
  short: "Limited 2026 availability",
  /** Sentence length, for body copy and meta descriptions. */
  sentence:
    "We're accepting a limited number of new properties for the remainder of 2026.",
  /** Paragraph length, for hero subheads and answer blocks. */
  long: "Frontier is small on purpose. We operate our own top-rated cabin in Hochatown and cap how many owners we take on, so every property gets senior attention rather than a spot in a queue. For the remainder of 2026 we're accepting a limited number of new properties.",
} as const;

/**
 * The two plans. Every price, name, and one-liner on the site reads from
 * here.
 *
 * The fee base matters more than the percentage and is the thing owners get
 * burned on, so it is spelled out rather than left to "20%". Frontier's 20%
 * applies to net rental income: what is left after the platform takes its
 * host fee and after occupancy taxes are remitted. Cleaning and pet fees
 * never enter the base at all, and vendor invoices pass through at cost.
 *
 * That is a smaller base than the gross-booking figure most national
 * operators quote against, which means a competitor's 20% and Frontier's
 * 20% are not the same price. `feeComparisonNote` exists to say so.
 */
export const plans = {
  manager: {
    key: "manager",
    name: "Property Manager",
    href: "/management-services",
    /** Big number on a pricing card. Pair with `feeSuffix`. */
    fee: "20%",
    feeSuffix: "of net rental income",
    /** The same figure as one phrase, for running prose. */
    feeInline: "20% of net rental income",
    /** One clause explaining the base. Follows `feeInline` in body copy. */
    feeBase:
      "what's left after platform host fees and occupancy taxes come out",
    tagline: "Hands-off cabin management, end to end.",
    summary:
      "We run the whole property: pricing, listings, guest communication, cleaning turns, maintenance, taxes, and monthly reporting. You own the cabin, we operate it.",
    feeDefinition:
      "20% of net rental income, meaning the booking revenue that remains after platform host fees (Airbnb 3%, VRBO 5%) and state and local occupancy taxes have come out. Not 20% of the headline booking total. Cleaning and pet fees pass through to vendors and are never part of the base. Maintenance and vendor invoices are billed to the owner at cost with no markup, and anything over $300 needs owner approval first. No setup fee, no monthly minimum, no annual contract.",
    /** Why this 20% is not the same price as somebody else's 20%. */
    feeComparisonNote:
      "Most national operators calculate their percentage on gross booking revenue, before platform fees and taxes come out. Frontier calculates on what is left after. Two managers quoting the same percentage against different bases are not quoting the same price, so it is worth asking any manager which one they mean.",
  },
  local: {
    key: "local",
    name: "Local Services",
    href: "/local-services",
    fee: "Custom",
    feeSuffix: "quote, per property",
    feeInline: "a custom quote, scoped to your property",
    tagline: "Boots on the ground, without changing who manages the booking.",
    summary:
      "Cleaning turns, maintenance calls, restocking, freeze and storm checks, contractor meets, and the local logistics that are impossible to handle from out of town. You keep your listing and your bookings.",
    feeDefinition:
      "Priced per property after a short scoping call, because no two owners want the same list. Month-to-month, no setup fee, no annual contract.",
  },
} as const;

/** Canonical Google Business Profile URL, for `sameAs` and outbound links. */
export const googleProfileUrl = siteConfig.googlePlaceId
  ? `https://www.google.com/maps/place/?q=place_id:${siteConfig.googlePlaceId}`
  : siteConfig.social.google;

/**
 * Deep link straight into the "write a review" dialog on the Business
 * Profile. Short enough to text to a guest at checkout, which is the only
 * moment they are ever going to do it.
 */
export const googleReviewUrl = siteConfig.googlePlaceId
  ? `https://search.google.com/local/writereview?placeid=${siteConfig.googlePlaceId}`
  : siteConfig.social.google;

export type SiteConfig = typeof siteConfig;
export type Plan = (typeof plans)[keyof typeof plans];
