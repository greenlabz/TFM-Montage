import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.tf-m.de/sitemap.xml',
    host: 'https://www.tf-m.de',
  }
}
