/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./assets/images/bg.svg')",
        bear: "url('./assets/images/bear.png')",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
