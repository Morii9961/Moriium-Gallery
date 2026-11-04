// Inert templates keep hidden pictures out of the browser's request queue.
export function hydratePicture(container: HTMLElement) {
  const template = container.querySelector<HTMLTemplateElement>("template[data-deferred-picture]");
  if (template) template.replaceWith(template.content);
  return container.querySelector<HTMLImageElement>("img");
}
