import type { ReactNode } from "react";

import styles from "./ParallaxMedia.module.css";

type Props = Readonly<{
  children: ReactNode;
  className?: string;
  strength?: "soft" | "medium";
}>;

export function ParallaxMedia({ children, className, strength = "soft" }: Props) {
  return (
    <div
      className={[styles.parallax, styles[strength], className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
