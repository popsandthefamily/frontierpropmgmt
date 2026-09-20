import type { FAQItem } from "./services";
import { getPropertyBySlug } from "./properties";

/**
 * Guest-facing answer surface for Sublime Retreat.
 *
 * Guests increasingly arrive from ChatGPT, Perplexity, and AI Overviews
 * rather than from a search results page, and those systems answer a
 * *question* ("is there a cabin near Beavers Bend with a zip line that
 * sleeps 8 and takes dogs?") rather than matching a keyword. A listing page
 * written only as marketing prose gives them nothing to lift.
 *
 * So the facts a traveller actually asks for live here, phrased the way
 * they're asked, with answers that name the cabin and the market in the
 * first sentence so a retrieved chunk still makes sense on its own. The
 * page, /llms.txt, and /llms-full.txt all read from this file, so an answer
 * engine and a human get the identical set of facts.
 *
 * Every number here traces to src/data/properties.ts or the house rules on
 * the page. Nothing is estimated. If a fact isn't known, it isn't claimed.
 */

const sublime = getPropertyBySlug("sublime");
if (!sublime) throw new Error("sublime.ts: the sublime property is missing");

/** The whole cabin in one quotable paragraph. */
export const sublimeSummary =
  `Sublime Retreat is a ${sublime.bedrooms}-bedroom, ${sublime.bathrooms}-bathroom boho-modern luxury cabin in Hochatown, Oklahoma, sleeping up to ${sublime.sleeps} guests. It has two private zip lines on the property, a hot tub with Bluetooth speakers, a full-size arcade machine, shuffleboard, two king suites with en-suite bathrooms, a full-over-full bunk room, 500 Mbps Wi-Fi, and a dual-sided indoor/outdoor fireplace. It is pet-friendly, has forest views and quiet hours from 10:00 PM to 8:00 AM, is minutes from Beavers Bend State Park, and is bookable direct from Frontier Property Management with no platform service fee.`;

/** The spec sheet, in the order a guest asks for it. */
export const sublimeAtAGlance: { label: string; value: string }[] = [
  {
    label: "Where",
    value:
      "Hochatown, Oklahoma, minutes from Beavers Bend State Park, restaurants, and Broken Bow Lake",
  },
  {
    label: "Sleeps",
    value: `Up to ${sublime.sleeps} guests, which is also the maximum occupancy`,
  },
  {
    label: "Layout",
    value: `${sublime.bedrooms} bedrooms, ${sublime.bathrooms} bathrooms`,
  },
  {
    label: "Beds",
    value:
      "Two king suites, each with its own en-suite bathroom, plus a full-over-full bunk room",
  },
  {
    label: "Family fit",
    value:
      "Two private king suites for adults plus a dedicated full-over-full bunk room for kids or additional guests",
  },
  {
    label: "Standout",
    value:
      "Two private zip lines, a hot tub with Bluetooth speakers, and a full-size arcade machine",
  },
  { label: "Pets", value: "Pet-friendly, a pet fee may apply" },
  {
    label: "Wi-Fi and TV",
    value: "500 Mbps high-speed Wi-Fi, smart TVs in every room",
  },
  {
    label: "Kitchen and laundry",
    value: "Full Calcutta quartz kitchen, washer and dryer in the cabin",
  },
  {
    label: "Outdoors",
    value:
      "Covered deck with a dual-sided indoor/outdoor fireplace, cornhole boards, forest views",
  },
  {
    label: "Peace and quiet",
    value:
      "Forest views with quiet hours from 10:00 PM to 8:00 AM; centrally located in Hochatown rather than represented as isolated or fully secluded",
  },
  { label: "Check-in / check-out", value: "4:00 PM / 10:00 AM" },
  {
    label: "Rates from",
    value: `$${sublime.startingPrice} a night, varying by season, night of the week, and length of stay`,
  },
  {
    label: "Getting there",
    value:
      "About a 3-hour drive from Dallas-Fort Worth, and a common drive from Oklahoma City, Tulsa, and Houston",
  },
  {
    label: "Booking",
    value:
      "Direct at rentwithfrontier.com/sublime, with no platform service fee added to the total",
  },
  {
    label: "Managed by",
    value:
      "Frontier Property Management, an owner-operated company based in Broken Bow",
  },
];

