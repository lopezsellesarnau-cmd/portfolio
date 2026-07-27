'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Trabajo', href: '#trabajo' },
  { label: 'Aithority', href: '#aithority' },
  { label: 'Contacto', href: '#contacto' },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? 'border-line bg-bg/85 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-page flex h-14 items-center justify-between">
        <a href="#top" className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink">
          Arnau Lopez
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
          aria-expanded={open}
          className="flex h-6 w-6 flex-col items-center justify-center gap-[4px] md:hidden"
        >
          <span className={`h-px w-4 bg-ink transition-transform ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
          <span className={`h-px w-4 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-4 bg-ink transition-transform ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="container-page flex flex-col py-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hair py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-muted last:border-b-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
