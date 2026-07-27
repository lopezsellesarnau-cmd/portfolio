'use client'

/**
 * Generador de plantas 100% procedural, en cuadraditos — portado tal cual
 * desde StackD (components/dot-tree.tsx). Nada de fotos: cada proyecto del
 * portfolio recibe una `seed` distinta y sale una planta distinta, con la
 * misma brisa animada. Es el único motivo visual del sitio — plantas, nada
 * de iconos genéricos.
 */

import { useEffect, useRef } from 'react'

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CELL = 7
const DOT = 4.2

function buildPlant(seed: number, len = 430, depth = 5, growAngle = 2.85) {
  const rand = mulberry32(seed)
  const cells = new Map<string, number>()
  const add = (cx: number, cy: number) => {
    const k = `${cx},${cy}`
    const d = Math.hypot(cx * CELL, cy * CELL)
    const prev = cells.get(k)
    if (prev === undefined || d > prev) cells.set(k, d)
  }

  function stroke(x1: number, y1: number, x2: number, y2: number, w: number) {
    const dist = Math.hypot(x2 - x1, y2 - y1)
    if (dist < 0.001) return
    const steps = Math.max(2, Math.round(dist / (CELL * 0.7)))
    const px = -(y2 - y1) / dist
    const py = (x2 - x1) / dist
    const half = (w - 1) / 2
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const bx = x1 + (x2 - x1) * t
      const by = y1 + (y2 - y1) * t
      for (let k = -half; k <= half; k += 1) {
        add(Math.round((bx + px * k * CELL) / CELL), Math.round((by + py * k * CELL) / CELL))
      }
    }
  }

  function cluster(x: number, y: number, radius: number, density: number) {
    const c0 = Math.round(x / CELL)
    const r0 = Math.round(y / CELL)
    const rc = Math.ceil(radius / CELL)
    for (let i = -rc; i <= rc; i++) {
      for (let j = -rc; j <= rc; j++) {
        const d = Math.hypot(i * CELL, j * CELL) / radius
        if (d > 1) continue
        const p = Math.pow(1 - d, 1.5) * density
        if (rand() < p) add(c0 + i, r0 + j)
      }
    }
  }

  function grow(x: number, y: number, angle: number, len: number, depth: number, width: number) {
    if (depth <= 0 || len < CELL * 1.5) return
    const segs = Math.max(3, Math.round(len / (CELL * 2.6)))
    const segLen = len / segs
    let cx = x
    let cy = y
    let a = angle
    const curve = (rand() - 0.5) * 0.05 - 0.03

    for (let i = 0; i < segs; i++) {
      a += curve + (rand() - 0.5) * 0.1
      const nx = cx + Math.cos(a) * segLen
      const ny = cy + Math.sin(a) * segLen
      const w = Math.max(1, Math.round(width * (1 - (i / segs) * 0.4)))
      stroke(cx, cy, nx, ny, w)
      cx = nx
      cy = ny

      if (depth > 1 && i > 0 && rand() < 0.32) {
        const lado = rand() < 0.5 ? -1 : 1
        grow(cx, cy, a + lado * (0.35 + rand() * 0.5), len * (0.34 + rand() * 0.34), depth - 1, Math.max(1, width - 1))
      }
    }

    if (depth <= 2) {
      if (rand() < 0.26) cluster(cx, cy, CELL * (3.4 + rand() * 1.5), 0.95)
      else cluster(cx, cy, CELL * (1.9 + rand() * 1.0), 0.85)
    }
  }

  grow(0, 0, growAngle, len, depth, 3)
  return cells
}

function bounds(cells: Map<string, number>) {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  cells.forEach((_v, key) => {
    const i = key.indexOf(',')
    const cx = +key.slice(0, i)
    const cy = +key.slice(i + 1)
    if (cx < minX) minX = cx
    if (cx > maxX) maxX = cx
    if (cy < minY) minY = cy
    if (cy > maxY) maxY = cy
  })
  return { minX, maxX, minY, maxY, w: (maxX - minX + 1) * CELL, h: (maxY - minY + 1) * CELL }
}

