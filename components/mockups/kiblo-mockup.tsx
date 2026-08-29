'use client'

/**
 * Kiblo home language: circular bowl, orbit of ingredients, share pill.
 * White / black / grey — not the ficha-técnica rust of TRACE/Dross.
 */

import { MockupFrame, INK } from './frame'

export function KibloMockup() {
  return (
    <MockupFrame title="Home · bowl" context="onboarding → food → plan → home" status="building" tone={INK}>
      <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,200px)_1fr]">
        <div className="relative mx-auto aspect-square w-full max-w-[200px]">
          <div className="absolute inset-[8%] rounded-full border border-ink/25" />
          <div className="absolute inset-[22%] rounded-full border border-ink bg-[#f4f4f4]" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] uppercase tracking-[0.14em] text-fg-faint">
            Bowl
          </span>
          {[0, 1, 2, 3].map((i) => {
            const a = (Math.PI * 0.25) + i * (Math.PI * 0.5) / 1.35
            const r = 42
            const x = 50 + r * Math.cos(a + 0.9)
            const y = 50 + r * Math.sin(a + 0.9)
            return (
              <span
                key={i}
                className="absolute h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink bg-white"
                style={{ left: `${x}%`, top: `${y}%` }}
                aria-hidden
              />
            )
          })}
        </div>
        <div className="space-y-3 font-mono text-[10px] uppercase tracking-[0.12em]">
          <p className="text-fg-faint">Great choice · portions from Waltham RER</p>
          <p className="text-[13px] normal-case tracking-normal text-ink">Days, not months — AI in loops, I own the product calls.</p>
          <div className="flex gap-2 pt-1">
            <span className="flex-1 rounded-[10px] bg-ink py-2 text-center text-[9px] text-bg">Share bowl</span>
            <span className="rounded-[10px] border border-ink px-3 py-2 text-[9px]">Reorder</span>
            <span className="rounded-[10px] border border-ink px-3 py-2 text-[9px]">Log</span>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
