import type { Config } from "tailwindcss"
/** @type {import('tailwindcss').Config} */

const config: Config = {
  darkMode: "class", 
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "oklch(var(--background))", 
        foreground: "oklch(var(--foreground))", 
        text: "oklch(var(--text))", 
        "text-secondary": "oklch(var(--text-secondary))", 

        primary: {
          DEFAULT: "oklch(var(--primary))", 
          dark: "oklch(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))", 
          greenblue: "oklch(var(--secondary-greenblue))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          light: "oklch(var(--accent-light))", /*Amarillo claro*/
          dark: "oklch(var(--accent-dark))", /*Amarillo oscuro*/
        },
        negativo: "oklch(var(--negativo))", /*Rojo dislike*/
        positivo: "oklch(var(--positivo))", /*Verde like*/
      },
      borderRadius: {
        sm: "var(--radius-sm)", /*5px*/
        md: "var(--radius-md)", /*10px*/
        lg: "var(--radius-lg)", /*20px*/
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

export default config
