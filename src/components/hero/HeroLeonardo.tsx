"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { SectionWave } from "@/components/layout/SectionWave";
import HappyReelsButton from "@/components/ui/HappyReelsButton";

import type { HeroVariantProps } from "./Hero.types";
import { HERO_LEONARDO_WORDS, renderTunnelCanvas } from "./HeroLeonardoCanvas";
import styles from "./HeroLeonardo.module.css";

const WORD_LAYER_CLASSES: Readonly<Record<string, string>> = {
  happy: styles.wordHappy,
  filming: styles.wordFilming,
  reels: styles.wordReels,
  edits: styles.wordEdits,
  cutting: styles.wordCutting,
  content: styles.wordContent,
  production: styles.wordProduction,
};

const HERO_HEADLINE_INTERVAL_MS = 5_000;

const HERO_HEADLINES = [
  {
    id: "footage-feeling",
    label: "From Footage to Feeling",
    lines: [
      { lead: "From", accent: "Footage" },
      { lead: "to", accent: "Feeling" },
    ],
  },
  {
    id: "stories-move",
    label: "Turning Raw Footage into Stories That Move",
    lines: [
      { lead: "Turning Raw", accent: "Footage" },
      { lead: "into Stories That", accent: "Move" },
    ],
  },
  {
    id: "stop-scroll",
    label: "Every Frame Crafted to Stop the Scroll",
    lines: [
      { lead: "Every Frame", accent: "Crafted" },
      { lead: "to Stop the", accent: "Scroll" },
    ],
  },
  {
    id: "stories-matter",
    label: "We Turn Raw Moments into Stories That Matter",
    lines: [
      { lead: "We Turn Raw", accent: "Moments" },
      { lead: "into Stories That", accent: "Matter" },
    ],
  },
  {
    id: "lasting-impression",
    label: "From the First Frame to a Lasting Impression",
    lines: [
      { lead: "From the First", accent: "Frame" },
      { lead: "to a Lasting", accent: "Impression" },
    ],
  },
  {
    id: "attention-lasts",
    label: "Turn Seconds of Attention into Something That Lasts",
    lines: [
      { lead: "Turn Seconds of", accent: "Attention" },
      { lead: "into Something That", accent: "Lasts" },
    ],
  },
] as const;

