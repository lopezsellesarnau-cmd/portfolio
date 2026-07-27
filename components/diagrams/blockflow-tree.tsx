'use client'

/**
 * BlockFlow — el triaje de una llamada como árbol de decisión, misma
 * gramática que el motor de clasificación de Aithority: el nodo es el
 * estado, la arista es lo que dijo la persona al teléfono.
 */

import { elbow, Rama, Nodo, Arista, Bloques, DiagramShell, MONO } from './diagram-primitives'

const Y_ROOT = 130
const Y_DESCARTE = 60
const Y_URGENTE = 90
const Y_COLA = 200

const PASOS_MOVIL = [
  { nivel: 'Sistema', label: 'LLAMADA ENTRANTE', sub: 'vecino, sin guion', tono: 'ruta' as const },
  { nivel: 'Intención', decision: 'DESCRIBE', label: 'INCIDENCIA DETECTADA', sub: 'fuga / ruido / ascensor', tono: 'ruta' as const },
  { nivel: 'Urgencia', decision: 'REQUIERE ACCIÓN', label: 'URGENCIA: ALTA', sub: 'fuga activa', tono: 'pendiente' as const },
  { nivel: 'Salida', decision: 'CAMPOS COMPLETOS', label: 'TICKET CREADO', sub: 'propiedad · tipo · urgencia · resumen', tono: 'ok' as const },
]

export function BlockFlowTree() {
  return (
    <DiagramShell
      titulo="Triaje de llamada"
      contexto="input / llamada de vecino"
      estado="status: ticket creado"
      params={[
        { k: 'NODES', v: '7', fill: 0.45 },
        { k: 'DEPTH', v: '3', fill: 0.35 },
        { k: 'INTENTS', v: '5', fill: 0.3 },
        { k: 'DESCARTES', v: '1', fill: 0.15 },
      ]}
      metricas={[
        { k: 'ESTADO', v: 'SIN INTERVENCIÓN' },
        { k: 'TICKET', v: 'CREADO' },
        { k: 'RUTA', v: 'CAMINO FELIZ', acento: true },
      ]}
      barras={[
        { k: 'CAMPOS DEL TICKET', v: 4, max: 4 },
        { k: 'INTERVENCIÓN HUMANA', v: 0, max: 1 },
      ]}
      nota="Cada llamada queda triada y con ticket estructurado — el humano entra solo si la conversación no encaja en ningún patrón conocido."
    >
      {/* Móvil */}
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

      {/* Desktop */}
      <svg viewBox="0 0 760 260" className="hidden w-full min-w-[620px] lg:block" role="img" aria-label="Árbol de decisión del triaje de llamadas de BlockFlow">
        <g aria-hidden>
          {[
            { x: 20, t: 'Sistema' },
            { x: 190, t: 'Intención' },
            { x: 400, t: 'Urgencia' },
            { x: 600, t: 'Salida' },
          ].map((n) => (
            <text key={n.t} x={n.x - 11} y={22} fill="rgba(21,20,18,0.38)" fontSize="9" letterSpacing="0.18em" style={{ fontFamily: MONO }}>
              {n.t.toUpperCase()}
            </text>
          ))}
          <line x1="9" y1="34" x2="740" y2="34" stroke="rgba(21,20,18,0.14)" strokeWidth="1" />
        </g>

        <Rama d={elbow(140, Y_ROOT, 179, Y_ROOT)} delay={0} />
        <Rama d={elbow(300, Y_ROOT, 389, Y_DESCARTE)} delay={700} tono="descartada" />
        <Rama d={elbow(300, Y_ROOT, 389, Y_URGENTE)} delay={700} />
        <Rama d={elbow(470, Y_URGENTE, 589, Y_COLA)} delay={1400} tono="ok" />

        <Nodo x={20} y={Y_ROOT} label="LLAMADA ENTRANTE" sub="vecino, sin guion" delay={200} />
        <Nodo x={190} y={Y_ROOT} label="ART. INTENCIÓN" sub="clasifica el motivo" delay={800} />
        <Nodo x={400} y={Y_DESCARTE} label="SIN TICKET" sub="consulta general" delay={1350} tono="descartada" />
        <Nodo x={400} y={Y_URGENTE} label="URGENCIA: ALTA" sub="fuga activa" delay={1450} tono="pendiente" />
        <Nodo x={600} y={Y_COLA} label="TICKET CREADO" sub="propiedad · tipo · urgencia · resumen" delay={2050} tono="ok" />

        <Arista x={179} y={Y_ROOT} label="DESCRIBE" delay={900} />
        <Arista x={389} y={Y_DESCARTE} label="CONSULTA" delay={1400} dim />
        <Arista x={389} y={Y_URGENTE} label="REQUIERE ACCIÓN" delay={1500} />
        <Arista x={589} y={Y_COLA} label="CAMPOS COMPLETOS" delay={2100} />

        <Bloques x={600} y={Y_COLA + 34} filled={4} max={4} delay={2600} />
      </svg>
    </DiagramShell>
  )
}
