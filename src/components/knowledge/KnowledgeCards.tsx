import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { getKnowledgeContent, knowledgeImages, knowledgeKeys } from "@/data/knowledge-content";
import type { Locale } from "@/i18n/config";
import { getKnowledgePath, type KnowledgeKey } from "@/lib/route-config";

import styles from "./KnowledgeCards.module.css";

type Props = Readonly<{
  locale: Locale;
  exclude?: KnowledgeKey;
  keys?: readonly KnowledgeKey[];
}>;

export function KnowledgeCards({ locale, exclude, keys = knowledgeKeys }: Props) {
  const visibleKeys = keys.filter((key) => key !== exclude);

  return (
    <div className={styles.grid} data-count={visibleKeys.length}>
      {visibleKeys.map((key, index) => {
        const item = getKnowledgeContent(key, locale);
        return (
          <Link
            key={key}
            href={getKnowledgePath(locale, key)}
            className={styles.card}
            data-card={index + 1}
          >
            <div className={styles.media}>
              <Image src={knowledgeImages[key]} alt="" fill sizes="(max-width: 700px) 92vw, 40vw" />
            </div>
            <div className={styles.copy}>
              <h3>{item.cardTitle}</h3>
              <ArrowUpRight size={22} aria-hidden="true" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
