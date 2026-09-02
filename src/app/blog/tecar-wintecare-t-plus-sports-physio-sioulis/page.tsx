import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { tecarWintecareTPlusSportsPhysioSioulisPost } from "@/content/blog-posts/tecar-wintecare-t-plus-sports-physio-sioulis";

export const metadata: Metadata = buildBlogPostMetadata(
  tecarWintecareTPlusSportsPhysioSioulisPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={tecarWintecareTPlusSportsPhysioSioulisPost} />
  );
}
