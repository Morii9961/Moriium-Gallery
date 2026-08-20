type Point = { x: number; y: number };

function initializeGallery(gallery: HTMLElement) {
  const slides = Array.from(gallery.querySelectorAll<HTMLElement>("[data-gallery-photo]"));
  const infoPages = Array.from(
    gallery.querySelectorAll<HTMLElement>("[data-gallery-info-page]"),
  );
  const overviewItems = Array.from(
    gallery.querySelectorAll<HTMLElement>("[data-gallery-overview-item]"),
  );
  const single = gallery.querySelector<HTMLElement>("[data-gallery-single]");
  const stage = gallery.querySelector<HTMLElement>("[data-gallery-stage]");
  const overview = gallery.querySelector<HTMLElement>("[data-gallery-overview]");
  const overviewGrid = gallery.querySelector<HTMLElement>("[data-gallery-overview-grid]");
  const info = gallery.querySelector<HTMLElement>("[data-gallery-info]");
  const announcer = gallery.querySelector<HTMLElement>("[data-gallery-announcer]");
  const currentNumber = gallery.querySelector<HTMLElement>("[data-gallery-current]");
  const previousButton = gallery.querySelector<HTMLButtonElement>("[data-gallery-previous]");
  const nextButton = gallery.querySelector<HTMLButtonElement>("[data-gallery-next]");
  const overviewToggle = gallery.querySelector<HTMLButtonElement>(
    "[data-gallery-overview-toggle]",
  );
  const overviewLabel = gallery.querySelector<HTMLElement>("[data-gallery-overview-label]");
  const infoToggle = gallery.querySelector<HTMLButtonElement>("[data-gallery-info-toggle]");
  const infoLabel = gallery.querySelector<HTMLElement>("[data-gallery-info-label]");
  const infoClose = gallery.querySelector<HTMLButtonElement>("[data-gallery-info-close]");
  const zoomToggle = gallery.querySelector<HTMLButtonElement>("[data-gallery-zoom-toggle]");
  const zoomLabel = gallery.querySelector<HTMLElement>("[data-gallery-zoom-label]");

  if (
    slides.length === 0 ||
    !single ||
    !stage ||
    !overview ||
    !overviewGrid ||
    !info ||
    !announcer ||
    !currentNumber ||
    !previousButton ||
    !nextButton ||
    !overviewToggle ||
    !overviewLabel ||
    !infoToggle ||
    !infoLabel ||
    !infoClose ||
    !zoomToggle ||
    !zoomLabel
  ) {
    return;
  }

  const photoLabel = gallery.dataset.photoLabel || "Photograph";
  const fitLabel = gallery.dataset.fitLabel || "Fit photograph";
  const actualLabel = gallery.dataset.actualLabel || "View at actual size";
  const openOverviewLabel = gallery.dataset.openOverviewLabel || "Open overview";
  const closeOverviewLabel = gallery.dataset.closeOverviewLabel || "Close overview";
  const openInfoLabel = gallery.dataset.openInfoLabel || "Photograph information";
  const closeInfoLabel = gallery.dataset.closeInfoLabel || "Close information";

  let active = 0;
  let overviewOpen = false;
  let infoOpen = false;
  let detailMode = false;
  let scale = 1;
  let panX = 0;
  let panY = 0;
  const pointers = new Map<number, Point>();
  let gestureStart:
    | {
        count: number;
        centroid: Point;
        distance: number;
        scale: number;
        panX: number;
        panY: number;
      }
    | undefined;
  let swipeStart:
    | { id: number; x: number; y: number; time: number; pointerType: string }
    | undefined;
  let mouseFallbackStart:
    | { x: number; y: number; panX: number; panY: number }
    | undefined;

  const activeSlide = () => slides[active];
  const activeDetailImage = () =>
    activeSlide().querySelector<HTMLImageElement>("[data-gallery-detail-image]");

  const setButtonLabel = (
    button: HTMLButtonElement,
    visibleLabel: HTMLElement,
    label: string,
  ) => {
    button.setAttribute("aria-label", label);
    visibleLabel.textContent = label;
  };

  const getFitScale = () => {
    const slide = activeSlide();
    const width = Number(slide.dataset.imageWidth || "1");
    const height = Number(slide.dataset.imageHeight || "1");
    const bounds = stage.getBoundingClientRect();
    return Math.min(bounds.width / width, bounds.height / height, 1);
  };

  const clampPan = () => {
    const slide = activeSlide();
    const width = Number(slide.dataset.imageWidth || "1") * scale;
    const height = Number(slide.dataset.imageHeight || "1") * scale;
    const bounds = stage.getBoundingClientRect();
    const maxX = Math.max(0, (width - bounds.width) / 2);
    const maxY = Math.max(0, (height - bounds.height) / 2);
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
  };

  const applyTransform = () => {
    const image = activeDetailImage();
    if (!image) return;
    clampPan();
    image.style.transform =
      `translate(-50%, -50%) translate(${panX}px, ${panY}px) scale(${scale})`;
  };

  const loadDetailImage = (slide: HTMLElement) => {
    const detail = slide.querySelector<HTMLElement>("[data-gallery-detail]");
    if (!detail || detail.dataset.loaded === "true") return;

    detail.querySelectorAll<HTMLSourceElement>("source[data-detail-srcset]").forEach((source) => {
      const srcset = source.dataset.detailSrcset;
      if (srcset) source.srcset = srcset;
    });
    const image = detail.querySelector<HTMLImageElement>("[data-gallery-detail-image]");
    if (image?.dataset.detailSrc) image.src = image.dataset.detailSrc;
    detail.dataset.loaded = "true";
  };

  const syncZoomButton = () => {
    zoomToggle.setAttribute("aria-pressed", String(detailMode));
    setButtonLabel(zoomToggle, zoomLabel, detailMode ? fitLabel : actualLabel);
    gallery.dataset.zoom = detailMode ? "actual" : "fit";
  };

  const resetDetail = () => {
    const slide = activeSlide();
    const fit = slide.querySelector<HTMLElement>(".gallery-photo__fit");
    const detail = slide.querySelector<HTMLElement>("[data-gallery-detail]");
    const image = detail?.querySelector<HTMLImageElement>("[data-gallery-detail-image]");
    if (fit) fit.hidden = slide.dataset.imageError === "true";
    if (detail) detail.hidden = true;
    if (image) image.style.removeProperty("transform");
    detailMode = false;
    scale = 1;
    panX = 0;
    panY = 0;
    pointers.clear();
    gestureStart = undefined;
    mouseFallbackStart = undefined;
    syncZoomButton();
  };

  const activateDetail = () => {
    const slide = activeSlide();
    const fit = slide.querySelector<HTMLElement>(".gallery-photo__fit");
    const detail = slide.querySelector<HTMLElement>("[data-gallery-detail]");
    if (!fit || !detail) return;
    loadDetailImage(slide);
    fit.hidden = true;
    detail.hidden = false;
    detailMode = true;
    scale = 1;
    panX = 0;
    panY = 0;
    syncZoomButton();
    requestAnimationFrame(applyTransform);
  };

  const toggleDetail = () => {
    if (overviewOpen) return;
    if (detailMode) resetDetail();
    else activateDetail();
  };

  const setScaleAround = (nextScale: number, clientX: number, clientY: number) => {
    const minimum = getFitScale();
    const bounded = Math.max(minimum, Math.min(1, nextScale));
    const bounds = stage.getBoundingClientRect();
    const pointX = clientX - (bounds.left + bounds.width / 2);
    const pointY = clientY - (bounds.top + bounds.height / 2);
    const imagePointX = (pointX - panX) / scale;
    const imagePointY = (pointY - panY) / scale;
    scale = bounded;
    panX = pointX - imagePointX * scale;
    panY = pointY - imagePointY * scale;
    applyTransform();
  };

  const setInfoOpen = (open: boolean, restoreFocus = false) => {
    infoOpen = open && !overviewOpen;
    info.hidden = !infoOpen;
    infoToggle.setAttribute("aria-expanded", String(infoOpen));
    setButtonLabel(infoToggle, infoLabel, infoOpen ? closeInfoLabel : openInfoLabel);
    gallery.dataset.info = infoOpen ? "open" : "closed";
    if (!infoOpen && restoreFocus) infoToggle.focus();
  };

  const layoutOverview = () => {
    if (!overviewOpen || overviewItems.length === 0) return;
    const width = overviewGrid.clientWidth;
    if (width <= 0) return;

    const gap = width < 640 ? 8 : 12;
    const targetHeight = width < 520 ? Math.min(180, width * 0.46) : width < 960 ? 190 : 240;
    const rows: HTMLElement[][] = [];
    let row: HTMLElement[] = [];
    let ratioTotal = 0;

    overviewItems.forEach((item, index) => {
      row.push(item);
      ratioTotal += Number(item.dataset.ratio || "1");
      const projectedHeight = (width - gap * (row.length - 1)) / ratioTotal;
      const isLast = index === overviewItems.length - 1;
      if (projectedHeight <= targetHeight || isLast) {
        rows.push(row);
        row = [];
        ratioTotal = 0;
      }
    });

    const fragment = document.createDocumentFragment();
    rows.forEach((items, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.className = "gallery-overview__row";
      rowElement.setAttribute("role", "presentation");
      rowElement.style.gap = `${gap}px`;
      const isFinalRow = rowIndex === rows.length - 1;
      const totalRatio = items.reduce(
        (sum, item) => sum + Number(item.dataset.ratio || "1"),
        0,
      );
      const availableWidth = width - gap * (items.length - 1);
      const finalHeight = Math.min(targetHeight, availableWidth / totalRatio);

      items.forEach((item) => {
        const ratio = Number(item.dataset.ratio || "1");
        item.style.aspectRatio = String(ratio);
        item.style.flex = isFinalRow ? `0 0 ${finalHeight * ratio}px` : `${ratio} 1 0`;
        rowElement.append(item);
      });
      fragment.append(rowElement);
    });
    overviewGrid.replaceChildren(fragment);
  };

  const setOverviewOpen = (open: boolean, moveFocus = false) => {
    overviewOpen = open;
    if (open) {
      setInfoOpen(false);
      resetDetail();
    }
    single.hidden = open;
    overview.hidden = !open;
    gallery.dataset.view = open ? "overview" : "single";
    overviewToggle.setAttribute("aria-pressed", String(open));
    setButtonLabel(
      overviewToggle,
      overviewLabel,
      open ? closeOverviewLabel : openOverviewLabel,
    );
    infoToggle.disabled = open;
    zoomToggle.disabled = open;
    previousButton.disabled = open || slides.length === 1;
    nextButton.disabled = open || slides.length === 1;

    if (open) {
      requestAnimationFrame(() => {
        layoutOverview();
        if (moveFocus) {
          gallery
            .querySelector<HTMLButtonElement>(`[data-gallery-select="${active}"]`)
            ?.focus();
        }
      });
    } else if (moveFocus) {
      overviewToggle.focus();
    }
  };

  let preloadRequest = 0;
  const preloadAdjacent = async () => {
    if (slides.length < 2) return;
    const request = ++preloadRequest;
    const currentImage = activeSlide().querySelector<HTMLImageElement>("[data-gallery-fit-image]");
    if (currentImage) {
      await currentImage.decode().catch(() => undefined);
      if (request !== preloadRequest) return;
    }
    const indexes = [
      (active - 1 + slides.length) % slides.length,
      (active + 1) % slides.length,
    ];
    indexes.forEach((index) => {
      const image = slides[index].querySelector<HTMLImageElement>("[data-gallery-fit-image]");
      if (!image) return;
      image.loading = "eager";
      void image.decode().catch(() => undefined);
    });
  };

  const updateUrl = () => {
    const id = activeSlide().dataset.photoId;
    if (!id) return;
    const nextUrl = new URL(window.location.href);
    nextUrl.hash = encodeURIComponent(id);
    window.history.replaceState(null, "", nextUrl);
  };

  const setActive = (
    index: number,
    options: { updateUrl?: boolean; announce?: boolean } = {},
  ) => {
    if (slides.length === 0) return;
    resetDetail();
    active = (index + slides.length) % slides.length;
    gallery.dataset.activeIndex = String(active);

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === active;
      slide.hidden = !isActive;
      slide.setAttribute("aria-hidden", String(!isActive));
    });
    infoPages.forEach((page, pageIndex) => {
      page.hidden = pageIndex !== active;
    });
    gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-select]").forEach((button) => {
      if (Number(button.dataset.gallerySelect) === active) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });

    currentNumber.textContent = String(active + 1).padStart(2, "0");
    if (options.updateUrl !== false) updateUrl();
    if (options.announce !== false) {
      announcer.textContent = `${photoLabel} ${active + 1} / ${slides.length}`;
    }
    void preloadAdjacent();
  };

  const indexFromHash = () => {
    let id = "";
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return -1;
    }
    return slides.findIndex((slide) => slide.dataset.photoId === id);
  };

  previousButton.addEventListener("click", () => setActive(active - 1));
  nextButton.addEventListener("click", () => setActive(active + 1));
  overviewToggle.addEventListener("click", () => setOverviewOpen(!overviewOpen, true));
  infoToggle.addEventListener("click", () => setInfoOpen(!infoOpen));
  infoClose.addEventListener("click", () => setInfoOpen(false, true));
  zoomToggle.addEventListener("click", toggleDetail);

  gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-select]").forEach((button) => {
    button.addEventListener("click", () => {
      setActive(Number(button.dataset.gallerySelect || "0"));
      setOverviewOpen(false, true);
    });
  });

  slides.forEach((slide) => {
    const fitImage = slide.querySelector<HTMLImageElement>("[data-gallery-fit-image]");
    const detailImage = slide.querySelector<HTMLImageElement>("[data-gallery-detail-image]");
    const error = slide.querySelector<HTMLElement>("[data-gallery-image-error]");
    fitImage?.addEventListener("error", () => {
      slide.dataset.imageError = "true";
      const fitPicture = fitImage.closest<HTMLElement>(".gallery-photo__fit");
      if (fitPicture) fitPicture.hidden = true;
      if (error) error.hidden = false;
    });
    fitImage?.addEventListener("load", () => {
      delete slide.dataset.imageError;
      const fitPicture = fitImage.closest<HTMLElement>(".gallery-photo__fit");
      if (fitPicture) fitPicture.hidden = false;
      if (error) error.hidden = true;
    });
    detailImage?.addEventListener("error", () => {
      if (slide === activeSlide() && detailMode) resetDetail();
    });
  });

  const pointerGeometry = () => {
    const points = [...pointers.values()];
    const centroid = points.reduce(
      (sum, point) => ({ x: sum.x + point.x / points.length, y: sum.y + point.y / points.length }),
      { x: 0, y: 0 },
    );
    const distance =
      points.length > 1
        ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
        : 0;
    return { centroid, distance };
  };

  const beginGesture = () => {
    if (pointers.size === 0) {
      gestureStart = undefined;
      return;
    }
    const geometry = pointerGeometry();
    gestureStart = {
      count: pointers.size,
      centroid: geometry.centroid,
      distance: geometry.distance,
      scale,
      panX,
      panY,
    };
  };

  stage.addEventListener("pointerdown", (event) => {
    if (overviewOpen) return;
    if (!detailMode) {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        stage.setPointerCapture(event.pointerId);
      }
      swipeStart = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
        pointerType: event.pointerType,
      };
      return;
    }

    event.preventDefault();
    stage.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    beginGesture();
  });

  stage.addEventListener("pointermove", (event) => {
    if (!detailMode || !pointers.has(event.pointerId) || !gestureStart) return;
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const geometry = pointerGeometry();

    if (pointers.size === 1 && gestureStart.count === 1) {
      panX = gestureStart.panX + geometry.centroid.x - gestureStart.centroid.x;
      panY = gestureStart.panY + geometry.centroid.y - gestureStart.centroid.y;
      applyTransform();
      return;
    }

    if (pointers.size >= 2 && gestureStart.count >= 2 && gestureStart.distance > 0) {
      const bounds = stage.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const imagePointX =
        (gestureStart.centroid.x - centerX - gestureStart.panX) / gestureStart.scale;
      const imagePointY =
        (gestureStart.centroid.y - centerY - gestureStart.panY) / gestureStart.scale;
      scale = Math.max(
        getFitScale(),
        Math.min(1, gestureStart.scale * (geometry.distance / gestureStart.distance)),
      );
      panX = geometry.centroid.x - centerX - imagePointX * scale;
      panY = geometry.centroid.y - centerY - imagePointY * scale;
      applyTransform();
    }
  });

  const finishPointer = (event: PointerEvent) => {
    if (detailMode) {
      pointers.delete(event.pointerId);
      beginGesture();
      return;
    }

    if (!swipeStart || swipeStart.id !== event.pointerId) return;
    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    const elapsed = performance.now() - swipeStart.time;
    const threshold = Math.max(50, stage.clientWidth * 0.08);
    const isTouch = swipeStart.pointerType === "touch" || swipeStart.pointerType === "pen";
    if (
      isTouch &&
      elapsed < 700 &&
      Math.abs(deltaX) >= threshold &&
      Math.abs(deltaY) < Math.abs(deltaX) * 0.75
    ) {
      setActive(deltaX < 0 ? active + 1 : active - 1);
    }
    swipeStart = undefined;
  };

  stage.addEventListener("pointerup", finishPointer);
  stage.addEventListener("pointercancel", finishPointer);
  stage.addEventListener("dragstart", (event) => event.preventDefault());
  stage.addEventListener("mousedown", (event) => {
    if (!detailMode || pointers.size > 0) return;
    event.preventDefault();
    mouseFallbackStart = { x: event.clientX, y: event.clientY, panX, panY };
  });
  stage.addEventListener("mousemove", (event) => {
    if (!detailMode || !mouseFallbackStart || pointers.size > 0) return;
    event.preventDefault();
    panX = mouseFallbackStart.panX + event.clientX - mouseFallbackStart.x;
    panY = mouseFallbackStart.panY + event.clientY - mouseFallbackStart.y;
    applyTransform();
  });
  window.addEventListener("mouseup", () => {
    mouseFallbackStart = undefined;
  });
  stage.addEventListener("dblclick", toggleDetail);
  stage.addEventListener(
    "wheel",
    (event) => {
      if (!detailMode || overviewOpen) return;
      event.preventDefault();
      setScaleAround(scale * Math.exp(-event.deltaY * 0.0015), event.clientX, event.clientY);
    },
    { passive: false },
  );

  document.addEventListener("keydown", (event) => {
    if (document.body.dataset.menuOpen === "true") return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("dialog[open], details[open]")) return;
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "Escape") {
      if (infoOpen) setInfoOpen(false, true);
      else if (overviewOpen) setOverviewOpen(false, true);
      else if (detailMode) resetDetail();
      else return;
      event.preventDefault();
      return;
    }

    const key = event.key.toLowerCase();
    if (key === "g") setOverviewOpen(!overviewOpen, true);
    else if (key === "i" && !overviewOpen) setInfoOpen(!infoOpen, infoOpen);
    else if (key === "z" && !overviewOpen) toggleDetail();
    else if (!overviewOpen && event.key === "ArrowLeft") setActive(active - 1);
    else if (!overviewOpen && event.key === "ArrowRight") setActive(active + 1);
    else if (!overviewOpen && event.key === "Home") setActive(0);
    else if (!overviewOpen && event.key === "End") setActive(slides.length - 1);
    else return;
    event.preventDefault();
  });

  window.addEventListener("hashchange", () => {
    const index = indexFromHash();
    if (index >= 0) setActive(index, { updateUrl: false });
  });

  const resizeObserver = new ResizeObserver(() => {
    if (overviewOpen) layoutOverview();
    if (detailMode) applyTransform();
  });
  resizeObserver.observe(gallery);

  const initialIndex = indexFromHash();
  previousButton.disabled = slides.length === 1;
  nextButton.disabled = slides.length === 1;
  setInfoOpen(false);
  setOverviewOpen(false);
  setActive(initialIndex >= 0 ? initialIndex : 0, { announce: false });
}

document.querySelectorAll<HTMLElement>("[data-gallery]").forEach(initializeGallery);
