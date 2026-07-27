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
  ['VECINO', 'Hola, hay una fuga de agua en el garaje, cae del techo…'],
  ['AGENTE', '¿Sabe de qué planta viene el agua?'],
  ['VECINO', 'Creo que del primero, está bajando bastante.'],
]

const CAMPOS = [
  ['Propiedad', 'Edif. Muntaner 88 · Garaje -1'],
  ['Tipo', 'Fuga de agua'],
  ['Urgencia', 'Alta'],
  ['Resumen', 'Agua desde 1ª planta al garaje. Requiere corte y fontanero.'],
]

export function BlockFlowMockup() {
  return (
    <MockupFrame title="Agente de voz · en vivo" context="llamada → ticket" status="status: ticket creado" tone={OK}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* Llamada */}
        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg-dim">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C1663D] pulse-dot" aria-hidden />
              Llamada entrante
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
            {TRANSCRIPT.map(([quien, texto], i) => (
              <div key={i} className="tree-node" style={{ animationDelay: `${400 + i * 500}ms` }}>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">{quien}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-fg-muted">{texto}</p>
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
            {CAMPOS.map(([k, v], i) => (
              <div key={k} className="tree-node px-3 py-2" style={{ animationDelay: `${900 + i * 350}ms` }}>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">{k}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-hair px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-dim">Sin intervención humana</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: TERRA }}>
              4 / 4 campos
            </span>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
