/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'mandala-pattern': "url('/images/vectors/mandala.svg')",
        'open-lotus': "url('/images/vectors/open-lotus.png')",
      },
      fontFamily: {
        'architects-daughter': ['Architects Daughter', 'cursive'],
        'comfortaa': ['Comfortaa', 'cursive'],
      },
      colors: {
        'krem': '#c79449;',
        'tamno-zeleno': '#404b48',
        'smeđa': '#454236',
        'tamno-smeđa': '#4C4039',
        'kaki': '#E7DBC5',
        primary: {
          50: "rgba(var(--color-primary-50), <alpha-value>)",
          100: "rgba(var(--color-primary-100), <alpha-value>)",
          200: "rgba(var(--color-primary-200), <alpha-value>)",
          300: "rgba(var(--color-primary-300), <alpha-value>)",
          400: "rgba(var(--color-primary-400), <alpha-value>)",
          500: "rgba(var(--color-primary-500), <alpha-value>)",
          600: "rgba(var(--color-primary-600), <alpha-value>)",
          700: "rgba(var(--color-primary-700), <alpha-value>)",
          800: "rgba(var(--color-primary-800), <alpha-value>)",
          900: "rgba(var(--color-primary-900), <alpha-value>)",
        },
      },
      css: {
        'a.active': {
          "text-decoration-color": "colors.primary.600 / 1",
        },
      }
    }
  },
  plugins: [],
}