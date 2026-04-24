/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        nude: '#fdfbf7',
        blush: '#e8dcd0',
        champagne: '#d4af37',
        charcoal: '#2c2a29',
        deep: '#151413'
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
}
