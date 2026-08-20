import type { ImageMetadata } from "astro";
import {
  locales,
  themeSlugs,
  type LocalizedText,
  type ThemeSlug,
} from "./site";

export type GalleryPhoto = {
  id: string;
  imagePath: string;
  alt: LocalizedText;
  title?: LocalizedText;
  place?: LocalizedText;
  capturedOn?: string;
  camera?: string;
  lens?: string;
  focalLengthMm?: number;
  aperture?: number;
  shutter?: string;
  iso?: number;
  exposureCompensationEv?: string;
};

export type ResolvedGalleryPhoto = GalleryPhoto & {
  image: ImageMetadata;
};

// Keep each array in the intended viewing order. Add only sanitized public
// derivatives under /src/assets/photos/; original photographs stay outside the repo.
export const galleries: Record<ThemeSlug, readonly GalleryPhoto[]> = {
  "cloud-fuji": [],
  "kawaguchiko-festival": [],
  "tokyo-views": [],
  "tokyo-rainy-night": [],
  "kyoto-city": [],
  "northern-kyoto": [],
};

// Astro's documented dynamic-image pattern keeps local images available to
// astro:assets while allowing the data file to reference them by stable paths.
// Source: https://docs.astro.build/en/recipes/dynamically-importing-images/
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/photos/**/*.{jpeg,jpg,png}",
);

function validatePhoto(theme: ThemeSlug, photo: GalleryPhoto, ids: Set<string>) {
  if (!photo.id || ids.has(photo.id)) {
    throw new Error(`Gallery "${theme}" has a missing or duplicate photo id: "${photo.id}".`);
  }
  ids.add(photo.id);

  if (!/^[-a-z0-9]+$/.test(photo.id)) {
    throw new Error(`Gallery photo id "${photo.id}" must use lowercase letters, numbers, and hyphens.`);
  }

  if (!photo.imagePath.startsWith("/src/assets/photos/")) {
    throw new Error(`Gallery photo "${photo.id}" must use a sanitized image under /src/assets/photos/.`);
  }

  for (const locale of locales) {
    if (!photo.alt[locale]?.trim()) {
      throw new Error(`Gallery photo "${photo.id}" is missing ${locale} alternative text.`);
    }
  }
}

export async function loadGallery(theme: ThemeSlug): Promise<ResolvedGalleryPhoto[]> {
  const definitions = galleries[theme];
  const ids = new Set<string>();

  return Promise.all(
    definitions.map(async (photo) => {
      validatePhoto(theme, photo, ids);
      const loadImage = imageModules[photo.imagePath];
      if (!loadImage) {
        throw new Error(
          `Gallery photo "${photo.id}" points to "${photo.imagePath}", but that file was not found.`,
        );
      }

      const { default: image } = await loadImage();
      if (Math.max(image.width, image.height) > 2560) {
        throw new Error(`Gallery photo "${photo.id}" exceeds the 2560px public long-edge limit.`);
      }

      return { ...photo, image };
    }),
  );
}

const configuredThemes = Object.keys(galleries).sort();
const expectedThemes = [...themeSlugs].sort();
if (configuredThemes.join("|") !== expectedThemes.join("|")) {
  throw new Error("The gallery registry must contain exactly one entry for every theme slug.");
}
