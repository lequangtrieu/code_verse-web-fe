/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "fly-slow": "fly 8s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fly: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-10px, -6px)" },
        },
      },
      fontFamily: {
        heading: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
