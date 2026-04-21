import { NextResponse } from "next/server";
import { getDefaultMarketSnapshot } from "@/lib/audit/default-snapshot";

export const runtime = "nodejs";
// No caching on this route itself — the underlying helper uses Redis with a
// 24h TTL, and we want the revalidation logic to live in one place.
export const dynamic = "force-dynamic";

/**
 * Client-side entry point for the default Hochatown / Broken Bow market
 * snapshot shown in the <HeroSnapshot> card.
 *
 * Called lazily when the component scrolls into view, so page loads for
 * visitors who never see the calculator cost nothing.
 */
export async function GET() {
  const snapshot = await getDefaultMarketSnapshot();
  if (!snapshot) {
    return NextResponse.json(
      { ok: false, error: "Market data unavailable" },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, snapshot });
}
