"use client";

import { useEffect } from "react";

/**
 * Marks the FAQ topic currently in view in both topic navs (the desktop
 * sidebar and the mobile chip row) with aria-current, and keeps the active
 * chip scrolled into view in the mobile row.
 *
 * Works on the server-rendered markup rather than re-rendering it, so the
 * FAQ content stays a server component. Renders nothing.
 */
export function FaqActiveSection({ ids }: { ids: string[] }) {
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-faq-nav] a[href^='#']"),
    );

    function setActive(id: string) {
      for (const link of links) {
        const active = link.getAttribute("href") === `#${id}`;
        if (active) {
          link.setAttribute("aria-current", "true");
          const row = link.closest<HTMLElement>("[data-faq-chips]");
          if (row) {
            // Horizontal only, so the page itself never jumps.
            const target = link.offsetLeft - row.clientWidth / 2 + link.clientWidth / 2;
            row.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
          }
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }

    // A section counts as current once its heading passes the band just
    // below the fixed header and sticky nav.
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size > 0) {
          const [first] = [...visible.entries()].sort((a, b) => a[1] - b[1]);
          setActive(first[0]);
        }
      },
      { rootMargin: "-150px 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return null;
}
