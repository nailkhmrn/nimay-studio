/* İçerik Güvenliği Politikası (CSP). Her istekte yeni bir nonce üretilir (proxy.ts).
   - Betikler: yalnızca kendi alan adı + nonce'lu betikler ('strict-dynamic'). 'unsafe-inline' yok.
   - Stil: stil dosyaları ve nonce'lu <style>. Satır içi style="" özellikleri için style-src-attr 'unsafe-inline'
     (tasarımdaki konum ve ölçek ayarları buna dayanır; risk betiklere göre çok düşük, Nail onayladı).
   - Google Analytics (yalnızca kullanıcı izin verirse yüklenir) ve Cloudflare Turnstile için gerekli alan adları açıkça listelenir. */
export function buildCsp(nonce: string, isDev: boolean) {
  const turnstile = "https://challenges.cloudflare.com";
  const ga = {
    script: "https://www.googletagmanager.com",
    connect: "https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
    img: "https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
  };
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${ga.script} ${turnstile}${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'nonce-${nonce}'`,
    "style-src-attr 'unsafe-inline'",
    `img-src 'self' blob: data: ${ga.img}`,
    "font-src 'self'",
    `connect-src 'self' ${ga.connect} ${turnstile}${isDev ? " ws://localhost:* http://localhost:*" : ""}`,
    `frame-src ${turnstile}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ];
  return directives.join("; ");
}
