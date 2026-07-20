import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Innenausbau mit Holz: Wandverkleidungen & Decken | Böblingen",
  description: "Individueller Innenausbau mit Holz. Wir realisieren Wandverkleidungen, Decken und Einbauten fachgerecht in Böblingen und Region.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/innenausbau" },
  openGraph: { title: "Innenausbau mit Holz | Böblingen", description: "Wandverkleidungen, Decken und Einbauten aus Holz in Böblingen und Umgebung.", url: "/leistungen/innenausbau", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Innenausbau mit Holz | Böblingen", description: "Innenausbau mit Holz im Kreis Böblingen.", images: ["/og-tfm.jpg"] },
};

export default function innenausbauPage() {
  const faqData = [
    { question: `Verbessern Holzverkleidungen die Raumakustik?`, answer: `Ja, Holz besitzt von Natur aus gute schallabsorbierende Eigenschaften. Mit speziellen Akustikpaneelen (z.B. geschlitzten oder perforierten Holzplatten) lässt sich der Nachhall in Räumen extrem effektiv reduzieren, was besonders in großen oder spartanisch eingerichteten Räumen von Vorteil ist.` },
    { question: `Welche Hölzer eignen sich für den Innenausbau?`, answer: `Für den Innenbereich eignen sich nahezu alle Holzarten, da sie nicht der Witterung ausgesetzt sind. Sehr beliebt sind helle Hölzer wie Ahorn, Birke oder Fichte, aber auch Eiche oder Nussbaum für markantere Akzente.` },
    { question: `Kann Holz im Badezimmer verbaut werden?`, answer: `Ja, auch in Feuchträumen kann Holz verwendet werden, sofern die Hinterlüftung gewährleistet ist und das richtige Holz (z.B. Teak, Merbau oder auch speziell behandelte Eiche) gewählt wird. Wichtig ist zudem die Oberflächenbehandlung mit wasserabweisenden Ölen oder Lacken.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Innenausbau mit Holz", url: `https://www.tf-m.de/leistungen/innenausbau` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Innenausbau mit Holz</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Holz bringt Wärme, Behaglichkeit und ein gesundes Raumklima in Ihr Zuhause. Für Kunden im Kreis Böblingen, Leonberg und Herrenberg übernehmen wir sämtliche Innenausbauarbeiten mit Holz, von Wandverkleidungen bis zur Deckenmontage.</p>
          <div className="whitespace-pre-line">Beim Innenausbau mit Holz sind Präzision und sauberes Arbeiten unerlässlich. Wir montieren hochwertige Holzdecken, Wandpaneele und Akustikelemente. Holzverkleidungen eignen sich hervorragend, um die Raumakustik zu verbessern, unschöne Leitungen zu verbergen oder einfach gestalterische Akzente zu setzen. Dabei arbeiten wir mit Massivholzprofilen, Echtholzfurnierplatten oder auch modernen Dekor-Paneelen.

Darüber hinaus fertigen und montieren wir passgenaue Verkleidungen für Treppen, Heizkörper oder Nischen. Wenn der Dachboden ausgebaut werden soll, übernehmen wir die Beplankung der Dachschrägen und die Erstellung von Trennwänden in Holzständerbauweise. Jede Konstruktion wird auf die speziellen Gegebenheiten vor Ort angepasst, um ein perfektes Spaltmaß und nahtlose Übergänge zu garantieren.</div>
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
