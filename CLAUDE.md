# CLAUDE.md — 高考知识点精讲 (gaokao-learn)

## 一句话定位

高考知识点的内容展示站（非工具站）：把知识点拆成底层逻辑 + 视觉隐喻，每天日更，同步小红书。部署在 https://crazy-gaokao-tsinghua.pages.dev/。

## 怎么跑起来

- 纯静态多文件，无构建。本地预览：`python -m http.server 8000` 或 `npx serve .`
- 部署链路：push main → GitHub Actions（`.github/workflows/deploy.yml`，wrangler pages deploy）→ 1-2 分钟自动上线
- 中国网络：git push 连不上 github.com:443 时，用 GitHub Contents API / Git Data API 推（走 api.github.com，直连稳定），见 `~/.claude/github-playbook.md` §1.7

## 技术栈

- 原生 HTML + CSS + JS，无框架无构建，系统字体，浅/深双主题（localStorage `xh-theme`）
- Cloudflare Pages + KV 无（纯静态）；内容不依赖后端

## 目录与约定

- **`content.js`** — 章节数据唯一数据源。`EXPLORE_CHAPTERS` 数组，每章六字段：`id`(编号字符串)/`category`(主题·科目)/`title`(可含 `<span class="em">`强调)/`body`(可含 `<strong>`)/`dataItems`(3条要点卡)/`accentHue`(0-360色相)
- **`render.js`** — 渲染器。路由：`/` = 首页章节卡片列表（renderList）；`/ch/{id}/` = 独立章节页（renderStandalone，完整正文+数据卡+返回首页）。靠 CF Pages SPA fallback 路由，无需 _redirects
- **`index.html`** — 单页外壳，`<main class="rise">` 是挂载点，`#exploreMount` 是首页章节列表容器
- **`main.js`** — 导航/主题切换/滚动动画（必须在 render.js 之后加载）
- **加新章节**：只改 `content.js` 数组末尾追加一段即可，其余文件都不用动
- **测试**：`tests/` 无原生测试；本地用 jsdom 临时脚本验证（如 `verify_per_article.js` 12 条断言）
- **内容红线**：站上只放用户本人创作的内容，AI 不得自造占位章节（曾因自编 4 章被用户否决）
- **内容全文展示**：不做发布状态 gating/摘要隐藏，用户明确要求「网站能看到全文」

## 当前状态和下一步

- 当前 4 章：01 键型看构成微粒 / 02 蒸馏按沸点 / 03 塑料能被吃掉(PLA) / 04 褪色分两种(SO₂还原性)，全部用户创作
- 版本 CHANGELOG.md 有完整历史
- 下一步：继续日更新章节（用户在小红书同步发布）

## 发布状态

- merged: main 分支 = merged
- deployed: CI success = deployed
- live verified: pages.dev 已 curl 验证（/ 与 /ch/{id}/ 均 HTTP 200，脚本加载正常）
