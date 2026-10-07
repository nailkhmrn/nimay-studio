import { $, reducedMotion, type Cleanup } from './util'

/* Mıknatıslı gönder düğmesi (iç sayfalar). Yalnızca fare olan cihazlarda. */
export function magnetic(): Cleanup {
  const mag = $('#mag')
  if (!mag || reducedMotion() || !matchMedia('(pointer:fine)').matches) return () => {}
  const wrap = mag.parentElement as HTMLElement
  const move = (e: PointerEvent) => {
    const r = mag.getBoundingClientRect(),
      dx = e.clientX - (r.left + r.width / 2),
      dy = e.clientY - (r.top + r.height / 2)
    if (Math.hypot(dx, dy) < 170) mag.style.transform = 'translate(' + dx * 0.25 + 'px,' + dy * 0.25 + 'px)'
    else mag.style.transform = ''
  }
  const leave = () => {
    mag.style.transform = ''
  }
  wrap.addEventListener('pointermove', move)
  wrap.addEventListener('pointerleave', leave)
  return () => {
    wrap.removeEventListener('pointermove', move)
    wrap.removeEventListener('pointerleave', leave)
  }
}
