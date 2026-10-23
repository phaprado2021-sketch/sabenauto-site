'use client'
import { useState } from 'react'
import Image from 'next/image'
import { pecas } from '@/lib/data'
import type { Loja } from '@/lib/data'
import FadeIn from './FadeIn'

const LIMITE_INICIAL = 6

export default function CatalogoPecas({ lojas }: { lojas: Loja[] }) {
  const [expandido, setExpandido] = useState(false)
  const [pecaAberta, setPecaAberta] = useState<typeof pecas[0] | null>(null)

  const lista = expandido ? pecas : pecas.slice(0, LIMITE_INICIAL)

  function abrirPeca(p: typeof pecas[0]) {
    setPecaAberta(p)
  }

  function fecharPeca() {
    setPecaAberta(null)
  }

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#007BFF' }}>
            Selecione a Categoria
          </h2>
          <p className="text-sm text-gray-500 mb-10">
            Selecione a categoria desejada e fale com um de nossos consultores para encontrar a peça certa para o seu veículo.
          </p>
        </FadeIn>

        {/* Modal overlay */}
        {pecaAberta && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={fecharPeca}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-lg w-full p-5 sm:p-8">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-lg font-bold text-gray-800">{pecaAberta.categoria}</h3>
                  <button
                    onClick={fecharPeca}
                    className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                    aria-label="Fechar"
                  >
                    ✕
                  </button>
                </div>
                <Image
                  src={pecaAberta.imagem}
                  alt={pecaAberta.categoria}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                  unoptimized
                />
                <p className="text-sm text-gray-500 mb-4">
                  Entre em contato com nossa equipe via WhatsApp para solicitar esta peça:
                </p>
                <div className="flex flex-col gap-2">
                  {lojas.filter(l => l.whatsapp).map(loja => {
                    const msg = encodeURIComponent(
                      `Olá, estava navegando no site. Gostaria de saber mais sobre ${pecaAberta.categoria}. Pode me ajudar?`
                    )
                    return (
                      <a
                        key={loja.key}
                        href={`https://wa.me/${loja.whatsapp}?text=${msg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all hover:opacity-90"
                        style={{ background: '#007BFF' }}
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L0 24l6.335-1.501A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.213-3.722.882.937-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
                        </svg>
                        {loja.cidade}
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Grid de categorias */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-7 lg:gap-x-6 lg:gap-y-8">
          {lista.map(peca => (
            <button
              key={peca.categoria}
              onClick={() => abrirPeca(peca)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-full aspect-[4/3] flex items-end justify-center mb-3">
                <Image
                  src={peca.imagem}
                  alt={peca.categoria}
                  width={200}
                  height={150}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 leading-tight">
                {peca.categoria}
              </p>
              <div className="w-full border-t border-gray-200 mb-2" />
              <span className="text-xs font-medium" style={{ color: '#007BFF' }}>
                Ver peças
              </span>
            </button>
          ))}
        </div>

        {/* Botão Ver todas */}
        <div className="text-center mt-10">
          {!expandido ? (
            <button
              onClick={() => setExpandido(true)}
              className="bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all hover:bg-gray-700"
            >
              Ver todas as categorias
            </button>
          ) : (
            <button
              onClick={() => setExpandido(false)}
              className="bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all hover:bg-gray-700"
            >
              Ver menos
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
