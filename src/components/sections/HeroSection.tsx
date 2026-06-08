import type { Dictionary } from "@/i18n/dictionaries";
import { HeroGradientPanels } from "@/components/hero/HeroGradientPanels";
import { HeroSectionBackground } from "@/components/hero/HeroSectionBackground.client";
import { HeroVideoPreload } from "@/components/hero/HeroVideoPreload";
import { HeroVisualModeToggle } from "@/components/hero/HeroVisualModeToggle.client";
import { contactCtaClassNames } from "@/components/ui/contactCtaButton";
import SVisualsButton from "@/components/ui/SVisualsButton";
import { introCssProperties } from "@/lib/introAnimationTiming";

import styles from "./HeroSection.module.css";

/** Layout debug: panel stripes, center line, boxes around VISUALS. Set to false when done. */
const HERO_LAYOUT_DEBUG = false;

type Props = Readonly<{
  dict: Dictionary;
}>;

export function HeroSection({ dict }: Props) {
  return (
    <section
      id="hero"
      className={`${styles.hero}${HERO_LAYOUT_DEBUG ? ` ${styles["hero--layout-debug"]}` : ""}`}
      style={introCssProperties()}
      aria-labelledby="hero-heading"
    >
      <HeroVideoPreload />
      <div className={styles["hero-background"]} data-hero-background>
        <HeroGradientPanels />
        <HeroSectionBackground />
      </div>

      <div className={styles["hero-overlay"]} aria-hidden="true" />

      <div className={styles["hero-inner"]}>
        <div className={styles["hero-content"]}>
          <h1 id="hero-heading" className="sr-only">
            {dict.hero.seoH1}
          </h1>

          <p
            className={`${styles["hero-eyebrow"]} ${styles["hero-enter"]} ${styles["hero-enter-d1"]}`}
          >
            {dict.hero.eyebrow}
          </p>

          <div className={styles["hero-headline"]} aria-hidden="true">
            <span
              className={`${styles["hero-headline-text"]} ${styles["hero-enter"]} ${styles["hero-enter-d2"]}`}
            >
              {dict.hero.headline}
            </span>
          </div>

          <p
            className={`${styles["hero-subline"]} ${styles["hero-enter"]} ${styles["hero-enter-d3"]}`}
          >
            {dict.hero.subline}
          </p>

          <ul
            className={`${styles["hero-service-list"]} ${styles["hero-enter"]} ${styles["hero-enter-d4"]}`}
            aria-label={dict.services.title}
          >
            {dict.hero.services.map((label, i) => (
              <li key={label} className={styles["hero-service-item"]}>
                {i > 0 ? (
                  <span className={styles["hero-service-dot"]} aria-hidden="true" />
                ) : null}
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div
            className={`${styles["hero-actions"]} ${styles["hero-enter-fade"]} ${styles["hero-enter-d5"]}`}
          >
            <SVisualsButton
              href={dict.hero.primaryCtaHref}
              showIcon={false}
              className={`${contactCtaClassNames.primary} ${contactCtaClassNames.prominent}`}
            >
              {dict.hero.primaryCta}
            </SVisualsButton>
          </div>
        </div>
      </div>

      <HeroVisualModeToggle dict={dict} />

      <div className={`${styles["hero-scroll"]} ${styles["hero-scroll-intro"]}`}>
        <span className={styles["hero-scroll-line"]} aria-hidden="true" />
        <span className={styles["hero-scroll-label"]}>{dict.hero.scrollLabel}</span>
      </div>
    </section>
  );
}
