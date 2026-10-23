'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Script from 'next/script'
import { GOOGLE_MAPS_API_KEY, type Loja } from '@/lib/data'

declare global {
  interface Window {
    google: typeof google
    initSabenautoMap: () => void
  }
}

export default function OndeEstamos({ lojas }: { lojas: Loja[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const markerRef = useRef<google.maps.Marker | null>(null)
  const [selected, setSelected] = useState<Loja | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const initMap = useCallback(() => {
    if (!mapRef.current || mapInstance.current) return
    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: -14.235, lng: -51.925 },
      zoom: 4,
      styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
    })
    setMapLoaded(true)
  }, [])

  useEffect(() => {
    window.initSabenautoMap = initMap
  }, [initMap])

  function selectCity(loja: Loja) {
    setSelected(loja)
    if (!mapInstance.current) return
    mapInstance.current.setCenter(loja.coords)
    mapInstance.current.setZoom(15)
    if (markerRef.current) markerRef.current.setMap(null)
    markerRef.current = new window.google.maps.Marker({
      position: loja.coords,
      map: mapInstance.current,
      title: loja.label,
      animation: window.google.maps.Animation.DROP,
    })
  }

  function resetMap() {
    setSelected(null)
    if (!mapInstance.current) return
    mapInstance.current.setCenter({ lat: -14.235, lng: -51.925 })
    mapInstance.current.setZoom(4)
    if (markerRef.current) { markerRef.current.setMap(null); markerRef.current = null }
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const gradient = 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)'

  return (
    <section className="py-10 sm:py-12" style={{ background: '#f8f9fa' }}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initSabenautoMap`}
        strategy="lazyOnload"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8" style={{ color: '#007BFF' }}>
          ONDE ESTAMOS?
        </h2>

        {/* Responsive grid: 1 col mobile (stack), 2 col desktop (sidebar + map) */}
        <div
          className="rounded-2xl overflow-hidden shadow-lg border border-white/20 grid grid-cols-1 md:grid-cols-[240px_1fr]"
          style={{ minHeight: '420px' }}
        >
          {/* Sidebar */}
          <div className="p-3 md:p-5 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible" style={{ background: gradient }}>
            <h3 className="hidden md:block text-white font-bold text-xl text-center mb-1 flex-shrink-0">
              Escolha A Loja
            </h3>
            {lojas.map(loja => (
              <button
                key={loja.key}
                onClick={() => selectCity(loja)}
                className={`flex-shrink-0 md:flex-shrink md:w-full py-2 px-3 md:py-3 md:px-4 rounded-xl text-white font-bold text-xs md:text-sm text-center transition-all duration-200 border border-white/10 whitespace-nowrap md:whitespace-normal ${
                  selected?.key === loja.key
                    ? 'bg-white/35 scale-[1.02]'
                    : 'bg-white/15 hover:bg-white/25'
                }`}
              >
                {loja.label}
              </button>
            ))}
          </div>

          {/* Map + info */}
          <div className="flex flex-col">
            <div ref={mapRef} className="flex-1" style={{ minHeight: '260px' }} />

            {selected && (
              <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-base sm:text-lg" style={{ color: '#007BFF' }}>{selected.label}</h4>
                  <button onClick={resetMap} className="text-gray-400 hover:text-gray-600 text-xl transition-colors">✕</button>
                </div>
                <div className="flex flex-col gap-2">
                  {selected.whatsapp && (
                    <button onClick={() => copyText(`WhatsApp: ${selected.phone || selected.whatsapp}`)} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                      <span className="text-green-500">📱</span>
                      <span className="truncate">WhatsApp: {selected.phone}</span>
                      {copied === `WhatsApp: ${selected.phone || selected.whatsapp}` && <span className="text-xs text-green-500 ml-auto flex-shrink-0">Copiado!</span>}
                    </button>
                  )}
                  {selected.email && (
                    <button onClick={() => copyText(selected.email!)} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                      <span className="text-blue-500">✉️</span>
                      <span className="truncate">{selected.email}</span>
                      {copied === selected.email && <span className="text-xs text-green-500 ml-auto flex-shrink-0">Copiado!</span>}
                    </button>
                  )}
                  {selected.phone && (
                    <button onClick={() => copyText(selected.phone!)} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                      <span className="text-blue-500">📞</span>
                      <span className="truncate">Telefone: {selected.phone}</span>
                      {copied === selected.phone && <span className="text-xs text-green-500 ml-auto flex-shrink-0">Copiado!</span>}
                    </button>
                  )}
                  {selected.endereco && (
                    <>
                      <button onClick={() => copyText(selected.endereco!)} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
                        <span className="text-red-500 flex-shrink-0">📍</span>
                        <span className="text-left">{selected.endereco}</span>
                        {copied === selected.endereco && <span className="text-xs text-green-500 ml-auto flex-shrink-0">Copiado!</span>}
                      </button>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.endereco)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-sm transition-all hover:-translate-y-0.5"
                        style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
                      >
                        🗺️ Abrir no Google Maps
                      </a>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
