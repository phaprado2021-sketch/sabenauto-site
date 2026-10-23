import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nós | Sabenauto - Grupo Bennesby',
  description: 'Conheça a Sabenauto, distribuidora de peças do Grupo Bennesby. Mais de 50 anos de história, presente em 7 estados e 13+ lojas em todo o Brasil.',
}

const estados = [
  {
    uf: 'RO',
    nome: 'Rondônia',
    lojas: ['Sabenauto Porto Velho', 'Tigrão Ariquemes', 'Tigrão Ji-Paraná'],
  },
  {
    uf: 'AC',
    nome: 'Acre',
    lojas: ['Sabenauto Rio Branco', 'Sabenauto Cruzeiro do Sul'],
  },
  {
    uf: 'RJ',
    nome: 'Rio de Janeiro',
    lojas: [
      'Ilha do Governador',
      'Tijuca',
      'Estácio (Mega Store - Centro)',
      'Duque de Caxias',
      'Niterói Centro',
      'Niterói Piratininga',
      'São João do Meriti (Shopping Grande Rio)',
    ],
  },
  {
    uf: 'MT',
    nome: 'Mato Grosso',
    lojas: ['Sabenauto Cuiabá', 'Sabenauto Várzea Grande'],
  },
  {
    uf: 'AM',
    nome: 'Amazonas',
    lojas: ['Sabenauto Manaus'],
  },
  {
    uf: 'CE',
    nome: 'Ceará',
    lojas: ['Sabenauto Fortaleza'],
  },
  {
    uf: 'DF',
    nome: 'Distrito Federal',
    lojas: ['Sabenauto Brasília'],
  },
]

const stats = [
  { value: '50+', label: 'Anos de história' },
  { value: '7', label: 'Estados atendidos' },
  { value: '13+', label: 'Lojas' },
  { value: '100%', label: 'Peças genuínas GM' },
]

const mvv = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Missão',
    text: 'Oferecer peças genuínas e serviços automotivos com qualidade, confiança e tradição, sendo o parceiro ideal de oficinas e consumidores finais em todo o Brasil.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
    title: 'Visão',
    text: 'Ser a distribuidora de peças automotivas mais confiável do país, reconhecida pela excelência no atendimento e pela qualidade dos produtos.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Valores',
    text: 'Confiança, Qualidade, Inovação, Comprometimento e Respeito ao Cliente.',
  },
]

export default function SobreNos() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #007BFF 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Sobre Nós</span>
          </nav>
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">
            Tradição que acompanha as novas conquistas
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight max-w-3xl">
            Produtos e serviços com a excelência de quem tem tradição
          </h1>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100" style={{ background: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black" style={{ color: '#007BFF' }}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-12">

        {/* History */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#007BFF' }}>Nossa História</p>
              <h2 className="text-2xl font-black text-gray-800 mb-5 leading-snug">
                Estabelecida em 1970 com a tradição do Grupo Bennesby
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Estabelecida desde 1970 com a parceria do Grupo Bennesby e a General Motors do Brasil, a Sabenauto
                se consolida no segmento automotivo nacional, presente em sete estados brasileiros.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                As concessionárias Sabenauto, por meio de diversos serviços, produtos automotivos originais e modelos
                de carro novos e seminovos, reforçam sua missão de inovar no segmento e proporcionar negócios cada
                vez melhores para os consumidores.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { year: '1970', event: 'Fundação com parceria GM do Brasil' },
                { year: '1990s', event: 'Expansão para novos estados' },
                { year: '2000s', event: 'Crescimento no Norte e Nordeste' },
                { year: 'Hoje', event: '7 estados, 13+ lojas, presente em todo o Brasil' },
              ].map(item => (
                <div key={item.year} className="p-4 rounded-2xl border border-gray-100 bg-gray-50">
                  <p className="font-black text-sm mb-1" style={{ color: '#007BFF' }}>{item.year}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* States grid */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#007BFF' }}>Presença Nacional</p>
          <h2 className="text-2xl font-black text-gray-800 mb-8 leading-snug">Onde estamos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {estados.map(estado => (
              <div key={estado.uf} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                  >
                    {estado.uf}
                  </span>
                  <p className="font-bold text-gray-800 text-sm">{estado.nome}</p>
                </div>
                <ul className="flex flex-col gap-1">
                  {estado.lojas.map(loja => (
                    <li key={loja} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#007BFF' }} />
                      {loja}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Vision Values */}
        <section>
          <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#007BFF' }}>Nossa Essência</p>
          <h2 className="text-2xl font-black text-gray-800 mb-8 leading-snug">Missão, Visão e Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mvv.map(item => (
              <div key={item.title} className="rounded-2xl p-6 border border-gray-100 shadow-sm bg-white flex flex-col gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-black text-gray-800 text-base mb-2">{item.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0a1f3c, #007BFF)' }}>
          <h2 className="text-xl font-black text-white mb-3">Encontre a loja mais próxima</h2>
          <p className="text-blue-100 text-sm mb-6">
            Estamos em 7 estados com mais de 13 lojas para atender você.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#onde-estamos"
              className="inline-flex items-center gap-2 text-sm font-bold bg-white px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ color: '#007BFF' }}
            >
              Ver Nossas Lojas
            </Link>
            <Link
              href="/varejo"
              className="inline-flex items-center gap-2 text-sm font-bold text-white border-2 border-white px-6 py-3 rounded-xl transition-all hover:bg-white/10"
            >
              Conhecer Serviços
            </Link>
          </div>
        </section>

        {/* Back */}
        <div className="pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    </div>
  )
}
