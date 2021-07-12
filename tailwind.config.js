const defaultTheme = require("tailwindcss/defaultTheme")

/** @type{import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: ["src/{components,layouts,pages}/**/*.astro"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        display: ["Chivo", ...defaultTheme.fontFamily.sans],
        body: ["Unna", ...defaultTheme.fontFamily.serif],
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            textAlign: "justify",
            fontFamily: theme("fontFamily.body").join(", "),
            // color: theme("colors.black"),
            "h1, h2, h3, h4, h5, h6": {
              fontFamily: theme("fontFamily.display").join(", "),
              textAlign: "left",
            },
            img: {
              marginLeft: "auto",
              marginRight: "auto",
            },
            "blockquote p:first-of-type::before": null,
            "blockquote p:last-of-type::after": null,
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
