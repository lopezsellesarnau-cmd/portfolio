import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Newsreader } from 'next/font/google'
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

const TITLE = 'Arnau Lopez — Software Developer · Full-Stack · UX/UI'
const DESCRIPTION =
  'Junior full-stack software developer with a design background. Cofounded and developed Aithority (EU AI Act compliance). Kiblo is live on the App Store in the US and Canada. Dross is a notarized Mac app. F1 Strategy Agent and Dev Job Tracker EU are open source. Based in Alcoy, Spain. EU citizen, open to relocation.'

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mono',
})

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
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
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
