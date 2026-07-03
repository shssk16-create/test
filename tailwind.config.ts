import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        thmanyah: {
          bg: '#0D0D0D',
          text: '#EDE8DC',
          accent: '#C8A96E',
          divider: 'rgba(255,255,255,0.08)'
        }
      },
      fontFamily: {
        display: ['var(--font-scheherazade)', 'serif'],
        sans: ['var(--font-ibm-plex-sans-arabic)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        heading: ['var(--font-scheherazade)', 'serif'],
        body: ['var(--font-ibm-plex-sans-arabic)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config;
