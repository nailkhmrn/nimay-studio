/* Sunucu başlarken eksik ortam değişkenlerinin yalnızca adlarını tek satırda yazar (değer yazılmaz). */
const REQUIRED = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "RATE_LIMIT_SALT",
  "RESEND_API_KEY",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
];

export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const missing = REQUIRED.filter((name) => !process.env[name]);
  if (missing.length) console.error(`[iletisim] eksik ortam değişkenleri: ${missing.join(", ")}`);
}
