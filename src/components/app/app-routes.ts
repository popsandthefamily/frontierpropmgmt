/**
 * The working screens: places people sign in to do something, as opposed to
 * the marketing site. They drop the sales header, CTA band and big footer, which
 * offered "Owner Login" to people already signed in and a pitch to existing
 * owners.
 */
const APP_ROUTES = ["/admin", "/portal", "/sign"];

export function isAppRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return APP_ROUTES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
