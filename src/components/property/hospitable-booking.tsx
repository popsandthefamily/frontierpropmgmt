"use client";

import { useEffect, useId, useRef } from "react";

const WIDGET_LOADER_SRC =
  "https://cdn.hsptb.com/direct-booking-widget/widget-loader.prod.js";
const SITE_UUID = "9f3d8a61-1242-4f44-bcfe-eb8989fc9fcd";

interface HospitableBookingProps {
  propertyId: string;
  /** Hospitable widget theme configured in Direct Bookings. */
  theme?: string;
  /** Initial iframe height, the widget reports its own height after load. */
  height?: string;
}

export function HospitableBooking({
  propertyId,
  theme = "cabin",
  height = "520px",
}: HospitableBookingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Stable id so the loader knows where to mount the booking iframe.
  const containerId = `hospitable-booking-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // The loader reads checkin/checkout/adults/... off window.location.search
    // itself, so search-widget handoffs prefill without any help from us.
    const script = document.createElement("script");
    script.src = WIDGET_LOADER_SRC;
    script.async = true;
    script.dataset.siteUuid = SITE_UUID;
    script.dataset.propertyId = propertyId;
    script.dataset.theme = theme;
    script.dataset.height = height;
    script.dataset.container = containerId;
    container.appendChild(script);

    return () => {
      script.remove();
      container.querySelector("#booking-iframe")?.remove();
    };
  }, [propertyId, theme, height, containerId]);

  return (
    <div
      id={containerId}
      ref={containerRef}
      className="w-full overflow-hidden rounded-md"
      style={{ minHeight: height }}
    />
  );
}
