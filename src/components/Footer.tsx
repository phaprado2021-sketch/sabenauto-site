import Link from 'next/link'
import type { Rodape } from '@/lib/contentStore'

type SiteConfigFooter = {
  horarioSemana: string
  horarioSabado: string
}

export default function Footer({ rodape, siteConfig }: { rodape: Rodape; siteConfig: SiteConfigFooter }) {
  return (
    <footer className="bg-white border-t border-gray-200">

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            {rodape.logoSabenautoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={rodape.logoSabenautoUrl} alt="Sabenauto" className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-black text-xl tracking-tight" style={{ color: '#007BFF' }}>SABENAUTO</span>
            )}
            <p className="text-sm text-gray-500 italic leading-relaxed">{rodape.slogan}</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Distribuidora de Peças do Grupo Bennesby. Presente em todo o Brasil.
            </p>
            <div className="mt-2">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Grupo</p>
              {rodape.logoBennesbyUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={rodape.logoBennesbyUrl} alt={rodape.grupo} className="h-8 w-auto object-contain" />
              ) : (
                <span className="font-black text-base text-gray-600">{rodape.grupo}</span>
              )}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Serviços</p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/varejo" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Varejo
                </Link>
              </li>
              <li>
                <Link href="/atacado" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Atacado
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Ofertas
                </Link>
              </li>
              <li>
                <Link href="#onde-estamos" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Nossas Lojas
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Institutional */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Institucional</p>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/sobre-nos" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/grupo-bennesby/jobs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Trabalhe Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-5">Atendimento</p>
            <div className="flex flex-col gap-2 mb-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horário de Funcionamento</p>
              <p className="text-sm text-gray-600">{siteConfig.horarioSemana}</p>
              <p className="text-sm text-gray-600">{siteConfig.horarioSabado}</p>
            </div>
            {rodape.links.length > 0 && (
              <ul className="flex flex-col gap-3">
                {rodape.links.map(link => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline transition-colors"
                      style={{ color: '#007BFF' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Copyright bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-1">
        <p className="text-xs text-gray-400">{rodape.copyright}</p>
        <p className="text-xs text-gray-400">{rodape.devText}</p>
      </div>

      {/* Bottom legal bar */}
      <div className="border-t border-gray-100 py-3" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Faça revisões em seu veículo regularmente. Estes veículos estão em conformidade com o Programa de Controle da Poluição do Ar por Veículos Automotores.
            {' '}NO TRÂNSITO, DESACELERE. SEU BEM MAIOR É A VIDA.
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
            SABENAUTO COMERCIO DE VEICULOS LTDA
          </p>
        </div>
      </div>
    </footer>
  )
}
