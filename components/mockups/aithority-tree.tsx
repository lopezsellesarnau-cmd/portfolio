'use client'

/**
 * El "árbol de info" de Aithority: el motor de clasificación como árbol de
 * decisión ortogonal — sistema → ámbito → rol → clasificación → obligaciones.
 * El nodo es la referencia legal, la arista la decisión que llevó hasta él, y
 * el color codifica el desenlace. Es literal lo que hace el producto: razonar
 * la clasificación de forma trazable, no una caja negra. Portado del /lab.
 */

import { MockupFrame, INK, TERRA, OK } from './frame'

const LINE = 'rgba(21,20,18,0.6)'
const FAINT = 'rgba(21,20,18,0.26)'
const MONO = 'var(--font-mono, monospace)'

const elbow = (x1: number, y1: number, x2: number, y2: number) => {
  if (Math.abs(y1 - y2) < 0.5) return `M ${x1} ${y1} H ${x2}`
  const mx = x1 + (x2 - x1) * 0.42
  return `M ${x1} ${y1} H ${mx} V ${y2} H ${x2}`
}

type Tono = 'ruta' | 'cubierta' | 'pendiente' | 'descartada'
const COLOR: Record<Tono, string> = { ruta: LINE, cubierta: INK, pendiente: TERRA, descartada: FAINT }

function Rama({ d, delay, tono = 'ruta' }: { d: string; delay: number; tono?: Tono }) {
  if (tono === 'descartada')
    return <path d={d} className="tree-fade" fill="none" stroke={FAINT} strokeWidth="1.1" strokeDasharray="3 4" style={{ animationDelay: `${delay}ms` }} />
  return (
    <path d={d} className="tree-line" pathLength={1} strokeDasharray={1} strokeDashoffset={1} fill="none" stroke={COLOR[tono]} strokeWidth={tono === 'pendiente' ? 1.7 : 1.4} style={{ animationDelay: `${delay}ms` }} />
  )
}

function Nodo({ x, y, label, sub, delay, tono = 'ruta' }: { x: number; y: number; label: string; sub?: string; delay: number; tono?: Tono }) {
  const dim = tono === 'descartada'
  const color = dim ? FAINT : tono === 'pendiente' ? TERRA : INK
  return (
    <g className="tree-node" style={{ animationDelay: `${delay}ms` }}>
      <rect x={x - 11} y={y - 3.5} width={7} height={7} fill={dim ? 'none' : color} stroke={color} strokeWidth="1.2" />
      <text x={x} y={y + 4} fill={color} fontSize="11" letterSpacing="0.05em" style={{ fontFamily: MONO }}>{label}</text>
      {sub && <text x={x} y={y + 17} fill={dim ? FAINT : 'rgba(21,20,18,0.45)'} fontSize="9" letterSpacing="0.06em" style={{ fontFamily: MONO }}>{sub}</text>}
    </g>
  )
}

function Arista({ x, y, label, delay, dim = false }: { x: number; y: number; label: string; delay: number; dim?: boolean }) {
  return (
    <text className="tree-node" x={x} y={y - 7} textAnchor="end" fill={dim ? FAINT : 'rgba(21,20,18,0.5)'} fontSize="8.5" letterSpacing="0.13em" style={{ fontFamily: MONO, animationDelay: `${delay}ms` }}>
      {label}
    </text>
  )
}

function Bloques({ x, y, filled, max = 6, delay }: { x: number; y: number; filled: number; max?: number; delay: number }) {
  return (
    <g>
      {Array.from({ length: max }).map((_, i) => (
        <rect key={i} className="tree-node" x={x + i * 11} y={y - 4} width={8} height={8} fill={i < filled ? INK : 'none'} stroke={i < filled ? INK : 'rgba(21,20,18,0.28)'} strokeWidth="1" style={{ animationDelay: `${delay + i * 55}ms` }} />
      ))}
    </g>
  )
}

const OBLIG = [
  { art: 'Art. 11', sub: 'Ficha técnica', tono: 'cubierta' as Tono, ev: 5, evmax: 6 },
  { art: 'Art. 14', sub: 'Supervisión humana', tono: 'pendiente' as Tono, ev: 2, evmax: 6 },
  { art: 'Art. 12', sub: 'Registro de eventos', tono: 'pendiente' as Tono, ev: 1, evmax: 6 },
  { art: 'Art. 26', sub: 'Informar a las personas', tono: 'cubierta' as Tono, ev: 6, evmax: 6 },
]
const ART_Y = [70, 130, 190, 250]

const PASOS = [
  { nivel: 'Sistema', label: 'CRIBADO DE CV', sub: 'RRHH · Workday', tono: 'ruta' as Tono },
  { nivel: 'Ámbito', decision: 'ES IA', label: 'ART. 3(1)', sub: 'definición de IA', tono: 'ruta' as Tono },
  { nivel: 'Rol', decision: 'DEPLOYER', label: 'ART. 3(4)', sub: 'usa el sistema', tono: 'ruta' as Tono },
  { nivel: 'Clasificación', decision: 'ANEXO III.4', label: 'ALTO RIESGO', sub: 'Empleo', tono: 'pendiente' as Tono },
]

