// @ts-check

/** @type {import('astro').AstroUserConfig} */
const config = {
  buildOptions: {
    site: "https://literatura-2021.vercel.app",
    pageUrlFormat: "directory",
  },
  devOptions: {
    trailingSlash: "always",
  },
}

export default config
