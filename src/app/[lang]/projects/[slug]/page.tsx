import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  buildClientProjectMetadata,
  ClientProjectRoute,
} from "@/components/projects/ClientProjectRoute";

type Props = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return buildClientProjectMetadata("en", slug);
}

export default async function EnglishClientProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return <ClientProjectRoute locale="en" slug={slug} />;
}
