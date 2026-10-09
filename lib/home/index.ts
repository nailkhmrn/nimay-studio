import { browserFrames } from '@/lib/effects/mocks'
import { navTone } from '@/lib/effects/navTone'
import { reveal } from '@/lib/effects/reveal'
import { scrollTop } from '@/lib/effects/scrollTop'
import { viz } from '@/lib/effects/viz'
import { type Cleanup } from '@/lib/effects/util'
import { cursor, magneticHome } from './cursor'
import { loader } from './loader'
import { trackPointer } from './pointer'

/* Ana sayfanın betiği (taslaktaki index.html içindeki betik). Yükleme perdesi ve açılışlar hemen başlar;
   ağır grafikler (WebGL, canvas) ayrı parça olarak boşta yüklenir, perde sürerken hazır olur. */
export function homeEffects(): Cleanup {
  const offs: Cleanup[] = []
  let disposed = false

  offs.push(trackPointer(), scrollTop(), reveal(0.18), navTone('main section'), loader())

  const idle = (fn: () => void) => {
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(fn, { timeout: 600 })
      return () => cancelIdleCallback(id)
    }
    const id = window.setTimeout(fn, 200)
    return () => clearTimeout(id)
  }
  offs.push(
    idle(() => {
      if (disposed) return
      offs.push(cursor(), magneticHome(), browserFrames({ x: 14, y: 10 }), viz())
    }),
    idle(() => {
      if (disposed) return
      import('./graphics').then((m) => {
        if (disposed) return
        offs.push(m.graphics())
      })
    }),
  )

  return () => {
    disposed = true
    offs.splice(0).forEach((o) => o())
  }
}
