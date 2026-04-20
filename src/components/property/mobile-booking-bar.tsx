"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

interface MobileBookingBarProps {
  propertyName: string;
}

export function MobileBookingBar({ propertyName }: MobileBookingBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <a
          href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
          className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-sage text-sage transition-colors hover:bg-sage/10"
          aria-label={`Call to book ${propertyName}`}
        >
          <Phone className="size-5" />
        </a>
        <Button
          asChild
          size="lg"
          className="flex-1 bg-sage text-base font-semibold text-white hover:bg-sage-dark"
        >
          <Link href="/contact">Book Now</Link>
        </Button>
      </div>
      <p className="mt-1.5 text-center text-xs text-muted-foreground">
        Popular dates fill fast, book early
      </p>
    </div>
  );
}
