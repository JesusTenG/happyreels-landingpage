import Image from "next/image";

import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { aboutContent } from "@/data/about-content";
import type { Locale } from "@/i18n/config";

import styles from "./AboutPage.module.css";

export function AboutPage({ locale }: Readonly<{ locale: Locale }>) {
  const copy = aboutContent[locale];
  return (
    <main id="main-content" className={styles.main}>
      <header className={styles.hero} data-navbar-theme="brown">
        <div className="container-base"><h1 className={styles.title}>{copy.title}</h1></div>
      </header>
      <SectionWave from="var(--subpage-bg-soft)" to="var(--subpage-bg-base)" />
      <section className={styles.about} aria-labelledby="founder-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.aboutGrid}`}>
          <figure className={styles.portrait}>
            <Image src="/assets/about/simon1.jpeg" alt={locale === "de" ? "Simon Saad am Mikrofon" : "Simon Saad at the microphone"} fill sizes="(max-width: 800px) 90vw, 36vw" preload />
          </figure>
          <div className={styles.copy}>
            <article className={styles.card} data-card="1">
              <h2 id="founder-title">{copy.founderTitle}</h2>
              <p>{copy.founderBody}</p>
            </article>
            <article className={styles.card} data-card="2">
              <h2>{copy.philosophyTitle}</h2>
              <p>{copy.philosophyBody}</p>
            </article>
          </div>
        </div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
