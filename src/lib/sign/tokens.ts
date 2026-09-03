import { createHash, randomBytes, timingSafeEqual } from "crypto";

/**
 * Signing links.
 *
 * For a signer with no account, the link in their email is the whole
 * credential, so it is treated like a password rather than an id: 256 bits of
 * randomness, stored only as a SHA-256 hash, and compared in constant time.
 * A copy of the database yields no usable links.
 *
 * A plain hash is the right primitive here, unlike for a password: the token is
 * already high-entropy, so there is nothing to brute force and no salt needed.
 */

const TOKEN_BYTES = 32;
const DEFAULT_TTL_DAYS = 30;

export function newSigningToken(): { token: string; hash: string; expiresAt: string } {
  const token = randomBytes(TOKEN_BYTES).toString("base64url");
  return {
    token,
    hash: hashToken(token),
    expiresAt: new Date(Date.now() + DEFAULT_TTL_DAYS * 86_400_000).toISOString(),
  };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Constant-time comparison, so a wrong token reveals nothing by timing. */
export function tokensMatch(candidateHash: string, storedHash: string): boolean {
  const a = Buffer.from(candidateHash, "hex");
  const b = Buffer.from(storedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function signingUrl(origin: string, token: string): string {
  return `${origin}/sign/${token}`;
}
