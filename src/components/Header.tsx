'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

export type LojaWA = { label: string; whatsapp: string }

const WA_ICON = (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.523 5.847L0 24l6.335-1.501A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.373l-.36-.213-3.722.882.937-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
  </svg>
)

export default function Header({ lojasWA }: { lojasWA: LojaWA[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [waOpen, setWaOpen] = useState(false)
  const waRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Fecha o dropdown WA ao clicar fora
  useEffect(() => {
    if (!waOpen) return
    function handleClick(e: MouseEvent) {
      if (waRef.current && !waRef.current.contains(e.target as Node)) {
        setWaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [waOpen])

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/atacado', label: 'Atacado' },
    { href: '/varejo', label: 'Varejo' },
    { href: '/ofertas', label: 'Ofertas' },
  ]

  return (
    <header className="sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 block w-[130px] sm:w-[180px] md:w-auto">
            <Image
              src="https://i.postimg.cc/zDPwX8H0/LOGO-DISTRIBUIDORA-1.png"
              alt="Sabenauto Distribuidora de Peças"
              width={180}
              height={35}
              className="h-7 sm:h-9 w-full object-contain object-left"
              unoptimized
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp dropdown (desktop) — click-based para não sumir ao mover o mouse */}
          <div ref={waRef} className="relative hidden md:block">
            <button
              onClick={() => setWaOpen(v => !v)}
              className="flex items-center gap-2 text-white text-sm font-bold px-4 py-2 rounded-md transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              {WA_ICON}
              WhatsApp
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${waOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown — sem gap, clica fora para fechar */}
            {waOpen && (
              <div className="absolute right-0 top-full mt-0.5 bg-white rounded-xl shadow-2xl border border-gray-100 min-w-[220px] z-50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Escolha a loja</p>
                </div>
                {lojasWA.map(loja => (
                  <a
                    key={loja.label}
                    href={`https://wa.me/${loja.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setWaOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    <span className="text-green-500 flex-shrink-0">{WA_ICON}</span>
                    {loja.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pb-4">
          <nav className="flex flex-col pt-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`py-3 text-sm font-semibold border-b border-gray-50 last:border-0 ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">WhatsApp</p>
              {lojasWA.map(loja => (
                <a
                  key={loja.label}
                  href={`https://wa.me/${loja.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 text-sm text-gray-700 hover:text-green-600 border-b border-gray-50 last:border-0"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-green-500">{WA_ICON}</span>
                  {loja.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
