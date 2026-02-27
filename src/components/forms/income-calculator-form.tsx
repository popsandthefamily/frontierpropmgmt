"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/data/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
] as const;

export function IncomeCalculatorForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: FormData): Record<string, string> {
    const validationErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || name.trim().length < 2) {
      validationErrors.name = "Your name is required.";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "A valid email address is required.";
    }

    return validationErrors;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 rounded-lg border bg-sage/5 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="size-12 text-sage" />
        <h3 className="text-xl font-semibold text-charcoal">
          Thank you!
        </h3>
        <p className="text-muted-foreground">
          We have received your property information and will send you a
          customized income estimate within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      noValidate
    >
      {/* Hidden field to identify the form */}
      <input type="hidden" name="_subject" value="Income Calculator Request" />
      {/* Honeypot — hidden from real users, catches bots */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Address Line 1 */}
      <div className="space-y-2">
        <Label htmlFor="calc-address">Address Line 1</Label>
        <Input
          id="calc-address"
          name="address"
          type="text"
          placeholder="123 Cabin Lane"
        />
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="calc-city">City</Label>
        <Input
          id="calc-city"
          name="city"
          type="text"
          placeholder="Broken Bow"
        />
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label htmlFor="calc-state">State</Label>
        <select
          id="calc-state"
          name="state"
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          defaultValue="Oklahoma"
        >
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="calc-name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="calc-name"
          name="name"
          type="text"
          placeholder="Your full name"
          required
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="calc-email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="calc-email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="calc-phone">Phone</Label>
        <Input
          id="calc-phone"
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
        />
      </div>

      {/* Error Banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          Something went wrong. Please try again or email us directly at{" "}
          {siteConfig.email}.
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-sage text-white hover:bg-sage-dark"
        size="lg"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Get My Free Estimate"
        )}
      </Button>
    </form>
  );
}
