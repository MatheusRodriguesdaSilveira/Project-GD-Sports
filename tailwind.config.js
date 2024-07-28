/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['placeholder-shown'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.input-transparent': {
          backgroundColor: 'transparent',
        },
        '.input-focus:border-blue': {
          '&:focus': {
            borderColor: '#007BFF',
            outline: 'none',
          },
        },
        '.input-not-placeholder-shown': {
          '&:not(:placeholder-shown)': {
            backgroundColor: 'transparent',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}

