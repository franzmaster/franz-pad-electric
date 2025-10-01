/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          blue: '#00D9FF',
          purple: '#B537F2',
          pink: '#FF006E',
          green: '#39FF14',
          yellow: '#FFD60A',
          cyan: '#00FFF5',
        },
        dark: {
          bg: '#0A0A0F',
          card: '#12121A',
          border: '#1F1F2E',
        },
      },
      backgroundImage: {
        'electric-gradient': 'linear-gradient(135deg, #00D9FF 0%, #B537F2 50%, #FF006E 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(0,217,255,0.3) 0%, rgba(181,55,242,0.2) 50%, rgba(255,0,110,0.1) 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0,217,255,0.6), 0 0 40px rgba(0,217,255,0.4)',
        'neon-purple': '0 0 20px rgba(181,55,242,0.6), 0 0 40px rgba(181,55,242,0.4)',
        'neon-pink': '0 0 20px rgba(255,0,110,0.6), 0 0 40px rgba(255,0,110,0.4)',
        'neon-green': '0 0 20px rgba(57,255,20,0.6), 0 0 40px rgba(57,255,20,0.4)',
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'glow': {
          'from': { textShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #B537F2' },
          'to': { textShadow: '0 0 20px #B537F2, 0 0 30px #FF006E, 0 0 40px #FF006E' },
        },
      },
    },
  },
  plugins: [],
}
