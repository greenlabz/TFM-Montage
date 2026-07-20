import { Metadata } from "next";
import Link from "next/link";
import StructuredData from "../../../components/StructuredData";

export const metadata: Metadata = {
  title: "Zäune & Sichtschutz aus Holz montieren | Böblingen",
  description: "Hochwertige Holzzäune und Sichtschutzelemente für Ihren Garten. Fachmännische Montage in Sindelfingen, Herrenberg und Böblingen.",
  robots: "index, follow",
  alternates: { canonical: "/leistungen/zaeune" },
  openGraph: { title: "Zäune & Sichtschutz aus Holz | Böblingen", description: "Holzzäune und Sichtschutzelemente mit Montage in Böblingen und Umgebung.", url: "/leistungen/zaeune", type: "website", images: ["/og-tfm.jpg"] },
  twitter: { card: "summary_large_image", title: "Zäune & Sichtschutz aus Holz | Böblingen", description: "Holzzäune und Sichtschutz im Kreis Böblingen.", images: ["/og-tfm.jpg"] },
};

export default function zaeunePage() {
  const faqData = [
    { question: `Wie tief müssen die Fundamente für einen Sichtschutz sein?`, answer: `Für einen stabilen und frostsicheren Halt empfehlen wir Fundamente mit einer Tiefe von mindestens 80 Zentimetern. Dies verhindert, dass sich die Fundamente bei Frost im Winter heben.` },
    { question: `Wie schütze ich Zaunpfosten am besten vor Fäulnis?`, answer: `Holzpfosten sollten niemals direkt einbetoniert oder in die Erde gegraben werden. Wir verwenden feuerverzinkte Pfostenträger (z.B. H-Anker oder U-Anker), sodass das Holz einige Zentimeter über dem Boden endet und Feuchtigkeit abtrocknen kann.` },
    { question: `Sind Lasuren für den Holzzaun notwendig?`, answer: `Bei kesseldruckimprägniertem (KDI) Holz ist ein sofortiger Anstrich nicht zwingend nötig, verlängert aber langfristig die Lebensdauer. Unbehandelte Hölzer sollten zum Schutz vor Bläuepilzen, UV-Strahlung und Feuchtigkeit mit einer geeigneten Holzschutzlasur gestrichen werden.` }
  ];

  return (
    <main className="service-page min-h-screen bg-[#f5f5f7] pt-24 sm:pt-32 pb-20 px-5 sm:px-6 md:px-16 text-[#1d1d1f]">
      <StructuredData
        faq={faqData}
        breadcrumb={[
          { name: "Startseite", url: "https://www.tf-m.de/" },
          { name: "Leistungen", url: "https://www.tf-m.de/#services" },
          { name: "Zäune & Sichtschutz aus Holz", url: `https://www.tf-m.de/leistungen/zaeune` }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-[#C49A6C] hover:text-[#a37e55] font-display uppercase tracking-widest text-xs mb-8 inline-block transition-colors">
          &larr; Zurück zur Startseite
        </Link>
        <span className="font-display text-[#C49A6C] uppercase tracking-[0.3em] text-xs mb-4 block">Handwerkliche Leistungen</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Zäune & Sichtschutz aus Holz</h1>
        
        <div className="prose prose-lg prose-p:text-[#6e6e73] prose-headings:text-[#1d1d1f] max-w-none mb-16">
          <p className="text-xl font-medium text-[#1d1d1f] mb-6">Ein Holzzaun oder Sichtschutz strukturiert den Garten und schützt Ihre Privatsphäre. Wir montieren langlebige Zaunanlagen und Sichtschutzelemente im Raum Böblingen, Sindelfingen und angrenzenden Orten.</p>
          <div className="whitespace-pre-line">Holzzäune vereinen Funktionalität mit natürlicher Ästhetik. Egal ob klassischer Jägerzaun, moderner Lamellenzaun, Rhombus-Sichtschutz oder massive Flechtzäune – wir sorgen für eine sturmsichere und lotrechte Montage. Die Stabilität einer Zaunanlage steht und fällt mit der fachgerechten Verankerung der Pfosten. Wir setzen Pfostenanker in Betonfundamente oder verwenden Einschlagbodenhülsen bei kleineren Projekten. Wichtig dabei ist, dass die Holzpfosten keinen direkten Erdkontakt haben, um Fäulnis vorzubeugen.

Zudem achten wir beim Sichtschutz auf den Winddruck. Da geschlossene Flächen dem Wind viel Angriffsfläche bieten, müssen die Fundamente entsprechend dimensioniert sein. Neben der Neuinstallation übernehmen wir auch Reparaturarbeiten an bestehenden Zäunen, den Austausch abgefaulteter Pfosten und die Ausrichtung wackeliger Zaunelemente.</div>
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
