/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // media or class or false
  theme: {
    extend: {},
  },
  variants: {
    extends: {},
  },
  plugins: [],
};