/**
 * `anchor` decide cómo se ancla la planta en el lienzo:
 *  · 'corner-tr' — esquina superior derecha (hero desktop)
 *  · 'center'    — centrada (banda móvil)
 *  · 'bottom'    — raíz abajo, crece hacia arriba (plantas verticales de las tarjetas)
 *
 * `growAngle` orienta el tallo: 2.85 barre en apaisado (hero); ~-1.55 crece
 * casi vertical, que es lo que piden las columnas estrechas de las carpetas.
 */
export function PlantCanvas({
  seed,
  len = 430,
  depth = 5,
  anchor = 'center',
  growAngle = 2.85,
  fit = 'contain',
  color = '#151412',
  className,
}: {
  seed: number
  len?: number
  depth?: number
  anchor?: 'corner-tr' | 'center' | 'bottom'
  growAngle?: number
  /** 'contain' encaja dentro; 'cover' llena la caja recortando lo que sobra —
   *  es lo que quita el espacio muerto arriba/abajo del hero y las bandas. */
  fit?: 'contain' | 'cover'
  color?: string
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const cells = buildPlant(seed, len, depth, growAngle)
    const b = bounds(cells)
    const maxDist = Math.max(...Array.from(cells.values()))
    const puntos = Array.from(cells.entries()).map(([key, dist]) => {
      const i = key.indexOf(',')
      const w = Math.pow(dist / maxDist, 1.3)
      return { cx: +key.slice(0, i), cy: +key.slice(i + 1), w }
    })

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function draw(tiempo = 0) {
      const rect = canvas!.getBoundingClientRect()
      const W = rect.width
      const H = rect.height
      if (W < 10 || H < 10) return

      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, W, H)

      const pad = anchor === 'corner-tr' ? 2 : 6
      const fitContain = Math.min((W - pad * 2) / b.w, (H - pad * 2) / b.h)
      const fitCover = Math.max((W - pad * 2) / b.w, (H - pad * 2) / b.h)
      // 'cover' llena la caja (recorta lo que sobra) — quita el hueco muerto
      // del hero y de las bandas horizontales. 'bottom' amplía para que las
      // plantas verticales no queden diminutas. Por defecto no se amplía.
      const scale =
        fit === 'cover' ? Math.min(4, fitCover) : anchor === 'bottom' ? Math.min(3.4, fitContain) : Math.min(1, fitContain)
      const cs = CELL * scale
      const ds = Math.min(DOT * scale, cs * 0.62)
      const off = (cs - ds) / 2

      // X: la esquina ancla a la derecha; el resto centra horizontalmente.
      const offX = anchor === 'corner-tr' ? W - pad - b.maxX * cs : (W - b.w * scale) / 2 - b.minX * cs
      // Y: la esquina ancla arriba; 'bottom' apoya la raíz (maxY) en el suelo
      // del lienzo — una planta crece desde abajo, no flotando; el resto centra.
      const offY =
        anchor === 'corner-tr'
          ? pad - b.minY * cs
          : anchor === 'bottom'
            ? H - pad - b.maxY * cs
            : (H - b.h * scale) / 2 - b.minY * cs

      const t1 = tiempo * 0.00035
      const t2 = tiempo * 0.00022
      const amp = 7 * scale

      ctx!.fillStyle = color
      for (const p of puntos) {
        let x = p.cx * cs + offX + off
        let y = p.cy * cs + offY + off

        if (!sinMovimiento) {
          const fase = p.cy * 0.09 + p.cx * 0.03
          const vaiven = Math.sin(t1 + fase) * 0.75 + Math.sin(t2 + fase * 1.7) * 0.25
          x += Math.round(vaiven * amp * p.w)
          y += Math.round(Math.sin(t2 * 1.3 + fase) * amp * 0.28 * p.w)
        }

        if (x < -cs || x > W + cs || y < -cs || y > H + cs) continue
        ctx!.fillRect(x, y, ds, ds)
      }
    }

    let t: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(t)
      t = setTimeout(() => draw(performance.now()), 100)
    })
    ro.observe(canvas)

    let raf = 0
    if (sinMovimiento) {
      draw()
    } else {
      const bucle = (ts: number) => {
        draw(ts)
        raf = requestAnimationFrame(bucle)
      }
      raf = requestAnimationFrame(bucle)
    }

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [seed, len, depth, anchor, growAngle, fit, color])

  return <canvas ref={ref} aria-hidden className={className} />
}
