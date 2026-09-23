import { EDUCATION } from './copy'

/**
 * Same register as Credentials: plain, terse, name/detail/date — no diploma
 * graphics. Sits next to Credentials so a reader gets school + courses in
 * one pass.
 */
export function EducationSection() {
  return (
    <section className="border-t border-line py-10 sm:py-14">
      <div className="container-page">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">Education</p>
        <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2">
          {EDUCATION.map((e) => {
            const Tag = e.link ? 'a' : 'div'
            return (
              <Tag
                key={e.school}
                {...(e.link ? { href: e.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex flex-col gap-1 bg-surface px-4 py-4 transition-colors hover:bg-raised"
              >
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                  {e.school}
                  {e.link && <span className="text-fg-ghost transition-colors group-hover:text-accent" aria-hidden>↗</span>}
                </span>
                <span className="text-[13px] text-ink">{e.program}</span>
                <span className="text-[12px] text-fg-dim">{e.detail}</span>
                <span className="font-mono text-[10px] text-fg-dim">{e.date}</span>
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
