"use client";

import { useEffect } from "react";

interface HospitableBookingProps {
  propertyId: string;
}

export function HospitableBooking({ propertyId }: HospitableBookingProps) {
  useEffect(() => {
    function getQueryParams(param: string) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      return urlSearchParams.get(param);
    }

    function updateIframeSrc() {
      const iframe = document.getElementById(
        "booking-iframe"
      ) as HTMLIFrameElement | null;
      if (!iframe) return;

      const checkin = getQueryParams("checkin");
      const checkout = getQueryParams("checkout");
      const adults = getQueryParams("adults");
      const children = getQueryParams("children");
      const infants = getQueryParams("infants");
      const pets = getQueryParams("pets");

      if (checkin || checkout) {
        let newSrc = iframe.src;
        newSrc += newSrc.includes("?") ? "&" : "?";
        newSrc += `checkin=${checkin}&checkout=${checkout}&adults=${adults}&children=${children}&pets=${pets}&infants=${infants}`;
        iframe.src = newSrc;
      }
    }

    updateIframeSrc();
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <iframe
        id="booking-iframe"
        sandbox="allow-top-navigation allow-scripts allow-same-origin"
        style={{ width: "100%", height: "600px" }}
        frameBorder="0"
        src={`https://booking.hospitable.com/widget/9f3d8a61-1242-4f44-bcfe-eb8989fc9fcd/${propertyId}`}
        title="Book your stay"
      />
    </div>
  );
}
