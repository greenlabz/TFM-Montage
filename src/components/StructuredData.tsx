import React from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type StructuredDataProps = {
  faq?: FAQItem[];
  breadcrumb?: BreadcrumbItem[];
  localBusiness?: {
    name: string;
    description: string;
    telephone: string;
    email: string;
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  person?: {
    name: string;
    jobTitle: string;
  };
};

export default function StructuredData({ faq, breadcrumb, localBusiness, person }: StructuredDataProps) {
  const schemas: Record<string, unknown>[] = [];

  if (localBusiness) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://www.tf-m.de/#business",
      "name": localBusiness.name,
      "description": localBusiness.description,
      "telephone": localBusiness.telephone,
      "email": localBusiness.email,
      "image": "https://www.tf-m.de/og-tfm.jpg",
      "logo": "https://www.tf-m.de/Tom%20Logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": localBusiness.streetAddress,
        "postalCode": localBusiness.postalCode,
        "addressLocality": localBusiness.addressLocality,
        "addressRegion": localBusiness.addressRegion,
        "addressCountry": localBusiness.addressCountry
      },
      "areaServed": ["Böblingen", "Sindelfingen", "Herrenberg", "Leonberg", "Schönaich"],
      "url": "https://www.tf-m.de",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Montage- und Holzarbeiten",
        "itemListElement": ["Möbelmontage", "Innenausbau", "Holzreparaturen", "Holzterrassen", "Holzkonstruktionen"].map((name) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", name }
        }))
      }
    });
  }

  if (faq && faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  if (breadcrumb && breadcrumb.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    });
  }

  if (person) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://www.tf-m.de/#thomas-frenzel",
      "name": person.name,
      "jobTitle": person.jobTitle,
      "url": "https://www.tf-m.de/#about",
      "worksFor": { "@id": "https://www.tf-m.de/#business" }
    });
  }

  if (schemas.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas).replace(/</g, '\\u003c') }}
    />
  );
}
