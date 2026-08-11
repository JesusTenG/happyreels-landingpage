"use client";

import { useLayoutEffect, useRef } from "react";

import { BrandMark } from "@/components/brand/BrandMark";
import HappyReelsButton from "@/components/ui/HappyReelsButton";
import type { Locale } from "@/i18n/config";

import styles from "./WaveCtaSection.module.css";

type Props = Readonly<{ locale: Locale }>;

const CONNECTOR_WAVE_PATH =
  "M0 100C320 -18 960 138 1440 0V100H0Z";

const COPY = {
  de: {
    title: {
      lead: "Aus deinem",
      footage: "Footage",
      middle: "wird das",
      feeling: "Feeling",
      end: ", das im Kopf bleibt.",
    },
    cta: "Jetzt Projekt starten",
  },
  en: {
    title: {
      lead: "Your",
      footage: "footage",
      middle: "becomes the",
      feeling: "feeling",
      end: " people remember.",
    },
    cta: "Start your project now",
  },
} as const;

export function WaveCtaSection({ locale }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const copy = COPY[locale];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const surface = section?.querySelector<HTMLElement>("[data-cta-surface]");
    if (!section || !surface) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    section.dataset.ready = "true";

    if (reducedMotion.matches) {
      section.style.setProperty("--cta-stage-height", `${surface.getBoundingClientRect().height}px`);
      ["logo", "headline", "button"].forEach((part) => {
        section.style.setProperty(`--cta-${part}-opacity`, "1");
        section.style.setProperty(`--cta-${part}-y`, "0px");
      });
      section.inert = false;
      return;
    }

    let animationFrame = 0;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const update = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const sectionTop = section.getBoundingClientRect().top;
      const expandedHeight = surface.getBoundingClientRect().height;
      const start = viewportHeight * 0.86;
      const end = viewportHeight * 0.28;
      const progress = clamp((start - sectionTop) / Math.max(start - end, 1), 0, 1);
      const logoProgress = clamp((progress - 0.52) / 0.24, 0, 1);
      const headlineProgress = clamp((progress - 0.6) / 0.22, 0, 1);
      const buttonProgress = clamp((progress - 0.7) / 0.2, 0, 1);

      const setRevealProgress = (part: string, partProgress: number, distance: number) => {
        section.style.setProperty(`--cta-${part}-opacity`, partProgress.toFixed(3));
        section.style.setProperty(
          `--cta-${part}-y`,
          `${((1 - partProgress) * distance).toFixed(2)}px`,
        );
      };

      const stageHeight = expandedHeight * progress;

      section.style.setProperty("--cta-stage-height", `${stageHeight.toFixed(3)}px`);
      setRevealProgress("logo", logoProgress, 76);
      setRevealProgress("headline", headlineProgress, 62);
      setRevealProgress("button", buttonProgress, 54);
      section.inert = buttonProgress < 0.72;
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      section.inert = false;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.stage}
      aria-labelledby="wave-cta-title"
    >
      <svg
        className={`${styles.connectorWave} ${styles.upperConnector}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={CONNECTOR_WAVE_PATH} />
      </svg>
      <div className={styles.revealWindow}>
        <div className={styles.surface} data-cta-surface>
          <div className={styles.panel}>
            <div className={`container-base ${styles.inner}`}>
              <div className={styles.copy}>
                <h2 id="wave-cta-title">
                  {copy.title.lead}{" "}
                  <em className={`${styles.headlineAccent} hr-italic-marker`}>{copy.title.footage}</em>{" "}
                  {copy.title.middle}{" "}
                  <em className={`${styles.headlineAccent} hr-italic-marker`}>{copy.title.feeling}</em>
                  {copy.title.end}
                </h2>
                <HappyReelsButton
                  href={`/${locale}#contact`}
                  variant="on-yellow"
                  enableMovingBorder={false}
                  className={styles.cta}
                >
                  {copy.cta}
                </HappyReelsButton>
              </div>
              <span className={styles.logoMark} aria-hidden="true">
                <BrandMark
                  size="footer"
                  accent="solid-brown"
                  reveal="viewport"
                  revealDelay={260}
                  className={styles.logo}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <svg
        className={`${styles.connectorWave} ${styles.lowerConnector}`}
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={CONNECTOR_WAVE_PATH} />
      </svg>
    </section>
  );
}
