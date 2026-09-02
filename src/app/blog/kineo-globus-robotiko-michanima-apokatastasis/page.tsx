import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { kineoGlobusRobotikoMichanimaApokatastasisPost } from "@/content/blog-posts/kineo-globus-robotiko-michanima-apokatastasis";

export const metadata: Metadata = buildBlogPostMetadata(
  kineoGlobusRobotikoMichanimaApokatastasisPost
);

export default function Page() {
  return (
    <BlogPostTemplate content={kineoGlobusRobotikoMichanimaApokatastasisPost} />
  );
}
