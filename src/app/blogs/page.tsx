import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { BlogCard } from "@/components/cards/blog-card";
import { AnimateInView } from "@/components/motion/animate-in-view";
import { getBlogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, updates, and tips for cabin owners and guests in Broken Bow and Hochatown, Oklahoma. From industry news to travel tips, stay informed with Frontier Property Management.",
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
