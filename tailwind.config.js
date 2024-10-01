/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens:{
        'xsm': '359px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xlg': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [],
}

