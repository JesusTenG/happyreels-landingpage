import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildKnowledgeHubMetadata, KnowledgeHubRoute } from "@/components/knowledge/KnowledgeRoute";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return buildKnowledgeHubMetadata("de");
}

export default async function GermanKnowledgeHubPage({ params }: Props) {
  const { lang } = await params;
  if (lang !== "de") notFound();
  return <KnowledgeHubRoute locale="de" />;
}
