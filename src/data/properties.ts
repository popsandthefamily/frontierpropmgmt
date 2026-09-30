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
