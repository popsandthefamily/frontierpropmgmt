/**
 * Hochatown short-term rental license and lodging tax: the facts behind
 * /hochatown-str-license-lodging-tax, and the source for every FAQ answer
 * on the site that touches them.
 *
 * Every figure here was read in a primary source (the Town's ordinances,
 * forms, and FAQ; the Broken Bow municipal code; the Oklahoma Tax
 * Commission) on LAST_VERIFIED. Each fact carries its source so the page can
 * cite it and so the next person to update it knows where to look. Rules
 * change: when a fact is re-verified, update LAST_VERIFIED and the fact
 * together. When a fact cannot be verified, it is left out rather than
 * guessed.
 */

export const LAST_VERIFIED = "September 27, 2026";
export const LAST_VERIFIED_ISO = "2026-09-27";

export interface Source {
  label: string;
  url: string;
}

export const SOURCES = {
  townStr: {
    label: "Town of Hochatown, Short-Term Rentals page",
    url: "https://www.hochatown.gov/str",
  },
  ordinance6: {
    label: "Town of Hochatown Ordinance No. 6 (short-term rental licensing, 2024)",
    url: "https://www.hochatown.gov/_files/ugd/8c9e93_49909999b6b44d039faaa5582bcd9868.pdf",
  },
  lodgingTaxFaq: {
    label: "Town of Hochatown Lodging Tax FAQ",
    url: "https://www.hochatown.gov/_files/ugd/8c9e93_8052d66c37824086a0e8aefb4befa8a2.pdf",
  },
  lodgingTaxOrdinance: {
    label: "Town of Hochatown Lodging Tax Ordinance No. 2023-03-07-01",
    url: "https://www.hochatown.gov/_files/ugd/8c9e93_581e265acdc24d23b5244ab998c940d1.pdf",
  },
  taxBreakdown: {
    label: "Town of Hochatown tax breakdown (effective July 1, 2023)",
    url: "https://www.hochatown.gov/_files/ugd/dfd658_afc21ca2d43d4575aecb9a7010a636d8.pdf",
  },
  resolution202606: {
    label: "Town of Hochatown Resolution 2026-06 (2026 renewal extension)",
    url: "https://www.hochatown.gov/_files/ugd/8c9e93_a6a596b6d7ea41d2b16b79b282a2b167.pdf",
  },
  changeOfManagement: {
    label: "Town of Hochatown, Change of Cabin Management Company form",
    url: "https://us.openforms.com/Form/c7bcb501-82dd-46ac-a36e-aa12a813122c",
  },
  townCode: {
    label: "Town of Hochatown Code (Ordinance No. 3)",
    url: "https://www.hochatown.gov/_files/ugd/dfd658_b5bc5ce55d8e4413b293bcd9cb70b26d.pdf",
  },
  brokenBowCode: {
    label: "City of Broken Bow Code of Ordinances (Municode)",
    url: "https://library.municode.com/ok/broken_bow/codes/code_of_ordinances",
  },
  otcBusinesses: {
    label: "Oklahoma Tax Commission, business help center",
    url: "https://oklahoma.gov/tax/helpcenter/businesses.html",
  },
} satisfies Record<string, Source>;

/** Complaint line the Town publishes on its STR page. */
export const HOCHATOWN_STR_HOTLINE = "580-896-5242";

/**
 * Tax rates from the Town's own breakdown. The Oklahoma Tax Commission's
 * Q4 2026 rate chart matches the state, county, and town sales rates and
 * the county lodging rate; the Town collects its 4% lodging tax itself.
 */
export const TAX_ROWS: { tax: string; inTown: string; county: string }[] = [
  { tax: "Oklahoma state sales tax", inTown: "4.5%", county: "4.5%" },
  { tax: "McCurtain County sales tax", inTown: "1.75%", county: "1.75%" },
  { tax: "Town of Hochatown sales tax", inTown: "3%", county: "—" },
  { tax: "McCurtain County lodging tax", inTown: "3%", county: "3%" },
  { tax: "Town of Hochatown lodging tax", inTown: "4%", county: "—" },
];
export const TAX_TOTALS = { inTown: "16.25%", county: "9.25%" };

