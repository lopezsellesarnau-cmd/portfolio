'use client'

/**
 * Louvr Labs — es una herramienta de ranking de anuncios, así que su mockup
 * natural es una TABLA, no un árbol: filas de anuncios con sus métricas y el
 * badge que les asigna la capa de reglas, y debajo el insight que genera
 * Claude razonando sobre ese ranking ya hecho. Las dos capas, a la vista.
 */

import { MockupFrame, OK, TERRA, INK, Meter } from './frame'

type Row = { ad: string; cpa: string; ctr: string; freq: string; badge: string; tono: string; pct: number }

const ROWS: Row[] = [
  { ad: 'Retargeting · v3', cpa: '$4.10', ctr: '2.8%', freq: '1.4', badge: 'Scale', tono: OK, pct: 88 },
  { ad: 'Lookalike 1% · UGC', cpa: '$6.90', ctr: '1.9%', freq: '2.1', badge: 'Hold', tono: INK, pct: 55 },
  { ad: 'Broad · carousel', cpa: '$11.40', ctr: '0.9%', freq: '4.3', badge: 'Pause', tono: TERRA, pct: 22 },
  { ad: 'Interest · static', cpa: '$7.80', ctr: '1.3%', freq: '3.0', badge: 'Refresh', tono: 'rgba(21,20,18,0.5)', pct: 40 },
]

export function LouvrMockup() {
  return (
    <MockupFrame title="Ranking engine" context="layer 1 rules · layer 2 Claude" status="status: badge assigned" tone={OK}>
      {/* Layer 1 — deterministic table */}
      <div className="border border-line bg-surface">
        <div className="grid grid-cols-[1.6fr_0.8fr_0.7fr_0.7fr_0.9fr] gap-2 border-b border-hair px-3 py-2 font-mono text-[8.5px] uppercase tracking-[0.12em] text-fg-faint">
          <span>Ad</span>
          <span className="text-right">CPA</span>
          <span className="text-right">CTR</span>
          <span className="text-right">Freq</span>
          <span className="text-right">Badge</span>
        </div>
        {ROWS.map((f, i) => (
          <div
            key={f.ad}
            className="tree-node grid grid-cols-[1.6fr_0.8fr_0.7fr_0.7fr_0.9fr] items-center gap-2 border-b border-hair px-3 py-2 last:border-b-0"
            style={{ animationDelay: `${300 + i * 220}ms` }}
          >
            <span className="truncate font-mono text-[11px] text-ink">{f.ad}</span>
            <span className="text-right font-mono text-[11px] tabular-nums text-fg-muted">{f.cpa}</span>
            <span className="text-right font-mono text-[11px] tabular-nums text-fg-muted">{f.ctr}</span>
            <span className="text-right font-mono text-[11px] tabular-nums text-fg-muted">{f.freq}</span>
            <span className="flex justify-end">
              <span
                className="inline-block border px-1.5 py-[1px] font-mono text-[8.5px] uppercase tracking-[0.08em]"
                style={{ borderColor: f.tono, color: f.tono }}
              >
                {f.badge}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Layer 2 — Claude reasons over the ranking already done */}
      <div className="mt-3 border border-ink bg-ink p-3 text-bg">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[rgba(240,238,233,0.55)]">
          <span className="h-1 w-1 rounded-full bg-accent pulse-dot" aria-hidden />
          Insight · Claude (Sonnet)
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-[rgba(240,238,233,0.82)]">
          The broad carousel is flagged <span className="text-bg">Pause</span>: frequency already at 4.3 explains the
          blown CPA — it&apos;s saturating the same audience. Rotate creative before reactivating. Retargeting can
          take scale: high CTR, low frequency.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[rgba(240,238,233,0.5)]">Deterministic ranking</p>
            <div className="mt-1.5">
              <Meter pct={100} tone="#F0EEE9" delay={1400} />
            </div>
          </div>
          <div>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-[rgba(240,238,233,0.5)]">Weekly report · auto</p>
            <div className="mt-1.5">
              <Meter pct={100} tone="#C1663D" delay={1550} />
            </div>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