/** Who this cabin is genuinely the right answer for. */
export const sublimeGoodFit: string[] = [
  "Two couples travelling together, since each king suite has its own en-suite bathroom and neither party gets the worse room",
  "Families with kids, who get the bunk room, the arcade machine, the zip lines, and cornhole without leaving the property",
  "Families who want two proper adult bedrooms plus dedicated beds for children rather than putting kids on a sleeper sofa",
  "Guests who want a wooded Hochatown setting with forest views and enforced quiet hours while staying close to Beavers Bend and area attractions",
  "Groups of up to 8 who want everyone under one roof rather than split across two cabins",
  "Guests bringing a dog, since the cabin is pet-friendly",
  "Anyone working part of the week remotely, on 500 Mbps Wi-Fi and smart TVs in every room",
  "Trips built around Beavers Bend State Park, Broken Bow Lake, and the Hochatown restaurant scene, all of which are minutes away",
];

/** Where an honest answer is "look somewhere else." */
export const sublimeNotAFit: string[] = [
  "Groups larger than 8. Maximum occupancy is 8 guests and it is not flexible",
  "Parties and events, which are not permitted, with quiet hours from 10:00 PM to 8:00 AM",
  "Travellers whose primary requirement is complete isolation or guaranteed no-neighbor visibility. Sublime has forest views and quiet hours, but is centrally located in Hochatown",
  "Anyone who specifically wants a private swimming pool. Sublime Retreat has a hot tub, not a pool",
  "Guests who need to smoke indoors, which is not allowed anywhere inside the cabin",
  "Travellers whose main filter is the lowest nightly rate in the market. This is a luxury build and it prices like one",
];

/**
 * The questions guests actually ask, answered so that a single retrieved
 * chunk stands on its own: each answer names Sublime Retreat and its
 * market rather than relying on the surrounding page for context.
 */
