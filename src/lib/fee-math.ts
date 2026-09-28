/**
 * The arithmetic behind the management fee calculator.
 *
 * Kept pure and separate from the component so the server-rendered worked
 * example on /management-fee-calculator and the interactive calculator can
 * never disagree.
 *
 * Definitions, in the owner's terms:
 *   rent          what guests pay for the nights, before cleaning and pet
 *                 fees and before taxes (taxes are collected on top and
 *                 remitted, so they are never revenue)
 *   guestFees     cleaning and pet fees collected from guests
 *   hostFeeRate   the share the platform withholds from the host
 *
 * Frontier charges its rate on net rental revenue: rent after the platform
 * host fee. Guest fees never enter the base. Another manager's base depends
 * on what they charge on, which is exactly the thing to ask them.
 */

export type OtherBase = "grossWithFees" | "grossRent" | "netRent";

export const OTHER_BASE_LABELS: Record<OtherBase, string> = {
  grossWithFees: "Gross booking revenue, including cleaning and pet fees",
  grossRent: "Gross rent, excluding cleaning and pet fees",
  netRent: "Net rent, after platform host fees",
};

export interface FeeInputs {
  rent: number;
  guestFees: number;
  /** 0 to 1 */
  hostFeeRate: number;
  /** 0 to 1 */
  otherRate: number;
  otherBase: OtherBase;
  /** 0 to 1. Frontier's rate. */
  frontierRate: number;
}

export interface FeeResult {
  grossBooking: number;
  frontierBase: number;
  frontierFee: number;
  otherBaseAmount: number;
  otherFee: number;
  /** Positive when the other manager costs more. */
  difference: number;
  /** Each fee as a share of gross booking revenue (rent + guest fees). */
  frontierEffectiveRate: number;
  otherEffectiveRate: number;
}

const clamp = (n: number, lo: number, hi: number) =>
  Number.isFinite(n) ? Math.min(Math.max(n, lo), hi) : lo;

export function computeFees(input: FeeInputs): FeeResult {
  const rent = clamp(input.rent, 0, 1e9);
  const guestFees = clamp(input.guestFees, 0, 1e9);
  const hostFeeRate = clamp(input.hostFeeRate, 0, 1);
  const otherRate = clamp(input.otherRate, 0, 1);
  const frontierRate = clamp(input.frontierRate, 0, 1);

  const grossBooking = rent + guestFees;
  const netRent = rent * (1 - hostFeeRate);

  const frontierBase = netRent;
  const frontierFee = frontierBase * frontierRate;

  const otherBaseAmount =
    input.otherBase === "grossWithFees"
      ? grossBooking
      : input.otherBase === "grossRent"
        ? rent
        : netRent;
  const otherFee = otherBaseAmount * otherRate;

  return {
    grossBooking,
    frontierBase,
    frontierFee,
    otherBaseAmount,
    otherFee,
    difference: otherFee - frontierFee,
    frontierEffectiveRate: grossBooking > 0 ? frontierFee / grossBooking : 0,
    otherEffectiveRate: grossBooking > 0 ? otherFee / grossBooking : 0,
  };
}

/** The example shown in the page text and used as calculator defaults. */
export const EXAMPLE_INPUTS: FeeInputs = {
  rent: 50_000,
  guestFees: 8_000,
  hostFeeRate: 0.15,
  otherRate: 0.2,
  otherBase: "grossWithFees",
  frontierRate: 0.2,
};

export const usd = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;
export const pctLabel = (n: number, digits = 1) =>
  `${(n * 100).toFixed(digits).replace(/\.0$/, "")}%`;
