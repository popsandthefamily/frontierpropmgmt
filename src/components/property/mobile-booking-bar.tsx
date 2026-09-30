"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface MobileBookingBarProps {
  propertyName: string;
  /** Id of the section holding the booking calendar. */
  bookId?: string;
  /** Id of the hero, which carries its own "Check dates" button. */
  heroId?: string;
}

/**
 * The way back to the calendar from anywhere on a long property page: a
 * bottom bar on phones, a floating button on desktop. It steps aside while
 * the hero or the calendar itself is on screen, so it never covers the
 * thing it points to.
 */
export function MobileBookingBar({
  propertyName,
  bookId = "book",
  heroId,
}: MobileBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [bookId, heroId]
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) {
      setVisible(true);
      return;
    }

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [bookId, heroId]);

  return (
    <>
      {/* Phones: a full-width bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 border-t bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 lg:hidden",
          visible ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
        aria-hidden={!visible}
        data-booking-bar={visible ? "visible" : "hidden"}
      >
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/-/g, "")}`}
            className="flex size-12 shrink-0 items-center justify-center rounded-lg border-2 border-sage text-sage transition-colors hover:bg-sage/10"
            aria-label={`Call to book ${propertyName}`}
            tabIndex={visible ? undefined : -1}
          >
            <Phone className="size-5" />
          </a>
          <a
            href={`#${bookId}`}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-sage text-base font-semibold text-white transition-colors hover:bg-sage-dark"
            tabIndex={visible ? undefined : -1}
          >
            <CalendarDays className="size-5" />
            Check dates
          </a>
        </div>
      </div>

      {/* Desktop: a floating button */}
      <a
        href={`#${bookId}`}
        className={cn(
          "fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2.5 rounded-full bg-white py-3 pl-5 pr-6 text-sm font-semibold text-forest shadow-lg ring-1 ring-black/10 transition-all duration-300 hover:bg-cream lg:inline-flex",
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
        aria-hidden={!visible}
        tabIndex={visible ? undefined : -1}
      >
        <CalendarDays className="size-4" />
        Check dates at {propertyName}
      </a>
    </>
  );
}
