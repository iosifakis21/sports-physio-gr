import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { megaliEpitychiaAlloEnaSeminarioCutmanMichalisSioulisPost } from "@/content/blog-posts/megali-epitychia-allo-ena-seminario-cutman-michalis-sioulis";

export const metadata: Metadata = buildBlogPostMetadata(
  megaliEpitychiaAlloEnaSeminarioCutmanMichalisSioulisPost
);

export default function Page() {
  return (
    <BlogPostTemplate
      content={megaliEpitychiaAlloEnaSeminarioCutmanMichalisSioulisPost}
    />
  );
}
