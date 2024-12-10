/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#68B984', // A fresh, natural green color
        'secondary': '#2C3333', // A muted, earthy dark color
        'blackBG': '#F5F5F5', // A light, airy background color
        'accent': '#FFA500', // An accent color, like a vibrant orange
      }
    },
    fontFamily: {
      'primary': ["Montserrat", "sans-serif"],
      'secondary': ["Nunito Sans", "sans-serif"]
    }
  },
  plugins: [],
}