import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { BlogCard } from "@/components/cards/blog-card";
import { getBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Broken Bow & Hochatown Cabin Blog: Tips, Guides & News",
  description:
    "Tips for Broken Bow cabin owners and guests, STR management insights, Hochatown travel guides, and vacation rental industry news.",
  openGraph: {
    title: "From the Frontier: Broken Bow & Hochatown Cabin Blog",
    description:
      "STR tips, Hochatown travel guides, and industry news for cabin owners and guests.",
    images: [
      {
        url: "/images/hero/forest-aerial.jpg",
        width: 1200,
        height: 630,
        alt: "Aerial view of Broken Bow forest",
      },
    ],
  },
  alternates: {
    canonical: "https://rentwithfrontier.com/blogs",
  },
};

export default function BlogsPage() {
  const posts = getBlogPosts();

  return (
    <>
      {/* Hero */}
      <HeroSection
        backgroundImage="/images/hero/forest-aerial.jpg"
        title="From the Frontier"
        subtitle="Insights, updates, and tips for cabin owners and guests"
        size="medium"
        overlay="dark"
      />

      {/* Blog Grid */}
      <SectionWrapper background="white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              featuredImage={post.featuredImage}
              category={post.category}
            />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
