import Image from "next/image";
import { Instagram } from "lucide-react";

import { SectionWave } from "@/components/layout/SectionWave";
import { SubpageCta } from "@/components/subpages/SubpageCta";
import { aboutContent } from "@/data/about-content";
import type { Locale } from "@/i18n/config";
import { INSTAGRAM_URL } from "@/lib/site";

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
              <div className={styles.founderHeader}>
                <h2 id="founder-title">{copy.founderTitle}</h2>
                <a
                  href={INSTAGRAM_URL}
                  className={styles.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={copy.instagramLabel}
                >
                  <Instagram aria-hidden="true" />
                </a>
              </div>
              <p>{copy.founderBody}</p>
            </article>
            <article className={styles.card} data-card="2">
              <h2>{copy.philosophyTitle}</h2>
              <p>{copy.philosophyBody}</p>
            </article>
          </div>
        </div>
      </section>
      <section className={styles.story} aria-labelledby="story-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.storyContainer}`}>
          <article className={`${styles.card} ${styles.storyCard}`} data-card="3">
            <h2 id="story-title">{copy.storyTitle}</h2>
            <div className={styles.storyCopy}>
              {copy.storyParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        </div>
      </section>
      <SubpageCta locale={locale} />
    </main>
  );
}
