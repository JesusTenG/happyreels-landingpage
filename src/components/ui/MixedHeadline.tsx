import { stripTrailingHeadingPeriod } from "@/lib/heading-text";

import styles from "./MixedHeadline.module.css";

type Props = Readonly<{
  text: string;
  highlight?: string;
  tone?: "warm" | "gold" | "petal";
}>;

function findAutomaticHighlight(text: string): string {
  const words = text.trim().split(/\s+/);
  return words.at(-1) ?? text;
}

export function MixedHeadline({ text, highlight, tone = "warm" }: Props) {
  const headingText = stripTrailingHeadingPeriod(text);
  const accentText = highlight?.trim() || findAutomaticHighlight(headingText);
  const start = headingText.toLocaleLowerCase().lastIndexOf(accentText.toLocaleLowerCase());

  if (start < 0 || accentText.length === 0) return <>{headingText}</>;

  const accentClass = [
    styles.accent,
    "hr-italic-marker",
    tone === "gold" ? styles.gold : null,
    tone === "petal" ? styles.petal : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {headingText.slice(0, start)}
      <em className={accentClass}>
        {headingText.slice(start, start + accentText.length)}
      </em>
      {headingText.slice(start + accentText.length)}
    </>
  );
}
