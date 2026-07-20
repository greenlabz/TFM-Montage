import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  {
    slug: 'holzterrassen',
    title: 'Holzterrassen Bau, Sanierung & Pflege im Kreis Böblingen',
    desc: 'Professioneller Bau, Sanierung und Pflege von Holzterrassen in Böblingen, Sindelfingen, Herrenberg und Leonberg. Fachgerechte Ausführung.',
    h1: 'Holzterrassen: Bau, Sanierung und Pflege',
    intro: 'Eine gut geplante und fachgerecht gebaute Holzterrasse erweitert den Wohnraum in den Garten hinein. Wir übernehmen die Konstruktion, den Bau sowie die fachgerechte Sanierung und Pflege von Holzterrassen im gesamten Kreis Böblingen, einschließlich Sindelfingen, Herrenberg, Leonberg und Schönaich.',
    details: 'Holz ist ein natürlicher Baustoff, der bei richtiger Verarbeitung und Pflege eine hohe Langlebigkeit bietet. Bei der Planung einer Holzterrasse achten wir besonders auf den konstruktiven Holzschutz. Das bedeutet, dass Wasser schnell abfließen kann und das Holz nach einem Regen rasch abtrocknet. Dies verhindert Staunässe und Fäulnisbildung. \n\nWir beraten Sie bei der Auswahl der passenden Holzart – von langlebigen Harthölzern wie Bangkirai oder Garapa bis hin zu nachhaltigen europäischen Hölzern wie Lärche oder Douglasie. Jede Holzart hat spezifische Eigenschaften hinsichtlich Haltbarkeit, Pflegeaufwand und Witterungsbeständigkeit. Neben dem Neubau übernehmen wir auch die Reparatur beschädigter Terrassendielen und die professionelle Pflege durch Ölen oder Reinigen. Eine regelmäßige Pflege erhält nicht nur die schöne Optik, sondern verlängert auch die Lebensdauer Ihrer Terrasse signifikant.',
    faq: [
      { q: 'Welches Holz eignet sich am besten für Terrassen?', a: 'Das hängt vom Budget und dem gewünschten Pflegeaufwand ab. Lärche und Douglasie sind preiswerte, heimische Hölzer. Tropenhölzer wie Bangkirai oder thermisch behandelte Hölzer (Thermoholz) bieten eine deutlich höhere Lebensdauer und Formstabilität.' },
      { q: 'Wie oft muss eine Holzterrasse geölt werden?', a: 'Wir empfehlen, die Holzterrasse ein- bis zweimal pro Jahr zu ölen, idealerweise im Frühjahr vor Beginn der Gartensaison und gegebenenfalls im Herbst. Das schützt das Holz vor Vergrauung und Rissbildung.' },
      { q: 'Können morsche Terrassendielen ausgetauscht werden?', a: 'Ja, einzelne beschädigte oder morsche Dielen können problemlos ausgetauscht werden. Wir prüfen dabei auch immer die Unterkonstruktion auf eventuelle Schäden.' }
    ]
  },
  {
    slug: 'holzfassaden',
    title: 'Holzfassaden & Holzverkleidungen | Kreis Böblingen',
    desc: 'Fachgerechte Montage von Holzfassaden und Holzverkleidungen in Böblingen und Umgebung. Hochwertiger Holzschutz und langlebige Konstruktionen.',
    h1: 'Holzfassaden & Holzverkleidungen',
    intro: 'Holzfassaden bieten einen hervorragenden Witterungsschutz und verleihen Gebäuden eine natürliche, hochwertige Optik. Wir montieren und sanieren Holzfassaden und Wandverkleidungen für Gebäude im Kreis Böblingen, Sindelfingen und Herrenberg.',
    details: 'Eine fachgerecht installierte Holzfassade schützt die Bausubstanz vor Witterungseinflüssen und trägt zur thermischen Isolierung bei. Die Montage erfolgt in der Regel als vorgehängte hinterlüftete Fassade (VHF). Diese Konstruktionsweise stellt sicher, dass Feuchtigkeit hinter der Fassade schnell abtrocknen kann, was die Lebensdauer des Holzes drastisch erhöht und Schimmelbildung an der Gebäudewand verhindert.\n\nFür Holzfassaden eignen sich besonders beständige Hölzer wie sibirische Lärche, Weißtanne, Douglasie oder auch speziell behandeltes Thermoholz. Ob Sie sich für eine offene Fugenschalung, Boden-Deckel-Schalung oder Rombusschalung entscheiden – wir setzen Ihre Wünsche präzise um. Zudem übernehmen wir den Austausch beschädigter Fassadenbretter und die Behandlung der Hölzer mit entsprechenden Lasuren oder deckenden Farben zum Schutz vor UV-Strahlung und Feuchtigkeit.',
    faq: [
      { q: 'Muss eine Holzfassade zwingend gestrichen werden?', a: 'Nein. Wenn Sie beständige Hölzer wie Lärche oder Douglasie verwenden, können diese auch unbehandelt bleiben. Sie erhalten dann im Laufe der Zeit durch die Witterung eine silbergraue Patina. Wer den originalen Holzfarbton erhalten möchte, muss die Fassade regelmäßig lasieren.' },
      { q: 'Was ist eine hinterlüftete Holzfassade?', a: 'Bei einer hinterlüfteten Fassade wird zwischen der Gebäudewand (inklusive Dämmung) und der Holzverkleidung ein Luftspalt gelassen. Diese Hinterlüftung sorgt dafür, dass Feuchtigkeit abtransportiert wird und das Holz trocken bleibt.' },
      { q: 'Bieten Sie auch Reparaturen an bestehenden Holzfassaden an?', a: 'Ja, wir begutachten bestehende Holzfassaden auf Schäden, tauschen schadhafte Elemente aus und bessern fehlerhaften konstruktiven Holzschutz nach.' }
    ]
  },
  {
    slug: 'carports',
    title: 'Carports aus Holz bauen lassen | Kreis Böblingen',
    desc: 'Individuelle Carports aus Holz nach Maß. Fachgerechte Planung und Montage in Böblingen, Leonberg und Sindelfingen.',
    h1: 'Carports aus Holz – Individuell und Robust',
    intro: 'Ein Carport aus Holz schützt Ihr Fahrzeug zuverlässig vor Witterungseinflüssen wie Regen, Schnee und Hagel. Wir planen, liefern und montieren individuelle Holz-Carports im gesamten Kreis Böblingen, Schönaich und Leonberg.',
    details: 'Im Gegensatz zu einer geschlossenen Garage bietet ein Carport den Vorteil einer ständigen Luftzirkulation. Nasse Fahrzeuge trocknen deutlich schneller ab, was die Rostgefahr erheblich reduziert. Zudem fügt sich eine Holzkonstruktion oft harmonischer in die bestehende Grundstücksgestaltung ein. Wir errichten Einzelcarports, Doppelcarports sowie Carports mit integriertem Geräteraum für Fahrräder oder Gartengeräte.\n\nDie Konstruktion erfolgt in der Regel aus widerstandsfähigem Konstruktionsvollholz (KVH) oder Brettschichtholz (BSH), um eine hohe statische Tragfähigkeit und Verwindungssteifigkeit zu garantieren. Wir kümmern uns um die fachgerechte Verankerung mittels H-Pfostenträgern im Betonfundament, um die Konstruktion vor aufsteigender Bodenfeuchtigkeit zu schützen. Das Dach kann je nach Wunsch als Flachdach, Pultdach oder Satteldach ausgeführt werden.',
    faq: [
      { q: 'Benötige ich für einen Carport eine Baugenehmigung?', a: 'Dies ist abhängig von der Größe des Carports und der jeweiligen Landesbauordnung (Baden-Württemberg) sowie dem örtlichen Bebauungsplan. Bis zu einer bestimmten Größe und Grenzbebauung sind Carports oft verfahrensfrei. Wir empfehlen vorab eine kurze Klärung mit dem örtlichen Bauamt.' },
      { q: 'Welches Holz wird für einen Carport verwendet?', a: 'Meist wird Konstruktionsvollholz (KVH) aus Fichte, Tanne oder Kiefer verwendet, welches imprägniert oder gestrichen werden muss. Für besonders beanspruchte Teile kann auch kesseldruckimprägniertes (KDI) Holz eingesetzt werden.' },
      { q: 'Kann ich mein Carport später noch erweitern oder verschließen?', a: 'Ja, Holzcarports lassen sich in der Regel sehr gut nachträglich mit Seitenwänden ausstatten oder um einen Geräteschuppen erweitern. Eine stabile Grundkonstruktion ist dafür die Voraussetzung.' }
    ]
  },
  {
    slug: 'zaeune',
    title: 'Zäune & Sichtschutz aus Holz montieren | Böblingen',
    desc: 'Hochwertige Holzzäune und Sichtschutzelemente für Ihren Garten. Fachmännische Montage in Sindelfingen, Herrenberg und Böblingen.',
    h1: 'Zäune & Sichtschutz aus Holz',
    intro: 'Ein Holzzaun oder Sichtschutz strukturiert den Garten und schützt Ihre Privatsphäre. Wir montieren langlebige Zaunanlagen und Sichtschutzelemente im Raum Böblingen, Sindelfingen und angrenzenden Orten.',
    details: 'Holzzäune vereinen Funktionalität mit natürlicher Ästhetik. Egal ob klassischer Jägerzaun, moderner Lamellenzaun, Rhombus-Sichtschutz oder massive Flechtzäune – wir sorgen für eine sturmsichere und lotrechte Montage. Die Stabilität einer Zaunanlage steht und fällt mit der fachgerechten Verankerung der Pfosten. Wir setzen Pfostenanker in Betonfundamente oder verwenden Einschlagbodenhülsen bei kleineren Projekten. Wichtig dabei ist, dass die Holzpfosten keinen direkten Erdkontakt haben, um Fäulnis vorzubeugen.\n\nZudem achten wir beim Sichtschutz auf den Winddruck. Da geschlossene Flächen dem Wind viel Angriffsfläche bieten, müssen die Fundamente entsprechend dimensioniert sein. Neben der Neuinstallation übernehmen wir auch Reparaturarbeiten an bestehenden Zäunen, den Austausch abgefaulteter Pfosten und die Ausrichtung wackeliger Zaunelemente.',
    faq: [
      { q: 'Wie tief müssen die Fundamente für einen Sichtschutz sein?', a: 'Für einen stabilen und frostsicheren Halt empfehlen wir Fundamente mit einer Tiefe von mindestens 80 Zentimetern. Dies verhindert, dass sich die Fundamente bei Frost im Winter heben.' },
      { q: 'Wie schütze ich Zaunpfosten am besten vor Fäulnis?', a: 'Holzpfosten sollten niemals direkt einbetoniert oder in die Erde gegraben werden. Wir verwenden feuerverzinkte Pfostenträger (z.B. H-Anker oder U-Anker), sodass das Holz einige Zentimeter über dem Boden endet und Feuchtigkeit abtrocknen kann.' },
      { q: 'Sind Lasuren für den Holzzaun notwendig?', a: 'Bei kesseldruckimprägniertem (KDI) Holz ist ein sofortiger Anstrich nicht zwingend nötig, verlängert aber langfristig die Lebensdauer. Unbehandelte Hölzer sollten zum Schutz vor Bläuepilzen, UV-Strahlung und Feuchtigkeit mit einer geeigneten Holzschutzlasur gestrichen werden.' }
    ]
  },
  {
    slug: 'innenausbau',
    title: 'Innenausbau mit Holz: Wandverkleidungen & Decken | Böblingen',
    desc: 'Individueller Innenausbau mit Holz. Wir realisieren Wandverkleidungen, Decken und Einbauten fachgerecht in Böblingen und Region.',
    h1: 'Innenausbau mit Holz',
    intro: 'Holz bringt Wärme, Behaglichkeit und ein gesundes Raumklima in Ihr Zuhause. Für Kunden im Kreis Böblingen, Leonberg und Herrenberg übernehmen wir sämtliche Innenausbauarbeiten mit Holz, von Wandverkleidungen bis zur Deckenmontage.',
    details: 'Beim Innenausbau mit Holz sind Präzision und sauberes Arbeiten unerlässlich. Wir montieren hochwertige Holzdecken, Wandpaneele und Akustikelemente. Holzverkleidungen eignen sich hervorragend, um die Raumakustik zu verbessern, unschöne Leitungen zu verbergen oder einfach gestalterische Akzente zu setzen. Dabei arbeiten wir mit Massivholzprofilen, Echtholzfurnierplatten oder auch modernen Dekor-Paneelen.\n\nDarüber hinaus fertigen und montieren wir passgenaue Verkleidungen für Treppen, Heizkörper oder Nischen. Wenn der Dachboden ausgebaut werden soll, übernehmen wir die Beplankung der Dachschrägen und die Erstellung von Trennwänden in Holzständerbauweise. Jede Konstruktion wird auf die speziellen Gegebenheiten vor Ort angepasst, um ein perfektes Spaltmaß und nahtlose Übergänge zu garantieren.',
    faq: [
      { q: 'Verbessern Holzverkleidungen die Raumakustik?', a: 'Ja, Holz besitzt von Natur aus gute schallabsorbierende Eigenschaften. Mit speziellen Akustikpaneelen (z.B. geschlitzten oder perforierten Holzplatten) lässt sich der Nachhall in Räumen extrem effektiv reduzieren, was besonders in großen oder spartanisch eingerichteten Räumen von Vorteil ist.' },
      { q: 'Welche Hölzer eignen sich für den Innenausbau?', a: 'Für den Innenbereich eignen sich nahezu alle Holzarten, da sie nicht der Witterung ausgesetzt sind. Sehr beliebt sind helle Hölzer wie Ahorn, Birke oder Fichte, aber auch Eiche oder Nussbaum für markantere Akzente.' },
      { q: 'Kann Holz im Badezimmer verbaut werden?', a: 'Ja, auch in Feuchträumen kann Holz verwendet werden, sofern die Hinterlüftung gewährleistet ist und das richtige Holz (z.B. Teak, Merbau oder auch speziell behandelte Eiche) gewählt wird. Wichtig ist zudem die Oberflächenbehandlung mit wasserabweisenden Ölen oder Lacken.' }
    ]
  },
  {
    slug: 'moebelmontage',
    title: 'Professionelle Möbelmontage & Möbelbau | Kreis Böblingen',
    desc: 'Zuverlässiger Aufbau von Möbeln, Schränken und Regalsystemen. Fachgerechte Möbelmontage in Sindelfingen, Böblingen und Leonberg.',
    h1: 'Möbelmontage & kleiner Möbelbau',
    intro: 'Ein fehlerfreier Aufbau sorgt für langlebige und sicher funktionierende Möbel. Wir bieten professionelle Möbelmontage für Privat- und Gewerbekunden in Böblingen, Sindelfingen, Schönaich und Umgebung an.',
    details: 'Der Aufbau komplexer Kleiderschränke, Büromöbelsysteme oder individuell geplanter Regale kann schnell zur Herausforderung werden. Wir übernehmen die fachgerechte Montage von Systemmöbeln namhafter Hersteller. Dazu gehört das präzise Ausrichten der Korpusse, das Einstellen der Scharniere und Spaltmaße sowie die sichere und verdeckte Wandbefestigung (Kippsicherung).\n\nNeben der reinen Montage von Fertigmöbeln realisieren wir auch kleine Möbelbauprojekte und individuelle Anpassungen. Wenn Standardmaße nicht passen, schneiden wir Deckplatten, Passleisten oder Regalböden millimetergenau zu. Auch der Einbau von Schiebetüren in Nischen oder das Nachrüsten von Schubladenauszügen und Dämpfern (Soft-Close-Systeme) gehört zu unserem Leistungsspektrum. Sauberkeit, Vorsicht im Umgang mit den Bauteilen und eine besenreine Übergabe sind für uns selbstverständlich.',
    faq: [
      { q: 'Montieren Sie Möbel aller Hersteller?', a: 'Ja, wir haben jahrelange Erfahrung im Aufbau von Möbelsystemen unterschiedlichster Hersteller – von klassischen Möbelhaus-Systemen wie IKEA (PAX, BESTÅ) bis hin zu hochwertigen Designermöbeln und Büroeinrichtungen.' },
      { q: 'Können bestehende Möbel umgebaut oder angepasst werden?', a: 'Ja, oft lassen sich Standardmöbel an spezielle Raumsituationen anpassen, z.B. durch das Einkürzen von Regalwänden wegen Dachschrägen oder das Anfertigen passender Blenden für Nischen.' },
      { q: 'Helfen Sie auch beim Abbau und Wiederaufbau bei einem Umzug?', a: 'Selbstverständlich. Wir demontieren Ihre wertvollen Möbel fachgerecht und bauen diese am neuen Standort wieder sicher und millimetergenau auf.' }
    ]
  },
  {
    slug: 'dachstuhl',
    title: 'Dachstuhl- & Zimmererarbeiten | Region Böblingen',
    desc: 'Kleine Dachstuhlarbeiten, Ausbesserungen und Holzbauarbeiten am Dach. Zuverlässiger Service in Böblingen und Sindelfingen.',
    h1: 'Kleine Dachstuhl- & Zimmererarbeiten',
    intro: 'Als erfahrener Partner für Holzbau übernehmen wir kleinere Zimmererarbeiten, Dachstuhl-Ausbesserungen und Holzkonstruktionen am Gebäude im Raum Böblingen, Herrenberg und Leonberg.',
    details: 'Auch wenn wir keine kompletten Dachstühle für Neubauten richten, sind wir Ihr Ansprechpartner für Reparaturen, Erweiterungen und Ausbesserungen am bestehenden Holz-Dachstuhl. Wir ersetzen morsche Sparrenköpfe, verstärken Pfetten und reparieren schadhafte Schalungen. Gerade bei älteren Gebäuden können durch eindringende Feuchtigkeit oder Schädlingsbefall Reparaturen an den tragenden Holzbauteilen notwendig werden.\n\nDes Weiteren bauen wir Gauben aus, montieren Wechsel für Dachflächenfenster oder konstruieren Überdachungen für Terrassen und Hauseingänge. Die handwerksgerechte Ausführung traditioneller Holzverbindungen wie Verblattungen oder Zapfenverbindungen stellen für uns ebenso wenig ein Problem dar wie die moderne Befestigung mittels zugelassener Holzverbinder. Wir arbeiten eng mit Ihnen zusammen, um statisch einwandfreie und optisch ansprechende Lösungen umzusetzen.',
    faq: [
      { q: 'Woran erkenne ich, dass Holz am Dachstuhl morsch ist?', a: 'Anzeichen für morsche Hölzer sind dunkle Verfärbungen, weiche, bröckelige Stellen, Risse, in denen sich Feuchtigkeit sammelt, oder das Vorhandensein von Holzmehl (ein Indiz für Schädlingsbefall wie den Holzbock).' },
      { q: 'Können beschädigte Balken repariert werden, ohne das ganze Dach abzudecken?', a: 'In vielen Fällen ja. Durch Techniken wie das Anblattungen oder den seitlichen Einbau von Verstärkungslaschen (Beiholz) können Tragfähigkeiten wiederhergestellt werden, ohne die gesamte Konstruktion freizulegen.' },
      { q: 'Übernehmen Sie auch die Montage von Vordächern?', a: 'Ja, wir konstruieren und montieren individuelle Vordächer aus Holz für Eingangsbereiche, maßgeschneidert passend zur Architektur Ihres Hauses.' }
    ]
  },
  {
    slug: 'holzreparaturen',
    title: 'Holzreparaturen & Sanierung (Fenster, Türen) | Böblingen',
    desc: 'Fachgerechte Reparatur von Holzfenstern, Holztüren und Treppen. Sanierung von beschädigtem Holz in Böblingen und Sindelfingen.',
    h1: 'Holzreparaturen & Sanierung',
    intro: 'Holz ist ein langlebiger Werkstoff, doch Witterung, mechanische Belastung oder Abnutzung hinterlassen Spuren. Wir führen professionelle Holzreparaturen an Türen, Fenstern, Treppen und Balken im Kreis Böblingen durch.',
    details: 'Nicht immer muss ein beschädigtes Holzbauteil komplett ausgetauscht werden. Durch fachmännische Reparaturen lässt sich die Funktion und Optik meist kostengünstig wiederherstellen. Wir reparieren ausgebrochene Scharniere an Holz- und Zimmertüren, beheben Schleif- und Klemmschäden an Türen und Fenstern und sanieren oberflächliche Beschädigungen an Treppenstufen.\n\nBei historischen oder wertvollen Holzelementen nutzen wir hochwertige Epoxidharz-Systeme oder Passstücke aus farblich passendem Altholz, um Fehlstellen unauffällig zu ergänzen. Auch die Sanierung von verwitterten Holzfensterrahmen gehört zu unseren Leistungen. Dabei entfernen wir lose und morsche Holzteile, behandeln das gesunde Holz mit Tiefengrund und bauen das Profil mit speziellen 2-Komponenten-Holzersatzmassen wieder formstabil auf. Anschließend lassen sich die Beschläge wieder fest im Rahmen verschrauben.',
    faq: [
      { q: 'Lohnt sich die Reparatur eines alten Holzfensters?', a: 'Bei substanziell intakten Rahmen lohnt sich eine Reparatur fast immer. Insbesondere im Altbau oder bei denkmalgeschützten Gebäuden ist der Erhalt originaler Substanz wünschenswert und meist günstiger als eine teure Maßanfertigung eines neuen Fensters.' },
      { q: 'Wie repariert man eine schleifende Zimmertür?', a: 'Häufig reicht es, die Fitschenringe an den Bändern (Scharnieren) anzupassen oder die Türbänder neu einzustellen. Falls die Tür verzogen ist, kann es notwendig sein, das Türblatt fachgerecht nachzuhobeln.' },
      { q: 'Können Kratzer im Parkett oder auf der Holztreppe entfernt werden?', a: 'Ja, leichte Kratzer in geölten Böden lassen sich oft partiell ausschleifen und nachölen. Tiefe Dellen können mit passendem Hartwachs verfüllt werden. Bei flächiger Abnutzung hilft ein Komplettschliff der Oberfläche.' }
    ]
  },
  {
    slug: 'holzkonstruktionen',
    title: 'Individuelle Holzkonstruktionen nach Maß | Böblingen',
    desc: 'Maßgefertigte Holzkonstruktionen für Haus und Garten. Individueller Holzbau in Sindelfingen, Herrenberg und Leonberg.',
    h1: 'Individuelle Holzkonstruktionen',
    intro: 'Für besondere räumliche Gegebenheiten oder ausgefallene Ideen gibt es keine Lösungen von der Stange. Wir realisieren individuelle Holzkonstruktionen nach Maß im gesamten Kreis Böblingen, Schönaich und Umland.',
    details: 'Egal ob Hochbeete, spezielle Unterstände für Mülltonnen oder Kaminholz, verwinkelte Regalsysteme für den Keller oder maßgeschneiderte Podeste – wir entwerfen und bauen Holzkonstruktionen, die exakt auf Ihre Bedürfnisse zugeschnitten sind. Wir besprechen mit Ihnen das Vorhaben vor Ort, nehmen präzise Aufmaß und wählen die geeigneten Hölzer und Verbindungsmittel für Ihr Projekt aus.\n\nEine sorgfältige Planung garantiert dabei nicht nur die optimale Nutzung des vorhandenen Platzes, sondern auch statische Stabilität und Langlebigkeit. Wir setzen sowohl moderne Befestigungstechnik als auch klassische Holzverbindungen ein, um optisch ansprechende Ergebnisse zu erzielen. Jedes Projekt wird als Unikat mit handwerklicher Sorgfalt gefertigt – passgenau, robust und auf Wunsch mit entsprechender Oberflächenbehandlung durch Öle, Wachse oder Lacke veredelt.',
    faq: [
      { q: 'Können Sie auch Vorhaben ohne konkreten Bauplan umsetzen?', a: 'Ja, absolut. Oft reicht eine Skizze oder eine grundlegende Idee. Wir übernehmen die technische Planung, machen Vorschläge zur Konstruktion und setzen das Projekt anschließend um.' },
      { q: 'Welche Holzdicke wird für Hochbeete empfohlen?', a: 'Da die feuchte Erde dauerhaft auf das Holz einwirkt, empfehlen wir für Hochbeete robuste Bohlen mit einer Stärke von mindestens 28 bis 45 mm, vorzugsweise aus Lärche oder Douglasie. Zusätzlich schützen wir das Holz innen mit einer speziellen Noppenfolie.' },
      { q: 'Fertigen Sie auch individuelle Treppen oder Leitern?', a: 'Wir konstruieren einfache Raumspartreppen, stabile Holzleitern für Hochebenen im Kinderzimmer oder robuste Außentreppen für Gartenböschungen. Komplette Wohnraumtreppen für Neubauten verweisen wir jedoch an spezialisierte Treppenbau-Betriebe.' }
    ]
  }
];

async function run() {
  const baseDir = path.join(__dirname, 'src', 'app', 'leistungen');
  
  // Create base dir
  await fs.mkdir(baseDir, { recursive: true });

  for (const page of pages) {
    const pageDir = path.join(baseDir, page.slug);
    await fs.mkdir(pageDir, { recursive: true });
    
    const pageContent = `import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "${page.title}",
  description: "${page.desc}",
  robots: "index, follow",
};

export default function ${page.slug.replace(/-/g, '')}Page() {
  const faqData = [
${page.faq.map(f => `    { question: \`${f.q}\`, answer: \`${f.a}\` }`).join(',\n')}
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] pt-32 pb-24 px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "${page.h1}", url: \`https://www.tf-m.de/leistungen/${page.slug}\` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">${page.h1}</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">${page.intro}</p>
          <div className="whitespace-pre-line">${page.details}</div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-black/5">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Häufig gestellte Fragen (FAQ)</h2>
          <div className="flex flex-col gap-8">
            {faqData.map((item, index) => (
              <div key={index}>
                <h3 className="font-display text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-[#6e6e73] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`;

    await fs.writeFile(path.join(pageDir, 'page.tsx'), pageContent, 'utf-8');
  }
}

run().catch(console.error);
