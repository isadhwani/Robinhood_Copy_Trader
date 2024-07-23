import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // other colors used: tailwind slate and indigo palettes
        'dark-theme': '#0D0735',
        'dark-theme-2': '#121C40', // blue-950
        'white': '#F5F5FA',
        'purple-600': '#f4d8aa',
        'purple-500': '#a941e6',
        'purple-700': '#8219c0'
      },
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
