"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import styles from "./Reveal.module.css";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}>;

export function Reveal({ children, className, delay = 0, direction = "up" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReady(true);

    if (reducedMotion.matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, styles[direction], className].filter(Boolean).join(" ")}
      data-ready={ready || undefined}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
