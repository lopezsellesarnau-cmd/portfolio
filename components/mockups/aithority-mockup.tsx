'use client'

/**
 * Aithority — the mockup IS the real /lab panel: metric cards, a tick-donut
 * "deadline readiness" gauge with the big number in the middle, the AI
 * systems inventory with risk chips, the compliance pipeline and the stack.
 * It shows how the product looks and what it's built with, in English.
 */

import { MockupFrame, OK, TERRA, INK, Meter } from './frame'

const ALTO = '#B8433F'
const TRANSP = '#5A5FA0'

/** Tick-donut with the figure in the middle — the /lab "readiness" gauge. */
function DonutTicks({ pct, ticks = 60, size = 132, grosor = 12 }: { pct: number; ticks?: number; size?: number; grosor?: number }) {
  const filled = Math.round((pct / 100) * ticks)
  const c = size / 2
  const outerR = size / 2 - 2
  const innerR = outerR - grosor
  const round = (n: number) => Math.round(n * 100) / 100
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        {Array.from({ length: ticks }).map((_, i) => {
          const a = (i / ticks) * 2 * Math.PI - Math.PI / 2
          return (
            <line
              key={i}
              x1={round(c + innerR * Math.cos(a))}
              y1={round(c + innerR * Math.sin(a))}
              x2={round(c + outerR * Math.cos(a))}
              y2={round(c + outerR * Math.sin(a))}
              stroke={i < filled ? TERRA : 'rgba(21,20,18,0.13)'}
              strokeWidth={3}
              strokeLinecap="square"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[28px] leading-none tabular-nums text-ink">{pct}%</span>
        <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-fg-dim">ready</span>
      </div>
    </div>
  )
}

function Metric({ label, value, sub, accent }: { label: string; value: string; sub: string; accent?: string }) {
  return (
    <div className="px-3 py-3">
      <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-fg-faint">{label}</p>
      <p className="mt-1 font-mono text-[22px] leading-none tabular-nums" style={{ color: accent ?? INK }}>{value}</p>
      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-fg-dim">{sub}</p>
    </div>
  )
}

type System = { n: string; area: string; risk: string; tone: string }
const SYSTEMS: System[] = [
  { n: 'CV screening', area: 'HR', risk: 'High risk', tone: ALTO },
  { n: 'Credit scoring', area: 'Credit', risk: 'High risk', tone: ALTO },
  { n: 'Identity verification', area: 'Biometrics', risk: 'High risk', tone: ALTO },
  { n: 'Support assistant', area: 'Support', risk: 'Transparency', tone: TRANSP },
]

const PIPELINE = ['Inventory', 'Classification', 'Documentation', 'Evidence']
const STACK = ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'SQLite']

export function AithorityMockup() {
  return (
    <MockupFrame title="Trust Center · AI Act" context="inventory · risk · obligations" status="status: 6 systems" tone={TERRA}>
      {/* Metric cards */}
      <div className="grid grid-cols-2 divide-x divide-y divide-hair overflow-hidden rounded-[14px] border border-line bg-surface sm:grid-cols-4 sm:divide-y-0">
        <Metric label="AI systems" value="6" sub="inventoried" />
        <Metric label="High risk" value="3" sub="open files" accent={ALTO} />
        <Metric label="Undocumented" value="4" sub="pending" />
        <Metric label="Evidence" value="14" sub="attached" accent={OK} />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        {/* Inventory */}
        <div className="overflow-hidden rounded-[14px] border border-line bg-surface">
          <div className="border-b border-hair px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">AI systems inventory</div>
          {SYSTEMS.map((s, i) => (
            <div key={s.n} className="tree-node flex items-center justify-between gap-3 border-b border-hair px-3 py-2 last:border-b-0" style={{ animationDelay: `${300 + i * 180}ms` }}>
              <div className="min-w-0">
                <p className="truncate text-[12px] text-ink">{s.n}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-fg-dim">{s.area}</p>
              </div>
              <span className="shrink-0 border px-1.5 py-[1px] font-mono text-[8.5px] uppercase tracking-[0.08em]" style={{ borderColor: s.tone, color: s.tone }}>
                {s.risk}
              </span>
            </div>
          ))}
        </div>

        {/* Readiness gauge */}
        <div className="flex flex-col items-center overflow-hidden rounded-[14px] border border-line bg-surface p-4">
          <p className="self-start font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">Deadline readiness</p>
          <div className="my-3">
            <DonutTicks pct={41} />
          </div>
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.1em]">
              <span className="text-fg-dim">Obligations</span>
              <span className="tabular-nums text-ink">11 / 27</span>
            </div>
            <Meter pct={41} tone={INK} delay={900} />
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-hair pt-3">
        {PIPELINE.map((p, i) => (
          <span key={p} className="flex items-center gap-2">
            <span className="tree-node font-mono text-[9.5px] uppercase tracking-[0.1em]" style={{ color: i < 2 ? INK : 'rgba(21,20,18,0.45)', animationDelay: `${1300 + i * 150}ms` }}>
              {p}
            </span>
            {i < PIPELINE.length - 1 && <span className="font-mono text-[9px] text-fg-faint">→</span>}
          </span>
        ))}
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: OK }}>Every node traceable</span>
      </div>

      {/* Stack */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {STACK.map((s) => (
          <span key={s} className="border border-hair px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.06em] text-fg-dim">{s}</span>
        ))}
      </div>
    </MockupFrame>
  )
}
