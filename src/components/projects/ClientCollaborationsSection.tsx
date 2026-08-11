import { Reveal } from "@/components/animation/Reveal";
import {
  ScrollMotionGroup,
  ScrollMotionItem,
} from "@/components/animation/ScrollMotionGroup.client";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import {
  getClientStoriesForHomeSection,
  type ClientStory,
} from "@/data/client-stories";
import type { Locale } from "@/i18n/config";

import { ClientBentoCard } from "./ClientBentoCard";
import styles from "./ClientCollaborationsSection.module.css";

type Props = Readonly<{
  locale: Locale;
  variant?: "home" | "projects";
}>;

const COPY = {
  de: {
    title: "Partnerschaften, in denen aus starken Ideen wiedererkennbare Formate entstehen.",
    highlight: "wiedererkennbare Formate",
  },
  en: {
    title: "Partnerships where strong ideas grow into recognisable formats over time.",
    highlight: "recognisable formats",
  },
} as const;

const MOTION = [
  { yFrom: 60, yTo: 0, scaleFrom: 0.91, scaleTo: 1, start: 0.02, end: 0.5 },
  { yFrom: -44, yTo: 0, scaleFrom: 0.945, scaleTo: 1, start: 0.08, end: 0.5 },
  { yFrom: 44, yTo: 0, scaleFrom: 0.94, scaleTo: 1, start: 0.08, end: 0.5 },
] as const;

function slotClass(story: ClientStory): string {
  return story.bentoRole === "feature" ? styles.featureSlot : styles.stackSlot;
}

export function ClientCollaborationsSection({ locale, variant = "home" }: Props) {
  const copy = COPY[locale];
  const stories = getClientStoriesForHomeSection();

  return (
    <section
      className={styles.section}
      data-variant={variant}
      aria-labelledby={`${variant}-collaborations-title`}
      data-navbar-theme={variant === "home" ? "rose" : "brown"}
    >
      <div className="container-base">
        <Reveal className={styles.heading}>
          <h2 id={`${variant}-collaborations-title`}>
            <MixedHeadline text={copy.title} highlight={copy.highlight} />
          </h2>
        </Reveal>

        <ScrollMotionGroup className={styles.grid}>
          {stories.map((story, index) => {
            const motion = MOTION[index];

            return (
              <ScrollMotionItem
                key={story.slug}
                className={`${styles.slot} ${slotClass(story)}`}
                yFrom={motion.yFrom}
                yTo={motion.yTo}
                scaleFrom={motion.scaleFrom}
                scaleTo={motion.scaleTo}
                start={motion.start}
                end={motion.end}
              >
                <Reveal className={styles.cardReveal} delay={90 + index * 85}>
                  <ClientBentoCard locale={locale} story={story} />
                </Reveal>
              </ScrollMotionItem>
            );
          })}
        </ScrollMotionGroup>
      </div>
    </section>
  );
}
