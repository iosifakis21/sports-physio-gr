import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { seminarioCutman4NoemvriouMichalisSioulisVideoPost } from "@/content/blog-posts/seminario-cutman-4-noemvriou-michalis-sioulis-video";

export const metadata: Metadata = buildBlogPostMetadata(
  seminarioCutman4NoemvriouMichalisSioulisVideoPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={seminarioCutman4NoemvriouMichalisSioulisVideoPost} />
  );
}
