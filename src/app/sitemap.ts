import type { MetadataRoute } from 'next'
import { getLojas } from '@/lib/contentStore'

const BASE_URL = 'https://sabenautopecas.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const lojas = getLojas()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/varejo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/atacado`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/ofertas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/sobre-nos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/politica-de-privacidade`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/termos-de-uso`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const lojaRoutes: MetadataRoute.Sitemap = lojas.map(loja => ({
    url: `${BASE_URL}/lojas/${loja.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const ofertaRoutes: MetadataRoute.Sitemap = lojas.map(loja => ({
    url: `${BASE_URL}/ofertas/${loja.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...lojaRoutes, ...ofertaRoutes]
}
