export const siteConfig = {
  name: "Frontier Property Management",
  tagline: "Local property management and home care in Broken Bow and Hochatown",
  /** One-sentence descriptor used in the footer, schema, and llms files. */
  description:
    "Frontier helps owners in two ways: full-service short-term rental management, or local home care while you keep control. We serve private second homes and rental cabins in Broken Bow and Hochatown.",
  /**
   * Canonical production host. Vercel already 307-redirects the apex host
   * to www, so every canonical, sitemap URL, schema @id, and llms link uses
   * the www form to match what actually serves the page.
   */
  url: "https://www.rentwithfrontier.com",
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
 * The plans. Every price, name, and one-liner on the site reads from here.
 *
 * `manager` and `concierge` are the two primary services. `local` is the
 * supporting STR cleaning and local-support offer for owners who keep their
 * own bookings; it is not a third flagship plan.
 *
 * The fee base matters more than the percentage and is the thing owners get
 * burned on, so it is spelled out rather than left to "20%". Frontier's 20%
 * applies to net rental revenue: what is left after the platform takes its
 * host fee and after occupancy taxes are remitted. Cleaning and pet fees
 * never enter the base at all, and vendor invoices pass through at cost.
 *
 * "Net rental revenue" is the owner-confirmed wording (2026-09-21) and this
 * object is the single source of truth for it. Every page, the owner
 * statements, and the llms files read the phrase from here rather than
 * writing their own, because the management page once carried a second,
 * contradictory base ("nightly-rental revenue") that took a production
 * check to catch.
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
    feeSuffix: "of net rental revenue",
    /** The same figure as one phrase, for running prose. */
    feeInline: "20% of net rental revenue",
    /** One clause explaining the base. Follows `feeInline` in body copy. */
    feeBase:
      "what's left after platform host fees and occupancy taxes come out",
    tagline: "Hands-off cabin management, end to end.",
    summary:
      "We run the whole property: pricing, listings, guest communication, cleaning turns, maintenance, taxes, and monthly reporting. You own the cabin, we operate it.",
    feeDefinition:
      "20% of net rental revenue, meaning the booking revenue that remains after platform host fees (Airbnb 3%, VRBO 5%) and state and local occupancy taxes have come out. Not 20% of the headline booking total. Cleaning and pet fees pass through to vendors and are never part of the base. Maintenance and vendor invoices are billed to the owner at cost with no markup, and anything over $300 needs owner approval first. No setup fee, no monthly minimum, no annual contract.",
    /** Why this 20% is not the same price as somebody else's 20%. */
    feeComparisonNote:
      "Most national operators calculate their percentage on gross booking revenue, before platform fees and taxes come out. Frontier calculates on what is left after. Two managers quoting the same percentage against different bases are not quoting the same price, so it is worth asking any manager which one they mean.",
  },
  concierge: {
    key: "concierge",
    name: "Home Care Concierge",
    href: "/home-care-concierge",
    /** Big number on a pricing card. Pair with `feeSuffix`. */
    fee: "From $500",
    feeSuffix: "per month",
    feeInline: "from $500 per month",
    /** The base figure as a number, for structured data. */
    basePrice: 500,
    tagline: "Take care of my property locally while I keep control.",
    summary:
      "A defined monthly care plan for a private second home, an owner-used vacation home, or a cabin you rent out yourself: one scheduled care cycle a month covering an interior maintenance clean, hot-tub attention, light exterior upkeep, a visual property check, and a dated report. You keep your bookings, your listing, and your keys to the decisions.",
    /** Sits beside the price, never in an FAQ. */
    feeDefinition:
      "From $500 per month for a defined monthly care plan, with the scope confirmed after a walkthrough. The base plan includes one scheduled monthly care cycle and one interior maintenance cleaning. Additional visits, guest turnovers, repairs, materials, and higher-frequency service are quoted separately. Month to month, 30 days notice to cancel.",
  },
  local: {
    key: "local",
    name: "STR Cleaning & Local Support",
    /** Shorter form for tight spaces such as table headers. */
    shortName: "Local Support",
    href: "/local-services",
    fee: "Custom",
    feeSuffix: "quote, per property",
    feeInline: "a custom quote, scoped to your property",
    tagline: "Turnovers and local hands for a rental you run yourself.",
    summary:
      "Turnover cleaning on your booking calendar, maintenance calls, restocking, freeze and storm checks, contractor meets, and the local logistics that are impossible to handle from out of town. You keep your listing and your bookings.",
    feeDefinition:
      "Priced per property after a short scoping call, because no two owners want the same list. Recurring work is a flat monthly figure; on-call work is a rate you approve in advance. Month-to-month, no setup fee, no annual contract.",
  },
} as const;

/**
 * Businesses Frontier delivers part of its service through. Named on every
 * page that describes the work they do, with the logo and a link, so the
 * relationship is visible rather than implied.
 */
export const partners = {
  hotTub: {
    name: "Broken Bow Hot Tub Co.",
    url: "https://www.brokenbowhottub.com",
    displayUrl: "brokenbowhottub.com",
    phone: "(580) 207-7270",
    logo: "/images/partners/broken-bow-hot-tub-co.webp",
    /** One line, for inline credits under any hot-tub list. */
    sentence:
      "Hot-tub cleaning, service, and repair on every Frontier plan is performed with our partner Broken Bow Hot Tub Co.",
    /** A short paragraph, for the card on the concierge and about pages. */
    blurb:
      "Mobile hot-tub cleaning, troubleshooting, repair, and drain-and-refill service for cabin rentals and homeowners across McCurtain County. Frontier partners with Broken Bow Hot Tub Co. for all hot-tub work, so the technician balancing your water is a specialist, not a cleaner with a test strip.",
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
