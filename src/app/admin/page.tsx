'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erro ao entrar')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a1f3c 0%, #1a3a6b 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <p className="font-black text-3xl tracking-tight" style={{ color: '#007BFF' }}>SABENAUTO</p>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500"
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="text-white font-bold py-3 rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #007BFF, #0056b3)' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
