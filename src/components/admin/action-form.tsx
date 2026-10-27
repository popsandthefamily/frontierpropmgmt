"use client";

import { useActionState } from "react";

export type ActionResult = { error?: string; notice?: string } | null;

/**
 * A form whose server action reports back instead of throwing.
 *
 * Next.js swaps a thrown action error for a generic message in production, so
 * an admin was shown a crash page where they needed to read "these emails
 * failed". The result is shown next to the control that produced it.
 *
 * `confirm` asks first, for the actions that email people or cannot be undone.
 */
export function ActionForm({
  action,
  confirm,
  className,
  children,
}: {
  action: (prev: ActionResult, formData: FormData) => Promise<ActionResult>;
  confirm?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, null);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className={className}
    >
      {children}
      {state?.error && (
        <p role="alert" className="basis-full text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state?.notice && (
        <p role="status" className="basis-full text-sm text-sage-dark">
          {state.notice}
        </p>
      )}
    </form>
  );
}
