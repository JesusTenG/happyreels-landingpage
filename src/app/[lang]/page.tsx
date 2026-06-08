import { notFound } from "next/navigation";

import { HeroVisualModeProvider } from "@/components/hero/HeroVisualModeProvider.client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSnapshotSection } from "@/components/sections/impact-snapshot/ImpactSnapshotSection";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ClientStoriesSection } from "@/components/sections/client-stories/ClientStoriesSection";
import { WorkSection } from "@/components/sections/work/WorkSection";
import { TestimonialSection } from "@/components/testimonials/TestimonialSection";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildFaqJsonLd, buildHomeJsonLd } from "@/lib/structured-data";

import styles from "./page.module.css";

type Props = Readonly<{
  params: Promise<{ lang: string }>;
}>;

/** Temporär: auf `false` setzen, um alle Sections unter der Navbar auszublenden. */
const SHOW_HOME_SECTIONS = false;

const maintenanceCopy = {
  de: {
    eyebrow: "In Arbeit",
    title: "Website im Aufbau",
    body: "Die Seite wird gerade überarbeitet und ist in Kürze wieder vollständig verfügbar.",
  },
  en: {
    eyebrow: "In progress",
    title: "Site under construction",
    body: "This website is being updated and will be fully available again soon.",
  },
} as const;

export default async function LangHomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang satisfies Locale;
  const dict = await getDictionary(locale);
  const maintenance = maintenanceCopy[locale];

  const jsonLd = [...buildHomeJsonLd(locale, dict), buildFaqJsonLd(dict)];

  return (
    <HeroVisualModeProvider>
      <JsonLd data={jsonLd} />
      <Navbar locale={locale} dict={dict} introAnimation />
      {SHOW_HOME_SECTIONS ? (
        <div className="page-spectrum flex flex-1 flex-col">
          <main className="flex flex-1 flex-col">
            <HeroSection dict={dict} />
            <ServicesSection dict={dict} />
            <WorkSection dict={dict} />
            <ProcessSection dict={dict} />
            <ApproachSection dict={dict} />
            <TestimonialSection locale={locale} dict={dict} />
            <ImpactSnapshotSection dict={dict} locale={locale} />
            <ClientStoriesSection locale={locale} dict={dict} />
            <FaqSection dict={dict} />
            <FinalCtaSection dict={dict} locale={locale} />
          </main>
          <Footer locale={locale} dict={dict} />
        </div>
      ) : (
        <div className="page-spectrum flex flex-1 flex-col">
          <main className={`flex flex-1 flex-col ${styles["home-maintenance"]}`}>
            <div className={styles["home-maintenance__inner"]}>
              <p className={styles["home-maintenance__eyebrow"]}>{maintenance.eyebrow}</p>
              <h1 className={styles["home-maintenance__title"]}>{maintenance.title}</h1>
              <p className={styles["home-maintenance__body"]}>{maintenance.body}</p>
            </div>
          </main>
        </div>
      )}
    </HeroVisualModeProvider>
  );
}
