/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        custom: '#d3d4d7',
      },
      colors: {
        primary: '#f9684bed',
      },
      borderColor: {},
      outlineColor: {
        custom: '#d3d4d7',
      },
      height: {
        content: 'calc(100vh - 5rem)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
    // {
    //   mytheme: {
    //     // primary: '#5270CC',
    //     primary: '#f94b5ced',
    //     'primary-content': '#ffffff',
    //     white: '#fff',
    //   },
    // },
    // ],
  },
};