export interface GuideSection {
  id: string;
  heading: string;
  /** Plain paragraphs. */
  body: string[];
  /** Short list, rendered after the body. */
  points?: string[];
  sources: Source[];
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "which-rules",
    heading: "First, which rules apply to your cabin?",
    body: [
      "A Broken Bow-area address does not tell you which rules apply. Hochatown has no ZIP code of its own, so cabins inside the town limits use Broken Bow's 74728 like everywhere else nearby. What matters is the jurisdiction the property actually sits in: inside the Town of Hochatown, inside the City of Broken Bow, or in unincorporated McCurtain County.",
      "Hochatown voted to incorporate in November 2022. Since then the Town has adopted its own short-term rental license and its own 4% lodging tax, which apply only inside its limits. If you are not sure where your parcel falls, ask the Town before you assume either way.",
    ],
    sources: [SOURCES.townStr],
  },
  {
    id: "license",
    heading: "The Hochatown STR license",
    body: [
      "Inside Hochatown town limits, no dwelling may be rented, advertised, or offered as a short-term rental until the Town has issued a short-term rental license to the operator. The requirement comes from Ordinance No. 6, passed March 12, 2024.",
    ],
    points: [
      "New license: $400 the first year, made up of a one-time $300 registration fee plus the $100 annual fee.",
      "Renewal: $100 a year, due on or before July 1. The Town can extend the deadline by resolution, and did for 2026: Resolution 2026-06 moved it from July 1 to August 29, 2026.",
      "Late fee: $250 per month if a property is not registered, or if the annual fee is not paid by the deadline. The Town's renewal form applies it per unit.",
      "Display: the license must be posted inside the premises near the main entry, where it can be seen.",
    ],
    sources: [SOURCES.ordinance6, SOURCES.resolution202606, SOURCES.townStr],
  },
  {
    id: "operating-rules",
    heading: "Rules for operating a licensed rental",
    body: [
      "Ordinance No. 6 is short. Beyond the license, it requires three things of every operator, and it sets out what happens when a complaint comes in.",
    ],
    points: [
      "Emergency contact: the owner must name an emergency contact who can be reached 24 hours a day, seven days a week. When the Town contacts them about a problem, they must reach the operator within the hour, and the operator must start fixing it immediately. An unreachable contact counts as non-compliance.",
      "Parking: guests may park only in the available off-street spaces. Parking on the street is prohibited.",
      `Complaints: the Town runs a 24-hour live hotline at ${HOCHATOWN_STR_HOTLINE}.`,
      "Enforcement: three or more instances of non-compliance in 12 consecutive months can cost the license, which can also be revoked immediately for a violation of state or federal law. The owner has 10 days to appeal to the Board of Trustees. Violations of the Town Code carry fines of up to $500 per offense, and each day can count as a separate offense.",
    ],
    sources: [SOURCES.ordinance6, SOURCES.townStr, SOURCES.townCode],
  },
  {
    id: "noise-occupancy",
    heading: "Noise, occupancy, and trash",
    body: [
      "People expect a quiet-hours rule and an occupancy cap. We did not find either. Ordinance No. 6 sets no numeric occupancy limit (the license application asks for your maximum occupancy and bedroom count, but the ordinance does not cap it), and it sets no STR-specific quiet hours.",
      "The Town's general code still applies. Loud or unusual noise that annoys people of ordinary sensibilities is a nuisance, disturbing the peace with loud music or noise is prohibited, and letting trash accumulate into a littering nuisance is unlawful. Your own house rules, and your platform's, are usually stricter than that, and they are what keeps you out of the complaint process in the first place.",
    ],
    sources: [SOURCES.ordinance6, SOURCES.townCode],
  },
  {
    id: "lodging-tax",
    heading: "The Hochatown lodging tax",
    body: [
      "The Town levies a 4% lodging tax on lodging inside its limits, effective May 1, 2023. It is charged on the gross amount the guest pays, and the Town's FAQ is explicit that this includes every associated fee: cleaning, pet fees, concierge services, and so on. Management and cleaning costs are not deducted.",
      "The operator collects the tax from the guest and is liable to the Town for it. Returns are due monthly, no later than the 15th of the month after the reporting period. Late returns carry a $15 late fee, plus 2% interest and a 10% penalty per month, with the penalty capped at 50%.",
      "The Town's FAQ also says it has not received lodging tax payments from Airbnb, VRBO, or similar platforms, and that paying it remains the cabin owner's responsibility. Do not assume the platform has remitted it for you.",
    ],
    sources: [SOURCES.lodgingTaxFaq, SOURCES.lodgingTaxOrdinance],
  },
  {
    id: "filing",
    heading: "How to file",
    body: [
      "The Town files lodging tax through Granicus. It stopped working with the previous vendor, Avenu, effective October 1, 2024; the Town's STR page says that decision was the Town's. (Some older write-ups, including one of ours, attributed the switch to McCurtain County. It was the Town.)",
      "Remittance runs through Granicus forms linked from the Town's STR page, with a bulk option for multiple properties and single-property options with and without exemptions. A paper return, payable to the Town of Hochatown, is also available. The Town's remittance form notes the tax is due to the Town, not to the Oklahoma Tax Commission. At the time we checked, the Town's STR page said its tax portal was being repaired and an improved one was expected.",
    ],
    sources: [SOURCES.townStr, SOURCES.lodgingTaxFaq],
  },
  {
    id: "all-taxes",
    heading: "Every tax on a Hochatown stay",
    body: [
      "The 4% town lodging tax is one of five taxes on a stay inside Hochatown. The Town's own breakdown puts the total at 16.25% inside town limits, against 9.25% in unincorporated McCurtain County. Figures you may see elsewhere, such as a single \"14% Hochatown lodging tax\", do not match the Town's documents.",
    ],
    sources: [SOURCES.taxBreakdown],
  },
  {
    id: "broken-bow",
    heading: "If the cabin is inside Broken Bow city limits",
    body: [
      "Broken Bow is a separate city with separate rules. Its code sets a 5% occupancy charge on the room charge for furnished rooms in hotels and motels within the city, filed with the city clerk or treasurer by the 20th. The code defines a hotel by room count, and whether a single cabin falls under it is a question for the City, not one we can answer from the code.",
      "Zoning matters more. Since February 2024 (Ordinance 428), Broken Bow permits short-term rentals only in areas zoned C-5 highway commercial and commercial recreation, with established hotels and motels grandfathered. If you are buying inside Broken Bow city limits to rent, check the zoning before anything else. We found no separate Broken Bow STR license in the code.",
    ],
    sources: [SOURCES.brokenBowCode],
  },
  {
    id: "state",
    heading: "Oklahoma: sales tax on lodging",
    body: [
      "Lodging is subject to Oklahoma's 4.5% state sales tax, and the Oklahoma Tax Commission issues sales tax permits through OkTAP. The Commission also says marketplace facilitators that sell Oklahoma lodging may be required to collect and remit state and local taxes. We found no Oklahoma state STR license. Whether you personally need a sales tax permit depends on how your rental is booked, which is a question for the Tax Commission or your accountant.",
    ],
    sources: [SOURCES.otcBusinesses],
  },
  {
    id: "changing-managers",
    heading: "Changing managers",
    body: [
      "If you change property managers, the Town wants to know. Its Change of Cabin Management Company form updates the management company on your STR license. You need your license number, there is no fee, and the Town emails an updated license certificate to the owner.",
    ],
    sources: [SOURCES.changeOfManagement],
  },
];

