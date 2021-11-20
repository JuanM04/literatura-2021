// @ts-check

/** @type {import('astro').AstroUserConfig} */
const config = {
  buildOptions: {
    site: "https://ensayos.vercel.app",
    pageUrlFormat: "directory",
  },
  devOptions: {
    trailingSlash: "always",
  },
}

export default config
