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
  const accentText = highlight?.trim() || findAutomaticHighlight(text);
  const start = text.toLocaleLowerCase().lastIndexOf(accentText.toLocaleLowerCase());

  if (start < 0 || accentText.length === 0) return <>{text}</>;

  const accentClass = [
    styles.accent,
    tone === "gold" ? styles.gold : null,
    tone === "petal" ? styles.petal : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {text.slice(0, start)}
      <em className={accentClass}>{text.slice(start, start + accentText.length)}</em>
      {text.slice(start + accentText.length)}
    </>
  );
}
