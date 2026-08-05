'use client'

/**
 * F1 Strategy Agent — el mockup replica el report.html real (generado por
 * src/report.py): la fila de métricas MAE (v1 → v2, la lección del delta),
 * la pista animada con las 5 estrategias corriendo, y la tabla de tiempos.
 * El valor es la EVALUACIÓN honesta, no el modelo: el objetivo cambió de
 * tiempo absoluto a delta sobre el ritmo base del circuito, y eso bajó el
 * error de 3.49s a 0.73s.
 */

import { MockupFrame, OK, TERRA, INK } from './frame'

const SWATCHES = ['#C1663D', '#B8433F', '#151412', '#5A6B8C', '#3F7A4E']

const STRATEGIES = [
  { name: 'One stop — Medium → Hard', mins: '87.8 min', gap: '+0.0s', best: true, dur: '6.00s' },
  { name: 'One stop — Hard → Medium', mins: '88.7 min', gap: '+52.2s', best: false, dur: '6.06s' },
  { name: 'Two stops — M → H → M', mins: '88.0 min', gap: '+11.3s', best: false, dur: '6.01s' },
  { name: 'Two stops — S → M → H', mins: '88.3 min', gap: '+29.0s', best: false, dur: '6.03s' },
  { name: 'Two stops — S → H → S', mins: '88.2 min', gap: '+24.3s', best: false, dur: '6.03s' },
]

/** Pista oval: mismo trazado que el report, con las "chicanes" de marcas. */
function Track() {
  return (
    <div className="border border-ink bg-surface p-3">
      <div className="relative">
        <svg viewBox="-30 -50 980 400" className="h-auto w-full" role="img" aria-label="Race track with strategies racing">
          <path
            id="f1-track"
            d="M120,40 L780,40 A100,100 0 0 1 780,240 L120,240 A100,100 0 0 1 120,40 Z"
            fill="none"
            stroke={INK}
            strokeOpacity="0.14"
            strokeWidth="26"
            strokeLinejoin="round"
          />
          <path
            d="M120,40 L780,40 A100,100 0 0 1 780,240 L120,240 A100,100 0 0 1 120,40 Z"
            fill="none"
            stroke="#F0EEE9"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          {[160, 220, 280, 340, 400, 460, 520, 580, 640, 700, 760].map((x) => (
            <g key={x}>
              <line x1={x} y1="33" x2={x} y2="47" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
              <line x1={x} y1="233" x2={x} y2="247" stroke={INK} strokeOpacity="0.25" strokeWidth="2" />
            </g>
          ))}
          <line x1="120" y1="27" x2="120" y2="53" stroke={INK} strokeWidth="4" />
          <text x="120" y="-33" fontFamily="var(--font-mono, monospace)" fontSize="13" fill={INK} letterSpacing="1" textAnchor="middle">
            START / FINISH
          </text>
        </svg>

        {/* Coches — cada estrategia un color, velocidad proporcional al tiempo */}
        {STRATEGIES.map((s, i) => (
          <div key={s.name} className="tree-node" style={{ animationDelay: `${600 + i * 160}ms` }}>
            <svg viewBox="-30 -50 980 400" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle r="7" fill={SWATCHES[i]} stroke="#F0EEE9" strokeWidth="1.5">
                <animateMotion dur={s.dur} repeatCount="indefinite" rotate="auto">
                  <mpath href="#f1-track" />
                </animateMotion>
              </circle>
            </svg>
          </div>
        ))}
      </div>

      {/* Leyenda */}
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-hair pt-2.5">
        {STRATEGIES.map((s, i) => (
          <span key={s.name} className="flex items-center gap-1.5 text-[9.5px] leading-tight text-fg-muted">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: SWATCHES[i] }} aria-hidden />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export function F1Mockup() {
  return (
    <MockupFrame title="Strategy simulation" context="random forest · delta to base pace" status="status: 0.73s MAE" tone={TERRA}>
      {/* Métricas — la lección del proyecto */}
      <div className="grid grid-cols-2 border border-ink">
        <div className="border-r border-ink bg-surface px-4 py-3">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-fg-faint">v1 — mean lap time by compound</p>
          <p className="mt-1.5 font-mono text-[24px] tabular-nums leading-none text-fg-muted">3.49s</p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-fg-faint">MAE · doesn't generalize</p>
        </div>
        <div className="bg-ink px-4 py-3">
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-[rgba(240,238,233,0.65)]">v2 — delta to circuit base pace</p>
          <p className="mt-1.5 font-mono text-[24px] tabular-nums leading-none" style={{ color: TERRA }}>0.73s</p>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[rgba(240,238,233,0.55)]">MAE · right objective</p>
        </div>
      </div>

      <div className="mt-3">
        <Track />
      </div>

      {/* Tabla de estrategias */}
      <div className="mt-3 border border-ink bg-surface">
        <div className="grid grid-cols-[1fr_0.7fr_0.6fr] gap-2 border-b border-hair px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em] text-fg-faint">
          <span>Strategy</span>
          <span className="text-right">Total time</span>
          <span className="text-right">Gap</span>
        </div>
        {STRATEGIES.map((s) => (
          <div
            key={s.name}
            className={`grid grid-cols-[1fr_0.7fr_0.6fr] items-center gap-2 border-b border-hair px-3 py-1.5 last:border-b-0 ${s.best ? 'bg-[rgba(193,102,61,0.08)]' : ''}`}
          >
            <span className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] text-ink">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: s.name[0] === 'O' ? SWATCHES[0] : undefined }} aria-hidden />
              <span className="truncate">{s.name}</span>
              {s.best && (
                <span className="ml-1 shrink-0 bg-[#C1663D] px-1 py-[1px] font-mono text-[7.5px] uppercase tracking-[0.08em] text-[#F0EEE9]">BEST</span>
              )}
            </span>
            <span className="text-right font-mono text-[10px] tabular-nums text-fg-muted">{s.mins}</span>
            <span className={`text-right font-mono text-[10px] tabular-nums ${s.best ? 'font-semibold text-ink' : 'text-fg-muted'}`}>{s.gap}</span>
          </div>
        ))}
      </div>
    </MockupFrame>
  )
}
