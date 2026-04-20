/**
 * Self-manage / Vacasa / Evolve / Frontier comparison table data.
 *
 * Competitor figures are drawn from publicly available sources and are
 * updated when we re-verify. Each row can cite one or more sources so the
 * claim is checkable. When a competitor changes pricing, update the value
 * AND bump verifiedOn.
 *
 * Deliberately no em-dashes in the copy here — matches the site-wide
 * cleanup pass.
 */

export interface ComparisonRow {
  label: string;
  selfManage: string;
  vacasa: string;
  evolve: string;
  frontier: string;
  /** Optional source links, rendered as superscript numbers under the row. */
  sources?: { label: string; url: string }[];
}

export const COMPARISON_FOOTNOTE =
  "Competitor figures reflect publicly available pricing information and common industry ranges. Actual terms negotiated with individual owners may vary. Verified April 2026.";

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Management fee",
    selfManage: "0% (plus your time)",
    vacasa: "25–35% of gross",
    evolve: "10% + marketing fees",
    frontier: "20% of gross, no markups",
    sources: [
      {
        label: "Vacasa pricing overview",
        url: "https://www.vacasa.com/homeowner-guides/vacation-rental-management-fees",
      },
      {
        label: "Evolve pricing page",
        url: "https://evolve.com/homeowners",
      },
    ],
  },
  {
    label: "Setup or onboarding fee",
    selfManage: "—",
    vacasa: "Reported $499–$1,500",
    evolve: "$0",
    frontier: "$750 one-time",
  },
  {
    label: "Monthly minimum",
    selfManage: "—",
    vacasa: "Varies",
    evolve: "—",
    frontier: "$0 (pay only when you earn)",
  },
  {
    label: "Contract length",
    selfManage: "—",
    vacasa: "12-month initial typical",
    evolve: "12-month initial typical",
    frontier: "Month-to-month, 30-day cancellation",
  },
  {
    label: "Team located in Broken Bow",
    selfManage: "—",
    vacasa: "No (regional + call center)",
    evolve: "No (Denver HQ, remote model)",
    frontier: "Yes",
  },
  {
    label: "Guest support",
    selfManage: "You, 24/7",
    vacasa: "Shared call center, 24/7",
    evolve: "Shared call center, 24/7",
    frontier: "Local team 9am–9pm, on-call after",
  },
  {
    label: "Dynamic pricing",
    selfManage: "Manual",
    vacasa: "Yes",
    evolve: "Yes",
    frontier: "Yes",
  },
  {
    label: "Cleaning coordination",
    selfManage: "You",
    vacasa: "Yes",
    evolve: "Partial (owner arranges)",
    frontier: "Yes, local cleaners",
  },
  {
    label: "Owner can use cabin freely",
    selfManage: "Yes",
    vacasa: "Yes with some booking windows",
    evolve: "Yes",
    frontier: "Yes",
  },
  {
    label: "Local maintenance response",
    selfManage: "You drive",
    vacasa: "Vendor dispatch",
    evolve: "Owner arranges",
    frontier: "Local team, 20-min average",
  },
];
