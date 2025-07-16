/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#14B24C",
          50: "#f0f9f4",
          100: "#dcf2e3",
          500: "#14B24C",
          600: "#119940",
          700: "#0d7a33",
        },
      },
    },
  },
  plugins: [],
};
