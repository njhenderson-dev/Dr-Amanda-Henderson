import type { Metadata } from "next";
import { ServicePage, serviceMetadata } from "@/components/ServicePage";

export const metadata: Metadata = serviceMetadata("general-gp-care");

export default function Page() {
  return <ServicePage slug="general-gp-care" />;
}
