import Link from 'next/link'
import { getLojas, getImagens } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Varejo – Balcão de Peças',
  description: 'Encontre o balcão de peças Sabenauto mais próximo de você. Qualidade e confiança por mais de 50 anos.',
  openGraph: {
    title: 'Varejo – Balcão de Peças | Sabenauto',
    description: 'Encontre o balcão de peças Sabenauto mais próximo de você. Qualidade e confiança por mais de 50 anos.',
    url: 'https://sabenautopecas.com.br/varejo',
  },
  alternates: { canonical: 'https://sabenautopecas.com.br/varejo' },
}

const ARROW = (
  <span
    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
    style={{ background: '#007BFF' }}
  >
    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </span>
)

export default async function VarejoPage() {
  const lojas = await getLojas()
  const imagens = await getImagens()

  return (
    <main>
      {/* Hero */}
      <section
        className="py-16 relative"
        style={{
          background: imagens.heroVarejoUrl
            ? `linear-gradient(135deg, rgba(10,31,60,0.88) 0%, rgba(26,58,107,0.88) 100%), url('${imagens.heroVarejoUrl}') center/cover no-repeat`
            : 'linear-gradient(135deg, #0a1f3c 0%, #1a3a6b 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">BALCÃO DE PEÇAS</h1>
          <p className="text-blue-200 text-lg max-w-3xl leading-relaxed">
            Encontre a unidade Sabenauto mais próxima e adquira peças genuínas GM, ACDelco e multimarcas com atendimento especializado.
          </p>
        </div>
      </section>

      {/* Como funciona o balcão */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: '#007BFF' }}>Como funciona o balcão</h2>
          <p className="text-gray-400 text-sm text-center mb-12">Simples, rápido e sem burocracia</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                label: 'PASSO 01',
                icon: (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                title: 'Encontre a Loja',
                desc: 'Escolha a unidade Sabenauto mais próxima de você. Temos balcões em 7 estados brasileiros.',
              },
              {
                label: 'PASSO 02',
                icon: (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                  </svg>
                ),
                title: 'Informe a Peça',
                desc: 'Leve o código da peça ou o modelo e ano do veículo. Nossa equipe identifica o item certo para você.',
              },
              {
                label: 'PASSO 03',
                icon: (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Leve na Hora',
                desc: 'Retire imediatamente com qualidade garantida, nota fiscal e suporte pós-venda da Sabenauto.',
              },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#007BFF' }}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                </div>
                <h3 className="font-black text-gray-900 text-xl leading-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lojas */}
      <section className="py-14 border-t border-gray-100" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#007BFF' }}>Escolha a Loja</h2>
          <p className="text-gray-500 mb-10 text-sm">Encontre o balcão mais próximo de você.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {lojas.map(loja => (
              <div key={loja.key} className="bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#007BFF' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loja.estado}</span>
                </div>
                <h3 className="font-black text-gray-900 text-xl leading-tight">{loja.cidade}</h3>
                {loja.endereco && <p className="text-sm text-gray-500 leading-relaxed flex-1">{loja.endereco}</p>}
                <div className="flex flex-col gap-2 mt-auto">
                  {loja.whatsapp && (
                    <a
                      href={`https://wa.me/${loja.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold"
                      style={{ color: '#25D366' }}
                    >
                      WhatsApp
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#25D366' }}
                      >
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </a>
                  )}
                  <Link
                    href={`/lojas/${loja.slug}`}
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: '#007BFF' }}
                  >
                    Ver detalhes
                    {ARROW}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
