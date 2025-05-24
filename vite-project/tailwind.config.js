/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BE741E',
        secondary: '#1C1206',
        background: '#f3e7d9'
      }
    },
  },
  plugins: [],
}
