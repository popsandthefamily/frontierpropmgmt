/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface Amenity {
  icon: string;
  label: string;
}

export interface PropertyImage {
  src: string;
  alt: string;
  /** Short line for a lightbox or figure; the alt text stays descriptive. */
  caption?: string;
  /** Groups the photo tour, e.g. "Bedrooms". */
  room?: string;
}

export interface SleepingArrangement {
  room: string;
  details: string;
}

export interface Property {
  slug: string;
  name: string;
  tagline: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  description: string;
  amenities: Amenity[];
  images: PropertyImage[];
  featured: boolean;
  /** Retired from the rental program. Still listed, always sorted last. */
  former?: boolean;
  /** Not bookable yet: the day booking opens, e.g. "December 1". */
  opensOn?: string;
  sleepingArrangements?: SleepingArrangement[];
  bookingUrl?: string;
  startingPrice?: number;
}

/* ------------------------------------------------------------------ */
/*  Properties                                                        */
/* ------------------------------------------------------------------ */

/** Bookable cabins first, former properties last. */
export const properties: Property[] = [
  {
    slug: "sublime",
    name: "Sublime Retreat",
    tagline:
      "A quiet, modern cabin in the Hochatown pines: two king suites, a Twin XL bunk room, a hot tub and a fire pit. Sleeps 8, dogs welcome.",
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 8,
    description:
      "Sublime Retreat is a modern, woodsy three-bedroom cabin in Hochatown, Oklahoma, tucked into the pines yet about five minutes from everything on Highway 259. It sleeps eight across two king suites and a Twin XL bunk room, and it has a hot tub, an outdoor fireplace, a fire pit, shuffleboard and an arcade. Dogs are welcome for a fee.",
    // Only what the Airbnb listing marks present; it is the source of truth.
    amenities: [
      { icon: "Bath", label: "Hot tub" },
      { icon: "Flame", label: "Fire pit" },
      { icon: "Gamepad2", label: "Arcade games" },
      { icon: "Target", label: "Shuffleboard" },
      { icon: "ChefHat", label: "Full kitchen" },
      { icon: "Wifi", label: "Wi-Fi" },
      { icon: "PawPrint", label: "Dogs welcome" },
      { icon: "Thermometer", label: "A/C and heating" },
      { icon: "WashingMachine", label: "Washer and dryer" },
    ],
    // Airbnb listing photography (all reusable, per Hunter). The first
    // eight lead the page's photo grid; the rest fill the photo tour.
    images: [
      {
        src: "/images/properties/sublime/sublime-retreat-aerial-night.jpg",
        alt: "Aerial view of Sublime Retreat at night, a blue-roofed cabin tucked into tall pines with string lights across the yard",
        caption: "Sublime at night, tucked into the pines",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-great-room.jpg",
        alt: "Great room at Sublime Retreat with a sectional sofa, a fireplace wall with a TV and a wood-plank vaulted ceiling",
        caption: "The great room",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-covered-deck-fireplace.jpg",
        alt: "Covered deck at Sublime Retreat with lounge chairs around an outdoor fireplace and TV, the hot tub behind",
        caption: "The covered deck and outdoor fireplace",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-king-suite-one.jpg",
        alt: "King suite at Sublime Retreat with an upholstered king bed, a diamond-molding accent wall and a sliding door to the patio",
        caption: "King suite one",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-bunk-room.jpg",
        alt: "Bunk room at Sublime Retreat with four built-in Twin XL bunks and a diagonal wood-plank wall",
        caption: "The bunk room: four built-in Twin XL bunks",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-hot-tub.jpg",
        alt: "Hot tub on the covered deck at Sublime Retreat, looking out into the pine forest",
        caption: "The hot tub, on the covered deck",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-fire-pit.jpg",
        alt: "Fire pit at Sublime Retreat with a stone surround and blue Adirondack chairs",
        caption: "The fire pit",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-loft-shuffleboard.jpg",
        alt: "Shuffleboard table in the upstairs loft at Sublime Retreat, beside the railing over the great room",
        caption: "Shuffleboard in the loft",
        room: "Game night",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-great-room-fireplace.jpg",
        alt: "Sectional sofa facing the fireplace wall in the great room at Sublime Retreat, with striped curtains",
        caption: "The fireplace wall",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-great-room-from-loft.jpg",
        alt: "The great room at Sublime Retreat seen from the loft, under a wood-plank vaulted ceiling",
        caption: "The great room, from the loft",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-kitchen-island.jpg",
        alt: "Kitchen island at Sublime Retreat with a farmhouse sink and gold faucet, looking into the great room",
        caption: "The kitchen island",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-kitchen.jpg",
        alt: "Kitchen at Sublime Retreat with a long white island, gold pendant lights and stainless appliances",
        caption: "The kitchen",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-dining.jpg",
        alt: "Dining table at Sublime Retreat with leather chairs, beside the kitchen island and bar stools",
        caption: "The dining table",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-entry-stairs.jpg",
        alt: "Entryway at Sublime Retreat with a navy accent wall, a wooden bench and open stairs up to the loft",
        caption: "The entry and the stairs to the loft",
        room: "Living",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-king-suite-one-chair.jpg",
        alt: "King suite at Sublime Retreat with a king bed, a sliding barn door and a teal velvet chair",
        caption: "Another view of king suite one",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-king-suite-two.jpg",
        alt: "Second king suite at Sublime Retreat with a king bed, striped curtains and a sliding door to its patio",
        caption: "King suite two",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-king-suite-two-bed.jpg",
        alt: "Second king suite at Sublime Retreat with a king bed, a wall-mounted TV and a wood-plank ceiling",
        caption: "Another view of king suite two",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-suite-patio.jpg",
        alt: "Private covered patio outside a king suite at Sublime Retreat, with wicker chairs and forest views",
        caption: "A king suite's private covered patio",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-bunk-room-ladder.jpg",
        alt: "Twin XL bunks with a black ladder and a wood-plank wall in the bunk room at Sublime Retreat",
        caption: "Built-in Twin XL bunks",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-walk-in-shower.jpg",
        alt: "Walk-in shower at Sublime Retreat with marble-look tile, a built-in bench and a wood-plank ceiling",
        caption: "Walk-in shower with a built-in bench",
        room: "Baths",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-double-vanity.jpg",
        alt: "Bathroom at Sublime Retreat with a double vanity, gold fixtures and shiplap walls",
        caption: "Double vanity and gold fixtures",
        room: "Baths",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-stone-shower.jpg",
        alt: "Walk-in shower at Sublime Retreat with dark stone-look tile, a bench and a small window",
        caption: "The dark-stone shower",
        room: "Baths",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-subway-tile-bath.jpg",
        alt: "Bathroom at Sublime Retreat with a subway-tile shower, a black rain showerhead and a patterned tile floor",
        caption: "Subway tile and a rain showerhead",
        room: "Baths",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-rain-shower.jpg",
        alt: "Gold rain showerhead with lights above a marble-look shower at Sublime Retreat",
        caption: "A rain showerhead",
        room: "Baths",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-loft-lounge.jpg",
        alt: "Upstairs loft lounge at Sublime Retreat with a long sofa, a TV and shiplap walls",
        caption: "The loft lounge",
        room: "Game night",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-arcade-table.jpg",
        alt: "Tabletop arcade at Sublime Retreat, its side lettered SUBLIME with a campfire logo, with stools on either side",
        caption: "The arcade table",
        room: "Game night",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-arcade-screen.jpg",
        alt: "Tabletop arcade game at Sublime Retreat seen from above, with joysticks and buttons",
        caption: "Arcade night",
        room: "Game night",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-front-at-dusk.jpg",
        alt: "Front of Sublime Retreat at dusk, with a lit porch, a gravel drive and string lights in the pines",
        caption: "The front of the cabin at dusk",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-deck-lounge.jpg",
        alt: "Covered deck at Sublime Retreat with a sectional, a coffee table and an outdoor fireplace with a TV",
        caption: "The deck lounge by the outdoor fireplace",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-outdoor-fireplace.jpg",
        alt: "Outdoor fireplace with patterned tile and a TV above it on the deck at Sublime Retreat",
        caption: "The outdoor fireplace",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-deck-grill.jpg",
        alt: "Covered deck at Sublime Retreat with wicker chairs and a gas grill above the trees",
        caption: "The deck and grill",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-yard-string-lights.jpg",
        alt: "Backyard at Sublime Retreat at dusk with string lights between the pines, a fire pit and yard games",
        caption: "The yard at dusk",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-yard-games.jpg",
        alt: "Yard games on the gravel behind Sublime Retreat, with the cabin and its deck lit up at dusk",
        caption: "Yard games out back",
        room: "Outdoors",
      },
      {
        src: "/images/properties/sublime/sublime-retreat-aerial-dusk-front.jpg",
        alt: "Aerial view of the front of Sublime Retreat at dusk, lit up among the pines",
        caption: "The cabin from above at dusk",
        room: "Outdoors",
      },
    ],
    featured: true,
    sleepingArrangements: [
      { room: "King suite one", details: "King bed, private covered patio" },
      { room: "King suite two", details: "King bed, private covered patio" },
      { room: "Bunk room", details: "Four built-in Twin XL bunks" },
    ],
    // No startingPrice: rates change daily and a hard-coded "from" figure
    // goes stale. The booking calendar shows the real total for real dates.
  },
  {
    slug: "livin-the-dream",
    name: "Livin' the Dream",
    tagline:
      "A three-bedroom, three-bath log cabin in the Broken Bow pines with a hot tub, a covered deck with a stone fireplace, a fire pit and a playground. Booking opens December 1.",
    bedrooms: 3,
    bathrooms: 3,
    // Beds for six across three bedrooms. The prior listing advertised 8
    // using a sofa sleeper that guests have disputed; raise this only once
    // the sofa is checked in person.
    sleeps: 6,
    description:
      "Livin' the Dream is a three-bedroom, three-bath log cabin in Broken Bow, Oklahoma, set among tall pines a short drive from Hochatown and Beavers Bend. It has a king bedroom on the main floor, two upstairs bedrooms each with its own full bath, a private hot tub on a covered deck with a stone gas fireplace, a fire pit, a playground and yard games. Frontier opens booking on December 1.",
    // Only what both prior listings advertise and the photos show.
    amenities: [
      { icon: "Bath", label: "Hot tub" },
      { icon: "Flame", label: "Fire pit" },
      { icon: "ChefHat", label: "Full kitchen" },
      { icon: "Wifi", label: "Wi-Fi" },
      { icon: "Thermometer", label: "A/C and heating" },
      { icon: "WashingMachine", label: "Washer and dryer" },
    ],
    // Listing photography from the handover (the prior manager's public
    // gallery, minus their yard-sign photo). The first eight lead the
    // page's photo grid.
    images: [
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-front.jpg",
        alt: "Front of Livin' the Dream, a two-story log cabin with a stone gable and a covered front porch among pine trees",
        caption: "The front of the cabin",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-great-room.jpg",
        alt: "Great room at Livin' the Dream with a brown leather sectional, two teal armchairs, a large wall clock and pine plank walls",
        caption: "The great room",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-hot-tub-fireplace.jpg",
        alt: "Hot tub on the covered back deck at Livin' the Dream, beside a stone gas fireplace with a TV above it",
        caption: "The hot tub, beside the deck fireplace",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-kitchen.jpg",
        alt: "Kitchen at Livin' the Dream with dark distressed cabinets, granite counters, a stainless dishwasher and a window over the sink",
        caption: "The kitchen",
        room: "Kitchen",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-downstairs-king.jpg",
        alt: "Main-floor bedroom at Livin' the Dream with a king bed, a rustic plank headboard and a ceiling fan",
        caption: "The main-floor king bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-fire-pit.jpg",
        alt: "Fire pit with four Adirondack chairs on the gravel behind Livin' the Dream, the cabin and its deck behind",
        caption: "The fire pit",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-downstairs-tile-shower.jpg",
        alt: "Bathroom at Livin' the Dream with a glass-door tile shower and pine plank walls",
        caption: "The main-floor tile shower",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-aerial.jpg",
        alt: "Aerial view of Livin' the Dream, a cabin roof surrounded by a dense pine forest",
        caption: "The cabin from above, in the pines",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-dining-and-living.jpg",
        alt: "Dining table with metal chairs beside the living area at Livin' the Dream, the kitchen behind",
        caption: "Dining and living, one open room",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-living-room-stairs.jpg",
        alt: "Living room at Livin' the Dream with a TV on an electric fireplace console, cowhide chairs and stairs up to the landing",
        caption: "The electric fireplace and the stairs up",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-living-room-to-kitchen.jpg",
        alt: "Living room at Livin' the Dream looking toward the kitchen, with a tufted leather ottoman and teal armchairs",
        caption: "Looking from the living room to the kitchen",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-great-room-from-above.jpg",
        alt: "The great room at Livin' the Dream seen from the upstairs landing, with the sectional, dining table and kitchen below",
        caption: "The great room, from upstairs",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-entry.jpg",
        alt: "Entry hall at Livin' the Dream with a wooden front door and a keypad lock",
        caption: "The entry",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-landing-nook.jpg",
        alt: "Console table with a world map, a cactus and a hello sign in a nook at Livin' the Dream",
        caption: "A nook on the way upstairs",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-landing.jpg",
        alt: "Upstairs landing at Livin' the Dream with an iron railing over the great room and wood floors",
        caption: "The upstairs landing",
        room: "Living",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-kitchen-and-dining.jpg",
        alt: "Kitchen at Livin' the Dream with a stainless range and microwave, a coffee station and a dining table in front",
        caption: "The kitchen and dining table",
        room: "Kitchen",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-kitchen-table.jpg",
        alt: "Long wooden dining table running toward the kitchen at Livin' the Dream, under a pine plank ceiling",
        caption: "The long dining table",
        room: "Kitchen",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-kitchen-range.jpg",
        alt: "Stainless range and over-the-range microwave on granite counters at Livin' the Dream",
        caption: "Range, oven and microwave",
        room: "Kitchen",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-kitchen-fridge.jpg",
        alt: "Stainless side-by-side refrigerator and a pantry with arched pine doors at Livin' the Dream",
        caption: "Refrigerator and pantry",
        room: "Kitchen",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-downstairs-king-side.jpg",
        alt: "King bed in the main-floor bedroom at Livin' the Dream, with a TV on a dresser and a window",
        caption: "Another view of the main-floor bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-downstairs-king-dresser.jpg",
        alt: "Main-floor bedroom at Livin' the Dream with a made bed, a rustic dresser with a TV and three windows",
        caption: "The main-floor bedroom's dresser and TV",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-one.jpg",
        alt: "Upstairs bedroom at Livin' the Dream with a chevron wood headboard, navy bedding and a TV on a dresser",
        caption: "An upstairs bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-one-bed.jpg",
        alt: "Bed with navy bedding under a wide window and a bear canvas in an upstairs bedroom at Livin' the Dream",
        caption: "Navy bedding and a window over the bed",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-one-door.jpg",
        alt: "Upstairs bedroom at Livin' the Dream with the door open to its own bathroom",
        caption: "Its own bath, through the door",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-two.jpg",
        alt: "Second upstairs bedroom at Livin' the Dream with a pine bed, a wall of windows with patterned curtains and a ceiling fan",
        caption: "The other upstairs bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-two-bed.jpg",
        alt: "Pine bed with white bedding and a dresser in the second upstairs bedroom at Livin' the Dream",
        caption: "Another view of the second upstairs bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-two-windows.jpg",
        alt: "Pine bed beside a row of windows with patterned curtains in the second upstairs bedroom at Livin' the Dream",
        caption: "A row of windows by the bed",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bedroom-two-quilt.jpg",
        alt: "Pine bed with a patterned quilt in the second upstairs bedroom at Livin' the Dream",
        caption: "The second upstairs bedroom",
        room: "Bedrooms",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-downstairs-double-vanity.jpg",
        alt: "Bathroom at Livin' the Dream with a long double vanity, granite counters and cactus art",
        caption: "The main-floor double vanity",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bath-vanity.jpg",
        alt: "Upstairs bathroom vanity at Livin' the Dream with a granite top and succulent prints",
        caption: "An upstairs bath",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bath-shower.jpg",
        alt: "Upstairs bathroom at Livin' the Dream with a patterned shower curtain and a vanity",
        caption: "Another view of the upstairs bath",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bath-two-vanity.jpg",
        alt: "Bathroom vanity with a granite top and a long mirror at Livin' the Dream",
        caption: "The other upstairs bath",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-upstairs-bath-two-tub.jpg",
        alt: "Bathroom at Livin' the Dream with a tub and shower behind a curtain, a vanity and a window",
        caption: "Tub and shower",
        room: "Baths",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-hot-tub.jpg",
        alt: "Hot tub at the end of the covered deck at Livin' the Dream, with log walls and string lights",
        caption: "The hot tub",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-hot-tub-deck.jpg",
        alt: "Hot tub on the covered deck at Livin' the Dream, with the stone fireplace in the corner",
        caption: "Hot tub and fireplace, under one roof",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-deck-fireplace.jpg",
        alt: "Stone gas fireplace with a wooden mantel and a TV on the covered deck at Livin' the Dream",
        caption: "The deck's stone gas fireplace",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-deck-dining.jpg",
        alt: "Glass outdoor dining table with six chairs on the covered deck at Livin' the Dream",
        caption: "Outdoor dining on the deck",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-deck-grill.jpg",
        alt: "Covered deck at Livin' the Dream with a gas grill, a patio table and a ceiling fan, pines beyond the railing",
        caption: "The deck and grill",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-deck-grill-lounge.jpg",
        alt: "Gas grill and wicker seating on the covered deck at Livin' the Dream, the fireplace at the far end",
        caption: "Grill and seating",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-covered-deck.jpg",
        alt: "Long covered deck along the back of Livin' the Dream, with a grill and a painted Livin' the Dream sign",
        caption: "The long covered deck",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-back-deck-horseshoes.jpg",
        alt: "Back of Livin' the Dream with its wraparound covered deck, and a horseshoe pit in the foreground",
        caption: "The back of the cabin and the horseshoe pit",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-fire-pit-cauldron.jpg",
        alt: "Iron cauldron fire pit ringed with stones and Adirondack chairs behind Livin' the Dream",
        caption: "Around the fire pit",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-fire-pit-yard.jpg",
        alt: "Fire pit and Adirondack chairs in the pine yard beside Livin' the Dream",
        caption: "The fire pit, in the pines",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-ladder-ball.jpg",
        alt: "Ladder ball set in the yard at Livin' the Dream, the cabin behind",
        caption: "Ladder ball",
        room: "Outdoors",
      },
      {
        src: "/images/properties/livin-the-dream/livin-the-dream-playground.jpg",
        alt: "Wooden playset with a fort, swings and a green slide among the pines at Livin' the Dream",
        caption: "The playground",
        room: "Outdoors",
      },
    ],
    featured: false,
    opensOn: "December 1",
    sleepingArrangements: [
      { room: "Main-floor bedroom", details: "King bed, TV" },
      { room: "Upstairs bedroom", details: "King bed, TV, its own full bath" },
      { room: "Upstairs bedroom", details: "Queen bed, TV, its own full bath" },
    ],
  },
  {
    slug: "old-broken-bow-highway",
    name: "Cozy 3BR Poolside Getaway in Broken Bow",
    tagline:
      "Relax by the private pool, gather around the firepit, and enjoy the peaceful Broken Bow countryside in this comfortable 3-bedroom house.",
    bedrooms: 3,
    bathrooms: 3,
    sleeps: 6,
    description:
      "Nestled along the scenic Old Broken Bow Highway, this charming 3-bedroom, 3-bathroom house is perfect for families and small groups looking for a peaceful getaway. The highlight is the private outdoor pool, ideal for cooling off on warm Oklahoma afternoons. Inside, you will find comfortable living spaces with central heating and AC, a fully equipped kitchen, and a washer and dryer for longer stays. Step outside to the covered deck with an outdoor firepit and grill, perfect for evening s'mores or a weekend cookout. The house is pet-friendly, so the whole family can come along. Located just minutes from Beavers Bend State Park and downtown Broken Bow, you are close to hiking, fishing, and local restaurants while still enjoying the privacy of your own retreat.",
    amenities: [
      { icon: "Waves", label: "Private outdoor pool" },
      { icon: "Thermometer", label: "Central heating/AC" },
      { icon: "WashingMachine", label: "Washer & dryer" },
      { icon: "Flame", label: "Outdoor firepit and grill" },
      { icon: "PawPrint", label: "Pet-friendly" },
    ],
    images: [
      {
        src: "/images/properties/old-broken-bow-highway/obb-2.jpg",
        alt: "Exterior view of the Cozy 3BR house on Old Broken Bow Highway",
      },
      {
        src: "/images/properties/old-broken-bow-highway/obb-1.jpg",
        alt: "Cozy bedroom with queen bed and hardwood floors",
      },
      {
        src: "/images/properties/old-broken-bow-highway/obb-3.jpg",
        alt: "Comfortable living space inside the house",
      },
      {
        src: "/images/properties/old-broken-bow-highway/obb-4.webp",
        alt: "House interior with modern amenities",
      },
      {
        src: "/images/properties/old-broken-bow-highway/obb-5.jpg",
        alt: "Outdoor pool area at the Old Broken Bow Highway house",
      },
    ],
    featured: false,
    former: true,
    sleepingArrangements: [
      { room: "Bedroom 1", details: "King bed" },
      { room: "Bedroom 2", details: "Queen bed" },
      { room: "Bedroom 3", details: "Two twin beds" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
