import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, Clock, ShieldAlert } from "lucide-react"
import { notFound } from "next/navigation"
import AdviceHeader from "@/components/advice/AdviceHeader"
import AdviceFooter from "@/components/advice/AdviceFooter"
import { ArticleProgress, Reveal } from "@/components/advice/AdviceMotion"
import { getGuide, guides } from "@/data/guides"

export const dynamicParams = false

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  const url = `https://www.tf-m.de/ratgeber/${guide.slug}`
  return {
    title: `${guide.title} | TFM Ratgeber`,
    description: guide.quickAnswer.slice(0, 158),
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.teaser,
      url,
      type: "article",
      publishedTime: "2026-07-16",
      modifiedTime: "2026-07-16",
      authors: ["Thomas Frenzel"],
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.teaser,
      images: [guide.image],
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()
  const related = guides.filter((item) => item.slug !== guide.slug && (item.category === guide.category || guide.keywords.some((keyword) => item.keywords.includes(keyword)))).slice(0, 3)
  if (related.length < 3) {
    related.push(...guides.filter((item) => item.slug !== guide.slug && !related.some((entry) => entry.slug === item.slug)).slice(0, 3 - related.length))
  }
  const url = `https://www.tf-m.de/ratgeber/${guide.slug}`
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.teaser,
      image: `https://www.tf-m.de${guide.image}`,
      datePublished: "2026-07-16",
      dateModified: "2026-07-16",
      author: { "@type": "Person", name: "Thomas Frenzel", jobTitle: "Holzmechaniker und Montage-Handwerker" },
      publisher: { "@type": "Organization", name: "Thomas Frenzel Montage und Handwerk", logo: { "@type": "ImageObject", url: "https://www.tf-m.de/Tom%20Logo.png" } },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.tf-m.de" },
        { "@type": "ListItem", position: 2, name: "Ratgeber", item: "https://www.tf-m.de/ratgeber" },
        { "@type": "ListItem", position: 3, name: guide.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ]

  return (
    <main className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <ArticleProgress />
      <AdviceHeader />
      <article>
        <header className="article-hero">
          <Link href="/ratgeber" className="article-back"><ArrowLeft size={18} /> Alle Ratgeber</Link>
          <div className="article-kicker"><span>{guide.number}</span><span>{guide.category}</span><span><Clock size={16} /> {guide.readingTime}</span></div>
          <h1>{guide.title}</h1>
          <p className="article-deck">{guide.teaser}</p>
          <div className="article-author">
            <Image src="/tom pic.png" alt="Thomas Frenzel" width={48} height={48} />
            <div><strong>Thomas Frenzel</strong><span>Holzmechaniker · geprüft am 16.07.2026</span></div>
          </div>
        </header>

        <div className="article-lead-image">
          <Image src={guide.image} alt={guide.imageAlt} fill priority sizes="100vw" />
        </div>

        <div className="article-layout">
          <aside className="article-aside">
            <span>Inhalt</span>
            <a href="#kurzantwort">Kurzantwort</a>
            <a href="#vorbereitung">Vorbereitung</a>
            <a href="#anleitung">Schritt für Schritt</a>
            <a href="#fehler">Fehler vermeiden</a>
            <a href="#fragen">Häufige Fragen</a>
          </aside>
          <div className="article-content">
            <Reveal className="article-answer">
              <span id="kurzantwort">Kurzantwort</span>
              <p>{guide.quickAnswer}</p>
            </Reveal>

            <Reveal className="article-section">
              <p className="article-eyebrow">Vorbereitung</p>
              <h2 id="vorbereitung">Was du bereitlegst</h2>
              <ul className="article-materials">
                {guide.materials.map((item) => <li key={item}><Check size={18} />{item}</li>)}
              </ul>
            </Reveal>

            <section className="article-section">
              <p className="article-eyebrow">Anleitung</p>
              <h2 id="anleitung">Schritt für Schritt</h2>
              <div className="article-steps">
                {guide.steps.map((step, index) => (
                  <Reveal className="article-step" key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{step.title}</h3><p>{step.text}</p></div>
                  </Reveal>
                ))}
              </div>
            </section>

            <Reveal className="article-section">
              <p className="article-eyebrow">Typische Fehler</p>
              <h2 id="fehler">Das besser lassen</h2>
              <ul className="article-mistakes">
                {guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </Reveal>

            <Reveal className="article-warning">
              <ShieldAlert size={28} />
              <div><h2>Wann ein Fachbetrieb übernehmen sollte</h2><p>{guide.professionalWhen}</p></div>
            </Reveal>

            <section className="article-section">
              <p className="article-eyebrow">Kurz geklärt</p>
              <h2 id="fragen">Häufige Fragen</h2>
              <div className="article-faq">
                {guide.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}<span>+</span></summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <Reveal className="article-cta">
              <div><p>Noch unsicher?</p><h2>Ein Foto zeigt oft mehr als zehn Sätze.</h2></div>
              <a className="conversion-cta" href={`https://wa.me/491700980942?text=${encodeURIComponent(`Hallo Thomas, ich habe den Ratgeber „${guide.title}“ gelesen. Hier ist ein Foto von meinem Projekt:`)}`} target="_blank" rel="noreferrer">
                Projektfoto per WhatsApp <ArrowUpRight size={20} />
              </a>
            </Reveal>

            <section className="article-sources">
              <h2>Quellen und fachliche Grundlagen</h2>
              <p>Inhalt redaktionell aus Handwerkspraxis und den folgenden Verbraucher- und Fachinformationen erstellt.</p>
              <ul>{guide.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}<ArrowUpRight size={14} /></a></li>)}</ul>
            </section>
          </div>
        </div>
      </article>

      <section className="article-related">
        <p>Weiterlesen</p>
        <h2>Passende Anleitungen</h2>
        <div>{related.map((item) => <Link href={`/ratgeber/${item.slug}`} key={item.slug}><span>{item.number} · {item.category}</span><h3>{item.title}</h3><ArrowUpRight /></Link>)}</div>
      </section>
      <AdviceFooter />
    </main>
  )
}
