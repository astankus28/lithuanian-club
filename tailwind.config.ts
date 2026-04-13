import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1a2e1a',
          light: '#2d4a2d',
          dark: '#0d1a0d',
        },
        crimson: {
          DEFAULT: '#8b1a1a',
          light: '#b52525',
          dark: '#5c1010',
        },
        amber: {
          club: '#c9952a',
          light: '#e3b84a',
          dark: '#9a6e1a',
        },
        parchment: {
          DEFAULT: '#f5edd6',
          dark: '#e8d9b8',
        },
        gold: '#d4a843',
      },
      fontFamily: {
        cinzel: ['Cinzel Decorative', 'serif'],
        cinzelPlain: ['Cinzel', 'serif'],
        fell: ['"IM Fell English"', 'serif'],
      },
      backgroundImage: {
        'texture': "url('/images/texture.png')",
      },
    },
  },
  plugins: [],
};
export default config;
