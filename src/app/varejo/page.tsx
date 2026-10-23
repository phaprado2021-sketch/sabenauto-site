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

      {/* Lojas */}
      <section className="py-14" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#007BFF' }}>Escolha a Loja</h2>
          <p className="text-gray-500 mb-10 text-sm">Encontre o balcão mais próximo de você.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {lojas.map(loja => (
              <div
                key={loja.key}
                className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[5px] rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, #74b9ff, #0984e3, #74b9ff)', backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite' }}
                />
                <div>
                  <h3 className="font-bold text-gray-900">{loja.cidade}</h3>
                  <p className="text-xs text-gray-400">{loja.estado}</p>
                  {loja.endereco && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{loja.endereco}</p>}
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  {loja.whatsapp && (
                    <a
                      href={`https://wa.me/${loja.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-white text-sm font-semibold py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
                      style={{ background: '#25D366' }}
                    >
                      WhatsApp
                    </a>
                  )}
                  <Link
                    href={`/lojas/${loja.slug}`}
                    className="text-center text-white text-sm font-semibold py-2 rounded-xl transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona o balcão */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: '#007BFF' }}>Como funciona o balcão</h2>
          <p className="text-gray-400 text-sm text-center mb-12">Simples, rápido e sem burocracia</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Encontre a loja',
                desc: 'Escolha a unidade Sabenauto mais próxima de você. Temos balcões em 7 estados brasileiros.',
              },
              {
                step: '02',
                title: 'Informe a peça',
                desc: 'Leve o código da peça ou o modelo e ano do veículo. Nossa equipe identifica o item certo para você.',
              },
              {
                step: '03',
                title: 'Leve na hora',
                desc: 'Retire imediatamente com qualidade garantida, nota fiscal e suporte pós-venda da Sabenauto.',
              },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center text-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
