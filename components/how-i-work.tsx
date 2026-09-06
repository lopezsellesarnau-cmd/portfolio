import { HOW_I_WORK } from './copy'
import { CropMarks } from './crop-frame'

export function HowIWork() {
  return (
    <section id="how" className="crop-frame relative scroll-mt-20 py-20 sm:py-28">
      <CropMarks />
      <div className="wide-col">
        <span className="pill-tag">{HOW_I_WORK.eyebrow}</span>
        <h2 className="display mt-5 max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
          {HOW_I_WORK.title}
        </h2>
        <p className="mt-5 max-w-[58ch] text-[18px] leading-relaxed text-fg-muted">{HOW_I_WORK.lead}</p>

        <div className="mt-14 space-y-10">
          {HOW_I_WORK.points.map((p, i) => (
            <div key={p.title} className="grid gap-2 md:grid-cols-[3rem_1fr] md:gap-6">
              <span className="display text-[15px] text-accent tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="text-[16px] font-medium text-ink">{p.title}</p>
                <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
