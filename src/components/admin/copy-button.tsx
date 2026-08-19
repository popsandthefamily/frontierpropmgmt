"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  text,
  label = "Copy for Facebook",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <Button
      type="button"
      size="sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          // Clipboard access can be blocked; the textarea below is the fallback.
        }
      }}
      className={
        copied
          ? "bg-sage text-white hover:bg-sage"
          : "bg-charcoal text-white hover:bg-charcoal/90"
      }
    >
      {copied ? (
        <>
          <Check className="mr-2 size-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="mr-2 size-4" />
          {label}
        </>
      )}
    </Button>
  );
}