export function AithorityTree() {
  return (
    <MockupFrame title="Motor de clasificación · AI Act" context="input / cribado de currículums" status="status: classified" tone={TERRA}>
      {/* Móvil — vertical */}
      <div className="lg:hidden">
        {PASOS.map((p, i) => (
          <div key={p.label} className="tree-node" style={{ animationDelay: `${300 + i * 350}ms` }}>
            {p.decision && (
              <div className="ml-[3px] flex items-center gap-2 py-1.5">
                <span className="h-6 w-px bg-hair" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted">{p.decision}</span>
              </div>
            )}
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">{p.nivel}</p>
            <p className="mt-1 flex items-center gap-2 font-mono text-[13px] tracking-[0.05em]" style={{ color: p.tono === 'pendiente' ? TERRA : INK }}>
              <span className="h-[7px] w-[7px] shrink-0" style={{ backgroundColor: p.tono === 'pendiente' ? TERRA : INK }} aria-hidden />
              {p.label}
            </p>
            {p.sub && <p className="ml-[15px] font-mono text-[11px] text-fg-muted">{p.sub}</p>}
          </div>
        ))}
        <div className="mt-5 space-y-2.5 border-t border-hair pt-4">
          {OBLIG.map((o, i) => (
            <div key={o.art} className="tree-node flex items-center justify-between gap-3" style={{ animationDelay: `${1700 + i * 130}ms` }}>
              <span className="min-w-0">
                <span className="font-mono text-[12px]" style={{ color: o.tono === 'pendiente' ? TERRA : INK }}>{o.art.toUpperCase()}</span>
                <span className="ml-2 font-mono text-[10.5px] text-fg-muted">{o.sub}</span>
              </span>
              <span className="flex shrink-0 gap-[3px]" aria-hidden>
                {Array.from({ length: o.evmax }).map((_, k) => (
                  <span key={k} className="h-[8px] w-[8px]" style={k < o.ev ? { backgroundColor: INK } : { border: '1px solid rgba(21,20,18,0.28)' }} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop — SVG */}
      <svg viewBox="0 0 780 300" className="hidden w-full min-w-[700px] lg:block" role="img" aria-label="Árbol de clasificación del AI Act: cómo se clasifica un sistema y qué obligaciones le aplican">
        <g aria-hidden>
          {[
            { x: 20, t: 'Sistema' },
            { x: 180, t: 'Ámbito' },
            { x: 340, t: 'Rol' },
            { x: 480, t: 'Clasificación' },
            { x: 640, t: 'Obligaciones' },
          ].map((n) => (
            <text key={n.t} x={n.x - 11} y={20} fill="rgba(21,20,18,0.38)" fontSize="8.5" letterSpacing="0.16em" style={{ fontFamily: MONO }}>{n.t.toUpperCase()}</text>
          ))}
          <line x1="9" y1="32" x2="770" y2="32" stroke="rgba(21,20,18,0.14)" strokeWidth="1" />
        </g>

        {/* Ramas */}
        <Rama d={elbow(112, 160, 169, 160)} delay={0} />
        <Rama d={elbow(250, 160, 329, 90)} delay={700} tono="descartada" />
        <Rama d={elbow(250, 160, 329, 200)} delay={700} />
        <Rama d={elbow(400, 200, 469, 160)} delay={1300} />
        {OBLIG.map((o, i) => (
          <Rama key={o.art} d={elbow(560, 160, 629, ART_Y[i])} delay={2000 + i * 90} tono={o.tono} />
        ))}

        {/* Nodos */}
        <Nodo x={20} y={160} label="CRIBADO DE CV" sub="RRHH · Workday" delay={200} />
        <Nodo x={180} y={160} label="ART. 3(1)" sub="definición de IA" delay={800} />
        <Nodo x={340} y={90} label="ART. 25" sub="proveedor — no procede" delay={1350} tono="descartada" />
        <Nodo x={340} y={200} label="ART. 3(4)" sub="usa el sistema" delay={1450} />
        <Nodo x={480} y={160} label="ALTO RIESGO" sub="Empleo" delay={1900} tono="pendiente" />

        {/* Aristas */}
        <Arista x={169} y={160} label="ES IA" delay={900} />
        <Arista x={329} y={90} label="PROVEEDOR" delay={1400} dim />
        <Arista x={329} y={200} label="DEPLOYER" delay={1500} />
        <Arista x={469} y={160} label="ANEXO III.4" delay={2000} />

        {/* Obligaciones + evidencias */}
        {OBLIG.map((o, i) => (
          <g key={o.art}>
            <Nodo x={640} y={ART_Y[i]} label={o.art.toUpperCase()} sub={o.sub} delay={2500 + i * 90} tono={o.tono} />
            <Bloques x={710} y={ART_Y[i]} filled={o.ev} max={o.evmax} delay={2800 + i * 90} />
          </g>
        ))}
      </svg>
    </MockupFrame>
  )
}
