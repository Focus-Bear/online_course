/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('./assets/images/bg.svg')",
        bear: "url('./assets/images/bear.png')",
      },
      fontSize: {
        sm: 'clamp(0.8rem, 0.17vw, 0.89rem)',
        base: 'clamp(1rem, 0.34vw, 1.19rem)',
        lg: 'clamp(1.25rem, 0.61vw, 1.58rem)',
        xl: 'clamp(1.56rem, 1vw, 2.11rem)',
        '2xl': 'clamp(1.95rem, 1.56vw, 2.81rem)',
        '3xl': 'clamp(2.44rem, 2.38vw, 3.75rem)',
        '4xl': 'clamp(3.05rem, 3.54vw, 5rem)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
