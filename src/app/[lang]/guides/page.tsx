import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildKnowledgeHubMetadata, KnowledgeHubRoute } from "@/components/knowledge/KnowledgeRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return buildKnowledgeHubMetadata("en");
}

export default async function EnglishKnowledgeHubPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en") notFound();
  return <KnowledgeHubRoute locale="en" />;
}
