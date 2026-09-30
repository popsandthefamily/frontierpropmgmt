"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface MosaicImage {
  src: string;
  alt: string;
  caption?: string;
  room?: string;
}

interface PhotoMosaicProps {
  images: MosaicImage[];
  propertyName: string;
  /** How many photos the on-page grid shows; the tour shows them all. */
  previewCount?: number;
  /** Order of the rooms in the tour. Unlisted rooms follow, in order met. */
  roomOrder?: string[];
  className?: string;
}

type View = { mode: "closed" } | { mode: "tour" } | { mode: "photo"; index: number; fromTour: boolean };

/**
 * An editorial photo grid: one large frame and a set of smaller ones. "View
 * all" opens a photo tour grouped by room, and any photo opens a captioned
 * lightbox that steps through the whole set. The grid images are in the
 * server HTML with their alt text; only the dialogs need JavaScript.
 */
export function PhotoMosaic({
  images,
  propertyName,
  previewCount = 8,
  roomOrder = [],
  className,
}: PhotoMosaicProps) {
  const [view, setView] = useState<View>({ mode: "closed" });
  const touchStartX = useRef<number | null>(null);

  // The tour's order is also the lightbox's order, so arrowing through
  // photos walks room by room.
  const groups = useMemo(() => {
    const byRoom = new Map<string, MosaicImage[]>();
    for (const image of images) {
      const room = image.room ?? "More photos";
      byRoom.set(room, [...(byRoom.get(room) ?? []), image]);
    }
    const rooms = [
      ...roomOrder.filter((r) => byRoom.has(r)),
      ...[...byRoom.keys()].filter((r) => !roomOrder.includes(r)),
    ];
    return rooms.map((room) => ({ room, images: byRoom.get(room)! }));
  }, [images, roomOrder]);
  const ordered = useMemo(() => groups.flatMap((g) => g.images), [groups]);

  if (images.length === 0) return null;

  const preview = images.slice(0, previewCount);
  const lastIndex = preview.length - 1;

  function openPhoto(src: string, fromTour: boolean) {
    setView({ mode: "photo", index: ordered.findIndex((img) => img.src === src), fromTour });
  }

  function step(delta: number) {
    setView((v) =>
      v.mode === "photo"
        ? { ...v, index: (v.index + delta + ordered.length) % ordered.length }
        : v,
    );
  }

  const active = view.mode === "photo" ? ordered[view.index] : null;
  const slug = (room: string) => `tour-${room.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-2 md:grid-cols-4 md:auto-rows-[11rem] md:gap-3 lg:auto-rows-[13rem]">
        {preview.map((image, i) => (
          <li
            key={image.src}
            className={cn(
              "relative",
              // The first frame leads: full width on a phone, a 2x2 block on
              // desktop. Everything else fills in around it.
              i === 0
                ? "col-span-2 aspect-[3/2] md:row-span-2 md:aspect-auto"
                : "aspect-[4/3] md:aspect-auto",
              // Widen the last frame when it would otherwise leave a hole at
              // the end of the grid.
              i === lastIndex && i > 0 && lastIndex % 2 === 1 && "col-span-2 aspect-[3/2]",
              i === lastIndex && i > 0 && (preview.length + 3) % 4 === 3 && "md:col-span-2",
              i === lastIndex && i > 0 && (preview.length + 3) % 4 !== 3 && "md:col-span-1",
            )}
          >
            <button
              type="button"
              onClick={() => openPhoto(image.src, false)}
              className="group relative block size-full overflow-hidden rounded-md bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
              aria-label={`Open photo: ${image.caption ?? image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
              {image.caption && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-left text-xs font-medium text-white transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  {image.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setView({ mode: "tour" })}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-cream"
      >
        <Expand className="size-4" />
        View all {images.length} photos, room by room
      </button>

      <Dialog
        open={view.mode !== "closed"}
        onOpenChange={(open) => !open && setView({ mode: "closed" })}
      >
        {view.mode === "tour" && (
          <DialogContent className="flex h-[92vh] max-w-6xl flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(72rem,94vw)]">
            <div className="border-b border-border px-5 pb-3 pt-5 md:px-8">
              <DialogTitle className="text-2xl font-bold text-charcoal md:text-3xl">
                Photos of {propertyName}
              </DialogTitle>
              <nav aria-label="Rooms" className="-mx-1 mt-3 flex gap-2 overflow-x-auto pb-1">
                {groups.map((g) => (
                  <a
                    key={g.room}
                    href={`#${slug(g.room)}`}
                    className="shrink-0 rounded-full border border-border px-3.5 py-1.5 text-sm text-charcoal transition-colors hover:bg-cream"
                  >
                    {g.room} <span className="text-muted-foreground">{g.images.length}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
              {groups.map((g) => (
                <section key={g.room} id={slug(g.room)} className="scroll-mt-4 pb-10">
                  <h3 className="text-xl font-bold text-charcoal md:text-2xl">{g.room}</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {g.images.map((image) => (
                      <li key={image.src}>
                        <button
                          type="button"
                          onClick={() => openPhoto(image.src, true)}
                          className="group block w-full text-left focus:outline-none"
                        >
                          <span className="relative block aspect-[3/2] overflow-hidden rounded-md bg-cream ring-sage ring-offset-2 group-focus-visible:ring-2">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                              sizes="(max-width: 640px) 94vw, 36rem"
                            />
                          </span>
                          {image.caption && (
                            <span className="mt-1.5 block text-xs text-muted-foreground">
                              {image.caption}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </DialogContent>
        )}

        {view.mode === "photo" && active && (
          <DialogContent
            className="max-w-5xl border-0 bg-black/95 p-0 text-white sm:max-w-[92vw]"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") step(-1);
              if (e.key === "ArrowRight") step(1);
            }}
          >
            <DialogTitle className="sr-only">
              {propertyName}, photo {view.index + 1} of {ordered.length}
            </DialogTitle>

            <figure>
              <div
                className="relative aspect-[3/2] max-h-[78vh] w-full"
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1);
                  touchStartX.current = null;
                }}
              >
                <Image src={active.src} alt={active.alt} fill className="object-contain" sizes="92vw" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-8" />
                </Button>
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <span className="flex items-center gap-4">
                  {view.fromTour && (
                    <button
                      type="button"
                      onClick={() => setView({ mode: "tour" })}
                      className="inline-flex shrink-0 items-center gap-1.5 text-white/70 hover:text-white"
                    >
                      <ArrowLeft className="size-4" />
                      All photos
                    </button>
                  )}
                  <span className="text-white/85">
                    {active.room && <span className="text-white/50">{active.room} · </span>}
                    {active.caption ?? active.alt}
                  </span>
                </span>
                <span className="shrink-0 tabular-nums text-white/50" aria-live="polite">
                  {view.index + 1} / {ordered.length}
                </span>
              </figcaption>
            </figure>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
