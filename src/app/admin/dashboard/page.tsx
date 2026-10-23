'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type Tab = 'inicio' | 'config' | 'imagens' | 'lojas' | 'carrossel' | 'estados' | 'ofertas' | 'rodape'

const NAV: { id: Tab; label: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'inicio',
    label: 'Início',
    desc: 'Visão geral',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'config',
    label: 'Configurações',
    desc: 'Textos e horários',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'imagens',
    label: 'Imagens',
    desc: 'Banners e logos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: 'lojas',
    label: 'Lojas',
    desc: 'Endereços e contatos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'carrossel',
    label: 'Carrossel',
    desc: 'Banners da home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8" />
        <path d="M20 3h-4" />
        <path d="M4 3H8" />
      </svg>
    ),
  },
  {
    id: 'estados',
    label: 'Estados',
    desc: 'Cards de estados',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'ofertas',
    label: 'Ofertas',
    desc: 'Promoções por loja',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
  {
    id: 'rodape',
    label: 'Rodapé',
    desc: 'Links e copyright',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="21" y2="6" />
      </svg>
    ),
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('inicio')
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/content')
    if (res.status === 401) { router.push('/admin'); return }
    setContent(await res.json())
  }, [router])

  useEffect(() => { load() }, [load])

  async function save(updates: Record<string, unknown>) {
    setSaving(true); setMsg(null)
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    setSaving(false)
    setMsg(res.ok ? { type: 'ok', text: 'Alterações salvas com sucesso!' } : { type: 'err', text: 'Erro ao salvar.' })
    if (res.ok) { await load(); setTimeout(() => setMsg(null), 3000) }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  const activeNav = NAV.find(n => n.id === tab)

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f5f6fa' }}>

      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 h-14 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >S</div>
          <div className="leading-none">
            <p className="font-black text-gray-800 text-sm">Sabenauto</p>
            <p className="text-[10px] text-gray-400">Painel Administrativo</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Site ao vivo
          </span>
          <a
            href="/"
            target="_blank"
            className="text-xs text-gray-500 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Ver site
          </a>
          <button
            onClick={logout}
            className="text-xs text-red-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-semibold border border-red-100"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">

        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-200 sticky top-14 h-[calc(100vh-3.5rem)] py-5 px-3 gap-0.5 flex-shrink-0">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-3 mb-3">Menu</p>
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left group ${
                tab === item.id
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
              style={tab === item.id ? { background: 'linear-gradient(135deg, #007BFF, #0056b3)' } : {}}
            >
              <span className={`flex-shrink-0 ${tab === item.id ? 'text-white' : 'text-gray-400'}`}>
                {item.icon}
              </span>
              <span className="flex-1 leading-none">
                <span className="block">{item.label}</span>
                <span className={`block text-[10px] font-normal mt-0.5 ${tab === item.id ? 'text-blue-100' : 'text-gray-400'}`}>
                  {item.desc}
                </span>
              </span>
            </button>
          ))}
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200 px-2 py-2">
          <div className="overflow-x-auto flex gap-1">
            {NAV.map(item => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  tab === item.id ? 'text-white' : 'text-gray-500'
                }`}
                style={tab === item.id ? { background: 'linear-gradient(135deg, #007BFF, #0056b3)' } : {}}
              >
                {item.icon}
                <span className="text-[10px]">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-3xl mx-auto">

            {/* Breadcrumb + page header */}
            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-1">
                Painel {tab !== 'inicio' && <> / {activeNav?.label}</>}
              </p>
              <div className="flex items-center gap-3">
                <span className={`flex-shrink-0 p-2 rounded-xl text-white ${tab === 'inicio' ? 'hidden' : 'flex'}`}
                  style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
                  {activeNav?.icon}
                </span>
                <div>
                  <h1 className="font-black text-2xl text-gray-800">{activeNav?.label}</h1>
                  {activeNav?.desc && (
                    <p className="text-sm text-gray-400">{activeNav.desc}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Feedback */}
            {msg && (
              <div className={`mb-5 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 ${
                msg.type === 'ok'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <span className="text-base">{msg.type === 'ok' ? '✓' : '✗'}</span>
                {msg.text}
              </div>
            )}

            {/* Tab content */}
            {tab === 'inicio'    && <InicioTab    setTab={setTab} />}
            {tab === 'config'    && <ConfigTab    content={content} onSave={save} saving={saving} />}
            {tab === 'imagens'   && <ImagensTab   content={content} onSave={save} saving={saving} />}
            {tab === 'lojas'     && <LojasTab     content={content} onSave={save} saving={saving} />}
            {tab === 'carrossel' && <CarrosselTab content={content} onSave={save} saving={saving} />}
            {tab === 'estados'   && <EstadosTab   content={content} onSave={save} saving={saving} />}
            {tab === 'ofertas'   && <OfertasTab   content={content} onSave={save} saving={saving} />}
            {tab === 'rodape'    && <RodapeTab    content={content} onSave={save} saving={saving} />}
          </div>
        </main>
      </div>
    </div>
  )
}

