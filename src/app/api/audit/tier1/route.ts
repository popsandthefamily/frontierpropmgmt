import { NextRequest } from "next/server";
import { validateTurnstile } from "@/lib/audit/turnstile";
import { burstLimit } from "@/lib/audit/ratelimit";
import { checkDailyCap, incrementCaps } from "@/lib/audit/caps";
import {
  bathsFromBedrooms,
  getRevenueEstimate,
  guestsFromBedrooms,
} from "@/lib/audit/airroi";
import { newId, saveSnapshot } from "@/lib/audit/report-store";
import { json, getClientIp } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

interface Body {
  city?: string;
  bedrooms?: number | string;
  propertyType?: string;
  turnstileToken?: string;
  honeypot?: string;
  lat?: number;
  lng?: number;
}

export async function POST(req: NextRequest) {
  if (process.env.AUDIT_DISABLED === "true") {
    return json({ error: "Audit is temporarily paused for maintenance." }, 503);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }

  const ip = getClientIp(req);
  if (body.honeypot) return json({ ok: true, snapshot: null });

  const tsValid = await validateTurnstile(body.turnstileToken, ip);
  if (!tsValid) return json({ error: "Verification failed. Please refresh and try again." }, 400);

  const { success: burstOK } = await burstLimit().limit(ip);
  if (!burstOK) return json({ error: "Too many requests. Slow down a moment." }, 429);

  const city = (body.city || "").trim();
  const bedrooms = Number(body.bedrooms);
  const propertyType = (body.propertyType || "").trim();
  if (!city || !Number.isFinite(bedrooms) || !propertyType) {
    return json({ error: "City, bedrooms, and property type are required." }, 400);
  }

  if (!(await checkDailyCap(1))) {
    return json({ error: "Snapshot capacity reached for today. Try again tomorrow." }, 429);
  }

  try {
    const bedroomsClean = Math.max(0, Math.floor(bedrooms));
    const baths = bathsFromBedrooms(bedroomsClean);
    const guests = guestsFromBedrooms(bedroomsClean);

    const estimate = await getRevenueEstimate({
      address: city,
      bedrooms: bedroomsClean,
      baths,
      guests,
    });
    await incrementCaps(1);

    const p50 = Math.round(estimate.percentiles?.revenue?.p50 ?? estimate.revenue ?? 0);
    const p75 = Math.round(estimate.percentiles?.revenue?.p75 ?? 0);
    const occ = estimate.percentiles?.occupancy?.p50 ?? estimate.occupancy ?? 0;

    const id = newId();
    const snapshot = {
      id,
      createdAt: Date.now(),
      city,
      bedrooms: bedroomsClean,
      propertyType,
      marketMedian: p50,
      marketTopQuartile: p75,
      occupancyRate: occ,
      gapToTop: Math.max(0, p75 - p50),
    };
    await saveSnapshot(snapshot);

    return json({ ok: true, snapshot });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[audit/tier1] failed", msg);
    return json({ error: "Something went wrong pulling market data. Try again shortly." }, 500);
  }
}
