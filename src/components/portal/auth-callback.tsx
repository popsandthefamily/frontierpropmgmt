"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase/client";

/**
 * Completes a sign-in that arrives in the URL fragment.
 *
 * Supabase's default magic-link email sends the owner through
 * /auth/v1/verify, which redirects here with the session in the fragment
 * (#access_token=...). A fragment is never transmitted to the server, so this
 * has to run in the browser: read the tokens, hand them to the client (which
 * stores them as cookies the server can then read), and clear them out of the
 * address bar.
 *
 * The PKCE `?code=` shape is handled too, for the case where the link is opened
 * in the same browser that requested it.
 *
 * Once custom SMTP is configured, the email template points at
 * /portal/auth/confirm instead and this path stops being used, but it stays as
 * the fallback so a template change can never lock every owner out.
 */
export function AuthCallback() {
  const params = useSearchParams();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    const next = params.get("next") ?? "/portal";
    const target = next.startsWith("/") ? next : "/portal";

    async function complete() {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");
      const code = params.get("code");

      let ok = false;
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        ok = !error;
      } else if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        ok = !error;
      } else {
        // Neither shape is in the URL, which usually means the Supabase client
        // already consumed the fragment itself: detectSessionInUrl parses and
        // strips it on construction, so by the time this effect runs there is
        // nothing left to read. That is a success, not a failure. Give it a
        // moment to finish and then look for the session it created.
        for (let attempt = 0; attempt < 10 && !ok; attempt += 1) {
          const { data } = await supabase.auth.getSession();
          ok = Boolean(data.session);
          if (!ok) await new Promise((r) => setTimeout(r, 150));
        }
      }

      if (!ok) {
        setFailed(true);
        return;
      }

      // A full navigation rather than router.replace(): the session was just
      // written to cookies, and only a fresh request makes the server pick them
      // up. It also sidesteps the App Router ignoring a replace() that follows
      // the history rewrite Supabase performs when it strips the fragment.
      window.location.replace(target);
    }

    void complete();
  }, [params]);

  if (failed) {
    return (
      <div className="mx-auto mt-24 max-w-md text-center">
        <h1 className="font-heading text-2xl font-semibold text-charcoal">
          That link didn&apos;t work
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Sign-in links expire after an hour and can only be used once. Request a
          fresh one and it&apos;ll work.
        </p>
        <Link
          href="/portal/login"
          className="mt-6 inline-block font-medium text-charcoal underline underline-offset-4"
        >
          Send me a new link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-24 max-w-md text-center">
      <p className="text-base text-muted-foreground">Signing you in…</p>
    </div>
  );
}
