export const locales = ["zh", "ja", "en"] as const;
export type Locale = (typeof locales)[number];

export const chapterSlugs = ["fuji", "tokyo", "kyoto"] as const;
export type ChapterSlug = (typeof chapterSlugs)[number];
export type ThemePreference = "system" | "light" | "dark";

type LocalizedText = Record<Locale, string>;

export type Chapter = {
  slug: ChapterSlug;
  number: string;
  label: LocalizedText;
  menuLabel: LocalizedText;
  placeholderLabel: LocalizedText;
  placeholderDescription: LocalizedText;
  background: string;
  backgroundDark: string;
};

export const siteTitle = "森井永響の日本紀行";

export const localeNames: Record<Locale, string> = {
  zh: "中文",
  ja: "日本語",
  en: "English",
};

export const localeShortNames: Record<Locale, string> = {
  zh: "中",
  ja: "日",
  en: "EN",
};

export const htmlLanguages: Record<Locale, string> = {
  zh: "zh-CN",
  ja: "ja",
  en: "en",
};

export const copy = {
  zh: {
    intro:
      "2026年夏，从富士山麓到东京，再到京都。把旅途中驻足的光景，收进富士、东京、京都三个篇章。",
    description: "森井永響在富士、东京与京都拍摄的日本旅行摄影集。",
    menu: "菜单",
    closeMenu: "关闭菜单",
    home: "首页",
    chapters: "摄影篇章",
    external: "外部链接",
    comingSoon: "准备中",
    appearance: "外观",
    themeSystem: "跟随系统",
    themeLight: "日间",
    themeDark: "夜间",
    language: "选择语言",
    skipToContent: "跳到主要内容",
    pauseCarousel: "暂停轮播",
    playCarousel: "继续轮播",
    photographPending: "代表照片待选",
    photographsPending: "照片整理中",
    backHome: "返回首页",
    chapterPageDescription: "本篇照片正在整理，稍后将从这里进入完整摄影集。",
    copyright: "© 2026 Morii。保留全部权利。",
  },
  ja: {
    intro:
      "2026年夏、富士の麓から東京、そして京都へ。旅の途中で足を止めた光景を、三つの章に分けて収めました。",
    description: "森井永響が富士、東京、京都で撮影した日本紀行の写真集。",
    menu: "メニュー",
    closeMenu: "メニューを閉じる",
    home: "ホーム",
    chapters: "写真の章",
    external: "外部リンク",
    comingSoon: "準備中",
    appearance: "表示",
    themeSystem: "システム",
    themeLight: "昼",
    themeDark: "夜",
    language: "言語を選ぶ",
    skipToContent: "本文へ移動",
    pauseCarousel: "スライドを一時停止",
    playCarousel: "スライドを再開",
    photographPending: "代表写真を選定中",
    photographsPending: "写真を整理しています",
    backHome: "ホームへ戻る",
    chapterPageDescription: "この章の写真を整理しています。完成後、ここから写真集をご覧いただけます。",
    copyright: "© 2026 Morii。無断転載を禁じます。",
  },
  en: {
    intro:
      "In the summer of 2026, the journey led from the foothills of Fuji to Tokyo and Kyoto. The photographs are gathered here in three chapters.",
    description: "A photographic journey through Fuji, Tokyo, and Kyoto by Morii.",
    menu: "Menu",
    closeMenu: "Close menu",
    home: "Home",
    chapters: "Photographic chapters",
    external: "External links",
    comingSoon: "Coming soon",
    appearance: "Appearance",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Choose language",
    skipToContent: "Skip to main content",
    pauseCarousel: "Pause slideshow",
    playCarousel: "Resume slideshow",
    photographPending: "Featured photograph pending",
    photographsPending: "Photographs in preparation",
    backHome: "Back home",
    chapterPageDescription:
      "The photographs for this chapter are being prepared. The complete gallery will open here.",
    copyright: "© 2026 Morii. All rights reserved.",
  },
} as const;

export const chapters: readonly Chapter[] = [
  {
    slug: "fuji",
    number: "01",
    label: { zh: "富士篇", ja: "富士編", en: "Fuji" },
    menuLabel: { zh: "富士篇", ja: "富士編", en: "Fuji chapter" },
    placeholderLabel: { zh: "富士山麓", ja: "富士の麓", en: "Fuji foothills" },
    placeholderDescription: {
      zh: "富士篇的照片正在整理。",
      ja: "富士編の写真を整理しています。",
      en: "The Fuji photographs are being prepared.",
    },
    background: "#66736f",
    backgroundDark: "#4d5a56",
  },
  {
    slug: "tokyo",
    number: "02",
    label: { zh: "东京篇", ja: "東京編", en: "Tokyo" },
    menuLabel: { zh: "东京篇", ja: "東京編", en: "Tokyo chapter" },
    placeholderLabel: { zh: "东京街景", ja: "東京の街", en: "Tokyo streets" },
    placeholderDescription: {
      zh: "东京篇的照片正在整理。",
      ja: "東京編の写真を整理しています。",
      en: "The Tokyo photographs are being prepared.",
    },
    background: "#55585d",
    backgroundDark: "#3f4247",
  },
  {
    slug: "kyoto",
    number: "03",
    label: { zh: "京都篇", ja: "京都編", en: "Kyoto" },
    menuLabel: { zh: "京都篇", ja: "京都編", en: "Kyoto chapter" },
    placeholderLabel: { zh: "京都旧巷", ja: "京都の路地", en: "Kyoto lanes" },
    placeholderDescription: {
      zh: "京都篇的照片正在整理。",
      ja: "京都編の写真を整理しています。",
      en: "The Kyoto photographs are being prepared.",
    },
    background: "#715448",
    backgroundDark: "#574037",
  },
] as const;

export const externalLinks = [
  { id: "moriium", label: "Moriium", href: null },
  { id: "instagram", label: "Instagram", href: null },
  { id: "x", label: "X", href: null },
] as const;

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function isChapterSlug(value: string | undefined): value is ChapterSlug {
  return chapterSlugs.includes(value as ChapterSlug);
}

export function routeFor(locale: Locale, chapter?: ChapterSlug): string {
  return chapter ? `/${locale}/${chapter}/` : `/${locale}/`;
}
