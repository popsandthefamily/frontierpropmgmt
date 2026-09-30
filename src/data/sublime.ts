import type { FAQItem } from "./services";
import { getPropertyBySlug } from "./properties";

/**
 * Guest-facing answer surface for Sublime Retreat.
 *
 * Guests increasingly arrive from ChatGPT, Perplexity, and AI Overviews
 * rather than from a search results page, and those systems answer a
 * *question* ("is there a cabin near Beavers Bend with a hot tub that
 * sleeps 8 and takes dogs?") rather than matching a keyword. A listing page
 * written only as marketing prose gives them nothing to lift.
 *
 * So the facts a traveller actually asks for live here, phrased the way
 * they're asked, with answers that name the cabin and the market in the
 * first sentence so a retrieved chunk still makes sense on its own. The
 * page, its JSON-LD, /llms.txt, and /llms-full.txt all read from this file,
 * so an answer engine, a search engine and a human get the identical facts.
 *
 * The Airbnb listing is the source of truth (re-checked 2026-09-30). A fact
 * that is on the old direct page but not on Airbnb, and that Hunter hasn't
 * confirmed, is left out rather than hedged. Rates are never hard-coded:
 * the booking calendar shows the real total for real dates.
 */

const sublime = getPropertyBySlug("sublime");
if (!sublime) throw new Error("sublime.ts: the sublime property is missing");

/* ------------------------------------------------------------------ */
/*  Facts                                                              */
/* ------------------------------------------------------------------ */

export const sublimeFacts = {
  airbnbUrl: "https://www.airbnb.com/rooms/1587068481059586891",
  hospitablePropertyId: "2120170",
  checkIn: "4:00 PM",
  checkOut: "11:00 AM",
  petFee: 75,
  maxPets: 2,
  kingSuites: 2,
  twinXlBunks: 4,
  /** "3.5 baths" on Airbnb, said the way a guest pictures it. */
  bathsInWords: "3 bathrooms plus a half bath upstairs",
  /**
   * Hunter's line for the location (confirmed 2026-09-30). It is the one
   * phrase every "tucked away but close" claim on the page hangs off, so it
   * lives here once.
   */
  access: "about five minutes from Hwy 259",
  neighborhood: "the Timber Creek Trails area of Hochatown",
} as const;

/**
 * The Airbnb rating, copied by hand from the listing. Printed (and put in
 * the JSON-LD) with its "as of" date and a link, because the number moves
 * and a stale one is worse than none: refresh it at least monthly, and set
 * `show` to false rather than leave it out of date.
 */
export const sublimeRating = {
  show: true,
  value: 4.92,
  count: 24,
  asOf: "September 30, 2026",
  categories: [
    { label: "Cleanliness", value: "4.9" },
    { label: "Communication", value: "5.0" },
    { label: "Check-in", value: "5.0" },
  ],
} as const;

/** The whole cabin in one quotable paragraph, 40 to 60 words. */
export const sublimeSummary = sublime.description;

/** The kicker, headline and line under it. */
export const sublimeHero = {
  kicker: "A sublime experience",
  title: "Sublime Retreat",
  subtitle: "A pet-friendly Hochatown cabin with a hot tub, fire pit and games",
  tagline: "Peaceful and tucked away, about five minutes from everything on Hwy 259.",
  facts: [
    `Sleeps ${sublime.sleeps}`,
    `${sublime.bedrooms} bedrooms`,
    `${sublime.bathrooms} baths`,
    "2 king suites",
    "4 Twin XL bunks",
    "Hot tub",
    "Fire pit",
    "Dogs welcome",
  ],
};

