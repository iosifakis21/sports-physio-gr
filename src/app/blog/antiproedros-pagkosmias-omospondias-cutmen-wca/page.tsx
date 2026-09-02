import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { antiproedrosPagkosmiasOmospondiasCutmenWcaPost } from "@/content/blog-posts/antiproedros-pagkosmias-omospondias-cutmen-wca";

export const metadata: Metadata = buildBlogPostMetadata(
  antiproedrosPagkosmiasOmospondiasCutmenWcaPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={antiproedrosPagkosmiasOmospondiasCutmenWcaPost} />
  );
}
