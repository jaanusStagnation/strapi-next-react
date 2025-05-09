/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)'],
          mono: ['var(--font-roboto-mono)'],
          poppins: ['var(--font-poppins)'],
        },
      },
    },
    plugins: [],
  }