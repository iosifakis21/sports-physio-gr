import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { stinElladaJacobStitchDuranEliteCutmenPost } from "@/content/blog-posts/stin-ellada-jacob-stitch-duran-elite-cutmen";

export const metadata: Metadata = buildBlogPostMetadata(
  stinElladaJacobStitchDuranEliteCutmenPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={stinElladaJacobStitchDuranEliteCutmenPost} />
  );
}
