import Image from "next/image"
import Link from "next/link"

export default function AdviceHeader() {
  return (
    <header className="advice-header">
      <Link href="/" className="advice-logo" aria-label="TFM Startseite">
      <Image src="/Tom Logo.webp" alt="Thomas Frenzel Montage und Handwerk" width={168} height={56} style={{ width: "auto", height: "auto" }} priority loading="eager" />
      </Link>
      <nav aria-label="Hauptnavigation">
        <Link href="/#gallery">Arbeiten</Link>
        <Link href="/#process">Ablauf</Link>
        <Link href="/ratgeber" aria-current="page">Ratgeber</Link>
      </nav>
      <a
        className="advice-header-cta conversion-cta"
        href="https://wa.me/491709980942?text=Hallo%20Thomas%2C%20ich%20habe%20eine%20Frage%20zu%20meinem%20Holzprojekt."
        target="_blank"
        rel="noreferrer"
      >
        Projektfoto senden
      </a>
    </header>
  )
}
