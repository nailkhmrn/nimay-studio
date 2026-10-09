import { currentPalette, type Palette } from '@/lib/palette'
import { pointer } from './pointer'
import { FS, VS } from './shader'

/* WebGL ile çizilen akışkan form (hero). Taslaktaki kod olduğu gibi taşındı;
   döngüyü ana döngü (index.ts) çağırır, ekran dışındayken çağırmaz. */

export const GL_PALS: Record<Palette, { bg: string; a: string; b: string; c: string; d: string }> = {
  kobalt: { bg: '#2B22FF', a: '#FFFFFF', b: '#8E8CFF', c: '#07072E', d: '#D8FF3C' },
  gece: { bg: '#0B0B0E', a: '#FFFFFF', b: '#8C84B8', c: '#050507', d: '#B9A6FF' },
}

export function hex(h: string): [number, number, number] {
  h = h.replace('#', '')
  return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]
}

export interface Hero {
  ok: boolean
  frame: (now: number) => void
  resize: () => void
  destroy: () => void
}

export function createHero(canvas: HTMLCanvasElement, onLost: () => void): Hero {
  const none: Hero = { ok: false, frame() {}, resize() {}, destroy() {} }
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
  if (!gl) return none

  const sh = (t: number, s: string) => {
    const o = gl.createShader(t)
    if (!o) return null
    gl.shaderSource(o, s)
    gl.compileShader(o)
    if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(o))
      return null
    }
    return o
  }
  const v = sh(gl.VERTEX_SHADER, VS)
  const f = sh(gl.FRAGMENT_SHADER, FS)
  if (!v || !f) return none
  const prog = gl.createProgram()
  if (!prog) return none
  gl.attachShader(prog, v)
  gl.attachShader(prog, f)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return none
  gl.useProgram(prog)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const U: Record<string, WebGLUniformLocation | null> = {}
  ;['uRes', 'uT', 'uM', 'uS', 'uA', 'uB', 'uC', 'uD'].forEach((n) => {
    U[n] = gl.getUniformLocation(prog, n)
  })

  const resize = () => {
    const r = canvas.getBoundingClientRect(),
      dpr = Math.min(devicePixelRatio || 1, 2)
    const s = Math.min(dpr, Math.sqrt(1700000 / (r.width * r.height)))
    canvas.width = Math.max(2, Math.round(r.width * s))
    canvas.height = Math.max(2, Math.round(r.height * s))
    gl.viewport(0, 0, canvas.width, canvas.height)
  }
  resize()

  let gx = 0,
    gy = 0
  let sm = 1
  const tStart = performance.now()
  const frame = (now: number) => {
    const r = canvas.getBoundingClientRect()
    const tx = ((pointer.x - r.left) / r.width - 0.5) * (r.width / r.height),
      ty = -((pointer.y - r.top) / r.height - 0.5)
    const k = Math.min(Math.max(tx, -0.8), 0.8),
      l = Math.min(Math.max(ty, -0.45), 0.45)
    gx += (k - gx) * 0.07
    gy += (l - gy) * 0.07
    const sc = Math.max(0, Math.min(1, scrollY / innerHeight))
    const target = 1 - sc * 0.35
    sm += (target - sm) * 0.1
    const P = GL_PALS[currentPalette()],
      A = hex(P.a),
      B = hex(P.b),
      C = hex(P.c),
      D = hex(P.d)
    const u = (n: string) => U[n] ?? null
    gl.uniform2f(u('uRes'), canvas.width, canvas.height)
    gl.uniform1f(u('uT'), ((now - tStart) / 1000) * 0.65)
    gl.uniform2f(u('uM'), gx * 0.55, gy * 0.55)
    gl.uniform1f(u('uS'), Math.min(1, (r.width / r.height) * 0.62) * 1.0 * sm * (r.height > r.width ? 1.2 : 1))
    gl.uniform3f(u('uA'), ...A)
    gl.uniform3f(u('uB'), ...B)
    gl.uniform3f(u('uC'), ...C)
    gl.uniform3f(u('uD'), ...D)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const lost = (e: Event) => {
    e.preventDefault()
    onLost()
  }
  canvas.addEventListener('webglcontextlost', lost)

  return {
    ok: true,
    frame,
    resize,
    destroy: () => canvas.removeEventListener('webglcontextlost', lost),
  }
}
