const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx,vue,svelte}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: 'var(--color-primary)'
    },
    extend: {
      colors: {
        ...colors,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
