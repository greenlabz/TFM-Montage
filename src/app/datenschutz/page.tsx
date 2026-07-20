import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von Thomas Frenzel Montage & Handwerk.',
  alternates: { canonical: '/datenschutz' },
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-[#C49A6C] selection:text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#86868b] hover:text-[#C49A6C] transition-colors mb-8">
          &larr; Zurück zur Startseite
        </Link>
        
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-10 tracking-tight">Datenschutzerklärung</h1>
        
        <div className="space-y-8 text-lg leading-relaxed text-[#6e6e73]">
          <p>
            Der Schutz deiner persönlichen Daten ist mir wichtig. Deine personenbezogenen Daten werden vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung behandelt.
          </p>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">1. Verantwortlicher</h2>
            <p>
              Thomas Frenzel<br />
              Hohenstaufenstr. 12<br />
              71032 Böblingen<br />
              Deutschland
            </p>
            <p className="mt-2">
              E-Mail: <a href="mailto:info@tf-m.de" className="text-[#C49A6C] hover:underline">info@tf-m.de</a><br />
              Telefon: +49 170 9980942
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">2. Hosting</h2>
            <p>
              Diese Website wurde mit Google Sites erstellt und wird über Google betrieben. Beim Besuch der Website werden automatisch Informationen in sogenannten Server-Logfiles gespeichert, die dein Browser automatisch übermittelt.
            </p>
            <p className="mt-2">Dies sind zum Beispiel:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>IP-Adresse</li>
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Uhrzeit der Serveranfrage</li>
            </ul>
            <p className="mt-4">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aufgrund meines berechtigten Interesses an einer technisch fehlerfreien Darstellung der Website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">3. Kontaktformular und Kontaktaufnahme</h2>
            <p>
              Wenn du mir über das Kontaktformular oder per E-Mail Anfragen zukommen lässt, werden deine Angaben inklusive der von dir angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage gespeichert.
            </p>
            <p className="mt-2">
              Diese Daten gebe ich nicht ohne deine Einwilligung weiter.
            </p>
            <p className="mt-2">
              Die Verarbeitung der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern deine Anfrage mit der Erfüllung eines Vertrags zusammenhängt, oder gemäß Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">4. Google Fonts</h2>
            <p>
              Diese Website verwendet Schriftarten von Google Fonts. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mt-2">
              Beim Aufruf einer Seite lädt dein Browser die benötigten Schriftarten in deinen Browsercache. Dabei kann es zur Übertragung deiner IP-Adresse an Server von Google kommen.
            </p>
            <p className="mt-2">
              Weitere Informationen findest du unter:<br />
              <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C49A6C] hover:underline">https://fonts.google.com</a><br />
              und in der Datenschutzerklärung von Google:<br />
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#C49A6C] hover:underline">https://policies.google.com/privacy</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">5. Google Maps</h2>
            <p>
              Diese Website nutzt den Kartendienst Google Maps. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p className="mt-2">
              Zur Nutzung der Funktionen von Google Maps ist es notwendig, deine IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google übertragen und dort gespeichert.
            </p>
            <p className="mt-2">
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung meiner Online-Angebote und an einer leichten Auffindbarkeit der von mir angegebenen Orte.
            </p>
            <p className="mt-2">
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">6. Instagram</h2>
            <p>
              Auf meiner Website findest du einen Link zu meinem Instagram-Profil.
            </p>
            <p className="mt-2">
              Beim Anklicken des Links verlässt du meine Website und wirst auf Instagram weitergeleitet. Ich habe keinen Einfluss auf die Datenverarbeitung durch Instagram.
            </p>
            <p className="mt-2">
              Weitere Informationen findest du in der Datenschutzerklärung von Instagram:<br />
              <a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer" className="text-[#C49A6C] hover:underline">https://help.instagram.com/519522125107875</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">7. Deine Rechte</h2>
            <p>Du hast jederzeit das Recht auf:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Auskunft über deine gespeicherten Daten</li>
              <li>Berichtigung unrichtiger Daten</li>
              <li>Löschung deiner Daten</li>
              <li>Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>
            <p className="mt-4">
              Hierzu kannst du dich jederzeit unter der oben angegebenen E-Mail-Adresse an mich wenden.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-[#1d1d1f] mb-4">8. Beschwerderecht bei der Aufsichtsbehörde</h2>
            <p>
              Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung deiner personenbezogenen Daten zu beschweren.
            </p>
            <p className="mt-2">
              Zuständige Aufsichtsbehörde:<br />
              Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
              <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer" className="text-[#C49A6C] hover:underline">https://www.baden-wuerttemberg.datenschutz.de</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
