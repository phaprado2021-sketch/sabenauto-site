import { getLojas, getSiteConfig } from '@/lib/contentStore'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getLojas()).map(loja => ({ slug: loja.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loja = (await getLojas()).find(l => l.slug === slug)
  if (!loja) return {}
  return {
    title: `Sabenauto ${loja.cidade} – Distribuidora de Peças`,
    description: `Sabenauto em ${loja.cidade} – ${loja.estado}. Peças genuínas GM e ACDelco para sua oficina ou revenda.`,
    openGraph: {
      title: `Sabenauto ${loja.cidade} – Distribuidora de Peças`,
      description: `Sabenauto em ${loja.cidade} – ${loja.estado}. Peças genuínas GM e ACDelco.`,
      url: `https://sabenautopecas.com.br/lojas/${slug}`,
    },
    alternates: { canonical: `https://sabenautopecas.com.br/lojas/${slug}` },
  }
}

export default async function LojaPage({ params }: Props) {
  const { slug } = await params
  const lojas = await getLojas()
  const siteConfig = await getSiteConfig()
  const loja = lojas.find(l => l.slug === slug)
  if (!loja) notFound()

  return (
    <main>
      {/* Hero */}
      <section
        className="py-14 relative"
        style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #1a3a6b 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            {' › '}
            <Link href="/varejo" className="hover:text-white transition-colors">Varejo</Link>
            {' › '}
            {loja.cidade}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white">Sabenauto {loja.cidade}</h1>
          <p className="text-blue-200 mt-2 text-lg">{loja.cidade} – {loja.estado}</p>
        </div>
      </section>

      <section className="py-14" style={{ background: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Informações */}
            <div className="space-y-6">
              {loja.endereco && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Endereço</p>
                  <p className="text-gray-700">{loja.endereco}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loja.endereco)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-semibold"
                    style={{ color: '#007BFF' }}
                  >
                    Abrir no Google Maps ↗
                  </a>
                </div>
              )}
              {loja.phone && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Telefone</p>
                  <p className="text-gray-700">{loja.phone}</p>
                </div>
              )}
              {loja.email && (
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">E-mail</p>
                  <a href={`mailto:${loja.email}`} className="text-gray-700 hover:underline">{loja.email}</a>
                </div>
              )}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Horário</p>
                <p className="text-gray-700 text-sm">{siteConfig.horarioSemana}</p>
                <p className="text-gray-700 text-sm">{siteConfig.horarioSabado}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              {loja.whatsapp ? (
                <a
                  href={`https://wa.me/${loja.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-white font-bold py-4 px-6 rounded-2xl text-lg w-full transition-all hover:-translate-y-0.5"
                  style={{ background: '#25D366' }}
                >
                  Falar no WhatsApp
                </a>
              ) : (
                <div className="bg-gray-100 rounded-2xl p-6 text-center text-gray-400 border border-gray-200">
                  <p className="font-semibold mb-1">WhatsApp em configuração</p>
                  <p className="text-sm">Em breve teremos o contato disponível.</p>
                  {loja.phone && <p className="text-sm mt-2 font-medium text-gray-600">{loja.phone}</p>}
                </div>
              )}
              {loja.email && (
                <a
                  href={`mailto:${loja.email}`}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 font-semibold py-3 px-6 rounded-2xl text-sm w-full transition-colors"
                >
                  Enviar E-mail
                </a>
              )}
              <Link
                href="/varejo"
                className="flex items-center justify-center gap-2 text-sm font-semibold py-2 transition-colors"
                style={{ color: '#007BFF' }}
              >
                ← Ver todas as unidades
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
