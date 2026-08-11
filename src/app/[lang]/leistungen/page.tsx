import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildServiceOverviewMetadata,
  ServiceOverviewRoute,
} from "@/components/services/ServiceOverviewRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return buildServiceOverviewMetadata("de");
}

export default async function GermanServicesPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return <ServiceOverviewRoute locale="de" />;
}
