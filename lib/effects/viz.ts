import { $$, reducedMotion, type Cleanup } from './util'

interface Viz {
  el: HTMLElement
  n: number
  i: number
  last: number
  items: HTMLElement[]
  vis: boolean
}

function step(v: Viz, i: number) {
  v.items.forEach((it) => it.classList.toggle('on', +(it.dataset.at ?? 0) < i))
  v.el.style.setProperty('--p', String(Math.min(1, i / v.n)))
}

/* Süreç görselleri: ekrana girince adım adım oynar. Ekran dışında döngü durur. */
export function viz(): Cleanup {
  const now0 = performance.now()
  const vizs: Viz[] = $$('.viz').map((el, k) => ({
    el,
    n: +(el.dataset.n ?? 0),
    i: 0,
    last: now0 + k * 320,
    items: $$('[data-at]', el),
    vis: false,
  }))
  if (!vizs.length) return () => {}

  if (reducedMotion()) {
    vizs.forEach((v) => step(v, v.n + 3))
    return () => {}
  }

  let raf = 0
  let running = false
  const loop = (now: number) => {
    vizs.forEach((v) => {
      if (v.vis && now - v.last > 1300) {
        v.last = now
        v.i = (v.i + 1) % (v.n + 3)
        step(v, v.i)
      }
    })
    if (vizs.some((v) => v.vis)) raf = requestAnimationFrame(loop)
    else running = false
  }
  const ios = vizs.map((v) => {
    const io = new IntersectionObserver((e) => {
      v.vis = e[0]?.isIntersecting ?? false
      if (v.vis && !running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    })
    io.observe(v.el)
    return io
  })
  return () => {
    cancelAnimationFrame(raf)
    ios.forEach((io) => io.disconnect())
  }
}
