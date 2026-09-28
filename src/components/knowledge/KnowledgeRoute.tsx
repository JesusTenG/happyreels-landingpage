import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { getKnowledgeContent, knowledgeHubCopy, knowledgeImages } from "@/data/knowledge-content";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  findKnowledgeKey,
  getKnowledgeHubPathnames,
  getKnowledgePathnames,
  type KnowledgeKey,
} from "@/lib/route-config";
import { buildPageMetadata } from "@/lib/seo";
import { buildKnowledgeArticleJsonLd, buildKnowledgeHubJsonLd } from "@/lib/structured-data";

import { KnowledgeArticlePage } from "./KnowledgeArticlePage";
import { KnowledgeHubPage } from "./KnowledgeHubPage";

const HUB_META = {
  de: {
    title: "Ratgeber zu Videoproduktion, Schnitt & Color Grading",
    description: "Praxisnahe Antworten zu Videoproduktion, Videoschnitt, Kosten und Color Grading von HappyReels.",
  },
  en: {
    title: "Guides to video production, editing & color grading",
    description: "Practical answers about video production, editing, costs and color grading from HappyReels.",
  },
} as const;

export function resolveKnowledgeKey(locale: Locale, slug: string): KnowledgeKey {
  const knowledgeKey = findKnowledgeKey(locale, slug);
  if (!knowledgeKey) notFound();
  return knowledgeKey;
}

export function buildKnowledgeHubMetadata(locale: Locale): Metadata {
  return buildPageMetadata({
    locale,
    title: HUB_META[locale].title,
    description: HUB_META[locale].description,
    localizedPathnames: getKnowledgeHubPathnames(),
  });
}

export function buildKnowledgeMetadata(locale: Locale, slug: string): Metadata {
  const knowledgeKey = resolveKnowledgeKey(locale, slug);
  const content = getKnowledgeContent(knowledgeKey, locale);

  const metadata = buildPageMetadata({
    locale,
    title: content.metaTitle,
    description: content.metaDescription,
    ogImagePath: knowledgeImages[knowledgeKey],
    localizedPathnames: getKnowledgePathnames(knowledgeKey),
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: ["Simon Saad"],
      images: [{ url: knowledgeImages[knowledgeKey], alt: content.cardTitle }],
    },
  };
}

export async function KnowledgeHubRoute({ locale }: Readonly<{ locale: Locale }>) {
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={buildKnowledgeHubJsonLd(locale, HUB_META[locale], knowledgeHubCopy[locale])} />
      <Navbar locale={locale} dict={dict} />
      <KnowledgeHubPage locale={locale} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}

export async function KnowledgeArticleRoute({ locale, slug }: Readonly<{ locale: Locale; slug: string }>) {
  const knowledgeKey = resolveKnowledgeKey(locale, slug);
  const content = getKnowledgeContent(knowledgeKey, locale);
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd data={buildKnowledgeArticleJsonLd(locale, knowledgeKey, content)} />
      <Navbar locale={locale} dict={dict} />
      <KnowledgeArticlePage locale={locale} knowledgeKey={knowledgeKey} content={content} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
