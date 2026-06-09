/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
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
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
