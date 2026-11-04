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

核心图库与六个摄影集已有提交，当前进入上线准备；首发内容、部署配置和正式验收情况见 [项目状态](./docs/status/PROJECT_STATUS.md)。后续 MoriMeta 联动单独追踪，不自动阻止 Gallery 独立首发。

在本仓库的 Agent 对话中输入 **「生成项目状态快照」**，按 [使用说明](./docs/status/README.md) 手动更新中文总结与 [JSON 快照](./docs/status/project-status.json)，再由 Morii 手动导入 Moriium Dashboard。快照不会自动刷新，生成过程不运行测试、构建或部署。

## Copyright

© 2026 Morii. All rights reserved.

本仓库未授予代码、设计、文案或照片的复制、修改与再分发许可。
