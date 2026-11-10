import { defineConfig, fontProviders, sharpImageService } from "astro/config";

export default defineConfig({
  output: "static",
  trailingSlash: "always",
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  image: {
    // Measured on the gallery's photographs: AVIF at quality 60 matches the
    // SSIM of the WebP fallback at quality 80 for about three quarters of
    // its size, and effort 3 encodes about ten times faster than the default
    // 4 for 0.4% more bytes. Astro's image cache does not key on these
    // options, so clear node_modules/.astro/assets after changing them.
    service: sharpImageService({ avif: { quality: 60, effort: 3 } }),
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
