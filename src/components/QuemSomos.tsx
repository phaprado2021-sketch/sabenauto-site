import Link from 'next/link'

const STATS = [
  { value: '50+', label: 'anos de tradição' },
  { value: '7',   label: 'estados atendidos' },
  { value: '2',   label: 'marcas exclusivas' },
]

export default function QuemSomos({ imageUrl }: { imageUrl?: string }) {
  return (
    <section className="py-8 sm:py-10" style={{ background: '#f0f4f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-xl" style={{ minHeight: '380px' }}>

          {/* Left: image */}
          <div className="relative md:w-1/2 min-h-[220px] sm:min-h-[280px] md:min-h-0 flex-shrink-0">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="Sabenauto — Nossa história"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' }}
              >
                <span className="text-white/20 text-4xl sm:text-6xl font-black tracking-widest select-none">SABENAUTO</span>
              </div>
            )}
          </div>

          {/* Right: blue panel */}
          <div
            className="md:w-1/2 flex flex-col justify-center px-5 py-7 sm:px-8 sm:py-10 lg:px-14 lg:py-14 gap-4 sm:gap-5"
            style={{ background: '#007BFF' }}
          >
            <h2 className="text-white font-black text-xl sm:text-2xl lg:text-3xl leading-tight">
              Nossa História
            </h2>

            <p className="text-white/90 text-sm leading-relaxed">
              A Sabenauto é{' '}
              <strong className="text-white">uma distribuidora de peças com mais de 50 anos de tradição no mercado automotivo</strong>,
              especializada em peças genuínas GM e ACDelco, além de uma linha multimarcas de alta performance.
            </p>

            <p className="text-white/90 text-sm leading-relaxed">
              <strong className="text-white">Com presença em 7 estados brasileiros</strong>,
              garantimos qualidade técnica, procedência e confiança em cada peça entregue,
              atendendo com excelência oficinas mecânicas, revendas e consumidores finais.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-1">
              {STATS.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-xl p-2.5 sm:p-3 lg:p-4 text-center"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                >
                  <p className="font-black text-lg sm:text-xl lg:text-3xl leading-none mb-1" style={{ color: '#FFD700' }}>
                    {stat.value}
                  </p>
                  <p className="text-white/80 text-[10px] sm:text-xs leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-1">
              <Link
                href="/varejo"
                className="inline-block text-white text-sm font-bold px-5 py-2.5 rounded-xl border-2 border-white/60 hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                Conheça nossas lojas
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
