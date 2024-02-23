/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom': 'linear-gradient(37deg, #e9611e, #ff874c) !important'
      },
      boxShadow: {
        'custom': '0px 2px 15px 0px rgba(255,204,112,1)',
        'signup': '0 0.5rem 5rem #00000040'
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1400px": "1400px",
        "1500px": "1500px",
        "900px": "900px",
        "800px": "800px",
        "700px": "700px",
        "600px": "600px",
        "500px": "500px",
        "400px": "400px",
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}