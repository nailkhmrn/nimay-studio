export type Cleanup = () => void

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s)
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) =>
  Array.from(r.querySelectorAll<T>(s))
