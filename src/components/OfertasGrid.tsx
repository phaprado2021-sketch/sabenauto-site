import Link from 'next/link'
import type { Oferta } from '@/lib/contentStore'
import type { Loja } from '@/lib/data'

const WA_ICON = (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L0 24l6.335-1.501A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.213-3.722.882.937-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z" />
  </svg>
)

// ─── City/Store selection grid ─────────────────────────────────
function CityGrid({ lojasComOfertas, ofertas }: { lojasComOfertas: Loja[]; ofertas: Oferta[] }) {
  if (lojasComOfertas.length === 0) {
    return (
      <section className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-xl font-bold text-gray-700 mb-2">Nenhuma oferta disponível no momento</p>
          <p className="text-gray-400 text-sm">Volte em breve para conferir nossas promoções!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-14" style={{ background: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-400 text-sm mb-10">
          Preços e promoções variam por região — selecione sua cidade
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {lojasComOfertas.map(loja => {
            const count = ofertas.filter(o => o.lojaSlug === loja.slug).length
            return (
              <Link key={loja.slug} href={`/ofertas/${loja.slug}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <div
                    className="h-32 relative overflow-hidden flex items-end p-4"
                    style={{ background: 'linear-gradient(135deg, #0a4f8c 0%, #007BFF 100%)' }}
                  >
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white opacity-[0.07]" />
                    <div className="absolute top-3 right-7 w-12 h-12 rounded-full bg-white opacity-[0.07]" />
                    <div>
                      <span className="inline-block text-[10px] font-black text-white/60 bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest mb-1.5">
                        {loja.estado}
                      </span>
                      <p className="text-white font-black text-2xl leading-none drop-shadow">{loja.cidade}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: '#EBF5FF', color: '#007BFF' }}
                    >
                      {count} {count === 1 ? 'oferta' : 'ofertas'}
                    </span>
                    <span
                      className="text-sm font-bold transition-transform duration-200 group-hover:translate-x-1.5"
                      style={{ color: '#007BFF' }}
                    >
                      Ver →
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Individual offer card 9:16 ───────────────────────────────
function OfertaCard({ oferta, wa }: { oferta: Oferta; wa: string | null }) {
  const waMsg = encodeURIComponent(
    `Olá, vi a oferta de ${oferta.titulo} no site da Sabenauto e gostaria de mais informações!`
  )

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* 9:16 image container */}
      <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
        {oferta.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={oferta.imagem}
            alt={oferta.titulo}
            className="absolute inset-0 w-full h-full object-contain bg-gray-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <span className="text-5xl">🏷️</span>
          </div>
        )}
        {oferta.validade && (
          <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
            ⏰ até {oferta.validade}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{oferta.titulo}</h3>
        {oferta.descricao && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{oferta.descricao}</p>
        )}
        {oferta.preco && (
          <span className="text-base font-black" style={{ color: '#007BFF' }}>{oferta.preco}</span>
        )}
        {wa && (
          <a
            href={`https://wa.me/${wa}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-2 text-white text-xs font-bold py-2.5 rounded-xl transition-all hover:-translate-y-0.5 active:scale-95"
            style={{ background: '#25D366' }}
          >
            {WA_ICON}
            Tenho interesse
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Store offers grid ────────────────────────────────────────
function StoreOffers({ ofertas, lojas, slug }: { ofertas: Oferta[]; lojas: Loja[]; slug: string }) {
  const loja = lojas.find(l => l.slug === slug)
  const wa = loja?.whatsapp ?? null

  if (ofertas.length === 0) {
    return (
      <section className="py-24" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-xl font-bold text-gray-700 mb-2">Sem ofertas no momento</p>
          <p className="text-gray-400 text-sm mb-6">Volte em breve para conferir promoções desta unidade.</p>
          <Link
            href="/ofertas"
            className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            ← Ver outras lojas
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10" style={{ background: '#f8f9fa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ofertas.map(oferta => (
            <OfertaCard key={oferta.id} oferta={oferta} wa={wa} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main export ──────────────────────────────────────────────
export default function OfertasGrid({
  ofertas,
  lojas,
  selectedSlug,
}: {
  ofertas: Oferta[]
  lojas: Loja[]
  selectedSlug?: string
}) {
  if (selectedSlug) {
    return <StoreOffers ofertas={ofertas} lojas={lojas} slug={selectedSlug} />
  }
  const lojasComOfertas = lojas.filter(l => ofertas.some(o => o.lojaSlug === l.slug))
  return <CityGrid lojasComOfertas={lojasComOfertas} ofertas={ofertas} />
}
