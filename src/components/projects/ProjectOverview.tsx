import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import { WorkVideoGallery } from "@/components/sections/work/WorkVideoGallery.client";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { getReelVideos } from "@/data/reel-videos";
import type { Locale } from "@/i18n/config";

import styles from "./ProjectOverview.module.css";
import { ClientCollaborationsSection } from "./ClientCollaborationsSection";

export function ProjectOverview({ locale }: Readonly<{ locale: Locale }>) {
  const items = getReelVideos(locale);
  const copy = locale === "de"
    ? {
        title: "Arbeiten, die auffallen und nachwirken.",
        intro: "Reels, Commercials und Podcast Edits. Öffne einen Film für Ton und Details.",
        ctaTitle: "Die nächste starke Geschichte könnte deine sein.",
        cta: "Projekt starten",
      }
    : {
        title: "Work that stands out and stays with you.",
        intro: "Reels, commercials and podcast edits. Open a film for sound and details.",
        ctaTitle: "The next story worth remembering could be yours.",
        cta: "Start a project",
      };

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} aria-labelledby="projects-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.heroInner}`}>
          <h1 id="projects-title"><MixedHeadline text={copy.title} /></h1>
          <p>{copy.intro}</p>
        </Reveal>
      </section>
      <SectionWave from="var(--color-dusty-blush)" to="var(--color-soft-clay)" />
      <ClientCollaborationsSection locale={locale} variant="projects" />
      <SectionWave from="var(--color-soft-clay)" to="var(--color-petal-white)" />
      <section className={styles.gridSection} aria-label={locale === "de" ? "Projektgalerie" : "Project gallery"} data-navbar-theme="brown">
        <Reveal className="container-base">
          <WorkVideoGallery items={items} />
        </Reveal>
      </section>
      <SectionWave from="var(--color-petal-white)" to="var(--color-happy-gold)" flip />
      <section className={styles.cta} aria-labelledby="project-cta-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.ctaInner}`}>
          <h2 id="project-cta-title"><MixedHeadline text={copy.ctaTitle} /></h2>
          <HappyReelsButton href={`/${locale}#contact`} variant="on-yellow">{copy.cta}</HappyReelsButton>
        </Reveal>
      </section>
      <SectionWave from="var(--color-happy-gold)" to="var(--color-cocoa-ink)" />
    </main>
  );
}
