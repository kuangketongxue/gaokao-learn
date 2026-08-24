<div align="center">
  <img src="b97cd1ee-709c-4553-b53d-cadbb6773c26.png" alt="gaokao-learn" width="120" />
</div>

<h1 align="center">gaokao-learn</h1>
<h3 align="center">Gaokao Knowledge, Explained Visually · 高考知识点精讲</h3>

<p align="center"><em>Understand the logic, skip the grind. · 用逻辑代替题海。</em></p>

<p align="center">
  <a href="https://github.com/kuangketongxue/gaokao-learn/releases"><img src="https://img.shields.io/github/v/release/kuangketongxue/gaokao-learn?label=release&color=blue" alt="release"></a>
  <a href="https://github.com/kuangketongxue/gaokao-learn/stargazers"><img src="https://img.shields.io/github/stars/kuangketongxue/gaokao-learn?style=flat&logo=github&color=yellow" alt="stars"></a>
  <a href="https://github.com/kuangketongxue/gaokao-learn/forks"><img src="https://img.shields.io/github/forks/kuangketongxue/gaokao-learn?style=flat&logo=github" alt="forks"></a>
  <a href="https://github.com/kuangketongxue/gaokao-learn/issues"><img src="https://img.shields.io/github/issues/kuangketongxue/gaokao-learn?style=flat&logo=github" alt="issues"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/kuangketongxue/gaokao-learn?color=green" alt="license"></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/changelog-Keep%20a%20Changelog-orange" alt="changelog"></a>
  <a href="https://crazy-gaokao-tsinghua.pages.dev/"><img src="https://img.shields.io/website?url=https%3A%2F%2Fcrazy-gaokao-tsinghua.pages.dev&label=live%20site" alt="website"></a>
  <a href="https://github.com/kuangketongxue/gaokao-learn/commits/main"><img src="https://img.shields.io/github/last-commit/kuangketongxue/gaokao-learn?label=daily%20updates&color=brightgreen" alt="last commit"></a>
</p>

<br/>

<p align="center">
  🌐 <a href="README_zh.md">中文</a> ·
  <a href="https://crazy-gaokao-tsinghua.pages.dev/">Project Website</a> ·
  <a href="https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce">Video Tutorials</a>
</p>

<br/>

<a id="about"></a>

## About

Most study materials hand you formulas to memorize. This project does the opposite: every Gaokao knowledge point is broken down to its **first principles**, then rebuilt with a **visual metaphor** — an accelerating car for derivatives, a tug-of-war for force balance — so that understanding, not repetition, does the work.

