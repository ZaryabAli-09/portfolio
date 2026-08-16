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
      colors: {
        primary: "#fbf9f4",
        secondary: "#B08968",
        highlight: "#2F6BD6",
      },
    },
  },
  plugins: [],
};
