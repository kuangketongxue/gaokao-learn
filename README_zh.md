<div align="center">
  <img src="b97cd1ee-709c-4553-b53d-cadbb6773c26.png" alt="gaokao-learn" width="120" />
</div>

<h1 align="center">gaokao-learn</h1>
<h3 align="center">高考知识点精讲 · 把底层逻辑讲成人人秒懂的画面</h3>

<p align="center"><em>用逻辑代替题海。 Understand the logic, skip the grind.</em></p>

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
  🌐 <a href="README.md">English</a> ·
  <a href="https://crazy-gaokao-tsinghua.pages.dev/">在线站点</a> ·
  <a href="https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce">视频教程</a>
</p>

<br/>

<a id="about"></a>

## 关于

大多数复习资料给你一堆公式让你背。这个项目反着来：每个高考知识点先拆解到**第一性原理**，再用一个**视觉隐喻**重建——阴阳离子像磁铁相吸看懂晶体类型，按沸点高低排队理解蒸馏——让「看懂」替你干活，而不是重复刷题。

本仓库驱动日更内容站 **[crazy-gaokao-tsinghua.pages.dev](https://crazy-gaokao-tsinghua.pages.dev/)**，与小红书（视频 + 图文笔记）同步更新。

### 当前内容

| 章节数 | 覆盖科目 | 更新节奏 | 技术栈 |
|---:|---:|---:|---|
| 4 章持续增加中 | 化学（更多科目陆续加入） | 日更 | 纯 HTML/CSS/JS，零构建 |

| № | 章节 | 科目 | 一句话本质 |
|---|---|---|---|
| 01 | 物质分类 | 化学 | 键型看构成微粒，不看名字猜 |
| 02 | 分离提纯 | 化学 | 按沸点分离：蒸发、冷凝、收集 |
| 03 | 高分子材料 | 化学 | PLA：大自然能「吃掉」的塑料 |
| 04 | 硫及其化合物 | 化学 | SO₂ 使 KMnO₄ 褪色靠的是**还原性**，不是漂白性 |

<p align="right">(<a href="#about">回到顶部</a>)</p>

### 技术栈

<p align="left">
  <img src="https://skillicons.dev/icons?i=html,css,js,githubactions,cloudflare" alt="技术栈" />
</p>

- **前端**：原生 HTML/CSS/JS——无框架、无构建、系统字体
- **主题**：浅色 / 深色双主题，`localStorage` 持久化，加载零闪烁
- **动效**：IntersectionObserver 滚动渐入、数字计数动画、每章独立主题色相（CSS 变量 `--accent-hue`）
- **部署**:GitHub Actions → `wrangler pages deploy` → Cloudflare Pages（push `main` 自动上线，约 90 秒）

<p align="right">(<a href="#about">回到顶部</a>)</p>

<a id="getting-started"></a>

## 快速开始

### 前置要求

任选其一：Node.js 18+ 或 Python 3.x——仅用于起本地静态服务器。站点本身**零依赖**。

### 安装

```bash
git clone https://github.com/kuangketongxue/gaokao-learn.git
cd gaokao-learn
```

本地预览：

```bash
npx serve .
# 或
python -m http.server 8000
```

打开 `http://localhost:8000` 即可。

<p align="right">(<a href="#getting-started">回到顶部</a>)</p>

<a id="usage"></a>

## 使用

### 仓库结构

```
.
├── index.html      # 单页：Hero、今日精选、章节挂载点、方法论、CTA
├── content.js      # ★ 全部章节数据——加内容只改这一个文件
├── render.js       # 把 EXPLORE_CHAPTERS 渲染进 #exploreMount
├── config.js       # 站点配置（高考倒计时等）
├── main.js         # 共享行为：导航、主题切换、滚动动画、Toast
├── style.css       # 全站样式，浅/深双主题，章节主题色相
└── *.png / *.jpg   # Logo 与封面图
```

### 新增一章（最有意思的部分）

打开 [`content.js`](content.js)，往 `EXPLORE_CHAPTERS` 数组末尾追加一个对象：

```js
{
  id: '09',
  category: '电磁感应 · 物理',            // 主题 · 科目
  title: '磁通量变了，<br><span class="em">电流就来了</span>。',
  body: '正文可含 <strong>强调</strong> 与 <br> 换行。',
  dataItems: [                            // 恰好 3 个要点卡
    { value: 'Φ = BS·cosθ', label: '磁通量' },
    { value: 'E = nΔΦ/Δt', label: '法拉第定律' },
    { value: '楞次定律', label: '方向判断' }
  ],
  accentHue: 220                          // 本章主题色相，0-360
}
```

push 到 `main`，GitHub Actions 自动部署（没有构建步骤），约 90 秒后新章节上线。

<p align="right">(<a href="#usage">回到顶部</a>)</p>

<a id="deploying"></a>

## 部署你自己的副本

1. Fork 本仓库
2. 创建 Cloudflare Pages 项目，或直接复用自带 workflow：
   - 在仓库 Settings → Secrets 添加 `CLOUDFLARE_API_TOKEN`
   - 每次 push 到 `main` 自动部署
3. 或者托管在任何静态平台：Netlify、Vercel、GitHub Pages——把仓库根目录指过去就行

<p align="right">(<a href="#deploying">回到顶部</a>)</p>

<a id="roadmap"></a>

## 路线图

- [ ] 覆盖全部六科（英语、语文、生物即将加入）
- [ ] 每章独立详情页（可分享永久链接）
- [ ] 站内章节搜索
- [ ] 站点内容英文版

<p align="right">(<a href="#roadmap">回到顶部</a>)</p>

<a id="contributing"></a>

## 参与贡献

教育项目最宝贵的贡献是纠错——如果任何讲解在物理/数学上不够严谨，请开 issue。

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingChapter`)
3. 提交改动 (`git commit -m 'Add some AmazingChapter'`)
4. 推送分支 (`git push origin feature/AmazingChapter`)
5. 发起 Pull Request

### 贡献者

<a href="https://github.com/kuangketongxue/gaokao-learn/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kuangketongxue/gaokao-learn" alt="contributors" />
</a>

<p align="right">(<a href="#contributing">回到顶部</a>)</p>

<a id="license"></a>

## 开源协议

基于 **MIT License** 发行，详见 [`LICENSE`](LICENSE)。

<p align="right">(<a href="#license">回到顶部</a>)</p>

<a id="acknowledgments"></a>

## 致谢

- 每一位用生活化比喻让抽象概念落地的老师——本项目是这门手艺的延续
- [Cloudflare Pages](https://pages.cloudflare.com/) — 免费全球托管
- [Shields.io](https://shields.io/) — 上方所有徽章

<p align="right">(<a href="#acknowledgments">回到顶部</a>)</p>

<a id="contact"></a>

## 联系方式

- **小红书**：[@我的小红书主页](https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce) — 日更视频 + 图文笔记
- **Issues**: [GitHub Issues](https://github.com/kuangketongxue/gaokao-learn/issues)

<div align="center">
  <b>如果这里的内容帮你真正看懂了什么，欢迎点个 ⭐。</b>
</div>

<a id="star-history"></a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=kuangketongxue/gaokao-learn&type=Date)](https://star-history.com/#kuangketongxue/gaokao-learn&Date)
