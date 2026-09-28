import Link from "next/link";
import { Camera, Scissors, Play, Sparkles } from "lucide-react";

import { KnowledgeCards } from "@/components/knowledge/KnowledgeCards";
import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { getServiceContent, serviceKeys } from "@/data/service-content";
import type { Locale } from "@/i18n/config";
import { getServicePath } from "@/lib/route-config";

import styles from "./ServiceOverview.module.css";

const ICONS = [Camera, Scissors, Play, Sparkles] as const;
const COPY = {
  de: {
    title: "Videoproduktion & Videoschnitt",
    intro: "Vom ersten Konzept bis zum fertigen Film. Wir produzieren neue Aufnahmen, schneiden dein Material oder übernehmen das Finish.",
    choices: ["Konzept, Dreh und Postproduktion für dein nächstes Videoprojekt.", "Reels, TikToks und Shorts aus vorhandenem Material.", "Schnitt für Podcasts, Interviews und längere Videos.", "Motion Design, Color Grading und Sound für bestehende Edits."],
    guides: "Vor dem Projektstart",
    guidesIntro: "Kosten, Schnittablauf und Color Grading verständlich erklärt.",
    ctaTitle: "Welche Leistung brauchst du?",
    ctaBody: "Erzähl uns von deinem Ziel und dem vorhandenen Material.",
    cta: "Projekt besprechen",
  },
  en: {
    title: "Video production & editing",
    intro: "From the first concept to the finished film. We shoot new footage, edit your material or take care of finishing.",
    choices: ["Concept, filming and postproduction for your next video.", "Reels, TikToks and Shorts from existing footage.", "Editing for podcasts, interviews and longer videos.", "Motion design, color grading and sound for existing edits."],
    guides: "Before your project starts",
    guidesIntro: "Production costs, editing workflows and color grading explained.",
    ctaTitle: "What does your project need?",
    ctaBody: "Tell us your goal and what footage you already have.",
    cta: "Discuss your project",
  },
} as const;

export function ServiceOverview({ locale }: Readonly<{ locale: Locale }>) {
  const copy = COPY[locale];
  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className={`container-base ${styles.heroInner}`}>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.lead}>{copy.intro}</p>
        </div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
      <section className={styles.services} aria-label={locale === "de" ? "Alle Leistungen" : "All services"} data-navbar-theme="brown">
        <div className={`container-base ${styles.serviceGrid}`}>
          {serviceKeys.map((key, index) => {
            const Icon = ICONS[index];
            return (
              <Link className={styles.serviceCard} href={getServicePath(locale, key)} data-card={index + 1} key={key}>
                <div className={styles.cardTop}><h2>{getServiceContent(key, locale).navTitle}</h2><span className={styles.icon}><Icon size={25} aria-hidden="true" /></span></div>
                <p>{copy.choices[index]}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <section className={styles.guides} aria-labelledby="service-guides-title" data-navbar-theme="brown">
        <div className="container-base">
          <h2 id="service-guides-title" className={styles.heading}>{copy.guides}</h2>
          <KnowledgeCards locale={locale} />
        </div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
