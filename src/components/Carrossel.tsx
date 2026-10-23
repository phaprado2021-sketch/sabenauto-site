'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

export type SlideData = {
  id: string
  imagem: string
  alt: string
}

const DEFAULT_SLIDES: SlideData[] = [
  { id: '1', imagem: 'https://i.postimg.cc/kgbkVyC2/distribuidora-pe-as.png', alt: 'Banner Institucional Sabenauto' },
  { id: '2', imagem: 'https://i.postimg.cc/MK4CKFCk/2distribuidora-pe-as.png', alt: 'Mês do Consumidor' },
  { id: '3', imagem: 'https://i.postimg.cc/wxb6Zq1h/KIT-DE-VELAS.png', alt: 'Kit Velas de Ignição' },
  { id: '4', imagem: 'https://i.postimg.cc/2SNfNVrh/KIT-EMBREAGEM.png', alt: 'Kit Embreagem' },
]

export default function Carrossel({ slides = DEFAULT_SLIDES }: { slides?: SlideData[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    setCurrent((idx + total) % total)
  }, [total])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-avança a cada 5s, pausa ao interagir
  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next, paused])

  function handleManual(fn: () => void) {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setPaused(true)
    fn()
    // Retoma após 8s de inatividade
    const t = setTimeout(() => setPaused(false), 8000)
    return () => clearTimeout(t)
  }

  return (
    <div className="relative w-full overflow-hidden bg-black">
      {/* Imagem âncora — mantém a altura natural do slide ativo sem cortar */}
      <Image
        src={slides[current].imagem}
        alt=""
        width={1920}
        height={600}
        className="w-full h-auto opacity-0 pointer-events-none select-none"
        aria-hidden
        unoptimized
      />

      {/* Slides com crossfade em cima da âncora */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <Image
            src={slide.imagem}
            alt={slide.alt}
            fill
            className="object-contain"
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Setas — ghost style, aparecem ao hover */}
      <button
        onClick={() => handleManual(prev)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)' }}
        aria-label="Slide anterior"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => handleManual(next)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 opacity-60 hover:opacity-100"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.3)' }}
        aria-label="Próximo slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleManual(() => goTo(i))}
            aria-label={`Ir para slide ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? 'white' : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>

      {/* Barra de progresso */}
      {!paused && (
        <div className="absolute bottom-0 left-0 z-10 h-0.5 bg-white/30 w-full">
          <div
            key={current}
            className="h-full bg-white"
            style={{ animation: 'progress 5s linear forwards' }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
      `}</style>
    </div>
  )
}
