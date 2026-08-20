export const locales = ["zh", "ja", "en"] as const;
export type Locale = (typeof locales)[number];

export const chapterSlugs = ["fuji", "tokyo", "kyoto"] as const;
export type ChapterSlug = (typeof chapterSlugs)[number];

export const themeSlugs = [
  "cloud-fuji",
  "kawaguchiko-festival",
  "tokyo-views",
  "tokyo-rainy-night",
  "kyoto-city",
  "northern-kyoto",
] as const;
export type ThemeSlug = (typeof themeSlugs)[number];
export type ThemePreference = "system" | "light" | "dark";

export type LocalizedText = Record<Locale, string>;

export type PreviewFrame = {
  id: string;
  background: string;
  backgroundDark: string;
};

export type ChapterTheme = {
  slug: ThemeSlug;
  number: string;
  label: LocalizedText;
  placeholderDescription: LocalizedText;
};

export type Chapter = {
  slug: ChapterSlug;
  number: string;
  label: LocalizedText;
  menuLabel: LocalizedText;
  placeholderLabel: LocalizedText;
  placeholderDescription: LocalizedText;
  previews: readonly [PreviewFrame, PreviewFrame, PreviewFrame];
  themes: readonly [ChapterTheme, ChapterTheme];
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
    chapterThemes: "摄影主题",
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
    backChapter: "返回篇章",
    previousPhoto: "上一张照片",
    nextPhoto: "下一张照片",
    openOverview: "打开照片总览",
    closeOverview: "返回单张浏览",
    photoInformation: "照片信息",
    closePhotoInformation: "关闭照片信息",
    viewActualSize: "查看原尺寸",
    fitPhoto: "适配画面",
    photographs: "张照片",
    photograph: "照片",
    imageUnavailable: "这张照片暂时无法显示",
    overviewHeading: "照片总览",
    title: "标题",
    place: "地点",
    capturedOn: "拍摄日期",
    camera: "机身",
    lens: "镜头",
    focalLength: "焦段",
    aperture: "光圈",
    shutter: "快门",
    iso: "ISO",
    exposureCompensation: "曝光补偿",
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
    chapterThemes: "写真のテーマ",
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
    backChapter: "章へ戻る",
    previousPhoto: "前の写真",
    nextPhoto: "次の写真",
    openOverview: "写真一覧を開く",
    closeOverview: "一枚表示に戻る",
    photoInformation: "写真情報",
    closePhotoInformation: "写真情報を閉じる",
    viewActualSize: "原寸で表示",
    fitPhoto: "画面に合わせる",
    photographs: "枚の写真",
    photograph: "写真",
    imageUnavailable: "この写真は現在表示できません",
    overviewHeading: "写真一覧",
    title: "題名",
    place: "場所",
    capturedOn: "撮影日",
    camera: "カメラ",
    lens: "レンズ",
    focalLength: "焦点距離",
    aperture: "絞り",
    shutter: "シャッター速度",
    iso: "ISO",
    exposureCompensation: "露出補正",
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
    chapterThemes: "Photographic themes",
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
    backChapter: "Back to chapter",
    previousPhoto: "Previous photograph",
    nextPhoto: "Next photograph",
    openOverview: "Open photograph overview",
    closeOverview: "Return to single photograph",
    photoInformation: "Photograph information",
    closePhotoInformation: "Close photograph information",
    viewActualSize: "View at actual size",
    fitPhoto: "Fit photograph",
    photographs: "photographs",
    photograph: "Photograph",
    imageUnavailable: "This photograph is temporarily unavailable",
    overviewHeading: "Photograph overview",
    title: "Title",
    place: "Place",
    capturedOn: "Date",
    camera: "Camera",
    lens: "Lens",
    focalLength: "Focal length",
    aperture: "Aperture",
    shutter: "Shutter speed",
    iso: "ISO",
    exposureCompensation: "Exposure compensation",
    copyright: "© 2026 Morii. All rights reserved.",
  },
} as const;

