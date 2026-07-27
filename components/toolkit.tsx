import { TOOLKIT } from './copy'

/**
 * Global toolkit — everything Arnau reaches for, grouped. Not tied to one
 * project: the whole surface of what he builds with, in one panel.
 */
export function Toolkit() {
  return (
    <section id="toolkit" className="scroll-mt-16 border-t border-line py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">What I build with</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,4.5vw,2.8rem)] font-medium text-ink">Toolkit</h2>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-faint">Full-stack · AI-native</p>
        </div>

        <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {TOOLKIT.map((g) => (
            <div key={g.group} className="bg-surface p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">{g.group}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <span key={it} className="border border-hair px-2 py-0.5 font-mono text-[10.5px] tracking-[0.02em] text-fg-muted">
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
