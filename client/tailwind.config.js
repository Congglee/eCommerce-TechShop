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
        "main-600": "#1c1d1d",
        "main-700": "#ebebeb",
        "main-800": "#151515",
      },

      keyframes: {
        "show-up": {
          "0%": {
            bottom: "-40px;",
            opacity: "0;",
            visibility: "hidden;",
          },
          "100%": {
            bottom: "-10px;",
            opacity: "1;",
            visibility: "visible;",
          },
        },
      },

      animation: {
        "show-up": "show-up 0.3s ease both",
      },
    },
  },
  plugins: [tailwindcss_forms],
};
