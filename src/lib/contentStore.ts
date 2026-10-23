import {
  lojas as defaultLojas,
  siteConfig as defaultSiteConfig,
  estadosCards as defaultEstados,
} from './data'

export type Oferta = {
  id: string
  lojaSlug: string
  lojaNome: string
  titulo: string
  descricao: string
  imagem: string
  preco: string
  validade: string
  ativo: boolean
}

export type Imagens = {
  heroVarejoUrl: string
  heroAtacadoUrl: string
  heroOfertasUrl: string
  logoUrl: string
  homeVarejoUrl: string
  homeAtacadoUrl: string
  homeOfertasUrl: string
  quemSomosUrl: string
}

export type RodapeLink = { id: string; label: string; url: string }

export type Rodape = {
  slogan: string
  grupo: string
  copyright: string
  devText: string
  links: RodapeLink[]
  logoSabenautoUrl: string
  logoBennesbyUrl: string
}

type StoredContent = {
  siteConfig?: typeof defaultSiteConfig
  lojas?: typeof defaultLojas
  estadosCards?: typeof defaultEstados
  carrossel?: Array<{ id: string; imagem: string; alt: string }>
  ofertas?: Oferta[]
  imagens?: Imagens
  rodape?: Rodape
}

const defaultImagens: Imagens = {
  heroVarejoUrl: '',
  heroAtacadoUrl: '',
  heroOfertasUrl: '',
  logoUrl: 'https://i.postimg.cc/zDPwX8H0/LOGO-DISTRIBUIDORA-1.png',
  homeVarejoUrl: '',
  homeAtacadoUrl: '',
  homeOfertasUrl: '',
  quemSomosUrl: '',
}

const defaultRodape: Rodape = {
  slogan: 'A peça que falta para o sucesso da sua oficina!',
  grupo: 'BENNESBY',
  copyright: 'Copyright © 2026 Sabenauto Distribuidora de Peças',
  devText: 'Desenvolvido pelo setor de marketing digital do grupo Bennesby',
  links: [
    { id: '1', label: 'Veja as Vagas Disponíveis', url: 'https://www.linkedin.com/company/grupo-bennesby/jobs/?viewAsMember=true' },
  ],
  logoSabenautoUrl: '',
  logoBennesbyUrl: '',
}

const KV_KEY = 'sabenauto:content'

function getUpstash() {
  // Suporta Vercel KV (KV_REST_API_*) e Upstash direto (UPSTASH_REDIS_REST_*)
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  return url && token ? { url, token } : null
}

async function upstashGet<T>(key: string): Promise<T | null> {
  const creds = getUpstash()
  if (!creds) return null
  try {
    const res = await fetch(`${creds.url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${creds.token}` },
      cache: 'no-store',
    })
    const json = await res.json() as { result: string | null }
    if (!json.result) return null
    return JSON.parse(json.result) as T
  } catch {
    return null
  }
}

async function upstashSet(key: string, value: unknown): Promise<void> {
  const creds = getUpstash()
  if (!creds) return
  await fetch(`${creds.url}/set/${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.token}`,
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(value),
  })
}

async function read(): Promise<StoredContent> {
  const kv = await upstashGet<StoredContent>(KV_KEY)
  if (kv) return kv

  // Local dev: file-based fallback
  try {
    const fs = await import('fs')
    const path = await import('path')
    const FILE = path.join(process.cwd(), 'data', 'content.json')
    if (!fs.existsSync(FILE)) return {}
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  } catch {
    return {}
  }
}

async function write(data: StoredContent): Promise<void> {
  const creds = getUpstash()
  if (creds) {
    const res = await fetch(`${creds.url}/set/${encodeURIComponent(KV_KEY)}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${creds.token}`, 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Upstash error ${res.status}: ${body}`)
    }
    return
  }
  // Local dev: file-based fallback
  try {
    const fs = await import('fs')
    const path = await import('path')
    const FILE = path.join(process.cwd(), 'data', 'content.json')
    const dir = path.dirname(FILE)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch {
    throw new Error('Sem KV configurado e filesystem indisponível (ambiente serverless). Configure KV_REST_API_URL e KV_REST_API_TOKEN.')
  }
}

export async function getFullContent(): Promise<StoredContent> {
  return read()
}

export async function getSiteConfig() {
  const stored = await read()
  return { ...defaultSiteConfig, ...(stored.siteConfig ?? {}) }
}

export async function getLojas() {
  const stored = await read()
  return stored.lojas ?? defaultLojas
}

export async function getEstadosCards() {
  const stored = await read()
  return stored.estadosCards ?? defaultEstados
}

export async function getCarrossel() {
  const stored = await read()
  return stored.carrossel ?? [
    { id: '1', imagem: 'https://i.postimg.cc/kgbkVyC2/distribuidora-pe-as.png', alt: 'Banner Institucional Sabenauto' },
    { id: '2', imagem: 'https://i.postimg.cc/MK4CKFCk/2distribuidora-pe-as.png', alt: 'Mês do Consumidor' },
    { id: '3', imagem: 'https://i.postimg.cc/wxb6Zq1h/KIT-DE-VELAS.png', alt: 'Kit Velas de Ignição' },
    { id: '4', imagem: 'https://i.postimg.cc/2SNfNVrh/KIT-EMBREAGEM.png', alt: 'Kit Embreagem' },
  ]
}

export async function saveContent(updates: Partial<StoredContent>) {
  const current = await read()
  await write({ ...current, ...updates })
}

export async function getOfertas(): Promise<Oferta[]> {
  const stored = await read()
  return stored.ofertas ?? []
}

export async function getImagens(): Promise<Imagens> {
  const stored = await read()
  return { ...defaultImagens, ...(stored.imagens ?? {}) }
}

export async function getRodape(): Promise<Rodape> {
  const stored = await read()
  return { ...defaultRodape, ...(stored.rodape ?? {}) }
}
