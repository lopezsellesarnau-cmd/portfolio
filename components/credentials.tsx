import { CREDENTIALS } from './copy'

/**
 * Small, honest — a completion badge, not a verified credential, so it's
 * listed as plain text (name/issuer/date), not dressed up with a graphic.
 * Deliberately terse: this earns its place next to the toolkit, not before it.
 */
export function Credentials() {
  return (
    <section className="border-t border-line py-10 sm:py-14">
      <div className="container-page">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">Credentials</p>
        <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {CREDENTIALS.map((c) => (
            <a
              key={c.name}
              href={c.link}
              target={c.link ? '_blank' : undefined}
              rel={c.link ? 'noopener noreferrer' : undefined}
              className="group flex flex-col gap-1 bg-surface px-4 py-4 transition-colors hover:bg-raised"
            >
              <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-fg-faint">
                {c.issuer}
                {c.link && <span className="text-fg-ghost transition-colors group-hover:text-accent" aria-hidden>↗</span>}
              </span>
              <span className="text-[13px] text-ink">{c.name}</span>
              <span className="font-mono text-[10px] text-fg-dim">{c.date}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
