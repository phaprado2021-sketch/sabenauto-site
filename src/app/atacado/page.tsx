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

export default function AtacadoPage() {
  const lojas = getLojas()
  const imagens = getImagens()
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

      {/* Cards contato */}
      <section className="py-14" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-1" style={{ color: '#007BFF' }}>Entre em Contato</h2>
          <p className="text-gray-500 mb-10 text-sm">Selecione a unidade mais próxima para falar com nosso especialista em atacado.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {lojasComWA.map(loja => (
              <div
                key={loja.key}
                className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5 transition-all hover:-translate-y-1 hover:shadow-md overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[5px] rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, #74b9ff, #0984e3, #74b9ff)', backgroundSize: '200% 100%', animation: 'shimmer 3s ease-in-out infinite' }}
                />
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{loja.cidade}</h3>
                    <p className="text-sm text-gray-400">{loja.estado}</p>
                  </div>
                </div>
                {loja.endereco && <p className="text-sm text-gray-500 leading-relaxed">{loja.endereco}</p>}
                <a
                  href={`https://wa.me/${loja.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto block text-center text-white font-semibold py-3 px-4 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ background: '#25D366' }}
                >
                  Entrar em Contato
                </a>
              </div>
            ))}

            {lojasSemWA.map(loja => (
              <div
                key={loja.key}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex flex-col gap-4 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-bold text-gray-700 text-lg">{loja.cidade}</h3>
                    <p className="text-sm text-gray-400">{loja.estado}</p>
                  </div>
                </div>
                {loja.phone && <p className="text-sm text-gray-500">{loja.phone}</p>}
                <p className="text-sm text-gray-400 mt-auto">Contato via WhatsApp em breve</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que comprar no atacado */}
      <section className="py-14 bg-white border-t border-gray-100">
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
                title: 'Preços por volume',
                desc: 'Quanto mais você compra, melhor o preço. Tabelas escalonadas para cada perfil de revenda.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                ),
                title: 'Suporte técnico',
                desc: 'Equipe especializada para identificar a peça certa e dar suporte na aplicação correta.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                ),
                title: 'Entrega para sua loja',
                desc: 'Logística integrada para distribuição em todo o Brasil com rastreamento e agilidade.',
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
                  </svg>
                ),
                title: 'Crédito e prazo',
                desc: 'Condições de pagamento facilitadas para distribuidores e revendas cadastradas na Sabenauto.',
              },
            ].map(item => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-gray-100 bg-gray-50"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
                >
                  {item.icon}
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
