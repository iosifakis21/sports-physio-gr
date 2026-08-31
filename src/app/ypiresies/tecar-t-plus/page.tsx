import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { tecarTPlusPage } from "@/content/service-pages/tecar-t-plus";

export const metadata: Metadata = buildServiceMetadata(tecarTPlusPage);

export default function Page() {
  return <ServicePageTemplate content={tecarTPlusPage} />;
}