/** The spec sheet, in the order a guest asks for it. */
export const sublimeAtAGlance: { label: string; value: string }[] = [
  {
    label: "Where",
    value: `A wooded lot in ${sublimeFacts.neighborhood}, Oklahoma, ${sublimeFacts.access}`,
  },
  {
    label: "Sleeps",
    value: `Up to ${sublime.sleeps} guests in ${sublime.bedrooms} bedrooms, with ${sublimeFacts.bathsInWords}`,
  },
  {
    label: "Beds",
    value: "Two king suites and four built-in Twin XL bunks: six beds for eight guests",
  },
  {
    label: "Pets",
    value: `Dogs welcome, $${sublimeFacts.petFee} pet fee, up to ${sublimeFacts.maxPets} pets`,
  },
  {
    label: "Check-in / out",
    value: `${sublimeFacts.checkIn} / ${sublimeFacts.checkOut}, self check-in with a keypad smart lock`,
  },
  {
    label: "Booking",
    value:
      "Direct with Frontier, the people who run the cabin. No Airbnb guest service fee.",
  },
];

/* ------------------------------------------------------------------ */
/*  The story                                                          */
/* ------------------------------------------------------------------ */

export const sublimeStory = {
  paragraphs: [
    `We gave this cabin its name as a brief to ourselves: a sublime experience. Peaceful, quiet and tucked into the pines, but never a trek. Sublime Retreat sits on a wooded lot in ${sublimeFacts.neighborhood}, and Hwy 259 is about five minutes away, so dinner, coffee and Beavers Bend are close when you want them and out of sight when you don't.`,
    "Inside, it's modern and bright: white shiplap, wood-plank ceilings, a fireplace wall in the great room and gold fixtures in the baths. Outside, it's all forest, with a covered deck and outdoor fireplace, a hot tub and a fire pit. We run Sublime ourselves, so the person who answers your message is the person looking after the cabin.",
  ],
  chapters: [
    {
      title: "Tucked away",
      body: `A wooded lot in ${sublimeFacts.neighborhood}, with tall pines around the cabin and forest views from the deck and the hot tub. Each king suite opens onto its own covered patio.`,
    },
    {
      title: "Five minutes from Hwy 259",
      body: "Quiet and wooded, but not remote. Hochatown's shops and restaurants, Beavers Bend State Park and Broken Bow Lake are all a short drive, and Hwy 259 is about five minutes out.",
    },
    {
      title: "Modern and woodsy",
      body: "White shiplap under wood-plank ceilings, a fireplace wall in the great room, gold fixtures and marble-look tile in the baths, and a blue metal roof above the trees.",
    },
  ],
  hostNote: {
    quote:
      "Whether it's a bachelor or bachelorette weekend, a getaway with your family or a romantic night in the woods, we want Sublime to feel like a real escape. Quiet enough to hear the woods from the deck, and close enough that dinner is never a production.",
    name: "Hunter",
    role: "Your host at Frontier Property Management",
  },
};

/* ------------------------------------------------------------------ */
/*  Rooms, outside, game night                                         */
/* ------------------------------------------------------------------ */

export const sublimeRooms: { name: string; detail: string }[] = [
  {
    name: "King suite one",
    detail:
      "A king bed and its own private covered patio, so the first coffee of the day happens outside.",
  },
  {
    name: "King suite two",
    detail:
      "A second king bed with a second private covered patio. Two couples each get a suite, and nobody draws the short straw.",
  },
  {
    name: "The bunk room",
    detail:
      "Two sets of built-in Twin XL bunks, four beds in all. Twin XL runs longer than a standard twin, so teenagers and grown-ups fit as well as kids.",
  },
  {
    name: "The loft",
    detail:
      "A second living room upstairs with a long sofa and a TV, so the kids (or the night owls) have a space of their own.",
  },
  {
    name: "Great room and kitchen",
    detail:
      "An open great room under a vaulted wood-plank ceiling, with an indoor fireplace and a full kitchen built around a long white island.",
  },
  {
    name: "Bathrooms",
    detail: `${sublimeFacts.bathsInWords.charAt(0).toUpperCase()}${sublimeFacts.bathsInWords.slice(1)}, with a double vanity and a marble-look walk-in shower with a built-in bench.`,
  },
];

