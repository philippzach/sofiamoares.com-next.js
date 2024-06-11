module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-aeonik)'],
        secondary: ['var(--font-officeTimes)'],
      },
      colors: {
        'prim-white': '#FAFAFA',
        'prim-grey': 'rgb(66, 66, 66)',
      },
      width: {
        customLg: 'calc(100% - 100px)',
        customSm: 'calc(100% - 24px)',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      typography: {
        lg: {
          css: {
            img: {
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 350ms ease-in',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
