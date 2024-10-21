/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({
    opacityValue
  }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgba(var(${variableName}))`
  }
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      textColor: {
        'color-base': withOpacity('--text-base'),
        'color-inverted': withOpacity('--text-inverted'),
        'color-unique': withOpacity('--text-unique'),
        'card-text': withOpacity('--card-text'),
      },
      backgroundColor: {
        'color-base': withOpacity('--bg-base'),
        'color-inverted': withOpacity('--bg-inverted'),
        'color-unique': withOpacity('--text-unique'),
        'card-bg': withOpacity('--card-bg'),
      },
      borderColor: {
        'color-base': withOpacity('--bg-base'),
        'color-inverted': withOpacity('--bg-inverted'),
        'color-unique': withOpacity('--text-unique'),
        'card-border': withOpacity('--card-bg'),
      }
    },
  },
  plugins: [],
}

