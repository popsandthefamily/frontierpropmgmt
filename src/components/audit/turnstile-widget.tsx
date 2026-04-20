"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useRef } from "react";

interface Props {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

export function TurnstileWidget({ onVerify, onExpire }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement>(null);

  if (!siteKey) {
    // In dev without a site key, auto-issue a placeholder token so forms still work.
    if (typeof window !== "undefined") {
      setTimeout(() => onVerify("dev-bypass"), 0);
    }
    return null;
  }

  return (
    <div ref={ref} className="flex justify-center">
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={() => {
          onExpire?.();
        }}
        options={{ theme: "light", size: "normal" }}
      />
    </div>
  );
}
