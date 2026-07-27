'use client'

/**
 * Rostry — el cobro de una liga como árbol de reparto: un destination
 * charge de Stripe Connect que se divide en dos ramas, sin que Rostry
 * tenga que sostener el dinero de nadie por el camino.
 */

import { elbow, Rama, Nodo, Arista, DiagramShell, MONO } from './diagram-primitives'

const Y_ROOT = 130
const Y_ORG = 60
const Y_PLAT = 200

const PASOS_MOVIL = [
  { nivel: 'Cobro', label: 'PAGO DE LIGA', sub: 'jugador → app', tono: 'ruta' as const },
  { nivel: 'Destino', decision: 'STRIPE CONNECT', label: 'DESTINATION CHARGE', sub: 'un único cobro, dos destinos', tono: 'ruta' as const },
  { nivel: 'Reparto', decision: '95%', label: 'ORGANIZADOR', sub: 'cuenta propia, directo', tono: 'ok' as const },
  { nivel: 'Reparto', decision: '5%', label: 'ROSTRY', sub: 'comisión de plataforma', tono: 'pendiente' as const },
]

export function RostryTree() {
  return (
    <DiagramShell
      titulo="Reparto del cobro"
      contexto="input / pago de liga"
      estado="status: build 7 · aprobada"
      params={[
        { k: 'NODES', v: '5', fill: 0.3 },
        { k: 'DEPTH', v: '2', fill: 0.25 },
        { k: 'COMISIÓN', v: '5%', fill: 0.05 },
        { k: 'ROLES', v: '2', fill: 0.2 },
      ]}
      metricas={[
        { k: 'PATRÓN', v: 'REPOSITORY' },
        { k: 'STACK', v: 'FLUTTER + FIREBASE' },
        { k: 'BUILD', v: '7 · APROBADA', acento: true },
      ]}
      barras={[
        { k: 'ITERACIONES HASTA APROBAR', v: 6, max: 7 },
        { k: 'COMISIÓN RETENIDA', v: 5, max: 100 },
      ]}
      nota="El dinero va directo al organizador; Rostry nunca lo sostiene como propio — la comisión se retiene en el mismo cobro, no en un reparto manual después."
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

      <svg viewBox="0 0 620 260" className="hidden w-full min-w-[520px] lg:block" role="img" aria-label="Árbol de reparto del cobro de Rostry">
        <g aria-hidden>
          {[
            { x: 20, t: 'Cobro' },
            { x: 220, t: 'Destino' },
            { x: 460, t: 'Reparto' },
          ].map((n) => (
            <text key={n.t} x={n.x - 11} y={22} fill="rgba(21,20,18,0.38)" fontSize="9" letterSpacing="0.18em" style={{ fontFamily: MONO }}>
              {n.t.toUpperCase()}
            </text>
          ))}
          <line x1="9" y1="34" x2="600" y2="34" stroke="rgba(21,20,18,0.14)" strokeWidth="1" />
        </g>

        <Rama d={elbow(140, Y_ROOT, 209, Y_ROOT)} delay={0} />
        <Rama d={elbow(400, Y_ROOT, 449, Y_ORG)} delay={700} tono="ok" />
        <Rama d={elbow(400, Y_ROOT, 449, Y_PLAT)} delay={750} tono="pendiente" />

        <Nodo x={20} y={Y_ROOT} label="PAGO DE LIGA" sub="jugador → app" delay={200} />
        <Nodo x={220} y={Y_ROOT} label="DESTINATION CHARGE" sub="Stripe Connect" delay={800} />
        <Nodo x={460} y={Y_ORG} label="ORGANIZADOR" sub="cuenta propia, directo" delay={1350} tono="ok" />
        <Nodo x={460} y={Y_PLAT} label="ROSTRY" sub="comisión de plataforma" delay={1400} tono="pendiente" />

        <Arista x={209} y={Y_ROOT} label="UN SOLO COBRO" delay={900} />
        <Arista x={449} y={Y_ORG} label="95%" delay={1400} />
        <Arista x={449} y={Y_PLAT} label="5%" delay={1450} />
      </svg>
    </DiagramShell>
  )
}
