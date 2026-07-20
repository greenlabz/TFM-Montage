import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und Anbieterangaben von Thomas Frenzel Montage & Handwerk in Böblingen.',
  alternates: { canonical: '/impressum' },
};

export default function Impressum() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-[#C49A6C] selection:text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#86868b] hover:text-[#C49A6C] transition-colors mb-8">
          &larr; Zurück zur Startseite
        </Link>
        
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-10 tracking-tight">Impressum</h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-[#6e6e73]">
          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Thomas Frenzel<br />
              Hohenstaufenstr. 12<br />
              71032 Böblingen
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">Kontakt</h2>
            <p>
              Telefon: +49 170 9980942<br />
              E-Mail: <a href="mailto:info@tf-m.de" className="text-[#C49A6C] hover:underline">info@tf-m.de</a><br />
              Website: <a href="https://www.tf-m.de" className="text-[#C49A6C] hover:underline">www.tf-m.de</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">Berufsbezeichnung & Kammer</h2>
            <p>
              Berufsbezeichnung: Holzmechaniker<br />
              Zuständige Kammer: Handwerkskammer Region Stuttgart
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
