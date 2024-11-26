// tailwind.config.js
module.exports = {
   darkMode: 'class', // Enables class-based dark mode
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
    },
  },
  plugins: [
    require('tailwindcss-filters'), // For the glassmorphism blur effect
  ],
};
