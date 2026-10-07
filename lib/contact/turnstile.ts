/* Cloudflare Turnstile sunucu doğrulaması. Gizli anahtar yalnızca sunucuda okunur. */
const isProd = process.env.NODE_ENV === 'production'

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    if (isProd) {
      console.error('[iletisim] TURNSTILE_SECRET_KEY tanımlı değil')
      return false
    }
    return true // yalnızca geliştirmede: anahtar yoksa bot kontrolü atlanır
  }
  if (!token) return false
  try {
    const body = new URLSearchParams({ secret, response: token })
    if (ip && ip !== 'bilinmiyor') body.set('remoteip', ip)
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!r.ok) return false
    return ((await r.json()) as { success?: boolean }).success === true
  } catch {
    return false
  }
}
