import { getLojas, getImagens } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Atacado – Atendimento para Revendas',
  description: 'Atendimento personalizado para distribuidores e revendas. Consultoria técnica e preços especiais para grandes volumes.',
  openGraph: {
    title: 'Atacado – Atendimento para Revendas | Sabenauto',
    description: 'Atendimento personalizado para distribuidores e revendas. Consultoria técnica e preços especiais para grandes volumes.',
    url: 'https://sabenautopecas.com.br/atacado',
  },
  alternates: { canonical: 'https://sabenautopecas.com.br/atacado' },
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

export default async function AtacadoPage() {
  const lojas = await getLojas()
  const imagens = await getImagens()
  const lojasComWA = lojas.filter(l => l.whatsapp)
  const lojasSemWA = lojas.filter(l => !l.whatsapp)

  return (
    <main>
      {/* Hero */}
      <section
        className="py-16"
        style={{
          background: imagens.heroAtacadoUrl
            ? `linear-gradient(135deg, rgba(26,42,58,0.88) 0%, rgba(44,62,80,0.88) 100%), url('${imagens.heroAtacadoUrl}') center/cover no-repeat`
            : 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">ATENDIMENTO PERSONALIZADO</h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Atendimento dedicado para distribuidores e revendas. Consultoria técnica completa e condições especiais para grandes volumes.
          </p>
        </div>
      </section>

      {/* Por que comprar no atacado */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1 text-center" style={{ color: '#007BFF' }}>Por que comprar no atacado?</h2>
          <p className="text-gray-400 text-sm text-center mb-12">Vantagens exclusivas para distribuidores e revendas</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                ),
                title: 'Preços por Volume',
                desc: 'Quanto mais você compra, melhor o preço. Tabelas escalonadas para cada perfil de revenda.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                ),
                title: 'Suporte Técnico',
                desc: 'Equipe especializada para identificar a peça certa e dar suporte na aplicação correta.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
                title: 'Entrega para Sua Loja',
                desc: 'Logística integrada para distribuição em todo o Brasil com rastreamento e agilidade.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                  </svg>
                ),
                title: 'Crédito e Prazo',
                desc: 'Condições de pagamento facilitadas para distribuidores e revendas cadastradas na Sabenauto.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="group flex flex-col items-center text-center gap-4 p-7 rounded-2xl border border-gray-100 bg-gray-50 hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition-all duration-300 cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entre em Contato */}
      <section className="py-14 border-t border-gray-100" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#007BFF' }}>Entre em Contato</h2>
          <p className="text-gray-500 mb-10 text-sm">Selecione a unidade mais próxima para falar com nosso especialista em atacado.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lojasComWA.map(loja => (
              <div key={loja.key} className="group bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#007BFF' }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a9.7 9.7 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loja.estado}</span>
                </div>
                <h3 className="font-black text-gray-900 text-xl leading-tight">{loja.cidade}</h3>
                {loja.endereco && <p className="text-sm text-gray-500 leading-relaxed flex-1">{loja.endereco}</p>}
                <a
                  href={`https://wa.me/${loja.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold mt-auto"
                  style={{ color: '#007BFF' }}
                >
                  Entrar em Contato
                  {ARROW}
                </a>
              </div>
            ))}

            {lojasSemWA.map(loja => (
              <div key={loja.key} className="bg-white rounded-2xl p-6 flex flex-col gap-4 border border-gray-100 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{loja.estado}</span>
                </div>
                <h3 className="font-black text-gray-700 text-xl leading-tight">{loja.cidade}</h3>
                {loja.phone && <p className="text-sm text-gray-400">{loja.phone}</p>}
                <p className="text-sm text-gray-400 mt-auto">Contato via WhatsApp em breve</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
