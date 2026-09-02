import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { cutmanStitchEpisfragiseLaEpitychiaSeminariouSioulisPost } from "@/content/blog-posts/cutman-stitch-episfragise-la-epitychia-seminariou-sioulis";

export const metadata: Metadata = buildBlogPostMetadata(
  cutmanStitchEpisfragiseLaEpitychiaSeminariouSioulisPost
);

export default function Page() {
  return (
    <BlogPostTemplate
      content={cutmanStitchEpisfragiseLaEpitychiaSeminariouSioulisPost}
    />
  );
}
