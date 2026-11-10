/// <reference types="astro/client" />

// Build-time code in src/data/image-delivery.ts reads source photographs from
// disk. These are the only Node APIs it uses, declared here instead of adding
// @types/node as a dependency.
declare module "node:fs/promises" {
  export function readFile(path: string): Promise<Uint8Array>;
}
declare const process: { cwd(): string };
