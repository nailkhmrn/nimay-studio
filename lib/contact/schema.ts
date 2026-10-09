import { z } from 'zod'

export const TURLER = ['yeni', 'seo', 'emin'] as const

export const LIMITS = { ad: 100, eposta: 254, mesaj: 3000 } as const

/* Tarayıcıdan gelen ham değerler. Gizli tuzak alan ("website") ve Turnstile belirteci ayrıca okunur. */
export const contactSchema = z.object({
  ad: z.string().min(1).max(LIMITS.ad),
  eposta: z.email().max(LIMITS.eposta),
  tur: z.enum(TURLER),
  mesaj: z.string().min(1).max(LIMITS.mesaj),
})

export type ContactInput = z.infer<typeof contactSchema>

export interface ContactState {
  status: 'idle' | 'ok' | 'error'
  /* formda gösterilecek durum satırı (MESSAGES içinden) */
  message?: string
  /* hata sonrası alanların boşalmaması için gönderilen değerler */
  values?: { ad: string; eposta: string; tur: string; mesaj: string }
}

/* Metin temizliği: Unicode normalize, satır sonları, kontrol karakterleri, kenar boşlukları. */
export function clean(v: FormDataEntryValue | null, multiline = false): string {
  if (typeof v !== 'string') return ''
  let s = v.normalize('NFC').replace(/\r\n?/g, '\n')
  s = s.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, '')
  return s.trim()
}
