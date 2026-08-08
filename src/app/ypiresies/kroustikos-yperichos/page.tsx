import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { kroustikosYperichosPage } from "@/content/service-pages/kroustikos-yperichos";

export const metadata: Metadata = buildServiceMetadata(kroustikosYperichosPage);

export default function Page() {
  return <ServicePageTemplate content={kroustikosYperichosPage} />;
}
