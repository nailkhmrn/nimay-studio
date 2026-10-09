import type { Cleanup } from '@/lib/effects/util'

/* Fare konumu: imleç halkası, hero ve önizleme ortak kullanır. */
export const pointer = { x: 0, y: 0 }

export function trackPointer(): Cleanup {
  pointer.x = innerWidth / 2
  pointer.y = innerHeight / 2
  const move = (e: PointerEvent) => {
    pointer.x = e.clientX
    pointer.y = e.clientY
  }
  addEventListener('pointermove', move)
  return () => removeEventListener('pointermove', move)
}
