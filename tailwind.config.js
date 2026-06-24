/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coffee: { 950: '#15110E', 900: '#261F1B', 800: '#3D322C' },
        stone: { 50: '#F9F8F6', 100: '#F2F0EB', 200: '#E8E4DB' },
        gold: { muted: '#A1824A', bright: '#D4AF37' }
      },
      fontFamily: {
        heading: ['"Madani Arabic"', 'sans-serif'],
        body: ['var(--font-alexandria)', 'var(--font-tajawal)', 'sans-serif'],
        sans: ['var(--font-alexandria)', 'var(--font-tajawal)', 'sans-serif'],
        alexandria: ['var(--font-alexandria)', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
