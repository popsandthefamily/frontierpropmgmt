import type { Metadata } from "next";
import { CopyButton } from "@/components/admin/copy-button";
import { getBlogPosts } from "@/data/blog-posts";
import { siteConfig } from "@/data/site";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export const metadata: Metadata = {
  title: "Social posts, Admin",
  robots: { index: false, follow: false },
};

/**
 * Copy/paste surface for the Facebook page.
 *
 * Every blog post carries a `facebookPost` caption written to be pasted
 * without editing. This page just makes them reachable from a phone: hit
 * the URL with the admin token, tap copy, paste into Facebook.
 *
 * Gated the same way as /admin/audit-stats, and /admin/ is disallowed in
 * robots.ts.
 */
export default async function SocialPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const expected = process.env.ADMIN_AUTH_SECRET;

  if (!expected) {
    return (
      <Shell>
        <p className="text-destructive">
          ADMIN_AUTH_SECRET is not set. Add it to your env to access this page.
        </p>
      </Shell>
    );
  }
  if (token !== expected) {
    return (
      <Shell>
        <h1 className="text-2xl font-bold">Admin access</h1>
        <p className="mt-2 text-muted-foreground">
          Append <code>?token=YOUR_ADMIN_AUTH_SECRET</code> to this URL.
        </p>
      </Shell>
    );
  }

  const posts = getBlogPosts();
  const withCaption = posts.filter((p) => p.facebookPost);
  const missing = posts.filter((p) => !p.facebookPost);

  return (
    <Shell>
      <h1 className="text-3xl font-bold text-charcoal">Social posts</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Ready-to-paste Facebook captions, newest first. Tap copy, then paste
        into{" "}
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-sage hover:underline"
        >
          the Frontier page
        </a>
        . The article link is already at the end of each caption, so Facebook
        will build the preview card on its own.
      </p>

      {missing.length > 0 && (
        <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {missing.length} post{missing.length === 1 ? "" : "s"} without a
          caption:{" "}
          {missing.map((p) => p.slug).join(", ")}. Add a{" "}
          <code>facebookPost</code> field in src/data/blog-posts.ts.
        </div>
      )}

      <div className="mt-8 space-y-6">
        {withCaption.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-charcoal">
                  {post.title}
                </h2>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {post.category} &middot; {post.date}
                </p>
              </div>
              <CopyButton text={post.facebookPost as string} />
            </div>

            <textarea
              readOnly
              rows={10}
              value={post.facebookPost}
              className="mt-4 w-full resize-y rounded-lg border bg-muted/30 p-4 font-mono text-xs leading-relaxed text-charcoal"
            />

            <p className="mt-2 text-xs text-muted-foreground">
              {post.facebookPost?.length} characters &middot;{" "}
              <a
                href={`${siteConfig.url}/blogs/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sage hover:underline"
              >
                view the post
              </a>
            </p>
          </article>
        ))}
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-4xl px-4 py-16">{children}</div>;
}
