import type { tr } from "./locales/tr";

export type Locale = "en" | "tr";

/* TR dosyası şemanın kaynağıdır. EN dosyası aynı şekle uymak zorundadır (`satisfies SiteContent`),
   böylece bir metin iki dilde de bulunmadan derleme geçmez. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

export type SiteContent = Widen<typeof tr>;

/* Sayfa anahtarları. Dosya sistemindeki klasör adları TR'dir, EN adresler next.config.ts içinde yeniden yazılır (lib/routes.ts). */
export type PageKey = "work" | "services" | "process" | "about" | "contact" | "privacy";
