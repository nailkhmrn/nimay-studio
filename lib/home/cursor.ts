import { $, $$, reducedMotion, type Cleanup } from '@/lib/effects/util'
import { pointer } from './pointer'

/* Özel imleç halkası (yalnızca fare olan cihazlarda) ve iş listesinde çıkan önizleme. */
export function cursor(): Cleanup {
  const ring = $('#ring'),
    peek = $('#peek')
  if (!ring || !peek) return () => {}

  const offs: Cleanup[] = []
  let raf = 0

  /* halka */
  const coarse = matchMedia('(pointer:coarse)').matches
  let rx = pointer.x,
    ry = pointer.y
  if (!coarse) {
    /* halka hedefe ulaşınca döngü durur, fare kıpırdayınca yeniden başlar */
    let ringRunning = false
    const loop = () => {
      rx += (pointer.x - rx) * 0.2
      ry += (pointer.y - ry) * 0.2
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'
      if (Math.abs(pointer.x - rx) < 0.05 && Math.abs(pointer.y - ry) < 0.05) ringRunning = false
      else raf = requestAnimationFrame(loop)
    }
    const wake = () => {
      if (ringRunning) return
      ringRunning = true
      raf = requestAnimationFrame(loop)
    }
    wake()
    addEventListener('pointermove', wake)
    offs.push(() => removeEventListener('pointermove', wake))
    $$('a,button,input,textarea').forEach((n) => {
      const on = () => ring.classList.add('big')
      const off = () => ring.classList.remove('big')
      n.addEventListener('pointerenter', on)
      n.addEventListener('pointerleave', off)
      offs.push(() => {
        n.removeEventListener('pointerenter', on)
        n.removeEventListener('pointerleave', off)
      })
    })
  }

  /* önizleme */
  let px = 0,
    py = 0,
    showing = false,
    praf = 0
  /* önizleme içeriği satırdan okunur: ekran görüntüsü (data-peek-src) ya da taslaktaki taralı "yer ayrıldı" kutusu */
  const nodeFor = (row: HTMLElement) => {
    const src = row.dataset.peekSrc
    if (src) {
      const img = document.createElement('img')
      img.src = src
      img.alt = ''
      return img
    }
    const hatch = document.createElement('div')
    hatch.className = 'hatch mono'
    const label = document.createElement('span')
    label.textContent = row.dataset.peekLabel ?? ''
    hatch.appendChild(label)
    return hatch
  }

  const peekLoop = () => {
    if (!showing) return
    const tx = pointer.x + 30,
      ty = pointer.y - 110,
      pvx = tx - px
    px += (tx - px) * 0.16
    py += (ty - py) * 0.16
    peek.style.transform =
      'translate(' + px + 'px,' + py + 'px) rotate(' + Math.max(-8, Math.min(8, pvx * 0.04)) + 'deg) scale(1)'
    praf = requestAnimationFrame(peekLoop)
  }
  $$('#worklist .row').forEach((row) => {
    const enter = () => {
      peek.innerHTML = ''
      peek.appendChild(nodeFor(row))
      peek.classList.add('on')
      ring.classList.add('big')
      ring.textContent = ''
      if (!showing) {
        showing = true
        praf = requestAnimationFrame(peekLoop)
      }
    }
    const leave = () => {
      peek.classList.remove('on')
      showing = false
      cancelAnimationFrame(praf)
    }
    row.addEventListener('pointerenter', enter)
    row.addEventListener('pointerleave', leave)
    offs.push(() => {
      row.removeEventListener('pointerenter', enter)
      row.removeEventListener('pointerleave', leave)
    })
  })

  return () => {
    cancelAnimationFrame(raf)
    cancelAnimationFrame(praf)
    offs.forEach((o) => o())
  }
}

/* Mıknatıslı gönder düğmesi: fareye doğru kayar. İç sayfalardaki ile aynı koşullar. */
export function magneticHome(): Cleanup {
  const mag = $('#mag')
  if (!mag || reducedMotion() || !matchMedia('(pointer:fine)').matches) return () => {}
  const move = (e: PointerEvent) => {
    const r = mag.getBoundingClientRect(),
      cx = r.left + r.width / 2,
      cy = r.top + r.height / 2,
      dx = e.clientX - cx,
      dy = e.clientY - cy,
      d = Math.hypot(dx, dy)
    if (d < 220) mag.style.transform = 'translate(' + dx * 0.3 + 'px,' + dy * 0.3 + 'px)'
    else mag.style.transform = ''
  }
  document.addEventListener('pointermove', move)
  return () => document.removeEventListener('pointermove', move)
}
