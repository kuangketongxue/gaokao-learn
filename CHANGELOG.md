# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Chapter titles lost their accent-colored emphasis: `rich()` sanitizer stripped `<span class="em">` — now whitelisted (attribute-carrying spans still stripped)
- Mobile hamburger button was invisible (spans had zero size) — proper styles added, plus `aria-expanded` state
- Bilingual README chapter tables had Date/Chapter columns swapped

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
