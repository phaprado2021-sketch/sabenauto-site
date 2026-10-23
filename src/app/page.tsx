import Carrossel from '@/components/Carrossel'
import CardsEstados from '@/components/CardsEstados'
import Vantagens from '@/components/Vantagens'
import CatalogoPecas from '@/components/CatalogoPecas'
import OndeEstamos from '@/components/OndeEstamos'
import QuemSomos from '@/components/QuemSomos'
import BannerEstados from '@/components/BannerEstados'
import FadeIn from '@/components/FadeIn'
import Link from 'next/link'
import { getCarrossel, getLojas, getImagens, getEstadosCards } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Sabenauto Distribuidora de Peças',
  description: 'Peças genuínas GM e ACDelco com mais de 50 anos de tradição. Presente em Acre, Amazonas, Ceará, Mato Grosso, Rio de Janeiro, Rondônia e Distrito Federal.',
}

export default async function Home() {
  const slides = await getCarrossel()
  const lojas = await getLojas()
  const imagens = await getImagens()
  const estadosCards = await getEstadosCards()

  return (
    <main>
      {/* 1. Carrossel — full-bleed, sem fade */}
      <Carrossel slides={slides} />

      {/* 2. Cards de estados — FadeIn interno (stagger por item) */}
      <CardsEstados estadosCards={estadosCards} />

      {/* 3. Vantagens — FadeIn interno (stagger por card) */}
      <Vantagens />

      {/* 4. Catálogo de peças — FadeIn interno */}
      <CatalogoPecas lojas={lojas} />

      {/* 5. Varejo / Atacado / Ofertas */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            <FadeIn delay={0}>
              <div className="flex flex-col gap-4">
                <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  {imagens.homeVarejoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagens.homeVarejoUrl} alt="Balcão de peças Sabenauto" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #007BFF, #0056cc)' }}>
                      <span className="text-white/60 text-sm font-medium">Adicionar imagem no Admin</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Balcão de Peças</p>
                  <p className="text-base font-bold text-gray-800 mb-3 leading-snug">
                    Compre peças genuínas direto no balcão da loja mais próxima de você.
                  </p>
                  <Link href="/varejo" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#007BFF' }}>
                    Ver lojas
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={130}>
              <div className="flex flex-col gap-4">
                <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  {imagens.homeAtacadoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagens.homeAtacadoUrl} alt="Atacado Sabenauto" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a2a3a, #2c3e50)' }}>
                      <span className="text-white/60 text-sm font-medium">Adicionar imagem no Admin</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Atacado B2B</p>
                  <p className="text-base font-bold text-gray-800 mb-3 leading-snug">
                    Compre em grandes quantidades e garanta preços especiais para sua oficina ou revendedora.
                  </p>
                  <Link href="/atacado" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#007BFF' }}>
                    Falar com especialista
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={260}>
              <div className="flex flex-col gap-4">
                <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                  {imagens.homeOfertasUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagens.homeOfertasUrl} alt="Ofertas Sabenauto" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e67e22, #f39c12)' }}>
                      <span className="text-white/60 text-sm font-medium">Adicionar imagem no Admin</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Últimas oportunidades</p>
                  <p className="text-base font-bold text-gray-800 mb-3 leading-snug">
                    Confira as ofertas especiais e promoções exclusivas nas nossas lojas.
                  </p>
                  <Link href="/ofertas" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#007BFF' }}>
                    Ver ofertas
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 6. Onde Estamos */}
      <FadeIn>
        <OndeEstamos lojas={lojas} />
      </FadeIn>

      {/* 7. Quem Somos */}
      <FadeIn delay={80}>
        <QuemSomos imageUrl={imagens.quemSomosUrl} />
      </FadeIn>

      {/* 8. Banner galpão */}
      <FadeIn>
        <BannerEstados logoUrl={imagens.logoUrl} />
      </FadeIn>
    </main>
  )
}
