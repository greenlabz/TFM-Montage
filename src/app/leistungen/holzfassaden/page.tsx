import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Holzfassaden & Holzverkleidungen | Kreis Böblingen",
  description: "Fachgerechte Montage von Holzfassaden und Holzverkleidungen in Böblingen und Umgebung. Hochwertiger Holzschutz und langlebige Konstruktionen.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/holzfassaden" },
  openGraph: { title: "Holzfassaden & Holzverkleidungen | Kreis Böblingen", description: "Fachgerechte Montage von Holzfassaden und Holzverkleidungen in Böblingen und Umgebung.", url: "/leistungen/holzfassaden", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Holzfassaden & Holzverkleidungen | Kreis Böblingen", description: "Holzfassaden und Holzverkleidungen in Böblingen und Umgebung.", images: ["/og-tfm.jpg"] },
};

export default function holzfassadenPage() {
  const faqData = [
    { question: `Muss eine Holzfassade zwingend gestrichen werden?`, answer: `Nein. Wenn Sie beständige Hölzer wie Lärche oder Douglasie verwenden, können diese auch unbehandelt bleiben. Sie erhalten dann im Laufe der Zeit durch die Witterung eine silbergraue Patina. Wer den originalen Holzfarbton erhalten möchte, muss die Fassade regelmäßig lasieren.` },
    { question: `Was ist eine hinterlüftete Holzfassade?`, answer: `Bei einer hinterlüfteten Fassade wird zwischen der Gebäudewand (inklusive Dämmung) und der Holzverkleidung ein Luftspalt gelassen. Diese Hinterlüftung sorgt dafür, dass Feuchtigkeit abtransportiert wird und das Holz trocken bleibt.` },
    { question: `Bieten Sie auch Reparaturen an bestehenden Holzfassaden an?`, answer: `Ja, wir begutachten bestehende Holzfassaden auf Schäden, tauschen schadhafte Elemente aus und bessern fehlerhaften konstruktiven Holzschutz nach.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Holzfassaden & Holzverkleidungen", url: `https://www.tf-m.de/leistungen/holzfassaden` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Holzfassaden & Holzverkleidungen</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Holzfassaden bieten einen hervorragenden Witterungsschutz und verleihen Gebäuden eine natürliche, hochwertige Optik. Wir montieren und sanieren Holzfassaden und Wandverkleidungen für Gebäude im Kreis Böblingen, Sindelfingen und Herrenberg.</p>
          <div className="whitespace-pre-line">Eine fachgerecht installierte Holzfassade schützt die Bausubstanz vor Witterungseinflüssen und trägt zur thermischen Isolierung bei. Die Montage erfolgt in der Regel als vorgehängte hinterlüftete Fassade (VHF). Diese Konstruktionsweise stellt sicher, dass Feuchtigkeit hinter der Fassade schnell abtrocknen kann, was die Lebensdauer des Holzes drastisch erhöht und Schimmelbildung an der Gebäudewand verhindert.

Für Holzfassaden eignen sich besonders beständige Hölzer wie sibirische Lärche, Weißtanne, Douglasie oder auch speziell behandeltes Thermoholz. Ob Sie sich für eine offene Fugenschalung, Boden-Deckel-Schalung oder Rombusschalung entscheiden – wir setzen Ihre Wünsche präzise um. Zudem übernehmen wir den Austausch beschädigter Fassadenbretter und die Behandlung der Hölzer mit entsprechenden Lasuren oder deckenden Farben zum Schutz vor UV-Strahlung und Feuchtigkeit.</div>
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
