import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { kiliMesospondylioyDiskouOxyStadioPost } from "@/content/blog-posts/kili-mesospondylioy-diskou-oxy-stadio";

export const metadata: Metadata = buildBlogPostMetadata(
  kiliMesospondylioyDiskouOxyStadioPost
);

export default function Page() {
  return <BlogPostTemplate content={kiliMesospondylioyDiskouOxyStadioPost} />;
}
