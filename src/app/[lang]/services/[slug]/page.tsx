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
  return serviceKeys.map((key) => ({ slug: serviceSlugs[key].en }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return buildServiceMetadata("en", slug);
}

export default async function EnglishServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return <ServiceRoute locale="en" slug={slug} />;
}
