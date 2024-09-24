/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderColor: {
        custom: '#d3d4d7',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: '#5270CC',
          primary: '#f94b5ced',
          'primary-content': '#ffffff',
          white: '#fff',
        },
      },
    ],
  },
};
