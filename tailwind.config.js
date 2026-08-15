/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx}",
  ],

  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["var(--font-secondary)"],
      },
    },
  },
  plugins: [],
};
