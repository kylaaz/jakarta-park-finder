import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config & { daisyui: import('daisyui').Config }} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...themes['light'],
          primary: '#385a41',
          'primary-content': '#fff',
        },
      },
    ],
  },
};
