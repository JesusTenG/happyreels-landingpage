import { Camera, Film, Scissors, Sparkles } from "lucide-react";

import { Reveal } from "@/components/animation/Reveal";
import {
  ScrollMotionGroup,
  ScrollMotionItem,
} from "@/components/animation/ScrollMotionGroup.client";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { homeContent } from "@/data/home-content";
import type { Locale } from "@/i18n/config";

import styles from "./ServicesSection.module.css";

type Props = Readonly<{ locale: Locale }>;

const SERVICE_ICONS = [Camera, Scissors, Film, Sparkles] as const;

const MOTION = [
  { yFrom: 18, yTo: -14, scaleFrom: 0.95, scaleTo: 1.01, start: 0.02, end: 0.88 },
  { yFrom: -12, yTo: 16, scaleFrom: 0.97, scaleTo: 1.025, start: 0.1, end: 0.98 },
  { yFrom: 22, yTo: -10, scaleFrom: 0.94, scaleTo: 1, start: 0, end: 0.84 },
  { yFrom: -9, yTo: 15, scaleFrom: 0.96, scaleTo: 1.02, start: 0.08, end: 0.94 },
] as const;

export function ServicesSection({ locale }: Props) {
  const copy = homeContent[locale].services;

  return (
    <section
      id="services"
      className={styles.section}
      aria-labelledby="services-title"
      data-navbar-theme="brown"
    >
      <div className="container-base">
        <Reveal>
          <h2
            id="services-title"
            className={styles.title}
            aria-label={`${copy.title.lineOne} ${copy.title.lineTwoLead}${copy.title.lineTwoAccent} ${copy.title.lineThreeLead}${copy.title.lineThreeAccent}${copy.title.lineThreeEnd}`}
          >
            <span className={styles.titleLine}>{copy.title.lineOne}</span>
            <span className={styles.titleLine}>
              {copy.title.lineTwoLead}
              <em className={styles.titleAccent}>{copy.title.lineTwoAccent}</em>
            </span>
            <span className={styles.titleLine}>
              {copy.title.lineThreeLead}
              <em className={styles.titleAccent}>{copy.title.lineThreeAccent}</em>
              {copy.title.lineThreeEnd}
            </span>
          </h2>
        </Reveal>

        <ScrollMotionGroup className={styles.grid}>
          {copy.items.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            const motion = MOTION[index];

            return (
              <ScrollMotionItem
                key={service.title}
                className={styles.motionItem}
                yFrom={motion.yFrom}
                yTo={motion.yTo}
                scaleFrom={motion.scaleFrom}
                scaleTo={motion.scaleTo}
                start={motion.start}
                end={motion.end}
              >
                <Reveal delay={120 + index * 90}>
                  <article className={styles.card} data-service-card={index + 1}>
                    <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                    <span className={styles.icon} aria-hidden="true"><Icon /></span>
                    <div>
                      <h3><MixedHeadline text={service.title} /></h3>
                      <p>{service.text}</p>
                    </div>
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
