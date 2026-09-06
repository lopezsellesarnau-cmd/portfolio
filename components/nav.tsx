'use client'

import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'How I work', href: '#how' },
  { label: 'Skills', href: '#about' },
  { label: 'CV', href: '/Arnau-Lopez-Selles-CV.pdf' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/lopezsellesarnau-cmd' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/arnau-lopez-selles/' },
  { label: 'X', href: 'https://x.com/ArnauSelles' },
]

function Icon({ name }: { name: string }) {
  const p = 'currentColor'
  if (name === 'GitHub')
    return (
      <svg width="17" height="17" viewBox="0 0 16 16" fill={p} aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
      </svg>
    )
  if (name === 'LinkedIn')
    return (
      <svg width="17" height="17" viewBox="0 0 16 16" fill={p} aria-hidden>
        <path d="M13.63 13.63h-2.37V9.9c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97v3.79H6.2V6h2.28v1.04h.03c.32-.6 1.1-1.24 2.26-1.24 2.42 0 2.87 1.59 2.87 3.66v4.17ZM3.56 4.96a1.38 1.38 0 1 1 0-2.75 1.38 1.38 0 0 1 0 2.75ZM4.75 13.63H2.37V6h2.38v7.63ZM14.82 0H1.18C.53 0 0 .52 0 1.16v13.68C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.16V1.16C16 .52 15.47 0 14.82 0Z" />
      </svg>
    )
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill={p} aria-hidden>
      <path d="M12.6 0h2.45l-5.35 6.12L16 16h-4.93l-3.86-5.05L2.79 16H.34l5.72-6.54L0 0h5.06l3.49 4.61L12.6 0Zm-.86 14.55h1.36L4.32 1.37H2.87l8.87 13.18Z" />
    </svg>
  )
}

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
        scrolled ? 'border-rule bg-paper/80 backdrop-blur' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="wide-col flex h-16 items-center justify-between gap-6">
        <a href="#top" className="display text-[19px] text-ink">
          Arnau Lopez
        </a>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex items-center gap-7">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] text-fg-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <span className="h-4 w-px bg-rule" aria-hidden />
          <div className="flex items-center gap-4">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-fg-dim transition-colors hover:text-ink"
              >
                <Icon name={s.label} />
              </a>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex h-6 w-6 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className={`h-px w-4 bg-ink transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px w-4 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-4 bg-ink transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-rule bg-paper md:hidden">
          <div className="wide-col flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[15px] text-fg-muted"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-5 border-t border-rule pt-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-fg-dim"
                >
                  <Icon name={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
