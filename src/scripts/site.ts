import type { ThemePreference } from "../data/site";

const THEME_KEY = "moriium-theme";
const LOCALE_KEY = "moriium-locale";

function initializeTheme() {
  const root = document.documentElement;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const buttons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]"),
  );
  const themeColor = document.querySelector<HTMLMetaElement>("[data-theme-color]");

  const readPreference = (): ThemePreference => {
    const value = root.dataset.themePreference;
    return value === "light" || value === "dark" ? value : "system";
  };

  const apply = (preference: ThemePreference, persist = false) => {
    const isDark = preference === "dark" || (preference === "system" && media.matches);
    root.dataset.themePreference = preference;
    root.dataset.theme = isDark ? "dark" : "light";
    themeColor?.setAttribute("content", isDark ? "#242526" : "#e9e3d6");
    buttons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.themeChoice === preference),
      );
    });
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, preference);
      } catch {}
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const preference = button.dataset.themeChoice as ThemePreference;
      apply(preference, true);
    });
  });

  media.addEventListener("change", () => {
    if (readPreference() === "system") apply("system");
  });

  apply(readPreference());
}

function initializeMenu() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-site-menu]");
  const openButton = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const closeButton = dialog?.querySelector<HTMLButtonElement>("[data-menu-close]");
  if (!dialog || !openButton || !closeButton) return;

  openButton.addEventListener("click", () => {
    dialog.showModal();
    document.body.dataset.menuOpen = "true";
    openButton.setAttribute("aria-expanded", "true");
    closeButton.focus();
  });

  const close = () => {
    dialog.close();
    delete document.body.dataset.menuOpen;
    openButton.setAttribute("aria-expanded", "false");
    openButton.focus();
  };

  closeButton.addEventListener("click", close);
  dialog.addEventListener("close", () => {
    delete document.body.dataset.menuOpen;
    openButton.setAttribute("aria-expanded", "false");
  });
  dialog.addEventListener("click", (event) => {
    const panel = dialog.querySelector<HTMLElement>(".menu-dialog__panel");
    if (!panel) return;
    const bounds = panel.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (outside) close();
  });
}

function initializeLanguageSwitcher() {
  const switcher = document.querySelector<HTMLDetailsElement>("[data-language-switcher]");
  const links = document.querySelectorAll<HTMLAnchorElement>("[data-locale-link]");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      const locale = link.dataset.localeLink;
      if (!locale) return;
      try {
        localStorage.setItem(LOCALE_KEY, locale);
      } catch {}
    });
  });

  if (!switcher) return;
  document.addEventListener("click", (event) => {
    if (!switcher.contains(event.target as Node)) switcher.removeAttribute("open");
  });
  switcher.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      switcher.removeAttribute("open");
      switcher.querySelector<HTMLElement>("summary")?.focus();
    }
  });
}

function initializeCarousel(carousel: HTMLElement) {
  const slides = Array.from(
    carousel.querySelectorAll<HTMLElement>("[data-carousel-slide]"),
  );
  if (slides.length === 0) return;

  const groupLinks = Array.from(
    carousel.querySelectorAll<HTMLAnchorElement>("[data-carousel-group-link]"),
  );
  const frameNumbers = Array.from(
    carousel.querySelectorAll<HTMLElement>("[data-chapter-frame-number]"),
  );
  const toggle = carousel.querySelector<HTMLButtonElement>("[data-carousel-toggle]");
  const toggleLabel = toggle?.querySelector<HTMLElement>("[data-carousel-toggle-label]");
  const pauseIcon = toggle?.querySelector<SVGElement>("[data-carousel-pause-icon]");
  const playIcon = toggle?.querySelector<SVGElement>("[data-carousel-play-icon]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration = Number(carousel.dataset.cycleDuration || "3000");

  let active = 0;
  let timer: number | undefined;
  let userPaused = reducedMotion.matches;
  let pointerPaused = false;
  let focusPaused = false;

  carousel.style.setProperty("--cycle-duration", `${duration}ms`);

  const setActive = (index: number) => {
    active = (index + slides.length) % slides.length;
    carousel.dataset.activeSlide = String(active);

    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== active));
    });

    const activeSlide = slides[active];
    const activeGroup = activeSlide.dataset.carouselGroup;

    groupLinks.forEach((link) => {
      const isActiveGroup = link.dataset.carouselGroupLink === activeGroup;
      link.dataset.active = String(isActiveGroup);
    });

    const displayIndex = String(active + 1).padStart(2, "0");
    frameNumbers.forEach((number) => {
      number.textContent = displayIndex;
    });
  };

  const stopTimer = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
    carousel.dataset.cycleState = "paused";
  };

  const startTimer = () => {
    stopTimer();
    if (userPaused || pointerPaused || focusPaused || document.hidden) return;
    carousel.dataset.cycleState = "running";
    timer = window.setInterval(() => setActive(active + 1), duration);
  };

  const syncToggle = () => {
    if (!toggle || !toggleLabel) return;
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggleLabel.textContent = userPaused
      ? toggle.dataset.playLabel || "Play"
      : toggle.dataset.pauseLabel || "Pause";
    pauseIcon?.setAttribute("data-visible", String(!userPaused));
    playIcon?.setAttribute("data-visible", String(userPaused));
  };

  groupLinks.forEach((link) => {
    const previewGroup = () => {
      const group = link.dataset.carouselGroupLink;
      const firstSlide = slides.findIndex(
        (slide) => slide.dataset.carouselGroup === group,
      );
      if (firstSlide >= 0) setActive(firstSlide);
    };
    link.addEventListener("pointerenter", previewGroup);
    link.addEventListener("focus", previewGroup);
  });

  toggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    syncToggle();
    startTimer();
  });

  carousel.addEventListener("pointerenter", () => {
    pointerPaused = true;
    startTimer();
  });
  carousel.addEventListener("pointerleave", () => {
    pointerPaused = false;
    startTimer();
  });
  carousel.addEventListener("focusin", () => {
    focusPaused = true;
    startTimer();
  });
  carousel.addEventListener("focusout", (event) => {
    if (carousel.contains(event.relatedTarget as Node | null)) return;
    focusPaused = false;
    startTimer();
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) userPaused = true;
    syncToggle();
    startTimer();
  });

  document.addEventListener("visibilitychange", startTimer);
  setActive(0);
  syncToggle();
  startTimer();
}

initializeTheme();
initializeMenu();
initializeLanguageSwitcher();
document.querySelectorAll<HTMLElement>("[data-carousel]").forEach(initializeCarousel);
