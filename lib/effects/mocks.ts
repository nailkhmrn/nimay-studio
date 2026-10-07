import { $, $$, reducedMotion, type Cleanup } from './util'

/* Tarayıcı çerçevesi: fareyle hafif eğilir. Çerçevedeki ekran görüntüsü kendi boyutunda çizildiği için ölçek gerekmez.
   Eğim çarpanları iç sayfalarda 10 ve 7, ana sayfada 14 ve 10 (taslaktaki değerler). */
export function browserFrames(tilt: { x: number; y: number } = { x: 10, y: 7 }): Cleanup {
  const offs: Cleanup[] = []
  if (!reducedMotion()) {
    $$('.stage').forEach((st) => {
      const br = $('.browser', st)
      if (!br) return
      const move = (e: PointerEvent) => {
        const r = st.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5,
          y = (e.clientY - r.top) / r.height - 0.5
        br.style.transform = 'rotateY(' + x * tilt.x + 'deg) rotateX(' + -y * tilt.y + 'deg)'
      }
      const leave = () => {
        br.style.transform = ''
      }
      st.addEventListener('pointermove', move)
      st.addEventListener('pointerleave', leave)
      offs.push(() => {
        st.removeEventListener('pointermove', move)
        st.removeEventListener('pointerleave', leave)
      })
    })
  }
  return () => offs.forEach((o) => o())
}
