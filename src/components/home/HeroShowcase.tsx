import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { ScrollHint } from "@/components/ui/ScrollHint/ScrollHint";
import type { Locale } from "@/i18n/config";

import { HeroVideoStack } from "./HeroVideoStack";
import styles from "./HappyReelsHome.module.css";

type Props = Readonly<{
  locale: Locale;
  ctaLabel: string;
  projectsHref: string;
}>;

export function HeroShowcase({ locale, ctaLabel, projectsHref }: Props) {
  const contactLabel = locale === "de" ? "Projekt starten" : "Start a project";

  return (
    <>
      <section
        id="hero"
        className={`${styles.hero} ${styles.heroRose} ${styles.heroLarge}`}
        aria-labelledby="hero-title"
        data-navbar-theme="brown"
      >
        <div className={`container-base ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title" className={styles.heroTitle} aria-label="From Footage to Feeling">
              <span className={styles.heroTitleLine}>
                <span>From</span>
                <span className={styles.heroTitleItalic}>Footage</span>
              </span>
              <span className={styles.heroTitleLine}>
                <span>to</span>
                <span className={styles.heroTitleItalic}>Feeling</span>
              </span>
            </h1>
            <div className={styles.heroActions}>
              <HappyReelsButton href={projectsHref} variant="on-rose">
                {ctaLabel}
              </HappyReelsButton>
              <HappyReelsButton href={`/${locale}#contact`} variant="accent">
                {contactLabel}
              </HappyReelsButton>
            </div>
          </div>

          <HeroVideoStack variant="large" />
        </div>

        <ScrollHint
          href="#work"
          ariaLabel={locale === "de" ? "Zu den Projekten scrollen" : "Scroll to projects"}
        />
      </section>

      <SectionWave from="var(--color-dusty-blush)" to="var(--color-dusty-blush)" />
    </>
  );
}
