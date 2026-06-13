/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F1ED',
        brown: '#8B7355',
        'dark-brown': '#6B5A4A',
        'rose': '#D4A5A5',
        'gold': '#C9A961',
        'charcoal': '#4A4A4A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
