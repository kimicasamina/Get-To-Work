/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "12804px",
      xl: "1440px",
    },
    colors: {
      primary: "#f2a811",
      primaryDark: "#eca10a",
      primaryLight: "#f8af1e",
      gray: {
        900: "#45474B",
        800: "#4e4f52",
        300: "#495E57",
        200: "#e8e8e8",
        100: "#F5F7F8",
      },
      white: "#fff",
      black: "#000",
      success: "#7bb685",
      info: "#4ea4dd",
      warning: "#f6e9b2",
      alert: "#df3737",
    },
    // spacing: {},
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      serif: ["Merriweather", "serif"],
      reddit: ["Reddit Mono", "monospace"],
      google: ["Google Sans Mono", "monospace"],
    },
    // fontSize: {},
    // fontWeight: {},
    extend: {},
  },
  plugins: [],
};
