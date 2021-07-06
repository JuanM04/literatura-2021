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
      typography: theme => {
        const heading = {
          fontFamily: theme("fontFamily.display").join(", "),
          textAlign: "left",
        }

        return {
          DEFAULT: {
            css: {
              textAlign: "justify",
              fontFamily: theme("fontFamily.body").join(", "),
              color: theme("colors.black"),
              h1: heading,
              h2: heading,
              h3: heading,
              h4: heading,
              h5: heading,
              h6: heading,
            },
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
