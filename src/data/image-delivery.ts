import { readFile } from "node:fs/promises";
import type { ImageOutputFormat } from "astro";
import { getConfiguredImageService, imageConfig } from "astro:assets";

// Photographs ship as AVIF with a WebP fallback; every current browser reads
// one of the two, so no JPEG copies are generated. The dev server re-encodes
// an image on every request and AVIF is slow to encode, so dev serves WebP
// alone. AVIF quality and effort are set once in astro.config.mjs.
export const photoFormats: ImageOutputFormat[] = import.meta.env.DEV ? [] : ["avif"];
export const photoFallbackFormat: ImageOutputFormat = "webp";

// "Actual size" is for looking closely, so it gets a little more quality than
// the fitted views, while staying far smaller than the source JPEG.
export const zoomImageOptions = import.meta.env.DEV
  ? { format: "webp" as const }
  : { format: "avif" as const, quality: 65 };

const placeholders = new Map<string, Promise<string>>();

// A blurred 24px copy of the photograph as a CSS image. It is inlined so the
// browser can paint it immediately, at any size, without another request; the
// SVG blur smooths the upscale, and the alpha table keeps its edges opaque.
// imagePath is the project-relative path validated by the gallery registry;
// ratio (width / height) gives the SVG the photograph's proportions, so
// `background-size: contain` places it exactly where the photograph appears.
export function blurPlaceholder(imagePath: string, ratio: number): Promise<string> {
  let placeholder = placeholders.get(imagePath);
  if (!placeholder) {
    placeholder = (async () => {
      const service = await getConfiguredImageService();
      if (!("transform" in service)) {
        throw new Error("Blur placeholders need a local image service such as Sharp.");
      }
      const input = await readFile(`${process.cwd()}${imagePath}`);
      const { data } = await service.transform(
        input,
        { src: imagePath, width: 24, format: "webp", quality: 50 },
        imageConfig,
      );
      const thumbnail = `data:image/webp;base64,${btoa(String.fromCharCode(...data))}`;
      const height = (24 / ratio).toFixed(2);
      const svg =
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 ${height}'>` +
        "<filter id='b' x='0' y='0' width='1' height='1' color-interpolation-filters='sRGB'>" +
        "<feGaussianBlur stdDeviation='1.2' edgeMode='duplicate'/>" +
        "<feComponentTransfer><feFuncA type='discrete' tableValues='1 1'/></feComponentTransfer>" +
        "</filter>" +
        `<image width='24' height='${height}' preserveAspectRatio='none' filter='url(#b)' href='${thumbnail}'/>` +
        "</svg>";
      return `url("data:image/svg+xml,${svg.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/#/g, "%23")}")`;
    })();
    placeholders.set(imagePath, placeholder);
  }
  return placeholder;
}
