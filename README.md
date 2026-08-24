# 高考知识点精讲 · 把底层逻辑讲成人人秒懂的画面

> 高考知识点底层逻辑拆解 + 独特提分技巧。小红书日更视频与图文笔记。

线上：<https://crazy-gaokao-tsinghua.pages.dev/>

## 这是什么

不是又一份刷题清单。用动画和视觉隐喻，把导数、受力分析、化学平衡这些易错点的「为什么」拆给你看。

- **导数** — 瞬时变化率到底在变什么
- **受力分析** — 所有力，先拆再合
- **化学平衡** — 平衡不是静止，是势均力敌
- **三角函数** — 圆周运动投影到直尺上

## 站点结构

纯静态多文件站点（无构建工具、无依赖）：

```
├── index.html          # 首页（知识探索滚动叙事）
├── methods.html        # 教学方法
├── calculator.html     # 努力价值计算器（+ calculator.js）
├── checklist.html      # 每日打卡（+ checklist.js）
├── changelog.html      # 更新日志
├── search.html         # 搜索（功能筹备中）
├── config.js           # 全站配置（高考日期、目标分等）
├── main.js             # 共享脚本（导航、主题、滚动动画、Toast）
├── style.css           # 全站样式（浅色/深色双主题）
├── favicon.ico
└── *.png / *.jpg       # Logo 与封面图
```

## 本地预览

直接用浏览器打开 `index.html`，或起本地服务器：

```bash
npx serve .
# 或
python -m http.server 8000
```

## 部署

通过 GitHub Actions 自动部署到 Cloudflare Pages：

- push `main` 分支 → 触发 `.github/workflows/deploy.yml`
- Action 用 `wrangler pages deploy` 推送到 Cloudflare Pages 项目 `crazy-gaokao-tsinghua`
- 需在仓库 Settings → Secrets 配置 `CLOUDFLARE_API_TOKEN`

改任何文件 push 后 1-2 分钟自动上线。

## 配置

`config.js` 里改全站参数：

```js
var GAOKAO_CONFIG = {
  GAOKAO_DATE: '2027-06-07',  // 高考日期（首页倒计时）
  START_DATE: '2026-07-11',   // 打卡起点
  DEADLINE: '2026-12-31',     // 「考上清华必要条件」deadline
  TARGET_SCORE: 688,
  RETIRE_AGE: 60,
};
```

## 技术栈

- 纯 HTML + CSS + JS（无框架、无构建）
- 系统字体（PingFang SC / 微软雅黑 / SF Mono），不依赖被墙的 Google Fonts
- Cloudflare Pages 托管
- 浅色/深色双主题（localStorage 持久化 + 系统偏好兜底）

## 作者

- 小红书：<https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce>
- GitHub：<https://github.com/kuangketongxue>

## License

MIT
