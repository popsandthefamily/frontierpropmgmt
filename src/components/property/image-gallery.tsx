"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryImage {
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  propertyName: string;
  className?: string;
}

export function ImageGallery({
  images,
  propertyName,
  className,
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  function openLightbox(index: number) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function goToPrevious() {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function goToNext() {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hero Image */}
      <button
        type="button"
        onClick={() => openLightbox(0)}
        className="relative block aspect-[16/9] w-full overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 1200px) 100vw, 1200px"
          priority
        />
      </button>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => openLightbox(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sage",
                i === activeIndex && !lightboxOpen && "ring-2 ring-sage"
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-opacity hover:opacity-80"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl border-0 bg-black/95 p-0 sm:max-w-[90vw]">
          <DialogTitle className="sr-only">
            {propertyName} - Image {activeIndex + 1} of {images.length}
          </DialogTitle>

          <div className="relative flex aspect-[16/10] items-center justify-center">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="size-8" />
                </Button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {activeIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
