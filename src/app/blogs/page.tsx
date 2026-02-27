import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { BlogCard } from "@/components/cards/blog-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { getBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title:
    "Broken Bow & Hochatown Cabin Blog — STR Tips, Travel Guides & News",
  description:
    "Tips for Broken Bow cabin owners and guests — STR management insights, Hochatown travel guides, local events, and vacation rental industry news from Frontier Property Management.",
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
        backgroundImage="/images/hero/hero-bg.jpg"
        title="From the Frontier"
        subtitle="Insights, updates, and tips for cabin owners and guests"
        size="medium"
        overlay="dark"
      />

      {/* Blog Grid */}
      <SectionWrapper background="white">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <AnimateInView key={post.slug} delay={i * 0.1}>
              <BlogCard
                slug={post.slug}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                featuredImage={post.featuredImage}
                category={post.category}
              />
            </AnimateInView>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
