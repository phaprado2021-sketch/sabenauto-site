import { NextResponse } from 'next/server'
import { verifySessionToken } from '@/lib/auth'
import { cookies } from 'next/headers'

async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies()
  const token = jar.get('admin-session')?.value
  if (!token) return false
  return verifySessionToken(token)
}

export async function GET() {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  const url = kvUrl || upstashUrl
  const token = kvToken || upstashToken

  const envInfo = {
    KV_REST_API_URL: kvUrl ? '✓ set' : '✗ missing',
    KV_REST_API_TOKEN: kvToken ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_URL: upstashUrl ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_TOKEN: upstashToken ? '✓ set' : '✗ missing',
    resolvedUrl: url ?? null,
  }

  if (!url || !token) {
    return NextResponse.json({ envInfo, kvTest: 'skipped — no credentials found' })
  }

  try {
    const res = await fetch(`${url}/set/debug-test/ok`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' },
      body: 'ok',
    })
    const body = await res.json()
    return NextResponse.json({ envInfo, kvTest: res.ok ? '✓ write OK' : '✗ write failed', kvResponse: body })
  } catch (e) {
    return NextResponse.json({ envInfo, kvTest: '✗ exception', error: String(e) })
  }
}
