import type { Config } from 'tailwindcss'

/**
 * Dross / ficha técnica (Theme.swift): bone, ink, rust. Previous mint +
 * terracotta is snapshotted in vault Portfolio/03-estilo-previo-mint-terracotta.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F0F0F0',
        surface: '#FFFFFF',
        raised: '#F0F0F0',
        ink: '#111111',
        accent: {
          DEFAULT: '#B8433F',
          hover: '#A33C38',
          soft: 'rgba(184,67,63,0.12)',
        },
        ok: '#3F7A4E',
        fg: {
          DEFAULT: '#111111',
          muted: 'rgba(17,17,17,0.72)',
          dim: 'rgba(17,17,17,0.55)',
          faint: 'rgba(17,17,17,0.45)',
          ghost: 'rgba(17,17,17,0.3)',
        },
      },
      borderColor: {
        line: 'rgba(17,17,17,0.22)',
        hair: 'rgba(17,17,17,0.14)',
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
        glow: 'radial-gradient(70% 60% at 50% -10%, rgba(184,67,63,0.12) 0%, rgba(240,240,240,0) 70%)',
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
