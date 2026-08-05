import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClientStoryDetailView } from "@/components/sections/client-stories/ClientStoryDetailView";
import {
  clientStories,
  getClientStoryBySlug,
  getClientStoryContent,
  getClientStoryPageTitle,
  getWorkItemsForClientStory,
} from "@/data/client-stories";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { buildClientStoryJsonLd, buildClientStoryVideoJsonLd } from "@/lib/structured-data";

type Props = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale; slug: string }>> {
  const locales: Locale[] = ["de", "en"];
  return locales.flatMap((lang) => clientStories.map((story) => ({ lang, slug: story.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const dict = await getDictionary(lang);
  const content = getClientStoryContent(story, lang);
  const pathname = `/client-stories/${slug}`;
  const title = getClientStoryPageTitle(story, dict);

  return buildPageMetadata({
    locale: lang,
    pathname,
    title,
    description: content.metaDescription,
  });
}

export default async function ClientStoryPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const story = getClientStoryBySlug(slug);
  if (!story) notFound();

  const dict = await getDictionary(locale);
  const content = getClientStoryContent(story, locale);
  const pageTitle = getClientStoryPageTitle(story, dict);
  const workItems = getWorkItemsForClientStory(story, dict, locale);

  const jsonLd = [
    ...buildClientStoryJsonLd(locale, slug, pageTitle, content.metaDescription),
    ...buildClientStoryVideoJsonLd(locale, slug, workItems, content.metaDescription),
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
