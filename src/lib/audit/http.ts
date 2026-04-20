import { NextResponse } from "next/server";

export function json<T>(body: T, init?: number | ResponseInit): NextResponse {
  const responseInit: ResponseInit = typeof init === "number" ? { status: init } : init ?? {};
  return NextResponse.json(body, responseInit);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
