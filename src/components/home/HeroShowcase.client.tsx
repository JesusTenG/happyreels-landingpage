"use client";

import { useState } from "react";

import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import type { Locale } from "@/i18n/config";

import { HeroVideoStack } from "./HeroVideoStack";
import styles from "./HappyReelsHome.module.css";

type Props = Readonly<{
  locale: Locale;
  ctaLabel: string;
  projectsHref: string;
}>;

const HERO_VARIANTS = [
  {
    className: styles.heroRose,
    waveFrom: "var(--color-dusty-blush)",
  },
  {
    className: styles.heroSolidYellow,
    waveFrom: "var(--color-happy-gold)",
  },
  {
    className: styles.heroBrown,
    waveFrom: "var(--color-cocoa-ink)",
  },
] as const;

const HERO_VARIANT_COUNT = HERO_VARIANTS.length;

export function HeroShowcase({ locale, ctaLabel, projectsHref }: Props) {
  const [activeVariant, setActiveVariant] = useState(0);
  const currentVariant = HERO_VARIANTS[activeVariant];
  const nextVariant = (activeVariant + 1) % HERO_VARIANT_COUNT;
  const contactLabel = locale === "de" ? "Projekt starten" : "Start a project";
  const switcherLabel = locale === "de"
    ? `Hero-Variante ${nextVariant + 1} anzeigen`
    : `Show hero variant ${nextVariant + 1}`;

  return (
    <>
      <section
        id="hero"
        className={`${styles.hero} ${currentVariant.className}`}
        aria-labelledby="hero-title"
        data-navbar-theme={activeVariant === 2 ? "rose" : "brown"}
        data-hero-variant={activeVariant + 1}
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
              <HappyReelsButton
                href={projectsHref}
                variant={activeVariant === 2 ? "on-light" : "on-rose"}
              >
                {ctaLabel}
              </HappyReelsButton>
              <HappyReelsButton
                href={`/${locale}#contact`}
                variant="accent"
              >
                {contactLabel}
              </HappyReelsButton>
            </div>
          </div>

          <HeroVideoStack />
        </div>

        <button
          type="button"
          className={styles.heroVariantSwitcher}
          onClick={() => setActiveVariant(nextVariant)}
          aria-label={switcherLabel}
          title={switcherLabel}
        >
          <span>Hero</span>
          <span className={styles.heroVariantCount} aria-live="polite">
            {String(activeVariant + 1).padStart(2, "0")} / {String(HERO_VARIANT_COUNT).padStart(2, "0")}
          </span>
          <span className={styles.heroVariantArrow} aria-hidden="true">{"\u2192"}</span>
        </button>
      </section>

      <SectionWave from={currentVariant.waveFrom} to="var(--color-dusty-blush)" />
    </>
  );
}