/* --- INICIO ------------------------------------------------- */
const quickCards: { id: Tab; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    id: 'config',
    title: 'Configurações Gerais',
    desc: 'Textos, tagline e horários',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    id: 'imagens',
    title: 'Imagens',
    desc: 'Banners e logos do site',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: 'lojas',
    title: 'Lojas',
    desc: 'Endereços e contatos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'carrossel',
    title: 'Carrossel',
    desc: 'Banners da home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3H8" />
        <path d="M20 3h-4" />
        <path d="M4 3H8" />
      </svg>
    ),
  },
  {
    id: 'estados',
    title: 'Estados',
    desc: 'Cards de estados da home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: 'ofertas',
    title: 'Ofertas',
    desc: 'Promoções por loja',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
]

function InicioTab({ setTab }: { setTab: (t: Tab) => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Bem-vindo</p>
        <h2 className="font-black text-gray-800 text-lg">Painel Sabenauto</h2>
        <p className="text-sm text-gray-500 mt-1">Gerencie o conteúdo do site por aqui. Selecione uma seção abaixo.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickCards.map(card => (
          <button
            key={card.id}
            onClick={() => setTab(card.id)}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left flex flex-col gap-4 group"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              {card.icon}
            </div>
            <div>
              <p className="font-black text-gray-800 text-sm mb-1">{card.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{card.desc}</p>
            </div>
            <span
              className="text-xs font-bold mt-auto self-start px-3 py-1.5 rounded-lg text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              Acessar
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* --- CONFIG ------------------------------------------------- */
function ConfigTab({ content, onSave, saving }: TabProps) {
  const defaults = {
    tagline: 'Trabalhamos somente com produtos de alta durabilidade, resistência e tecnologia',
    slogan: 'A peça que falta para o sucesso da sua oficina!',
    horarioSemana: 'Segunda a Sexta 08:00h às 18:00h',
    horarioSabado: 'Sábados 08:00h às 12:00h',
    textoVarejo: 'No Balcão de Peças da Sabenauto, você encontra uma ampla linha de peças genuínas e multimarcas para veículos, com qualidade e confiança garantidas por mais de 50 anos de tradição no mercado automotivo.',
    textoAtacado: 'Na nossa distribuidora de peças, cada cliente é atendido de forma única e personalizada. Nossa equipe de especialistas oferece consultoria técnica completa, ajudando você a encontrar as melhores soluções com a tradição de mais de 50 anos no mercado.',
  }
  const stored = (content.siteConfig as Record<string, string>) ?? {}
  const [form, setForm] = useState({ ...defaults, ...stored })

  return (
    <div className="flex flex-col gap-5">
      <Card title="Identidade do Site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Tagline (cabeçalho)" value={form.tagline} onChange={v => setForm(f => ({ ...f, tagline: v }))} />
          <Field label="Slogan (rodapé)" value={form.slogan} onChange={v => setForm(f => ({ ...f, slogan: v }))} />
        </div>
      </Card>
      <Card title="Horário de Funcionamento">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Horário Segunda a Sexta" value={form.horarioSemana} onChange={v => setForm(f => ({ ...f, horarioSemana: v }))} placeholder="ex: Segunda a Sexta 08:00h às 18:00h" />
          <Field label="Horário Sábado" value={form.horarioSabado} onChange={v => setForm(f => ({ ...f, horarioSabado: v }))} placeholder="ex: Sábados 08:00h às 12:00h" />
        </div>
      </Card>
      <Card title="Textos das Páginas">
        <div className="flex flex-col gap-4">
          <TextareaField label="Texto da página Varejo" value={form.textoVarejo} onChange={v => setForm(f => ({ ...f, textoVarejo: v }))} />
          <TextareaField label="Texto da página Atacado" value={form.textoAtacado} onChange={v => setForm(f => ({ ...f, textoAtacado: v }))} />
        </div>
      </Card>
      <SaveBtn onClick={() => onSave({ siteConfig: form })} saving={saving} />
    </div>
  )
}

/* --- IMAGENS ----------------------------------------------- */
function ImagensTab({ content, onSave, saving }: TabProps) {
  const defaults = {
    heroVarejoUrl: '',
    heroAtacadoUrl: '',
    heroOfertasUrl: '',
    logoUrl: 'https://i.postimg.cc/zDPwX8H0/LOGO-DISTRIBUIDORA-1.png',
    homeVarejoUrl: '',
    homeAtacadoUrl: '',
    homeOfertasUrl: '',
    quemSomosUrl: '',
  }
  const stored = (content.imagens as Record<string, string>) ?? {}
  const [form, setForm] = useState({ ...defaults, ...stored })

  const heroes = [
    { key: 'heroVarejoUrl' as const, label: 'Varejo', route: '/varejo', grad: 'rgba(10,31,60,0.88), rgba(26,58,107,0.88)', dims: '1920 x 600px recomendado' },
    { key: 'heroAtacadoUrl' as const, label: 'Atacado', route: '/atacado', grad: 'rgba(26,42,58,0.88), rgba(44,62,80,0.88)', dims: '1920 x 600px recomendado' },
    { key: 'heroOfertasUrl' as const, label: 'Ofertas', route: '/ofertas', grad: 'rgba(10,31,60,0.88), rgba(26,58,107,0.88)', dims: '1920 x 600px recomendado' },
  ]

  return (
    <div className="flex flex-col gap-5">
      <Card title="Imagens de Fundo — Seções Hero">
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          A imagem fica atras do gradiente azul. Deixe vazio para usar so o gradiente.
        </p>
        <div className="flex flex-col gap-6">
          {heroes.map(h => (
            <div key={h.key}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-700 uppercase tracking-widest">{h.label}</span>
                  <span className="text-xs text-gray-400">{h.route}</span>
                </div>
                <span className="text-[10px] text-gray-300 bg-gray-50 px-2 py-0.5 rounded font-mono">{h.dims}</span>
              </div>
              <input
                type="url"
                value={form[h.key]}
                onChange={e => setForm(f => ({ ...f, [h.key]: e.target.value }))}
                placeholder="https://... (vazio = so gradiente)"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors font-mono"
              />
              {form[h.key] && (
                <div className="mt-2 relative rounded-xl overflow-hidden h-16 border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={form[h.key]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center px-4" style={{ background: `linear-gradient(135deg, ${h.grad})` }}>
                    <span className="text-white font-black text-xs tracking-widest opacity-90">{h.label.toUpperCase()} - PREVIA</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Logo — Secao Inferior (fundo azul)">
        <p className="text-[10px] text-gray-300 bg-gray-50 px-2 py-0.5 rounded font-mono inline-block mb-3">Altura maxima: 56px, fundo transparente (PNG)</p>
        <input
          type="url"
          value={form.logoUrl}
          onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))}
          placeholder="https://..."
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors font-mono"
        />
        {form.logoUrl && (
          <div className="mt-3 rounded-xl p-5 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a4f8c, #007BFF)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.logoUrl} alt="preview" className="h-14 w-auto object-contain" />
          </div>
        )}
      </Card>

      <Card title="Imagens — Cards Varejo / Atacado / Ofertas (Pagina Inicial)">
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Imagens dos cards na secao de servicos da pagina inicial. Deixe vazio para exibir placeholder colorido.
        </p>
        {([
          { key: 'homeVarejoUrl' as const, label: 'Card Varejo', dims: '800 x 500px recomendado' },
          { key: 'homeAtacadoUrl' as const, label: 'Card Atacado', dims: '800 x 500px recomendado' },
          { key: 'homeOfertasUrl' as const, label: 'Card Ofertas', dims: '800 x 500px recomendado' },
          { key: 'quemSomosUrl' as const, label: 'Quem Somos (foto lateral)', dims: '600 x 800px recomendado' },
        ]).map(item => (
          <div key={item.key} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-black text-gray-700 uppercase tracking-widest">{item.label}</p>
              <span className="text-[10px] text-gray-300 bg-gray-50 px-2 py-0.5 rounded font-mono">{item.dims}</span>
            </div>
            <input
              type="url"
              value={form[item.key]}
              onChange={e => setForm(f => ({ ...f, [item.key]: e.target.value }))}
              placeholder="https://..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 transition-colors font-mono"
            />
            {form[item.key] && (
              <div className="mt-2 rounded-xl overflow-hidden h-20 border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form[item.key]} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ))}
      </Card>

      <SaveBtn onClick={() => onSave({ imagens: form })} saving={saving} />
    </div>
  )
}

/* --- LOJAS -------------------------------------------------- */
function LojasTab({ content, onSave, saving }: TabProps) {
  type Loja = {
    key: string; label: string; cidade: string; estado: string; slug: string
    whatsapp: string | null; phone: string | null; email: string | null
    endereco: string | null; coords: { lat: number; lng: number }
  }
  const defaultLojas: Loja[] = [
    { key: 'Cuiaba - MT', label: 'Cuiaba - MT', cidade: 'Cuiaba', estado: 'MT', slug: 'sabenauto-cuiaba', whatsapp: '5565999256982', phone: '(65) 2128-7100', email: 'sabenauto.mt@bennesby.com.br', endereco: 'Av. Tenente Coronel Duarte, 2023 - Bairro Dom Aquino, Cuiaba - MT', coords: { lat: -15.6014109, lng: -56.0978917 } },
    { key: 'Varzea Grande - MT', label: 'Varzea Grande - MT', cidade: 'Varzea Grande', estado: 'MT', slug: 'sabenauto-varzea-grande', whatsapp: '556520180900', phone: '(65) 2018-0900', email: null, endereco: 'Av. Julio Campos, 3676 - Varzea Grande, MT', coords: { lat: -15.645556, lng: -56.132778 } },
    { key: 'Porto Velho - RO', label: 'Porto Velho - RO', cidade: 'Porto Velho', estado: 'RO', slug: 'sabenauto-porto-velho', whatsapp: '556999480343', phone: '(69) 3216-7139', email: 'alessandro.vanzini@bennesby.com.br', endereco: 'Av. Tiradentes, 3183 - Industrial, Porto Velho - RO', coords: { lat: -8.760778, lng: -63.900322 } },
    { key: 'Rio Branco - AC', label: 'Rio Branco - AC', cidade: 'Rio Branco', estado: 'AC', slug: 'sabenauto-rio-branco', whatsapp: '556899836315', phone: '(68) 2106-6848', email: null, endereco: 'Via Chico Mendes, 2454 - Triangulo Velho, Rio Branco - AC', coords: { lat: -9.975377, lng: -67.824897 } },
    { key: 'Fortaleza - CE', label: 'Fortaleza - CE', cidade: 'Fortaleza', estado: 'CE', slug: 'sabenauto-fortaleza', whatsapp: '558535130700', phone: '(85) 3513-0700', email: 'adinecilia.santos@bennesby.com.br', endereco: 'Av. Professor Eduardo Girao, 01301 - Bairro Fatima, Fortaleza - CE', coords: { lat: -3.71722, lng: -38.54337 } },
    { key: 'Manaus - AM', label: 'Manaus - AM', cidade: 'Manaus', estado: 'AM', slug: 'sabenauto-manaus', whatsapp: '559221800707', phone: '(92) 2180-0707', email: null, endereco: 'Av. Tefe, 2626 - Raiz, Manaus - AM', coords: { lat: -3.1021, lng: -60.0239 } },
    { key: 'Brasilia - DF', label: 'Brasilia - DF', cidade: 'Brasilia', estado: 'DF', slug: 'sabenauto-brasilia', whatsapp: null, phone: '(61) 3181-3000', email: null, endereco: null, coords: { lat: -15.8286, lng: -47.9269 } },
  ]

  const stored = (content.lojas as Loja[]) ?? defaultLojas
  const [lojas, setLojas] = useState<Loja[]>(stored)

  useEffect(() => {
    const fromKV = content.lojas as Loja[] | undefined
    if (fromKV) setLojas(fromKV)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content.lojas])

  function update(idx: number, field: string, value: string | null) {
    setLojas(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value || null } : l))
  }

  function addLoja() {
    const id = Date.now().toString()
    setLojas(prev => [...prev, {
      key: id, label: 'Nova Loja', cidade: '', estado: '', slug: `loja-${id}`,
      whatsapp: null, phone: null, email: null, endereco: null, coords: { lat: 0, lng: 0 }
    }])
  }

  function removeLoja(idx: number) {
    if (!confirm(`Remover "${lojas[idx].label}"?`)) return
    setLojas(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="flex flex-col gap-4">
      {lojas.map((loja, idx) => (
        <div key={loja.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-800 text-sm">{loja.label}</p>
              <div className="flex items-center gap-2 mt-0.5">
                {loja.estado && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: '#007BFF' }}>
                    {loja.estado}
                  </span>
                )}
                {loja.cidade && (
                  <span className="text-[10px] text-gray-400">{loja.cidade}</span>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Nome da loja" value={loja.label} onChange={v => setLojas(prev => prev.map((l, i) => i === idx ? { ...l, label: v || l.label } : l))} placeholder="ex: Cuiaba - MT" />
              </div>
              <Field label="WhatsApp (somente numeros)" value={loja.whatsapp ?? ''} onChange={v => update(idx, 'whatsapp', v)} placeholder="ex: 5565999256982" />
              <Field label="Telefone" value={loja.phone ?? ''} onChange={v => update(idx, 'phone', v)} placeholder="ex: (65) 2128-7100" />
              <Field label="E-mail" value={loja.email ?? ''} onChange={v => update(idx, 'email', v)} placeholder="ex: contato@bennesby.com.br" />
              <Field label="Endereco" value={loja.endereco ?? ''} onChange={v => update(idx, 'endereco', v)} placeholder="Rua, numero, bairro, cidade" />
            </div>
            <button onClick={() => removeLoja(idx)} className="mt-4 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
              Remover esta loja
            </button>
          </div>
        </div>
      ))}
      <button onClick={addLoja} className="border-2 border-dashed border-blue-200 text-blue-500 hover:border-blue-400 hover:bg-blue-50 rounded-2xl py-4 text-sm font-semibold transition-all">
        + Adicionar nova loja
      </button>
      <SaveBtn onClick={() => onSave({ lojas })} saving={saving} />
    </div>
  )
}

/* --- CARROSSEL --------------------------------------------- */
function CarrosselTab({ content, onSave, saving }: TabProps) {
  type Slide = { id: string; imagem: string; alt: string }
  const defaultSlides: Slide[] = [
    { id: '1', imagem: 'https://i.postimg.cc/kgbkVyC2/distribuidora-pe-as.png', alt: 'Banner Institucional Sabenauto' },
    { id: '2', imagem: 'https://i.postimg.cc/MK4CKFCk/2distribuidora-pe-as.png', alt: 'Mes do Consumidor' },
    { id: '3', imagem: 'https://i.postimg.cc/wxb6Zq1h/KIT-DE-VELAS.png', alt: 'Kit Velas de Ignicao' },
    { id: '4', imagem: 'https://i.postimg.cc/2SNfNVrh/KIT-EMBREAGEM.png', alt: 'Kit Embreagem' },
  ]
  const stored = (content.carrossel as Slide[]) ?? defaultSlides
  const [slides, setSlides] = useState<Slide[]>(stored)

  function update(idx: number, field: keyof Slide, value: string) {
    setSlides(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <p className="text-xs text-blue-700 font-semibold">
          Dimensoes recomendadas: 1920 x 600px, formato JPG ou PNG. Os slides sao exibidos em sequencia na pagina inicial.
        </p>
      </div>
      {slides.map((slide, idx) => (
        <div key={slide.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              {idx + 1}
            </span>
            <p className="font-semibold text-gray-700 text-sm flex-1 truncate">
              {slide.alt || `Slide ${idx + 1}`}
            </p>
          </div>
          <div className="p-5">
            {slide.imagem && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={slide.imagem} alt={slide.alt || 'preview'} className="w-full h-40 object-contain rounded-xl bg-gray-100 mb-4" />
            )}
            <div className="flex flex-col gap-3">
              <Field label="URL da imagem" value={slide.imagem} onChange={v => update(idx, 'imagem', v)} placeholder="https://i.postimg.cc/..." />
              <Field label="Texto alternativo (alt)" value={slide.alt} onChange={v => update(idx, 'alt', v)} placeholder="Descricao da imagem" />
            </div>
            <button onClick={() => setSlides(prev => prev.filter((_, i) => i !== idx))} className="mt-4 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
              Remover slide
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => setSlides(prev => [...prev, { id: Date.now().toString(), imagem: '', alt: '' }])}
        className="border-2 border-dashed border-blue-200 text-blue-500 hover:border-blue-400 hover:bg-blue-50 rounded-2xl py-4 text-sm font-semibold transition-all"
      >
        + Adicionar slide
      </button>
      <SaveBtn onClick={() => onSave({ carrossel: slides })} saving={saving} />
    </div>
  )
}

/* --- ESTADOS ----------------------------------------------- */
function EstadosTab({ content, onSave, saving }: TabProps) {
  type Estado = { nome: string; sigla: string; foto: string; status: 'ativa' | 'em_breve' }
  const defaultEstados: Estado[] = [
    { nome: 'Acre', sigla: 'AC', foto: 'https://i.postimg.cc/m21VwDNZ/AC.png', status: 'ativa' },
    { nome: 'Amazonas', sigla: 'AM', foto: 'https://i.postimg.cc/cLQmpbbV/AM.png', status: 'ativa' },
    { nome: 'Ceara', sigla: 'CE', foto: 'https://i.postimg.cc/N0B4BxhL/CE.png', status: 'ativa' },
    { nome: 'Mato Grosso', sigla: 'MT', foto: 'https://i.postimg.cc/0QHdGRzJ/MT.png', status: 'ativa' },
    { nome: 'Rio De Janeiro', sigla: 'RJ', foto: 'https://i.postimg.cc/5yY5n7zK/RJ.png', status: 'ativa' },
    { nome: 'Rondonia', sigla: 'RO', foto: 'https://i.postimg.cc/L5ct7tB9/RO.png', status: 'ativa' },
    { nome: 'Alagoas', sigla: 'AL', foto: 'https://i.postimg.cc/XJvky7Yb/AL.png', status: 'em_breve' },
    { nome: 'Distrito Federal', sigla: 'DF', foto: 'https://i.postimg.cc/Dz6cZbF6/DF.png', status: 'ativa' },
  ]
  const stored = (content.estadosCards as Estado[]) ?? defaultEstados
  const [estados, setEstados] = useState<Estado[]>(stored)

  return (
    <Card title="Cards de Estados">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {estados.map((estado, idx) => (
          <div key={estado.sigla} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={estado.foto} alt={estado.nome} className="w-16 h-12 object-cover rounded-lg flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-gray-800 text-sm">{estado.nome}</p>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white"
                  style={{ background: '#007BFF' }}
                >
                  {estado.sigla}
                </span>
              </div>
              <input
                type="text"
                value={estado.foto}
                onChange={e => setEstados(prev => prev.map((e2, i) => i === idx ? { ...e2, foto: e.target.value } : e2))}
                placeholder="URL da imagem"
                className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-blue-400 mb-2"
              />
              <button
                onClick={() => setEstados(prev => prev.map((e2, i) => i === idx ? { ...e2, status: e2.status === 'ativa' ? 'em_breve' : 'ativa' } : e2))}
                className="text-[10px] font-bold px-3 py-1 rounded-full text-white transition-all"
                style={{ background: estado.status === 'ativa' ? '#0984e3' : '#e17055' }}
              >
                {estado.status === 'ativa' ? 'Ativa' : 'Em Breve'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <SaveBtn onClick={() => onSave({ estadosCards: estados })} saving={saving} />
    </Card>
  )
}

/* --- OFERTAS ----------------------------------------------- */
function OfertasTab({ content, onSave, saving }: TabProps) {
  type Oferta = {
    id: string; lojaSlug: string; lojaNome: string
    titulo: string; descricao: string; imagem: string
    preco: string; validade: string; ativo: boolean
  }
  type LojaSimples = { slug: string; label: string }

  const defaultLojas: LojaSimples[] = [
    { slug: 'sabenauto-cuiaba', label: 'Cuiaba - MT' },
    { slug: 'sabenauto-varzea-grande', label: 'Varzea Grande - MT' },
    { slug: 'sabenauto-porto-velho', label: 'Porto Velho - RO' },
    { slug: 'sabenauto-rio-branco', label: 'Rio Branco - AC' },
    { slug: 'sabenauto-fortaleza', label: 'Fortaleza - CE' },
    { slug: 'sabenauto-manaus', label: 'Manaus - AM' },
    { slug: 'sabenauto-brasilia', label: 'Brasilia - DF' },
  ]

  const rawLojas = content.lojas as Array<{ slug: string; label: string }> | undefined
  const currentLojas: LojaSimples[] = rawLojas?.map(l => ({ slug: l.slug, label: l.label })) ?? defaultLojas

  const stored = (content.ofertas as Oferta[]) ?? []
  const [ofertas, setOfertas] = useState<Oferta[]>(stored)
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>()
    stored.forEach(o => s.add(o.lojaSlug))
    return s
  })
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addForm, setAddForm] = useState<Partial<Oferta>>({})

  function toggleExpand(slug: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  function startAdding(slug: string) {
    const loja = currentLojas.find(l => l.slug === slug)
    setAddForm({ lojaSlug: slug, lojaNome: loja?.label ?? slug, titulo: '', descricao: '', imagem: '', preco: '', validade: '', ativo: true })
    setAddingTo(slug)
    setExpanded(prev => new Set([...prev, slug]))
    setEditingId(null)
  }

  function confirmAdd() {
    if (!addForm.titulo?.trim()) return
    setOfertas(prev => [...prev, {
      id: Date.now().toString(),
      lojaSlug: addForm.lojaSlug!, lojaNome: addForm.lojaNome!,
      titulo: addForm.titulo!, descricao: addForm.descricao ?? '',
      imagem: addForm.imagem ?? '', preco: addForm.preco ?? '',
      validade: addForm.validade ?? '', ativo: true,
    }])
    setAddingTo(null)
    setAddForm({})
  }

  function updateOferta(id: string, patch: Partial<Oferta>) {
    setOfertas(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o))
  }

  function removeOferta(id: string, titulo: string) {
    if (!confirm(`Remover "${titulo}"?`)) return
    setOfertas(prev => prev.filter(o => o.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const storesWithContent = currentLojas.filter(l =>
    ofertas.some(o => o.lojaSlug === l.slug) || addingTo === l.slug
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Adicionar oferta em</p>
        <div className="flex flex-wrap gap-2">
          {currentLojas.map(l => (
            <button
              key={l.slug}
              onClick={() => startAdding(l.slug)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
            >
              + {l.label.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      {storesWithContent.map(loja => {
        const storeOffers = ofertas.filter(o => o.lojaSlug === loja.slug)
        const isExpanded = expanded.has(loja.slug)
        const isAdding = addingTo === loja.slug

        return (
          <div key={loja.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <button
              onClick={() => toggleExpand(loja.slug)}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <span
                className="text-gray-300 text-[10px] flex-shrink-0 transition-transform duration-200"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', display: 'inline-block' }}
              >
                {'>'}
              </span>
              <span className="font-bold text-gray-900 text-sm flex-1">{loja.label}</span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 flex-shrink-0">
                {storeOffers.length} {storeOffers.length === 1 ? 'oferta' : 'ofertas'}
              </span>
            </button>

            {isExpanded && (
              <div className="border-t border-gray-100 p-4 flex flex-col gap-2">
                {storeOffers.map(oferta =>
                  editingId === oferta.id ? (
                    <div key={oferta.id} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Titulo *" value={oferta.titulo} onChange={v => updateOferta(oferta.id, { titulo: v })} />
                        <Field label="Preco" value={oferta.preco} onChange={v => updateOferta(oferta.id, { preco: v })} placeholder="ex: R$ 299,90" />
                        <div className="sm:col-span-2">
                          <Field label="URL da imagem (9:16)" value={oferta.imagem} onChange={v => updateOferta(oferta.id, { imagem: v })} placeholder="https://..." />
                        </div>
                        {oferta.imagem && (
                          <div className="sm:col-span-2 flex gap-3 items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={oferta.imagem} alt="" className="w-14 rounded-lg bg-gray-100 object-contain flex-shrink-0" style={{ aspectRatio: '9/16' }} />
                            <p className="text-[10px] text-gray-400 leading-relaxed">Formato 9:16 (retrato)</p>
                          </div>
                        )}
                        <Field label="Validade" value={oferta.validade} onChange={v => updateOferta(oferta.id, { validade: v })} placeholder="ex: 31/12/2026" />
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descricao</label>
                          <textarea rows={2} value={oferta.descricao}
                            onChange={e => updateOferta(oferta.id, { descricao: e.target.value })}
                            className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none" />
                        </div>
                      </div>
                      <button onClick={() => setEditingId(null)}
                        className="mt-3 text-xs font-bold text-blue-600 px-4 py-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                        Fechar edicao
                      </button>
                    </div>
                  ) : (
                    <div key={oferta.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      {oferta.imagem ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={oferta.imagem} alt="" className="flex-shrink-0 w-8 rounded-lg bg-gray-200 object-cover" style={{ aspectRatio: '9/16' }} />
                      ) : (
                        <div className="flex-shrink-0 w-8 rounded-lg bg-gray-200" style={{ aspectRatio: '9/16' }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{oferta.titulo}</p>
                        {oferta.preco && <p className="text-xs font-bold" style={{ color: '#007BFF' }}>{oferta.preco}</p>}
                      </div>
                      <button
                        onClick={() => updateOferta(oferta.id, { ativo: !oferta.ativo })}
                        className="flex-shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full text-white"
                        style={{ background: oferta.ativo ? '#00b894' : '#adb5bd' }}
                      >
                        {oferta.ativo ? 'Ativo' : 'Inativo'}
                      </button>
                      <button onClick={() => setEditingId(oferta.id)}
                        className="flex-shrink-0 text-xs text-gray-400 hover:text-blue-500 transition-colors font-semibold" title="Editar">
                        Editar
                      </button>
                      <button onClick={() => removeOferta(oferta.id, oferta.titulo)}
                        className="flex-shrink-0 text-sm font-bold text-gray-300 hover:text-red-500 transition-colors" title="Remover">
                        x
                      </button>
                    </div>
                  )
                )}

                {isAdding && (
                  <div className="mt-1 p-4 bg-green-50 rounded-xl border border-green-100">
                    <p className="text-xs font-black text-green-700 mb-3">Nova oferta — {loja.label}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Titulo *" value={addForm.titulo ?? ''} onChange={v => setAddForm(f => ({ ...f, titulo: v }))} placeholder="ex: Kit Embreagem" />
                      <Field label="Preco" value={addForm.preco ?? ''} onChange={v => setAddForm(f => ({ ...f, preco: v }))} placeholder="ex: R$ 299,90" />
                      <div className="sm:col-span-2">
                        <Field label="URL da imagem (9:16)" value={addForm.imagem ?? ''} onChange={v => setAddForm(f => ({ ...f, imagem: v }))} placeholder="https://..." />
                      </div>
                      {addForm.imagem && (
                        <div className="sm:col-span-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={addForm.imagem} alt="" className="w-14 rounded-lg bg-gray-100 object-contain" style={{ aspectRatio: '9/16' }} />
                        </div>
                      )}
                      <Field label="Validade" value={addForm.validade ?? ''} onChange={v => setAddForm(f => ({ ...f, validade: v }))} placeholder="ex: 31/12/2026" />
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Descricao</label>
                        <textarea rows={2} value={addForm.descricao ?? ''} onChange={e => setAddForm(f => ({ ...f, descricao: e.target.value }))}
                          className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={confirmAdd} disabled={!addForm.titulo?.trim()}
                        className="text-white font-bold px-5 py-2 rounded-xl text-xs disabled:opacity-50 transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}>
                        Adicionar oferta
                      </button>
                      <button onClick={() => setAddingTo(null)}
                        className="px-5 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {!isAdding && (
                  <button onClick={() => startAdding(loja.slug)}
                    className="mt-1 border-2 border-dashed border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500 rounded-xl py-2.5 text-xs font-semibold transition-all">
                    + Adicionar oferta aqui
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}

      {storesWithContent.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
          <p className="font-semibold text-gray-600 mb-1">Nenhuma oferta cadastrada</p>
          <p className="text-sm text-gray-400">Use os botoes acima para adicionar ofertas por cidade</p>
        </div>
      )}

      <SaveBtn onClick={() => onSave({ ofertas })} saving={saving} />
    </div>
  )
}

/* --- RODAPE ------------------------------------------------- */
function RodapeTab({ content, onSave, saving }: TabProps) {
  type RLink = { id: string; label: string; url: string }
  const defaultRodape = {
    slogan: 'A peca que falta para o sucesso da sua oficina!',
    grupo: 'BENNESBY',
    copyright: 'Copyright 2026 Sabenauto Distribuidora de Pecas',
    devText: 'Desenvolvido pelo setor de marketing digital do grupo Bennesby',
    links: [{ id: '1', label: 'Veja as Vagas Disponiveis', url: 'https://www.linkedin.com/company/grupo-bennesby/jobs/?viewAsMember=true' }] as RLink[],
    logoSabenautoUrl: '',
    logoBennesbyUrl: '',
  }
  const stored = (content.rodape as typeof defaultRodape) ?? {}
  const [form, setForm] = useState({ ...defaultRodape, ...stored })

  function addLink() {
    setForm(f => ({ ...f, links: [...f.links, { id: Date.now().toString(), label: '', url: '' }] }))
  }

  function removeLink(id: string) {
    setForm(f => ({ ...f, links: f.links.filter(l => l.id !== id) }))
  }

  function updateLink(id: string, field: 'label' | 'url', value: string) {
    setForm(f => ({ ...f, links: f.links.map(l => l.id === id ? { ...l, [field]: value } : l) }))
  }

  return (
    <div className="flex flex-col gap-5">
      <Card title="Textos do Rodape">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Slogan" value={form.slogan} onChange={v => setForm(f => ({ ...f, slogan: v }))} placeholder="A peca que falta..." />
          <Field label="Nome do Grupo" value={form.grupo} onChange={v => setForm(f => ({ ...f, grupo: v }))} placeholder="ex: BENNESBY" />
          <div className="md:col-span-2">
            <Field label="Texto de Copyright" value={form.copyright} onChange={v => setForm(f => ({ ...f, copyright: v }))} placeholder="Copyright 2026 ..." />
          </div>
          <div className="md:col-span-2">
            <Field label="Credito de desenvolvimento" value={form.devText} onChange={v => setForm(f => ({ ...f, devText: v }))} placeholder="Desenvolvido por..." />
          </div>
        </div>
      </Card>

      <Card title="Logos do Rodape">
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Substitua os textos &quot;Sabenauto&quot; e &quot;Bennesby&quot; por imagens de logo. Deixe vazio para usar texto.
        </p>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Logo Sabenauto (coluna esquerda)</p>
            <input
              type="url"
              value={form.logoSabenautoUrl ?? ''}
              onChange={e => setForm(f => ({ ...f, logoSabenautoUrl: e.target.value }))}
              placeholder="https://... (vazio = texto SABENAUTO)"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors font-mono"
            />
            {form.logoSabenautoUrl && (
              <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.logoSabenautoUrl} alt="preview" className="h-8 w-auto object-contain" />
              </div>
            )}
          </div>
          <div>
            <p className="text-xs font-black text-gray-700 uppercase tracking-widest mb-2">Logo Bennesby (coluna direita)</p>
            <input
              type="url"
              value={form.logoBennesbyUrl ?? ''}
              onChange={e => setForm(f => ({ ...f, logoBennesbyUrl: e.target.value }))}
              placeholder="https://... (vazio = texto BENNESBY)"
              className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors font-mono"
            />
            {form.logoBennesbyUrl && (
              <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-end">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.logoBennesbyUrl} alt="preview" className="h-8 w-auto object-contain" />
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card title="Botoes / Links">
        <p className="text-xs text-gray-400 mb-4">Links que aparecem na coluna de Atendimento do rodape (vagas, redes sociais, WhatsApp, etc.).</p>
        <div className="flex flex-col gap-3">
          {form.links.map(link => (
            <div key={link.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Texto do link" value={link.label} onChange={v => updateLink(link.id, 'label', v)} placeholder="ex: Veja as Vagas" />
                <Field label="URL de destino" value={link.url} onChange={v => updateLink(link.id, 'url', v)} placeholder="https://..." />
              </div>
              <button onClick={() => removeLink(link.id)} className="mt-3 text-xs text-red-400 hover:text-red-600 font-semibold transition-colors">
                Remover link
              </button>
            </div>
          ))}
        </div>
        <button onClick={addLink} className="mt-3 w-full border-2 border-dashed border-blue-200 text-blue-500 hover:border-blue-400 hover:bg-blue-50 rounded-xl py-3 text-sm font-semibold transition-all">
          + Adicionar link
        </button>
      </Card>

      <SaveBtn onClick={() => onSave({ rodape: form })} saving={saving} />
    </div>
  )
}

/* --- Helpers ----------------------------------------------- */
type TabProps = { content: Record<string, unknown>; onSave: (u: Record<string, unknown>) => Promise<void>; saving: boolean }

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-700 mb-5 text-xs uppercase tracking-widest">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
      />
    </div>
  )
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors resize-none"
      />
    </div>
  )
}

function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        disabled={saving}
        className="flex items-center gap-2 text-white font-bold px-8 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5 disabled:opacity-60 shadow-sm"
        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
      >
        {saving ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Salvando...
          </>
        ) : (
          <>Salvar alteracoes</>
        )}
      </button>
    </div>
  )
}
