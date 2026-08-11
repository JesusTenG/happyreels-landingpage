import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildServiceOverviewMetadata,
  ServiceOverviewRoute,
} from "@/components/services/ServiceOverviewRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return buildServiceOverviewMetadata("en");
}

export default async function EnglishServicesPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return <ServiceOverviewRoute locale="en" />;
}
