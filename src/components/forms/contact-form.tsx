"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";

type FormStatus = "idle" | "submitting" | "success" | "error";

const locationOptions = [
  "Broken Bow",
  "Hochatown",
  "Near Broken Bow/McCurtain County",
  "Other",
] as const;

const bedroomOptions = ["1-2", "3", "4", "5+", "Multiple"] as const;

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: FormData): Record<string, string> {
    const validationErrors: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (!name || name.trim().length < 2) {
      validationErrors.name = "Full name is required.";
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
          Thank you for reaching out!
        </h3>
        <p className="text-muted-foreground">
          We have received your message and will get back to you within 24
          hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setStatus("idle")}
          className="mt-2"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      noValidate
    >
      {/* Honeypot — hidden from real users, catches bots */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="contact-name">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-name"
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
        <Label htmlFor="contact-email">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="contact-email"
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
        <Label htmlFor="contact-phone">Phone</Label>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
        />
      </div>

      {/* Property Location */}
      <div className="space-y-2">
        <Label htmlFor="contact-location">Property Location</Label>
        <select
          id="contact-location"
          name="location"
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          defaultValue=""
        >
          <option value="" disabled>
            Select location...
          </option>
          {locationOptions.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Number of Bedrooms */}
      <div className="space-y-2">
        <Label htmlFor="contact-bedrooms">Number of Bedrooms</Label>
        <select
          id="contact-bedrooms"
          name="bedrooms"
          className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
          defaultValue=""
        >
          <option value="" disabled>
            Select bedrooms...
          </option>
          {bedroomOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us about your property or how we can help..."
          rows={5}
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
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
