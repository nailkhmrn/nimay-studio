/* Form hata günlüğü. Her başarısızlık nedeni ayrı bir koddur ve [iletisim] etiketiyle yazılır.
   Günlüğe anahtar, belirteç, e-posta, ad, mesaj ya da IP yazılmaz; yalnızca kod ve zararsız ayrıntılar (alan adı, durum kodu, hata adı). */
export type FailCode =
  | "dogrulama_hatasi"
  | "honeypot"
  | "turnstile_reddi"
  | "turnstile_anahtari_tanimsiz"
  | "turnstile_ulasilamadi"
  | "hiz_siniri_deposu_tanimsiz"
  | "hiz_siniri_deposu_hatasi"
  | "hiz_siniri_asildi"
  | "eposta_ayari_eksik"
  | "resend_hatasi";

export function logFail(code: FailCode, detail?: Record<string, string | number | readonly string[]>) {
  const extra = detail
    ? " " +
      Object.entries(detail)
        .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(",") : v}`)
        .join(" ")
    : "";
  console.error(`[iletisim] ${code}${extra}`);
}
