import { getSiteContent } from "@/lib/i18n";

/* Form mesajları içerik katmanından gelir (content/locales/*.ts, form bölümü). TR metinler Nail'in onayladığı taslaklardır. */
export function getMessages(locale: string) {
  const { form } = getSiteContent(locale);
  return { basari: form.success, hata: form.failure, eksik: form.missing };
}
