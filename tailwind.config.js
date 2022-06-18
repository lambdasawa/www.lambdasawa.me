module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFB86B",
          secondary: "#BF95F9",
          accent: "#BF4887",
          neutral: "#414558",
          "base-100": "#272935",
          info: "#8BE8FD",
          success: "#52FA7C",
          warning: "#F1FA89",
          error: "#FF5757",
        },
      },
    ],
  },
};
