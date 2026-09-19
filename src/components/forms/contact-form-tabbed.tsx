"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/data/site";
import { track } from "@/lib/analytics";
import { type ContactIntent, HOME_CARE_STR_NOTE } from "@/data/home-care";

type FormStatus = "idle" | "submitting" | "success" | "error";
type FormTab = "guest" | "owner";

/**
 * Owner service interest. Values are the ones the notification email and
 * analytics carry; labels are what the owner sees. "not-sure" exists so
 * nobody is forced into a wrong choice just to send the form.
 */
const SERVICE_OPTIONS = [
  { value: "management", label: "Full-Service STR Management: run my rental for me" },
  { value: "concierge", label: "Home Care Concierge: care for my property while I keep control" },
  { value: "local-support", label: "STR Cleaning & Local Support: turnovers and local hands for a rental I run" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
type ServiceValue = (typeof SERVICE_OPTIONS)[number]["value"];

const PROPERTY_USE_OPTIONS = [
  { value: "private", label: "Private home, not rented" },
  { value: "str", label: "Short-term rental" },
  { value: "mixed", label: "Mixed: family use and some rentals" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

const LOCATION_OPTIONS = [
  "Broken Bow",
  "Hochatown",
  "Near Broken Bow / McCurtain County",
  "Other",
] as const;

const BEDROOM_OPTIONS = ["1-2", "3", "4", "5+", "Multiple properties"] as const;

const HOT_TUB_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
] as const;

const REQUESTED_SERVICES = [
  { value: "monthly-clean", label: "Monthly maintenance clean" },
  { value: "hot-tub", label: "Hot-tub attention" },
  { value: "exterior", label: "Light exterior upkeep" },
  { value: "property-checks", label: "Property checks" },
  { value: "turnovers", label: "Guest turnovers" },
  { value: "full-management", label: "Full rental management" },
] as const;

const TIMING_OPTIONS = [
  "As soon as possible",
  "Within the next month",
  "In the next few months",
  "Just researching",
] as const;

const CABIN_OPTIONS = [
  "Sublime Retreat",
  "Old Broken Bow Highway",
  "Not sure yet",
] as const;

/** Campaign parameters we are willing to forward. Nothing else from the URL. */
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  size: 40,
  message: 3000,
  dates: 120,
  attribution: 100,
} as const;

/** Map a contact intent from the URL onto the tab and the service field. */
function intentToState(intent: ContactIntent): {
  tab: FormTab;
  service: ServiceValue | "";
} {
  switch (intent) {
    case "guest":
      return { tab: "guest", service: "" };
    case "management":
      return { tab: "owner", service: "management" };
    case "concierge":
      return { tab: "owner", service: "concierge" };
    case "local-support":
      return { tab: "owner", service: "local-support" };
    case "owner":
    default:
      return { tab: "owner", service: "" };
  }
}

const serviceLabel = (value: string) =>
  SERVICE_OPTIONS.find((o) => o.value === value)?.label.split(":")[0] ??
  "Owner inquiry";

const selectClass =
  "border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px]";

interface ContactFormTabbedProps {
  className?: string;
  /** Service intent from the page's validated `type` query parameter. */
  initialIntent?: ContactIntent;
}

export function ContactFormTabbed({
  className,
  initialIntent = "owner",
}: ContactFormTabbedProps) {
  const initial = intentToState(initialIntent);
  const [tab, setTab] = useState<FormTab>(initial.tab);
  const [service, setService] = useState<ServiceValue | "">(initial.service);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attribution, setAttribution] = useState<Record<string, string>>({});
  const [sourcePage, setSourcePage] = useState("");
  const formStarted = useRef(false);

  // Attribution and source page come from the browser after hydration, so
  // the server-rendered markup stays identical regardless of the URL.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const next: Record<string, string> = {};
      for (const key of ATTRIBUTION_KEYS) {
        const value = params.get(key);
        if (value) next[key] = value.slice(0, LIMITS.attribution);
      }
      setAttribution(next);
      setSourcePage(window.location.pathname);
    } catch {
      // Attribution is nice to have. Never let it break the form.
    }
  }, []);

  // If the page re-renders with a different intent (client navigation
  // between two CTAs), follow it.
  useEffect(() => {
    const next = intentToState(initialIntent);
    setTab(next.tab);
    setService(next.service);
    setErrors({});
  }, [initialIntent]);

  function markStarted() {
    if (formStarted.current) return;
    formStarted.current = true;
    track("form_start", { form: "contact", tab });
  }

  function validate(formData: FormData): Record<string, string> {
    const validationErrors: Record<string, string> = {};
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    if (name.trim().length < 2) {
      validationErrors.name = "Full name is required.";
    } else if (name.length > LIMITS.name) {
      validationErrors.name = `Please keep your name under ${LIMITS.name} characters.`;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > LIMITS.email) {
      validationErrors.email = "A valid email address is required.";
    }
    if (tab === "owner" && !service) {
      validationErrors.service_interest =
        "Tell us which service you are asking about. “Not sure yet” is fine.";
    }
    if (message.length > LIMITS.message) {
      validationErrors.message = `Please keep your message under ${LIMITS.message} characters.`;
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

    // Intent and attribution, added to the same Formspree payload the form
    // has always sent. Names, emails, and free text never go to analytics.
    const isOwner = tab === "owner";
    formData.set("form_type", isOwner ? "Owner Inquiry" : "Guest Inquiry");
    formData.set("service_interest", isOwner ? service : "guest-stay");
    if (!isOwner) formData.delete("property_use");
    formData.set(
      "_subject",
      isOwner
        ? `Owner inquiry: ${serviceLabel(service)}`
        : "Guest inquiry: cabin stay",
    );
    formData.set("source_page", sourcePage);
    for (const [key, value] of Object.entries(attribution)) {
      formData.set(key, value);
    }
    // Checkbox groups arrive as repeated keys; join them so the email reads
    // as one line.
    const requested = formData.getAll("requested_services").map(String);
    formData.delete("requested_services");
    if (requested.length > 0) {
      formData.set("requested_services", requested.join(", "));
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
        // The lead event fires only once the endpoint has accepted the
        // inquiry, and carries service intent rather than anything personal.
        track("generate_lead", {
          form: "contact",
          service_interest: isOwner ? service : "guest-stay",
          property_use: isOwner ? String(formData.get("property_use") ?? "") : undefined,
          source_page: sourcePage,
        });
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function switchTab(next: FormTab) {
    setTab(next);
    setErrors({});
    if (next === "guest") {
      track("service_select", { service: "guest-stay", source: "contact_form_tab" });
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-center gap-4 rounded-lg border bg-sage/5 p-8 text-center",
          className,
        )}
      >
        <CheckCircle2 className="size-12 text-sage" />
        <h3 className="text-xl font-semibold text-charcoal">
          Thank you for reaching out!
        </h3>
        <p className="text-muted-foreground">
          We have received your message and will get back to you within one
          business day.
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

  const isOwner = tab === "owner";

  return (
    <div className={className}>
      {/* Tab Toggle */}
      <div
        className="mb-8 flex rounded-lg border bg-muted p-1"
        role="tablist"
        aria-label="Who is asking"
      >
        <button
          type="button"
          role="tab"
          aria-selected={isOwner}
          onClick={() => switchTab("owner")}
          className={cn(
            "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
            isOwner
              ? "bg-white text-charcoal shadow-sm"
              : "text-muted-foreground hover:text-charcoal",
          )}
        >
          I own a home or cabin
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isOwner}
          onClick={() => switchTab("guest")}
          className={cn(
            "flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all",
            !isOwner
              ? "bg-white text-charcoal shadow-sm"
              : "text-muted-foreground hover:text-charcoal",
          )}
        >
          I&apos;m a guest
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        onInput={markStarted}
        className="space-y-6"
        noValidate
        data-tab={tab}
      >
        {/* Honeypot, hidden from real users, catches bots */}
        <input
          type="text"
          name="_gotcha"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />

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
            maxLength={LIMITS.name}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
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
            maxLength={LIMITS.email}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        {/* ── Guest-specific Fields ─────────────────────────────── */}
        {!isOwner && (
          <>
            <div className="space-y-2">
              <Label htmlFor="contact-dates">Preferred Dates</Label>
              <Input
                id="contact-dates"
                name="dates"
                type="text"
                maxLength={LIMITS.dates}
                placeholder="e.g. March 15–18, 2027"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-cabin">Which Cabin?</Label>
              <select
                id="contact-cabin"
                name="cabin"
                className={selectClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a cabin...
                </option>
                {CABIN_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* ── Owner-specific Fields ─────────────────────────────── */}
        {isOwner && (
          <>
            <div className="space-y-2">
              <Label htmlFor="contact-service">
                What are you asking about?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <select
                id="contact-service"
                name="service_interest_choice"
                className={selectClass}
                value={service}
                required
                aria-invalid={!!errors.service_interest}
                aria-describedby={
                  errors.service_interest ? "contact-service-error" : undefined
                }
                onChange={(e) => {
                  const next = e.target.value as ServiceValue;
                  setService(next);
                  track("service_select", {
                    service: next,
                    source: "contact_form",
                  });
                }}
              >
                <option value="" disabled>
                  Select a service...
                </option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.service_interest && (
                <p id="contact-service-error" className="text-sm text-destructive">
                  {errors.service_interest}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-property-use">How is the property used?</Label>
              <select
                id="contact-property-use"
                name="property_use"
                className={selectClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Select one...
                </option>
                {PROPERTY_USE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {service === "concierge" && (
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {HOME_CARE_STR_NOTE}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone (optional)</Label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  maxLength={LIMITS.phone}
                  autoComplete="tel"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-location">Property town or area</Label>
                <select
                  id="contact-location"
                  name="location"
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select location...
                  </option>
                  {LOCATION_OPTIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="contact-bedrooms">Bedrooms (optional)</Label>
                <select
                  id="contact-bedrooms"
                  name="bedrooms"
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {BEDROOM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-size">Approx. size (optional)</Label>
                <Input
                  id="contact-size"
                  name="approx_size"
                  type="text"
                  inputMode="numeric"
                  maxLength={LIMITS.size}
                  placeholder="e.g. 2,700 sq ft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-hot-tub">Hot tub?</Label>
                <select
                  id="contact-hot-tub"
                  name="hot_tub"
                  className={selectClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  {HOT_TUB_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-charcoal">
                What would you like handled? (optional)
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {REQUESTED_SERVICES.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-2 text-sm text-charcoal"
                  >
                    <input
                      type="checkbox"
                      name="requested_services"
                      value={opt.value}
                      className="size-4 rounded border-input accent-sage"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="contact-timing">Timing</Label>
              <select
                id="contact-timing"
                name="timing"
                className={selectClass}
                defaultValue=""
              >
                <option value="" disabled>
                  Select...
                </option>
                {TIMING_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              No street address, listing link, or revenue figures needed to
              start. We collect the exact address securely when we scope the
              property.
            </p>
          </>
        )}

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="contact-message">
            {isOwner ? "Anything else we should know?" : "Message"}
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            maxLength={LIMITS.message}
            placeholder={
              isOwner
                ? "Tell us about the property, how you use it, or what has been falling through the cracks..."
                : "Questions about the cabin, activities, or your trip..."
            }
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="text-sm text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        {/* Error Banner */}
        {status === "error" && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive"
          >
            <AlertCircle className="size-4 shrink-0" />
            Something went wrong and your message was not sent. Your answers
            are still here; please try again, or email us directly at{" "}
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
          ) : isOwner ? (
            "Send My Property Details"
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  );
}
