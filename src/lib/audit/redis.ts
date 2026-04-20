import { Redis } from "@upstash/redis";

let cachedRedis: Redis | null = null;

/**
 * Accept whichever env-var naming convention the host injected:
 * - Vercel Marketplace "Upstash for Redis" integration: UPSTASHSTORAGE_KV_REST_API_URL / _TOKEN
 * - Direct Upstash connection:                         UPSTASH_REDIS_REST_URL / _TOKEN
 * - Legacy @vercel/kv:                                  KV_REST_API_URL / _TOKEN
 */
export function getRedis(): Redis {
  if (cachedRedis) return cachedRedis;
  const url =
    process.env.UPSTASHSTORAGE_KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASHSTORAGE_KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    throw new Error(
      "Redis is not configured. Connect a Redis store to this Vercel project (Storage → Marketplace → Upstash for Redis).",
    );
  }
  cachedRedis = new Redis({ url, token });
  return cachedRedis;
}
