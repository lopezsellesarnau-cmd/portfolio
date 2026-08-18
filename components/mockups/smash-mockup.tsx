'use client'

/**
 * SMASH — dos gestos: el feed vertical de vídeos (highlights de pádel, columna
 * de acciones estilo TikTok) y unirse a un partido/squad. Izquierda el
 * reproductor vertical sobre fondo oscuro (lee como pantalla de vídeo); derecha
 * una tarjeta de partido con sus campos reales (día, hora, sitio, nivel,
 * plazas) y el medidor EN VIVO de cuánto se va llenando.
 */

import { MockupFrame, OK, TERRA, Meter } from './frame'

function RailIcon({ d, count, filled, delay }: { d: string; count?: string; filled?: boolean; delay: number }) {
  return (
    <span className="tree-node flex flex-col items-center gap-1" style={{ animationDelay: `${delay}ms` }}>
      <svg
        viewBox="0 0 16 16"
        className="h-[18px] w-[18px]"
        fill={filled ? TERRA : 'none'}
        stroke={filled ? TERRA : 'currentColor'}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
      {count && <span className="font-mono text-[8px] tabular-nums">{count}</span>}
    </span>
  )
}

function Field({ k, v, wide, delay }: { k: string; v: string; wide?: boolean; delay: number }) {
  return (
    <div className={`tree-node ${wide ? 'col-span-2' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-fg-faint">{k}</p>
      <p className="mt-0.5 text-[12.5px] leading-snug text-ink">{v}</p>
    </div>
  )
}

const MEMBERS = ['MA', 'JL', 'PO']

export function SmashMockup() {
  return (
    <MockupFrame title="Feed · match" context="watch → join" status="live on the App Store" tone={OK}>
      <div className="grid items-stretch gap-4 sm:grid-cols-[minmax(0,158px)_1fr]">
        {/* Feed de vídeo vertical */}
        <div
          className="mx-auto flex w-full max-w-[158px] flex-col overflow-hidden rounded-[14px] bg-ink text-bg"
          style={{ aspectRatio: '9 / 16' }}
        >
          <div className="flex items-center justify-between px-3 pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-bg/70">
            <span>For you</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8433F] pulse-dot" aria-hidden />
              live
            </span>
          </div>

          <div className="relative flex flex-1 items-end">
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
              <svg viewBox="0 0 24 24" className="h-9 w-9 opacity-75" fill="none" stroke="currentColor" strokeWidth="1.1">
                <circle cx="12" cy="12" r="11" />
                <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <div className="flex w-full items-end justify-between gap-2 p-3">
              <div className="min-w-0">
                <p className="font-mono text-[9px] text-bg/80">@marc.padel</p>
                <p className="mt-1 text-[11px] leading-snug">Backhand smash — match point</p>
              </div>
              <div className="flex flex-col items-center gap-2.5">
                <RailIcon d="M8 14s-5-3.2-5-7a2.8 2.8 0 0 1 5-1.6A2.8 2.8 0 0 1 13 7c0 3.8-5 7-5 7z" count="1.2k" filled delay={500} />
                <RailIcon d="M2.5 3.5h11v7H6l-3.5 3v-3" count="84" delay={650} />
                <RailIcon d="M4 9v4h8V9 M8 2.5v7 M5.5 5 8 2.5 10.5 5" delay={800} />
                <RailIcon d="M4 2.5v11 M4 3.2h7L9.6 5.6 11 8H4" delay={950} />
              </div>
            </div>
          </div>

          <div className="px-3 pb-3">
            <div className="h-[3px] w-full bg-bg/25">
              <div className="meter-fill h-full bg-bg" style={{ width: '38%', animationDelay: '600ms' }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[7px] tabular-nums text-bg/60">
              <span>0:12</span>
              <span>0:32</span>
            </div>
          </div>
        </div>

        {/* Tarjeta de partido / squad */}
        <div className="flex flex-col border border-ink bg-surface">
          <div className="flex items-center justify-between border-b border-hair px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink">
            <span>Open match · squad</span>
            <span className="flex items-center gap-1.5 text-fg-dim">
              <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ backgroundColor: TERRA }} aria-hidden />
              live
            </span>
          </div>

          <div className="flex-1 space-y-4 px-4 py-4">
            <div>
              <p className="text-[14px] font-medium text-ink">Barcelona Padel Crew</p>
              <p className="mt-0.5 font-mono text-[10px] text-fg-dim">Open match · anyone can join</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field k="Day" v="Sat 12 Jul" delay={350} />
              <Field k="Time" v="19:00 – 20:30" delay={430} />
              <Field k="Where" v="Club Vall d’Hebron · Barcelona" wide delay={510} />
              <Field k="Level" v="3.5 · Intermediate" delay={590} />
              <Field k="Players" v="3 / 4 · 1 spot left" delay={670} />
            </div>

            {/* Avatares: 3 dentro + hueco abierto */}
            <div className="flex items-center" aria-hidden>
              {MEMBERS.map((m, i) => (
                <span
                  key={m}
                  className="tree-node -ml-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-surface bg-hair font-mono text-[9px] text-ink first:ml-0"
                  style={{ animationDelay: `${750 + i * 120}ms` }}
                >
                  {m}
                </span>
              ))}
              <span
                className="tree-node -ml-1.5 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[15px]"
                style={{ border: `1px dashed ${TERRA}`, color: TERRA, animationDelay: '1150ms' }}
              >
                +
              </span>
            </div>

            {/* Medidor en vivo: cuánto se llena */}
            <div className="tree-node space-y-1.5" style={{ animationDelay: '1250ms' }}>
              <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.12em]">
                <span className="flex items-center gap-1.5" style={{ color: TERRA }}>
                  <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ backgroundColor: TERRA }} aria-hidden />
                  Filling up live
                </span>
                <span className="tabular-nums" style={{ color: TERRA }}>75%</span>
              </div>
              <Meter pct={75} tone={TERRA} delay={1350} />
              <p className="font-mono text-[9px] text-fg-dim">3 of 4 spots taken · updates in real time as players join</p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-hair px-4 py-2.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-fg-dim">Squad chat · 3 new</span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-white"
              style={{ backgroundColor: TERRA }}
            >
              Join · take the spot
            </span>
          </div>
        </div>
      </div>
    </MockupFrame>
  )
}
