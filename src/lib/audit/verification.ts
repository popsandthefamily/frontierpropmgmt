import { randomInt } from "crypto";
import { getRedis } from "./redis";

export interface PendingVerification {
  code: string;
  listingId: string;
  listingUrl: string;
  ip: string;
  createdAt: number;
}

const VERIFY_TTL = 60 * 15; // 15 min

export function generateCode(): string {
  return String(randomInt(100000, 1000000));
}

function key(email: string) {
  return `audit:verify:${email.toLowerCase().trim()}`;
}

export async function storePendingVerification(
  email: string,
  data: Omit<PendingVerification, "createdAt">,
): Promise<void> {
  const redis = getRedis();
  await redis.set(
    key(email),
    { ...data, createdAt: Date.now() } satisfies PendingVerification,
    { ex: VERIFY_TTL },
  );
}

export async function getPendingVerification(
  email: string,
): Promise<PendingVerification | null> {
  const redis = getRedis();
  return await redis.get<PendingVerification>(key(email));
}

export async function clearPendingVerification(email: string): Promise<void> {
  const redis = getRedis();
  await redis.del(key(email));
}
