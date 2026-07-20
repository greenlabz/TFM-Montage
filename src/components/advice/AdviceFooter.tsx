import Image from "next/image"
import Link from "next/link"

export default function AdviceFooter() {
  return (
    <footer className="advice-footer">
      <div className="advice-footer-main">
        <div>
          <Image src="/Tom Logo.png" alt="Thomas Frenzel Montage und Handwerk" width={190} height={64} style={{ width: "auto", height: "auto" }} />
          <p>Handwerk, Montage und Holzarbeiten im Kreis Böblingen.</p>
        </div>
        <div>
          <span>Seiten</span>
          <Link href="/">Startseite</Link>
          <Link href="/#gallery">Arbeiten</Link>
          <Link href="/ratgeber">Ratgeber</Link>
        </div>
        <div>
          <span>Kontakt</span>
          <a href="tel:+491709980942">+49 170 9980942</a>
          <a href="mailto:info@tf-m.de">info@tf-m.de</a>
          <a href="https://wa.me/491700980942" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="advice-footer-bottom">
        <span>© {new Date().getFullYear()} Thomas Frenzel</span>
        <div><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
      </div>
    </footer>
  )
}
