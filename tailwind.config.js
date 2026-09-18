/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1c2430",
        paper: "#f3efe6",
        moss: "#1f6b5a",
        clay: "#b4552a",
      },
    },
  },
  plugins: [],
};
