"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BookingWidgetProps {
  bookingUrl?: string;
  propertyName: string;
  className?: string;
}

export function BookingWidget({
  bookingUrl,
  propertyName,
  className,
}: BookingWidgetProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays className="size-5 text-sage" />
        <h3 className="text-lg font-semibold text-charcoal">
          Book {propertyName}
        </h3>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        Check availability and book your stay. Best rate guaranteed when you
        book direct.
      </p>

      {bookingUrl ? (
        <Button
          asChild
          className="w-full bg-sage text-white hover:bg-sage-dark"
          size="lg"
        >
          <Link href={bookingUrl} target="_blank" rel="noopener noreferrer">
            Check Availability
          </Link>
        </Button>
      ) : (
        <Button
          asChild
          className="w-full bg-sage text-white hover:bg-sage-dark"
          size="lg"
        >
          <Link href="/contact">Inquire About Booking</Link>
        </Button>
      )}

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Have questions?{" "}
        <Link href="/contact" className="text-sage hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
