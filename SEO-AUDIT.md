# SEO-, AI- und UX-Audit

Stand: 23.07.2026  
Ziel: lokale Website `http://localhost:3001/`, Produktionsbasis `https://www.tf-m.de/`

## Executive Summary

TFM Montage hat eine klare regionale Positionierung: persönliche Montage-, Innenausbau- und Holzarbeiten im Kreis Böblingen. Die Website besitzt bereits gute Grundlagen für lokale Suche und AI-Retrieval: deutschsprachige URLs, statische Leistungsseiten, Ratgeber, JSON-LD, Sitemap, robots.txt, Open Graph und `llms.txt`/`llms-full.txt`.

Größte Hebel bleiben:

1. konsistente, überprüfbare Unternehmensdaten in allen Quellen;
2. echte Review-Daten nur mit sauberer Herkunft und Review-Schema;
3. Bild- und Video-Budget auf der Startseite;
4. interne Links zwischen Leistung, Projekt und Ratgeber;
5. Search-Console-/Lighthouse-Messung auf der Produktionsdomain.

## Website-Tree

```text
/
├── /leistungen/ (9 Leistungsseiten)
│   ├── carports
│   ├── dachstuhl
│   ├── holzfassaden
│   ├── holzkonstruktionen
│   ├── holzreparaturen
│   ├── holzterrassen
│   ├── innenausbau
│   ├── moebelmontage
│   └── zaeune
├── /ratgeber/ (Übersicht + 14 Artikel)
├── /impressum
├── /datenschutz
├── /robots.txt
└── /sitemap.xml
```

## Scores (heuristisch, keine Search-Console-Messung)

| Bereich | Score | Begründung |
|---|---:|---|
| Technical SEO | 82 | App Router, Canonical, Sitemap, robots, saubere Statusseiten vorhanden |
| OnPage SEO | 78 | Leistungs- und Ratgeberstruktur stark; Seitentitel/Descriptions weiter vereinheitlichen |
| AI SEO / GEO | 76 | `llms.txt`, Vollindex, klare Entitäten; Review-/Projektbeziehungen ausbaufähig |
| UX | 84 | klare Hero-, Leistungs-, Projekt- und Kontaktführung; Bewegung muss messbar bleiben |
| Accessibility | 75 | Fokus-/Dialogarbeit vorhanden; vollständiger WCAG-Test mit Screenreader fehlt |
| Performance | 70 | Hero-Video und viele große Assets; CSS-Inlining und Logo-Optimierung umgesetzt |
| Conversion | 81 | WhatsApp, Kontaktmodal, Download und Bewertungen vorhanden |
| Content | 80 | 9 Leistungen, 14 Ratgeber; regionale Spezifik und Fallbeispiele weiter ausbauen |
| Trust / E-E-A-T | 73 | Person, Region und Bewertungen vorhanden; Quellen/Belege der Bewertungen dokumentieren |

## Technische Befunde

- `robots.ts` verweist auf die Produktions-Sitemap und erlaubt Crawling.
- `sitemap.ts` enthält Leistungs- und Ratgeber-URLs; Änderungen sollten ein echtes `lastModified` aus Git/CMS erhalten.
- Canonical, Open Graph, Twitter Cards und lokale JSON-LD-Grunddaten sind vorhanden.
- `next.config.ts` nutzt CSS-Inlining, damit die render-blockierende CSS-Kette aus Lighthouse entfällt.
- Logo-Auslieferung verwendet eine 768×512-WebP-Variante statt des 1536×1024-PNGs.
- Viele Projektbilder sind weiterhin 1,8–7 MB groß. Für Galerie-Bilder AVIF/WebP-Varianten und feste `sizes`-Angaben prüfen.
- Hero-Video ist klein genug für den Einstieg; Posterbild und Mobile-Quelle bleiben wichtig für LCP und reduzierte Bewegung.
- Sicherheitsheader, echte Produktions-Redirects, 404- und Link-Crawl wurden lokal nicht extern verifiziert.

## Content-, Entity- und AI-Struktur

Primäre Entität: Thomas Frenzel / TFM Montage & Handwerk.  
Region: Böblingen, Sindelfingen, Leonberg, Herrenberg und Umgebung.  
Themencluster: Möbelmontage, Innenausbau, Boden/Türen, Holzreparatur, Holzschutz, Terrassen, Fassaden, Holzkonstruktionen.

Empfohlene interne Verlinkung:

- Jede Leistungsseite verlinkt auf ein passendes Projekt und mindestens einen Ratgeber.
- Jeder Ratgeber verlinkt auf die fachlich passende Leistung und Kontakt-CTA.
- Projektkarten erhalten, wo sinnvoll, eine Detailseite oder einen beschreibenden Anker.
- Bewertungen verlinken nicht auf erfundene Quellen; Herkunft und Einwilligung intern dokumentieren.

## Schema-Empfehlungen

Bereits sinnvoll: `HomeAndConstructionBusiness`, `Person`, `FAQPage`, `BreadcrumbList`, `AggregateRating`-Grundlage.

Nach Prüfung echter Nachweise ergänzen:

- einzelne `Review`-Objekte mit Autorname, Text, Datum und Herkunft;
- `Service`-Schema auf jeder Leistungsseite;
- `ImageObject` für zentrale Referenzbilder;
- `WebSite` nur mit `SearchAction`, wenn eine echte Suche existiert.

Keine `Product`, `Course`, `Recipe`, `Event` oder erfundene `Offer`-Markups ergänzen, solange diese Inhalte nicht real angeboten werden.

## 30-Tage-Plan

1. Produktions-Crawl mit Search Console und Lighthouse auf Mobil/Desktop durchführen.
2. Alle großen Galerie-Assets in AVIF/WebP ableiten und `sizes` gegen echte Layoutbreiten prüfen.
3. Leistungsseiten untereinander und mit passenden Ratgebern verlinken.
4. Review-Herkunft, Einwilligung und Veröffentlichungsdatum dokumentieren.
5. Security-Header, Cache-Control und Redirects am Hosting verifizieren.

## 90-Tage-Plan

1. Je Leistung ein belastbares Referenz-/Vorher-Nachher-Beispiel veröffentlichen.
2. Regionale Landingpages nur für echte Einsatzgebiete und mit eigenständigem Nutzen erstellen.
3. FAQ aus echten Kundenfragen erweitern und Antworten mit Leistungen verknüpfen.
4. LCP, INP, CLS und Conversion-Klicks monatlich messen.

## 12-Monats-Roadmap

- Content-Cluster für Reparatur, Innenausbau und Holzschutz ausbauen.
- Wiederkehrende Referenzfälle mit Material, Problem, Lösung und Ergebnis dokumentieren.
- Lokale Erwähnungen und Partnerverzeichnisse mit konsistenten NAP-Daten pflegen.
- AI-Knowledge- und Entity-Index nach jeder neuen Leistung aktualisieren.

## Offene Informationen

- Keine echte Produktions-URL-Messung, Search-Console-Daten, Analytics-Daten oder Backlinkdaten lagen vor.
- Wettbewerber wurden nicht bewertet, da keine Region-/Wettbewerberliste vorgegeben war.
- Review-Schema darf erst mit belegbarer Quelle und Veröffentlichungsfreigabe erweitert werden.
