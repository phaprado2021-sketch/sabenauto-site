import Link from 'next/link'
import FadeIn from './FadeIn'

const itens = [
  {
    badge: (
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#007BFF' }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Peças Genuínas</span>
      </div>
    ),
    titulo: ['Tecnologia', 'em Peças'],
    texto: 'Peças originais GM e ACDelco para veículos multimarcas: Hyundai, Nissan, Ford, Fiat, Honda e muito mais.',
    link: { label: 'Ver categorias', href: '/#catalogo-topo' },
  },
  {
    badge: (
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#007BFF' }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Suporte</span>
      </div>
    ),
    titulo: ['Atendimento', 'Personalizado'],
    texto: 'Soluções sob medida para sua oficina: agilidade no fornecimento, suporte técnico especializado e produtos de alta qualidade.',
    link: { label: 'Falar com especialista', href: '/atacado' },
  },
  {
    badge: (
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#007BFF' }}>
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </div>
        <span className="text-xs font-black uppercase tracking-widest text-gray-500">Distribuidora</span>
      </div>
    ),
    titulo: ['Tudo Que Sua', 'Oficina Merece'],
    texto: 'Garantimos que sua oficina tenha sempre as melhores soluções em peças, com a qualidade e segurança que você e seus clientes merecem.',
    link: { label: 'Nossas lojas', href: '/varejo' },
  },
]

export default function Vantagens() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="text-xl font-bold mb-6" style={{ color: '#007BFF' }}>
            Encontre o que você precisa
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {itens.map((item, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="rounded-2xl p-4 sm:p-7 flex flex-col h-full" style={{ background: '#f0f2f5' }}>
                {item.badge}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {item.titulo[0]}<br />{item.titulo[1]}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">
                  {item.texto}
                </p>
                <Link
                  href={item.link.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: '#007BFF' }}
                >
                  {item.link.label}
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: '#007BFF' }}
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
