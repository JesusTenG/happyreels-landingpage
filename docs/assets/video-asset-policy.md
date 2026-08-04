# Video Asset Policy (HappyReels)

## Öffentlich ausgelieferte Video-Ordner (public/)
- `public/assets/videos/preview/`  
  - Erwartung: nur kurze Preview-Clips, small-zu-mittel gehalten.
  - Lade-/Preload nur view-/idle-gated (Performance-Absicherung).
- `public/assets/videos/lightbox/`  
  - Erwartung: nur auf User-Interaktion (Lightbox öffnen) geladen.
  - Kein Preload großer Mengen.

## Nicht öffentlich (nie in public/)
- `public/assets/videos/raw/`  
  - Raw-Quellen dürfen nicht öffentlich erreichbar sein.
  - Ziel: Ordner aus `public/` entfernen und vollständig gitignorieren.
- `media-source/raw/`  
  - Raw-Quellen liegen hier (oder äquivalent außerhalb von `public/`).
  - Muss in `.gitignore` ignoriert sein.

## Regeln für zukünftige Uploads
1. Raw-Material (Originale/Exports/Intermediate) nie in `public/` hochladen.
2. Preview-Dateien bleiben klein und werden nur “on demand” vorbereitet.
3. Lightbox-Dateien sind nur für die tatsächliche Interaktion gedacht.
4. Poster-Bilder bleiben bereitgestellt (Poster ist meist der SEO-/LCP-Anker).
