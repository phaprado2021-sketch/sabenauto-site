import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin/')) {
    const cookie = request.cookies.get('admin-session')?.value
    if (!cookie) return NextResponse.redirect(new URL('/admin', request.url))

    const secret = process.env.ADMIN_SESSION_SECRET ?? 'fallback-session-key'
    const password = process.env.ADMIN_PASSWORD ?? ''

    if (!password) return NextResponse.redirect(new URL('/admin', request.url))

    const expected = await sha256(`${password}:${secret}:admin-session`)
    if (cookie !== expected) return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path+'],
}
