/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#0866FF',  // Định nghĩa màu xanh tùy chỉnh
        customGreen: '#10B981', // Định nghĩa màu xanh lá tùy chỉnh
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
}


