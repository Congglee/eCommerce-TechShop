/** @type {import('tailwindcss').Config} */
import tailwindcss_forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },

      colors: {
        "main-100": "#b7b7b7",
        "main-200": "#ee3131",
        "main-300": "#1d1d1d",
        "main-400": "#0f0f0f",
        "main-500": "#505050",
      },
    },
  },
  plugins: [tailwindcss_forms],
};
