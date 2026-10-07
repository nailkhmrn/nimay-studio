import { GL_PALS } from './hero'
import type { Palette } from '@/lib/palette'

/* Canvas efektleri: yarı ton (halftone) ve oluklu cam. Taslaktaki çizim kodu olduğu gibi taşındı. */

export function fit(c: HTMLCanvasElement) {
  const r = c.getBoundingClientRect(),
    d = Math.min(devicePixelRatio || 1, 2)
  c.width = Math.max(2, Math.round(r.width * d))
  c.height = Math.max(2, Math.round(r.height * d))
}

export interface Colors {
  acc: string
  ink: string
  bg: string
}

/* CSS değişkenleri yalnızca palet değişince değişir, bu yüzden her karede okunmaz. */
export function readColors(): Colors {
  const cs = getComputedStyle(document.documentElement)
  const v = (n: string) => cs.getPropertyValue(n).trim()
  return { acc: v('--acc'), ink: v('--ink') || '#07070D', bg: v('--bg') }
}

export function halftoneTile(c: HTMLCanvasElement, t: number, fg: string) {
  const ctx = c.getContext('2d')
  if (!ctx) return
  const w = c.width,
    h = c.height,
    n = 46,
    cw = w / n,
    ch = h / Math.round(h / cw)
  ctx.fillStyle = '#0d0d14'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = fg
  const rows = Math.round(h / cw)
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < n; x++) {
      const u = x / n,
        v = y / rows
      const dx = u - 0.5 - Math.sin(t * 0.6) * 0.18,
        dy = v - 0.5 - Math.cos(t * 0.5) * 0.14
      let val = 1 - Math.min(1, Math.sqrt(dx * dx + dy * dy) * 2.1) + 0.18 * Math.sin(u * 9 + t) * Math.sin(v * 7 - t * 1.3)
      val = Math.max(0, Math.min(1, val))
      const r = val * cw * 0.52
      if (r < 0.4) continue
      ctx.beginPath()
      ctx.arc((x + 0.5) * cw, (y + 0.5) * ch, r, 0, 6.2832)
      ctx.fill()
    }
}

export function createGlass(c: HTMLCanvasElement) {
  const off = document.createElement('canvas')
  const size = () => {
    fit(c)
    off.width = c.width
    off.height = c.height
  }
  size()
  const draw = (t: number, pal: Palette, colors: Colors) => {
    const octx = off.getContext('2d')
    const o = c.getContext('2d')
    if (!octx || !o) return
    const w = off.width,
      h = off.height,
      P = GL_PALS[pal]
    octx.fillStyle = colors.ink
    octx.fillRect(0, 0, w, h)
    const blobs: [string, number, number, number][] = [
      [P.d, 0.3, 0.35, 0.34],
      [colors.bg, 0.7, 0.55, 0.4],
      [P.b, 0.45, 0.8, 0.3],
    ]
    blobs.forEach((b, i) => {
      const x = (b[1] + Math.sin(t * 0.5 + i * 2) * 0.18) * w,
        y = (b[2] + Math.cos(t * 0.4 + i) * 0.14) * h,
        r = b[3] * w
      const g = octx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, b[0])
      g.addColorStop(1, 'rgba(0,0,0,0)')
      octx.fillStyle = g
      octx.fillRect(0, 0, w, h)
    })
    const sw = Math.max(14, Math.round(w / 22))
    o.clearRect(0, 0, w, h)
    for (let x = 0; x < w; x += sw) {
      const cx = x + sw / 2,
        shift = (cx - w / 2) * 0.55
      o.save()
      o.beginPath()
      o.rect(x, 0, sw - 1, h)
      o.clip()
      o.translate(cx, h / 2)
      o.scale(1.5, 1)
      o.translate(-cx - shift * 0.3 + Math.sin(t * 0.4) * 6, -h / 2)
      o.drawImage(off, 0, 0)
      o.restore()
      const gr = o.createLinearGradient(x, 0, x + sw, 0)
      gr.addColorStop(0, 'rgba(255,255,255,.22)')
      gr.addColorStop(0.5, 'rgba(255,255,255,0)')
      gr.addColorStop(1, 'rgba(0,0,0,.28)')
      o.fillStyle = gr
      o.fillRect(x, 0, sw - 1, h)
    }
  }
  return { size, draw }
}
