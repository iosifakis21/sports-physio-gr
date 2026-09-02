import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { seminarioCutman18OktovriouMichalisSioulisAthinaPost } from "@/content/blog-posts/seminario-cutman-18-oktovriou-michalis-sioulis-athina";

export const metadata: Metadata = buildBlogPostMetadata(
  seminarioCutman18OktovriouMichalisSioulisAthinaPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={seminarioCutman18OktovriouMichalisSioulisAthinaPost} />
  );
}
