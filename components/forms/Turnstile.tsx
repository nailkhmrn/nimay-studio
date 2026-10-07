'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    turnstile?: { reset: (el?: string | HTMLElement) => void }
  }
}

/* Cloudflare Turnstile bot kontrolü. Site anahtarı tanımlı değilse hiçbir şey çizmez.
   "interaction-only": ziyaretçiye yalnızca gerekirse görünür. Gönderimden sonra belirteç yenilenir. */
export function Turnstile({ resetKey }: { resetKey: unknown }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  useEffect(() => {
    window.turnstile?.reset()
  }, [resetKey])
  if (!siteKey) return null
  return (
    <>
      <div className="ts">
        <div className="cf-turnstile" data-sitekey={siteKey} data-appearance="interaction-only" data-language="tr" />
      </div>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
    </>
  )
}
