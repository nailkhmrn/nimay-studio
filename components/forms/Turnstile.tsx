"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

interface TurnstileApi {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TIMEOUT_MS = 20000;

/* Cloudflare Turnstile bot kontrolü (açık render). Site anahtarı tanımlı değilse hiçbir şey çizmez.
   "interaction-only": ziyaretçiye yalnızca gerekirse görünür. Belirteç gelene kadar form göndermeyi form bileşeni bekletir.
   Hata kodu (örn. 110200: alan adı tanınmıyor) konsola yazılır, kullanıcıya genel mesaj gösterilir.
   Güvenlik mantığına atlama yoktur: belirteç sunucuda ayrıca doğrulanır. */
export function Turnstile({ resetKey, onToken, onError }: { resetKey: unknown; onToken: (token: string | null) => void; onError: (code: string) => void }) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const first = useRef(true);
  const cb = useRef({ onToken, onError });
  useEffect(() => {
    cb.current = { onToken, onError };
  });

  const fail = (code: string) => {
    clearTimeout(timer.current);
    console.error("[turnstile] hata kodu:", code);
    cb.current.onError(code);
  };

  const render = () => {
    if (!turnstileSiteKey || !box.current || !window.turnstile || widget.current) return;
    timer.current = window.setTimeout(() => fail("zaman-asimi"), TIMEOUT_MS);
    widget.current = window.turnstile.render(box.current, {
      sitekey: turnstileSiteKey,
      appearance: "interaction-only",
      language: "tr",
      callback: (token: string) => {
        clearTimeout(timer.current);
        cb.current.onToken(token);
      },
      "expired-callback": () => cb.current.onToken(null),
      "timeout-callback": () => cb.current.onToken(null),
      "error-callback": (code: string) => {
        fail(String(code));
        return true;
      },
    });
  };

  useEffect(() => {
    render();
    const el = box.current;
    return () => {
      clearTimeout(timer.current);
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
      if (el) el.innerHTML = "";
    };
    // render yalnızca ref'lere dayanır, bağımlılık gerekmez
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* her gönderimden sonra belirteç yenilenir; yenisi gelene kadar düğme bekler */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (widget.current && window.turnstile) {
      cb.current.onToken(null);
      timer.current = window.setTimeout(() => fail("zaman-asimi"), TIMEOUT_MS);
      window.turnstile.reset(widget.current);
    }
  }, [resetKey]);

  if (!turnstileSiteKey) return null;
  return (
    <>
      <div className="ts">
        <div ref={box} />
      </div>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={render} onReady={render} onError={() => fail("betik-yuklenemedi")} />
    </>
  );
}
