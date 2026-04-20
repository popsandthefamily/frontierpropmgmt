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
          // AAA-compliant (7:1) versions of the sage brand so Cal.com's
          // button contrast check passes. Light theme uses sage-dark on
          // white; dark theme uses a brighter sage on Cal's dark surface.
          light: { "cal-brand": "#3a5a4a" },
          dark: { "cal-brand": "#8ebfa0" },
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
