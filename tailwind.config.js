/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Deep Indigo
        secondary: '#059669', // Emerald Green
      },
    },
  },
  plugins: [],
}
