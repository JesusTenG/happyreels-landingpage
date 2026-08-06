import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/animation/Reveal";
import {
  ScrollMotionGroup,
  ScrollMotionItem,
} from "@/components/animation/ScrollMotionGroup.client";
import type { Testimonial } from "@/content/testimonials";
import type { Locale } from "@/i18n/config";
import { getClientProjectPath } from "@/lib/route-config";

import styles from "./HomeTestimonials.module.css";

type Props = Readonly<{
  locale: Locale;
  testimonials: Testimonial[];
}>;

const PLACEHOLDERS = [
  { quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae sapien ut libero venenatis faucibus.", title: "Lorem Ipsum", subtitle: "Dolor sit amet" },
  { quote: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", title: "Consectetur", subtitle: "Adipiscing elit" },
  { quote: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.", title: "Sed do eiusmod", subtitle: "Tempor incididunt" },
  { quote: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.", title: "Ut labore", subtitle: "Et dolore magna" },
  { quote: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.", title: "Magna aliqua", subtitle: "Lorem ipsum" },
] as const;

const MOTION = [
  { yFrom: 24, yTo: -18, scaleFrom: 0.94, scaleTo: 1.015, start: 0.03, end: 0.9 },
  { yFrom: -18, yTo: 16, scaleFrom: 0.965, scaleTo: 1.02, start: 0.1, end: 0.98 },
  { yFrom: 18, yTo: -12, scaleFrom: 0.95, scaleTo: 1.01, start: 0, end: 0.84 },
  { yFrom: 30, yTo: -12, scaleFrom: 0.955, scaleTo: 1.02, start: 0.07, end: 0.93 },
  { yFrom: -12, yTo: 22, scaleFrom: 0.945, scaleTo: 1.015, start: 0.02, end: 0.88 },
  { yFrom: 24, yTo: -6, scaleFrom: 0.96, scaleTo: 1.02, start: 0.12, end: 0.99 },
] as const;

export function HomeTestimonials({ locale, testimonials }: Props) {
  return (
    <ScrollMotionGroup className={styles.grid}>
      {testimonials.map((testimonial, index) => (
        <ScrollMotionItem
          key={testimonial.id}
          className={styles.motionItem}
          yFrom={MOTION[index % MOTION.length].yFrom}
          yTo={MOTION[index % MOTION.length].yTo}
          scaleFrom={MOTION[index % MOTION.length].scaleFrom}
          scaleTo={MOTION[index % MOTION.length].scaleTo}
          start={MOTION[index % MOTION.length].start}
          end={MOTION[index % MOTION.length].end}
        >
          <Reveal delay={100 + index * 90}>
            <figure className={`${styles.card} ${styles.real}`} data-card={index + 1}>
              <blockquote>
                <p>“{testimonial.shortQuote ?? testimonial.quote}”</p>
              </blockquote>
              <figcaption>
                <span className={styles.avatar}>
                  {testimonial.avatarSrc ? (
                    <Image src={testimonial.avatarSrc} alt="" fill sizes="40px" />
                  ) : (
                    <span aria-hidden="true">{testimonial.authorName.slice(0, 1)}</span>
                  )}
                </span>
                <span className={styles.identity}>
                  <cite>{testimonial.authorName}</cite>
                  <small>
                    {[testimonial.authorRole, testimonial.brandName].filter(Boolean).join(" · ")}
                  </small>
                </span>
                {testimonial.clientStorySlug ? (
                  <Link
                    href={getClientProjectPath(locale, testimonial.clientStorySlug)}
                    aria-label={
                      locale === "de"
                        ? `Kooperation mit ${testimonial.authorName} ansehen`
                        : `View the collaboration with ${testimonial.authorName}`
                    }
                  >
                    <span aria-hidden="true">↗</span>
                  </Link>
                ) : null}
              </figcaption>
            </figure>
          </Reveal>
        </ScrollMotionItem>
      ))}

      {PLACEHOLDERS.map((placeholder, index) => {
        const motionIndex = testimonials.length + index;
        const motion = MOTION[motionIndex % MOTION.length];
        return (
          <ScrollMotionItem
            key={`${locale}-placeholder-${index + 1}`}
            className={styles.motionItem}
            yFrom={motion.yFrom}
            yTo={motion.yTo}
            scaleFrom={motion.scaleFrom}
            scaleTo={motion.scaleTo}
            start={motion.start}
            end={motion.end}
          >
            <Reveal delay={100 + motionIndex * 75}>
              <figure className={`${styles.card} ${styles.placeholder}`} data-card={motionIndex + 1}>
                <blockquote><p>“{placeholder.quote}”</p></blockquote>
                <figcaption>
                  <span className={`${styles.avatar} ${styles.placeholderAvatar}`} aria-hidden="true">
                    0{motionIndex + 1}
                  </span>
                  <span className={styles.identity}>
                    <cite>{placeholder.title}</cite>
                    <small>{placeholder.subtitle}</small>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </ScrollMotionItem>
        );
      })}
    </ScrollMotionGroup>
  );
}
