import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Frontier Property Management. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <SectionWrapper background="white" className="pt-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-charcoal md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: December 3, 2025
          </p>
        </div>

        {/* Policy Content */}
        <div className="prose prose-lg prose-charcoal max-w-4xl mx-auto">
          <p>
            Frontier Property Management, LLC (&quot;Frontier,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you
            visit our website, use our services, or interact with us in any
            way.
          </p>
          <p>
            By using our website or services, you agree to the collection and
            use of information in accordance with this policy.
          </p>

          {/* 1. Information We Collect */}
          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <h3>Personal Information</h3>
          <p>
            When you fill out a contact form, request an income estimate,
            submit a booking inquiry, or otherwise communicate with us, we may
            collect:
          </p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Mailing or property address</li>
            <li>Any other information you voluntarily provide</li>
          </ul>
          <h3>Device and Browser Information</h3>
          <p>
            When you visit our website, we may automatically collect certain
            information including:
          </p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent on each page</li>
            <li>Date and time of access</li>
          </ul>

          {/* 2. How We Use Your Information */}
          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>
              Provide, operate, and maintain our property management services
            </li>
            <li>Respond to your inquiries and contact form submissions</li>
            <li>Send you information about our services that you requested</li>
            <li>
              Communicate with you regarding bookings, property updates, and
              account information
            </li>
            <li>
              Analyze website usage and improve our website experience
            </li>
            <li>
              Send occasional marketing communications (with your consent)
            </li>
            <li>Comply with legal obligations and protect our rights</li>
          </ul>

          {/* 3. Mobile / SMS Data */}
          <h2>3. Mobile / SMS Data</h2>
          <p>
            If you opt in to receive SMS or text message communications from
            Frontier Property Management, we may collect your mobile phone
            number. SMS data, including phone numbers and message content, is
            used solely for communication purposes related to our services and
            is <strong>not shared with or sold to third parties</strong> for
            marketing or advertising purposes.
          </p>

          {/* 4. Information Sharing */}
          <h2>4. Information Sharing</h2>
          <p>
            We do <strong>not sell, rent, or trade</strong> your personal
            information to third parties. We may share your information only in
            the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share information with
              trusted third-party vendors who assist us in operating our
              business (e.g., website hosting, email services, payment
              processing). These providers are contractually obligated to
              protect your data and use it only for the services they provide
              to us.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to a
              valid legal request (e.g., court order, subpoena).
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of all or a portion of our business, your
              information may be transferred as part of the transaction.
            </li>
          </ul>

          {/* 5. Cookies */}
          <h2>5. Cookies</h2>
          <p>
            Our website uses first-party analytics cookies to help us
            understand how visitors interact with our site. These cookies
            collect aggregated, anonymous data about page views, traffic
            sources, and user behavior.
          </p>
          <p>
            You can disable cookies through your browser settings at any time.
            Please note that disabling cookies may affect the functionality of
            certain features on our website.
          </p>

          {/* 6. Data Retention */}
          <h2>6. Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to fulfill
            the purposes described in this policy, comply with legal
            obligations, resolve disputes, and enforce our agreements. When your
            information is no longer needed, we will securely delete or
            anonymize it.
          </p>

          {/* 7. Data Security */}
          <h2>7. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, alteration,
            disclosure, or destruction. However, no method of transmission over
            the internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          {/* 8. Your Rights */}
          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the personal
              information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Request that we correct any
              inaccurate or incomplete personal information.
            </li>
            <li>
              <strong>Deletion:</strong> Request that we delete your personal
              information, subject to certain legal exceptions.
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing
              communications at any time by following the unsubscribe link in
              our emails or contacting us directly.
            </li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:info@rentwithfrontier.com">
              info@rentwithfrontier.com
            </a>
            .
          </p>

          {/* 9. Children's Privacy */}
          <h2>9. Children&apos;s Privacy</h2>
          <p>
            Our website and services are not directed to individuals under the
            age of 13. We do not knowingly collect personal information from
            children under 13. If we become aware that we have collected
            personal information from a child under 13, we will take steps to
            delete that information promptly.
          </p>

          {/* 10. Third-Party Links */}
          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites or services
            that are not operated by us. We are not responsible for the privacy
            practices or content of these external sites. We encourage you to
            review the privacy policies of any third-party sites you visit.
          </p>

          {/* 11. Changes to This Policy */}
          <h2>11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, or legal requirements. When
            we make changes, we will update the &quot;Last updated&quot; date at
            the top of this page. We encourage you to review this policy
            periodically to stay informed about how we are protecting your
            information.
          </p>

          {/* 12. Contact */}
          <h2>12. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <p>
            <strong>Frontier Property Management, LLC</strong>
            <br />
            Email:{" "}
            <a href="mailto:info@rentwithfrontier.com">
              info@rentwithfrontier.com
            </a>
            <br />
            Phone: 580-207-7154
            <br />
            Address: 3156 Old Broken Bow Hwy, Broken Bow, OK 74728
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
