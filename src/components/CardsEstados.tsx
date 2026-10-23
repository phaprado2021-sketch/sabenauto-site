'use client'
import type { EstadoCard } from '@/lib/data'
import FadeIn from './FadeIn'

export default function CardsEstados({ estadosCards }: { estadosCards: EstadoCard[] }) {
  return (
    <section className="py-14" style={{ background: '#f0f4f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <FadeIn>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#007BFF' }}>
            Nossas Lojas
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Presente em 8 estados brasileiros, levando qualidade e tradição até você.
          </p>
        </FadeIn>

        {/* Gallery — desktop: expandable hover row */}
        <FadeIn delay={120}>
          <div className="hidden md:flex items-stretch gap-2 h-[340px] w-full overflow-hidden rounded-2xl">
            {estadosCards.map((estado) => (
              <div
                key={estado.sigla}
                className="relative group flex-grow w-16 transition-all duration-500 ease-in-out overflow-hidden rounded-xl hover:w-full cursor-pointer"
                style={{ minWidth: '3.5rem' }}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={estado.foto}
                  alt={estado.nome}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* "Em breve" ribbon */}
                {estado.status === 'em_breve' && (
                  <div
                    className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                  >
                    Em breve
                  </div>
                )}

                {/* Sigla — always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
                  <span className="text-white/50 font-black text-xs tracking-widest uppercase transition-opacity duration-300 group-hover:opacity-0 leading-none">
                    {estado.sigla}
                  </span>
                  <span className="text-white font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-tight">
                    {estado.nome}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 2-column grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {estadosCards.map((estado) => (
              <div key={estado.sigla} className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={estado.foto}
                  alt={estado.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {estado.status === 'em_breve' && (
                  <div
                    className="absolute top-2 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                  >
                    Em breve
                  </div>
                )}
                <div className="absolute bottom-0 left-0 p-3">
                  <p className="text-white font-bold text-sm leading-tight">{estado.nome}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
