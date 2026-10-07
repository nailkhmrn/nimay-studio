import { $, $$, reducedMotion, type Cleanup } from '@/lib/effects/util'

/* Sayaçlı yükleme perdesi. "Açılışı tekrar oynat" düğmesi yayından önce kalkacak (CLAUDE.md). */
export function loader(): Cleanup {
  const el = $('#loader'),
    num = $('#lnum'),
    h1 = $('.hm-bl h1'),
    replay = $('#replay')
  if (!el || !num || !h1) return () => {}

  const timers: number[] = []
  let raf = 0
  const clear = () => {
    cancelAnimationFrame(raf)
    timers.splice(0).forEach(clearTimeout)
  }

  const finish = () => {
    num.textContent = '100'
    el.classList.add('done')
    timers.push(window.setTimeout(() => h1.classList.add('in'), 350))
    timers.push(
      window.setTimeout(() => {
        el.classList.add('gone')
        el.style.display = 'none'
      }, 1100),
    )
  }

  const run = () => {
    clear()
    el.className = ''
    el.style.display = 'block'
    $$('.hero .ln').forEach((l) => (l.parentNode as HTMLElement).classList.remove('in'))
    if (reducedMotion()) {
      finish()
      return
    }
    const t0 = performance.now(),
      dur = 2200
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur),
        e = k < 0.6 ? (k / 0.6) * 0.55 : 0.55 + ((k - 0.6) / 0.4) * 0.45
      num.textContent = String(Math.round(e * 100))
      if (k < 1) raf = requestAnimationFrame(step)
      else finish()
    }
    step(t0)
  }

  const onReplay = () => {
    window.scrollTo(0, 0)
    run()
  }
  replay?.addEventListener('click', onReplay)
  run()

  return () => {
    clear()
    replay?.removeEventListener('click', onReplay)
  }
}
