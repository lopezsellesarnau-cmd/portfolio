'use client'

/**
 * Piezas compartidas de los diagramas técnicos — misma gramática que el
 * árbol de decisión de Aithority (components/lab/classification-tree.tsx):
 * codos rectos, el nodo es la referencia, la arista es la decisión, el color
 * de la línea codifica el desenlace. Aquí se factoriza para reusarla en un
 * diagrama distinto por proyecto — cada uno cuenta lo que ese producto
 * decide de verdad, no una plantilla repetida con otro texto.
 */

import { useEffect, useRef, useState } from 'react'

export const INK = '#151412'
export const TERRA = '#C1663D'
export const OK = '#3F7A4E'
export const LINE = 'rgba(21,20,18,0.6)'
export const FAINT = 'rgba(21,20,18,0.26)'
export const MONO = 'var(--font-mono, monospace)'

export const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  if (Math.abs(y1 - y2) < 0.5) return `M ${x1} ${y1} H ${x2}`
  const mx = x1 + (x2 - x1) * 0.42
  return `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`
}

export type Tono = 'ruta' | 'ok' | 'pendiente' | 'descartada'
export const COLOR: Record<Tono, string> = { ruta: LINE, ok: INK, pendiente: TERRA, descartada: FAINT }

export function Rama({ d, delay, tono = 'ruta' }: { d: string; delay: number; tono?: Tono }) {
  if (tono === 'descartada') {
    return (
      <path d={d} className="tree-fade" fill="none" stroke={FAINT} strokeWidth="1.1" strokeDasharray="3 4" style={{ animationDelay: `${delay}ms` }} />
    )
  }
  return (
    <path
      d={d}
      className="tree-line"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1}
      fill="none"
      stroke={COLOR[tono]}
      strokeWidth={tono === 'pendiente' ? 1.7 : 1.4}
      style={{ animationDelay: `${delay}ms` }}
    />
  )
}

export function Nodo({ x, y, label, sub, delay, tono = 'ruta' }: { x: number; y: number; label: string; sub?: string; delay: number; tono?: Tono }) {
  const dim = tono === 'descartada'
  const color = dim ? FAINT : tono === 'pendiente' ? TERRA : INK
  return (
    <g className="tree-node" style={{ animationDelay: `${delay}ms` }}>
      <rect x={x - 11} y={y - 3.5} width={7} height={7} fill={dim ? 'none' : color} stroke={color} strokeWidth="1.2" />
      <text x={x} y={y + 4} fill={color} fontSize="11.5" letterSpacing="0.05em" style={{ fontFamily: MONO }}>
        {label}
      </text>
      {sub && (
        <text x={x} y={y + 18} fill={dim ? FAINT : 'rgba(21,20,18,0.45)'} fontSize="9.5" letterSpacing="0.07em" style={{ fontFamily: MONO }}>
          {sub}
        </text>
      )}
    </g>
  )
}

export function Arista({ x, y, label, delay, dim = false }: { x: number; y: number; label: string; delay: number; dim?: boolean }) {
  return (
    <text
      className="tree-node"
      x={x}
      y={y - 7}
      textAnchor="end"
      fill={dim ? FAINT : 'rgba(21,20,18,0.5)'}
      fontSize="9"
      letterSpacing="0.14em"
      style={{ fontFamily: MONO, animationDelay: `${delay}ms` }}
    >
      {label}
    </text>
  )
}

export function Bloques({ x, y, filled, max = 6, delay }: { x: number; y: number; filled: number; max?: number; delay: number }) {
  return (
    <g>
      {Array.from({ length: max }).map((_, i) => (
        <rect
          key={i}
          className="tree-node"
          x={x + i * 12}
          y={y - 4.5}
          width={9}
          height={9}
          fill={i < filled ? INK : 'none'}
          stroke={i < filled ? INK : 'rgba(21,20,18,0.28)'}
          strokeWidth="1"
          style={{ animationDelay: `${delay + i * 55}ms` }}
        />
      ))}
    </g>
  )
}

/** Dispara `.tree-live` cuando el diagrama entra en el viewport. */
export function useLiveOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [live, setLive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, live }
}

export type Metrica = { k: string; v: string; acento?: boolean }
export type Barra = { k: string; v: number; max: number }
export type Parametro = { k: string; v: string; fill: number }

/** Cabecera + panel de params (izq) + panel de readout (der) — el marco que
 *  comparten los tres diagramas, cada uno con su SVG propio en el centro. */
export function DiagramShell({
  titulo,
  contexto,
  estado,
  params,
  metricas,
  barras,
  nota,
  children,
}: {
  titulo: string
  contexto: string
  estado: string
  params: Parametro[]
  metricas: Metrica[]
  barras: Barra[]
  nota: string
  children: React.ReactNode
}) {
  const { ref, live } = useLiveOnView<HTMLDivElement>()

  return (
    <div ref={ref} className={live ? 'tree-live' : ''}>
      <div className="border border-line bg-bg">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">
          <span>{titulo}</span>
          <span className="hidden sm:inline">{contexto}</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
            {estado}
          </span>
        </div>

        <div className="grid lg:grid-cols-[130px_1fr_180px]">
          <div className="hidden border-r border-line p-4 lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">Params</p>
            <div className="mt-3.5 space-y-3">
              {params.map((p, i) => (
                <div key={p.k}>
                  <div className="flex items-baseline justify-between font-mono text-[10.5px] tracking-[0.06em] text-fg-muted">
                    <span>{p.k}</span>
                    <span className="text-ink">{p.v}</span>
                  </div>
                  <div className="mt-1.5 h-[3px] w-full bg-hair">
                    <div className="meter-fill h-full bg-ink" style={{ width: `${p.fill * 100}%`, animationDelay: `${900 + i * 90}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto p-4">{children}</div>

          <div className="border-t border-line p-4 lg:border-l lg:border-t-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">Readout</p>
            <div className="mt-3.5 space-y-3">
              {metricas.map((m) => (
                <div key={m.k} className="flex items-baseline justify-between gap-3 font-mono text-[10.5px] tracking-[0.06em]">
                  <span className="text-fg-muted">{m.k}</span>
                  <span style={{ color: m.acento ? TERRA : INK }}>{m.v}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-3 border-t border-hair pt-3.5">
              {barras.map((b, i) => {
                const pct = (b.v / b.max) * 100
                return (
                  <div key={b.k}>
                    <div className="flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-[0.08em] text-fg-dim">
                      <span>{b.k}</span>
                      <span className="tabular-nums text-ink">
                        {b.v} <span className="text-fg-faint">/ {b.max}</span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-[3px] w-full bg-hair">
                      <div className="meter-fill h-full bg-ink" style={{ width: `${pct}%`, animationDelay: `${1600 + i * 150}ms` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 font-mono text-[10px] leading-relaxed text-fg-dim">{nota}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
