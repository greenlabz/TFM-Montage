import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Holzreparaturen & Sanierung (Fenster, Türen) | Böblingen",
  description: "Fachgerechte Reparatur von Holzfenstern, Holztüren und Treppen. Sanierung von beschädigtem Holz in Böblingen und Sindelfingen.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/holzreparaturen" },
  openGraph: { title: "Holzreparaturen & Sanierung | Böblingen", description: "Reparatur von Holzfenstern, Holztüren und Treppen in Böblingen und Umgebung.", url: "/leistungen/holzreparaturen", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Holzreparaturen & Sanierung | Böblingen", description: "Holzreparaturen an Fenstern, Türen und Treppen im Kreis Böblingen.", images: ["/og-tfm.jpg"] },
};

export default function holzreparaturenPage() {
  const faqData = [
    { question: `Lohnt sich die Reparatur eines alten Holzfensters?`, answer: `Bei substanziell intakten Rahmen lohnt sich eine Reparatur fast immer. Insbesondere im Altbau oder bei denkmalgeschützten Gebäuden ist der Erhalt originaler Substanz wünschenswert und meist günstiger als eine teure Maßanfertigung eines neuen Fensters.` },
    { question: `Wie repariert man eine schleifende Zimmertür?`, answer: `Häufig reicht es, die Fitschenringe an den Bändern (Scharnieren) anzupassen oder die Türbänder neu einzustellen. Falls die Tür verzogen ist, kann es notwendig sein, das Türblatt fachgerecht nachzuhobeln.` },
    { question: `Können Kratzer im Parkett oder auf der Holztreppe entfernt werden?`, answer: `Ja, leichte Kratzer in geölten Böden lassen sich oft partiell ausschleifen und nachölen. Tiefe Dellen können mit passendem Hartwachs verfüllt werden. Bei flächiger Abnutzung hilft ein Komplettschliff der Oberfläche.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Holzreparaturen & Sanierung", url: `https://www.tf-m.de/leistungen/holzreparaturen` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Holzreparaturen & Sanierung</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Holz ist ein langlebiger Werkstoff, doch Witterung, mechanische Belastung oder Abnutzung hinterlassen Spuren. Wir führen professionelle Holzreparaturen an Türen, Fenstern, Treppen und Balken im Kreis Böblingen durch.</p>
          <div className="whitespace-pre-line">Nicht immer muss ein beschädigtes Holzbauteil komplett ausgetauscht werden. Durch fachmännische Reparaturen lässt sich die Funktion und Optik meist kostengünstig wiederherstellen. Wir reparieren ausgebrochene Scharniere an Holz- und Zimmertüren, beheben Schleif- und Klemmschäden an Türen und Fenstern und sanieren oberflächliche Beschädigungen an Treppenstufen.

Bei historischen oder wertvollen Holzelementen nutzen wir hochwertige Epoxidharz-Systeme oder Passstücke aus farblich passendem Altholz, um Fehlstellen unauffällig zu ergänzen. Auch die Sanierung von verwitterten Holzfensterrahmen gehört zu unseren Leistungen. Dabei entfernen wir lose und morsche Holzteile, behandeln das gesunde Holz mit Tiefengrund und bauen das Profil mit speziellen 2-Komponenten-Holzersatzmassen wieder formstabil auf. Anschließend lassen sich die Beschläge wieder fest im Rahmen verschrauben.</div>
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
