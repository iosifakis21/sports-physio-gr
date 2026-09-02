import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { tenontopatheiaAchilleiouTenontaPost } from "@/content/blog-posts/tenontopatheia-achilleiou-tenonta";

export const metadata: Metadata = buildBlogPostMetadata(
  tenontopatheiaAchilleiouTenontaPost
);

export default function Page() {
  return <BlogPostTemplate content={tenontopatheiaAchilleiouTenontaPost} />;
}
