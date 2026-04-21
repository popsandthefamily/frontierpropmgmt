import { randomBytes } from "crypto";
import type { AuditReport } from "./types";
import { getRedis } from "./redis";

const REPORT_TTL = 60 * 60 * 24 * 90; // 90 days

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
