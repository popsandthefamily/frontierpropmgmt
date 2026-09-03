"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders every page of a PDF and gives each page an overlay layer.
 *
 * Both the field editor and the signing screen sit on top of this, so the boxes
 * an admin places and the boxes an owner fills are positioned by the exact same
 * geometry. Overlay coordinates are fractions of the page rather than pixels,
 * which is what lets a field placed on a desktop land in the same spot on a
 * phone and convert cleanly into PDF points when the signature is burned in.
 */
export interface PageBox {
  pageNumber: number;
  width: number;
  height: number;
}

interface Props {
  url: string;
  /** Rendered for each page, positioned over it. */
  overlay?: (page: PageBox) => React.ReactNode;
  onPagesReady?: (pages: PageBox[]) => void;
  maxWidth?: number;
}

export function PdfView({ url, overlay, onPagesReady, maxWidth = 900 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<PageBox[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const canvases: HTMLCanvasElement[] = [];

    async function render() {
      try {
        const pdfjs = await import("pdfjs-dist");
        // The worker is vendored into /public rather than resolved through the
        // bundler, which keeps this working the same in dev and in production.
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const doc = await pdfjs.getDocument({ url }).promise;
        if (cancelled) return;

        const next: PageBox[] = [];
        for (let n = 1; n <= doc.numPages; n += 1) {
          const page = await doc.getPage(n);
          if (cancelled) return;

          const base = page.getViewport({ scale: 1 });
          const scale = Math.min(maxWidth / base.width, 2);
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          // Render at device resolution so the text stays crisp, but lay the
          // canvas out at CSS size so overlay maths stays in CSS pixels.
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.style.display = "block";
          ctx.scale(dpr, dpr);

          await page.render({ canvas, canvasContext: ctx, viewport }).promise;
          if (cancelled) return;

          canvases[n - 1] = canvas;
          next.push({ pageNumber: n, width: viewport.width, height: viewport.height });
        }

        if (cancelled) return;
        setPages(next);
        onPagesReady?.(next);

        // Drop the canvases into their slots once React has rendered them.
        requestAnimationFrame(() => {
          for (const box of next) {
            const slot = containerRef.current?.querySelector(
              `[data-page-canvas="${box.pageNumber}"]`,
            );
            const canvas = canvases[box.pageNumber - 1];
            if (slot && canvas && !slot.contains(canvas)) {
              slot.innerHTML = "";
              slot.appendChild(canvas);
            }
          }
        });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not open this PDF.");
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [url, maxWidth, onPagesReady]);

  if (error) {
    return (
      <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </p>
    );
  }

  return (
    <div ref={containerRef} className="space-y-6">
      {pages.length === 0 && (
        <p className="text-sm text-muted-foreground">Loading document…</p>
      )}
      {pages.map((page) => (
        <div
          key={page.pageNumber}
          className="relative mx-auto border border-border shadow-sm"
          style={{ width: page.width, height: page.height }}
        >
          <div data-page-canvas={page.pageNumber} />
          <div className="absolute inset-0">{overlay?.(page)}</div>
        </div>
      ))}
    </div>
  );
}
