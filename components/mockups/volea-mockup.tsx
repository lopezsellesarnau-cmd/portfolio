'use client'

/**
 * Volea — dos cosas que contar: la reserva (ocupación real de una pista a lo
 * largo del día, con hora valle) y el pago vía Stripe Connect que se cobra
 * DIRECTO a la cuenta del club (Volea no sostiene fondos). Izquierda la agenda,
 * derecha el dinero. Distinto de Rostry a propósito: aquí es cobro directo, no
 * un split con fee de plataforma.
 */

import { MockupFrame, OK, TERRA, INK } from './frame'

const DAY: { h: string; s: 'booked' | 'off' | 'now' | 'free' }[] = [
  { h: '08', s: 'off' }, { h: '09', s: 'off' }, { h: '10', s: 'booked' },
  { h: '11', s: 'free' }, { h: '12', s: 'off' }, { h: '13', s: 'off' },
  { h: '14', s: 'free' }, { h: '15', s: 'booked' }, { h: '16', s: 'booked' },
  { h: '17', s: 'free' }, { h: '18', s: 'now' }, { h: '19', s: 'booked' },
  { h: '20', s: 'booked' }, { h: '21', s: 'booked' }, { h: '22', s: 'free' },
]

function segStyle(s: string, i: number): React.CSSProperties {
  const base: React.CSSProperties = { animationDelay: `${200 + i * 45}ms` }
  if (s === 'booked') return { ...base, backgroundColor: INK }
  if (s === 'now') return { ...base, backgroundColor: TERRA }
  if (s === 'off') return { ...base, backgroundColor: 'rgba(21,20,18,0.12)' }
  return { ...base, border: '1px solid rgba(21,20,18,0.16)' }
}

export function VoleaMockup() {
  return (
    <MockupFrame title="Court booking · live" context="schedule → charge" status="status: settled" tone={OK}>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        {/* Agenda de la pista */}
        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-fg-dim">
            <span>Court 3 · Today</span>
            <span className="tabular-nums">08–23h</span>
          </div>
          <div className="px-3 py-3">
            <div className="flex items-end gap-[3px]" aria-hidden>
              {DAY.map((d, i) => (
                <div key={d.h} className="flex flex-1 flex-col items-center gap-1">
                  <span className="tree-node h-9 w-full" style={segStyle(d.s, i)} />
                  <span className="font-mono text-[7px] text-fg-faint">{d.h}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[8px] uppercase tracking-[0.1em] text-fg-faint">
              <span className="flex items-center gap-1"><span className="h-2 w-2 bg-ink" />Booked</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2" style={{ backgroundColor: 'rgba(21,20,18,0.12)' }} />Off-peak</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2" style={{ backgroundColor: TERRA }} />Booking now</span>
            </div>
          </div>
          <div className="tree-node border-t border-hair px-3 py-2" style={{ animationDelay: '900ms' }}>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">Selected</p>
            <p className="mt-0.5 text-[12px] leading-snug text-ink">
              Today 18:00–19:00 · Court 3 · <span className="tabular-nums">€24.00</span>
            </p>
          </div>
        </div>

        {/* Pago directo al club */}
        <div className="border border-ink bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-3 py-2 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink">
            <span>Stripe Connect</span>
            <span className="text-fg-dim">direct charge</span>
          </div>
          <div className="space-y-1 px-3 py-3">
            <div className="tree-node flex items-center justify-between" style={{ animationDelay: '600ms' }}>
              <span className="font-mono text-[10px] text-fg-dim">Player pays</span>
              <span className="font-mono text-[15px] tabular-nums text-ink">€24.00</span>
            </div>
            <svg viewBox="0 0 200 20" className="h-5 w-full" aria-hidden>
              <path className="tree-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} d="M14 2 V18" stroke={OK} strokeWidth="1.5" fill="none" style={{ animationDelay: '900ms' }} />
            </svg>
            <div className="tree-node border border-line bg-bg px-3 py-2" style={{ animationDelay: '1050ms' }}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-faint">Club account</span>
                <span className="font-mono text-[9px] uppercase" style={{ color: OK }}>direct</span>
              </div>
              <p className="mt-1 font-mono text-[17px] tabular-nums" style={{ color: OK }}>€24.00</p>
              <p className="mt-0.5 font-mono text-[9.5px] text-fg-dim">club’s own Stripe account</p>
            </div>
            <div className="tree-node flex items-center justify-between pt-1.5" style={{ animationDelay: '1250ms' }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-fg-faint">Volea holds</span>
              <span className="font-mono text-[11px] tabular-nums text-fg-dim">€0.00</span>
            </div>
          </div>
          <p className="border-t border-hair px-3 py-2 font-mono text-[9px] leading-relaxed text-fg-dim">
            Funds never touch Volea — Stripe charges the club’s connected account directly.
          </p>
        </div>
      </div>
    </MockupFrame>
  )
}
