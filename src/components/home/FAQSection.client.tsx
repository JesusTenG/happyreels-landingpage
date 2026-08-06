"use client";

import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";

import { Reveal } from "@/components/animation/Reveal";
import { MixedHeadline } from "@/components/ui/MixedHeadline";
import { faqContent } from "@/data/faq-content";
import type { Locale } from "@/i18n/config";

import styles from "./FAQSection.module.css";

type Props = Readonly<{ locale: Locale }>;

const COPY = {
  de: {
    title: "Alles, was du vor dem ersten Frame wissen solltest.",
    titleHighlight: "vor dem ersten Frame",
  },
  en: {
    title: "Everything you should know before the first frame begins.",
    titleHighlight: "before the first frame",
  },
} as const;

export function FAQSection({ locale }: Props) {
  const copy = COPY[locale];
  const items = faqContent[locale];

  return (
    <section
      id="faq"
      className={styles.section}
      aria-labelledby="faq-title"
      data-navbar-theme="brown"
    >
      <div className={`container-base ${styles.layout}`}>
        <Reveal className={styles.heading}>
          <h2 id="faq-title"><MixedHeadline text={copy.title} highlight={copy.titleHighlight} /></h2>
        </Reveal>

        <Accordion.Root className={styles.list} type="single" collapsible>
          {items.map((item, index) => (
            <Accordion.Item
              key={item.question}
              value={`faq-${index + 1}`}
              className={styles.item}
            >
              <Accordion.Header className={styles.header}>
                <Accordion.Trigger className={styles.trigger}>
                  <span className={styles.number} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.question}</span>
                  <ChevronDown className={styles.icon} aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={styles.content}>
                <div className={styles.contentInner}>
                  <p>{item.answer}</p>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
