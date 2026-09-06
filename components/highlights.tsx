import { SKILLS, ABILITIES, MILESTONES } from './copy'
import { CropMarks } from './crop-frame'

/**
 * Skills · Abilities · Milestones — one section, three registers.
 * Skills: the concrete stack. Abilities: what I carry end to end.
 * Milestones: dated proof, newest first (data is already ordered).
 */
export function Highlights() {
  return (
    <section id="about" className="crop-frame relative scroll-mt-20 py-20 sm:py-28">
      <CropMarks />
      <div className="wide-col">
        <span className="pill-tag">Skills · Abilities · Milestones</span>
        <h2 className="display mt-5 max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)] text-ink">
          What I bring, and what I&rsquo;ve shipped.
        </h2>

        {/* Skills */}
        <div className="mt-14">
          <p className="eyebrow">Skills</p>
          <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((g) => (
              <div key={g.group}>
                <p className="text-[12px] uppercase tracking-[0.14em] text-fg-faint">{g.group}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{g.items.join('  ·  ')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div className="mt-16 border-t border-rule pt-14">
          <p className="eyebrow">Abilities</p>
          <div className="mt-8 space-y-8">
            {ABILITIES.map((a, i) => (
              <div key={a.title} className="grid gap-2 md:grid-cols-[3rem_1fr] md:gap-6">
                <span className="display text-[15px] text-accent tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-[16px] font-medium text-ink">{a.title}</p>
                  <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-fg-muted">{a.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-16 border-t border-rule pt-14">
          <p className="eyebrow">Milestones</p>
          <div className="mt-8 space-y-7">
            {MILESTONES.map((m) => (
              <div key={m.date + m.title} className="grid gap-1 md:grid-cols-[7rem_1fr] md:gap-6">
                <p className="text-[12px] uppercase tracking-[0.1em] text-fg-faint md:pt-1">{m.date}</p>
                <div>
                  <p className="text-[15px] font-medium text-ink">{m.title}</p>
                  {m.detail ? (
                    <p className="mt-1 max-w-[60ch] text-[14px] leading-relaxed text-fg-muted">{m.detail}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