export const chapters = [
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
    previews: [
      { id: "fuji-01", background: "#66736f", backgroundDark: "#4d5a56" },
      { id: "fuji-02", background: "#5f6c72", backgroundDark: "#47545a" },
      { id: "fuji-03", background: "#74736a", backgroundDark: "#59584f" },
    ],
    themes: [
      {
        slug: "cloud-fuji",
        number: "01",
        label: { zh: "云中富士", ja: "雲間の富士", en: "Fuji in the Clouds" },
        placeholderDescription: {
          zh: "云中富士的照片正在整理。",
          ja: "「雲間の富士」の写真を整理しています。",
          en: "The Fuji in the Clouds photographs are being prepared.",
        },
      },
      {
        slug: "kawaguchiko-festival",
        number: "02",
        label: { zh: "河口湖湖上祭", ja: "河口湖湖上祭", en: "Lake Kawaguchi Festival" },
        placeholderDescription: {
          zh: "河口湖湖上祭的照片正在整理。",
          ja: "河口湖湖上祭の写真を整理しています。",
          en: "The Lake Kawaguchi Festival photographs are being prepared.",
        },
      },
    ],
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
    previews: [
      { id: "tokyo-01", background: "#55585d", backgroundDark: "#3f4247" },
      { id: "tokyo-02", background: "#4f5961", backgroundDark: "#3a444b" },
      { id: "tokyo-03", background: "#615a5d", backgroundDark: "#484144" },
    ],
    themes: [
      {
        slug: "tokyo-views",
        number: "01",
        label: { zh: "东京展望", ja: "東京を望む", en: "Tokyo from Above" },
        placeholderDescription: {
          zh: "东京展望的照片正在整理。",
          ja: "「東京を望む」の写真を整理しています。",
          en: "The Tokyo from Above photographs are being prepared.",
        },
      },
      {
        slug: "tokyo-rainy-night",
        number: "02",
        label: { zh: "东京雨夜", ja: "東京、雨の夜", en: "Tokyo in the Rain" },
        placeholderDescription: {
          zh: "东京雨夜的照片正在整理。",
          ja: "「東京、雨の夜」の写真を整理しています。",
          en: "The Tokyo in the Rain photographs are being prepared.",
        },
      },
    ],
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
    previews: [
      { id: "kyoto-01", background: "#715448", backgroundDark: "#574037" },
      { id: "kyoto-02", background: "#66564a", backgroundDark: "#4d4037" },
      { id: "kyoto-03", background: "#795e50", backgroundDark: "#5b463c" },
    ],
    themes: [
      {
        slug: "kyoto-city",
        number: "01",
        label: { zh: "京洛漫步", ja: "京洛を歩く", en: "Walking Kyoto" },
        placeholderDescription: {
          zh: "京洛漫步的照片正在整理。",
          ja: "「京洛を歩く」の写真を整理しています。",
          en: "The Walking Kyoto photographs are being prepared.",
        },
      },
      {
        slug: "northern-kyoto",
        number: "02",
        label: { zh: "洛北幽径", ja: "洛北の山径", en: "Paths of Northern Kyoto" },
        placeholderDescription: {
          zh: "洛北幽径的照片正在整理。",
          ja: "「洛北の山径」の写真を整理しています。",
          en: "The Paths of Northern Kyoto photographs are being prepared.",
        },
      },
    ],
  },
] as const satisfies readonly Chapter[];

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

export function isThemeSlug(value: string | undefined): value is ThemeSlug {
  return themeSlugs.includes(value as ThemeSlug);
}

export function routeFor(
  locale: Locale,
  chapter?: ChapterSlug,
  theme?: ThemeSlug,
): string {
  if (chapter && theme) return `/${locale}/${chapter}/${theme}/`;
  return chapter ? `/${locale}/${chapter}/` : `/${locale}/`;
}
