module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {

        doctortheme: {
          primary: "#ef9273",
          secondary: "#fef9f8",
          accent: "#0d0d0d",
          neutral: "#3d4451",
          // primary: "#37cdbe",
          // secondary: "#FFA100",
          // accent: "#FF8C00",
          // neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "cupcake",
    ],
  },
  plugins: [require("daisyui"),
  function ({ addVariant }) {
    addVariant('child', '& > *');
    addVariant('child-hover', '& > *:hover');
    addVariant('xs', '@media (max-width: 639px){}');
  },
  ],
}