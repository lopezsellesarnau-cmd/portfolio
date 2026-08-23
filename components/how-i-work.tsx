import { HOW_I_WORK, HERO_PLANT_SEED } from './copy'
import { PlantCanvas } from './plant-canvas'

/**
 * Short process strip — ink band as contrast, not a black-site cosplay.
 * Craft (plant) is supporting, not the product.
 */
export function HowIWork() {
  return (
    <section id="how" className="scroll-mt-16 bg-ink text-bg">
      <div className="checker h-2 w-full opacity-40" aria-hidden />
      <div className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{HOW_I_WORK.eyebrow}</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,4.2vw,2.6rem)] font-medium text-bg">{HOW_I_WORK.title}</h2>
            <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-bg/75">{HOW_I_WORK.lead}</p>
            <div className="relative mt-8 hidden h-[120px] overflow-hidden opacity-50 lg:block" aria-hidden>
              <PlantCanvas
                seed={HERO_PLANT_SEED}
                len={280}
                depth={4}
                anchor="center"
                fit="cover"
                color="#F0F0F0"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
            </div>
          </div>
          <ol className="space-y-0 divide-y divide-white/15 border-y border-white/15">
            {HOW_I_WORK.points.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[auto_1fr] gap-4 py-5">
                <span className="font-mono text-[10px] tabular-nums text-accent">0{i + 1}</span>
                <div>
                  <p className="text-[15px] font-medium text-bg">{p.title}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-bg/70">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
