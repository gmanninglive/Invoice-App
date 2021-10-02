module.exports = {
  mode: 'jit',
  purge: ['./pages/**/**/*.{js,ts,jsx,tsx}', './components/**/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {dropShadow: {
      'purple': '0 20px 20px rgba(100, 0, 100, .2) ',
  },},
  },
  variants: {
    extend: {
      
        transitionDuration: {
         '2000': '2000ms',
        },
     transitionTimingFunction: ['hover', 'focus'],
    }
  },
  plugins: [],
}
