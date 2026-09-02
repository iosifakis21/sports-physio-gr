import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost } from "@/content/blog-posts/epistrefei-stis-proponiseis-giorgos-tzanos-rixi-pxs";

export const metadata: Metadata = buildBlogPostMetadata(
  epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={epistrefeiStisProponiseisGiorgosTzanosRixiPxsPost} />
  );
}
