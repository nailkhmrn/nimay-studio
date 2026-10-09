import { $, $$, reducedMotion, type Cleanup } from '@/lib/effects/util'
import { currentPalette, PALETTE_EVENT } from '@/lib/palette'
import { createGlass, fit, halftoneTile, readColors, type Colors } from './canvas'
import { createHero } from './hero'

/* Ana sayfanın grafikleri: WebGL hero, yarı ton, oluklu cam, SEO listesi ve takvim.
   Ayrı bir parça olarak, yükleme perdesi sürerken boşta yüklenir. Ekran dışındaki efektler çizilmez ve
   hiçbiri görünür değilken requestAnimationFrame döngüsü çalışmaz. */
export function graphics(): Cleanup {
  const RM = reducedMotion()
  const offs: Cleanup[] = []
  let disposed = false
  const on = <K extends keyof WindowEventMap>(t: K, fn: (e: WindowEventMap[K]) => void) => {
    addEventListener(t, fn)
    offs.push(() => removeEventListener(t, fn))
  }

  const heroEl = $('#hero')
  const glc = $<HTMLCanvasElement>('#gl')
  const fallback = $('#hero-fallback')
  const tileC = $<HTMLCanvasElement>('#c-halftone')
  const glassC = $<HTMLCanvasElement>('#c-glass')
  const seoEl = $('#seo')
  const daysEl = $('#days')
  if (!heroEl || !glc || !tileC || !glassC || !seoEl || !daysEl) return () => {}

  /* hero: WebGL yoksa ya da bağlam kaybolursa durağan yedek görüntü gösterilir */
  const showFallback = () => {
    if (fallback) fallback.hidden = false
    glc.style.display = 'none'
  }
  const hero = createHero(glc, showFallback)
  if (!hero.ok) showFallback()

  /* canvas efektleri */
  let colors: Colors = readColors()
  const glass = createGlass(glassC)
  const drawStatic = () => {
    halftoneTile(tileC, 1, colors.acc)
    glass.draw(1, currentPalette(), colors)
  }
  fit(tileC)
  drawStatic()

  const seoRows = $$('div', seoEl)
  const dayCells = $$('span', daysEl)
  let seoI = 0,
    seoLast = 0,
    dayN = 0,
    dayLast = 0

  /* hareket azaltılmışsa her şey son hâlinde durur */
  if (RM) {
    seoRows.forEach((r) => r.classList.add('ok'))
    dayCells.forEach((c) => c.classList.add('f'))
    if (hero.ok) hero.frame(performance.now())
  }

  /* ana döngü: yalnızca görünür olan efektleri çizer */
  const vis = { hero: true, tile: false, glass: false, seo: false, days: false }
  let raf = 0,
    running = false
  const t0 = performance.now()
  const anyVisible = () => vis.hero || vis.tile || vis.glass || vis.seo || vis.days
  const frame = (now: number) => {
    const t = ((now - t0) / 1000) * 0.6
    if (hero.ok && vis.hero) hero.frame(now)
    if (vis.tile) halftoneTile(tileC, t, colors.acc)
    if (vis.glass) glass.draw(t, currentPalette(), colors)
    if (vis.seo && now - seoLast > 1000) {
      seoLast = now
      seoRows.forEach((r, i) => r.classList.toggle('ok', i <= seoI))
      seoI = (seoI + 1) % (seoRows.length + 2)
      if (seoI === 0) seoRows.forEach((r) => r.classList.remove('ok'))
    }
    if (vis.days && now - dayLast > 520) {
      dayLast = now
      dayCells.forEach((c, i) => c.classList.toggle('f', i < dayN))
      dayN = (dayN + 1) % 16
    }
    if (!disposed && anyVisible()) raf = requestAnimationFrame(frame)
    else running = false
  }
  const kick = () => {
    if (disposed || RM || running || !anyVisible()) return
    running = true
    raf = requestAnimationFrame(frame)
  }
  const watch = (el: Element, key: keyof typeof vis) => {
    const io = new IntersectionObserver((e) => {
      vis[key] = e[0]?.isIntersecting ?? false
      kick()
    })
    io.observe(el)
    offs.push(() => io.disconnect())
  }
  watch(heroEl, 'hero')
  watch(tileC, 'tile')
  watch(glassC, 'glass')
  watch(seoEl, 'seo')
  watch(daysEl, 'days')
  offs.push(() => {
    disposed = true
    cancelAnimationFrame(raf)
  })

  /* yeniden boyutlandırma ve palet değişimi */
  const redraw = () => {
    colors = readColors()
    drawStatic()
    if (RM && hero.ok) hero.frame(performance.now())
  }
  on('resize', () => {
    fit(tileC)
    glass.size()
    if (hero.ok) hero.resize()
    drawStatic()
    if (RM && hero.ok) hero.frame(performance.now())
  })
  addEventListener(PALETTE_EVENT, redraw)
  offs.push(() => removeEventListener(PALETTE_EVENT, redraw))
  offs.push(() => hero.destroy())

  return () => offs.splice(0).forEach((o) => o())
}
