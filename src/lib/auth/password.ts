/**
 * Password rules, following NIST SP 800-63B.
 *
 * The guidance is mostly about what *not* to do: no composition rules, no
 * forced rotation, no silly maximum, no blocking paste. Length and a check
 * against known-breached passwords are what actually help, so those are the
 * two things enforced here.
 */

export const MIN_LENGTH = 12;
export const MAX_LENGTH = 128;

export interface PasswordVerdict {
  ok: boolean;
  problems: string[];
}

export function checkPasswordShape(password: string, context: string[] = []): PasswordVerdict {
  const problems: string[] = [];

  if (password.length < MIN_LENGTH) {
    problems.push(`Use at least ${MIN_LENGTH} characters. A short phrase you'll remember beats a short jumble.`);
  }
  if (password.length > MAX_LENGTH) {
    problems.push(`Keep it under ${MAX_LENGTH} characters.`);
  }
  // Context-specific words: an email address or company name is the first thing
  // an attacker tries, and NIST calls these out directly.
  const lowered = password.toLowerCase();
  for (const word of context) {
    const w = word.toLowerCase().trim();
    if (w.length >= 4 && lowered.includes(w)) {
      problems.push(`Avoid using "${word}" in your password — it's easy to guess from your account.`);
      break;
    }
  }
  if (/^(.)\1+$/.test(password)) {
    problems.push("Avoid a single repeated character.");
  }

  return { ok: problems.length === 0, problems };
}

/**
 * Has this password appeared in a known breach?
 *
 * Uses HaveIBeenPwned's range API with k-anonymity: only the first five
 * characters of the SHA-1 hash are ever sent, and the response is a list of
 * suffixes to match locally. The password itself never leaves the browser.
 *
 * Returns null when the service can't be reached — a breach check that fails
 * closed would lock people out of setting any password at all, which is worse
 * than the risk it guards against.
 */
export async function timesBreached(password: string): Promise<number | null> {
  try {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-1", bytes);
    const hash = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: { "Add-Padding": "true" },
    });
    if (!res.ok) return null;

    for (const line of (await res.text()).split("\n")) {
      const [candidate, count] = line.trim().split(":");
      if (candidate === suffix) return Number(count) || 0;
    }
    return 0;
  } catch {
    return null;
  }
}
