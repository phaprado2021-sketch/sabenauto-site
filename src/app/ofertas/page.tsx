import OfertasGrid from '@/components/OfertasGrid'
import { getOfertas, getLojas, getImagens } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Ofertas Especiais',
  description: 'Confira as ofertas e promoções das lojas Sabenauto em todo o Brasil. Peças genuínas GM e ACDelco com os melhores preços.',
  openGraph: {
    title: 'Ofertas Especiais | Sabenauto',
    description: 'Confira as ofertas e promoções das lojas Sabenauto em todo o Brasil.',
    url: 'https://sabenautopecas.com.br/ofertas',
  },
  alternates: { canonical: 'https://sabenautopecas.com.br/ofertas' },
}

export default function OfertasPage() {
  const ofertas = getOfertas().filter(o => o.ativo)
  const lojas = getLojas()
  const imagens = getImagens()

  return (
    <main>
      <section
        className="py-16 relative"
        style={{
          background: imagens.heroOfertasUrl
            ? `linear-gradient(135deg, rgba(10,31,60,0.88) 0%, rgba(26,58,107,0.88) 100%), url('${imagens.heroOfertasUrl}') center/cover no-repeat`
            : 'linear-gradient(135deg, #0a1f3c 0%, #1a3a6b 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">OFERTAS ESPECIAIS</h1>
          <p className="text-blue-200 text-lg max-w-2xl leading-relaxed">
            Peças originais GM e ACDelco com os melhores preços. Selecione a loja mais próxima e aproveite!
          </p>
        </div>
      </section>
      <OfertasGrid ofertas={ofertas} lojas={lojas} />
    </main>
  )
}
