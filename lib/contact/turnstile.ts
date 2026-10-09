import { logFail } from "./log";

/* Cloudflare Turnstile sunucu doğrulaması. Gizli anahtar yalnızca sunucuda okunur.
   Atlama ya da bypass yoktur: anahtar yalnızca geliştirmede (NODE_ENV !== production) boş olabilir. */
const isProd = process.env.NODE_ENV === "production";

export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isProd) {
      logFail("turnstile_anahtari_tanimsiz");
      return false;
    }
    return true; // yalnızca geliştirmede: anahtar yoksa bot kontrolü yapılmaz
  }
  if (!token) {
    logFail("turnstile_reddi", { kodlar: ["belirtec-yok"] });
    return false;
  }
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "bilinmiyor") body.set("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) {
      logFail("turnstile_ulasilamadi", { durum: r.status });
      return false;
    }
    const data = (await r.json()) as { success?: boolean; "error-codes"?: string[] };
    if (data.success === true) return true;
    // Cloudflare'in hata kodları (örn. invalid-input-response) gizli değildir, teşhis için yazılır.
    logFail("turnstile_reddi", { kodlar: (data["error-codes"] ?? ["kod-yok"]).slice(0, 5) });
    return false;
  } catch (e) {
    logFail("turnstile_ulasilamadi", { hata: e instanceof Error ? e.name : "bilinmiyor" });
    return false;
  }
}
