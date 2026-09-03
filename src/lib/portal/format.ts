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

/**
 * A timestamp in Frontier's own timezone.
 *
 * These render on the server, and the server runs in UTC, so an unqualified
 * toLocaleString showed an agreement signed at 11:43 Central as 16:43. Every
 * human reading these — owners, Hunter, anyone checking a signature — is on
 * Central, so that is what they get, with the zone named so it is never
 * ambiguous.
 */
export const TIME_ZONE = "America/Chicago";

export function centralTime(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  // Explicit fields rather than dateStyle/timeStyle: Intl rejects those
  // combined with timeZoneName, and the zone abbreviation is the whole point.
  return d.toLocaleString("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/** Central time with the UTC instant alongside, for the signing record. */
export function centralWithUtc(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return `${centralTime(d)} (${d.toISOString().replace("T", " ").slice(0, 19)} UTC)`;
}
