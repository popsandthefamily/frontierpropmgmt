"use client";

import { useState } from "react";
import Image from "next/image";

export function CabinTour() {
  const [open, setOpen] = useState(false);
  return (
    <section id="cabin-tour" className="bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Get to know Sublime</p>
            <h2 className="mt-3 text-4xl font-bold text-charcoal md:text-5xl">Explore the cabin</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">See how the king suites, open living spaces, upstairs loft, and covered deck fit together before your stay.</p>
          </div>
          <a href="/tours/sublime/index.html" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Open full-screen guide <span className="sr-only">in a new tab</span></a>
        </div>
        {open ? (
          <div>
            <iframe src="/tours/sublime/index.html" title="Interactive illustrative layout of Sublime Retreat" className="h-[min(800px,85svh)] min-h-[620px] w-full rounded-2xl border border-border" allow="fullscreen" />
            <button onClick={() => setOpen(false)} className="mt-4 underline underline-offset-4">Close interactive guide</button>
          </div>
        ) : (
          <button onClick={() => setOpen(true)} className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-[#303b40] text-left" aria-label="Start the interactive cabin guide">
            <Image src="/tours/sublime/preview.png" alt="Illustrative cutaway showing Sublime’s rooms and deck" width={1500} height={1200} className="max-h-[540px] w-full object-contain transition-transform group-hover:scale-[1.02]" />
            <span className="absolute bottom-6 left-6 rounded-full bg-white px-6 py-3 font-semibold text-charcoal shadow-lg">Start exploring →</span>
          </button>
        )}
        <p className="mt-4 text-sm text-muted-foreground">Illustrative layout, not to scale. See the photos for actual finishes and furnishings.</p>
      </div>
    </section>
  );
}
