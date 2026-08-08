import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { buildServiceMetadata } from "@/content/service-pages";
import { medicalTrainingTherapyPage } from "@/content/service-pages/medical-training-therapy";

export const metadata: Metadata = buildServiceMetadata(medicalTrainingTherapyPage);

export default function Page() {
  return <ServicePageTemplate content={medicalTrainingTherapyPage} />;
}
