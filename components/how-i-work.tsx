import { HOW_I_WORK, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

/**
 * Same ficha as the hero: checker, grain, ink-bordered surface — not a black band.
 */
export function HowIWork() {
  return (
    <section id="how" className="grain scroll-mt-16 border-b border-line">
      <div className="checker h-3 w-full border-b border-ink" aria-hidden />
      <div className="hero-frame">
        <div className="relative border border-ink bg-surface">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-ink px-5 py-6 sm:px-7 sm:py-7 lg:border-b-0 lg:border-r">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{HOW_I_WORK.eyebrow}</p>
              <h2 className="display mt-4 text-[clamp(2rem,5vw,3.2rem)] font-medium text-ink">{HOW_I_WORK.title}</h2>
              <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-fg-muted">{HOW_I_WORK.lead}</p>
            </div>
            <div className="flex flex-col lg:self-start lg:w-full">
              <div className="grain relative h-[120px] overflow-hidden sm:h-[140px] lg:h-[160px]">
                <PlantCanvas
                  seed={HERO_PLANT_SEED}
                  len={280}
                  depth={4}
                  anchor="center"
                  fit="cover"
                  color="#111111"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />
              </div>
              <ol className="divide-y divide-ink border-t border-ink">
                {HOW_I_WORK.points.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[auto_1fr] gap-4 px-5 py-4 sm:px-6">
                    <span className="font-mono text-[10px] tabular-nums text-accent">0{i + 1}</span>
                    <div>
                      <p className="text-[15px] font-medium text-ink">{p.title}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">{p.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
