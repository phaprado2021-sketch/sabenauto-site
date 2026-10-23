import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import { getLojas, getSiteConfig, getRodape } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const BASE_URL = 'https://sabenautopecas.com.br'

export const metadata: Metadata = {
  title: {
    default: 'Sabenauto Distribuidora de Peças',
    template: '%s | Sabenauto',
  },
  description: 'Distribuidora de peças genuínas GM e ACDelco com mais de 50 anos de tradição. Presente em todo o Brasil.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: BASE_URL,
    siteName: 'Sabenauto',
    title: 'Sabenauto Distribuidora de Peças',
    description: 'Distribuidora de peças genuínas GM e ACDelco com mais de 50 anos de tradição. Presente em todo o Brasil.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sabenauto Distribuidora de Peças' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sabenauto Distribuidora de Peças',
    description: 'Distribuidora de peças genuínas GM e ACDelco com mais de 50 anos de tradição.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lojas = await getLojas()
  const siteConfig = await getSiteConfig()
  const rodape = await getRodape()
  const lojasWA = lojas
    .filter((l): l is typeof l & { whatsapp: string } => !!l.whatsapp)
    .map(l => ({ label: l.label, whatsapp: l.whatsapp }))

  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${poppins.variable} font-poppins antialiased min-h-full flex flex-col`}>
        <Header lojasWA={lojasWA} />
        <div className="flex-1">{children}</div>
        <Footer siteConfig={siteConfig} rodape={rodape} />
        <AnimateOnScroll />
      </body>
    </html>
  )
}
