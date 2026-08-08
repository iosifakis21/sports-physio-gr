import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { pelmatografosPage } from "@/content/service-pages/pelmatografos";

export const metadata: Metadata = buildServiceMetadata(pelmatografosPage);

export default function Page() {
  return <ServicePageTemplate content={pelmatografosPage} />;
}
