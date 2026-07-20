import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center items-center px-6">
      <h1 className="font-display text-7xl md:text-9xl font-bold text-[#1d1d1f] mb-4">404</h1>
      <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#6e6e73] mb-8 text-center">
        Diese Seite existiert leider nicht.
      </h2>
      <p className="font-body text-[#86868b] max-w-md text-center mb-10">
        Die gesuchte Seite wurde möglicherweise verschoben oder gelöscht.
      </p>
      <Link 
        href="/"
        className="bg-[#9FA28F] hover:bg-[#7e8674] text-white font-display uppercase tracking-widest text-sm px-10 py-4 rounded-full transition-colors shadow-lg"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
