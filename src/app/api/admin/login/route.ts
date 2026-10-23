import { NextResponse } from 'next/server'
import { checkPassword, generateSessionToken } from '@/lib/auth'

const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_ATTEMPTS = 10

function getClientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

export async function POST(request: Request) {
  const ip = getClientIp(request)
  const now = Date.now()

  const record = attempts.get(ip)
  if (record) {
    if (now < record.resetAt && record.count >= MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' }, { status: 429 })
    }
    if (now >= record.resetAt) {
      attempts.delete(ip)
    }
  }

  const { password } = await request.json()

  if (!await checkPassword(password)) {
    const existing = attempts.get(ip)
    if (existing && now < existing.resetAt) {
      existing.count += 1
    } else {
      attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    }
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  attempts.delete(ip)

  const token = await generateSessionToken()
  const response = NextResponse.json({ ok: true })
  response.cookies.set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}