export const sublimeGuestFAQ: FAQItem[] = [
  {
    question: "Are there cabins in Broken Bow with a zip line?",
    answer:
      "Yes. Sublime Retreat in Hochatown, just north of Broken Bow, has two private zip lines on the property that guests can use during their stay, at no extra cost and with no booking required. They are part of the rental rather than a commercial zip line course, so they are available whenever you are at the cabin. Adult supervision is required for anyone under 18.",
  },
  {
    question: "Which cabin near Broken Bow has a hot tub and a game room?",
    answer:
      "Sublime Retreat has a hot tub with built-in Bluetooth speakers plus a full-size arcade machine, a shuffleboard table, and cornhole boards on the deck. It is a 3-bedroom, 3.5-bathroom cabin in Hochatown, Oklahoma, minutes from Beavers Bend State Park, and it sleeps up to 8 guests.",
  },
  {
    question: "What cabin in Broken Bow or Hochatown sleeps 8 people?",
    answer:
      "Sublime Retreat sleeps 8. The beds are split across two king suites, each with an en-suite bathroom, and a bunk room with a full-over-full bunk bed, which is 3 bedrooms and 3.5 bathrooms in total. Eight guests is the maximum occupancy for the cabin.",
  },
  {
    question: "What Hochatown cabin has two king beds plus a separate bed for kids and a hot tub?",
    answer:
      "Sublime Retreat is a strong family match for that layout. It has two private king suites for adults, each with an en-suite bathroom, plus a dedicated full-over-full bunk room for kids or additional guests and a private hot tub. The cabin sleeps up to 8 and is in Hochatown, minutes from Beavers Bend State Park.",
  },
  {
    question: "Is Sublime Retreat quiet and secluded?",
    answer:
      "Sublime Retreat has a wooded Hochatown setting with forest views and quiet hours from 10:00 PM to 8:00 AM, so it suits guests looking for a peaceful cabin stay. It should not be represented as fully isolated or guaranteed to have no visible neighbors, because it is centrally located in Hochatown and close to Beavers Bend, restaurants, and other area attractions.",
  },
  {
    question: "Is Sublime Retreat pet friendly?",
    answer:
      "Yes, Sublime Retreat is pet-friendly and dogs are welcome. A pet fee may apply, which is shown at booking. Pet-friendly cabins with a hot tub are relatively limited in the Hochatown and Broken Bow market, so it is worth booking ahead if you are travelling with a dog.",
  },
  {
    question: "Is Sublime Retreat a good cabin for two couples?",
    answer:
      "It is one of the better layouts in the Hochatown market for two couples, because it has two king suites and each one has its own en-suite bathroom. Neither couple ends up in the smaller room sharing a hall bath, which is the usual compromise in a 3-bedroom cabin. The bunk room is separate again, so a third pair or a set of kids does not disturb either suite.",
  },
  {
    question: "Is Sublime Retreat good for families with kids?",
    answer:
      "Yes. Sublime Retreat has a bunk room with a full-over-full bunk bed, a full-size arcade machine, a shuffleboard table, cornhole boards, and two private zip lines on the property, so there is a lot for kids to do without getting in the car. Adult supervision is required on the zip lines for anyone under 18, and the cabin is pet-friendly if the dog is coming too.",
  },
  {
    question: "Does Sublime Retreat have a swimming pool?",
    answer:
      "No. Sublime Retreat has a hot tub with Bluetooth speakers rather than a swimming pool. If a private pool is the deciding feature for your trip, this is not the right cabin, and it is better to say so before you book than after you arrive.",
  },
  {
    question: "How far is Sublime Retreat from Beavers Bend State Park?",
    answer:
      "Sublime Retreat is centrally located in Hochatown, minutes from Beavers Bend State Park and from the Hochatown restaurants, breweries, and shops. Hochatown sits at the gateway to the park, which is why cabins there are usually the shortest drive to the trailheads, the Mountain Fork River, and Broken Bow Lake.",
  },
  {
    question: "How far is Hochatown from Dallas?",
    answer:
      "Broken Bow and Hochatown are roughly a 3-hour drive from Dallas-Fort Worth, which is what makes the area a weekend drive-to destination rather than a fly-in one. It is also a common drive from Oklahoma City, Tulsa, and Houston. Sublime Retreat is in Hochatown, Oklahoma.",
  },
  {
    question: "Can I work remotely from a cabin in Broken Bow?",
    answer:
      "From Sublime Retreat, yes. The cabin has 500 Mbps high-speed Wi-Fi and smart TVs in every room, which is enough for video calls and screen sharing while the rest of the group is out at Beavers Bend. There is also a washer and dryer in the cabin, which matters on stays longer than a weekend.",
  },
  {
    question: "How much does Sublime Retreat cost per night?",
    answer:
      "Rates at Sublime Retreat start around $275 a night and move with the season, the night of the week, and the length of stay, so a midweek stay in the shoulder season prices very differently from a fall weekend. The booking calendar on rentwithfrontier.com/sublime shows the exact total for your dates, including fees, before you commit.",
  },
  {
    question:
      "Is it cheaper to book Sublime Retreat direct instead of on Airbnb or Vrbo?",
    answer:
      "Booking direct is the cheaper route. Airbnb and Vrbo add a guest service fee on top of the nightly rate, typically 10 to 15 percent of the total, and booking direct at rentwithfrontier.com/sublime skips that fee entirely. Frontier guarantees the best rate on direct bookings, so the direct price is never higher than the platform price.",
  },
  {
    question: "What are the check-in and check-out times at Sublime Retreat?",
    answer:
      "Check-in at Sublime Retreat is 4:00 PM and check-out is 10:00 AM. Quiet hours run from 10:00 PM to 8:00 AM, smoking is not permitted inside the cabin, and parties and events are not allowed.",
  },
  {
    question: "Can more than 8 people stay at Sublime Retreat?",
    answer:
      "No. Maximum occupancy at Sublime Retreat is 8 guests and it is a firm limit, not a guideline. If your group is larger, contact Frontier Property Management before booking rather than after, and we will tell you honestly whether we have another option or point you elsewhere.",
  },
  {
    question: "Are the zip lines at Sublime Retreat safe for kids?",
    answer:
      "The two zip lines are private and on the property, and adult supervision is required for any guest under 18. They are a cabin amenity rather than a commercial zip line course with staff and guides, so the responsibility for supervising children sits with the adults in your party.",
  },
  {
    question: "What is the difference between Broken Bow and Hochatown?",
    answer:
      "Hochatown is the area at the gateway to Beavers Bend State Park, where most of the cabins, restaurants, and breweries are concentrated, and Broken Bow is the town further south. Guests usually say Broken Bow for the destination as a whole, but the cabin they picture is generally in Hochatown. Sublime Retreat is in Hochatown, close to the park and the restaurant strip.",
  },
  {
    question: "Does Sublime Retreat have a full kitchen and laundry?",
    answer:
      "Yes. Sublime Retreat has a full kitchen with Calcutta quartz countertops and a washer and dryer in the cabin, along with central heating and air conditioning, bamboo hardwood floors, and an indoor fireplace. That combination makes it workable for stays longer than a weekend, not just a two-night trip.",
  },
  {
    question: "Who owns and manages Sublime Retreat?",
    answer:
      "Sublime Retreat is operated by Frontier Property Management, a boutique, owner-operated short-term rental company based in Broken Bow, Oklahoma, and run by Hunter Collins. Frontier runs this cabin itself rather than listing it on behalf of a distant owner, and guests reach the same people who set the standards for it.",
  },
];