export const HOCHATOWN_STR_FAQ = [
  {
    question: "Do I need a license to run a short-term rental in Hochatown?",
    answer:
      "Yes, if the cabin is inside Hochatown town limits. Ordinance No. 6 (2024) prohibits renting, advertising, or offering a dwelling as a short-term rental until the Town has issued a short-term rental license to the operator.",
  },
  {
    question: "How much is the Hochatown STR license, and when is it due?",
    answer:
      "$400 for a new license: a one-time $300 registration fee plus the $100 annual fee. Renewal is $100 a year, due on or before July 1 (for 2026 the Town extended it to August 29). A $250-per-month late fee applies to late renewals and to rentals that were never registered.",
  },
  {
    question: "What is the Hochatown lodging tax rate?",
    answer:
      "4%, effective May 1, 2023, on lodging inside town limits. With state and county sales tax, the Town's sales tax, and the 3% county lodging tax, the Town's own breakdown puts the total tax on a stay at 16.25% inside Hochatown, against 9.25% in unincorporated McCurtain County.",
  },
  {
    question: "Is the Hochatown lodging tax charged on cleaning and pet fees?",
    answer:
      "Yes. The Town's FAQ says the tax is calculated on the total gross amount charged to the guest, including all associated fees such as cleaning and pet fees. Management and cleaning costs are not deducted.",
  },
  {
    question: "Does Airbnb collect the Hochatown lodging tax for me?",
    answer:
      "Do not assume it does. The Town's FAQ says it has not received lodging tax payments from Airbnb, VRBO, or similar platforms and that paying it remains the cabin owner's responsibility. The Town has also sued Airbnb over how taxes on some Hochatown rentals were allocated; see our explainer on that case.",
  },
  {
    question: "How often do I file Hochatown lodging tax?",
    answer:
      "Monthly. Returns are due no later than the 15th of the month after the reporting period, through the Granicus forms on the Town's STR page or on a paper return payable to the Town.",
  },
  {
    question: "Does Hochatown have quiet hours or an occupancy limit for rentals?",
    answer:
      "We did not find either in the Town's STR ordinance. General nuisance and noise rules in the Town Code still apply, and your house rules and platform rules usually go further.",
  },
  {
    question: "What happens if a neighbor complains about my rental?",
    answer: `The Town runs a 24-hour hotline (${HOCHATOWN_STR_HOTLINE}). Your emergency contact must reach you within the hour and you must start fixing the problem immediately. Three or more instances of non-compliance in 12 months can cost the license, with 10 days to appeal to the Board of Trustees.`,
  },
  {
    question: "Do I need to tell the Town if I change property managers?",
    answer:
      "Yes. The Town's Change of Cabin Management Company form updates the manager on your STR license. It needs your license number, costs nothing, and the Town emails an updated certificate.",
  },
  {
    question: "When did Hochatown incorporate?",
    answer:
      "In November 2022. Voters approved incorporation on November 8, 2022, and McCurtain County commissioners formally incorporated the town on November 28, 2022.",
  },
];
