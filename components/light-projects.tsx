import { LIGEROS } from './copy'

export function LightProjects() {
  return (
    <div className="border-t border-line py-12 sm:py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">También shippeado</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {LIGEROS.map((p) => (
          <div key={p.nombre} className="border border-line bg-surface/50 p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[16px] font-medium text-ink">{p.nombre}</p>
              <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ok">{p.estado}</span>
            </div>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-fg-muted">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-hair px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.06em] text-fg-dim"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
