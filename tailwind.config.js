const defaultTheme = require("tailwindcss/defaultTheme");

/** @type{import("tailwindcss/tailwind-config").TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: ["{components,pages}/**/*.{ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
