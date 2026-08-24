# 高考知识点精讲 · 把底层逻辑讲成人人秒懂的画面

> 每天日更高考内容：6 科知识点底层逻辑拆解 + 高考方法论 + 在家学习指南。小红书同步更新。

线上：<https://crazy-gaokao-tsinghua.pages.dev/>

## 内容

每天日更三类内容：

- **高考知识点** — 导数、受力分析、化学平衡、三角函数……用视觉隐喻把「为什么」拆给你看
- **高考方法论** — 底层逻辑拆解法、视觉隐喻库，从定义出发还原成最小可懂单元
- **在家学习** — 居家环境、节奏、自律，把家变成能专注的考场

## 站点结构

纯静态多文件（无构建、无依赖）：

```
├── index.html    # 单页内容展示（Hero + 今日精选 + 知识点 + 方法论 + 在家学习 + CTA）
├── config.js     # 全站配置（高考日期等）
├── main.js       # 共享脚本（导航、主题、滚动动画、Toast）
├── style.css     # 全站样式（浅色/深色双主题）
├── favicon.ico
└── *.png / *.jpg  # Logo 与封面图
```

## 本地预览

```bash
npx serve .
# 或
python -m http.server 8000
```

## 部署

push `main` 分支 → GitHub Actions 自动 `wrangler pages deploy` 到 Cloudflare Pages 项目 `crazy-gaokao-tsinghua`。改任何文件 push 后 1-2 分钟自动上线。

需在仓库 Settings → Secrets 配置 `CLOUDFLARE_API_TOKEN`。

## 配置

`config.js`：

```js
var GAOKAO_CONFIG = {
  GAOKAO_DATE: '2027-06-07',  // 高考日期
  START_DATE: '2026-07-11',
  DEADLINE: '2026-12-31',
  TARGET_SCORE: 688,
  RETIRE_AGE: 60,
};
```

## 作者

- 小红书：<https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce>
- GitHub：<https://github.com/kuangketongxue>

## License

MIT
