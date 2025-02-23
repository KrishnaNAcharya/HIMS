/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // or 'media' if you want to follow system preferences
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f0f', // Deep dark background color
        'glass-light': 'rgba(255, 255, 255, 0.1)', // Light transparency for glass effect
        'glass-dark': 'rgba(0, 0, 0, 0.3)', // Dark transparency for glass effect
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      animation: {
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { 
            opacity: 0,
            transform: 'scale(0)',
          },
          '50%': { 
            opacity: 1,
            transform: 'scale(1)',
          }
        },
      },
    },
  },
  safelist: [
    'animate-sparkle',
    'text-blue-400',
    'dark:text-white',
    'animate-spin'
  ],
  plugins: [],
};
