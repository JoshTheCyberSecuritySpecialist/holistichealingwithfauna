/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f5',
          100: '#e3e7e0',
          200: '#c7d0c2',
          300: '#a3b19c',
          400: '#839079',
          500: '#62705b',
          600: '#4f5a4a',
          700: '#42493e',
          800: '#373e35',
          900: '#31362f',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};