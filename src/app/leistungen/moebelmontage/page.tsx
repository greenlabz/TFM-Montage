import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Professionelle Möbelmontage & Möbelbau | Kreis Böblingen",
  description: "Zuverlässiger Aufbau von Möbeln, Schränken und Regalsystemen. Fachgerechte Möbelmontage in Sindelfingen, Böblingen und Leonberg.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/moebelmontage" },
  openGraph: { title: "Möbelmontage & Möbelbau | Kreis Böblingen", description: "Aufbau von Möbeln, Schränken und Regalsystemen in Böblingen, Sindelfingen und Leonberg.", url: "/leistungen/moebelmontage", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Möbelmontage & Möbelbau | Kreis Böblingen", description: "Möbelmontage in Böblingen, Sindelfingen und Leonberg.", images: ["/og-tfm.jpg"] },
};

export default function moebelmontagePage() {
  const faqData = [
    { question: `Montieren Sie Möbel aller Hersteller?`, answer: `Ja, wir haben jahrelange Erfahrung im Aufbau von Möbelsystemen unterschiedlichster Hersteller – von klassischen Möbelhaus-Systemen wie IKEA (PAX, BESTÅ) bis hin zu hochwertigen Designermöbeln und Büroeinrichtungen.` },
    { question: `Können bestehende Möbel umgebaut oder angepasst werden?`, answer: `Ja, oft lassen sich Standardmöbel an spezielle Raumsituationen anpassen, z.B. durch das Einkürzen von Regalwänden wegen Dachschrägen oder das Anfertigen passender Blenden für Nischen.` },
    { question: `Helfen Sie auch beim Abbau und Wiederaufbau bei einem Umzug?`, answer: `Selbstverständlich. Wir demontieren Ihre wertvollen Möbel fachgerecht und bauen diese am neuen Standort wieder sicher und millimetergenau auf.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Möbelmontage & kleiner Möbelbau", url: `https://www.tf-m.de/leistungen/moebelmontage` }
        ]}
        service={{
          name: "Möbelmontage & kleiner Möbelbau",
          description: "Zuverlässiger Aufbau von Möbeln, Schränken und Regalsystemen im Kreis Böblingen.",
          serviceType: "Möbelmontage & Handwerk",
          url: "https://www.tf-m.de/leistungen/moebelmontage"
        }}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Möbelmontage & kleiner Möbelbau</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-12">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Ein fehlerfreier Aufbau sorgt für langlebige und sicher funktionierende Möbel. Wir bieten professionelle Möbelmontage für Privat- und Gewerbekunden in Böblingen, Sindelfingen, Schönaich und Umgebung an.</p>
          <div className="whitespace-pre-line">Der Aufbau komplexer Kleiderschränke, Büromöbelsysteme oder individuell geplanter Regale kann schnell zur Herausforderung werden. Wir übernehmen die fachgerechte Montage von Systemmöbeln namhafter Hersteller. Dazu gehört das präzise Ausrichten der Korpusse, das Einstellen der Scharniere und Spaltmaße sowie die sichere und verdeckte Wandbefestigung (Kippsicherung).

Neben der reinen Montage von Fertigmöbeln realisieren wir auch kleine Möbelbauprojekte und individuelle Anpassungen. Wenn Standardmaße nicht passen, schneiden wir Deckplatten, Passleisten oder Regalböden millimetergenau zu. Auch der Einbau von Schiebetüren in Nischen oder das Nachrüsten von Schubladenauszügen und Dämpfern (Soft-Close-Systeme) gehört zu unserem Leistungsspektrum. Sauberkeit, Vorsicht im Umgang mit den Bauteilen und eine besenreine Übergabe sind für uns selbstverständlich.</div>
        </div>

        <div className="bg-[#252527] text-white rounded-3xl p-8 md:p-10 mb-12 shadow-sm">
          <h3 className="font-display text-xl font-bold mb-3">Passendes Projekt & Ratgeber</h3>
          <p className="text-white/80 text-sm mb-6">Sieh dir Kundenbewertungen zur Möbelmontage oder nützliche Holz-Tipps an.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#portfolio" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-full text-xs font-display uppercase tracking-widest transition-colors">
              Kundenbeispiele & Bewertungen &rarr;
            </Link>
            <Link href="/ratgeber" className="inline-flex items-center gap-2 bg-[#9FA28F] hover:bg-[#8b8e7c] text-white px-5 py-3 rounded-full text-xs font-display uppercase tracking-widest transition-colors">
              Holz-Ratgeber lesen &rarr;
            </Link>
          </div>
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
