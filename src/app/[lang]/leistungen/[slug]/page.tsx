import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildServiceMetadata,
  ServiceRoute,
} from "@/components/services/ServiceRoute";
import { serviceKeys } from "@/data/service-content";
import { serviceSlugs } from "@/lib/route-config";

type Props = Readonly<{ params: Promise<{ lang: string; slug: string }> }>;

export function generateStaticParams() {
  return serviceKeys.map((key) => ({ slug: serviceSlugs[key].de }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "de") notFound();
  return buildServiceMetadata("de", slug);
}

export default async function GermanServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "de") notFound();
  return <ServiceRoute locale="de" slug={slug} />;
}