function WarpedHeadlineLine({
  lead,
  accent,
  startIndex,
}: Readonly<{ lead: string; accent: string; startIndex: number }>) {
  const text = `${lead} ${accent}`;

  return (
    <span className={styles.focusLine}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${startIndex + index}-${character}`}
          className={`${styles.warpLetter} ${
            character === " "
              ? index === lead.length
                ? styles.warpJoin
                : styles.warpSpace
              : ""
          }`}
          style={{ "--warp-index": startIndex + index } as CSSProperties}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export function HeroLeonardo({ locale, ctaLabel, projectsHref }: HeroVariantProps) {
  const rootRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const wordCanvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const backWallMeasureRef = useRef<HTMLDivElement>(null);
  const [headlineStep, setHeadlineStep] = useState(0);
  const isGerman = locale === "de";
  const headline = HERO_HEADLINES[headlineStep % HERO_HEADLINES.length];

  useEffect(() => {
    const root = rootRef.current;
    const headlineElement = headlineRef.current;
    if (!root || !headlineElement) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 820px)");
    let interval = 0;
    let isHeadlineVisible = false;
    let isHeroReady = root.dataset.heroReady === "true";

    const stopHeadlineCycle = () => {
      if (!interval) return;
      window.clearInterval(interval);
      interval = 0;
    };

    const syncHeadlineCycle = () => {
      const shouldCycle =
        isHeadlineVisible &&
        isHeroReady &&
        document.visibilityState === "visible" &&
        !mobileViewport.matches &&
        !reducedMotion.matches;

      if (!shouldCycle) {
        stopHeadlineCycle();
        return;
      }

      if (interval) return;
      interval = window.setInterval(() => {
        setHeadlineStep((step) => step + 1);
      }, HERO_HEADLINE_INTERVAL_MS);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isHeadlineVisible = entry.isIntersecting;
        syncHeadlineCycle();
      },
      { threshold: 0.5 },
    );
    visibilityObserver.observe(headlineElement);

    const readinessObserver = new MutationObserver(() => {
      isHeroReady = root.dataset.heroReady === "true";
      syncHeadlineCycle();
    });
    readinessObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-hero-ready"],
    });

    const handleActivityChange = () => {
      if (mobileViewport.matches) {
        setHeadlineStep(0);
      }
      syncHeadlineCycle();
    };
    document.addEventListener("visibilitychange", handleActivityChange);
    reducedMotion.addEventListener("change", handleActivityChange);
    mobileViewport.addEventListener("change", handleActivityChange);
    handleActivityChange();

    return () => {
      stopHeadlineCycle();
      visibilityObserver.disconnect();
      readinessObserver.disconnect();
      document.removeEventListener("visibilitychange", handleActivityChange);
      reducedMotion.removeEventListener("change", handleActivityChange);
      mobileViewport.removeEventListener("change", handleActivityChange);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scene = sceneRef.current;
    const backWallMeasure = backWallMeasureRef.current;
    const wordCanvases = wordCanvasRefs.current.filter(
      (canvas): canvas is HTMLCanvasElement => canvas !== null,
    );
    if (
      !root ||
      !scene ||
      !backWallMeasure ||
      wordCanvases.length !== HERO_LEONARDO_WORDS.length
    ) return;

    let renderFrame = 0;
    let isActive = true;
    let canvasReady = false;
    let fontsReady = false;
    let lastRenderSignature = "";

    const revealWhenReady = () => {
      if (
        canvasReady &&
        !document.documentElement.hasAttribute("data-site-intro")
      ) {
        root.dataset.heroReady = "true";
      }
    };

    const renderOnce = () => {
      renderFrame = 0;
      if (!isActive || !fontsReady) return;

      const width = scene.clientWidth;
      const height = scene.clientHeight;
      const backWidth = backWallMeasure.offsetWidth;
      const backHeight = backWallMeasure.offsetHeight;
      const rootStyle = getComputedStyle(root);
      const colorSignature = ["--leo-void", "--leo-gold"]
        .map((property) => rootStyle.getPropertyValue(property).trim())
        .join(":");
      const renderSignature = `${width}x${height}:${backWidth}x${backHeight}:${colorSignature}`;
      if (renderSignature === lastRenderSignature) return;

      const rendered = renderTunnelCanvas({
        canvases: wordCanvases,
        scope: root,
        width,
        height,
        backWidth,
        backHeight,
      });

      if (rendered) {
        lastRenderSignature = renderSignature;
        scene.dataset.renderLocked = "true";
      } else {
        scene.dataset.renderFailed = "true";
      }

      canvasReady = true;
      revealWhenReady();
    };

    const scheduleRender = () => {
      if (!isActive || !fontsReady || renderFrame) return;
      renderFrame = window.requestAnimationFrame(renderOnce);
    };

    const resizeObserver = new ResizeObserver(scheduleRender);
    resizeObserver.observe(scene);
    resizeObserver.observe(backWallMeasure);
    const paletteObserver = new MutationObserver(scheduleRender);
    paletteObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-brown-tone"],
    });
    const introObserver = new MutationObserver(revealWhenReady);
    introObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-site-intro"],
    });

    void document.fonts.ready.then(() => {
      if (!isActive) return;
      fontsReady = true;
      scheduleRender();
    });

    return () => {
      isActive = false;
      resizeObserver.disconnect();
      paletteObserver.disconnect();
      introObserver.disconnect();
      if (renderFrame) window.cancelAnimationFrame(renderFrame);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const zoomLayer = zoomLayerRef.current;
    const backWallMeasure = backWallMeasureRef.current;
    if (!root || !zoomLayer || !backWallMeasure) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let sectionStart = 0;
    let scrollDistance = 1;
    let viewportFillScale = 1;

    const renderZoom = () => {
      animationFrame = 0;
      const rawProgress = Math.min(
        1,
        Math.max(0, (window.scrollY - sectionStart) / scrollDistance),
      );
      let scale = 1;
      let cueOpacity = 1;

      if (!reducedMotion.matches) {
        const zoomProgress = Math.min(1, rawProgress / 0.82);
        const easedProgress = zoomProgress * zoomProgress * (3 - 2 * zoomProgress);

        scale = 1 + easedProgress * (viewportFillScale - 1);
        cueOpacity = Math.max(0, 1 - rawProgress * 3);
      }

      zoomLayer.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      root.style.setProperty("--leo-cue-opacity", cueOpacity.toFixed(3));
    };

    const requestZoomUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(renderZoom);
    };

    const measureZoom = () => {
      sectionStart = window.scrollY + root.getBoundingClientRect().top;
      scrollDistance = Math.max(root.offsetHeight - window.innerHeight, 1);
      viewportFillScale = Math.max(
        window.innerWidth / Math.max(backWallMeasure.offsetWidth, 1),
        window.innerHeight / Math.max(backWallMeasure.offsetHeight, 1),
      );
      renderZoom();
    };

    measureZoom();

    const handleReducedMotionChange = () => renderZoom();
    window.addEventListener("scroll", requestZoomUpdate, { passive: true });
    window.addEventListener("resize", measureZoom);
    reducedMotion.addEventListener("change", handleReducedMotionChange);

    return () => {
      window.removeEventListener("scroll", requestZoomUpdate);
      window.removeEventListener("resize", measureZoom);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <section
        ref={rootRef}
        id="hero"
        className={styles.root}
        aria-labelledby="hero-title"
        data-navbar-theme="brown"
        data-navbar-hero="deferred"
      >
        <div className={styles.viewport}>
          <div ref={zoomLayerRef} className={styles.zoomLayer} data-tunnel-zoom>
            <div ref={sceneRef} className={styles.perspectiveScene}>
              <div className={styles.wordLayers} aria-hidden="true">
                {HERO_LEONARDO_WORDS.map((word, index) => (
                  <span
                    key={word.id}
                    className={`${styles.wordLayer} ${WORD_LAYER_CLASSES[word.id]}`}
                  >
                    <canvas
                      ref={(node) => {
                        wordCanvasRefs.current[index] = node;
                      }}
                      className={styles.wordCanvas}
                    />
                  </span>
                ))}
              </div>
              <div className={styles.backWallSurface} aria-hidden="true" />
            </div>

            <div className={styles.mobileTunnel} aria-hidden="true">
              <div className={`${styles.mobilePlane} ${styles.mobileCeiling}`}>
                <span className={`${styles.mobileWord} ${styles.mobileHappy}`}>HAPPYREELS</span>
              </div>
              <div className={`${styles.mobilePlane} ${styles.mobileLeft}`}>
                <span className={`${styles.mobileWord} ${styles.mobileFilming}`}>FILMING</span>
                <span className={`${styles.mobileWord} ${styles.mobileReels}`}>REELS</span>
              </div>
              <div className={`${styles.mobilePlane} ${styles.mobileRight}`}>
                <span className={`${styles.mobileWord} ${styles.mobileEdits}`}>EDITS</span>
                <span className={`${styles.mobileWord} ${styles.mobileCutting}`}>CUTTING</span>
              </div>
              <div className={`${styles.mobilePlane} ${styles.mobileFloor}`}>
                <span className={`${styles.mobileWord} ${styles.mobileContent}`}>CONTENT</span>
                <span className={`${styles.mobileWord} ${styles.mobileProduction}`}>PRODUCTION</span>
              </div>
              <div className={styles.mobileBackWall} />
            </div>
          </div>

          <div ref={backWallMeasureRef} className={styles.backWallMeasure} aria-hidden="true" />

          <div className={styles.focusOverlay}>
            <div className={styles.focus}>
              <h1 ref={headlineRef} id="hero-title" aria-label={headline.label}>
                {HERO_HEADLINES.map((candidate, index) => {
                  const isActive = index === headlineStep % HERO_HEADLINES.length;
                  const wasActive =
                    headlineStep > 0 &&
                    index === (headlineStep - 1) % HERO_HEADLINES.length;

                  return (
                    <span
                      key={candidate.id}
                      className={`${styles.headlineSwap} ${
                        index === 0 && headlineStep === 0
                          ? styles.headlineInitial
                          : styles.headlineRotating
                      }`}
                      data-active={isActive ? "true" : undefined}
                      data-previous={wasActive ? "true" : undefined}
                      aria-hidden="true"
                    >
                      {candidate.lines.map((line, lineIndex) => {
                        const text = `${line.lead} ${line.accent}`;
                        const startIndex =
                          candidate.lines
                            .slice(0, lineIndex)
                            .reduce(
                              (total, previousLine) =>
                                total + Array.from(`${previousLine.lead} ${previousLine.accent}`).length,
                              0,
                            ) + lineIndex * 3;

                        return (
                          <WarpedHeadlineLine
                            key={text}
                            lead={line.lead}
                            accent={line.accent}
                            startIndex={startIndex}
                          />
                        );
                      })}
                    </span>
                  );
                })}
              </h1>
              <div className={styles.actions}>
                <HappyReelsButton
                  className={styles.primaryAction}
                  href={projectsHref}
                  variant="on-brown"
                >
                  {ctaLabel}
                </HappyReelsButton>
                <HappyReelsButton
                  className={styles.secondaryAction}
                  href={`/${locale}#contact`}
                  variant="on-light"
                >
                  {isGerman ? "Projekt starten" : "Start a project"}
                </HappyReelsButton>
              </div>
            </div>
          </div>

          <div className={styles.scrollCue} aria-hidden="true">
            <span />
            {isGerman ? "In die Idee eintauchen" : "Enter the idea"}
          </div>
        </div>
      </section>
      <SectionWave from="var(--color-cocoa-ink)" to="var(--color-dusty-blush)" />
    </>
  );
}
