"use client";

import { Reveal } from "@/components/animation/Reveal";
import { MixedHeadline } from "@/components/ui/MixedHeadline";

import styles from "./SectionHeader.module.css";

type Props = Readonly<{
  eyebrow?: string;
  title: string;
  intro?: string;
  titleId?: string;
  align?: "center" | "start";
  headingLevel?: "h1" | "h2";
  className?: string;
}>;

export function SectionHeader({
  eyebrow,
  title,
  intro,
  titleId,
  align = "center",
  headingLevel = "h2",
  className,
}: Props) {
  const rootClass = [
    styles.header,
    align === "center" ? styles["header--center"] : styles["header--start"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textDirection = align === "start" ? "left" : "up";
  const HeadingTag = headingLevel;

  return (
    <header className={rootClass}>
      {eyebrow ? (
        <Reveal direction={textDirection} delay={0}>
          <p className={styles.eyebrow}>{eyebrow}</p>
        </Reveal>
      ) : null}
      <Reveal direction={textDirection} delay={eyebrow ? 80 : 0}>
        <HeadingTag id={titleId} className={styles.title}>
          <MixedHeadline text={title} />
        </HeadingTag>
      </Reveal>
      {intro ? (
        <Reveal direction={textDirection} delay={eyebrow ? 140 : 80}>
          <p className={styles.intro}>{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}
