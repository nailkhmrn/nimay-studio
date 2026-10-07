import { $$, type Cleanup } from './util'
import { PALETTE_EVENT } from '@/lib/palette'

/* Gezinme rengi: üstündeki bölümün yazı rengini izler. */
export function navTone(selector: string): Cleanup {
  const root = document.documentElement
  const secs = $$(selector)
  const run = () => {
    if (!secs.length) return
    const y = 40
    let cur = secs[0] as HTMLElement
    secs.forEach((s) => {
      const r = s.getBoundingClientRect()
      if (r.top <= y && r.bottom > y) cur = s
    })
    root.style.setProperty('--navfg', getComputedStyle(cur).color)
  }
  addEventListener('scroll', run, { passive: true })
  addEventListener(PALETTE_EVENT, run)
  run()
  return () => {
    removeEventListener('scroll', run)
    removeEventListener(PALETTE_EVENT, run)
  }
}
