import type { Metadata, Viewport } from 'next'
import { Newsreader } from 'next/font/google'
import './globals.css'

const serif = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Georgia', 'ui-serif', 'serif'],
  adjustFontFallback: false,
})

const TITLE = 'Arnau Lopez — Product Engineer · Full-stack'
const DESCRIPTION =
  'I design the interface and write the software. Passionate about tech, architecture, geopolitics, and shipping real products — not prototypes. TRACE is live on the App Store in the US; Kiblo is in App Store review for the US and Canada; Dross is a notarized Mac app; Aithority is EU AI Act compliance (technical cofounder). Based in Alcoy; Netherlands and Germany; UK if sponsored. Deutsche Post / DHL, Paderborn.'

export const metadata: Metadata = {
  metadataBase: new URL('https://arnau-lopez.com'),
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://arnau-lopez.com',
    siteName: 'Arnau Lopez',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = { themeColor: '#FCFCFB', colorScheme: 'light' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={serif.variable}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
