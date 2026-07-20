import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Individuelle Holzkonstruktionen nach Maß | Böblingen",
  description: "Maßgefertigte Holzkonstruktionen für Haus und Garten. Individueller Holzbau in Sindelfingen, Herrenberg und Leonberg.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/holzkonstruktionen" },
  openGraph: { title: "Individuelle Holzkonstruktionen nach Maß | Böblingen", description: "Maßgefertigte Holzkonstruktionen für Haus und Garten im Kreis Böblingen.", url: "/leistungen/holzkonstruktionen", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Individuelle Holzkonstruktionen nach Maß | Böblingen", description: "Holzkonstruktionen für Haus und Garten im Kreis Böblingen.", images: ["/og-tfm.jpg"] },
};

export default function holzkonstruktionenPage() {
  const faqData = [
    { question: `Können Sie auch Vorhaben ohne konkreten Bauplan umsetzen?`, answer: `Ja, absolut. Oft reicht eine Skizze oder eine grundlegende Idee. Wir übernehmen die technische Planung, machen Vorschläge zur Konstruktion und setzen das Projekt anschließend um.` },
    { question: `Welche Holzdicke wird für Hochbeete empfohlen?`, answer: `Da die feuchte Erde dauerhaft auf das Holz einwirkt, empfehlen wir für Hochbeete robuste Bohlen mit einer Stärke von mindestens 28 bis 45 mm, vorzugsweise aus Lärche oder Douglasie. Zusätzlich schützen wir das Holz innen mit einer speziellen Noppenfolie.` },
    { question: `Fertigen Sie auch individuelle Treppen oder Leitern?`, answer: `Wir konstruieren einfache Raumspartreppen, stabile Holzleitern für Hochebenen im Kinderzimmer oder robuste Außentreppen für Gartenböschungen. Komplette Wohnraumtreppen für Neubauten verweisen wir jedoch an spezialisierte Treppenbau-Betriebe.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Individuelle Holzkonstruktionen", url: `https://www.tf-m.de/leistungen/holzkonstruktionen` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Individuelle Holzkonstruktionen</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Für besondere räumliche Gegebenheiten oder ausgefallene Ideen gibt es keine Lösungen von der Stange. Wir realisieren individuelle Holzkonstruktionen nach Maß im gesamten Kreis Böblingen, Schönaich und Umland.</p>
          <div className="whitespace-pre-line">Egal ob Hochbeete, spezielle Unterstände für Mülltonnen oder Kaminholz, verwinkelte Regalsysteme für den Keller oder maßgeschneiderte Podeste – wir entwerfen und bauen Holzkonstruktionen, die exakt auf Ihre Bedürfnisse zugeschnitten sind. Wir besprechen mit Ihnen das Vorhaben vor Ort, nehmen präzise Aufmaß und wählen die geeigneten Hölzer und Verbindungsmittel für Ihr Projekt aus.

Eine sorgfältige Planung garantiert dabei nicht nur die optimale Nutzung des vorhandenen Platzes, sondern auch statische Stabilität und Langlebigkeit. Wir setzen sowohl moderne Befestigungstechnik als auch klassische Holzverbindungen ein, um optisch ansprechende Ergebnisse zu erzielen. Jedes Projekt wird als Unikat mit handwerklicher Sorgfalt gefertigt – passgenau, robust und auf Wunsch mit entsprechender Oberflächenbehandlung durch Öle, Wachse oder Lacke veredelt.</div>
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
