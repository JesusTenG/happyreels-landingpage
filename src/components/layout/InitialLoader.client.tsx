"use client";

import { useEffect, useState } from "react";

import { BrandMark } from "@/components/brand/BrandMark";
import type { Locale } from "@/i18n/config";

import styles from "./InitialLoader.module.css";

type Props = Readonly<{ locale: Locale }>;
type LoaderPhase = "visible" | "leaving" | "hidden";

export function InitialLoader({ locale }: Props) {
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pageContent = document.querySelector<HTMLElement>("#site-content");

    if (pageContent) pageContent.inert = true;

    const leaveTimer = window.setTimeout(
      () => {
        document.documentElement.removeAttribute("data-site-intro");
        setPhase("leaving");
      },
      reducedMotion ? 180 : 2250,
    );
    const hideTimer = window.setTimeout(
      () => {
        setPhase("hidden");
        if (pageContent) pageContent.inert = false;
      },
      reducedMotion ? 260 : 3000,
    );

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
      document.documentElement.removeAttribute("data-site-intro");
      if (pageContent) pageContent.inert = false;
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={styles.root}
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label={locale === "de" ? "HappyReels wird geladen" : "HappyReels is loading"}
    >
      <div className={styles.inner}>
        <BrandMark
          size="footer"
          accent="dark"
          reveal="intro"
          className={styles.logo}
        />
        <p className={styles.wordmark} aria-hidden="true">
          happyreels
        </p>
      </div>
    </div>
  );
}
