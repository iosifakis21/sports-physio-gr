import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { wyndhamGrandSynentefxiTypouProtathlimaIcaPost } from "@/content/blog-posts/wyndham-grand-synentefxi-typou-protathlima-ica";

export const metadata: Metadata = buildBlogPostMetadata(
  wyndhamGrandSynentefxiTypouProtathlimaIcaPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={wyndhamGrandSynentefxiTypouProtathlimaIcaPost} />
  );
}
