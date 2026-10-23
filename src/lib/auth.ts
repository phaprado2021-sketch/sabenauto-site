async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function generateSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET ?? 'sabenauto-secret'
  const password = process.env.ADMIN_PASSWORD ?? ''
  return sha256(`${password}:${secret}:admin-session`)
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const expected = await generateSessionToken()
  return token === expected
}

export async function checkPassword(input: string): Promise<boolean> {
  const password = process.env.ADMIN_PASSWORD ?? ''
  if (!password) return false
  return input === password
}
