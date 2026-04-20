import { randomBytes } from "crypto";
import type { AuditReport, MarketSnapshot } from "./types";
import { getRedis } from "./redis";

const REPORT_TTL = 60 * 60 * 24 * 90; // 90 days
const SNAPSHOT_TTL = 60 * 60 * 24 * 30; // 30 days

export function newId(): string {
  return randomBytes(9).toString("base64url");
}

export async function saveReport(report: AuditReport): Promise<void> {
  const redis = getRedis();
  await redis.set(`audit:report:${report.id}`, report, { ex: REPORT_TTL });
}

export async function getReport(id: string): Promise<AuditReport | null> {
  const redis = getRedis();
  return await redis.get<AuditReport>(`audit:report:${id}`);
}

export async function saveSnapshot(snapshot: MarketSnapshot): Promise<void> {
  const redis = getRedis();
  await redis.set(`audit:snapshot:${snapshot.id}`, snapshot, { ex: SNAPSHOT_TTL });
}

export async function getSnapshot(id: string): Promise<MarketSnapshot | null> {
  const redis = getRedis();
  return await redis.get<MarketSnapshot>(`audit:snapshot:${id}`);
}
