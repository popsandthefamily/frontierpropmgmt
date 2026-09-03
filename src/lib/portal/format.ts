/** Money and dates, formatted one way across the portal. */

export function money(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function moneyExact(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/** "2026-08-01" -> "August 2026", without tripping over the timezone. */
export function monthLabel(periodStart: string): string {
  const [year, month] = periodStart.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function occupancy(
  booked: number | null | undefined,
  available: number | null | undefined,
): string {
  if (!booked || !available) return "—";
  return `${Math.round((booked / available) * 100)}%`;
}
