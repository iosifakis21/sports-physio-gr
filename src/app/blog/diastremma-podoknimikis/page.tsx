import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { diastremmaPodoknimikisPost } from "@/content/blog-posts/diastremma-podoknimikis";

export const metadata: Metadata = buildBlogPostMetadata(diastremmaPodoknimikisPost);

export default function Page() {
  return <BlogPostTemplate content={diastremmaPodoknimikisPost} />;
}
