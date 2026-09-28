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
  "videoProduction": {
    "de": {
      "searchLabel": "Social Media Videoproduktion",
      "detailsTitle": "Das gehört zur Produktion",
      "detailsIntro": "Der genaue Umfang richtet sich nach Ziel, Plattform und Materialbedarf. Diese Bausteine werden vor Produktionsbeginn transparent festgelegt.",
      "details": [
        {
          "title": "Konzept und Vorbereitung",
          "text": "Zielgruppe, Kernaussage, Plattformen, visuelle Richtung, Motive und benötigte Assets werden vor dem Dreh abgestimmt."
        },
        {
          "title": "Dreh und Regie",
          "text": "Kamera, Bildgestaltung und Regie orientieren sich am geplanten Einsatz – vom vertikalen Reel bis zum horizontalen Markenfilm."
        },
        {
          "title": "Schnitt und Ausspielung",
          "text": "Der vereinbarte Umfang kann Schnitt, Sound, Farbe, Grafiken und Exporte für mehrere Plattformformate enthalten."
        }
      ],
      "proofTitle": "Arbeiten aus dem Portfolio",
      "proofIntro": "Social Ad und Fitness-Edit: zwei Beispiele für Bildsprache und Schnitt aus dem Portfolio.",
      "proofVideoIds": [
        "prep-my-meal-ad",
        "cinematic-gym-edit"
      ],
      "expertiseTitle": "Direkter kreativer Ansprechpartner statt Übergabekette.",
      "expertiseBody": "HappyReels wird von Simon Saad geführt. Konzeption, Produktion und Postproduktion werden mit einer durchgängigen visuellen Richtung betreut – vom ersten Briefing bis zum finalen Export.",
      "expertiseLinkLabel": "Mehr über HappyReels",
      "faqTitle": "Fragen zur Videoproduktion",
      "faqs": [
        {
          "question": "Was kostet eine Social Media Videoproduktion?",
          "answer": "Die Kosten hängen unter anderem von Konzept, Drehtag, Teamgröße, Anzahl der Motive, gewünschter Videolänge und den benötigten Ausgabeformaten ab. Nach einem kurzen Briefing wird der Umfang als individuelles Angebot transparent festgehalten. Ein Budgetrahmen, ein Veröffentlichungstermin und ein bis zwei Referenzen helfen bei der Planung. Wichtig ist auch die Unterscheidung zwischen eigenständigen Filmen und zusätzlichen Exporten derselben Fassung."
        },
        {
          "question": "Übernimmt HappyReels auch Konzept und Drehplanung?",
          "answer": "Ja. Je nach Projekt können Konzeption, visuelle Richtung, Shotlist, Ablaufplanung, Dreh und vollständige Postproduktion zusammen umgesetzt werden. Als Ausgangspunkt brauchen wir Kernbotschaft, Zielgruppe und geplanten Einsatz. Vorhandene Ideen und Markenassets fließen ein. Wer welche Vorbereitung übernimmt, wird vor dem Start festgelegt."
        },
        {
          "question": "Können aus einem Drehtag mehrere Reels entstehen?",
          "answer": "Ja. Wenn die benötigten Motive und Formate vorab geplant werden, kann ein Drehtag Material für mehrere Reels, Ads oder ergänzende Kampagnenclips liefern. Eine feste Clipanzahl lässt sich ohne Konzept nicht sinnvoll zusagen. Hauptvideo, zusätzliche Einstiege und kurze Fassungen sollten bereits in der Shotlist stehen, damit wichtige Bilder am Set nicht fehlen."
        },
        {
          "question": "Welche Formate werden geliefert?",
          "answer": "Die Exporte werden vor Projektstart vereinbart. Möglich sind unter anderem vertikale Formate für Reels, TikTok und Shorts sowie horizontale Fassungen für YouTube, Websites oder Kampagnen. Untertitel, Sprachversionen und zusätzliche Schnittfassungen werden ebenfalls abgestimmt. Rohmaterial und bearbeitbare Projektdateien sind eigene Liefergegenstände und sollten ausdrücklich vereinbart werden."
        },
        {
          "question": "Ist eine Videoproduktion auch außerhalb eines festen Studios möglich?",
          "answer": "Ja. Der passende Drehort wird anhand von Konzept, Motiv und organisatorischem Aufwand festgelegt. Details zu Ort, Anreise und benötigtem Equipment werden im Angebot geklärt. Informationen zu Räumen, Geräuschquellen, Zugangszeiten und verfügbaren Personen helfen bei der Planung. Ein kurzer Standortcheck kann zeigen, ob das geplante Motiv mit dem vorgesehenen Aufwand umsetzbar ist."
        },
        {
          "question": "Wie laufen Feedback und Freigabe ab?",
          "answer": "Wir legen vor dem Start fest, welche Schnittstände geprüft werden und wer Rückmeldungen sammelt. Zuerst stimmen wir Inhalt und Aufbau ab, danach die Details. Korrekturrunden werden im Angebot vereinbart. Größere neue Wünsche nach einer Freigabe können Aufwand und Termin verändern; das besprechen wir vor der zusätzlichen Umsetzung."
        }
      ]
    },
    "en": {
      "searchLabel": "Social media video production",
      "detailsTitle": "Production scope",
      "detailsIntro": "The exact scope depends on the goal, platform and required footage. These building blocks are agreed transparently before production begins.",
      "details": [
        {
          "title": "Concept and preparation",
          "text": "The audience, core message, platforms, visual direction, locations and required assets are aligned before the shoot."
        },
        {
          "title": "Shoot and direction",
          "text": "Camera, composition and direction follow the intended use, from a vertical reel to a horizontal brand film."
        },
        {
          "title": "Editing and delivery",
          "text": "The agreed scope can include editing, sound, color, graphics and exports for several platform formats."
        }
      ],
      "proofTitle": "Selected portfolio work",
      "proofIntro": "A social ad and a fitness edit: two examples of image and pacing from the portfolio.",
      "proofVideoIds": [
        "prep-my-meal-ad",
        "cinematic-gym-edit"
      ],
      "expertiseTitle": "One creative contact instead of a chain of handovers.",
      "expertiseBody": "HappyReels is led by Simon Saad. Concept, production and postproduction are guided by one consistent visual direction from the first briefing to final delivery.",
      "expertiseLinkLabel": "More about HappyReels",
      "faqTitle": "Video production questions",
      "faqs": [
        {
          "question": "How much does social media video production cost?",
          "answer": "Pricing depends on the concept, shoot duration, crew, number of setups, intended video length and required deliverables. After a short briefing, the scope is documented in a transparent individual quote. A budget range, publication date and one or two references help with planning. It also matters whether you need separate films or additional exports of the same edit."
        },
        {
          "question": "Can HappyReels handle the concept and shoot planning?",
          "answer": "Yes. Depending on the project, the concept, visual direction, shot list, schedule, shoot and complete postproduction can be handled together. We start with the main message, audience and intended use. Existing ideas and brand assets are considered. We agree who is responsible for each preparation before starting."
        },
        {
          "question": "Can one shoot produce several reels?",
          "answer": "Yes. When the required shots and formats are planned in advance, one shoot can provide material for several reels, ads or supporting campaign clips. There is no useful fixed clip count without a concept. Plan the main film, alternative openings and short versions into the shot list so essential material is captured."
        },
        {
          "question": "Which formats are delivered?",
          "answer": "Exports are agreed before the project begins. They can include vertical versions for Reels, TikTok and Shorts as well as horizontal versions for YouTube, websites or campaigns. Captions, language versions and additional edits are agreed as well. Raw footage and editable project files are separate deliverables and should be explicitly included where needed."
        },
        {
          "question": "Can production take place outside a fixed studio?",
          "answer": "Yes. The location is chosen around the concept, subject and production requirements. Travel and equipment details are clarified in the quote. Details about rooms, noise, access times and available participants help us plan. A preliminary location check can establish whether the intended scene is feasible within the proposed scope."
        },
        {
          "question": "How do feedback and approval work?",
          "answer": "Before starting, we agree which edit stages will be reviewed and who will consolidate comments. Content and structure come first, followed by details. Revision rounds are documented in the quote. Significant new requests after approval may affect scope and delivery; we discuss that before carrying out additional work."
        }
      ]
    }
  },
  "shortFormEditing": {
    "de": {
      "searchLabel": "Reels schneiden lassen",
      "detailsTitle": "Dein Reel, Schritt für Schritt",
      "detailsIntro": "Ein fertiges Short-Form-Video entsteht nicht nur durch schnelle Cuts. Aussage, Rhythmus, Lesbarkeit und Plattform müssen zusammenpassen.",
      "details": [
        {
          "title": "Material und Story",
          "text": "Rohmaterial, Kernbotschaft und gewünschte Zielgruppe bilden die Grundlage für Auswahl, Hook und Dramaturgie."
        },
        {
          "title": "Edit und Gestaltung",
          "text": "Je nach Auftrag werden Schnitt, Untertitel, B-Roll, Sound Design, Motion Graphics und Color Grading kombiniert."
        },
        {
          "title": "Feedback und Exporte",
          "text": "Feedbackschritte, Seitenverhältnisse und finale Dateiformate werden passend zum vereinbarten Umfang geliefert."
        }
      ],
      "proofTitle": "Reels aus unseren Projekten",
      "proofIntro": "Die Beispiele zeigen zwei unterschiedliche Editing-Sprachen: ruhiger Educational Content und dynamischer Creator Content für den Feed.",
      "proofVideoIds": [
        "educational-reel",
        "creator-reel-ayo"
      ],
      "expertiseTitle": "Short-Form Editing mit Blick auf Inhalt und Identität.",
      "expertiseBody": "HappyReels behandelt Hooks, Untertitel und Effekte nicht als isolierte Zutaten. Der Schnitt folgt der Aussage und entwickelt daraus einen wiedererkennbaren Rhythmus für wiederkehrenden Content.",
      "expertiseLinkLabel": "Mehr über die Arbeitsweise",
      "faqTitle": "Fragen zum Reel-Schnitt",
      "faqs": [
        {
          "question": "Kann ich eigenes Rohmaterial für den Reel-Schnitt senden?",
          "answer": "Ja. HappyReels kann vollständig mit vorhandenem Material arbeiten. Hilfreich sind ein kurzes Briefing, die gewünschte Aussage, Plattform, Referenzen und vorhandene Markenassets. Übergebe möglichst Originaldateien statt komprimierter Messenger-Kopien. Bei großen Materialmengen erleichtern markierte Stellen oder Timecodes die Auswahl. Upload und Ordnerstruktur stimmen wir vorab ab."
        },
        {
          "question": "Was gehört zum Short-Form Editing?",
          "answer": "Je nach vereinbartem Umfang können Materialauswahl, Story Edit, Untertitel, B-Roll, Musik, Sound Design, Motion Graphics, Color Grading und plattformgerechte Exporte enthalten sein. Nicht jeder Edit benötigt alle Bausteine. Das Angebot sollte deshalb die konkreten Leistungen und Lieferdateien benennen. Bei Musik und weiteren externen Assets klären wir zusätzlich den geplanten Einsatz."
        },
        {
          "question": "Schneidet HappyReels Reels, TikToks und YouTube Shorts?",
          "answer": "Ja. Der Schnitt kann für Instagram Reels, TikTok und YouTube Shorts ausgelegt und bei Bedarf in mehreren vereinbarten Varianten exportiert werden. Bildauschnitt, Untertitelposition und gegebenenfalls Einstieg oder Ende werden auf die gewünschte Fassung abgestimmt. Ein gemeinsames Hochformat allein macht noch keine angepasste Version; nenne die benötigten Varianten deshalb im Briefing."
        },
        {
          "question": "Sind regelmäßige Reel-Pakete möglich?",
          "answer": "Ja. Neben einzelnen Videos sind fortlaufende Kooperationen möglich, bei denen Bildsprache, Übergabe und Feedbackprozess für wiederkehrende Veröffentlichungen vereinheitlicht werden. Dafür werden Anzahl der Videos, Zuständigkeiten und Liefertermine konkret abgestimmt. Ein definierter Materialfluss und gebündeltes Feedback helfen, neue Themen im vereinbarten Rhythmus zu bearbeiten."
        },
        {
          "question": "Wie viele Korrekturschleifen sind enthalten?",
          "answer": "Die Anzahl der Feedback- und Korrekturschritte wird vor Projektbeginn passend zum Umfang vereinbart und im Angebot festgehalten. Am hilfreichsten ist eine gemeinsame Rückmeldung mit Timecodes und einer zuständigen Freigabeperson. Textkorrekturen, eine neue Story und zusätzliche Fassungen haben unterschiedliche Auswirkungen auf Aufwand und Termin."
        },
        {
          "question": "Könnt ihr eine bestimmte Reichweite garantieren?",
          "answer": "Nein. Ein Edit kann Verständlichkeit, Lesbarkeit und Dramaturgie verbessern. Reichweite hängt aber auch von Thema, Account, Publikum und Veröffentlichungsumfeld ab. Wir stimmen deshalb ein konkretes Kommunikationsziel ab und gestalten das Video darauf hin. Aufruf- oder Umsatzversprechen wären keine belastbare Grundlage für einen Schnittauftrag."
        }
      ]
    },
    "en": {
      "searchLabel": "Reels and short-form video editing",
      "detailsTitle": "Your reel, step by step",
      "detailsIntro": "A strong short-form video needs more than fast cuts. Message, rhythm, legibility and platform context have to work together.",
      "details": [
        {
          "title": "Footage and story",
          "text": "The raw footage, key message and intended audience shape the selection, hook and narrative structure."
        },
        {
          "title": "Edit and design",
          "text": "Depending on scope, editing, captions, B-roll, sound design, motion graphics and color grading are combined."
        },
        {
          "title": "Feedback and exports",
          "text": "Feedback stages, aspect ratios and final file formats are delivered according to the agreed scope."
        }
      ],
      "proofTitle": "Reels from our projects",
      "proofIntro": "The examples show two distinct editing languages: calm educational content and faster creator content built for the feed.",
      "proofVideoIds": [
        "educational-reel",
        "creator-reel-ayo"
      ],
      "expertiseTitle": "Short-form editing shaped around content and identity.",
      "expertiseBody": "HappyReels does not treat hooks, captions and effects as isolated ingredients. The edit follows the message and develops a recognisable rhythm for recurring content.",
      "expertiseLinkLabel": "More about the approach",
      "faqTitle": "Reel editing questions",
      "faqs": [
        {
          "question": "Can I send my own footage for reel editing?",
          "answer": "Yes. HappyReels can work entirely with existing footage. A short brief, intended message, platform, references and available brand assets are helpful. Provide original files rather than compressed messaging-app copies where possible. Marked moments or timecodes help with larger footage collections. We agree on the upload method and folder structure in advance."
        },
        {
          "question": "What is included in short-form editing?",
          "answer": "Depending on scope, footage selection, story editing, captions, B-roll, music, sound design, motion graphics, color grading and platform-ready exports can be included. Not every edit needs every element. The quote should identify the actual services and delivery files. For music and other external assets, the intended use also needs to be clarified."
        },
        {
          "question": "Does HappyReels edit Reels, TikToks and YouTube Shorts?",
          "answer": "Yes. The edit can be designed for Instagram Reels, TikTok and YouTube Shorts and delivered in several agreed variants when required. Framing, caption placement and any different openings or endings are considered for each version. A shared vertical format alone does not make a tailored edit, so include the variants in the brief."
        },
        {
          "question": "Are recurring reel packages available?",
          "answer": "Yes. Alongside individual videos, ongoing collaborations can standardise the visual language, file handover and feedback process for recurring releases. Video counts, responsibilities and delivery dates are explicitly agreed. An organised handover and consolidated feedback help keep new topics moving through the agreed schedule."
        },
        {
          "question": "How many revision rounds are included?",
          "answer": "The number of feedback and revision stages is agreed before the project begins and documented in the quote. Consolidated timecoded comments and one person responsible for approval make reviews more useful. Text corrections, a new story and extra versions have different effects on effort and delivery."
        },
        {
          "question": "Can you guarantee a particular reach?",
          "answer": "No. Editing can improve clarity, readability and narrative structure. Reach also depends on the topic, account, audience and publishing context. We agree on a concrete communication goal and shape the video around it. A promise of views or revenue would not be a dependable basis for an editing commission."
        }
      ]
    }
  },
  "youtubeEditing": {
    "de": {
      "searchLabel": "YouTube Videos schneiden lassen",
      "detailsTitle": "Vom Gespräch zur Episode",
      "detailsIntro": "Long-Form Editing ordnet umfangreiches Material, schützt den natürlichen Ton des Formats und hält Zuschauer durch klare inhaltliche Führung im Video.",
      "details": [
        {
          "title": "Sichtung und Struktur",
          "text": "Rohmaterial, wichtige Aussagen, Kapitel und wiederkehrende Elemente werden zu einer belastbaren inhaltlichen Linie geordnet."
        },
        {
          "title": "Feinschnitt und Ausbau",
          "text": "Pacing, B-Roll, Grafiken, Musik, Sound und Farbe werden gezielt ergänzt, ohne den Inhalt zu überladen."
        },
        {
          "title": "Episode und Cutdowns",
          "text": "Neben dem Long-Form-Master können vereinbarte Trailer oder Short-Form-Cutdowns aus geeigneten Momenten entstehen."
        }
      ],
      "proofTitle": "Trailer & Social-Ausschnitte",
      "proofIntro": "Diese Arbeitsproben sind kurze Ausschnitte aus Podcast-Content. Sie zeigen Auswahl und Verdichtung, keine vollständigen Long-Form-Episoden.",
      "proofVideoIds": [
        "podcast-trailer",
        "podcast-short"
      ],
      "expertiseTitle": "Editing, das zuerst zuhört und dann verdichtet.",
      "expertiseBody": "Bei Gesprächen, Education und Creator-Formaten steht die inhaltliche Linie vor visuellen Effekten. So bleibt die Persönlichkeit erhalten, während Struktur und Tempo deutlich präziser werden.",
      "expertiseLinkLabel": "Mehr über HappyReels",
      "faqTitle": "Fragen zum YouTube-Schnitt",
      "faqs": [
        {
          "question": "Welche YouTube-Formate kann HappyReels schneiden?",
          "answer": "Möglich sind unter anderem Video-Podcasts, Interviews, Educational Content, Creator-Formate und andere Long-Form-Videos. Der genaue Editing-Stil wird auf Format und Zielgruppe abgestimmt. Ein Gespräch braucht einen anderen Aufbau als ein Essay mit Sprechertext und ergänzenden Bildern. Referenzen, geplante Länge und Hinweise zur Zielgruppe helfen, den passenden Schnittansatz vorab festzulegen."
        },
        {
          "question": "Kann ich mehrere Stunden Rohmaterial übergeben?",
          "answer": "Ja. Umfang, gewünschte Episodenlänge, Markierungen und inhaltliche Prioritäten sollten vorab geklärt werden, damit Sichtung und Struktur realistisch angeboten werden können. Nenne auch Anzahl der Kameras und separat aufgezeichnete Tonspuren. So können Synchronisation und Materialprüfung eingeplant werden. Die Länge des fertigen Videos bildet diesen Aufwand allein nicht ab."
        },
        {
          "question": "Können aus einem YouTube-Video auch Shorts entstehen?",
          "answer": "Ja. Geeignete Momente können im vereinbarten Umfang als Trailer, Reels oder YouTube Shorts aufbereitet werden. Ein guter Kurzclip braucht einen verständlichen Einstieg und einen eigenen Abschluss. Auswahl, neue Bildausschnitte und Untertitel sind zusätzliche Arbeitsschritte. Anzahl und Gestaltung der Kurzfassungen werden deshalb separat abgestimmt."
        },
        {
          "question": "Welche Dateien werden für den Start benötigt?",
          "answer": "Benötigt werden das Rohmaterial sowie nach Möglichkeit Briefing, Markenassets, Musik- oder Grafikvorgaben, Referenzen und Hinweise zu wichtigen Aussagen oder Timecodes. Behalte Dateinamen und Ordnerstruktur möglichst bei. Bei mehreren Kameras klären wir die Zuordnung und Synchronisation. Vorhandene Intro- und Outro-Dateien sollten zusammen mit den übrigen Markenassets übergeben werden."
        },
        {
          "question": "Wie läuft das Feedback bei längeren Videos ab?",
          "answer": "Je nach Projekt werden Rohschnitt, Struktur oder Feinschnitt in vereinbarten Stufen abgestimmt. Feedbackwege und Korrekturschritte werden vor Beginn festgelegt. Prüfe zunächst, ob Zusammenhänge stimmen und wesentliche Aussagen vollständig sind. Danach folgen grafische Details und Timing. Gemeinsame Kommentare mit Timecodes und eine verantwortliche Freigabeperson erleichtern die Umsetzung."
        },
        {
          "question": "Sind Upload, Thumbnail und Kanalbetreuung enthalten?",
          "answer": "Ein Schnittauftrag umfasst die vereinbarten Videodateien. Thumbnail-Gestaltung, Titel, Beschreibung, Upload und laufende Kanalbetreuung sind damit nicht automatisch beauftragt. Nenne solche Wünsche im Briefing, damit geklärt werden kann, ob und in welchem Umfang sie zum Projekt gehören. Das verhindert offene Aufgaben kurz vor der Veröffentlichung."
        }
      ]
    },
    "en": {
      "searchLabel": "YouTube video editing",
      "detailsTitle": "From conversation to episode",
      "detailsIntro": "Long-form editing organises extensive footage, protects the natural tone of the format and keeps viewers oriented through clear editorial structure.",
      "details": [
        {
          "title": "Review and structure",
          "text": "Raw footage, key statements, chapters and recurring elements are organised into a reliable editorial line."
        },
        {
          "title": "Fine cut and expansion",
          "text": "Pacing, B-roll, graphics, music, sound and color are added with purpose without overwhelming the content."
        },
        {
          "title": "Episode and cutdowns",
          "text": "Alongside the long-form master, agreed trailers or short-form cutdowns can be created from suitable moments."
        }
      ],
      "proofTitle": "Trailers & social excerpts",
      "proofIntro": "These samples are short excerpts from podcast content. They demonstrate selection and condensation, not complete long-form episodes.",
      "proofVideoIds": [
        "podcast-trailer",
        "podcast-short"
      ],
      "expertiseTitle": "Editing that listens before it condenses.",
      "expertiseBody": "For conversations, educational and creator formats, the editorial line comes before visual effects. Personality stays intact while structure and pacing become more precise.",
      "expertiseLinkLabel": "More about HappyReels",
      "faqTitle": "YouTube editing questions",
      "faqs": [
        {
          "question": "Which YouTube formats can HappyReels edit?",
          "answer": "Formats can include video podcasts, interviews, educational content, creator formats and other long-form videos. The editing style is aligned with the format and audience. A conversation needs a different structure from an essay with narration and supporting images. References, planned length and audience context help establish the approach before editing begins."
        },
        {
          "question": "Can I submit several hours of raw footage?",
          "answer": "Yes. The footage volume, intended episode length, markers and editorial priorities should be clarified first so the review and structure can be quoted realistically. Also identify the number of cameras and separately recorded audio tracks. This allows synchronisation and footage checks to be included. The final running time alone does not reflect this work."
        },
        {
          "question": "Can shorts be created from a YouTube video?",
          "answer": "Yes. Suitable moments can be developed into trailers, Reels or YouTube Shorts within the agreed scope. A useful short clip needs a clear opening and an ending of its own. Selection, reframing and captions are additional tasks. We therefore agree separately on the number and design of the short versions."
        },
        {
          "question": "Which files are needed to begin?",
          "answer": "The raw footage is required, ideally together with a brief, brand assets, music or graphics guidance, references and notes about important statements or timecodes. Keep file names and folder structure intact where possible. For multiple cameras, we clarify how recordings relate and how they will be synchronised. Supply existing intro and outro files alongside other brand assets."
        },
        {
          "question": "How is feedback handled for longer videos?",
          "answer": "Depending on the project, the assembly, structure or fine cut can be reviewed in agreed stages. Feedback routes and revision steps are defined before work begins. Check context and essential statements first, then graphics and detailed timing. Consolidated timecoded comments and one person responsible for final approval make revisions easier to implement accurately."
        },
        {
          "question": "Are uploading, thumbnails and channel management included?",
          "answer": "An editing commission covers the agreed video files. Thumbnail design, titles, descriptions, uploading and ongoing channel management are not automatically included. Mention these requirements in the brief so we can establish whether and how they fit the project. This prevents missing tasks from emerging immediately before publication."
        }
      ]
    }
  },
  "motionFinishing": {
    "de": {
      "searchLabel": "Motion Design und Video Finishing",
      "detailsTitle": "Bild, Grafik & Ton",
      "detailsIntro": "Finishing beginnt dort, wo ein funktionierender Schnitt visuell und akustisch zu einem konsistenten Markenauftritt werden soll.",
      "details": [
        {
          "title": "Motion und Typografie",
          "text": "Titel, Bauchbinden, animierte Typografie und grafische Systeme werden auf Inhalt, Marke und wiederkehrende Formate abgestimmt."
        },
        {
          "title": "Farbe und Compositing",
          "text": "Color Grading, visuelle Bereinigung und Compositing verbinden unterschiedliche Aufnahmen zu einem stimmigen Gesamtbild."
        },
        {
          "title": "Sound und Mastering",
          "text": "Sound Design, Lautstärke, technische Kontrolle und formatgerechte Exporte vervollständigen den finalen Master."
        }
      ],
      "proofTitle": "Look & Finish in der Praxis",
      "proofIntro": "Die ausgewählten Arbeiten zeigen, wie Farbe, Sound, Typografie und Bewegungsprinzipien den Charakter eines Edits zusammenführen.",
      "proofVideoIds": [
        "cinematic-gym-edit",
        "kool-savas-ayo"
      ],
      "expertiseTitle": "Ein Finish, das den Inhalt unterstützt.",
      "expertiseBody": "Motion Design wird nicht als Dekoration aufgesetzt. HappyReels entwickelt nur die Ebenen, die Lesbarkeit, Markenidentität und Wirkung des vorhandenen Materials tatsächlich verbessern.",
      "expertiseLinkLabel": "Mehr über die Arbeitsweise",
      "faqTitle": "Fragen zum Finishing",
      "faqs": [
        {
          "question": "Was ist der Unterschied zwischen Videoschnitt und Finishing?",
          "answer": "Der Videoschnitt strukturiert Auswahl, Reihenfolge und Timing. Finishing verfeinert den fertigen oder weit fortgeschrittenen Edit unter anderem durch Farbe, Sound, Motion Graphics, Compositing und technische Endkontrolle. Die Schritte können sich überschneiden. Wichtig ist, den Schnittstand vor der Übergabe zu klären. Spätere Änderungen an Reihenfolge und Länge können bereits fertige Animationen, Untertitel und Farbgestaltung betreffen."
        },
        {
          "question": "Kann HappyReels einen bereits geschnittenen Film übernehmen?",
          "answer": "Ja. Vor Beginn werden Projektstand, verfügbare Dateien, technische Basis und gewünschte Leistungen geprüft. Danach lässt sich der passende Finishing-Umfang festlegen. Eingebrannte Titel, starke Kompression und vorhandene Looks können die Bearbeitung begrenzen. Eine Referenzfassung und einige Originaldateien helfen beim Prüfen. Den Übergabeweg stimmen wir vor dem vollständigen Upload ab."
        },
        {
          "question": "Welche Markenassets werden benötigt?",
          "answer": "Hilfreich sind Logos, Schriften, Farben, Styleguides, vorhandene Animationen und Referenzen. Fehlende Gestaltungsgrundlagen können je nach Projekt gemeinsam definiert werden. Ergänze möglichst Beispiele für gewünschte und unerwünschte Animationen. Für Serien sind auch typische Textlängen und die benötigten Formate wichtig. So lässt sich abschätzen, welche Elemente wiederverwendbar sein sollten."
        },
        {
          "question": "Sind Color Grading und Sound Design einzeln möglich?",
          "answer": "Ja. Einzelne Finishing-Bausteine können abhängig vom Ausgangsmaterial und technischen Zustand separat vereinbart werden. Beim Ton bieten getrennte Sprach-, Musik- und Effektspuren mehr Kontrolle als eine fertige Gesamtmischung. Für Grading brauchen wir eine geeignete hochwertige Schnittfassung oder Originalmedien. Der Materialcheck bestimmt den sinnvollen Weg."
        },
        {
          "question": "Für welche Formate eignet sich ein Motion-System?",
          "answer": "Wiederverwendbare Motion-Prinzipien eignen sich besonders für Serien, Podcast-Clips, Educational Content, Social Ads und andere regelmäßig erscheinende Formate. Das System muss unterschiedliche Textlängen, Inhalte und Seitenverhältnisse berücksichtigen. Ein starres Template passt nicht automatisch zu jedem Clip. Ob auch bearbeitbare Vorlagen geliefert werden sollen, wird ausdrücklich vereinbart."
        },
        {
          "question": "Kann Finishing technische Aufnahmefehler beheben?",
          "answer": "Teilweise, abhängig vom Ausgangsmaterial. Kleine Farbunterschiede oder einzelne Störgeräusche lassen sich oft bearbeiten. Fehlende Bilddetails, starke Unschärfe oder übersteuertes Sprachsignal können jedoch nicht zuverlässig rekonstruiert werden. Ein kurzer Materialtest hilft, Grenzen vorab zu erkennen und ein erreichbares Ergebnis abzustimmen."
        }
      ]
    },
    "en": {
      "searchLabel": "Motion design and video finishing",
      "detailsTitle": "Image, graphics & sound",
      "detailsIntro": "Finishing begins where a working edit needs to become a consistent visual and sonic expression of the brand.",
      "details": [
        {
          "title": "Motion and typography",
          "text": "Titles, lower thirds, animated typography and graphic systems are aligned with the content, brand and recurring formats."
        },
        {
          "title": "Color and compositing",
          "text": "Color grading, visual clean-up and compositing connect different shots into one cohesive visual result."
        },
        {
          "title": "Sound and mastering",
          "text": "Sound design, loudness, technical review and format-ready exports complete the final master."
        }
      ],
      "proofTitle": "Look & finishing in practice",
      "proofIntro": "The selected work shows how color, sound, typography and movement principles can bring the character of an edit together.",
      "proofVideoIds": [
        "cinematic-gym-edit",
        "kool-savas-ayo"
      ],
      "expertiseTitle": "A finish that supports the content.",
      "expertiseBody": "Motion design is not added as decoration. HappyReels develops only the layers that genuinely improve legibility, brand identity and the impact of the existing material.",
      "expertiseLinkLabel": "More about the approach",
      "faqTitle": "Finishing questions",
      "faqs": [
        {
          "question": "What is the difference between editing and finishing?",
          "answer": "Editing structures selection, order and timing. Finishing refines a completed or advanced edit through color, sound, motion graphics, compositing and final technical review. The stages can overlap. Confirming the edit status before handover is essential, as later changes to sequence or duration may affect completed animation, captions and color work."
        },
        {
          "question": "Can HappyReels take over an already edited film?",
          "answer": "Yes. The current project state, available files, technical base and required services are reviewed first. The appropriate finishing scope can then be defined. Baked-in titles, heavy compression and existing looks can limit the options. A reference cut and sample originals help us assess the material. We agree on the handover method before the full upload."
        },
        {
          "question": "Which brand assets are needed?",
          "answer": "Logos, fonts, colors, style guides, existing animations and references are helpful. Missing design foundations can be defined together depending on the project. Examples of animation styles you like or dislike are useful. For a series, typical text lengths and required formats matter too. They help establish which elements should be reusable."
        },
        {
          "question": "Can color grading and sound design be booked separately?",
          "answer": "Yes. Individual finishing services can be agreed separately depending on the source material and its technical state. Separate dialogue, music and effects tracks offer more control than a finished mix. Grading needs a suitable high-quality cut or original media. The footage check determines the most useful approach."
        },
        {
          "question": "Which formats benefit from a motion system?",
          "answer": "Reusable motion principles are particularly useful for series, podcast clips, educational content, social ads and other recurring formats. The system must accommodate different text lengths, content and aspect ratios. A fixed template will not fit every clip automatically. Whether editable templates are also delivered is explicitly agreed."
        },
        {
          "question": "Can finishing fix technical recording problems?",
          "answer": "Sometimes, depending on the source. Small color differences or isolated unwanted sounds can often be addressed. Missing image detail, severe blur or clipped dialogue cannot reliably be reconstructed. A short material test helps establish the limits early and agree on an achievable result."
        }
      ]
    }
  }
};

export function getServiceSeoContent(
  key: ServiceKey,
  locale: Locale,
): ServiceSeoContent {
  return content[key][locale];
}
