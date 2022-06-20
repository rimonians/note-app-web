/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6419E6",
          dark: "#222222",
          secondary: "#4b5563",
          accent: "#1FB2A6",
          neutral: "#191D24",
          "base-100": "#f3f4f6",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
