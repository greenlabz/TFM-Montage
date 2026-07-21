"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Search, X } from "lucide-react"
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import type { Guide } from "@/data/guides"

type Summary = Pick<Guide, "slug" | "number" | "category" | "title" | "teaser" | "image" | "imageAlt" | "readingTime">

export function AdviceHero() {
  const reduced = useReducedMotion()
  return (
    <section className="advice-hero">
      <motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>TFM Werkstattwissen · 12 Anleitungen</motion.p>
      <div className="advice-hero-grid">
        <motion.h1 initial={reduced ? false : { opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
          Holz verstehen.<br />Fehler vermeiden.
        </motion.h1>
        <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .25 }}>
          <span className="advice-rule" />
          <p>Klare Antworten für Pflege, Oberfläche und kleine Reparaturen. Mit ehrlicher Grenze: wann Selbermachen reicht und wann Fachwissen nötig ist.</p>
        </motion.div>
      </div>
    </section>
  )
}

export function GuideExplorer({ guides, categories }: { guides: Summary[]; categories: string[] }) {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Alle")
  const reduced = useReducedMotion()
  const filtered = guides.filter((guide) => {
    const matchesCategory = category === "Alle" || guide.category === category
    const haystack = `${guide.title} ${guide.teaser} ${guide.category}`.toLowerCase()
    return matchesCategory && haystack.includes(query.toLowerCase().trim())
  })

  return (
    <section className="advice-explorer" aria-labelledby="guides-heading">
      <div className="advice-tools">
        <div>
          <p>Nachschlagen</p>
          <h2 id="guides-heading">Was willst du lösen?</h2>
        </div>
        <label className="advice-search">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Ratgeber durchsuchen</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="z. B. Wasserfleck" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Suche löschen"><X size={18} /></button>}
        </label>
      </div>
      <div className="advice-filters" aria-label="Themen filtern">
        {categories.map((item) => (
          <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
        ))}
      </div>
      <div className="advice-grid">
        {filtered.map((guide, index) => (
          <motion.article
            key={guide.slug}
            className={`advice-card advice-card-${index % 6}`}
            initial={reduced ? false : { opacity: 0, y: 46 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: .16 }}
            transition={{ duration: .65, delay: Math.min(index % 3, 2) * .08, ease: [.22, 1, .36, 1] }}
          >
            <Link href={`/ratgeber/${guide.slug}`} aria-label={`${guide.title} lesen`}>
              <div className="advice-card-image">
                <Image src={guide.image} alt={guide.imageAlt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </div>
              <div className="advice-card-copy">
                <div className="advice-card-meta"><span>{guide.number} · {guide.category}</span><span>{guide.readingTime}</span></div>
                <h3>{guide.title}</h3>
                <p>{guide.teaser}</p>
                <span className="advice-read">Anleitung lesen <ArrowUpRight size={20} /></span>
              </div>
            </Link>
            <div className="advice-card-action">
              <span>Dein Projekt sieht ähnlich aus?</span>
              <a
                className="conversion-cta advice-card-whatsapp"
                href={`https://wa.me/491709980942?text=${encodeURIComponent(`Hallo Thomas, ich habe den Ratgeber „${guide.title}“ gelesen. Hier ist ein Foto von meinem Projekt:`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Projektfoto senden <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
      {!filtered.length && <p className="advice-empty">Kein Treffer. Anderen Begriff oder „Alle“ wählen.</p>}
    </section>
  )
}

export function ArticleProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: .001 })
  return <motion.div className="article-progress" style={{ scaleX }} />
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion()
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, ease: [.22, 1, .36, 1] }}>
      {children}
    </motion.div>
  )
}
