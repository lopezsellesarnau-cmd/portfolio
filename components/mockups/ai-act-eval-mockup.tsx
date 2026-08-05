'use client'

/**
 * ai-act-eval — el mockup replica el harness real: rules → llm → combined
 * sobre 43 casos etiquetados, desglosado por "trampa". El hallazgo honesto
 * (rules-only se cae a 0% en emotion-context) es lo que justifica la capa
 * LLM-as-judge — igual que el F1 mockup, la evaluación es el producto.
 */

import { MockupFrame, Meter, TERRA, OK, INK } from './frame'

const TRAPS = [
  { name: 'emotion-context', n: 1, rules: 0, llm: 0, combined: 100 },
  { name: 'art6.3-exemption', n: 5, rules: 60, llm: 80, combined: 100 },
  { name: 'art5-prohibition', n: 6, rules: 66.7, llm: 83.3, combined: 100 },
  { name: 'transparency-only', n: 4, rules: 75, llm: 75, combined: 100 },
  { name: 'plain', n: 23, rules: 100, llm: 100, combined: 100 },
]

const GREY = '#8A8577'

export function AiActEvalMockup() {
  return (
    <MockupFrame title="Risk classification harness" context="rules → llm-as-judge · 43 cases" status="status: 100% tier-acc combined" tone={TERRA}>
      {/* Readout — la progresión, igual que el F1 mockup con MAE */}
      <div className="grid grid-cols-3 border border-ink">
        <div className="border-r border-hair bg-surface px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint">Rules</p>
          <p className="mt-1.5 font-mono text-[22px] tabular-nums leading-none text-fg-muted">86%</p>
        </div>
        <div className="border-r border-hair bg-surface px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint">+ LLM</p>
          <p className="mt-1.5 font-mono text-[22px] tabular-nums leading-none text-fg-muted">90.7%</p>
        </div>
        <div className="bg-ink px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-[rgba(240,238,233,0.65)]">Combined</p>
          <p className="mt-1.5 font-mono text-[22px] tabular-nums leading-none" style={{ color: TERRA }}>100%</p>
        </div>
      </div>

      {/* Tabla de trampas — donde rules-only se rompe */}
      <div className="mt-3 border border-ink bg-surface">
        <div className="grid grid-cols-[1fr_2.4fr] gap-2 border-b border-hair px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-fg-faint">
          <span>Trap</span>
          <span className="grid grid-cols-3 gap-2">
            <span className="text-right">rules</span>
            <span className="text-right">llm</span>
            <span className="text-right">combined</span>
          </span>
        </div>
        {TRAPS.map((t, i) => (
          <div key={t.name} className="border-b border-hair px-3 py-2 last:border-b-0">
            <div className="mb-1.5 flex items-baseline justify-between gap-2">
              <span className="truncate font-mono text-[10px] text-ink">{t.name}</span>
              <span className="shrink-0 font-mono text-[8px] text-fg-faint">n={t.n}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Meter pct={t.rules} tone={GREY} delay={i * 90} />
                <p className="mt-0.5 text-right font-mono text-[8.5px] tabular-nums text-fg-muted">{t.rules}%</p>
              </div>
              <div>
                <Meter pct={t.llm} tone={INK} delay={i * 90 + 60} />
                <p className="mt-0.5 text-right font-mono text-[8.5px] tabular-nums text-fg-muted">{t.llm}%</p>
              </div>
              <div>
                <Meter pct={t.combined} tone={t.combined === 100 ? OK : TERRA} delay={i * 90 + 120} />
                <p className="mt-0.5 text-right font-mono text-[8.5px] tabular-nums text-ink">{t.combined}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-fg-muted">
        Rules alone score 0% on emotion-context — a support tool and workplace monitoring read the same to a
        pattern match. The judge is what closes that gap, and every override still cites the article.
      </p>
    </MockupFrame>
  )
}
