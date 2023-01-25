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
        'kaki': '#E7DBC5'
      },
    }
  },
  plugins: [],
}