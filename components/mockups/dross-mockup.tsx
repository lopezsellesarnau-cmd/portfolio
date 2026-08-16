'use client'

/**
 * Dross — the thing worth showing isn't a scan report, it's the detected
 * fracture: two halves of one system that stopped agreeing, with the free /
 * Pro split and the eval harness that keeps precision and recall at 100%.
 */

import { MockupFrame, Chip, INK, TERRA, OK } from './frame'

function Side({
  label,
  title,
  sub,
  tone,
  delay,
}: {
  label: string
  title: string
  sub: string
  tone: string
  delay: number
}) {
  return (
    <div className="tree-node border bg-surface px-3 py-2.5" style={{ borderColor: 'rgba(21,20,18,0.16)', animationDelay: `${delay}ms` }}>
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-faint">{label}</p>
      <p className="mt-1.5 font-mono text-[15px] leading-none tracking-tight" style={{ color: tone }}>
        {title}
      </p>
      <p className="mt-1 font-mono text-[10px] leading-snug text-fg-dim">{sub}</p>
    </div>
  )
}

export function DrossMockup() {
  return (
    <MockupFrame
      title="Contract drift · detected"
      context="scan ./trace-app --also ./trace-backend"
      status="status: 7/7 fixtures · p=1.0 r=1.0"
      tone={OK}
    >
      {/* The fracture: server route vs client call, drifted apart */}
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_84px_1fr]">
        <Side label="Server · route" title="`POST /scan`" sub="now requires a Bearer token" tone={INK} delay={250} />
        <div className="flex flex-col items-center gap-1.5">
          <span className="tree-node border px-2 py-[3px] font-mono text-[9px] uppercase tracking-[0.12em]" style={{ borderColor: TERRA, color: TERRA, animationDelay: '650ms' }}>
            drift
          </span>
          {/* diagonal zig lines */}
          <svg viewBox="0 0 84 34" className="hidden w-full max-w-[84px] lg:block" aria-hidden>
            <path className="tree-line" d="M4 30 H22 L30 4 H48" fill="none" stroke={TERRA} strokeWidth="1" style={{ animationDelay: '700ms' }} />
            <path className="tree-line" d="M8 26 H30 L38 8 H52" fill="none" stroke="rgba(21,20,18,0.25)" strokeWidth="1" style={{ animationDelay: '760ms' }} />
          </svg>
          <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint lg:hidden">stopped agreeing</span>
        </div>
        <Side label="Client · call" title="fetch('/scan')" sub="sends no token yet" tone={TERRA} delay={350} />
      </div>

      {/* Free vs Pro split + eval readout */}
      <div className="mt-4 grid grid-cols-3 border border-ink">
        <div className="border-r border-hair bg-surface px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint">Deterministic checks</p>
          <p className="mt-1.5 font-mono text-[19px] tabular-nums leading-none text-fg-muted">free</p>
          <p className="mt-1 font-mono text-[9px] text-fg-dim">offline · instant</p>
        </div>
        <div className="border-r border-hair bg-surface px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint">LLM drift pass</p>
          <p className="mt-1.5 font-mono text-[19px] tabular-nums leading-none text-fg-muted">Pro</p>
          <p className="mt-1 font-mono text-[9px] text-fg-dim">your Anthropic key</p>
        </div>
        <div className="bg-ink px-3 py-3 sm:px-4">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-[rgba(240,238,233,0.65)]">Eval harness</p>
          <p className="mt-1.5 font-mono text-[19px] tabular-nums leading-none" style={{ color: OK }}>100%</p>
          <p className="mt-1 font-mono text-[9px] text-[rgba(240,238,233,0.55)]">precision · recall</p>
        </div>
      </div>

      {/* Check list */}
      <div className="mt-3 flex flex-wrap items-center gap-2 border border-line bg-surface px-3 py-2.5">
        <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-fg-faint">Checks</span>
        <Chip label="dead-exports" tone={INK} />
        <Chip label="env-drift" tone={INK} />
        <Chip label="todo-density" tone={INK} />
        <Chip label="hardcoded-demo" tone={INK} />
        <Chip label="semantic drift · gated" tone={TERRA} />
      </div>
    </MockupFrame>
  )
}