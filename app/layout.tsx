import type { Metadata, Viewport } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://arnau-lopez.com'),
  title: 'Arnau Lopez — Full-Stack AI Product Engineer',
  description:
    '22, self-taught, no degree. I build real AI products end to end — from idea to production — and understand their governance, not just their code.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://arnau-lopez.com',
    siteName: 'Arnau Lopez',
    title: 'Arnau Lopez — Full-Stack AI Product Engineer',
    description:
      '22, self-taught, no degree. I build real AI products end to end — from idea to production.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arnau Lopez — Full-Stack AI Product Engineer',
    description:
      '22, self-taught, no degree. I build real AI products end to end — from idea to production.',
  },
}

export const viewport: Viewport = { themeColor: '#FCFFF8', colorScheme: 'light' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className={inter.className}>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.12em] focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
