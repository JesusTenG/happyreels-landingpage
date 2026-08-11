"use client";

import { useId, useLayoutEffect, useRef } from "react";

import styles from "./BrandMark.module.css";

type Props = Readonly<{
  size?: "navigation" | "footer";
  accent?: "yellow" | "brown" | "solid-brown" | "light" | "dark" | "white" | "progress";
  className?: string;
  reveal?: "viewport" | "intro" | "immediate" | "none";
  revealDelay?: number;
  interactive?: boolean;
}>;

export function BrandMark({
  size = "navigation",
  accent = "yellow",
  className,
  reveal = "viewport",
  revealDelay = 0,
  interactive = false,
}: Props) {
  const markRef = useRef<HTMLSpanElement>(null);
  const instanceId = useId().replaceAll(":", "");
  const letterHMaskId = `happyreels-h-mask-${instanceId}`;
  const letterRMaskId = `happyreels-r-mask-${instanceId}`;
  const smileMaskId = `happyreels-smile-mask-${instanceId}`;

  useLayoutEffect(() => {
    const mark = markRef.current;
    if (!mark) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    mark.dataset.logoReady = "true";
    delete mark.dataset.logoRevealed;

    if (reducedMotion.matches || reveal === "none") {
      mark.dataset.logoRevealed = "true";
      return;
    }

    let animationTimer = 0;
    let observer: IntersectionObserver | null = null;

    const startReveal = () => {
      animationTimer = window.setTimeout(() => {
        mark.dataset.logoRevealed = "true";
      }, revealDelay);
    };

    if (reveal === "viewport") {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          startReveal();
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.28 },
      );
      observer.observe(mark);
    } else {
      startReveal();
    }

    return () => {
      observer?.disconnect();
      if (animationTimer) window.clearTimeout(animationTimer);
    };
  }, [reveal, revealDelay]);

  return (
    <span
      ref={markRef}
      className={[styles.mark, styles[size], className].filter(Boolean).join(" ")}
      data-accent={accent}
      data-interactive={interactive || undefined}
    >
      <svg
        aria-hidden="true"
        className={styles.svg}
        focusable="false"
        viewBox="0 0 548 432"
      >
        <defs>
          <mask
            id={letterHMaskId}
            x="-24"
            y="-24"
            width="270"
            height="390"
            maskUnits="userSpaceOnUse"
          >
            <path
              className={`${styles.letterReveal} ${styles.hStemReveal}`}
              d="M29-16V352"
              fill="none"
              pathLength="1"
              stroke="white"
              strokeLinecap="round"
              strokeWidth="62"
            />
            <path
              className={`${styles.letterReveal} ${styles.hShoulderReveal}`}
              d="M49 179C80 143 122 140 155 161C177 178 184 199 184 228V317"
              fill="none"
              pathLength="1"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="68"
            />
          </mask>
          <mask
            id={letterRMaskId}
            x="332"
            y="98"
            width="240"
            height="250"
            maskUnits="userSpaceOnUse"
          >
            <path
              className={`${styles.letterReveal} ${styles.rReveal}`}
              d="M389 321V224C389 177 421 151 468 151C501 151 527 167 544 184"
              fill="none"
              pathLength="1"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="66"
            />
          </mask>
          <mask
            id={smileMaskId}
            x="0"
            y="-32"
            width="548"
            height="496"
            maskUnits="userSpaceOnUse"
          >
            <path
              className={styles.smileDraw}
              d="M181 315C188 369 229 408 285 408S382 369 389 315"
              fill="none"
              pathLength="1"
              stroke="white"
              strokeLinecap="round"
              strokeWidth="58"
            />
          </mask>
        </defs>
        <g className={styles.letterH}>
          <path
            className={styles.letter}
            d="M7 1h44a5 5 0 0 1 5 5v143c15-13 34-21 55-21 59 0 101 39 101 94v80a5 5 0 0 1-5 5h-44a5 5 0 0 1-5-5v-78c0-31-20-52-49-52-30 0-53 22-53 53v106a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5Z"
            mask={`url(#${letterHMaskId})`}
          />
        </g>
        <g className={styles.letterR}>
          <path
            className={styles.letter}
            d="M367 307a5 5 0 0 1-5-5v-79c0-57 43-95 105-95 36 0 66 16 82 45 2 4 2 8 0 11-1 3-4 4-8 4h-37c-8-13-20-20-37-20-30 0-50 22-50 55v79a5 5 0 0 1-5 5h-45Z"
            mask={`url(#${letterRMaskId})`}
          />
        </g>
        <g className={styles.smileMotion}>
          <path
            className={styles.smile}
            d="M155 315h53c3 39 35 70 77 70s74-31 78-70h52c-4 66-60 116-130 116S159 381 155 315Z"
            mask={`url(#${smileMaskId})`}
          />
        </g>
      </svg>
    </span>
  );
}
