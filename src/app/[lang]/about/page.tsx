import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutPage } from "@/components/about/AboutPage";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutContent } from "@/data/about-content";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/seo";
import { buildAboutJsonLd } from "@/lib/structured-data";

type Props = Readonly<{ params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const copy = aboutContent[lang];
  return buildPageMetadata({
    locale: lang,
    pathname: "/about",
    title: lang === "de" ? "Über HappyReels" : "About HappyReels",
    description: copy.lead,
  });
}

export default async function AboutRoute({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);
  const copy = aboutContent[locale];
  return (
    <>
      <JsonLd data={buildAboutJsonLd(locale, copy.title, copy.lead)} />
      <Navbar locale={locale} dict={dict} />
      <AboutPage locale={locale} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
