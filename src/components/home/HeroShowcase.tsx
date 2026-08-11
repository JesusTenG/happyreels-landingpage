import { SectionWave } from "@/components/layout/SectionWave";
import DepthText from "@/components/ui/DepthText";
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
        data-navbar-hero
      >
        <div className={`container-base ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <h1 id="hero-title" className={styles.heroTitle} aria-label="From Footage to Feeling">
              <DepthText
                className={styles.heroTitleDepth}
                layers={34}
                depth={2.4}
                faceColor="var(--hero-text)"
                depthColor="var(--color-cocoa-ink)"
                tilt={7.5}
                pointerTracking
                smoothing={0.14}
                perspective={900}
                autoOrbit
                disableAutoOrbitOnMobile
                orbitSpeed={0.35}
                fontSize="inherit"
                fontWeight="inherit"
                shadow
              >
                <span className={styles.heroTitleLine}>
                  <span className={styles.heroTitleRoman} data-depth-word>From</span>
                  <span className={styles.heroTitleItalic} data-depth-word>Footage</span>
                </span>
                <span className={styles.heroTitleLine}>
                  <span className={styles.heroTitleRoman} data-depth-word>to</span>
                  <span className={styles.heroTitleItalic} data-depth-word>Feeling</span>
                </span>
              </DepthText>
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
