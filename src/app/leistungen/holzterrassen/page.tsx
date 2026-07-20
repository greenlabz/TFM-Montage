import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Holzterrassen Bau, Sanierung & Pflege im Kreis Böblingen",
  description: "Professioneller Bau, Sanierung und Pflege von Holzterrassen in Böblingen, Sindelfingen, Herrenberg und Leonberg. Fachgerechte Ausführung.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/holzterrassen" },
  openGraph: { title: "Holzterrassen: Bau, Sanierung & Pflege | Böblingen", description: "Bau, Sanierung und Pflege von Holzterrassen in Böblingen, Sindelfingen, Herrenberg und Leonberg.", url: "/leistungen/holzterrassen", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Holzterrassen: Bau, Sanierung & Pflege | Böblingen", description: "Holzterrassen im Kreis Böblingen bauen, sanieren und pflegen.", images: ["/og-tfm.jpg"] },
};

export default function holzterrassenPage() {
  const faqData = [
    { question: `Welches Holz eignet sich am besten für Terrassen?`, answer: `Das hängt vom Budget und dem gewünschten Pflegeaufwand ab. Lärche und Douglasie sind preiswerte, heimische Hölzer. Tropenhölzer wie Bangkirai oder thermisch behandelte Hölzer (Thermoholz) bieten eine deutlich höhere Lebensdauer und Formstabilität.` },
    { question: `Wie oft muss eine Holzterrasse geölt werden?`, answer: `Wir empfehlen, die Holzterrasse ein- bis zweimal pro Jahr zu ölen, idealerweise im Frühjahr vor Beginn der Gartensaison und gegebenenfalls im Herbst. Das schützt das Holz vor Vergrauung und Rissbildung.` },
    { question: `Können morsche Terrassendielen ausgetauscht werden?`, answer: `Ja, einzelne beschädigte oder morsche Dielen können problemlos ausgetauscht werden. Wir prüfen dabei auch immer die Unterkonstruktion auf eventuelle Schäden.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Holzterrassen: Bau, Sanierung und Pflege", url: `https://www.tf-m.de/leistungen/holzterrassen` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Holzterrassen: Bau, Sanierung und Pflege</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Eine gut geplante und fachgerecht gebaute Holzterrasse erweitert den Wohnraum in den Garten hinein. Wir übernehmen die Konstruktion, den Bau sowie die fachgerechte Sanierung und Pflege von Holzterrassen im gesamten Kreis Böblingen, einschließlich Sindelfingen, Herrenberg, Leonberg und Schönaich.</p>
          <div className="whitespace-pre-line">Holz ist ein natürlicher Baustoff, der bei richtiger Verarbeitung und Pflege eine hohe Langlebigkeit bietet. Bei der Planung einer Holzterrasse achten wir besonders auf den konstruktiven Holzschutz. Das bedeutet, dass Wasser schnell abfließen kann und das Holz nach einem Regen rasch abtrocknet. Dies verhindert Staunässe und Fäulnisbildung. 

Wir beraten Sie bei der Auswahl der passenden Holzart – von langlebigen Harthölzern wie Bangkirai oder Garapa bis hin zu nachhaltigen europäischen Hölzern wie Lärche oder Douglasie. Jede Holzart hat spezifische Eigenschaften hinsichtlich Haltbarkeit, Pflegeaufwand und Witterungsbeständigkeit. Neben dem Neubau übernehmen wir auch die Reparatur beschädigter Terrassendielen und die professionelle Pflege durch Ölen oder Reinigen. Eine regelmäßige Pflege erhält nicht nur die schöne Optik, sondern verlängert auch die Lebensdauer Ihrer Terrasse signifikant.</div>
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
