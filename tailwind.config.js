/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arizonia: ["Arizonia", "cursive"],
        roboto: ["Roboto", "sans-serif"],
        lato: ["Lato"],
        Inter: ["Inter", "sistem-ui", "sans-serif"],
        sistemui: ["system-ui", "sans-serif"],
        apple: ["-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
