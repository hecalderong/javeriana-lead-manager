// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        javeriana: {
          DEFAULT: '#003366',
          dark: '#002244',
        },
      },
    },
  },
  plugins: [],
}