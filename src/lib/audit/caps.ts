import { getRedis } from "./redis";

function today() {
  return new Date().toISOString().split("T")[0];
}
function month() {
  return new Date().toISOString().slice(0, 7);
}

function dailyKey(tier: 1 | 2) {
  return `audit:daily:${tier}:${today()}`;
}
function monthlyKey() {
  return `audit:monthly:${month()}`;
}

export async function checkDailyCap(tier: 1 | 2): Promise<boolean> {
  const redis = getRedis();
  const count = (await redis.get<number>(dailyKey(tier))) ?? 0;
  const cap =
    tier === 1
      ? parseInt(process.env.AUDIT_TIER1_DAILY_CAP || "200", 10)
      : parseInt(process.env.AUDIT_DAILY_CAP || "50", 10);
  return count < cap;
}

export async function checkMonthlyCap(): Promise<boolean> {
  const redis = getRedis();
  const count = (await redis.get<number>(monthlyKey())) ?? 0;
  const cap = parseInt(process.env.AUDIT_MONTHLY_CAP || "500", 10);
  return count < cap;
}

export async function incrementCaps(tier: 1 | 2) {
  const redis = getRedis();
  const ops: Promise<unknown>[] = [redis.incr(dailyKey(tier))];
  if (tier === 2) ops.push(redis.incr(monthlyKey()));
  await Promise.all(ops);
}

export async function decrementCaps(tier: 1 | 2) {
  const redis = getRedis();
  const ops: Promise<unknown>[] = [redis.decr(dailyKey(tier))];
  if (tier === 2) ops.push(redis.decr(monthlyKey()));
  await Promise.all(ops);
}

export async function getUsageStats() {
  const redis = getRedis();
  const [t1, t2, monthTotal] = await Promise.all([
    redis.get<number>(dailyKey(1)),
    redis.get<number>(dailyKey(2)),
    redis.get<number>(monthlyKey()),
  ]);
  return {
    tier1Today: t1 ?? 0,
    tier2Today: t2 ?? 0,
    tier2Month: monthTotal ?? 0,
    dailyCap: parseInt(process.env.AUDIT_DAILY_CAP || "50", 10),
    monthlyCap: parseInt(process.env.AUDIT_MONTHLY_CAP || "500", 10),
    tier1DailyCap: parseInt(process.env.AUDIT_TIER1_DAILY_CAP || "200", 10),
  };
}
