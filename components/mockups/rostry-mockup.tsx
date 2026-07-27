'use client'

/**
 * Rostry — lo que hay que explicar es el reparto del dinero: un único cobro
 * (destination charge) que se divide 95/5 sin que la plataforma llegue a
 * sostener fondos de terceros. Un diagrama de flujo del pago lo cuenta mejor
 * que un árbol de decisión: el dinero entra por un sitio y sale por dos.
 */

import { MockupFrame, OK, TERRA, INK } from './frame'

function Amount({
  label,
  monto,
  sub,
  tone,
  pct,
  ink,
  delay,
}: {
  label: string
  monto: string
  sub: string
  tone: string
  pct?: string
  ink?: boolean
  delay: number
}) {
  return (
    <div className="tree-node border bg-surface px-3 py-2.5" style={{ borderColor: ink ? INK : 'rgba(21,20,18,0.16)', animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-faint">{label}</p>
        {pct && (
          <span className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: tone }}>
            {pct}
          </span>
        )}
      </div>
      <p className="mt-1 font-mono text-[19px] tabular-nums tracking-tight" style={{ color: tone }}>
        {monto}
      </p>
      <p className="mt-0.5 font-mono text-[10px] text-fg-dim">{sub}</p>
    </div>
  )
}

export function RostryMockup() {
  return (
    <MockupFrame title="Stripe Connect · destination charge" context="charge → split" status="status: settled" tone={OK}>
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_64px_1fr]">
        {/* Input */}
        <Amount label="League payment" monto="$40.00" sub="player → app" tone={INK} ink delay={300} />

        {/* Splitting connector */}
        <svg viewBox="0 0 64 120" className="hidden h-[120px] w-full lg:block" aria-hidden>
          <path className="tree-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M0 60 H26 V26 H64" fill="none" stroke={OK} strokeWidth="1.5" style={{ animationDelay: '700ms' }} />
          <path className="tree-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M0 60 H26 V94 H64" fill="none" stroke={TERRA} strokeWidth="1.5" style={{ animationDelay: '750ms' }} />
        </svg>
        <div className="flex justify-center py-1 lg:hidden" aria-hidden>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">splits into</span>
        </div>

        {/* Outputs */}
        <div className="grid gap-3">
          <Amount label="Organizer" monto="$38.00" sub="own account · direct" tone={OK} pct="95%" delay={1000} />
          <Amount label="Rostry" monto="$2.00" sub="platform fee" tone={TERRA} pct="5%" delay={1150} />
        </div>
      </div>

      <p className="mt-3 border-t border-hair pt-3 font-mono text-[10px] leading-relaxed text-fg-dim">
        The money never sits in a Rostry account: Stripe pays the organizer directly and withholds the fee in the
        same charge. Less regulatory weight, zero manual split.
      </p>
    </MockupFrame>
  )
}
