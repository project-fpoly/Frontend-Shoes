/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'tablet': {'max': '639px'},   // up to 639px
        'laptop': {'max': '1023px'},  // up to 1023px
        'desktop': {'max': '1279px'}, // up to 1279px
      },
    },
  },
  plugins: [],
}
