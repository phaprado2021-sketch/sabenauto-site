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
  return NextResponse.json(await getFullContent())
}

export async function POST(request: Request) {
  if (!await isAuthenticated()) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  try {
    const updates = await request.json()
    await saveContent(updates)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[admin/content POST]', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
