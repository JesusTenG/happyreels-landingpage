import Image from "next/image";

import { ParallaxMedia } from "@/components/animation/ParallaxMedia";
import { Reveal } from "@/components/animation/Reveal";
import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { aboutContent } from "@/data/about-content";
import type { Locale } from "@/i18n/config";

import styles from "./AboutPage.module.css";

const IMAGES = [
  "/assets/hero/hero-frame-02-fitness-filming.webp",
  "/assets/hero/hero-frame-03-cutter-desktop.webp",
] as const;

export function AboutPage({ locale }: Readonly<{ locale: Locale }>) {
  const copy = aboutContent[locale];

  return (
    <main id="main-content" className={styles.main}>
      <section className={styles.hero} aria-labelledby="about-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.heroInner}`}>
          <h1 id="about-title"><MixedHeadline text={copy.title} /></h1>
          <p>{copy.lead}</p>
        </Reveal>
      </section>
      <SectionWave from="var(--color-dusty-blush)" to="var(--color-cocoa-ink)" flip />
      <section className={styles.story} aria-labelledby="founder-title" data-navbar-theme="rose">
        <div className={`container-base ${styles.storyGrid}`}>
          <Reveal className={styles.storyCopy}>
            <h2 id="founder-title"><MixedHeadline text={copy.founderTitle} tone="gold" /></h2>
            <p>{copy.founderBody}</p>
          </Reveal>
          <ParallaxMedia className={styles.mediaWrap}>
            <figure><Image src={IMAGES[0]} alt={copy.imageAlt[0]} fill sizes="(max-width: 760px) 92vw, 46vw" /></figure>
          </ParallaxMedia>
        </div>
      </section>
      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-soft-clay)" />
      <section className={styles.philosophy} aria-labelledby="philosophy-title" data-navbar-theme="brown">
        <div className={`container-base ${styles.philosophyGrid}`}>
          <ParallaxMedia className={styles.mediaWrap} strength="medium">
            <figure><Image src={IMAGES[1]} alt={copy.imageAlt[1]} fill sizes="(max-width: 760px) 92vw, 45vw" /></figure>
          </ParallaxMedia>
          <Reveal className={styles.storyCopy} direction="right">
            <h2 id="philosophy-title"><MixedHeadline text={copy.philosophyTitle} /></h2>
            <p>{copy.philosophyBody}</p>
          </Reveal>
        </div>
      </section>
      <SectionWave from="var(--color-soft-clay)" to="var(--color-happy-gold)" flip />
      <section className={styles.cta} aria-labelledby="about-cta-title" data-navbar-theme="brown">
        <Reveal className={`container-base ${styles.ctaInner}`}>
          <h2 id="about-cta-title"><MixedHeadline text={copy.ctaTitle} /></h2>
          <HappyReelsButton href={`/${locale}#contact`} variant="on-yellow">{copy.cta}</HappyReelsButton>
        </Reveal>
      </section>
      <SectionWave from="var(--color-happy-gold)" to="var(--color-cocoa-ink)" />
    </main>
  );
}
