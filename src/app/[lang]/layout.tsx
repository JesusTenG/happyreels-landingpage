import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HeroVariantProvider } from "@/components/hero/HeroVariantContext.client";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>;

export async function generateStaticParams(): Promise<Array<{ lang: Locale }>> {
  return [{ lang: "de" }, { lang: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return buildPageMetadata({
    locale: lang,
    title: dict.meta.title,
    description: dict.meta.description,
  });
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <div lang={lang} data-locale={lang} className="min-h-full flex flex-col">
      <HeroVariantProvider>{children}</HeroVariantProvider>
    </div>
  );
}
