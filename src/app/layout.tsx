import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tf-m.de"),
  title: "Thomas Frenzel | Montage & Handwerk in Böblingen",
  description: "Persönliche Montage- und Handwerksarbeiten in Böblingen und Umgebung: Möbel, Innenausbau, Reparaturen, Terrassen und Holzkonstruktionen.",
  applicationName: "Thomas Frenzel Montage & Handwerk",
  authors: [{ name: "Thomas Frenzel", url: "https://www.tf-m.de" }],
  creator: "Thomas Frenzel",
  publisher: "Thomas Frenzel Montage & Handwerk",
  category: "Handwerk",
  keywords: [
    "Montage Böblingen",
    "Holzarbeiten Böblingen",
    "Möbelmontage Böblingen",
    "Innenausbau Holz",
    "Holzreparatur",
    "Holzterrasse",
    "Holzkonstruktionen",
    "Handwerker Kreis Böblingen",
  ],
  alternates: {
    canonical: "https://www.tf-m.de",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.tf-m.de",
    siteName: "Thomas Frenzel Montage & Handwerk",
    title: "Thomas Frenzel | Montage & Handwerk in Böblingen",
    description: "Persönliche Montage- und Handwerksarbeiten in Böblingen und Umgebung – klar geplant und sauber ausgeführt.",
    images: [{ url: "/og-tfm.jpg", width: 1200, height: 630, alt: "Thomas Frenzel Montage und Handwerk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Frenzel | Montage & Handwerk in Böblingen",
    description: "Persönliche Montage- und Handwerksarbeiten in Böblingen und Umgebung.",
    images: ["/og-tfm.jpg"],
  },
  other: {
    "geo.region": "DE-BW",
    "geo.placename": "Böblingen",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: "#212121",
};

import StructuredData from "@/components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${sora.variable} ${dmSans.variable} antialiased selection:bg-brand-accent-a10 selection:text-brand-text-acc`}
      >
        <StructuredData 
          localBusiness={{
            name: "Thomas Frenzel · Montage & Handwerk",
            description: "Persönliche Montage- und Holzarbeiten in Böblingen und Umgebung.",
            telephone: "+49 170 9980942",
            email: "info@tf-m.de",
            streetAddress: "Hohenstaufenstr. 12",
            postalCode: "71032",
            addressLocality: "Böblingen",
            addressRegion: "Baden-Württemberg",
            addressCountry: "DE"
          }}
          person={{
            name: "Thomas Frenzel",
            jobTitle: "Holzmechaniker und Montage-Handwerker"
          }}
        />
        {children}
      </body>
    </html>
  );
}
