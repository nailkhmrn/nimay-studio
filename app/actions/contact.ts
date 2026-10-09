"use server";

import { headers } from "next/headers";
import { getMessages } from "@/lib/contact/messages";
import { logFail } from "@/lib/contact/log";
import { sendContactMail } from "@/lib/contact/mail";
import { allow } from "@/lib/contact/ratelimit";
import { clean, contactSchema, TURLER, type ContactState } from "@/lib/contact/schema";
import { verifyTurnstile } from "@/lib/contact/turnstile";
import { isLocale } from "@/lib/i18n";

/* İletişim formu: iletişim sayfası ve ana sayfa aynı eylemi kullanır.
   Sıra: gizli tuzak alan, doğrulama, hız sınırı, bot kontrolü, e-posta. */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const rawLocale = clean(formData.get("locale"));
  const MESSAGES = getMessages(isLocale(rawLocale) ? rawLocale : "tr");

  const values = {
    ad: clean(formData.get("ad")),
    eposta: clean(formData.get("eposta")),
    tur: clean(formData.get("tur")) || TURLER[0],
    mesaj: clean(formData.get("mesaj"), true),
  };

  /* tuzak alan: insanlar görmez, botlar doldurur. Sessizce başarılı gibi yanıtlanır, hiçbir şey gönderilmez. */
  if (clean(formData.get("website"))) {
    logFail("honeypot");
    return { status: "ok", message: MESSAGES.basari };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    // yalnızca hatalı alan adları yazılır, değerler yazılmaz
    logFail("dogrulama_hatasi", { alanlar: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] });
    const empty = !values.ad || !values.eposta || !values.mesaj;
    return { status: "error", message: empty ? MESSAGES.eksik : MESSAGES.hata, values };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim() || "bilinmiyor";

  if (!(await allow(ip, parsed.data.eposta))) return { status: "error", message: MESSAGES.hata, values };

  const token = clean(formData.get("cf-turnstile-response"));
  if (!(await verifyTurnstile(token, ip))) return { status: "error", message: MESSAGES.hata, values };

  if (!(await sendContactMail(parsed.data))) return { status: "error", message: MESSAGES.hata, values };

  return { status: "ok", message: MESSAGES.basari };
}
