import { notFound } from "next/navigation";

import { HappyReelsHome } from "@/components/home/HappyReelsHome";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, type Locale } from "@/i18n/config";
import { faqContent } from "@/data/faq-content";
import { getDictionary } from "@/i18n/dictionaries";
import { buildFaqPageJsonLd, buildHomeJsonLd } from "@/lib/structured-data";

type Props = Readonly<{
  params: Promise<{ lang: string }>;
}>;

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <JsonLd
        data={[
          ...buildHomeJsonLd(locale, dict),
          buildFaqPageJsonLd(locale, faqContent[locale]),
        ]}
      />
      <Navbar locale={locale} dict={dict} introAnimation />
      <HappyReelsHome locale={locale} dict={dict} />
      <Footer locale={locale} dict={dict} />
    </>
  );
}
