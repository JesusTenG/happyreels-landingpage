# Unterseiten-Review

Stand: 28.09.2026, nach der gestalterischen Nachbesserung.
Lokal auf `current-website-state`, ohne Commit, Push oder Deployment.

## Umgesetzt

- Footer: im Dark Mode derselbe Hintergrund wie im Light Mode. Keine weiteren Footer-Anpassungen in dieser Nachbesserung.
- Unterseiten: Eyebrows, dekorative Zusatztexte, doppelte Einleitungen und ueberfluessige Links entfernt.
- Ratgeber: keine Lesedauer, Autorenzeile oder zusaetzliche Inhaltsnavigation. Kuerzere Inhaltskarten ohne Nummern und wiederholende Listen; Color-Grading-Slider erhalten.
- Ratgeber-Uebersicht: Frage als Headline, "Was macht ein gutes Video aus?", auch auf Englisch angepasst.
- Cards: Markenfarben, leicht gedrehte Karten, harte Schatten und Hover-Verhalten nach dem Vorbild der Startseite. Dark-Mode-Varianten und reduzierte Bewegung beruecksichtigt.
- Leistungsablauf: einzelne Ablauf-Cards statt der bisherigen Textspalten.
- FAQs: dasselbe Radix-Accordion und dieselben unveraenderten CSS-Klassen wie auf der Startseite. Kompaktere Ueberschriften und gut lesbare Antworttexte lokal fuer Unterseiten.
- CTAs: gemeinsame allgemeine Ansprache "Lass uns sprechen." / "Kontakt aufnehmen", entsprechend auf Englisch. Buttons werden im Dark Mode goldfarben.
- Projektseiten: keine Portraets oder Eyebrows im Header. Kooperationen in der Uebersicht nur mit Namen und Pfeil, ohne Subheadline.
- About: das bereitgestellte Bild `public/assets/about/simon1.jpeg` eingebunden. Kompakter Aufbau mit Foto und zwei Inhaltskarten statt generischer Beispielbilder.
- Metadaten auf den tatsaechlich gekuerzten Inhalt abgestimmt. Canonicals, Sprachalternativen und strukturierte Daten bleiben erhalten.

## Schutz der Main-Page

Dateihashes vor und nach dieser Nachbesserung verglichen. Startseiten-Komponenten, globale Styles, Navbar, gemeinsam genutzte Buttons und Kundenkarten sind unveraendert. Einzige beabsichtigte gemeinsame Aenderung: der Footer-Hintergrund im Dark Mode. Bereits vorhandene lokale Aenderungen aus frueheren Arbeiten bleiben bestehen.

## Geprueft

- `npm run lint`: erfolgreich.
- `npm run build`: erfolgreich, einschliesslich TypeScript und Generierung von 63 statischen Seiten.
- 32 DE/EN-Unterseiten bei 320, 768 und 1440 Pixeln: HTTP 200, genau eine H1, keine erkannten horizontalen Textueberlaeufe.
- Visuelle Stichproben auf Desktop und bei 390 Pixeln, darunter About, Ablauf-Cards und offene FAQs.
- 74 interne Links ueber 34 Zielseiten, einschliesslich Sprungmarken: keine fehlenden Ziele.
- 84 sichtbare FAQ-Antworten auf 14 Detailseiten mit JSON-LD verglichen: keine Abweichungen.
- Sieben repraesentative Seitentypen in beiden Farbmodi: keine unterschrittenen Textkontrast-Grenzwerte im DOM-Test, keine defekten Bilder.
- Footer auf Unterseiten und Main-Page in beiden Modi: identische Hintergrundfarbe.
- Kontaktbuttons im Dark Mode: goldener Hintergrund mit dunkler Schrift.
- FAQ per Enter auf- und zuklappbar; Grading-Slider reagiert auf Home und End.
- Card-Hover getestet: Transformation aendert sich, Layoutabmessungen bleiben stabil.

Lokaler Chromium-Test, keine vollstaendige browseruebergreifende Freigabe oder Barrierefreiheitszertifizierung. Kontaktformular nicht abgeschickt. Vereinzelte CSS-Preload-Warnungen im Browser bleiben ohne beobachtete Funktionsbeeintraechtigung.

Vorschau: http://localhost:3001/de/about
