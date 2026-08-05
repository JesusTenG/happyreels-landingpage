import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClientStoryDetailView } from "@/components/sections/client-stories/ClientStoryDetailView";
import {
  getClientStoryBySlug,
  getClientStoryContent,
  getWorkItemsForClientStory,
} from "@/data/client-stories";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getClientProjectPathnames } from "@/lib/route-config";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildClientProjectJsonLd,
  buildClientProjectVideoJsonLd,
} from "@/lib/structured-data";

export async function buildClientProjectMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const content = getClientStoryContent(story, locale);
  return buildPageMetadata({
    locale,
    title: content.pageTitle,
    description: content.metaDescription,
    ogImagePath: story.heroImageSrc ?? story.cardImageSrc,
    localizedPathnames: getClientProjectPathnames(slug),
  });
}

export async function ClientProjectRoute({
  locale,
  slug,
}: Readonly<{ locale: Locale; slug: string }>) {
  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const dict = await getDictionary(locale);
  const content = getClientStoryContent(story, locale);
  const workItems = getWorkItemsForClientStory(story, dict, locale);
  const jsonLd = [
    ...buildClientProjectJsonLd(locale, story, content),
    ...buildClientProjectVideoJsonLd(locale, story, workItems, content.metaDescription),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar locale={locale} dict={dict} />
      <div className="page-spectrum page-spectrum--subtle flex flex-1 flex-col">
        <main id="main-content" className="flex flex-1 flex-col section-flow">
          <div className="container-base">
            <ClientStoryDetailView locale={locale} dict={dict} story={story} />
          </div>
        </main>
        <Footer locale={locale} dict={dict} />
      </div>
    </>
  );
}
