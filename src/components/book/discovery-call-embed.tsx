"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { track } from "@/lib/analytics";

interface Props {
  /**
   * Cal.com link in the form "<username>" or "<username>/<event-slug>".
   * Defaults to the rentwithfrontier Cal.com account.
   */
  calLink?: string;
}

export function DiscoveryCallEmbed({ calLink = "rentwithfrontier" }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "discovery" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#4a6e5d" },
          dark: { "cal-brand": "#6f9f86" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      // Conversion tracking: fire GA event when a booking completes inside
      // the embed. The event payload includes the Cal.com event type so we
      // can tell discovery-call conversions apart from any future events.
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          const detail = (e as CustomEvent).detail as {
            data?: { eventType?: { slug?: string } };
          };
          track("discovery_call_booked", {
            cal_event_slug: detail?.data?.eventType?.slug,
          });
        },
      });
    })();
  }, []);

  return (
    <div className="rounded-2xl border bg-white shadow-sm">
      <Cal
        namespace="discovery"
        calLink={calLink}
        style={{ width: "100%", height: "680px", overflow: "auto" }}
        config={{ layout: "month_view", theme: "light" }}
      />
    </div>
  );
}
