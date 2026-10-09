import { z } from 'zod'
import { logFail } from './log'
import type { ContactInput } from './schema'

/* E-posta gönderimi (Resend REST API, ek bağımlılık yok). Anahtarlar yalnızca sunucuda okunur.
   Gövde düz metindir, kullanıcı metni HTML olarak yorumlanmaz; konu sabittir. */
const isProd = process.env.NODE_ENV === 'production'

const TUR_ADI: Record<ContactInput['tur'], string> = {
  yeni: 'Yeni web sitesi',
  seo: 'Teknik SEO',
  emin: 'Henüz emin değilim',
}

/* Reply-To olarak gönderenin adresi kullanılır. Adres sunucuda zod ile doğrulanmıştır (schema.ts); burada ayrıca
   başlık enjeksiyonuna karşı satır sonu, boşluk ve ayraç içermediği son kez denetlenir. */
function safeReplyTo(email: string): string | null {
  if (email.length > 254 || /[\r\n\u0000-\u001F\u007F\s<>,;"]/.test(email)) return null
  return z.email().safeParse(email).success ? email : null
}

export async function sendContactMail(d: ContactInput): Promise<boolean> {
  const replyTo = safeReplyTo(d.eposta)
  if (!replyTo) {
    logFail('dogrulama_hatasi', { alanlar: ['eposta'] })
    return false
  }
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL
  const text = ['Ad soyad: ' + d.ad, 'E-posta: ' + d.eposta, 'Tür: ' + TUR_ADI[d.tur], '', d.mesaj].join('\n')

  if (!key || !to || !from) {
    if (isProd) {
      logFail('eposta_ayari_eksik')
      return false
    }
    // yalnızca geliştirmede: gönderim yerine sunucu konsoluna yazılır
    console.log('[iletisim] geliştirme modu: e-posta gönderilmedi (içerik günlüğe yazılmaz)')
    return true
  }

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: replyTo, subject: "NIMAY iletişim formu", text }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    })
    if (!r.ok) {
      // Resend hata gövdesinden yalnızca hata adı okunur (örn. validation_error); mesaj ve alıcı bilgisi yazılmaz.
      let name = 'bilinmiyor'
      try {
        const j = (await r.json()) as { name?: unknown }
        if (typeof j.name === 'string') name = j.name.slice(0, 60)
      } catch {}
      logFail('resend_hatasi', { durum: r.status, ad: name })
    }
    return r.ok
  } catch (e) {
    logFail('resend_hatasi', { hata: e instanceof Error ? e.name : 'bilinmiyor' })
    return false
  }
}
