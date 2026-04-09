import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReadingProgressBar } from "@/components/layout/reading-progress-bar";
import { BlogCard } from "@/components/cards/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { getBlogPostBySlug, getBlogPosts } from "@/data/blog-posts";
import { siteConfig } from "@/data/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) return notFound();

  // Get other posts (excluding the current one)
  const otherPosts = getBlogPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* JSON-LD Structured Data */}
      <JsonLd
        type="Article"
        data={{
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage
            ? `${siteConfig.url}${post.featuredImage}`
            : undefined,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />

      {/* Featured Image */}
      <div className="relative h-[40vh] w-full md:h-[50vh]">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      <Breadcrumbs
        items={[
          { label: "Blog", href: "/blogs" },
          { label: post.title },
        ]}
      />

      {/* Post Content */}
      <div className="mx-auto max-w-3xl px-4 py-12">

        {/* Post Meta */}
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
            <span className="text-muted-foreground/40">|</span>
            <span className="text-sm text-muted-foreground">
              {post.author}
            </span>
            {post.category && (
              <>
                <span className="text-muted-foreground/40">|</span>
                <Badge
                  variant="secondary"
                  className="bg-sage/10 text-sage text-xs"
                >
                  {post.category}
                </Badge>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-charcoal md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
        </div>

        {/* Divider */}
        <hr className="mb-10 border-border" />

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-3xl prose-headings:text-charcoal prose-a:text-sage prose-a:no-underline hover:prose-a:underline prose-strong:text-charcoal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* More Posts */}
      {otherPosts.length > 0 && (
        <SectionWrapper background="cream">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-charcoal">
              More From the Frontier
            </h2>
            <p className="mt-2 text-muted-foreground">
              Keep reading for more insights and updates.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {otherPosts.map((otherPost) => (
              <BlogCard
                key={otherPost.slug}
                slug={otherPost.slug}
                title={otherPost.title}
                date={otherPost.date}
                excerpt={otherPost.excerpt}
                featuredImage={otherPost.featuredImage}
                category={otherPost.category}
              />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}
