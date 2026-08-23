import { TOOLKIT } from './copy'

/**
 * Stack in service of the cases — not toolkit-as-identity.
 */
const GROUPS = TOOLKIT.filter((g) => g.group === 'Languages' || g.group === 'Frameworks' || g.group === 'Craft')

export function Toolkit() {
  return (
    <section id="toolkit" className="scroll-mt-16 border-t border-hair py-10 sm:py-12">
      <div className="container-page">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">Stack — used in the work above</p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-10">
          {GROUPS.map((g) => (
            <div key={g.group} className="min-w-0 flex-1">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-fg-ghost">{g.group}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-fg-muted">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
