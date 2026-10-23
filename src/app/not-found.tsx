import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center py-24 px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black" style={{ color: '#007BFF' }}>404</p>
        <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Página não encontrada</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #3498db, #2980b9)' }}
          >
            Voltar ao início
          </Link>
          <Link
            href="/varejo"
            className="text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            style={{ background: '#007BFF' }}
          >
            Nossas lojas
          </Link>
        </div>
      </div>
    </main>
  )
}
