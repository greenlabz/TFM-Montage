import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Dachstuhl- & Zimmererarbeiten | Region Böblingen",
  description: "Kleine Dachstuhlarbeiten, Ausbesserungen und Holzbauarbeiten am Dach. Zuverlässiger Service in Böblingen und Sindelfingen.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/dachstuhl" },
  openGraph: { title: "Dachstuhl- & Zimmererarbeiten | Region Böblingen", description: "Kleine Dachstuhlarbeiten, Ausbesserungen und Holzbauarbeiten am Dach in Böblingen und Umgebung.", url: "/leistungen/dachstuhl", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Dachstuhl- & Zimmererarbeiten | Region Böblingen", description: "Dachstuhlarbeiten und Ausbesserungen in Böblingen und Umgebung.", images: ["/og-tfm.jpg"] },
};

export default function dachstuhlPage() {
  const faqData = [
    { question: `Woran erkenne ich, dass Holz am Dachstuhl morsch ist?`, answer: `Anzeichen für morsche Hölzer sind dunkle Verfärbungen, weiche, bröckelige Stellen, Risse, in denen sich Feuchtigkeit sammelt, oder das Vorhandensein von Holzmehl (ein Indiz für Schädlingsbefall wie den Holzbock).` },
    { question: `Können beschädigte Balken repariert werden, ohne das ganze Dach abzudecken?`, answer: `In vielen Fällen ja. Durch Techniken wie das Anblattungen oder den seitlichen Einbau von Verstärkungslaschen (Beiholz) können Tragfähigkeiten wiederhergestellt werden, ohne die gesamte Konstruktion freizulegen.` },
    { question: `Übernehmen Sie auch die Montage von Vordächern?`, answer: `Ja, wir konstruieren und montieren individuelle Vordächer aus Holz für Eingangsbereiche, maßgeschneidert passend zur Architektur Ihres Hauses.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Kleine Dachstuhl- & Zimmererarbeiten", url: `https://www.tf-m.de/leistungen/dachstuhl` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Kleine Dachstuhl- & Zimmererarbeiten</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Als erfahrener Partner für Holzbau übernehmen wir kleinere Zimmererarbeiten, Dachstuhl-Ausbesserungen und Holzkonstruktionen am Gebäude im Raum Böblingen, Herrenberg und Leonberg.</p>
          <div className="whitespace-pre-line">Auch wenn wir keine kompletten Dachstühle für Neubauten richten, sind wir Ihr Ansprechpartner für Reparaturen, Erweiterungen und Ausbesserungen am bestehenden Holz-Dachstuhl. Wir ersetzen morsche Sparrenköpfe, verstärken Pfetten und reparieren schadhafte Schalungen. Gerade bei älteren Gebäuden können durch eindringende Feuchtigkeit oder Schädlingsbefall Reparaturen an den tragenden Holzbauteilen notwendig werden.

Des Weiteren bauen wir Gauben aus, montieren Wechsel für Dachflächenfenster oder konstruieren Überdachungen für Terrassen und Hauseingänge. Die handwerksgerechte Ausführung traditioneller Holzverbindungen wie Verblattungen oder Zapfenverbindungen stellen für uns ebenso wenig ein Problem dar wie die moderne Befestigung mittels zugelassener Holzverbinder. Wir arbeiten eng mit Ihnen zusammen, um statisch einwandfreie und optisch ansprechende Lösungen umzusetzen.</div>
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
