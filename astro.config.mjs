import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Noto Serif JP",
      cssVariable: "--font-title",
      weights: [400],
      styles: ["normal"],
      fallbacks: ["serif"],
    },
  ],
});
