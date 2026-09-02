import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { stinEthnikiOmadaMouaiTaiFysikotherapeutisMichalisSioulisPost } from "@/content/blog-posts/stin-ethniki-omada-mouai-tai-fysikotherapeutis-michalis-sioulis";

export const metadata: Metadata = buildBlogPostMetadata(
  stinEthnikiOmadaMouaiTaiFysikotherapeutisMichalisSioulisPost
);

export default function Page() {
  return (
    <BlogPostTemplate
      content={stinEthnikiOmadaMouaiTaiFysikotherapeutisMichalisSioulisPost}
    />
  );
}
