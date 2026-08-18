# Moriium Gallery

`森井永響の日本紀行` 是 Morii 2026 年日本旅行的静态摄影网站。主页以富士、东京、京都三个篇章作为唯一分类入口。

## 本地开发

需要 Node.js 22.12 或更高版本，以及 pnpm 11。

```bash
pnpm install
pnpm dev
```

提交前运行：

```bash
pnpm check
pnpm build
```

Astro 会把全部语言与篇章路由预渲染到 `dist/`，线上不需要 Node.js 服务器。

## 照片安全

- 原片保持不变，并存放在仓库之外或已忽略的 `photos-original/`。
- 只有经过 Morii 确认、去除 EXIF/GPS 并缩小尺寸的公开衍生图可以进入 `src/assets/photos/`。
- 缩略图、响应式尺寸与格式转换结果必须与原片分开存放。

## 当前状态

主页、三语路由、主题与三个篇章占位页构成第一阶段。代表照片和外部链接将在素材确认后补充。

## Copyright

© 2026 Morii. All rights reserved.

本仓库未授予代码、设计、文案或照片的复制、修改与再分发许可。
