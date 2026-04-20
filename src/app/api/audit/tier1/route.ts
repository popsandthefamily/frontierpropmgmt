import { NextRequest } from "next/server";
import { validateTurnstile } from "@/lib/audit/turnstile";
import { burstLimit } from "@/lib/audit/ratelimit";
import { checkDailyCap, incrementCaps } from "@/lib/audit/caps";
import { searchMarkets, getMarketSummary, lookupMarket } from "@/lib/audit/airroi";
import { newId, saveSnapshot } from "@/lib/audit/report-store";
import { json, getClientIp } from "@/lib/audit/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  city?: string;
  bedrooms?: number | string;
  propertyType?: string;
  turnstileToken?: string;
  honeypot?: string;
  // Optional: client can send lat/lng from autocomplete to skip the search call
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

  if (body.honeypot) return json({ ok: true, snapshotId: "honey" });

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
    let marketId: string | undefined;
    let marketName: string | undefined;

    if (Number.isFinite(body.lat) && Number.isFinite(body.lng)) {
      const m = await lookupMarket(body.lat as number, body.lng as number);
      marketId = m.market_id;
      marketName = m.name;
    } else {
      const search = await searchMarkets(city);
      const match = search.results?.[0];
      if (!match) return json({ error: "We couldn't find that market. Try a different city or ZIP." }, 404);
      marketId = match.market_id;
      marketName = match.name;
    }

    const summary = await getMarketSummary(marketId!);
    await incrementCaps(1);

    const id = newId();
    const snapshot = {
      id,
      createdAt: Date.now(),
      city: marketName || city,
      bedrooms,
      propertyType,
      marketMedian: Math.round(summary.revenue_p50 ?? 0),
      marketTopQuartile: Math.round(summary.revenue_p75 ?? 0),
      occupancyRate: summary.occupancy_p50 ?? 0,
      gapToTop: Math.max(0, Math.round((summary.revenue_p75 ?? 0) - (summary.revenue_p50 ?? 0))),
    };
    await saveSnapshot(snapshot);

    return json({ ok: true, snapshot });
  } catch (err) {
    console.error("[audit/tier1] failed", err);
    return json({ error: "Something went wrong pulling market data. Try again shortly." }, 500);
  }
}
