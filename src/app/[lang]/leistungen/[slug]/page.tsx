import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildServiceMetadata,
  ServiceRoute,
} from "@/components/services/ServiceRoute";

type Props = Readonly<{ params: Promise<{ lang: string; slug: string }> }>;

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
