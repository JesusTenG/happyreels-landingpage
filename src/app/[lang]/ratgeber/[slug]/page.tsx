import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildKnowledgeMetadata, KnowledgeArticleRoute } from "@/components/knowledge/KnowledgeRoute";
import { knowledgeKeys } from "@/data/knowledge-content";
import { knowledgeSlugs } from "@/lib/route-config";

type Props = Readonly<{ params: Promise<{ lang: string; slug: string }> }>;

export function generateStaticParams() {
  return knowledgeKeys.map((key) => ({ slug: knowledgeSlugs[key].de }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "de") notFound();
  return buildKnowledgeMetadata("de", slug);
}

export default async function GermanKnowledgePage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "de") notFound();
  return <KnowledgeArticleRoute locale="de" slug={slug} />;
}
