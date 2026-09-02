import type { Metadata } from "next";
import { BlogPostTemplate } from "@/components/BlogPostTemplate";
import { buildBlogPostMetadata } from "@/content/blog-posts";
import { megaliEpitychiaGiaEnaAkomiSeminarioTechnisCutmanPost } from "@/content/blog-posts/megali-epitychia-gia-ena-akomi-seminario-technis-cutman";

export const metadata: Metadata = buildBlogPostMetadata(
  megaliEpitychiaGiaEnaAkomiSeminarioTechnisCutmanPost
);

export default function Page() {
  return (
    <BlogPostTemplate
      content={megaliEpitychiaGiaEnaAkomiSeminarioTechnisCutmanPost}
    />
  );
}
