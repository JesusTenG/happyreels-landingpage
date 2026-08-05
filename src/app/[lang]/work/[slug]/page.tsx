import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkCaseDetailView } from "@/components/sections/work/WorkCaseDetailView";
import {
  getWorkCaseBySlug,
  getWorkCaseContent,
  isPlaceholderWorkCase,
  workCases,
} from "@/data/work-cases";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildCaseJsonLd,
  buildCaseVideoJsonLd,
} from "@/lib/structured-data";

type Props = Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale; slug: string }>> {
  const locales: Locale[] = ["de", "en"];
  return locales.flatMap((lang) => workCases.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const workCase = getWorkCaseBySlug(slug);
  if (!workCase) notFound();

  const content = getWorkCaseContent(workCase, lang);
  const pathname = `/work/${slug}`;
  const title = content.title;

  return buildPageMetadata({
    locale: lang,
    pathname,
    title,
    description: content.description,
    ogImagePath: workCase.posterSrc,
    robots: isPlaceholderWorkCase(workCase)
      ? { index: false, follow: true }
      : undefined,
  });
}

export default async function WorkCasePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const workCase = getWorkCaseBySlug(slug);
  if (!workCase) notFound();

  const content = getWorkCaseContent(workCase, locale);
  const dict = await getDictionary(locale);

  const jsonLd = [
    ...buildCaseJsonLd(locale, slug, content),
    ...(!isPlaceholderWorkCase(workCase)
      ? buildCaseVideoJsonLd(locale, slug, content)
      : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar locale={locale} dict={dict} />
      <div className="page-spectrum page-spectrum--subtle flex flex-1 flex-col">
        <main id="main-content" className="flex flex-1 flex-col section-flow">
          <div className="container-base">
            <WorkCaseDetailView
              locale={locale}
              dict={dict}
              workCase={workCase}
              content={content}
            />
          </div>
        </main>
        <Footer locale={locale} dict={dict} />
      </div>
    </>
  );
}
