import { siteFacts } from "@/content/shared";
import type { SiteContent } from "@/content/types";
import { getSiteContent } from "@/lib/i18n";

/* Hata mesajı: WhatsApp numarası tanımlıysa mevcut metin, değilse e-posta adresine yönlendiren metin.
   Kullanıcıya her zaman genel bir mesaj gösterilir, ayrıntı yalnızca sunucu günlüğündedir. */
export function failureMessage(form: SiteContent["form"]) {
  return siteFacts.whatsappNumber ? form.failure : form.failureEmail;
}

/* Form mesajları içerik katmanından gelir (content/locales/*.ts, form bölümü). */
export function getMessages(locale: string) {
  const { form } = getSiteContent(locale);
  return { basari: form.success, hata: failureMessage(form), eksik: form.missing };
}
