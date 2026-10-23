import fs from 'fs'
import path from 'path'
import {
  lojas as defaultLojas,
  siteConfig as defaultSiteConfig,
  estadosCards as defaultEstados,
} from './data'

const FILE = path.join(process.cwd(), 'data', 'content.json')

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
  carrossel?: Array<{
    id: string
    imagem: string
    alt: string
  }>
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

function read(): StoredContent {
  try {
    if (!fs.existsSync(FILE)) return {}
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  } catch {
    return {}
  }
}

function write(data: StoredContent) {
  const dir = path.dirname(FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export function getFullContent(): StoredContent {
  return read()
}

export function getSiteConfig() {
  const stored = read()
  return { ...defaultSiteConfig, ...(stored.siteConfig ?? {}) }
}

export function getLojas() {
  const stored = read()
  return stored.lojas ?? defaultLojas
}

export function getEstadosCards() {
  const stored = read()
  return stored.estadosCards ?? defaultEstados
}

export function getCarrossel() {
  const stored = read()
  return stored.carrossel ?? [
    { id: '1', imagem: 'https://i.postimg.cc/kgbkVyC2/distribuidora-pe-as.png', alt: 'Banner Institucional Sabenauto' },
    { id: '2', imagem: 'https://i.postimg.cc/MK4CKFCk/2distribuidora-pe-as.png', alt: 'Mês do Consumidor' },
    { id: '3', imagem: 'https://i.postimg.cc/wxb6Zq1h/KIT-DE-VELAS.png', alt: 'Kit Velas de Ignição' },
    { id: '4', imagem: 'https://i.postimg.cc/2SNfNVrh/KIT-EMBREAGEM.png', alt: 'Kit Embreagem' },
  ]
}

export function saveContent(updates: Partial<StoredContent>) {
  const current = read()
  write({ ...current, ...updates })
}

export function getOfertas(): Oferta[] {
  const stored = read()
  return stored.ofertas ?? []
}

export function getImagens(): Imagens {
  const stored = read()
  return { ...defaultImagens, ...(stored.imagens ?? {}) }
}

export function getRodape(): Rodape {
  const stored = read()
  return { ...defaultRodape, ...(stored.rodape ?? {}) }
}
