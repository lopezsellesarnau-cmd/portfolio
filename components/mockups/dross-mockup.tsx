'use client'

/**
 * Mini Dross window — checker, logo, contract-drift finding, GATE FAILED.
 * Same bone/ink/rust language as the Mac app.
 */

import { MockupFrame, Chip, INK, TERRA, OK } from './frame'

export function DrossMockup() {
  return (
    <MockupFrame title="Dross · macOS" context="scan ./trace-app —also ./trace-backend" status="notarized · v0.1" tone={OK}>
      <div className="overflow-hidden border border-ink bg-[#F0F0F0]">
        <div className="checker h-[7px] w-full border-b border-ink" aria-hidden />

        <div className="flex items-center gap-3 border-b border-ink px-3 py-2.5">
          <img src="/dross-icon.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[13px] font-medium uppercase tracking-[0.16em] text-ink">Dross</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-faint">Type: scan / contract drift</p>
          </div>
          <a
            href="https://github.com/lopezsellesarnau-cmd/dross"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 border border-ink px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-bg"
          >
            Repo ↗
          </a>
        </div>

        <div className="grid sm:grid-cols-[1fr_1px_1fr]">
          <div className="px-3 py-3">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">Client · call</p>
            <p className="mt-1 font-mono text-[14px] text-ink">fetch(&apos;/scan&apos;)</p>
            <p className="mt-0.5 font-mono text-[10px] text-fg-dim">no Authorization header</p>
          </div>
          <div className="hidden bg-ink sm:block" aria-hidden />
          <div className="border-t border-hair px-3 py-3 sm:border-t-0">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">Server · route</p>
            <p className="mt-1 font-mono text-[14px]" style={{ color: TERRA }}>
              POST /scan
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-fg-dim">now requires a Bearer token</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-y border-ink bg-ink px-3 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-bg">Gate</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#F0F0F0' }}>
            Failed · 1 contract-drift
          </span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-hair">
          <div className="px-3 py-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-fg-faint">Deterministic</p>
            <p className="mt-0.5 font-mono text-[12px] text-ink">Free · offline</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-fg-faint">LLM pass</p>
            <p className="mt-0.5 font-mono text-[12px] text-ink">Pro · your key</p>
          </div>
          <div className="px-3 py-2.5">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-fg-faint">Eval</p>
            <p className="mt-0.5 font-mono text-[12px]" style={{ color: OK }}>
              p=1.0 r=1.0
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-t border-hair px-3 py-2">
          <Chip label="contract-drift" tone={TERRA} />
          <Chip label="dead-exports" tone={INK} />
          <Chip label="env-drift" tone={INK} />
          <Chip label="hardcoded-demo" tone={INK} />
        </div>
      </div>
    </MockupFrame>
  )
}
