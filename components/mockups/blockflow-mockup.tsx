'use client'

/**
 * BlockFlow — el producto es la transformación "llamada hablada → ticket
 * estructurado", así que el mockup la enseña literal: a la izquierda la
 * llamada en curso (onda + transcripción), a la derecha el ticket que el
 * agente va rellenando solo. No un árbol: el valor aquí es la extracción.
 */

import { MockupFrame, OK, TERRA, Chip } from './frame'

// Alturas deterministas (nada de Math.random en render → sin desajuste de
// hidratación); la animación de la onda es puramente CSS.
// Redondeado a entero a propósito: sin(i) da decimales que difieren en el
// último dígito entre Node (SSR) y el navegador → mismatch de hidratación.
const BARS = Array.from({ length: 32 }, (_, i) => Math.round(3 + Math.abs(Math.sin(i * 1.7)) * 15))

const TRANSCRIPT = [
  ['CALLER', 'Hi, there\'s a water leak in the garage, dripping from the ceiling…'],
  ['AGENT', 'Do you know which floor the water is coming from?'],
  ['CALLER', 'The first floor, I think — it\'s coming down fast.'],
]

const FIELDS = [
  ['Property', 'Muntaner 88 · Garage -1'],
  ['Type', 'Water leak'],
  ['Urgency', 'High'],
  ['Summary', 'Water from 1st floor into the garage. Needs shut-off + plumber.'],
]

export function BlockFlowMockup() {
  return (
    <MockupFrame title="Voice agent · live" context="call → ticket" status="status: ticket created" tone={OK}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Llamada */}
        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg-dim">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8433F] pulse-dot" aria-hidden />
              Incoming call
            </span>
            <span className="tabular-nums">00:47</span>
          </div>

          <div className="flex h-[42px] items-center gap-[2px] px-3 py-2" aria-hidden>
            {BARS.map((h, i) => (
              <span
                key={i}
                className="wave-bar w-[3px] shrink-0 bg-[rgba(21,20,18,0.55)]"
                style={{ height: `${h}px`, animationDelay: `${i * 55}ms` }}
              />
            ))}
          </div>

          <div className="space-y-2 border-t border-hair px-3 py-3">
            {TRANSCRIPT.map(([who, text], i) => (
              <div key={i} className="tree-node" style={{ animationDelay: `${400 + i * 500}ms` }}>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">{who}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-fg-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket */}
        <div className="border border-ink bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink">
            <span>Ticket #4471</span>
            <Chip label="Auto" tone={OK} />
          </div>
          <div className="divide-y divide-hair">
            {FIELDS.map(([k, v], i) => (
              <div key={k} className="tree-node px-3 py-2" style={{ animationDelay: `${900 + i * 350}ms` }}>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">{k}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-hair px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-dim">No human intervention</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: TERRA }}>
              4 / 4 fields
            </span>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
