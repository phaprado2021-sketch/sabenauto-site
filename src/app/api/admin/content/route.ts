import { NextResponse } from 'next/server'
import { getFullContent, saveContent } from '@/lib/contentStore'
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
  return NextResponse.json(getFullContent())
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const updates = await request.json()
  saveContent(updates)
  return NextResponse.json({ ok: true })
}
