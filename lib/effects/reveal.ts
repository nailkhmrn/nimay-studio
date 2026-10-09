import { $$, type Cleanup } from './util'

/* Açılış animasyonları: [data-r] ekrana girince "in" sınıfı alır. */
export function reveal(threshold: number): Cleanup {
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    },
    { threshold },
  )
  $$('[data-r]').forEach((n) => io.observe(n))
  return () => io.disconnect()
}
