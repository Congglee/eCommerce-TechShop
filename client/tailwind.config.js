/** @type {import('tailwindcss').Config} */
import tailwindcss_forms from "@tailwindcss/forms";
import tailwindcss_line_clamp from "@tailwindcss/line-clamp";

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

        "show-left-up": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },

        "show-left-down": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-100%)",
          },
        },

        "show-right-up": {
          "0%": {
            transform: "translateX(100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },

        "show-right-down": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },

      animation: {
        "show-up": "show-up 0.3s ease both",
        "show-left-up": "show-left-up 0.3s linear both",
        "show-left-down": "show-left-down 0.3s linear both",

        "show-right-up": "show-right-up 0.3s linear both",
        "show-right-down": "show-right-down 0.3s linear both",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "640px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "480px" },
      // => @media (max-width: 479px) { ... }

      900: { max: "900px" },
      769: { min: "769px" },
      1120: { max: "1120px" },
    },
  },
  plugins: [tailwindcss_forms, tailwindcss_line_clamp],
};
