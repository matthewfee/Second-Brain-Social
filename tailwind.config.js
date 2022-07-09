module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // tablet
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      // laptop
      md: '768px',
      // => @media (min-width: 768px) { ... }
      // normal desktop
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      // normal desktop
      xl: '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
