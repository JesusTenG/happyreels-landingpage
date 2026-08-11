import type { Locale } from "@/i18n/config";
import type { ServiceKey } from "@/lib/route-config";

export type ServiceFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

type ServiceDetail = Readonly<{
  title: string;
  text: string;
}>;

export type ServiceSeoContent = Readonly<{
  searchLabel: string;
  detailsTitle: string;
  detailsIntro: string;
  details: readonly ServiceDetail[];
  proofTitle: string;
  proofIntro: string;
  proofVideoIds: readonly string[];
  expertiseTitle: string;
  expertiseBody: string;
  expertiseLinkLabel: string;
  faqTitle: string;
  faqs: readonly ServiceFaqItem[];
}>;

const content: Record<ServiceKey, Record<Locale, ServiceSeoContent>> = {
  videoProduction: {
    de: {
      searchLabel: "Social Media Videoproduktion",
      detailsTitle: "Was eine Social Media Videoproduktion konkret umfasst.",
      detailsIntro:
        "Der genaue Umfang richtet sich nach Ziel, Plattform und Materialbedarf. Diese Bausteine werden vor Produktionsbeginn transparent festgelegt.",
      details: [
        {
          title: "Konzept und Vorbereitung",
          text: "Zielgruppe, Kernaussage, Plattformen, visuelle Richtung, Motive und benötigte Assets werden vor dem Dreh abgestimmt.",
        },
        {
          title: "Dreh und Regie",
          text: "Kamera, Bildgestaltung und Regie orientieren sich am geplanten Einsatz – vom vertikalen Reel bis zum horizontalen Markenfilm.",
        },
        {
          title: "Schnitt und Ausspielung",
          text: "Der vereinbarte Umfang kann Schnitt, Sound, Farbe, Grafiken und Exporte für mehrere Plattformformate enthalten.",
        },
      ],
      proofTitle: "Ausgewählte Arbeiten aus Produktion und Postproduktion.",
      proofIntro:
        "Diese Beispiele zeigen Social Ads und Creator Content, bei denen Produktion, Schnitt und visueller Look als ein zusammenhängender Prozess gedacht wurden.",
      proofVideoIds: ["prep-my-meal-ad", "cinematic-gym-edit"],
      expertiseTitle: "Direkter kreativer Ansprechpartner statt Übergabekette.",
      expertiseBody:
        "HappyReels wird von Simon Saad geführt. Konzeption, Produktion und Postproduktion werden mit einer durchgängigen visuellen Richtung betreut – vom ersten Briefing bis zum finalen Export.",
      expertiseLinkLabel: "Mehr über HappyReels",
      faqTitle: "Fragen zur Social Media Videoproduktion.",
      faqs: [
        {
          question: "Was kostet eine Social Media Videoproduktion?",
          answer:
            "Die Kosten hängen unter anderem von Konzept, Drehtag, Teamgröße, Anzahl der Motive, gewünschter Videolänge und den benötigten Ausgabeformaten ab. Nach einem kurzen Briefing wird der Umfang als individuelles Angebot transparent festgehalten.",
        },
        {
          question: "Übernimmt HappyReels auch Konzept und Drehplanung?",
          answer:
            "Ja. Je nach Projekt können Konzeption, visuelle Richtung, Shotlist, Ablaufplanung, Dreh und vollständige Postproduktion zusammen umgesetzt werden.",
        },
        {
          question: "Können aus einem Drehtag mehrere Reels entstehen?",
          answer:
            "Ja. Wenn die benötigten Motive und Formate vorab geplant werden, kann ein Drehtag Material für mehrere Reels, Ads oder ergänzende Kampagnenclips liefern.",
        },
        {
          question: "Welche Formate werden geliefert?",
          answer:
            "Die Exporte werden vor Projektstart vereinbart. Möglich sind unter anderem vertikale Formate für Reels, TikTok und Shorts sowie horizontale Fassungen für YouTube, Websites oder Kampagnen.",
        },
        {
          question: "Ist eine Videoproduktion auch außerhalb eines festen Studios möglich?",
          answer:
            "Ja. Der passende Drehort wird anhand von Konzept, Motiv und organisatorischem Aufwand festgelegt. Details zu Ort, Anreise und benötigtem Equipment werden im Angebot geklärt.",
        },
      ],
    },
    en: {
      searchLabel: "Social media video production",
      detailsTitle: "What social media video production can include.",
      detailsIntro:
        "The exact scope depends on the goal, platform and required footage. These building blocks are agreed transparently before production begins.",
      details: [
        {
          title: "Concept and preparation",
          text: "The audience, core message, platforms, visual direction, locations and required assets are aligned before the shoot.",
        },
        {
          title: "Shoot and direction",
          text: "Camera, composition and direction follow the intended use, from a vertical reel to a horizontal brand film.",
        },
        {
          title: "Editing and delivery",
          text: "The agreed scope can include editing, sound, color, graphics and exports for several platform formats.",
        },
      ],
      proofTitle: "Selected work from production and postproduction.",
      proofIntro:
        "These examples show social ads and creator content where production, editing and the visual finish were developed as one connected process.",
      proofVideoIds: ["prep-my-meal-ad", "cinematic-gym-edit"],
      expertiseTitle: "One creative contact instead of a chain of handovers.",
      expertiseBody:
        "HappyReels is led by Simon Saad. Concept, production and postproduction are guided by one consistent visual direction from the first briefing to final delivery.",
      expertiseLinkLabel: "More about HappyReels",
      faqTitle: "Questions about social media video production.",
      faqs: [
        {
          question: "How much does social media video production cost?",
          answer:
            "Pricing depends on the concept, shoot duration, crew, number of setups, intended video length and required deliverables. After a short briefing, the scope is documented in a transparent individual quote.",
        },
        {
          question: "Can HappyReels handle the concept and shoot planning?",
          answer:
            "Yes. Depending on the project, the concept, visual direction, shot list, schedule, shoot and complete postproduction can be handled together.",
        },
        {
          question: "Can one shoot produce several reels?",
          answer:
            "Yes. When the required shots and formats are planned in advance, one shoot can provide material for several reels, ads or supporting campaign clips.",
        },
        {
          question: "Which formats are delivered?",
          answer:
            "Exports are agreed before the project begins. They can include vertical versions for Reels, TikTok and Shorts as well as horizontal versions for YouTube, websites or campaigns.",
        },
        {
          question: "Can production take place outside a fixed studio?",
          answer:
            "Yes. The location is chosen around the concept, subject and production requirements. Travel and equipment details are clarified in the quote.",
        },
      ],
    },
  },
  shortFormEditing: {
    de: {
      searchLabel: "Reels schneiden lassen",
      detailsTitle: "Was beim Reels schneiden lassen wirklich wichtig ist.",
      detailsIntro:
        "Ein fertiges Short-Form-Video entsteht nicht nur durch schnelle Cuts. Aussage, Rhythmus, Lesbarkeit und Plattform müssen zusammenpassen.",
      details: [
        {
          title: "Material und Story",
          text: "Rohmaterial, Kernbotschaft und gewünschte Zielgruppe bilden die Grundlage für Auswahl, Hook und Dramaturgie.",
        },
        {
          title: "Edit und Gestaltung",
          text: "Je nach Auftrag werden Schnitt, Untertitel, B-Roll, Sound Design, Motion Graphics und Color Grading kombiniert.",
        },
        {
          title: "Feedback und Exporte",
          text: "Feedbackschritte, Seitenverhältnisse und finale Dateiformate werden passend zum vereinbarten Umfang geliefert.",
        },
      ],
      proofTitle: "Reels und Short-Form Edits aus laufenden Kooperationen.",
      proofIntro:
        "Die Beispiele zeigen zwei unterschiedliche Editing-Sprachen: ruhiger Educational Content und dynamischer Creator Content für den Feed.",
      proofVideoIds: ["educational-reel", "creator-reel-ayo"],
      expertiseTitle: "Short-Form Editing mit Blick auf Inhalt und Identität.",
      expertiseBody:
        "HappyReels behandelt Hooks, Untertitel und Effekte nicht als isolierte Zutaten. Der Schnitt folgt der Aussage und entwickelt daraus einen wiedererkennbaren Rhythmus für wiederkehrenden Content.",
      expertiseLinkLabel: "Mehr über die Arbeitsweise",
      faqTitle: "Fragen zum Reels schneiden lassen.",
      faqs: [
        {
          question: "Kann ich eigenes Rohmaterial für den Reel-Schnitt senden?",
          answer:
            "Ja. HappyReels kann vollständig mit vorhandenem Material arbeiten. Hilfreich sind ein kurzes Briefing, die gewünschte Aussage, Plattform, Referenzen und vorhandene Markenassets.",
        },
        {
          question: "Was gehört zum Short-Form Editing?",
          answer:
            "Je nach vereinbartem Umfang können Materialauswahl, Story Edit, Untertitel, B-Roll, Musik, Sound Design, Motion Graphics, Color Grading und plattformgerechte Exporte enthalten sein.",
        },
        {
          question: "Schneidet HappyReels Reels, TikToks und YouTube Shorts?",
          answer:
            "Ja. Der Schnitt kann für Instagram Reels, TikTok und YouTube Shorts ausgelegt und bei Bedarf in mehreren vereinbarten Varianten exportiert werden.",
        },
        {
          question: "Sind regelmäßige Reel-Pakete möglich?",
          answer:
            "Ja. Neben einzelnen Videos sind fortlaufende Kooperationen möglich, bei denen Bildsprache, Übergabe und Feedbackprozess für wiederkehrende Veröffentlichungen vereinheitlicht werden.",
        },
        {
          question: "Wie viele Korrekturschleifen sind enthalten?",
          answer:
            "Die Anzahl der Feedback- und Korrekturschritte wird vor Projektbeginn passend zum Umfang vereinbart und im Angebot festgehalten.",
        },
      ],
    },
    en: {
      searchLabel: "Reels and short-form video editing",
      detailsTitle: "What matters when outsourcing reel editing.",
      detailsIntro:
        "A strong short-form video needs more than fast cuts. Message, rhythm, legibility and platform context have to work together.",
      details: [
        {
          title: "Footage and story",
          text: "The raw footage, key message and intended audience shape the selection, hook and narrative structure.",
        },
        {
          title: "Edit and design",
          text: "Depending on scope, editing, captions, B-roll, sound design, motion graphics and color grading are combined.",
        },
        {
          title: "Feedback and exports",
          text: "Feedback stages, aspect ratios and final file formats are delivered according to the agreed scope.",
        },
      ],
      proofTitle: "Reels and short-form edits from ongoing collaborations.",
      proofIntro:
        "The examples show two distinct editing languages: calm educational content and faster creator content built for the feed.",
      proofVideoIds: ["educational-reel", "creator-reel-ayo"],
      expertiseTitle: "Short-form editing shaped around content and identity.",
      expertiseBody:
        "HappyReels does not treat hooks, captions and effects as isolated ingredients. The edit follows the message and develops a recognisable rhythm for recurring content.",
      expertiseLinkLabel: "More about the approach",
      faqTitle: "Questions about reel and short-form editing.",
      faqs: [
        {
          question: "Can I send my own footage for reel editing?",
          answer:
            "Yes. HappyReels can work entirely with existing footage. A short brief, intended message, platform, references and available brand assets are helpful.",
        },
        {
          question: "What is included in short-form editing?",
          answer:
            "Depending on scope, footage selection, story editing, captions, B-roll, music, sound design, motion graphics, color grading and platform-ready exports can be included.",
        },
        {
          question: "Does HappyReels edit Reels, TikToks and YouTube Shorts?",
          answer:
            "Yes. The edit can be designed for Instagram Reels, TikTok and YouTube Shorts and delivered in several agreed variants when required.",
        },
        {
          question: "Are recurring reel packages available?",
          answer:
            "Yes. Alongside individual videos, ongoing collaborations can standardise the visual language, file handover and feedback process for recurring releases.",
        },
        {
          question: "How many revision rounds are included?",
          answer:
            "The number of feedback and revision stages is agreed before the project begins and documented in the quote.",
        },
      ],
    },
  },
  youtubeEditing: {
    de: {
      searchLabel: "YouTube Videos schneiden lassen",
      detailsTitle: "Was professionelles YouTube Editing abdeckt.",
      detailsIntro:
        "Long-Form Editing ordnet umfangreiches Material, schützt den natürlichen Ton des Formats und hält Zuschauer durch klare inhaltliche Führung im Video.",
      details: [
        {
          title: "Sichtung und Struktur",
          text: "Rohmaterial, wichtige Aussagen, Kapitel und wiederkehrende Elemente werden zu einer belastbaren inhaltlichen Linie geordnet.",
        },
        {
          title: "Feinschnitt und Ausbau",
          text: "Pacing, B-Roll, Grafiken, Musik, Sound und Farbe werden gezielt ergänzt, ohne den Inhalt zu überladen.",
        },
        {
          title: "Episode und Cutdowns",
          text: "Neben dem Long-Form-Master können vereinbarte Trailer oder Short-Form-Cutdowns aus geeigneten Momenten entstehen.",
        },
      ],
      proofTitle: "Podcast-Momente für YouTube und Social weitergedacht.",
      proofIntro:
        "Die sichtbaren Beispiele zeigen, wie längere Gespräche in klare Trailer und eigenständige Social Cuts übersetzt werden können.",
      proofVideoIds: ["podcast-trailer", "podcast-short"],
      expertiseTitle: "Editing, das zuerst zuhört und dann verdichtet.",
      expertiseBody:
        "Bei Gesprächen, Education und Creator-Formaten steht die inhaltliche Linie vor visuellen Effekten. So bleibt die Persönlichkeit erhalten, während Struktur und Tempo deutlich präziser werden.",
      expertiseLinkLabel: "Mehr über HappyReels",
      faqTitle: "Fragen zum YouTube Videos schneiden lassen.",
      faqs: [
        {
          question: "Welche YouTube-Formate kann HappyReels schneiden?",
          answer:
            "Möglich sind unter anderem Video-Podcasts, Interviews, Educational Content, Creator-Formate und andere Long-Form-Videos. Der genaue Editing-Stil wird auf Format und Zielgruppe abgestimmt.",
        },
        {
          question: "Kann ich mehrere Stunden Rohmaterial übergeben?",
          answer:
            "Ja. Umfang, gewünschte Episodenlänge, Markierungen und inhaltliche Prioritäten sollten vorab geklärt werden, damit Sichtung und Struktur realistisch angeboten werden können.",
        },
        {
          question: "Können aus einem YouTube-Video auch Shorts entstehen?",
          answer:
            "Ja. Geeignete Momente können im vereinbarten Umfang als Trailer, Reels oder YouTube Shorts aufbereitet werden.",
        },
        {
          question: "Welche Dateien werden für den Start benötigt?",
          answer:
            "Benötigt werden das Rohmaterial sowie nach Möglichkeit Briefing, Markenassets, Musik- oder Grafikvorgaben, Referenzen und Hinweise zu wichtigen Aussagen oder Timecodes.",
        },
        {
          question: "Wie läuft das Feedback bei längeren Videos ab?",
          answer:
            "Je nach Projekt werden Rohschnitt, Struktur oder Feinschnitt in vereinbarten Stufen abgestimmt. Feedbackwege und Korrekturschritte werden vor Beginn festgelegt.",
        },
      ],
    },
    en: {
      searchLabel: "YouTube video editing",
      detailsTitle: "What professional YouTube editing covers.",
      detailsIntro:
        "Long-form editing organises extensive footage, protects the natural tone of the format and keeps viewers oriented through clear editorial structure.",
      details: [
        {
          title: "Review and structure",
          text: "Raw footage, key statements, chapters and recurring elements are organised into a reliable editorial line.",
        },
        {
          title: "Fine cut and expansion",
          text: "Pacing, B-roll, graphics, music, sound and color are added with purpose without overwhelming the content.",
        },
        {
          title: "Episode and cutdowns",
          text: "Alongside the long-form master, agreed trailers or short-form cutdowns can be created from suitable moments.",
        },
      ],
      proofTitle: "Podcast moments developed for YouTube and social.",
      proofIntro:
        "These examples show how longer conversations can be translated into clear trailers and standalone social edits.",
      proofVideoIds: ["podcast-trailer", "podcast-short"],
      expertiseTitle: "Editing that listens before it condenses.",
      expertiseBody:
        "For conversations, educational and creator formats, the editorial line comes before visual effects. Personality stays intact while structure and pacing become more precise.",
      expertiseLinkLabel: "More about HappyReels",
      faqTitle: "Questions about YouTube video editing.",
      faqs: [
        {
          question: "Which YouTube formats can HappyReels edit?",
          answer:
            "Formats can include video podcasts, interviews, educational content, creator formats and other long-form videos. The editing style is aligned with the format and audience.",
        },
        {
          question: "Can I submit several hours of raw footage?",
          answer:
            "Yes. The footage volume, intended episode length, markers and editorial priorities should be clarified first so the review and structure can be quoted realistically.",
        },
        {
          question: "Can shorts be created from a YouTube video?",
          answer:
            "Yes. Suitable moments can be developed into trailers, Reels or YouTube Shorts within the agreed scope.",
        },
        {
          question: "Which files are needed to begin?",
          answer:
            "The raw footage is required, ideally together with a brief, brand assets, music or graphics guidance, references and notes about important statements or timecodes.",
        },
        {
          question: "How is feedback handled for longer videos?",
          answer:
            "Depending on the project, the assembly, structure or fine cut can be reviewed in agreed stages. Feedback routes and revision steps are defined before work begins.",
        },
      ],
    },
  },
  motionFinishing: {
    de: {
      searchLabel: "Motion Design und Video Finishing",
      detailsTitle: "Was Motion Design und Video Finishing zusammenbringen.",
      detailsIntro:
        "Finishing beginnt dort, wo ein funktionierender Schnitt visuell und akustisch zu einem konsistenten Markenauftritt werden soll.",
      details: [
        {
          title: "Motion und Typografie",
          text: "Titel, Bauchbinden, animierte Typografie und grafische Systeme werden auf Inhalt, Marke und wiederkehrende Formate abgestimmt.",
        },
        {
          title: "Farbe und Compositing",
          text: "Color Grading, visuelle Bereinigung und Compositing verbinden unterschiedliche Aufnahmen zu einem stimmigen Gesamtbild.",
        },
        {
          title: "Sound und Mastering",
          text: "Sound Design, Lautstärke, technische Kontrolle und formatgerechte Exporte vervollständigen den finalen Master.",
        },
      ],
      proofTitle: "Beispiele für Look, Rhythmus und finales Finish.",
      proofIntro:
        "Die ausgewählten Arbeiten zeigen, wie Farbe, Sound, Typografie und Bewegungsprinzipien den Charakter eines Edits zusammenführen.",
      proofVideoIds: ["cinematic-gym-edit", "kool-savas-ayo"],
      expertiseTitle: "Ein Finish, das den Inhalt unterstützt.",
      expertiseBody:
        "Motion Design wird nicht als Dekoration aufgesetzt. HappyReels entwickelt nur die Ebenen, die Lesbarkeit, Markenidentität und Wirkung des vorhandenen Materials tatsächlich verbessern.",
      expertiseLinkLabel: "Mehr über die Arbeitsweise",
      faqTitle: "Fragen zu Motion Design und Video Finishing.",
      faqs: [
        {
          question: "Was ist der Unterschied zwischen Videoschnitt und Finishing?",
          answer:
            "Der Videoschnitt strukturiert Auswahl, Reihenfolge und Timing. Finishing verfeinert den fertigen oder weit fortgeschrittenen Edit unter anderem durch Farbe, Sound, Motion Graphics, Compositing und technische Endkontrolle.",
        },
        {
          question: "Kann HappyReels einen bereits geschnittenen Film übernehmen?",
          answer:
            "Ja. Vor Beginn werden Projektstand, verfügbare Dateien, technische Basis und gewünschte Leistungen geprüft. Danach lässt sich der passende Finishing-Umfang festlegen.",
        },
        {
          question: "Welche Markenassets werden benötigt?",
          answer:
            "Hilfreich sind Logos, Schriften, Farben, Styleguides, vorhandene Animationen und Referenzen. Fehlende Gestaltungsgrundlagen können je nach Projekt gemeinsam definiert werden.",
        },
        {
          question: "Sind Color Grading und Sound Design einzeln möglich?",
          answer:
            "Ja. Einzelne Finishing-Bausteine können abhängig vom Ausgangsmaterial und technischen Zustand separat vereinbart werden.",
        },
        {
          question: "Für welche Formate eignet sich ein Motion-System?",
          answer:
            "Wiederverwendbare Motion-Prinzipien eignen sich besonders für Serien, Podcast-Clips, Educational Content, Social Ads und andere regelmäßig erscheinende Formate.",
        },
      ],
    },
    en: {
      searchLabel: "Motion design and video finishing",
      detailsTitle: "What motion design and video finishing bring together.",
      detailsIntro:
        "Finishing begins where a working edit needs to become a consistent visual and sonic expression of the brand.",
      details: [
        {
          title: "Motion and typography",
          text: "Titles, lower thirds, animated typography and graphic systems are aligned with the content, brand and recurring formats.",
        },
        {
          title: "Color and compositing",
          text: "Color grading, visual clean-up and compositing connect different shots into one cohesive visual result.",
        },
        {
          title: "Sound and mastering",
          text: "Sound design, loudness, technical review and format-ready exports complete the final master.",
        },
      ],
      proofTitle: "Examples of look, rhythm and final finishing.",
      proofIntro:
        "The selected work shows how color, sound, typography and movement principles can bring the character of an edit together.",
      proofVideoIds: ["cinematic-gym-edit", "kool-savas-ayo"],
      expertiseTitle: "A finish that supports the content.",
      expertiseBody:
        "Motion design is not added as decoration. HappyReels develops only the layers that genuinely improve legibility, brand identity and the impact of the existing material.",
      expertiseLinkLabel: "More about the approach",
      faqTitle: "Questions about motion design and video finishing.",
      faqs: [
        {
          question: "What is the difference between editing and finishing?",
          answer:
            "Editing structures selection, order and timing. Finishing refines a completed or advanced edit through color, sound, motion graphics, compositing and final technical review.",
        },
        {
          question: "Can HappyReels take over an already edited film?",
          answer:
            "Yes. The current project state, available files, technical base and required services are reviewed first. The appropriate finishing scope can then be defined.",
        },
        {
          question: "Which brand assets are needed?",
          answer:
            "Logos, fonts, colors, style guides, existing animations and references are helpful. Missing design foundations can be defined together depending on the project.",
        },
        {
          question: "Can color grading and sound design be booked separately?",
          answer:
            "Yes. Individual finishing services can be agreed separately depending on the source material and its technical state.",
        },
        {
          question: "Which formats benefit from a motion system?",
          answer:
            "Reusable motion principles are particularly useful for series, podcast clips, educational content, social ads and other recurring formats.",
        },
      ],
    },
  },
};

export function getServiceSeoContent(
  key: ServiceKey,
  locale: Locale,
): ServiceSeoContent {
  return content[key][locale];
}