export const sublimeOutside: { name: string; detail: string }[] = [
  {
    name: "The covered deck",
    detail:
      "A lounge set around an outdoor fireplace with a TV, a gas grill and an outdoor dining spot, all under a timber roof and looking straight into the pines.",
  },
  {
    name: "The hot tub",
    detail:
      "On the main deck with the forest behind it. It's sanitized after every stay.",
  },
  {
    name: "Fire pit and yard",
    detail:
      "A fire pit with seating and string lights strung between the trees. Please observe any burn bans in effect during your stay.",
  },
  {
    name: "Yard games",
    detail:
      "A gravel yard out back with room for yard games under the string lights.",
  },
];

export const sublimeGameNight: string[] = [
  "Shuffleboard in the loft",
  "A tabletop arcade",
  "A TV lounge in the loft",
  "Yard games out back",
];

/* ------------------------------------------------------------------ */
/*  Amenities (Airbnb-listed only)                                     */
/* ------------------------------------------------------------------ */

export const sublimeAmenityGroups: { title: string; items: string[] }[] = [
  {
    title: "Outdoors",
    items: [
      "Hot tub",
      "Fire pit",
      "Outdoor fireplace",
      "Gas grill",
      "Outdoor dining area",
      "Outdoor furniture",
    ],
  },
  {
    title: "Game night",
    items: ["Tabletop arcade", "Shuffleboard", "TVs"],
  },
  {
    title: "Kitchen and dining",
    items: [
      "Full kitchen",
      "Dishwasher",
      "Oven and stove",
      "Microwave",
      "Refrigerator",
      "Cooking basics",
      "Dishes and silverware",
    ],
  },
  {
    title: "Comfort",
    items: [
      "Air conditioning",
      "Heating",
      "Indoor fireplace",
      "Washer and dryer",
      "Bed linens",
      "Extra pillows and blankets",
    ],
  },
  {
    title: "Tech and access",
    items: ["Wi-Fi", "Self check-in", "Keypad smart lock"],
  },
  {
    title: "Parking and safety",
    items: [
      "Free parking on the property",
      "Boat and overflow parking",
      "Smoke alarm",
      "Carbon monoxide alarm",
      "Exterior security cameras",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Reviews                                                            */
/* ------------------------------------------------------------------ */

/** Airbnb's own one-line summary of the reviews, quoted as Airbnb's. */
export const sublimeReviewSummary =
  "Guests highlight how clean and beautiful the cabin is, and many praise Hunter for quick, helpful responses.";

/**
 * Verbatim Airbnb reviews, trimmed only with an ellipsis, never reworded.
 * Only 5-star reviews are printed; the rating above covers all of them.
 * Dates are the month the review was posted, not Airbnb's relative "3 weeks
 * ago", which goes stale.
 */
export const sublimeReviews: {
  name: string;
  date: string;
  trip: string;
  quote: string;
}[] = [
  {
    name: "Kali",
    date: "July 2026",
    trip: "Group trip",
    quote:
      "We had an amazing stay here for a bachelorette weekend. The house was spotless and beautiful!! Hunter was extremely responsive. We will be back!",
  },
  {
    name: "Dawn",
    date: "September 2026",
    trip: "Group trip",
    quote:
      "We had the most wonderful stay with our family for Labor Day weekend! The house was exactly as it looked in the pictures. Everything was spotless and very comfortable. Hunter was an excellent host and always responsive to my questions, even in the weeks leading up to our stay. The location was great, close to everything. Everyone had a fantastic time and we would definitely stay here again.",
  },
  {
    name: "Weston",
    date: "March 2026",
    trip: "Group trip",
    quote:
      "We had an amazing time! The house was perfect. The fire pit, games, hot tub, and scenery was amazing. Would recommend!!",
  },
  {
    name: "Diana",
    date: "February 2026",
    trip: "Stayed a few nights",
    quote:
      "House was great location, felt secluded but close to all the attractions",
  },
  {
    name: "Meaghan",
    date: "March 2026",
    trip: "Group trip",
    quote:
      "This place was amazing! Space was beautiful, lots of room and had a very cozy vibe to it. Will be staying here again! Very well decorated as well! Loved the space",
  },
  {
    name: "Amy",
    date: "August 2026",
    trip: "Stayed with kids",
    quote:
      "Beautiful place! The deck and outdoor space was lovely. We stayed with our 3 grandchildren and there was plenty to keep them entertained both indoors and out! Hunter was a great host. He was responsive and checked on us throughout our stay.",
  },
];

/* ------------------------------------------------------------------ */
/*  Pets, neighborhood, house rules                                    */
/* ------------------------------------------------------------------ */

export const sublimePets: string[] = [
  "Dogs are welcome",
  `$${sublimeFacts.petFee} pet fee, shown in your total before you pay`,
  `Up to ${sublimeFacts.maxPets} pets`,
  "Leashed outside or kept in gated areas, per Hochatown town code",
];

/**
 * Only places that could be verified. No drive times until one is timed from
 * the cabin; "a short drive" is as far as the page goes.
 */
export const sublimeNearby: { name: string; detail: string }[] = [
  {
    name: "Mountain Fork Brewery",
    detail: "Hochatown's local brewery, in the Timber Creek Trails shops.",
  },
  {
    name: "Okie Girls Coffee & Ice Cream",
    detail: "Coffee in the morning, ice cream after dinner. Same cluster of shops.",
  },
  {
    name: "Hochatown Escape Games",
    detail: "A rainy-afternoon plan for the whole group, next to the brewery.",
  },
  {
    name: "Beavers Bend State Park",
    detail: "Trails, the Mountain Fork River and the reason most people come.",
  },
  {
    name: "Broken Bow Lake",
    detail: "Bring the boat: there's boat and overflow parking at the cabin.",
  },
];

export const sublimeHouseRules: string[] = [
  `Check-in after ${sublimeFacts.checkIn}, checkout by ${sublimeFacts.checkOut}`,
  `${sublime.sleeps} guests maximum`,
  "No smoking or vaping inside or on the deck",
  "No parties or events",
  "No fireworks, and observe any burn bans",
  "No RVs or travel trailers (boat and overflow parking is available)",
  "The kayaks and the owner's closet are off-limits to guests",
];

/* ------------------------------------------------------------------ */
/*  Fit                                                                */
/* ------------------------------------------------------------------ */

/** Who this cabin is genuinely the right answer for. */
export const sublimeGoodFit: string[] = [
  "Bachelor and bachelorette weekends for up to 8 (a group getaway, not a party: parties and events aren't allowed)",
  "Two couples, since each couple gets a king suite with its own private covered patio",
  "Families with kids, who get the Twin XL bunk room, the loft, shuffleboard and the arcade without leaving the property",
  "Groups of up to 8 who want everyone under one roof",
  "Guests bringing a dog, or two",
  "A couple after a romantic night in the woods, with a hot tub, a fire pit and room to spread out",
  "Anyone who wants a quiet, wooded cabin that is still close to Hochatown, Beavers Bend and Hwy 259",
];

/** Where an honest answer is "look somewhere else." */
export const sublimeNotAFit: string[] = [
  "Groups larger than 8. Maximum occupancy is 8 guests",
  "Parties and events, which are not allowed",
  "Anyone who specifically wants a private swimming pool. Sublime has a hot tub, not a pool",
  "Guests who need complete isolation. Sublime is quiet and wooded, but it's about five minutes from Hwy 259, not miles down a dirt road",
  "Guests who need to smoke, which isn't allowed inside the cabin or on the deck",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

/**
 * The questions guests actually ask, answered so that a single retrieved
 * chunk stands on its own: each answer names Sublime Retreat rather than
 * relying on the surrounding page for context. Rendered visibly and as
 * FAQPage JSON-LD from this one list, so the two can't drift.
 */
export const sublimeGuestFAQ: FAQItem[] = [
  {
    question: "Is Sublime Retreat pet-friendly?",
    answer: `Yes. Dogs are welcome at Sublime Retreat for a $${sublimeFacts.petFee} pet fee, with up to ${sublimeFacts.maxPets} pets per stay. Pets must be leashed outside or kept in gated areas, per Hochatown town code.`,
  },
  {
    question: "How many people does Sublime Retreat sleep, and where does everyone sleep?",
    answer: `Sublime Retreat sleeps ${sublime.sleeps} across ${sublime.bedrooms} bedrooms: two king suites, each with a private covered patio, and a bunk room with four built-in Twin XL bunks. That's six beds for eight guests, with ${sublimeFacts.bathsInWords}.`,
  },
  {
    question: "Does Sublime Retreat still have zip lines?",
    answer:
      "No. The zip lines have been removed from Sublime Retreat, so older reviews and listings that mention them are out of date. The cabin still has a hot tub and an outdoor fireplace on the covered deck, a fire pit, yard games, shuffleboard and a tabletop arcade.",
  },
  {
    question: "Is Sublime Retreat good for a bachelorette or bachelor weekend?",
    answer: `Yes, for groups of up to ${sublime.sleeps}. Sublime Retreat has two king suites, a Twin XL bunk room, a hot tub, a fire pit, shuffleboard and a tabletop arcade, and guests have booked it for bachelorette weekends. Parties and events aren't allowed.`,
  },
  {
    question: "Is Sublime Retreat a good cabin for two couples?",
    answer:
      "Yes. Sublime Retreat has two separate king suites, and each one has its own private covered patio, so neither couple ends up in the lesser room. The Twin XL bunk room is separate again, for kids or a third pair.",
  },
  {
    question: "How quiet is Sublime Retreat, and how far is it from Hwy 259?",
    answer: `Sublime Retreat sits on a quiet, wooded lot in ${sublimeFacts.neighborhood}, ${sublimeFacts.access}. It's tucked away, but it isn't remote: Hochatown's shops, restaurants and Beavers Bend State Park are a short drive.`,
  },
  {
    question: "What is there to do at Sublime Retreat?",
    answer:
      "At Sublime Retreat there's a hot tub and an outdoor fireplace on the covered deck, a fire pit, a gas grill and outdoor dining, yard games, shuffleboard, a tabletop arcade and a TV lounge in the upstairs loft.",
  },
  {
    question: "What are check-in and checkout times at Sublime Retreat, and how does check-in work?",
    answer: `Check-in at Sublime Retreat is after ${sublimeFacts.checkIn} and checkout is by ${sublimeFacts.checkOut}. Check-in is self check-in with a keypad smart lock, and your code is sent before you arrive.`,
  },
  {
    question: "How much does Sublime Retreat cost per night?",
    answer:
      "Rates at Sublime Retreat change with the season, the day of the week and the length of stay, so there isn't one nightly price. Enter your dates in the booking calendar on rentwithfrontier.com/sublime to see the exact total, including fees, before you pay.",
  },
  {
    question: "Why book Sublime Retreat direct instead of on Airbnb?",
    answer:
      "Booking Sublime Retreat direct means no Airbnb guest service fee is added to your total, and you book with Frontier, the people who run the cabin. Enter your dates to see the total before you pay.",
  },
  {
    question: "What are the house rules at Sublime Retreat?",
    answer: `At Sublime Retreat there's no smoking or vaping inside or on the deck, no parties or events, and no fireworks, and guests observe any burn bans. The maximum is ${sublime.sleeps} guests, and RVs and travel trailers aren't allowed, though boat and overflow parking is available. There are exterior security cameras on the property.`,
  },
  {
    question: "Is there a minimum stay at Sublime Retreat, and what is the cancellation policy?",
    answer:
      "Minimum stays at Sublime Retreat vary by season, and peak season and spring break may require a 2-night minimum. The minimum for your dates and the cancellation policy are shown at checkout.",
  },
];
