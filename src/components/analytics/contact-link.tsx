"use client";

import { type ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  /** "phone" or "email". Nothing personal is sent, only the channel. */
  channel: "phone" | "email";
  source: string;
};

/**
 * A tel: or mailto: link that records a contact_click. A click is not a
 * conversation, and the event is never reported as one.
 */
export function ContactLink({ channel, source, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track("contact_click", { channel, source });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
