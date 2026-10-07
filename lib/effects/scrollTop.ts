import type { Cleanup } from './util'

/* Sayfa açılışında en üste dön (geçişte eski kaydırma konumu kalmasın). Taslaktaki davranış.
   Canlı sitede eski bağlantılar # ile geldiği için adres sonunda geçerli bir # varsa o bölüme gidilir. */
export function scrollTop(): Cleanup {
  try {
    history.scrollRestoration = 'manual'
  } catch {}
  const timers: number[] = []
  const hashTarget = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    return id ? document.getElementById(id) : null;
  };
  const top = () => {
    const target = hashTarget();
    if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
    try {
      scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } catch {
      scrollTo(0, 0)
    }
    const n = document.querySelector('.nav')
    if (n && n.scrollIntoView) {
      try {
        n.scrollIntoView({ block: 'start', behavior: 'instant' })
      } catch {}
    }
  }
  const onLoad = () => {
    top()
    timers.push(window.setTimeout(top, 120))
  }
  top()
  addEventListener('load', onLoad)
  addEventListener('pageshow', top)
  return () => {
    removeEventListener('load', onLoad)
    removeEventListener('pageshow', top)
    timers.forEach(clearTimeout)
  }
}
