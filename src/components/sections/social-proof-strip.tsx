import { Facebook, Instagram, Star } from "lucide-react";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { googleProfileUrl, siteConfig } from "@/data/site";

/**
 * Off-site presence, surfaced above the footer.
 *
 * The Google Business Profile and Facebook page carry weight the website
 * cannot generate on its own: local pack ranking comes largely from the
 * profile and its reviews, and AI answer engines lean on third-party
 * sources when they decide whether a small business is real. Burying both
 * in a footer icon row wastes them, so they get a proper block on the pages
 * where someone is already deciding whether to trust us.
 */

const CHANNELS = [
  {
    key: "google",
    icon: Star,
    label: "Google Business Profile",
    body: "Reviews from owners and guests, plus directions to the office.",
    action: "Read our reviews",
    href: googleProfileUrl,
  },
  {
    key: "facebook",
    icon: Facebook,
    label: "Facebook",
    body: "Local updates, storm notices, and every article we publish.",
    action: "Follow the page",
    href: siteConfig.social.facebook,
  },
  {
    key: "instagram",
    icon: Instagram,
    label: "Instagram",
    body: "The cabins, the lake, and what Broken Bow looks like this week.",
    action: "See the feed",
    href: siteConfig.social.instagram,
  },
] as const;

export function SocialProofStrip({
  background = "cream",
  heading = "Find us elsewhere",
  subheading = "The reviews live on Google, the day-to-day lives on Facebook and Instagram.",
}: {
  background?: "white" | "cream";
  heading?: string;
  subheading?: string;
}) {
  return (
    <SectionWrapper background={background}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-charcoal md:text-3xl">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          {subheading}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.key}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-charcoal/10 bg-white p-5 transition hover:border-sage hover:shadow-sm"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-sage/10 text-sage">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                {channel.label}
              </h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {channel.body}
              </p>
              <span className="mt-4 text-sm font-semibold text-sage group-hover:underline">
                {channel.action} &rarr;
              </span>
            </a>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
        Stayed with us or had us manage your cabin?{" "}
        <a
          href="/review"
          className="font-semibold text-sage hover:text-sage-dark hover:underline"
        >
          Leave a Google review
        </a>{" "}
        &mdash; it takes about a minute and it is the single most useful thing
        you can do for a small local business.
      </p>
    </SectionWrapper>
  );
}
