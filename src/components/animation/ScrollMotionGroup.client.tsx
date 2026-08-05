"use client";

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import styles from "./ScrollMotionGroup.module.css";

type GroupProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

type ItemProps = Readonly<{
  children: ReactNode;
  className?: string;
  yFrom?: number;
  yTo?: number;
  scaleFrom?: number;
  scaleTo?: number;
  start?: number;
  end?: number;
}> & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className">;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

function readNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseFloat(value ?? "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function ScrollMotionGroup({ children, className }: GroupProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-card]"));
    if (items.length === 0 || reducedMotion.matches) return;

    let active = false;
    let animationFrame = 0;

    const update = () => {
      animationFrame = 0;
      if (!active) return;

      const viewportHeight = window.innerHeight;
      const viewportFactor = window.innerWidth <= 760 ? 0.1 : window.innerWidth <= 1024 ? 0.52 : 1;
      const scaleFactor = window.innerWidth <= 760 ? 0.35 : window.innerWidth <= 1024 ? 0.72 : 1;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const rawProgress = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
          0,
          1,
        );
        const start = readNumber(item.dataset.scrollStart, 0);
        const end = readNumber(item.dataset.scrollEnd, 1);
        const mapped = clamp((rawProgress - start) / Math.max(end - start, 0.01), 0, 1);
        const progress = mapped * mapped * (3 - 2 * mapped);
        const y = mix(
          readNumber(item.dataset.scrollYFrom, 0),
          readNumber(item.dataset.scrollYTo, 0),
          progress,
        ) * viewportFactor;
        const mappedScale = mix(
          readNumber(item.dataset.scrollScaleFrom, 1),
          readNumber(item.dataset.scrollScaleTo, 1),
          progress,
        );
        const scale = 1 + (mappedScale - 1) * scaleFactor;

        item.style.setProperty("--scroll-y", `${y.toFixed(2)}px`);
        item.style.setProperty("--scroll-scale", scale.toFixed(4));
      });
    };

    const scheduleUpdate = () => {
      if (!active || animationFrame) return;
      animationFrame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = Boolean(entry?.isIntersecting);
        root.toggleAttribute("data-scroll-active", active);
        if (active) scheduleUpdate();
      },
      { rootMargin: "30% 0px 30% 0px" },
    );

    observer.observe(root);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={rootRef} className={[styles.group, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function ScrollMotionItem({
  children,
  className,
  yFrom = 0,
  yTo = 0,
  scaleFrom = 1,
  scaleTo = 1,
  start = 0,
  end = 1,
  ...props
}: ItemProps) {
  return (
    <div
      {...props}
      className={[styles.item, className].filter(Boolean).join(" ")}
      data-scroll-card
      data-scroll-y-from={yFrom}
      data-scroll-y-to={yTo}
      data-scroll-scale-from={scaleFrom}
      data-scroll-scale-to={scaleTo}
      data-scroll-start={start}
      data-scroll-end={end}
    >
      {children}
    </div>
  );
}
