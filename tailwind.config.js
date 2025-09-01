/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#333333',
        },
        beige: {
          50: '#fefefe',
          100: '#fdfdfc',
          200: '#fafaf8',
          300: '#f8f8f6',
          400: '#f6f6f4',
          500: '#f5f5dc',
          600: '#e8e8d0',
          700: '#d4d4bc',
          800: '#c0c0a8',
          900: '#a8a890',
        },
        olive: {
          50: '#f7f8f4',
          100: '#eef0e8',
          200: '#dde2d1',
          300: '#c8d0b6',
          400: '#b0bc97',
          500: '#9aa87c',
          600: '#8a9968',
          700: '#6b8e23',
          800: '#5a7a1e',
          900: '#4a6619',
        },
        orange: {
          50: '#fdf7f0',
          100: '#faeee0',
          200: '#f4dcc0',
          300: '#ecc395',
          400: '#e3a368',
          500: '#dc8545',
          600: '#d2691e',
          700: '#b8571a',
          800: '#9e4916',
          900: '#843d13',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Source Sans Pro', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
