import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Rental Agreement",
  description:
    "Vacation rental agreement terms and conditions for properties managed by Frontier Property Management in Broken Bow and Hochatown, Oklahoma.",
};

export default function RentalAgreementPage() {
  return (
    <SectionWrapper background="white" className="pt-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-charcoal md:text-4xl">
            Vacation Rental Agreement
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Frontier Property Management, LLC
          </p>
        </div>

        {/* Agreement Content */}
        <div className="prose prose-lg prose-charcoal max-w-4xl mx-auto">
          {/* Check-In / Check-Out */}
          <h2>Check-In / Check-Out</h2>
          <p>
            Check-in is available after <strong>3:00 PM</strong> on the
            scheduled arrival date. Check-out must be completed by{" "}
            <strong>11:00 AM</strong> on the scheduled departure date. Early
            check-in or late check-out may be available upon request but is not
            guaranteed. Failure to vacate by checkout time may result in
            additional charges.
          </p>

          {/* Payment Terms */}
          <h2>Payment Terms</h2>
          <p>
            A deposit of <strong>50% of the total rental amount</strong> is due
            at the time of booking to secure the reservation. The remaining
            balance is due <strong>15 days prior to check-in</strong>. For
            reservations made within 15 days of check-in, full payment is
            required at the time of booking. Same-day bookings require full
            payment upfront. All payments are processed securely through our
            booking platform.
          </p>

          {/* Guest Qualifications */}
          <h2>Guest Qualifications</h2>
          <p>
            The primary guest (the individual who made the reservation) must be
            at least <strong>25 years of age</strong> and must be present at the
            property for the entire duration of the stay. A valid
            government-issued photo ID may be required at check-in. The primary
            guest is responsible for all members of the party and any damages or
            violations that occur during the stay.
          </p>

          {/* Minimum Stay */}
          <h2>Minimum Stay</h2>
          <p>
            A <strong>3-night minimum stay</strong> is standard for all
            properties. Two-night exceptions may be considered on a case-by-case
            basis at the discretion of management. Minimum stay requirements may
            vary during peak seasons and holidays.
          </p>

          {/* Occupancy */}
          <h2>Occupancy</h2>
          <p>
            Occupancy limits are strictly enforced as stated in each property
            listing. The number of guests may not exceed the posted maximum at
            any time. Unauthorized events, parties, or gatherings are strictly
            prohibited and will result in <strong>immediate eviction</strong> and{" "}
            <strong>forfeiture of all rental payments</strong>. No refunds will
            be issued in the event of eviction due to occupancy or event
            violations.
          </p>

          {/* Cancellation Policy */}
          <h2>Cancellation Policy</h2>
          <ul>
            <li>
              <strong>30+ days before check-in:</strong> 100% refund of all
              payments.
            </li>
            <li>
              <strong>14 to 29 days before check-in:</strong> 50% refund of
              total rental amount.
            </li>
            <li>
              <strong>Within 14 days of check-in:</strong> No refund. All
              payments are forfeited.
            </li>
          </ul>
          <p>
            Cancellation requests must be submitted in writing. Refunds are
            processed within 7-10 business days. Frontier Property Management
            reserves the right to cancel a reservation at any time due to
            unforeseen circumstances, in which case a full refund will be
            issued.
          </p>

          {/* Damage Protection */}
          <h2>Damage Protection</h2>
          <p>
            A <strong>non-refundable damage protection fee</strong> is included
            with each reservation. This fee covers accidental damage to the
            property and its contents up to <strong>$1,500</strong>. This is not
            a security deposit and is non-refundable regardless of whether
            damage occurs. Damage exceeding $1,500 will be the responsibility
            of the guest and may be pursued through the booking platform or
            directly.
          </p>

          {/* Pet Policy */}
          <h2>Pet Policy</h2>
          <p>
            Pets are permitted <strong>only at designated pet-friendly
            properties</strong> and only with payment of the applicable pet fee.
            Guests must disclose all pets at the time of booking. Undisclosed
            pets discovered during or after a stay will result in additional
            charges. All pets must be supervised at all times, and guests are
            responsible for any pet-related damage or excessive cleaning
            required.
          </p>
          <p>
            Service animals are welcome at all properties with proper
            documentation in compliance with the Americans with Disabilities
            Act.
          </p>

          {/* Smoking */}
          <h2>Smoking Policy</h2>
          <p>
            Smoking of any kind (including cigarettes, cigars, e-cigarettes, and
            vaporizers) is <strong>strictly prohibited</strong> inside all
            rental properties and on all decks, porches, and covered outdoor
            areas. Violations of the no-smoking policy will result in forfeiture
            of damage protection coverage and a minimum cleaning fee of $500.
          </p>

          {/* Hot Tub Rules */}
          <h2>Hot Tub Rules</h2>
          <p>
            Properties equipped with hot tubs are subject to the following
            rules:
          </p>
          <ul>
            <li>No glass containers, food, or beverages in or near the hot tub.</li>
            <li>
              No soaps, shampoos, bath oils, or any chemical additives in the
              hot tub water.
            </li>
            <li>
              Children under 12 must be supervised by an adult at all times.
            </li>
            <li>Replace the hot tub cover when the tub is not in use.</li>
            <li>
              Report any hot tub issues immediately to management. Do not
              attempt to adjust chemical levels or equipment.
            </li>
          </ul>
          <p>
            Guests assume all risk associated with hot tub use. Frontier
            Property Management is not liable for injuries resulting from hot
            tub use.
          </p>

          {/* Quiet Hours */}
          <h2>Quiet Hours</h2>
          <p>
            Quiet hours are observed from <strong>11:00 PM to 7:00 AM</strong>{" "}
            nightly. During these hours, noise must be kept to a reasonable
            level that does not disturb neighboring properties. Noise complaints
            may result in a warning, and repeated violations may result in
            eviction without refund.
          </p>

          {/* Internet */}
          <h2>Internet / Wi-Fi</h2>
          <p>
            Wi-Fi internet service is provided as a <strong>courtesy
            amenity</strong> at most properties. Internet speed and
            availability may vary due to the rural location. Frontier Property
            Management is not responsible for internet outages, slow speeds, or
            connectivity issues, and no refunds or credits will be issued for
            Wi-Fi-related concerns.
          </p>

          {/* Governing Law */}
          <h2>Governing Law</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with
            the laws of the <strong>State of Oklahoma</strong>. Any disputes
            arising under or in connection with this Agreement shall be subject
            to the exclusive jurisdiction of the courts located in{" "}
            <strong>McCurtain County, Oklahoma</strong>.
          </p>

          {/* Acknowledgment */}
          <h2>Acknowledgment</h2>
          <p>
            By completing a booking with Frontier Property Management, Guest
            acknowledges that they have read, understood, and agree to all terms
            and conditions set forth in this Vacation Rental Agreement. This
            Agreement is binding upon the Guest and all members of the Guest&apos;s
            party.
          </p>

          {/* Addendum A */}
          <h2>Addendum A — Damage Protection Plan</h2>
          <p>
            The Damage Protection Plan covers accidental damage to the rental
            property and its contents up to <strong>$1,500</strong>, provided
            the damage is reported to Frontier Property Management{" "}
            <strong>before checkout</strong>.
          </p>
          <p>
            <strong>The Damage Protection Plan does NOT cover:</strong>
          </p>
          <ul>
            <li>Intentional or reckless acts of damage or destruction</li>
            <li>Damage caused by unauthorized pets</li>
            <li>Damage caused by smoking indoors or on covered areas</li>
            <li>Excessive cleaning beyond normal turnover standards</li>
            <li>Theft or removal of property furnishings or equipment</li>
            <li>
              Damage resulting from occupancy violations or unauthorized events
            </li>
          </ul>
          <p>
            Damage not covered by the Damage Protection Plan or exceeding the
            $1,500 limit will be pursued directly with the guest through the
            booking platform or independent collection efforts.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sage hover:text-sage-dark transition-colors font-medium"
          >
            <ArrowLeft className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
