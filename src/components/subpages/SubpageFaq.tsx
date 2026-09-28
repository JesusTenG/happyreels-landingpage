"use client";

import { ChevronDown } from "lucide-react";
import { Accordion } from "radix-ui";

import homeStyles from "@/components/home/FAQSection.module.css";
import styles from "./SubpageFaq.module.css";

type Props = Readonly<{
  title: string;
  items: readonly Readonly<{ question: string; answer: string }>[];
}>;

export function SubpageFaq({ title, items }: Props) {
  return (
    <section id="faq" className={`${homeStyles.section} ${styles.section}`} aria-labelledby="subpage-faq-title" data-navbar-theme="brown">
      <div className={`container-base ${homeStyles.layout} ${styles.layout}`}>
        <div className={`${homeStyles.heading} ${styles.heading}`}>
          <h2 id="subpage-faq-title">{title}</h2>
        </div>
        <Accordion.Root className={homeStyles.list} type="single" collapsible>
          {items.map((item, index) => (
            <Accordion.Item key={item.question} value={`faq-${index + 1}`} className={homeStyles.item} data-faq-item>
              <Accordion.Header className={homeStyles.header}>
                <Accordion.Trigger className={homeStyles.trigger}>
                  <span className={homeStyles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.question}</span>
                  <ChevronDown className={homeStyles.icon} aria-hidden="true" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className={homeStyles.content}>
                <div className={homeStyles.contentInner}><p>{item.answer}</p></div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
