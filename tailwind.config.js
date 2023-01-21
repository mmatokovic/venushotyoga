/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      backgroundImage: {
        'mandala-pattern': "url('/images/vectors/mandala.svg')",
      },
      fontFamily: {
        'architects-daughter': ['Architects Daughter', 'cursive'],
        'comfortaa': ['Comfortaa', 'cursive'],
      },
      colors: {
        'krem': '#c79449;',
      },
    }
  },
  plugins: [],
}