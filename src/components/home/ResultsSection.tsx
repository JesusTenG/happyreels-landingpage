import { Reveal } from "@/components/animation/Reveal";
import {
  ScrollMotionGroup,
  ScrollMotionItem,
} from "@/components/animation/ScrollMotionGroup.client";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import type { Locale } from "@/i18n/config";

import styles from "./ResultsSection.module.css";

type Props = Readonly<{ locale: Locale }>;

const RESULTS = {
  en: {
    title: "Great edits turn attention into lasting impact.",
    titleHighlight: "attention",
    cards: [
      {
        title: "Stops the scroll",
        text: "Strong openings and clear pacing stop the scroll.",
      },
      {
        title: "Holds attention",
        text: "Every cut is designed to keep the story moving.",
      },
      {
        title: "Builds recall",
        text: "A consistent visual language makes your content recognizable.",
      },
    ],
  },
  de: {
    title: "Starke Edits verwandeln Aufmerksamkeit in echte Wirkung.",
    titleHighlight: "Aufmerksamkeit",
    cards: [
      {
        title: "Stoppt den Scroll",
        text: "Starke Einstiege und klares Pacing stoppen den Scroll.",
      },
      {
        title: "Hält die Spannung",
        text: "Jeder Cut hält die Geschichte gezielt in Bewegung.",
      },
      {
        title: "Bleibt im Kopf",
        text: "Eine konsistente Bildsprache macht deinen Content wiedererkennbar.",
      },
    ],
  },
} as const;

const MOTION = [
  { yFrom: 22, yTo: -16, scaleFrom: 0.94, scaleTo: 1.015, start: 0.03, end: 0.9 },
  { yFrom: -12, yTo: 14, scaleFrom: 0.965, scaleTo: 1.02, start: 0.1, end: 0.98 },
  { yFrom: 16, yTo: -10, scaleFrom: 0.95, scaleTo: 1.01, start: 0, end: 0.84 },
] as const;

export function ResultsSection({ locale }: Props) {
  const copy = RESULTS[locale];

  return (
    <section
      id="results"
      className={styles.section}
      aria-labelledby="results-title"
      data-navbar-theme="brown"
    >
      <div className="container-base">
        <Reveal>
          <h2 id="results-title" className={styles.title}>
            <MixedHeadline text={copy.title} highlight={copy.titleHighlight} />
          </h2>
        </Reveal>
        <ScrollMotionGroup className={styles.grid}>
          {copy.cards.map((card, index) => {
            const motion = MOTION[index];

            return (
              <ScrollMotionItem
                key={card.title}
                className={styles.motionItem}
                yFrom={motion.yFrom}
                yTo={motion.yTo}
                scaleFrom={motion.scaleFrom}
                scaleTo={motion.scaleTo}
                start={motion.start}
                end={motion.end}
              >
                <Reveal className={styles.cardReveal} delay={120 + index * 95}>
                  <article className={styles.card} data-result-card={index + 1}>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                </Reveal>
              </ScrollMotionItem>
            );
          })}
        </ScrollMotionGroup>
      </div>
    </section>
  );
}
