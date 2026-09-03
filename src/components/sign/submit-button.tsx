"use client";

import { useFormStatus } from "react-dom";

/**
 * A submit button that admits it is working.
 *
 * Sending a signature request hashes the PDF and emails every signer, which
 * takes a few seconds. Without this the button looked inert and invited a
 * second click, which would have created a second request.
 */
export function SubmitButton({
  children,
  pendingLabel,
  disabled,
  className,
}: {
  children: React.ReactNode;
  pendingLabel: string;
  disabled?: boolean;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={disabled || pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
