'use client'

/**
 * TRACE — the thing worth showing isn't a screen, it's the honesty split:
 * 2 brokers get a real automated email, the other 9 get a real page opened
 * for the user with nothing faked in between. Same shape as Rostry's
 * payment-split diagram (one input, two real outputs), different subject.
 */

import { MockupFrame, OK, TERRA, INK } from './frame'

function Node({
  label,
  value,
  sub,
  tone,
  pct,
  ink,
  delay,
}: {
  label: string
  value: string
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
      <p className="mt-1 font-mono text-[17px] tabular-nums tracking-tight" style={{ color: tone }}>
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[10px] text-fg-dim">{sub}</p>
    </div>
  )
}

export function TraceMockup() {
  return (
    <MockupFrame title="Removal request · dispatch" context="scan → 11 brokers" status="status: honest by design" tone={OK}>
      <div className="grid items-center gap-3 lg:grid-cols-[1fr_64px_1fr]">
        {/* Input */}
        <Node label="Exposure scan" value="64" sub="score · 4 breaches found" tone={INK} ink delay={300} />

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
          <Node label="Spokeo · ZoomInfo" value="Sent" sub="real email, verified contact" tone={OK} pct="2 brokers" delay={1000} />
          <Node label="The other 9" value="Opened" sub="user submits, then confirms" tone={TERRA} pct="9 brokers" delay={1150} />
        </div>
      </div>

      <p className="mt-3 border-t border-hair pt-3 font-mono text-[10px] leading-relaxed text-fg-dim">
        Status never gets ahead of what actually happened: "Sent" only shows once Resend confirms delivery, and
        "Submitted" only shows once the user confirms they filled the broker's own form — not the moment a button
        gets tapped.
      </p>
    </MockupFrame>
  )
}
