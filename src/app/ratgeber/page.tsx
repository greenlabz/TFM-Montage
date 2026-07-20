import type { Metadata } from "next"
import AdviceHeader from "@/components/advice/AdviceHeader"
import AdviceFooter from "@/components/advice/AdviceFooter"
import { AdviceHero, GuideExplorer } from "@/components/advice/AdviceMotion"
import { guideCategories, guides } from "@/data/guides"

export const metadata: Metadata = {
  title: "Holz-Ratgeber: Pflege, Reparatur und Oberflächen | TFM",
  description: "12 klare Anleitungen zu Holzpflege, Kratzern, Wasserflecken, Lack, Furnier und kleinen Reparaturen. Aus der Praxis von Thomas Frenzel.",
  keywords: ["Holzpflege", "Holz reparieren", "Kratzer im Holz entfernen", "Holz lackieren", "Wasserflecken Holz", "Holz Ratgeber"],
  alternates: { canonical: "https://www.tf-m.de/ratgeber" },
  openGraph: {
    title: "Holz verstehen. Fehler vermeiden. | TFM Ratgeber",
    description: "Praxiswissen für Holzpflege, Oberflächen und kleine Reparaturen.",
    url: "https://www.tf-m.de/ratgeber",
    type: "website",
    images: [{ url: "/holzpflege.jpg", width: 1200, height: 630, alt: "Holzpflege und Reparaturwissen von TFM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Holz verstehen. Fehler vermeiden. | TFM Ratgeber",
    description: "12 klare Anleitungen zu Holzpflege, Oberflächen und kleinen Reparaturen.",
    images: ["/holzpflege.jpg"],
  },
}

export default function RatgeberPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TFM Holz-Ratgeber",
    description: "Praxisanleitungen zu Holzpflege, Reparatur und Oberflächen.",
    url: "https://www.tf-m.de/ratgeber",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.tf-m.de/ratgeber/${guide.slug}`,
        name: guide.title,
      })),
    },
  }

  return (
    <main className="advice-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema).replace(/</g, '\\u003c') }} />
      <AdviceHeader />
      <AdviceHero />
      <GuideExplorer guides={guides} categories={guideCategories} />
      <section className="advice-trust">
        <p>Aus der Praxis</p>
        <h2>Keine Abkürzung, die das Holz später bezahlt.</h2>
        <div>
          <span>Material zuerst bestimmen</span>
          <span>Immer verdeckt testen</span>
          <span>Bei Tragwerk und Schadstoffen stoppen</span>
        </div>
      </section>
      <AdviceFooter />
    </main>
  )
}
