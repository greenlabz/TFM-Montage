import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Carports aus Holz bauen lassen | Kreis Böblingen",
  description: "Individuelle Carports aus Holz nach Maß. Fachgerechte Planung und Montage in Böblingen, Leonberg und Sindelfingen.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/carports" },
  openGraph: { title: "Carports aus Holz bauen lassen | Kreis Böblingen", description: "Individuelle Carports aus Holz nach Maß. Fachgerechte Planung und Montage in Böblingen, Leonberg und Sindelfingen.", url: "/leistungen/carports", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Carports aus Holz bauen lassen | Kreis Böblingen", description: "Individuelle Carports aus Holz nach Maß im Kreis Böblingen.", images: ["/og-tfm.jpg"] },
};

export default function carportsPage() {
  const faqData = [
    { question: `Benötige ich für einen Carport eine Baugenehmigung?`, answer: `Dies ist abhängig von der Größe des Carports und der jeweiligen Landesbauordnung (Baden-Württemberg) sowie dem örtlichen Bebauungsplan. Bis zu einer bestimmten Größe und Grenzbebauung sind Carports oft verfahrensfrei. Wir empfehlen vorab eine kurze Klärung mit dem örtlichen Bauamt.` },
    { question: `Welches Holz wird für einen Carport verwendet?`, answer: `Meist wird Konstruktionsvollholz (KVH) aus Fichte, Tanne oder Kiefer verwendet, welches imprägniert oder gestrichen werden muss. Für besonders beanspruchte Teile kann auch kesseldruckimprägniertes (KDI) Holz eingesetzt werden.` },
    { question: `Kann ich mein Carport später noch erweitern oder verschließen?`, answer: `Ja, Holzcarports lassen sich in der Regel sehr gut nachträglich mit Seitenwänden ausstatten oder um einen Geräteschuppen erweitern. Eine stabile Grundkonstruktion ist dafür die Voraussetzung.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Carports aus Holz – Individuell und Robust", url: `https://www.tf-m.de/leistungen/carports` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Carports aus Holz – Individuell und Robust</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Ein Carport aus Holz schützt Ihr Fahrzeug zuverlässig vor Witterungseinflüssen wie Regen, Schnee und Hagel. Wir planen, liefern und montieren individuelle Holz-Carports im gesamten Kreis Böblingen, Schönaich und Leonberg.</p>
          <div className="whitespace-pre-line">Im Gegensatz zu einer geschlossenen Garage bietet ein Carport den Vorteil einer ständigen Luftzirkulation. Nasse Fahrzeuge trocknen deutlich schneller ab, was die Rostgefahr erheblich reduziert. Zudem fügt sich eine Holzkonstruktion oft harmonischer in die bestehende Grundstücksgestaltung ein. Wir errichten Einzelcarports, Doppelcarports sowie Carports mit integriertem Geräteraum für Fahrräder oder Gartengeräte.

Die Konstruktion erfolgt in der Regel aus widerstandsfähigem Konstruktionsvollholz (KVH) oder Brettschichtholz (BSH), um eine hohe statische Tragfähigkeit und Verwindungssteifigkeit zu garantieren. Wir kümmern uns um die fachgerechte Verankerung mittels H-Pfostenträgern im Betonfundament, um die Konstruktion vor aufsteigender Bodenfeuchtigkeit zu schützen. Das Dach kann je nach Wunsch als Flachdach, Pultdach oder Satteldach ausgeführt werden.</div>
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
    </main>
  );
}
