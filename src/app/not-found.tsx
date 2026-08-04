import Link from "next/link";
import { MixedHeadline } from "@/components/ui/MixedHeadline";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <div className={styles.shape} aria-hidden="true" />
      <p className={styles.code}>404</p>
      <h1><MixedHeadline text="This frame is missing." /></h1>
      <p>Die gesuchte Seite ist nicht mehr an dieser Stelle.</p>
      <Link href="/de">Zurück zu happyreels</Link>
    </main>
  );
}
