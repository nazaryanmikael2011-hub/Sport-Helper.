/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          neon: '#00FF85',
          green: '#10B981',
          lime: '#84CC16',
          orange: '#FF5E00',
          amber: '#F59E0B',
          dark: '#0A0A0C',
          card: '#121217',
          surface: '#18181F',
          border: '#272732',
          muted: '#8E8EA0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon-green': '0 0 25px -5px rgba(0, 255, 133, 0.45)',
        'neon-orange': '0 0 25px -5px rgba(255, 94, 0, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
