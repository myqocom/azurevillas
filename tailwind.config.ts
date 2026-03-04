import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#ede9e4',
        dark: '#170f0b',
        taupe: '#bdb4af',
        muted: '#7a6f6a',
        bg: '#e1d8cc',
        border: '#2b2a2a',
        orange: '#ff6d10',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
