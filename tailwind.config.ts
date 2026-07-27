import type { Config } from 'tailwindcss'

/**
 * Mismo lenguaje visual que ya usan StackD y el /lab de Aithority (fondo
 * hueso, tinta, acento terracota, IBM Plex Mono como etiquetado) — es la
 * identidad que Arnau ya tiene validada en sus propias superficies, no un
 * calco de otra marca. Aquí se acentúa el lado "panel técnico": más
 * hairlines, más datos en vitrina, menos foto de producto genérica.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F0EEE9',
        surface: '#FFFFFF',
        raised: '#F7F5F0',
        ink: '#151412',
        accent: {
          DEFAULT: '#C1663D',
          hover: '#B85A33',
          soft: 'rgba(193,102,61,0.12)',
        },
        ok: '#3F7A4E',
        fg: {
          DEFAULT: '#151412',
          muted: 'rgba(21,20,18,0.72)',
          dim: 'rgba(21,20,18,0.55)',
          faint: 'rgba(21,20,18,0.45)',
          ghost: 'rgba(21,20,18,0.3)',
        },
      },
      borderColor: {
        line: 'rgba(21,20,18,0.16)',
        hair: 'rgba(21,20,18,0.1)',
      },
      letterSpacing: {
        display: '-0.022em',
        body: '-0.011em',
      },
      fontWeight: {
        display: '510',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        glow: 'radial-gradient(70% 60% at 50% -10%, rgba(193,102,61,0.14) 0%, rgba(240,238,233,0) 70%)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
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
