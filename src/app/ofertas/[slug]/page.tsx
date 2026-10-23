import OfertasGrid from '@/components/OfertasGrid'
import { getOfertas, getLojas, getImagens } from '@/lib/contentStore'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function OfertasLojaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lojas = getLojas()
  const loja = lojas.find(l => l.slug === slug)

  if (!loja) notFound()

  const ofertas = getOfertas().filter(o => o.ativo && o.lojaSlug === slug)
  const imagens = getImagens()

  return (
    <main>
      <section
        className="py-16"
        style={{
          background: imagens.heroOfertasUrl
            ? `linear-gradient(135deg, rgba(10,31,60,0.88) 0%, rgba(26,58,107,0.88) 100%), url('${imagens.heroOfertasUrl}') center/cover no-repeat`
            : 'linear-gradient(135deg, #0a1f3c 0%, #1a3a6b 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-blue-300 text-sm mb-2">
            <Link href="/ofertas" className="hover:text-white transition-colors">← Todas as ofertas</Link>
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            OFERTAS — {loja!.label.toUpperCase()}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Promoções exclusivas da unidade {loja!.cidade}. Fale diretamente pelo WhatsApp!
          </p>
        </div>
      </section>
      <OfertasGrid ofertas={ofertas} lojas={lojas} selectedSlug={slug} />
    </main>
  )
}
