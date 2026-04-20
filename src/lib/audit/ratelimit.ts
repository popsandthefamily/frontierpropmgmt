import { Ratelimit } from "@upstash/ratelimit";
import { createHash } from "crypto";
import { getRedis } from "./redis";

let burst: Ratelimit | null = null;
let codeAttempt: Ratelimit | null = null;

export function burstLimit(): Ratelimit {
  if (!burst) {
    burst = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "audit:burst",
    });
  }
  return burst;
}

export function codeAttemptLimit(): Ratelimit {
  if (!codeAttempt) {
    codeAttempt = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.fixedWindow(3, "15 m"),
      prefix: "audit:code",
    });
  }
  return codeAttempt;
}

export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

const NINETY_DAYS = 60 * 60 * 24 * 90;
const IN_FLIGHT_TTL = 60 * 10; // 10 min

function emailKey(email: string) {
  return `audit:used:email:${email.toLowerCase().trim()}`;
}
function ipKey(ip: string) {
  return `audit:used:ip:${hashIP(ip)}`;
}

export async function checkEmailUsed(email: string): Promise<string | null> {
  const redis = getRedis();
  return await redis.get<string>(emailKey(email));
}

export async function checkIPUsed(ip: string): Promise<string | null> {
  const redis = getRedis();
  return await redis.get<string>(ipKey(ip));
}

export async function markInFlight(ip: string, email: string) {
  const redis = getRedis();
  await Promise.all([
    redis.set(emailKey(email), "in-flight", { ex: IN_FLIGHT_TTL }),
    redis.set(ipKey(ip), "in-flight", { ex: IN_FLIGHT_TTL }),
  ]);
}

export async function markCompleted(ip: string, email: string, reportId: string) {
  const redis = getRedis();
  await Promise.all([
    redis.set(emailKey(email), reportId, { ex: NINETY_DAYS }),
    redis.set(ipKey(ip), reportId, { ex: NINETY_DAYS }),
  ]);
}

export async function refundSlot(ip: string, email: string) {
  const redis = getRedis();
  await Promise.all([redis.del(emailKey(email)), redis.del(ipKey(ip))]);
}
