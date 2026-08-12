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
    const interactiveRoot = root;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const canTrackPointer = pointerTracking && finePointer && !reducedMotion;
    const viewportTarget = interactiveRoot.closest("h1") ?? interactiveRoot;
    const minimumFrameInterval = 1000 / 60;
    const rotationEpsilon = 0.01;
    let frameId = 0;
    let lastFrameTime = 0;
    let isInViewport = false;
    let pendingPointer: Readonly<{ x: number; y: number }> | null = null;
    const current = { ...baseRotation };
    const target = { ...baseRotation };

    const applyTransform = () => {
      stage.style.transform = getTransform(current.x, current.y);
    };

    const stopAndReset = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrameTime = 0;
      pendingPointer = null;
      current.x = baseRotation.x;
      current.y = baseRotation.y;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
      applyTransform();
    };

    function scheduleFrame() {
      if (frameId || !isInViewport || document.hidden) return;
      frameId = window.requestAnimationFrame(tick);
    }

    function tick(now: number) {
      frameId = 0;
      if (!isInViewport || document.hidden) return;

      if (lastFrameTime && now - lastFrameTime < minimumFrameInterval - 0.5) {
        scheduleFrame();
        return;
      }
      lastFrameTime = now;

      if (pendingPointer) {
        const rect = interactiveRoot.getBoundingClientRect();
        if (rect.width && rect.height) {
          const x = clamp(
            (pendingPointer.x - (rect.left + rect.width / 2)) / (rect.width * 0.8),
            -1,
            1,
          );
          const y = clamp(
            (pendingPointer.y - (rect.top + rect.height / 2)) / (rect.height * 0.8),
            -1,
            1,
          );

          target.x = baseRotation.x - y * safeTilt;
          target.y = baseRotation.y + x * safeTilt;
        }
        pendingPointer = null;
      }

      const deltaX = target.x - current.x;
      const deltaY = target.y - current.y;
      const isSettled =
        Math.abs(deltaX) <= rotationEpsilon &&
        Math.abs(deltaY) <= rotationEpsilon;

      if (isSettled) {
        current.x = target.x;
        current.y = target.y;
        applyTransform();
        lastFrameTime = 0;
        return;
      }

      current.x += deltaX * safeSmoothing;
      current.y += deltaY * safeSmoothing;
      applyTransform();
      scheduleFrame();
    }

    if (!canTrackPointer) {
      applyTransform();
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!isInViewport || document.hidden) return;

      pendingPointer = { x: event.clientX, y: event.clientY };
      scheduleFrame();
    };

    const resetPointer = () => {
      pendingPointer = null;
      target.x = baseRotation.x;
      target.y = baseRotation.y;
      scheduleFrame();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAndReset();
      }
    };

    const viewportObserver = new IntersectionObserver(([entry]) => {
      isInViewport = Boolean(entry?.isIntersecting);
      if (!isInViewport) stopAndReset();
    });

    applyTransform();
    viewportObserver.observe(viewportTarget);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", resetPointer);
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      viewportObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [
    baseRotation,
    pointerTracking,
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
