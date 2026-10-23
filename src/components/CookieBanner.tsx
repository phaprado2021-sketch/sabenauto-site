'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div
        className="max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-6">
          {/* Ícone */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'rgba(0, 123, 255, 0.15)' }}
          >
            🍪
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm mb-1">
              Usamos cookies para melhorar sua experiência
            </p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento do site. Ao continuar,
              você concorda com nossa{' '}
              <Link
                href="/politica-de-privacidade"
                className="underline underline-offset-2 transition-colors"
                style={{ color: '#74b9ff' }}
              >
                Política de Privacidade
              </Link>
              .
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={decline}
              className="flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#94a3b8',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            >
              Recusar
            </button>
            <button
              onClick={accept}
              className="flex-1 md:flex-none px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(0, 123, 255, 0.35)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Aceitar cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
