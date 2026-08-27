'use client'

/**
 * Chrome compartido de los mockups — la barra de cabecera tipo "instrumento"
 * (título · contexto · estado con punto) que ya usa el /lab de Aithority. Lo
 * que cambia de un proyecto a otro es el CUERPO: cada uno lleva un mockup que
 * de verdad lo representa (un árbol de decisión no le pega a todos), no el
 * mismo diagrama con el texto cambiado.
 *
 * `.tree-live` arranca las animaciones al entrar en viewport — las reusan los
 * medidores, las barras que se rellenan y los trazos que se dibujan.
 */

import { useEffect, useRef, useState } from 'react'

export const INK = '#111111'
export const TERRA = '#B8433F'
export const OK = '#3F7A4E'
export const MONO = 'var(--font-mono, monospace)'

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
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, live }
}

export function MockupFrame({
  title,
  context,
  status,
  tone = TERRA,
  children,
}: {
  title: string
  context: string
  status: string
  tone?: string
  children: React.ReactNode
}) {
  const { ref, live } = useLiveOnView<HTMLDivElement>()
  return (
    <div ref={ref} className={live ? 'tree-live' : ''}>
      <div className="overflow-hidden rounded-[24px] border border-line bg-bg">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-muted">
          <span>{title}</span>
          <span className="hidden text-fg-dim sm:inline">{context}</span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: tone }} aria-hidden />
            {status}
          </span>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>
  )
}

/** Barra de medidor que se rellena al entrar en viewport (usa .tree-live). */
export function Meter({ pct, tone = INK, delay = 0 }: { pct: number; tone?: string; delay?: number }) {
  return (
    <div className="h-[3px] w-full bg-hair">
      <div className="meter-fill h-full" style={{ width: `${pct}%`, backgroundColor: tone, animationDelay: `${delay}ms` }} />
    </div>
  )
}

/** Rejilla de bloques `hecho / total` — la hoja de servidores de la referencia. */
export function BlockGrid({ filled, max, delay = 0 }: { filled: number; max: number; delay?: number }) {
  return (
    <span className="flex shrink-0 flex-wrap gap-[3px]" aria-hidden>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="tree-node h-[9px] w-[9px]"
          style={
            i < filled
              ? { backgroundColor: INK, animationDelay: `${delay + i * 45}ms` }
              : { border: '1px solid rgba(17,17,17,0.28)', animationDelay: `${delay + i * 45}ms` }
          }
        />
      ))}
    </span>
  )
}

export function Chip({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-[6px] border px-1.5 py-[2px] font-mono text-[9px] uppercase tracking-[0.08em]"
      style={{ borderColor: tone, color: tone }}
    >
      <span className="h-1 w-1" style={{ backgroundColor: tone }} aria-hidden />
      {label}
    </span>
  )
}
