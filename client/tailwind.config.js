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
        parchment: {
          DEFAULT: '#FAF5EC',
          light: '#FFFDF9',
          dark: '#F1E7D6',
          border: '#E4D5BE',
        },
        indigo: {
          DEFAULT: '#1B1F3B',
          deep: '#121528',
          light: '#282E56',
        },
        terracotta: {
          DEFAULT: '#C65D3B',
          light: '#D76B49',
          dark: '#A44729',
        },
        saffron: {
          DEFAULT: '#E9A23B',
          light: '#F4BA5E',
          dark: '#C88523',
        },
        olive: {
          DEFAULT: '#5B6B3A',
          light: '#728549',
          dark: '#47542D',
        },
        ink: {
          DEFAULT: '#2B2623',
          light: '#534B45',
          muted: '#7C726A',
        },
        brass: {
          light: '#F5E6B8',
          DEFAULT: '#C5A059',
          dark: '#8C6D23',
          burnished: '#694F12',
        },
        leather: {
          light: '#8B5A3E',
          DEFAULT: '#5C3826',
          dark: '#3A2014',
        },
        wood: {
          light: '#4A2E1B',
          DEFAULT: '#2E1A0F',
          dark: '#1A0E08',
        },
        night: {
          bg: '#11131E',
          card: '#181B2B',
          cardHover: '#21253B',
          border: '#292E48',
          text: '#EDE7DC',
          muted: '#9FA5BA'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        accent: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'warm': '0 4px 20px -2px rgba(43, 38, 35, 0.08), 0 2px 6px -1px rgba(43, 38, 35, 0.04)',
        'warm-lg': '0 12px 32px -4px rgba(43, 38, 35, 0.12), 0 4px 12px -2px rgba(43, 38, 35, 0.06)',
        'arch': '0 20px 40px -10px rgba(198, 93, 59, 0.15)',
        'glow-saffron': '0 0 25px rgba(233, 162, 59, 0.35)',
        'skeuo-card': '0 6px 16px -2px rgba(43,38,35,0.18), 0 2px 6px rgba(43,38,35,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(43,38,35,0.12)',
        'skeuo-card-dark': '0 8px 24px -2px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.6)',
        'skeuo-recessed': 'inset 0 2px 5px rgba(43,38,35,0.22), inset 0 1px 2px rgba(43,38,35,0.25), 0 1px 0 rgba(255,255,255,0.7)',
        'skeuo-recessed-dark': 'inset 0 3px 6px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.06)',
        'skeuo-btn': '0 4px 6px -1px rgba(43,38,35,0.25), 0 2px 4px -1px rgba(43,38,35,0.15), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -2px 0 rgba(0,0,0,0.35)',
        'skeuo-btn-pressed': 'inset 0 3px 6px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.4)',
        'skeuo-plaque': '0 10px 30px -5px rgba(27,31,59,0.35), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.5)',
        'skeuo-wax': '0 4px 10px rgba(198,93,59,0.4), inset 0 2px 3px rgba(255,255,255,0.4), inset 0 -2px 3px rgba(0,0,0,0.4)'
      },
      borderRadius: {
        'arch': '4rem 4rem 1rem 1rem',
      }
    },
  },
  plugins: [],
}
