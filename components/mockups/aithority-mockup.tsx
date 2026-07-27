'use client'

/**
 * Aithority — es un dashboard de cumplimiento, así que el mockup ES el
 * dashboard: el inventario de sistemas con su clasificación de riesgo, la
 * cobertura de obligaciones y el pipeline por el que pasa cada sistema
 * (inventario → clasificación → documentación → evidencia). Enseña cómo
 * funciona el producto y con qué se construye, igual que los demás.
 */

import { MockupFrame, OK, TERRA, INK, Meter, BlockGrid } from './frame'

const ALTO = '#B8433F'
const TRANSP = '#5A5FA0'

type Sistema = { n: string; area: string; riesgo: string; tono: string; doc: number }

const SISTEMAS: Sistema[] = [
  { n: 'Cribado de CV', area: 'RRHH', riesgo: 'Alto riesgo', tono: ALTO, doc: 80 },
  { n: 'Scoring de solvencia', area: 'Crédito', riesgo: 'Alto riesgo', tono: ALTO, doc: 45 },
  { n: 'Verificación de identidad', area: 'Biometría', riesgo: 'Alto riesgo', tono: ALTO, doc: 20 },
  { n: 'Asistente de soporte', area: 'Soporte', riesgo: 'Transparencia', tono: TRANSP, doc: 60 },
]

const PIPELINE = ['Inventario', 'Clasificación', 'Documentación', 'Evidencia']
const STACK = ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'SQLite']

export function AithorityMockup() {
  return (
    <MockupFrame title="Centro de cumplimiento · AI Act" context="inventario · riesgo · obligaciones" status="status: 6 sistemas" tone={TERRA}>
      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        {/* Inventario */}
        <div className="border border-line bg-surface">
          <div className="border-b border-hair px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
            Inventario de sistemas de IA
          </div>
          {SISTEMAS.map((s, i) => (
            <div
              key={s.n}
              className="tree-node flex items-center justify-between gap-3 border-b border-hair px-3 py-2 last:border-b-0"
              style={{ animationDelay: `${300 + i * 200}ms` }}
            >
              <div className="min-w-0">
                <p className="truncate text-[12px] text-ink">{s.n}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-fg-dim">{s.area}</p>
              </div>
              <span
                className="shrink-0 border px-1.5 py-[1px] font-mono text-[8.5px] uppercase tracking-[0.08em]"
                style={{ borderColor: s.tono, color: s.tono }}
              >
                {s.riesgo}
              </span>
            </div>
          ))}
        </div>

        {/* Readout */}
        <div className="border border-line bg-surface p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">Preparación al plazo</p>
          <p className="mt-1 font-mono text-[30px] leading-none tabular-nums text-ink">
            41<span className="text-[16px] text-fg-dim">%</span>
          </p>
          <div className="mt-2">
            <Meter pct={41} tone={TERRA} delay={900} />
          </div>

          <div className="mt-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-fg-dim">Obligaciones</span>
              <BlockGrid filled={11} max={27} delay={1100} />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-fg-dim">Alto riesgo</span>
              <span className="font-mono text-[11px] tabular-nums text-ink">3 / 6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-fg-dim">Evidencias</span>
              <span className="font-mono text-[11px] tabular-nums text-ink">14 / 27</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-hair pt-3">
        {PIPELINE.map((p, i) => (
          <span key={p} className="flex items-center gap-2">
            <span
              className="tree-node font-mono text-[9.5px] uppercase tracking-[0.1em]"
              style={{ color: i < 2 ? INK : 'rgba(21,20,18,0.45)', animationDelay: `${1300 + i * 150}ms` }}
            >
              {p}
            </span>
            {i < PIPELINE.length - 1 && <span className="font-mono text-[9px] text-fg-faint">→</span>}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: OK }}>
          Cada nodo, trazable
        </span>
      </div>

      {/* Stack */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {STACK.map((s) => (
          <span key={s} className="border border-hair px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-fg-dim">
            {s}
          </span>
        ))}
      </div>
    </MockupFrame>
  )
}
