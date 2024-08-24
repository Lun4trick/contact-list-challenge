import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  variants: {
    extend: {
      textOpacity: ['active'],
    }
  },

  theme: {
    extend: {
      fontFamily: {
        glysa: ["Glysa", "sans-serif"],
        lexendDeca: ["LexendDeca", "sans-serif"],
      },

      opacity: {
        low: ".32",
        medium: ".56",
      },

      colors: {
        base: {
          10: "#414141",
          20: "#3C3C3C",
          30: "#373737",
          40: "#323232",
          50: "#2D2D2D",
          60: "#282828",
          70: "#232323",
          80: "#1E1E1E",
          90: "#191919",
          100: "#141414"
        }
      }
    },
  },
  plugins: [
  ],
};
export default config;
