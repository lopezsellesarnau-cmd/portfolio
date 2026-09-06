'use client'

/**
 * Exploded-stack blueprint — the work drawn as isometric plates floating apart,
 * one callout per layer (ref image 1). Thin monochrome strokes, a central
 * dashed guide. Each callout links to `#slug`; the Work section listens for the
 * hash and opens that project's panel. Mobile falls back to a plain list.
 */

import { MockupFrame } from './mockups/frame'
import type { StackLayer } from './copy'

const COS = 0.8660254
const SIN = 0.5
const W = 264
const D = 156
const CX = 448
const CY = 286
const STROKE = 'rgba(20,19,16,0.55)'
const FAINT = 'rgba(20,19,16,0.30)'

/** callout anchors — symmetric 40px clear of each plate corner */
const AX_LEFT = 273
const AX_RIGHT = 717

export function ExplodedStack({
  code,
  layers,
  status = 'the work',
}: {
  code: string
  layers: StackLayer[]
  status?: string
}) {
  const n = layers.length
  const gap = n >= 5 ? 70 : 88
  const topH = (n - 1) * gap

  const P = (px: number, pz: number, h: number): [number, number] => [
    CX + (px - pz) * COS,
    CY + (px + pz) * SIN - h,
  ]

  const plate = (h: number) => {
    const a = P(0, 0, h)
    const b = P(W, 0, h)
    const c = P(W, D, h)
    const d = P(0, D, h)
    return `M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]} L${d[0]},${d[1]} Z`
  }

  const wrap = (s: string, max = 30): string[] => {
    const words = s.split(' ')
    const lines: string[] = []
    let cur = ''
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > max) {
        if (cur) lines.push(cur)
        cur = w
      } else {
        cur = (cur + ' ' + w).trim()
      }
    }
    if (cur) lines.push(cur)
    return lines
  }

  function Texture({ kind, h }: { kind: StackLayer['texture']; h: number }) {
    if (kind === 'grid') {
      const dots = []
      for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++) {
          const [x, y] = P(W / 2 - 28 + i * 8, D / 2 - 28 + j * 8, h)
          dots.push(<circle key={`${i}-${j}`} cx={x} cy={y} r={1} fill="rgba(20,19,16,0.45)" />)
        }
      return <g aria-hidden>{dots}</g>
    }
    if (kind === 'dots') {
      const dots = []
      for (let px = 20; px < W; px += 28)
        for (let pz = 18; pz < D; pz += 24) {
          const [x, y] = P(px, pz, h)
          dots.push(<circle key={`${px}-${pz}`} cx={x} cy={y} r={1.1} fill="rgba(20,19,16,0.24)" />)
        }
      return <g aria-hidden>{dots}</g>
    }
    if (kind === 'pins') {
      const seg = []
      for (let t = 0.07; t < 1; t += 0.08) {
        const [rx, ry] = P(W, t * D, h)
        seg.push(<line key={`r${t}`} x1={rx} y1={ry} x2={rx + 3} y2={ry + 14} stroke={FAINT} strokeWidth={1} />)
        const [lx, ly] = P(t * W, D, h)
        seg.push(<line key={`l${t}`} x1={lx} y1={ly} x2={lx - 3} y2={ly + 14} stroke={FAINT} strokeWidth={1} />)
      }
      return <g aria-hidden>{seg}</g>
    }
    return null
  }

  const topPt = P(W / 2, D / 2, topH)
  const botPt = P(W / 2, D / 2, 0)
  // frame the whole drawing: highest plate vertex → lowest of (bottom plate
  // vertex + pins, deepest callout label)
  const vbTop = CY - topH - 34
  const vbBottom = Math.max(
    P(W, D, 0)[1] + 22, // bottom plate lowest point + pins
    P(W, 0, 0)[1] + 58, // deepest right-side label (~3 lines)
    P(0, D, 0)[1] + 58, // deepest left-side label
  )
  const vbH = vbBottom - vbTop

  return (
    <MockupFrame title={code} status={status}>
      {/* Mobile — plain list */}
      <ol className="space-y-5 sm:hidden">
        {layers.map((l, i) => {
          const inner = (
            <>
              <p className="text-[14px] font-medium text-ink">{l.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{l.desc}</p>
            </>
          )
          return (
            <li
              key={l.label}
              className="tree-node border-l border-rule pl-4"
              style={{ animationDelay: `${150 + i * 100}ms` }}
            >
              {l.href ? <a href={l.href}>{inner}</a> : inner}
            </li>
          )
        })}
      </ol>

      {/* Desktop — isometric blueprint */}
      <svg
        viewBox={`0 ${Math.round(vbTop)} 1000 ${Math.round(vbH)}`}
        className="mx-auto hidden h-auto w-full max-w-[900px] sm:block"
        role="img"
        aria-label={`${code} — exploded, ${n} layers`}
      >
        <line
          x1={topPt[0]}
          y1={topPt[1] - 16}
          x2={botPt[0]}
          y2={botPt[1] + 24}
          stroke="rgba(20,19,16,0.16)"
          strokeWidth={1}
          strokeDasharray="2 5"
        />

        {layers
          .map((l, i) => ({ l, i }))
          .reverse()
          .map(({ l, i }, order) => {
            const h = (n - 1 - i) * gap
            const cen = P(W / 2, D / 2, h)
            return (
              <g key={l.label} className="tree-node" style={{ animationDelay: `${200 + order * 120}ms` }}>
                <path d={plate(h)} fill="none" stroke={STROKE} strokeWidth={1.1} strokeLinejoin="round" />
                <Texture kind={l.texture} h={h} />
                <circle cx={cen[0]} cy={cen[1]} r={1.5} fill={FAINT} />
                {i === 0 && (
                  <>
                    <path
                      d={`M${P(22, 20, h)[0] - 7},${P(22, 20, h)[1]} l8,-4 l0,8 Z`}
                      fill="none"
                      stroke={FAINT}
                      strokeWidth={1}
                    />
                    <circle cx={P(W - 20, 16, h)[0]} cy={P(W - 20, 16, h)[1]} r={2} fill="none" stroke={FAINT} />
                  </>
                )}
              </g>
            )
          })}

        {layers.map((l, i) => {
          const h = (n - 1 - i) * gap
          const left = l.side === 'left'
          const vtx = left ? P(0, D, h) : P(W, 0, h)
          const ax = left ? AX_LEFT : AX_RIGHT
          const leadEnd = left ? ax + 14 : ax - 14
          const lines = wrap(l.desc, 32)
          const labelText = (
            <text x={ax} y={vtx[1]} textAnchor={left ? 'end' : 'start'}>
              <tspan
                className="stack-term"
                fontSize={14.5}
                fontWeight={500}
                fill="#141310"
                style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
              >
                {l.label}
                {l.href ? '  ↗' : ''}
              </tspan>
              {lines.map((ln, k) => (
                <tspan
                  key={k}
                  x={ax}
                  dy={k === 0 ? 20 : 16}
                  fontSize={12.5}
                  fill="rgba(20,19,16,0.55)"
                  style={{ fontFamily: '-apple-system, system-ui, sans-serif' }}
                >
                  {ln}
                </tspan>
              ))}
            </text>
          )
          return (
            <g key={l.label} className="tree-node" style={{ animationDelay: `${420 + i * 100}ms` }}>
              <line x1={vtx[0]} y1={vtx[1]} x2={leadEnd} y2={vtx[1]} stroke="rgba(20,19,16,0.28)" strokeWidth={1} />
              <circle cx={vtx[0]} cy={vtx[1]} r={1.8} fill="rgba(20,19,16,0.42)" />
              {l.href ? (
                <a href={l.href} className="stack-label">
                  {labelText}
                </a>
              ) : (
                labelText
              )}
            </g>
          )
        })}
      </svg>
    </MockupFrame>
  )
}
