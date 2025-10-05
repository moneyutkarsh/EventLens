/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // ✅ enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    },
  },
  plugins: [],
}