It powers the daily-updated content site **[crazy-gaokao-tsinghua.pages.dev](https://crazy-gaokao-tsinghua.pages.dev/)** (Chinese), synced with video & illustrated notes on Xiaohongshu (RED).

### Current content

| Chapters | Subjects | Update cadence | Site stack |
|---:|---:|---:|---|
| 8 and growing | Math · Physics · Chemistry | Daily | Pure HTML/CSS/JS, zero build |

| № | Chapter | Subject | One-line essence |
|---|---|---|---|
| 01 | Derivatives | Math | A derivative is not a formula — it is *change happening right now* |
| 02 | Force analysis | Physics | Every force: decompose first, combine second |
| 03 | Chemical equilibrium | Chemistry | Equilibrium is not stillness — it is a *stalemate* |
| 04 | Trigonometric functions | Math | Circular motion projected onto a ruler |
| 05 | Substance classification | Chemistry | Bond type follows constituent particles, not names |
| 06 | Distillation purification | Chemistry | Separate by boiling point: evaporate, condense, collect |
| 07 | Polymer materials | Chemistry | PLA: plastics that nature can digest |
| 08 | Sulfur chemistry | Chemistry | SO₂ decolorizes KMnO₄ by *reducing* it, not bleaching it |

<p align="right">(<a href="#about">back to top</a>)</p>

### Built With

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,githubactions,cloudflare" alt="tech stack" />
</p>

- **Frontend**: vanilla HTML/CSS/JS — no framework, no build step, system fonts only
- **Theme**: light / dark dual theme with `localStorage` persistence and flash-free boot
- **Animations**: IntersectionObserver scroll reveals, counter animations, per-chapter accent hues (CSS custom property `--accent-hue`)
- **Deploy**: GitHub Actions → `wrangler pages deploy` → Cloudflare Pages (auto on every push to `main`, ~90s)

<p align="right">(<a href="#about">back to top</a>)</p>

<a id="getting-started"></a>

## Getting Started

### Prerequisites

Any of: Node.js 18+, Python 3.x — only to run a local static server. The site itself has **zero dependencies**.

### Installation

```bash
git clone https://github.com/kuangketongxue/gaokao-learn.git
cd gaokao-learn
```

Preview locally:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000` (or the port your server prints).

<p align="right">(<a href="#getting-started">back to top</a>)</p>

<a id="usage"></a>

## Usage

### Repository layout

```
.
├── index.html      # Single page: hero, featured banner, chapter mount point, methodology, CTA
├── content.js      # ★ All chapter data — the ONLY file you edit to add content
├── render.js       # Renders EXPLORE_CHAPTERS into #exploreMount
├── config.js       # Site config (Gaokao date countdown, etc.)
├── main.js         # Shared behavior: nav, theme toggle, scroll animations, toast
├── style.css       # Full stylesheet, light/dark themes, per-chapter accent hues
└── *.png / *.jpg   # Logo & cover art
```

### Adding a chapter (the fun part)

Open [`content.js`](content.js) and append one object to `EXPLORE_CHAPTERS`:

```js
{
  id: '09',
  category: '电磁感应 · 物理',            // topic · subject
  title: '磁通量变了，<br><span class="em">电流就来了</span>。',
  body: '正文可含 <strong>强调</strong> 与 <br> 换行。',
  dataItems: [                            // exactly 3 stat cards
    { value: 'Φ = BS·cosθ', label: '磁通量' },
    { value: 'E = nΔΦ/Δt', label: '法拉第定律' },
    { value: '楞次定律', label: '方向判断' }
  ],
  accentHue: 220                          // chapter theme color, 0-360
}
```

Push to `main`. GitHub Actions builds nothing (there is nothing to build) and the chapter is live in ~90 seconds.

<p align="right">(<a href="#usage">back to top</a>)</p>

<a id="deploying"></a>

## Deploying Your Own Copy

1. Fork this repo
2. Create a Cloudflare Pages project, or reuse the included workflow:
   - Add repository secret `CLOUDFLARE_API_TOKEN` (template in `.github/workflows/deploy.yml`)
   - Every push to `main` deploys automatically
3. Or host anywhere static: Netlify, Vercel, GitHub Pages — just point it at the repo root

<p align="right">(<a href="#deploying">back to top</a>)</p>

<a id="roadmap"></a>

## Roadmap

- [ ] Cover all six Gaokao subjects (English, Chinese, Biology incoming)
- [ ] Per-chapter permalink pages
- [ ] Search across chapters
- [ ] English translation of on-site content

<p align="right">(<a href="#roadmap">back to top</a>)</p>

<a id="contributing"></a>

## Contributing

Corrections are the most valuable contributions for an education project — if any explanation is physically/mathematically imprecise, please open an issue.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingChapter`)
3. Commit your Changes (`git commit -m 'Add some AmazingChapter'`)
4. Push to the Branch (`git push origin feature/AmazingChapter`)
5. Open a Pull Request

### Contributors

<a href="https://github.com/kuangketongxue/gaokao-learn/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuangketongxue/gaokao-learn" alt="contributors" />
</a>

<p align="right">(<a href="#contributing">back to top</a>)</p>

<a id="license"></a>

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

<p align="right">(<a href="#license">back to top</a>)</p>

<a id="acknowledgments"></a>

## Acknowledgments

- Every teacher whose classroom metaphors made abstract ideas click — this project extends that craft
- [Cloudflare Pages](https://pages.cloudflare.com/) — free global hosting
- [Shields.io](https://shields.io/) — the badges above

<p align="right">(<a href="#acknowledgments">back to top</a>)</p>

<a id="contact"></a>

## Contact

- **Xiaohongshu (RED)**: [@我的小红书](https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce) — daily video + illustrated notes
- **Issues**: [GitHub Issues](https://github.com/kuangketongxue/gaokao-learn/issues)

<div align="center">
  <b>If this helped you understand something, a ⭐ is appreciated.</b>
</div>

<a id="star-history"></a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=kuangketongxue/gaokao-learn&type=Date)](https://star-history.com/#kuangketongxue/gaokao-learn&Date)
