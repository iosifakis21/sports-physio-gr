import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { epistrefeiStisProponiseisGiaToUfcAndreasMichailidisPost } from "@/content/blog-posts/epistrefei-stis-proponiseis-gia-to-ufc-andreas-michailidis";

export const metadata: Metadata = buildBlogPostMetadata(
  epistrefeiStisProponiseisGiaToUfcAndreasMichailidisPost
);

export default function Page() {
  return (
    <BlogPostTemplate
      content={epistrefeiStisProponiseisGiaToUfcAndreasMichailidisPost}
    />
  );
}
