import { redirect, permanentRedirect } from "next/navigation";
import { googleReviewUrl, siteConfig } from "@/data/site";

/**
 * rentwithfrontier.com/review — one hop to the Google review dialog.
 *
 * Review volume and recency are the two biggest levers on local pack
 * ranking, and they are also what answer engines lean on when deciding
 * whether a small company is real. Both die on friction: nobody navigates
 * to a Business Profile and hunts for the star widget.
 *
 * A URL short enough to say out loud at checkout, or drop into a
 * post-stay message, is the whole intervention.
 */
export function GET(): never {
  if (!siteConfig.googlePlaceId) {
    // No Place ID configured yet, so land people on the profile itself and
    // let them find the review button. Temporary on purpose: this should
    // become the deep link as soon as the ID is set.
    redirect(siteConfig.social.google);
  }
  permanentRedirect(googleReviewUrl);
}
