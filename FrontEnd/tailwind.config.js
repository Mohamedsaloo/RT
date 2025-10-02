/** @type {import('tailwindcss').Config} **/

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        cairo: ['Cairo', 'sans-serif',"system-ui"],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    
  ],
}
