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
    themeColor?.setAttribute("content", isDark ? "#211a16" : "#f2efe7");
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

function initializeCarousel() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll<HTMLElement>("[data-hero-slide]"));
  const links = Array.from(hero.querySelectorAll<HTMLAnchorElement>("[data-chapter-preview]"));
  const toggle = hero.querySelector<HTMLButtonElement>("[data-carousel-toggle]");
  const toggleLabel = toggle?.querySelector<HTMLElement>("[data-carousel-toggle-label]");
  const toggleMark = toggle?.querySelector<HTMLElement>(".carousel-toggle__mark");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const duration = Number(hero.dataset.cycleDuration || "7000");

  let active = 0;
  let timer: number | undefined;
  let userPaused = reducedMotion.matches;
  let interactionPaused = false;

  hero.style.setProperty("--cycle-duration", `${duration}ms`);

  const setActive = (index: number) => {
    active = (index + slides.length) % slides.length;
    hero.dataset.activeSlide = String(active);
    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== active));
    });
    links.forEach((link, linkIndex) => {
      link.dataset.active = String(linkIndex === active);
    });
  };

  const stopTimer = () => {
    if (timer !== undefined) window.clearInterval(timer);
    timer = undefined;
    hero.dataset.cycleState = "paused";
  };

  const startTimer = () => {
    stopTimer();
    if (userPaused || interactionPaused || reducedMotion.matches || document.hidden) return;
    hero.dataset.cycleState = "running";
    timer = window.setInterval(() => setActive(active + 1), duration);
  };

  const syncToggle = () => {
    if (!toggle || !toggleLabel || !toggleMark) return;
    const paused = userPaused || reducedMotion.matches;
    toggle.setAttribute("aria-pressed", String(paused));
    toggleLabel.textContent = paused
      ? toggle.dataset.playLabel || "Play"
      : toggle.dataset.pauseLabel || "Pause";
    toggleMark.textContent = paused ? "▶" : "Ⅱ";
  };

  links.forEach((link, index) => {
    const preview = () => {
      interactionPaused = true;
      stopTimer();
      setActive(index);
    };
    const resume = () => {
      interactionPaused = false;
      startTimer();
    };
    link.addEventListener("pointerenter", preview);
    link.addEventListener("pointerleave", resume);
    link.addEventListener("focus", preview);
    link.addEventListener("blur", resume);
  });

  toggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    syncToggle();
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
initializeCarousel();
