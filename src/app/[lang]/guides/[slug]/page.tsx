import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildKnowledgeMetadata, KnowledgeArticleRoute } from "@/components/knowledge/KnowledgeRoute";
import { knowledgeKeys } from "@/data/knowledge-content";
import { knowledgeSlugs } from "@/lib/route-config";

type Props = Readonly<{ params: Promise<{ lang: string; slug: string }> }>;

export function generateStaticParams() {
  return knowledgeKeys.map((key) => ({ slug: knowledgeSlugs[key].en }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return buildKnowledgeMetadata("en", slug);
}

export default async function EnglishKnowledgePage({ params }: Props) {
  const { lang, slug } = await params;
  if (lang !== "en") notFound();
  return <KnowledgeArticleRoute locale="en" slug={slug} />;
}
