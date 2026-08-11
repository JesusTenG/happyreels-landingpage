"use client";

import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import styles from "./DepthText.module.css";

export interface DepthTextProps {
  text?: string;
  children?: ReactNode;
  layers?: number;
  depth?: number;
  faceColor?: string;
  depthColor?: string;
  tilt?: number;
  pointerTracking?: boolean;
  smoothing?: number;
  perspective?: number;
  autoOrbit?: boolean;
  disableAutoOrbitOnMobile?: boolean;
  orbitSpeed?: number;
  fontSize?: string;
  fontWeight?: number | string;
  shadow?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface DepthLayer {
  index: number;
  color: string;
  faceMix: number;
  transform: string;
}

const MAX_LAYERS = 64;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const getTransform = (rotateX: number, rotateY: number): string =>
  `rotateX(${rotateX.toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;

export default function DepthText({
  text = "Elevate",
  children,
  layers = 34,
  depth = 2.4,
  faceColor = "#f8fafc",
  depthColor = "#7c3aed",
  tilt = 7.5,
  pointerTracking = true,
  smoothing = 0.14,
  perspective = 900,
  autoOrbit = true,
  disableAutoOrbitOnMobile = false,
  orbitSpeed = 0.35,
  fontSize = "clamp(3rem, 12vw, 7rem)",
  fontWeight = 900,
  shadow = true,
  className = "",
  style = {},
}: DepthTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const stageRef = useRef<HTMLSpanElement | null>(null);

  const safeLayers = clamp(Math.round(Number(layers) || 1), 2, MAX_LAYERS);
  const safeDepth = clamp(Number(depth) || 0, 0, 12);
  const safeTilt = clamp(Number(tilt) || 0, 0, 12);
  const safeSmoothing = clamp(Number(smoothing) || 0.14, 0.02, 0.35);
  const safePerspective = clamp(Number(perspective) || 900, 300, 2000);
  const safeOrbitSpeed = clamp(Number(orbitSpeed) || 0, 0, 2);
  const content = children ?? text;

  const baseRotation = useMemo(
    () => ({ x: -safeTilt * 0.32, y: safeTilt * 0.42 }),
    [safeTilt],
  );

  const depthLayers = useMemo<DepthLayer[]>(
    () =>
      Array.from({ length: safeLayers }, (_, layerIndex) => {
        const index = safeLayers - layerIndex;
        const progress = safeLayers <= 1 ? 1 : index / safeLayers;
        const faceMix = Math.round((1 - progress * progress) * 72 + 4);

        return {
          index,
          faceMix,
          color: `color-mix(in srgb, ${faceColor} ${faceMix}%, ${depthColor})`,
          transform: `translateZ(${-index * safeDepth}px)`,
        };
      }),
    [safeLayers, safeDepth, faceColor, depthColor],
  );

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion;
    const canAutoOrbit =
      autoOrbit &&
      !(disableAutoOrbitOnMobile && window.matchMedia("(max-width: 760px)").matches);
    let frameId = 0;
    let activePointer = false;
    const startTime = performance.now();
    const current = { ...baseRotation };
    const target = { ...baseRotation };

    const applyTransform = () => {
      stage.style.transform = getTransform(current.x, current.y);
    };

    if (reducedMotion || (!canTrackPointer && !canAutoOrbit)) {
      applyTransform();
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      activePointer = true;
      const x = clamp(
        (event.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.8),
        -1,
        1,
      );
      const y = clamp(
        (event.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.8),
        -1,
        1,
      );

      target.x = baseRotation.x - y * safeTilt;
      target.y = baseRotation.y + x * safeTilt;
    };

    const resetPointer = () => {
      activePointer = false;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
    };

    if (canTrackPointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", resetPointer);
      window.addEventListener("blur", resetPointer);
    }

    const tick = (now: number) => {
      if ((!canTrackPointer || !activePointer) && canAutoOrbit) {
        const orbit = ((now - startTime) / 1000) * safeOrbitSpeed * Math.PI * 2;
        const amount = canTrackPointer ? 0.18 : 0.55;
        target.x = baseRotation.x + Math.sin(orbit) * safeTilt * amount;
        target.y = baseRotation.y + Math.cos(orbit * 0.85) * safeTilt * amount;
      }

      current.x += (target.x - current.x) * safeSmoothing;
      current.y += (target.y - current.y) * safeSmoothing;
      applyTransform();
      frameId = window.requestAnimationFrame(tick);
    };

    applyTransform();
    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (canTrackPointer) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", resetPointer);
        window.removeEventListener("blur", resetPointer);
      }
      window.cancelAnimationFrame(frameId);
    };
  }, [
    autoOrbit,
    baseRotation,
    disableAutoOrbitOnMobile,
    pointerTracking,
    safeOrbitSpeed,
    safeSmoothing,
    safeTilt,
  ]);

  const rootStyle = {
    ...style,
    "--depth-text-perspective": `${safePerspective}px`,
    "--depth-text-font-size": fontSize,
    "--depth-text-font-weight": fontWeight,
    "--depth-text-face-color": faceColor,
    "--depth-text-shadow": shadow
      ? `0 0.08em 0.2em rgba(0, 0, 0, 0.22), 0 0.2em 0.55em rgba(0, 0, 0, 0.18)`
      : "none",
  } as CSSProperties;

  return (
    <span ref={rootRef} className={`${styles.root} ${className}`.trim()} style={rootStyle}>
      <span ref={stageRef} className={styles.stage}>
        {depthLayers.map((layer) => (
          <span
            aria-hidden="true"
            className={styles.layer}
            key={layer.index}
            style={
              {
                "--depth-text-layer-color": layer.color,
                "--depth-layer-face-mix": `${layer.faceMix}%`,
                transform: layer.transform,
              } as CSSProperties
            }
          >
            {content}
          </span>
        ))}
        <span className={styles.face}>{content}</span>
      </span>
    </span>
  );
}
