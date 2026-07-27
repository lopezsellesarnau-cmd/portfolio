'use client'

/**
 * Louvr Labs — el ranking en dos capas como árbol: las reglas deciden el
 * badge (determinista), y solo entonces entra Claude a razonar SOBRE esa
 * decisión ya tomada, no en su lugar.
 */

import { elbow, Rama, Nodo, Arista, DiagramShell, MONO } from './diagram-primitives'

const Y_ROOT = 130
const Y_SCALE = 60
const Y_PAUSE = 200
const Y_INSIGHT = 130

const PASOS_MOVIL = [
  { nivel: 'Sistema', label: 'ANUNCIO', sub: 'Meta Ads, vía OAuth', tono: 'ruta' as const },
  { nivel: 'Métrica', decision: 'CPA', label: 'BAJO UMBRAL', sub: 'CPA, CTR, frecuencia, gasto', tono: 'ok' as const },
  { nivel: 'Badge', decision: 'REGLA', label: 'BADGE: SCALE', sub: 'determinista, explicable', tono: 'ok' as const },
  { nivel: 'Insight', decision: 'RAZONA SOBRE EL RANKING', label: 'CLAUDE (SONNET)', sub: 'genera el insight, no la clasificación', tono: 'pendiente' as const },
]

export function LouvrTree() {
  return (
    <DiagramShell
      titulo="Ranking en dos capas"
      contexto="input / anuncio activo"
      estado="status: badge asignado"
      params={[
        { k: 'NODES', v: '6', fill: 0.4 },
        { k: 'DEPTH', v: '3', fill: 0.35 },
        { k: 'BADGES', v: '4', fill: 0.5 },
        { k: 'SEÑALES', v: '4', fill: 0.4 },
      ]}
      metricas={[
        { k: 'ARQUITECTURA', v: '2 CAPAS' },
        { k: 'CAPA 1', v: 'REGLAS' },
        { k: 'CAPA 2', v: 'CLAUDE', acento: true },
      ]}
      barras={[
        { k: 'SEÑALES POR ANUNCIO', v: 4, max: 4 },
        { k: 'INTERVENCIÓN MANUAL', v: 0, max: 1 },
      ]}
      nota="El badge sale de umbrales, no de un LLM — es la parte que tiene que ser auditable. El LLM se reserva para explicar el patrón, no para decidir."
    >
      <div className="lg:hidden">
        {PASOS_MOVIL.map((p, i) => (
          <div key={p.label} className="tree-node" style={{ animationDelay: `${300 + i * 400}ms` }}>
            {p.decision && (
              <div className="ml-[3px] flex items-center gap-2 py-1.5">
                <span className="h-6 w-px bg-hair" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">{p.decision}</span>
              </div>
            )}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">{p.nivel}</p>
            <p
              className="mt-1 flex items-center gap-2 font-mono text-[13px] tracking-[0.05em]"
              style={{ color: p.tono === 'pendiente' ? '#C1663D' : '#151412' }}
            >
              <span className="h-[7px] w-[7px] shrink-0" style={{ backgroundColor: p.tono === 'pendiente' ? '#C1663D' : '#151412' }} aria-hidden />
              {p.label}
            </p>
            {p.sub && <p className="ml-[15px] font-mono text-[11px] text-fg-muted">{p.sub}</p>}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 760 260" className="hidden w-full min-w-[620px] lg:block" role="img" aria-label="Árbol de decisión del ranking de Louvr Labs">
        <g aria-hidden>
          {[
            { x: 20, t: 'Sistema' },
            { x: 190, t: 'Métrica' },
            { x: 400, t: 'Badge' },
            { x: 600, t: 'Insight' },
          ].map((n) => (
            <text key={n.t} x={n.x - 11} y={22} fill="rgba(21,20,18,0.38)" fontSize="9" letterSpacing="0.18em" style={{ fontFamily: MONO }}>
              {n.t.toUpperCase()}
            </text>
          ))}
          <line x1="9" y1="34" x2="740" y2="34" stroke="rgba(21,20,18,0.14)" strokeWidth="1" />
        </g>

        <Rama d={elbow(140, Y_ROOT, 179, Y_ROOT)} delay={0} />
        <Rama d={elbow(300, Y_ROOT, 389, Y_SCALE)} delay={700} tono="ok" />
        <Rama d={elbow(300, Y_ROOT, 389, Y_PAUSE)} delay={750} tono="pendiente" />
        <Rama d={elbow(470, Y_SCALE, 589, Y_INSIGHT)} delay={1400} />
        <Rama d={elbow(470, Y_PAUSE, 589, Y_INSIGHT)} delay={1450} />

        <Nodo x={20} y={Y_ROOT} label="ANUNCIO" sub="Meta Ads, vía OAuth" delay={200} />
        <Nodo x={190} y={Y_ROOT} label="CPA / CTR / FREC." sub="umbrales por cuenta" delay={800} />
        <Nodo x={400} y={Y_SCALE} label="BADGE: SCALE" sub="bajo umbral" delay={1350} tono="ok" />
        <Nodo x={400} y={Y_PAUSE} label="BADGE: PAUSE" sub="sobre umbral" delay={1400} tono="pendiente" />
        <Nodo x={600} y={Y_INSIGHT} label="CLAUDE (SONNET)" sub="razona sobre el ranking" delay={2050} tono="pendiente" />

        <Arista x={179} y={Y_ROOT} label="EVALÚA" delay={900} />
        <Arista x={389} y={Y_SCALE} label="BAJO UMBRAL" delay={1400} />
        <Arista x={389} y={Y_PAUSE} label="SOBRE UMBRAL" delay={1450} />
        <Arista x={589} y={Y_INSIGHT} label="GENERA INSIGHT" delay={2100} />
      </svg>
    </DiagramShell>
  )
}
