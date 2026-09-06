import type { Config } from 'tailwindcss'

/**
 * Editorial language (Sept 2026): near-white paper, ink type, rust used sparingly
 * as an accent. Serif (Newsreader) for select headings; body is the Apple system
 * stack (SF Pro) with a generic fallback. The previous "ficha técnica" style
 * (bone #F0F0F0 + hard ink borders + checker/grain) is snapshotted in the vault:
 * Portfolio/03-estilo-previo* and Portfolio/00-overview "Restyle Dross".
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFCFB',
        bg: '#FCFCFB',
        surface: '#FFFFFF',
        raised: '#F5F5F3',
        ink: '#141310',
        accent: {
          DEFAULT: '#B0413D',
          hover: '#8F332F',
          soft: 'rgba(176,65,61,0.10)',
        },
        ok: '#3F7A4E',
        fg: {
          DEFAULT: '#141310',
          muted: 'rgba(20,19,16,0.72)',
          dim: 'rgba(20,19,16,0.55)',
          faint: 'rgba(20,19,16,0.42)',
          ghost: 'rgba(20,19,16,0.28)',
        },
      },
      borderColor: {
        rule: 'rgba(20,19,16,0.10)',
        line: 'rgba(20,19,16,0.12)',
        hair: 'rgba(20,19,16,0.07)',
      },
      backgroundColor: {
        line: 'rgba(20,19,16,0.10)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Newsreader', 'Georgia', 'ui-serif', 'serif'],
      },
      letterSpacing: {
        display: '-0.012em',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}
export default config
