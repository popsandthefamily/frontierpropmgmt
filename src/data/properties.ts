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
  sleepingArrangements?: SleepingArrangement[];
  bookingUrl?: string;
}

/* ------------------------------------------------------------------ */
/*  Properties                                                        */
/* ------------------------------------------------------------------ */

export const properties: Property[] = [
  {
    slug: "old-broken-bow-highway",
    name: "Cozy 3BR Poolside Getaway in Broken Bow",
    tagline:
      "Relax by the private pool, gather around the firepit, and enjoy the peaceful Broken Bow countryside in this comfortable 3-bedroom cabin.",
    bedrooms: 3,
    bathrooms: 3,
    sleeps: 6,
    description:
      "Nestled along the scenic Old Broken Bow Highway, this charming 3-bedroom, 3-bathroom cabin is perfect for families and small groups looking for a peaceful getaway. The highlight is the private outdoor pool, ideal for cooling off on warm Oklahoma afternoons. Inside, you will find comfortable living spaces with central heating and AC, a fully equipped kitchen, and a washer and dryer for longer stays. Step outside to the covered deck with an outdoor firepit and grill — perfect for evening s'mores or a weekend cookout. The cabin is pet-friendly, so the whole family can come along. Located just minutes from Beavers Bend State Park and downtown Broken Bow, you are close to hiking, fishing, and local restaurants while still enjoying the privacy of your own retreat.",
    amenities: [
      { icon: "Waves", label: "Private outdoor pool" },
      { icon: "Thermometer", label: "Central heating/AC" },
      { icon: "WashingMachine", label: "Washer & dryer" },
      { icon: "Flame", label: "Outdoor firepit and grill" },
      { icon: "PawPrint", label: "Pet-friendly" },
    ],
    images: [
      {
        src: "/images/properties/old-broken-bow-highway/exterior.jpg",
        alt: "Cabin exterior with pool",
      },
      {
        src: "/images/properties/old-broken-bow-highway/pool.jpg",
        alt: "Private outdoor pool",
      },
      {
        src: "/images/properties/old-broken-bow-highway/living-room.jpg",
        alt: "Living room interior",
      },
      {
        src: "/images/properties/old-broken-bow-highway/kitchen.jpg",
        alt: "Fully equipped kitchen",
      },
      {
        src: "/images/properties/old-broken-bow-highway/bedroom.jpg",
        alt: "Master bedroom",
      },
      {
        src: "/images/properties/old-broken-bow-highway/firepit.jpg",
        alt: "Outdoor firepit area",
      },
    ],
    featured: true,
    sleepingArrangements: [
      { room: "Bedroom 1", details: "King bed" },
      { room: "Bedroom 2", details: "Queen bed" },
      { room: "Bedroom 3", details: "Two twin beds" },
    ],
  },
  {
    slug: "sublime",
    name: "Sublime Retreat",
    tagline:
      "New Boho-Modern Luxury Cabin | 2 King Suites + Bunk Room | Hot Tub | 2 Zip Lines | Pet Friendly",
    bedrooms: 3,
    bathrooms: 3.5,
    sleeps: 8,
    description:
      "Sublime Retreat is a brand-new, boho-modern luxury cabin that redefines the Hochatown experience. Designed with meticulous attention to detail, this stunning 3-bedroom, 3.5-bathroom cabin sleeps up to 8 guests and is packed with amenities you will not find anywhere else. Thrill-seekers will love the two private zip lines that soar through the trees, while the hot tub with Bluetooth speakers is the perfect place to unwind under the stars. Inside, the open-concept living area features a Calcutta quartz kitchen, bamboo hardwood floors, and a cozy indoor fireplace. Game night is taken to the next level with a full-size arcade machine, shuffleboard table, and cornhole boards on the deck. Stay connected with 500 Mbps high-speed Wi-Fi and smart TVs in every room. Two luxurious king suites with en-suite bathrooms offer a spa-like experience, while the fun bunk room is perfect for kids or extra guests. A dual-sided indoor/outdoor fireplace connects the living room to the covered deck, blending the cabin's interior warmth with the beauty of the surrounding forest. Sublime Retreat is pet-friendly and centrally located in Hochatown — minutes from Beavers Bend State Park, restaurants, and local attractions.",
    amenities: [
      { icon: "Zap", label: "2 private zip lines" },
      { icon: "Bath", label: "Hot tub with Bluetooth speakers" },
      { icon: "Gamepad2", label: "Full-size arcade machine" },
      { icon: "Target", label: "Shuffleboard table" },
      { icon: "CircleDot", label: "Cornhole boards" },
      { icon: "Wifi", label: "500 Mbps high-speed Wi-Fi" },
      { icon: "Tv", label: "Smart TVs in every room" },
      { icon: "ChefHat", label: "Calcutta quartz kitchen" },
      { icon: "TreePine", label: "Bamboo hardwood floors" },
      { icon: "Flame", label: "Indoor/outdoor fireplace" },
      { icon: "PawPrint", label: "Pet-friendly" },
      { icon: "Thermometer", label: "Central heating/AC" },
      { icon: "WashingMachine", label: "Washer & dryer" },
    ],
    images: [
      {
        src: "/images/properties/sublime/sublime-1.jpg",
        alt: "Sublime Retreat exterior view",
      },
      {
        src: "/images/properties/sublime/sublime-2.jpg",
        alt: "Open-concept living area",
      },
      {
        src: "/images/properties/sublime/sublime-3.jpg",
        alt: "Calcutta quartz kitchen",
      },
      {
        src: "/images/properties/sublime/sublime-4.jpg",
        alt: "King suite with en-suite bathroom",
      },
      {
        src: "/images/properties/sublime/sublime-5.jpg",
        alt: "Bunk room",
      },
      {
        src: "/images/properties/sublime/sublime-6.jpg",
        alt: "Hot tub with forest view",
      },
      {
        src: "/images/properties/sublime/sublime-7.jpg",
        alt: "Zip line through the trees",
      },
      {
        src: "/images/properties/sublime/sublime-8.jpg",
        alt: "Covered deck with fireplace and seating",
      },
    ],
    featured: true,
    sleepingArrangements: [
      { room: "Master Suite", details: "King bed, en-suite bathroom" },
      { room: "Second King Suite", details: "King bed, en-suite bathroom" },
      {
        room: "Bunk Room",
        details: "Full-over-full bunk bed, half bath access",
      },
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
