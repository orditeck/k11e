/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            li: {
              marginBottom: "0.25rem",
              marginTop: "0.25rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("flowbite-typography")],
};
