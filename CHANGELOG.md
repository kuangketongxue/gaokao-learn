# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Per-article pages**: each chapter now has a standalone URL (`/ch/{id}/`), e.g. `/ch/01/`. The homepage renders clickable chapter cards (`<a href="/ch/{id}/">`); visiting `/ch/{id}/` shows the full article (title + body + data panel + back-to-home link). Routing is handled client-side by `render.js` (URL-pattern matching + `main.innerHTML` swap); Cloudflare Pages default SPA fallback routes `/ch/*` to `index.html`.
- **上一篇/下一篇导航**: `/ch/{id}/` 页面底部加入章节切换链接（第 1 章只有下一篇，最后一章只有上一篇）
- **OG meta 动态更新**: 独立页自动更新 `og:title` / `og:description` / `og:url`，提升社交分享预览
- index.html: added `<meta name="theme-color">` + `<meta name="color-scheme">` for correct mobile browser chrome

### Changed

- **视觉重设计（化学实验报告概念）**:
  - 配色从「紫金」(#1a1625/#9b6dff) 改为「墨绿实验室黑 + 试剂蓝 + 碘金」(#0f1512/#4f9dde/#d8a54a)，贴合化学科目本身
  - 标题改宋体 (`Songti SC`/`STSong`/`SimSun`)，教辅/教科书感
  - **签名元素**: 章节编号做成「试剂瓶标签」(`.reagent-num`)，每章用自己的试剂色
  - 数据卡每项加「试管」指示 (`.exp-tube`)
  - 独立页加入场动画（article / title / body 三段错落）
  - 修复 `.exp-article .exp-bg` 背景永不显示的 bug（原来依赖 `.in` 类但独立页没有）
- `render.js`: refactored into `renderList()` (homepage grid of chapter cards) + `renderStandalone(id)` (single-article page); removed `chapterHTML()` and the old `.outerHTML` wholesale-replace pattern
- `content.js`: no data changes — `EXPLORE_CHAPTERS` remains the single source of truth

### Fixed

- Removed dead CSS from publish-gating (`exp-ch-badge` / `exp-ch-foot` / `exp-ch-video` / `exp-ch-soon` / `exp-ch-more`)
- Removed duplicate comment block in `style.css` (知识探索 header was declared twice)
- `dek` extraction: `replace(/\s+/g, '')` → `replace(/\s+/g, ' ').trim()` to preserve word boundaries between Chinese and English formulas

### Changed

- Removed dead code: ~22KB unused CSS (checklist/calculator/search/category/video cards), toast & countdown & search JS, unused `config.js` (contained personal target data)
- Renamed assets to semantic names and compressed: `logo.png` 1.63MB→22KB (128px, shown at 32px), `cover.jpg` 136KB→107KB
- Added SEO baseline (`robots.txt`, `sitemap.xml`) and security headers (`_headers`: nosniff, DENY framing, referrer policy)
- Accessibility: theme toggle `aria-label`, hamburger `aria-expanded`

### Planned

- More subjects: English, Chinese, Biology
- Per-chapter permalink pages
- On-site chapter search

## [1.0.1] - 2026-08-24

### Added

- Content data architecture: `content.js` holds all chapters as data, `render.js` renders them into `#exploreMount` — adding a chapter no longer requires touching HTML
- Chapter 01 · Substance classification: LiNbO₃ ionic crystal / SiC covalent network / alloy hardness / He has no chemical bonds
- Chapter 02 · Distillation purification: ethyl acetate (bp ≈77 °C) evaporate-condense-collect workflow
- Chapter 03 · Polymer materials: PLA biodegradable disposables
- Chapter 04 · Sulfur chemistry: Cu + concentrated H₂SO₄; SO₂ decolorizing acidic KMnO₄ via reducing property
- Featured banner now auto-follows the latest chapter instead of being hardcoded
- Bilingual README (English + 中文), CHANGELOG, package.json
- Repository metadata: description, topics, homepage link

## [1.0.0] - 2026-08-24

### Added

- Initial open-source release of the content-only site
- Single-page layout: hero cover, featured banner, scroll-driven knowledge chapters, methodology cards, home-study tips, CTA
- Light/dark dual theme with flash-free boot and `localStorage` persistence
- Scroll reveal animations via IntersectionObserver with counter animations
- GitHub Actions auto-deploy to Cloudflare Pages (`wrangler pages deploy`), concurrency-guarded
- MIT License

[Unreleased]: https://github.com/kuangketongxue/gaokao-learn/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/kuangketongxue/gaokao-learn/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kuangketongxue/gaokao-learn/releases/tag/v1.0.0
