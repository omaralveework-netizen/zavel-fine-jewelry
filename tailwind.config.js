/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#071F17', // texture / deepest shadow
          900: '#0B2B20', // primary background
          800: '#133E31', // secondary panel background
          700: '#1B4D3D',
          600: '#245C49',
        },
        gold: {
          100: '#F8F5EE', // cream text
          300: '#E5C158', // bright metallic
          400: '#D4AF37', // core accent
          500: '#C5A059', // muted metallic
          600: '#9C7A2E', // deep gold / shadow edge
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cinzel"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        ui: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, #9C7A2E 0%, #E5C158 28%, #F8ECC9 45%, #D4AF37 62%, #9C7A2E 100%)',
        'emerald-texture':
          'radial-gradient(ellipse at 20% 0%, rgba(212,175,55,0.06), transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(212,175,55,0.05), transparent 50%), linear-gradient(180deg, #0B2B20 0%, #071F17 100%)',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212,175,55,0.35)',
        'gold-lg': '0 20px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.25)',
      },
      keyframes: {
        'lid-open': {
          '0%': { transform: 'translateY(0) rotateX(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-6%) rotateX(-12deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3.5s linear infinite',
        rise: 'rise 0.7s cubic-bezier(.16,.8,.24,1) both',
      },
    },
  },
  plugins: [],
}
