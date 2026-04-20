import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Rental Agreement",
  description:
    "Vacation rental agreement terms and conditions for properties managed by Frontier Property Management in Broken Bow and Hochatown, Oklahoma.",
  alternates: { canonical: "https://rentwithfrontier.com/rental-agreement" },
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
          <p className="mt-1 text-sm text-muted-foreground">
            Last updated April 20, 2026
          </p>
        </div>

        {/* Jump links */}
        <nav
          aria-label="Sections"
          className="mx-auto mb-10 max-w-3xl rounded-lg border bg-cream/40 p-5 text-sm"
        >
          <p className="mb-3 font-semibold text-charcoal">Jump to a section:</p>
          <ul className="grid gap-x-4 gap-y-1 sm:grid-cols-2">
            <li><a href="#checkin" className="text-sage hover:underline">Check-In / Check-Out</a></li>
            <li><a href="#payment" className="text-sage hover:underline">Payment Terms</a></li>
            <li><a href="#guest-qualifications" className="text-sage hover:underline">Guest Qualifications</a></li>
            <li><a href="#minimum-stay" className="text-sage hover:underline">Minimum Stay</a></li>
            <li><a href="#occupancy" className="text-sage hover:underline">Occupancy</a></li>
            <li><a href="#cancellation" className="text-sage hover:underline">Cancellation Policy</a></li>
            <li><a href="#damage" className="text-sage hover:underline">Damage Protection</a></li>
            <li><a href="#pets" className="text-sage hover:underline">Pet Policy</a></li>
            <li><a href="#smoking" className="text-sage hover:underline">Smoking Policy</a></li>
            <li><a href="#hot-tub" className="text-sage hover:underline">Hot Tub Rules</a></li>
            <li><a href="#quiet-hours" className="text-sage hover:underline">Quiet Hours</a></li>
            <li><a href="#wifi" className="text-sage hover:underline">Internet / Wi-Fi</a></li>
            <li><a href="#parking" className="text-sage hover:underline">Parking &amp; Vehicles</a></li>
            <li><a href="#visitors" className="text-sage hover:underline">Visitors &amp; Day Guests</a></li>
            <li><a href="#fireworks" className="text-sage hover:underline">Fireworks &amp; Open Flame</a></li>
            <li><a href="#weather" className="text-sage hover:underline">Weather &amp; Utility Interruptions</a></li>
            <li><a href="#wildlife" className="text-sage hover:underline">Wildlife &amp; Natural Hazards</a></li>
            <li><a href="#provided" className="text-sage hover:underline">What&apos;s Provided / What to Bring</a></li>
            <li><a href="#insurance" className="text-sage hover:underline">Insurance &amp; Liability</a></li>
            <li><a href="#force-majeure" className="text-sage hover:underline">Force Majeure</a></li>
            <li><a href="#indemnification" className="text-sage hover:underline">Indemnification</a></li>
            <li><a href="#privacy" className="text-sage hover:underline">Privacy &amp; Monitoring</a></li>
            <li><a href="#governing-law" className="text-sage hover:underline">Governing Law</a></li>
            <li><a href="#acknowledgment" className="text-sage hover:underline">Acknowledgment</a></li>
          </ul>
        </nav>

        {/* Agreement Content */}
        <div className="prose prose-lg prose-charcoal max-w-4xl mx-auto">
          {/* Check-In / Check-Out */}
          <h2 id="checkin">Check-In / Check-Out</h2>
          <p>
            Check-in is available after <strong>3:00 PM</strong> on the
            scheduled arrival date. Check-out must be completed by{" "}
            <strong>11:00 AM</strong> on the scheduled departure date. Early
            check-in or late check-out may be available upon request but is not
            guaranteed. Failure to vacate by checkout time may result in
            additional charges.
          </p>

          {/* Payment Terms */}
          <h2 id="payment">Payment Terms</h2>
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
          <h2 id="guest-qualifications">Guest Qualifications</h2>
          <p>
            The primary guest (the individual who made the reservation) must be
            at least <strong>25 years of age</strong> and must be present at the
            property for the entire duration of the stay. A valid
            government-issued photo ID may be required at check-in. The primary
            guest is responsible for all members of the party and any damages or
            violations that occur during the stay.
          </p>

          {/* Minimum Stay */}
          <h2 id="minimum-stay">Minimum Stay</h2>
          <p>
            A <strong>3-night minimum stay</strong> is standard for all
            properties. Two-night exceptions may be considered on a case-by-case
            basis at the discretion of management. Minimum stay requirements may
            vary during peak seasons and holidays.
          </p>

          {/* Occupancy */}
          <h2 id="occupancy">Occupancy</h2>
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
          <h2 id="cancellation">Cancellation Policy</h2>
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
          <h2 id="damage">Damage Protection</h2>
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
          <h2 id="pets">Pet Policy</h2>
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
          <h2 id="smoking">Smoking Policy</h2>
          <p>
            Smoking of any kind (including cigarettes, cigars, e-cigarettes, and
            vaporizers) is <strong>strictly prohibited</strong> inside all
            rental properties and on all decks, porches, and covered outdoor
            areas. Violations of the no-smoking policy will result in forfeiture
            of damage protection coverage and a minimum cleaning fee of $500.
          </p>

          {/* Hot Tub Rules */}
          <h2 id="hot-tub">Hot Tub Rules</h2>
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
          <h2 id="quiet-hours">Quiet Hours</h2>
          <p>
            Quiet hours are observed from <strong>11:00 PM to 7:00 AM</strong>{" "}
            nightly. During these hours, noise must be kept to a reasonable
            level that does not disturb neighboring properties. Noise complaints
            may result in a warning, and repeated violations may result in
            eviction without refund.
          </p>

          {/* Internet */}
          <h2 id="wifi">Internet / Wi-Fi</h2>
          <p>
            Wi-Fi internet service is provided as a <strong>courtesy
            amenity</strong> at most properties. Internet speed and
            availability may vary due to the rural location. Frontier Property
            Management is not responsible for internet outages, slow speeds, or
            connectivity issues, and no refunds or credits will be issued for
            Wi-Fi-related concerns.
          </p>

          {/* Parking & Vehicles */}
          <h2 id="parking">Parking &amp; Vehicles</h2>
          <p>
            Guests may park only in the designated driveway or parking area at
            each property. Vehicles must remain on paved or gravel surfaces;
            parking on grass, gardens, or septic fields is not permitted. The
            maximum vehicle count is posted in the house manual and may not be
            exceeded. RVs, trailers, boats, and commercial vehicles are not
            permitted on any property without prior written consent from
            Frontier Property Management. Guests are responsible for any damage
            to driveways, landscaping, or neighboring property caused by their
            vehicles or those of their invitees.
          </p>

          {/* Visitors & Day Guests */}
          <h2 id="visitors">Visitors &amp; Day Guests</h2>
          <p>
            Day visitors and non-registered guests are permitted only with prior
            notice and only up to the property&apos;s posted maximum occupancy
            at any given time. Guests must supervise all visitors and are fully
            responsible for their conduct. Day visitors may not stay overnight
            without prior written approval and payment of any additional fees.
            Unauthorized overnight guests will be treated as an occupancy
            violation under the <a href="#occupancy">Occupancy</a> section.
          </p>

          {/* Fireworks & Open Flame */}
          <h2 id="fireworks">Fireworks &amp; Open Flame</h2>
          <p>
            Fireworks of any kind are{" "}
            <strong>strictly prohibited</strong> at all properties, regardless
            of local law, due to the wooded nature of the area and the elevated
            wildfire risk in McCurtain County. Campfires are permitted only in
            provided fire pits when local burn bans are not in effect. Guests
            are responsible for checking current burn ban status; the county
            posts updates at{" "}
            <a
              href="https://www.mccurtaincountyok.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              mccurtaincountyok.gov
            </a>
            . Fires must be fully extinguished before going indoors or to
            sleep. Violations may result in immediate eviction, forfeiture of
            payments, and liability for any resulting damage or emergency
            response costs.
          </p>

          {/* Weather & Utility Interruptions */}
          <h2 id="weather">Weather &amp; Utility Interruptions</h2>
          <p>
            Broken Bow and Hochatown are rural areas where severe weather,
            winter storms, and occasional utility outages do occur. Power,
            water, internet, and cable outages outside of Frontier Property
            Management&apos;s control are not grounds for a refund or credit.
            We will make reasonable efforts to restore service or arrange
            alternate accommodation where feasible, but cannot guarantee
            resolution timelines.
          </p>
          <p>
            In the event of a mandatory evacuation or a road closure issued by
            local authorities that prevents arrival or forces departure, we
            will issue a prorated refund for nights the property cannot be
            reasonably used, subject to the{" "}
            <a href="#force-majeure">Force Majeure</a> provisions below.
          </p>

          {/* Wildlife & Natural Hazards */}
          <h2 id="wildlife">Wildlife &amp; Natural Hazards</h2>
          <p>
            Properties are located in a forested area where black bears,
            snakes, ticks, mosquitoes, spiders, raccoons, and other wildlife
            are common. Do not leave food, trash, or coolers outside
            unattended, and ensure trash is sealed inside the provided
            receptacles. Guests stay at their own risk with respect to
            wildlife, poison ivy, and other natural hazards.
          </p>
          <p>
            Properties may include ponds, creeks, pools, or lake access. Guests
            swim and use watercraft at their own risk. Children must be
            supervised by an adult at all times near water.
          </p>

          {/* What's Provided / What to Bring */}
          <h2 id="provided">What&apos;s Provided / What to Bring</h2>
          <p>
            Each property is furnished with bed linens, bath towels, kitchen
            towels, hand soap, dish soap, dishwasher pods, a starter supply of
            toilet paper and paper towels, coffee filters, and basic cleaning
            supplies. Kitchens include cookware, dishes, utensils, a coffee
            maker, and basic small appliances.
          </p>
          <p>
            We recommend guests bring: personal toiletries (shampoo,
            conditioner, body wash beyond starter sizes), beach towels if
            planning to use the lake or hot tub outside of property-provided
            towels, groceries and pantry staples, and any specialty items
            (baby gear, specific cookware, firewood during burn bans).
          </p>

          {/* Insurance & Liability */}
          <h2 id="insurance">Insurance &amp; Liability</h2>
          <p>
            Guests are strongly encouraged to purchase trip insurance. Frontier
            Property Management and the property owner shall not be liable for
            any injury, illness, loss, theft, or property damage suffered by
            Guest, members of the Guest&apos;s party, or any invitee during the
            stay, except to the extent caused by our gross negligence or
            willful misconduct.
          </p>
          <p>
            Guests are responsible for securing the property (locking doors,
            closing windows, arming alarm if provided) when leaving the
            premises and for their own personal belongings. We do not maintain
            insurance covering guests&apos; personal property.
          </p>

          {/* Force Majeure */}
          <h2 id="force-majeure">Force Majeure</h2>
          <p>
            Neither party shall be liable for any failure or delay in
            performance caused by events beyond reasonable control, including
            but not limited to: acts of God, severe weather, wildfires, floods,
            tornadoes, ice storms, earthquakes, pandemics, government orders,
            mandatory evacuations, utility failures, or acts of war or
            terrorism (&quot;Force Majeure Events&quot;).
          </p>
          <p>
            If a Force Majeure Event prevents Guest from occupying the property
            for all or part of the reserved dates, Frontier Property Management
            will, in its reasonable discretion, either (a) reschedule the
            reservation for comparable future dates at no additional cost, or
            (b) issue a prorated refund for the affected nights. Cleaning fees
            and non-refundable taxes or booking-platform fees may be retained
            as applicable.
          </p>

          {/* Indemnification */}
          <h2 id="indemnification">Indemnification</h2>
          <p>
            Guest agrees to indemnify, defend, and hold harmless Frontier
            Property Management, LLC, the property owner, and their respective
            officers, members, employees, contractors, and agents from and
            against any claims, damages, losses, liabilities, and expenses
            (including reasonable attorneys&apos; fees) arising out of or
            related to Guest&apos;s use of the property, breach of this
            Agreement, or the acts or omissions of Guest or any member of
            Guest&apos;s party or invitees.
          </p>

          {/* Privacy & Monitoring */}
          <h2 id="privacy">Privacy &amp; Monitoring</h2>
          <p>
            Exterior security cameras and noise-monitoring devices are in use
            at most properties for the safety of guests and the protection of
            the property. These devices monitor only exterior areas and
            decibel levels; no interior audio or video recording occurs
            anywhere inside any property. Tampering with, covering, or
            disabling these devices is a breach of this Agreement and will
            result in forfeiture of damage protection coverage and may result
            in eviction without refund.
          </p>

          {/* Governing Law */}
          <h2 id="governing-law">Governing Law</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with
            the laws of the <strong>State of Oklahoma</strong>. Any disputes
            arising under or in connection with this Agreement shall be subject
            to the exclusive jurisdiction of the courts located in{" "}
            <strong>McCurtain County, Oklahoma</strong>.
          </p>

          {/* Acknowledgment */}
          <h2 id="acknowledgment">Acknowledgment</h2>
          <p>
            By completing a booking with Frontier Property Management, Guest
            acknowledges that they have read, understood, and agree to all terms
            and conditions set forth in this Vacation Rental Agreement. This
            Agreement is binding upon the Guest and all members of the Guest&apos;s
            party.
          </p>

          {/* Addendum A */}
          <h2 id="addendum-a">Addendum A: Damage Protection Plan</h2>
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
