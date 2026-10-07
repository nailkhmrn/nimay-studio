import type { ContactInput } from './schema'

/* E-posta gönderimi (Resend REST API, ek bağımlılık yok). Anahtarlar yalnızca sunucuda okunur.
   Gövde düz metindir, kullanıcı metni HTML olarak yorumlanmaz; konu sabittir. */
const isProd = process.env.NODE_ENV === 'production'

const TUR_ADI: Record<ContactInput['tur'], string> = {
  yeni: 'Yeni web sitesi',
  seo: 'Teknik SEO',
  emin: 'Henüz emin değilim',
}

export async function sendContactMail(d: ContactInput): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  const text = ['Ad soyad: ' + d.ad, 'E-posta: ' + d.eposta, 'Tür: ' + TUR_ADI[d.tur], '', d.mesaj].join('\n')

  if (!key || !to || !from) {
    if (isProd) {
      console.error('[iletisim] e-posta ayarları eksik (RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)')
      return false
    }
    // yalnızca geliştirmede: gönderim yerine sunucu konsoluna yazılır
    console.log('[iletisim] geliştirme modu, e-posta gönderilmedi:\n' + text)
    return true
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: d.eposta, subject: "NIMAY iletişim formu", text }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) console.error('[iletisim] e-posta servisi hata döndürdü:', r.status)
    return r.ok
  } catch (e) {
    console.error('[iletisim] e-posta gönderilemedi:', e instanceof Error ? e.name : 'bilinmeyen hata')
    return false
  }
}
