import { MetadataRoute } from 'next'
import { guides } from '@/data/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tf-m.de'
  const lastModified = new Date('2026-07-20')

  const routes = [
    '',
    '/datenschutz',
    '/impressum',
    '/leistungen/holzterrassen',
    '/leistungen/holzfassaden',
    '/leistungen/carports',
    '/leistungen/zaeune',
    '/leistungen/innenausbau',
    '/leistungen/moebelmontage',
    '/leistungen/dachstuhl',
    '/leistungen/holzreparaturen',
    '/leistungen/holzkonstruktionen',
    '/ratgeber',
    ...guides.map((guide) => `/ratgeber/${guide.slug}`),
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '/impressum' || route === '/datenschutz' ? 'yearly' : route.startsWith('/ratgeber/') ? 'monthly' : 'weekly',
    priority: route === '' ? 1 : route === '/ratgeber' ? 0.9 : route.startsWith('/leistungen/') ? 0.85 : route.startsWith('/ratgeber/') ? 0.75 : 0.3,
  }))
}
