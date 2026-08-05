import type { Locale } from "@/i18n/config";

export type FaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export const faqContent: Record<Locale, readonly FaqItem[]> = {
  de: [
    {
      question: "Arbeitet HappyReels nur mit Creatorn?",
      answer:
        "Nein. HappyReels arbeitet sowohl mit Creatorn und Personal Brands als auch mit Unternehmen und Marken, die hochwertigen Social-Media-Content benötigen.",
    },
    {
      question: "Kann ich bereits aufgenommenes Rohmaterial einsenden?",
      answer:
        "Ja. Wir übernehmen vorhandenes Rohmaterial und schneiden daraus Reels, Shorts, YouTube-Videos oder andere Social-Formate.",
    },
    {
      question: "Übernimmt HappyReels auch den Videodreh?",
      answer:
        "Ja. Neben dem Editing kann HappyReels abhängig vom Projekt auch Konzeption, Videodreh und vollständige Videoproduktion übernehmen.",
    },
    {
      question: "Welche Plattformen und Formate werden unterstützt?",
      answer:
        "Die Inhalte werden unter anderem für Instagram Reels, TikTok, YouTube Shorts, klassische YouTube-Videos und weitere digitale Kampagnenformate produziert.",
    },
    {
      question: "Sind auch regelmäßige Content-Pakete möglich?",
      answer:
        "Ja. Neben einzelnen Projekten sind auch fortlaufende Zusammenarbeiten für regelmäßig erscheinenden Content möglich.",
    },
    {
      question: "Ist auch reines Editing ohne Videodreh möglich?",
      answer:
        "Ja. HappyReels kann vollständig mit bereits vorhandenem Material arbeiten und ausschließlich Schnitt und Postproduktion übernehmen.",
    },
    {
      question: "Können aus einer Produktion mehrere Formate entstehen?",
      answer:
        "Ja. Material kann für mehrere vereinbarte Formate aufbereitet werden, zum Beispiel als Reel, Short, längeres YouTube-Video oder ergänzender Kampagnen-Clip.",
    },
    {
      question: "Sind Untertitel, Motion Graphics und Color Grading möglich?",
      answer:
        "Ja. Abhängig vom Projekt können Untertitel, Motion Graphics, Sound Design und Color Grading Teil der Postproduktion sein.",
    },
    {
      question: "Wie läuft die Abstimmung während eines Projekts ab?",
      answer:
        "Zu Beginn werden Anforderungen, Format und visuelle Richtung geklärt. Schnittstände und Feedback werden anschließend persönlich und passend zum vereinbarten Umfang abgestimmt.",
    },
    {
      question: "Wie starte ich ein Projekt?",
      answer:
        "Über das Kontaktformular kann das Projekt kurz beschrieben werden. Anschließend werden Anforderungen, Umfang und mögliche nächste Schritte persönlich abgestimmt.",
    },
  ],
  en: [
    {
      question: "Does HappyReels only work with creators?",
      answer:
        "No. HappyReels works with creators and personal brands as well as companies and brands that need high-quality social media content.",
    },
    {
      question: "Can I send footage that has already been recorded?",
      answer:
        "Yes. Existing footage can be taken over in full and edited into reels, shorts, YouTube videos or other social formats.",
    },
    {
      question: "Can HappyReels handle the video shoot as well?",
      answer:
        "Yes. Depending on the project, HappyReels can support the concept, video shoot and complete production in addition to editing.",
    },
    {
      question: "Which platforms and formats are supported?",
      answer:
        "Content is produced for formats including Instagram Reels, TikTok, YouTube Shorts, long-form YouTube videos and other digital campaign formats.",
    },
    {
      question: "Are recurring content packages available?",
      answer:
        "Yes. Alongside individual projects, ongoing collaborations for regularly published content are also possible.",
    },
    {
      question: "Is editing without a video shoot possible?",
      answer:
        "Yes. HappyReels can work entirely with existing footage and handle only the editing and postproduction.",
    },
    {
      question: "Can one production be adapted into several formats?",
      answer:
        "Yes. Footage can be prepared for several agreed formats, such as a reel, short, longer YouTube video or supporting campaign clip.",
    },
    {
      question: "Can captions, motion graphics and color grading be included?",
      answer:
        "Yes. Depending on the project, captions, motion graphics, sound design and color grading can be part of postproduction.",
    },
    {
      question: "How is feedback handled during a project?",
      answer:
        "The requirements, format and visual direction are clarified first. Edit stages and feedback are then discussed personally within the agreed scope.",
    },
    {
      question: "How do I start a project?",
      answer:
        "Describe the project briefly through the contact form. The requirements, scope and possible next steps will then be discussed personally.",
    },
  ],
};
