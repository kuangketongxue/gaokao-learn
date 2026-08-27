// ============================================================
// 高考知识点精讲 · 章节渲染
// 功能：
//   - 路由判断：URL /ch/{id}/ => 独立章节页；否则 => 首页列表
//   - 读取 content.js EXPLORE_CHAPTERS 完成渲染
//   - 必须在 main.js 之前执行：main.js 的滚动动画观察器要绑到已渲染的节点上
// ============================================================

(function () {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // title/body 允许作者写 em/strong/br 及 <span class="em"> 标记，其余标签剔除。
  // span 先换成控制字符占位再剥离其余标签，防止带属性的 span（如 onclick）穿透。
  function rich(s) {
    return String(s)
      .replace(/<span\s+class="em"\s*>/gi, '\x01')
      .replace(/<\/span\s*>/gi, '\x02')
      .replace(/<(?!\/?(em|strong|br)\b)[^>]*>/gi, '')
      .replace(/\x01/g, '<span class="em">')
      .replace(/\x02/g, '</span>')
      .replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;');
  }

  // 取纯文本标题（去标签）
  function plainTitle(s) {
    return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  // 试剂瓶编号：章节数字放进标签样式胶囊，用章节色
  function reagentNum(id, accentHue) {
    return '<span class="reagent-num" style="--reagent-hue:' + Number(accentHue || 200) + '">' + esc(id) + '</span>';
  }

  // 数据卡：实验观察记录（试管样式）
  function dataItemsHTML(ch) {
    return (ch.dataItems || []).map(function (d) {
      return '<div class="exp-d-item">' +
        '<div class="exp-tube"><span class="exp-tube-liquid"></span></div>' +
        '<span class="exp-d-num" data-value="' + esc(d.value) + '">' + esc(d.value) + '</span>' +
        '<span class="exp-d-label">' + esc(d.label) + '</span>' +
        '</div>';
    }).join('');
  }

  // 路由判断：/ch/{id}/
  var m = location.pathname.match(/^\/ch\/(\d+)\/?$/);
  if (m) {
    renderStandalone(m[1]);
  } else {
    renderToc();
    renderList();
  }

  // 取学科：category 形如 "物质分类 · 化学"，取 · 后半段；无 · 则整段
  function subjectOf(category) {
    var s = String(category || '');
    var i = s.indexOf('·');
    return (i >= 0 ? s.slice(i + 1) : s).trim();
  }

  // 取纯文本标题（去标签，限长）
  function shortTitle(s, n) {
    var t = String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    return t.length > n ? t.slice(0, n - 1) + '…' : t;
  }

  // 优先级分（1~100，越大越值得优先搞懂）
  function scoreOf(ch) { return Number(ch.score || 0); }

  // A 方案：首页按分值降序排，同分按发布日期降序（新在前）
  function sortedChapters() {
    var a = EXPLORE_CHAPTERS.slice();
    a.sort(function (a, b) {
      var d = scoreOf(b) - scoreOf(a);
      if (d !== 0) return d;
      var da = String(a.date || '0').slice(0, 10), db = String(b.date || '0').slice(0, 10);
      return db > da ? 1 : -1;
    });
    return a;
  }

  // 分数徽章：化学实验报告风，用章节色
  function scoreBadge(ch) {
    var s = scoreOf(ch);
    if (!s) return '';
    var pct = Math.min(100, Math.max(0, s));
    return '<span class="exp-ch-score" style="--score:' + pct + ';--reagent-hue:' + Number(ch.accentHue || 35) + '">' +
      '<span class="mono">' + s + '</span><span>分</span></span>';
  }

  // 首页：渲染知识点目录（按学科分组，点击锚点跳转）
  function renderToc() {
    var mount = document.getElementById('tocMount');
    if (!mount || typeof EXPLORE_CHAPTERS === 'undefined' || !EXPLORE_CHAPTERS.length) return;

    // 按学科分组，保序去重
    var groups = [];
    var seen = {};
    EXPLORE_CHAPTERS.forEach(function (ch) {
      var sub = subjectOf(ch.category);
      if (!seen[sub]) { seen[sub] = true; groups.push({ subject: sub, items: [] }); }
      groups[groups.length - 1].items.push(ch);
    });

    // 每组内按分值降序排
    groups.forEach(function (g) {
      g.items.sort(function (a, b) { return scoreOf(b) - scoreOf(a); });
    });

    mount.innerHTML = '<div class="toc-card">' +
      '<div class="toc-head"><span class="toc-ico">📚</span><h2 class="toc-title mono">知识点目录</h2><span class="toc-count mono">' + EXPLORE_CHAPTERS.length + ' 章 · 按优先级</span></div>' +
      groups.map(function (g) {
        return '<div class="toc-group" style="--g-hue:' + Number(g.items[0].accentHue || 35) + '">' +
          '<div class="toc-subject mono">' + esc(g.subject) + '</div>' +
          '<div class="toc-items">' +
            g.items.map(function (ch, i) {
              return '<a class="toc-item" href="#ch-' + esc(ch.id) + '" data-ch="' + esc(ch.id) + '">' +
                '<span class="toc-rank mono">' + (i + 1) + '</span>' +
                '<span class="toc-num mono">' + esc(ch.id) + '</span>' +
                '<span class="toc-item-title">' + shortTitle(ch.title, 16) + '</span>' +
                (scoreOf(ch) ? '<span class="toc-score mono">' + scoreOf(ch) + '</span>' : '') +
              '</a>';
            }).join('') +
          '</div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  // 首页：渲染章节卡片列表
  function renderList() {
    var mount = document.getElementById('exploreMount');
    if (!mount || typeof EXPLORE_CHAPTERS === 'undefined' || !EXPLORE_CHAPTERS.length) return;

    mount.innerHTML = sortedChapters().map(function (ch) {
      // 每张卡片包 <a href="/ch/{id}/"> 跳转到独立页
      return '<a class="exp-chapter-link" href="/ch/' + esc(ch.id) + '/">' +
        '<div class="exp-chapter" id="ch-' + esc(ch.id) + '" data-chapter="' + esc(ch.id) + '" style="--accent-hue:' + Number(ch.accentHue || 35) + '">' +
          '<div class="exp-bg"><div class="exp-bg-gradient"></div></div>' +
          '<div class="exp-inner">' +
            '<div class="exp-ch-label mono">' +
              reagentNum(ch.id, ch.accentHue) +
              '<span class="exp-ch-cat">' + esc(ch.category) + '</span>' +
              (ch.date ? '<span class="exp-ch-date mono">📅 ' + esc(ch.date) + '</span>' : '') +
              scoreBadge(ch) +
            '</div>' +
            '<h2 class="exp-ch-title">' + rich(ch.title) + '</h2>' +
            '<div class="exp-body-wrap"><p class="exp-ch-body">' + rich(ch.body) + '</p></div>' +
          '</div>' +
          '<div class="exp-data">' + dataItemsHTML(ch) + '</div>' +
          '<div class="exp-ch-go">进入本章 →</div>' +
        '</div>' +
        '</a>';
    }).join('') +
      '<div class="exp-end">' +
      '<p class="mono">持续更新中 · 更多章节即将展开</p>' +
      '<a class="btn btn-primary" href="https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce" target="_blank" rel="noopener">关注小红书，不错过每一期</a>' +
      '</div>';
  }

  // 独立章节页：渲染完整正文
  function renderStandalone(id) {
    if (typeof EXPLORE_CHAPTERS === 'undefined') return;
    var ch = EXPLORE_CHAPTERS.find(function (c) { return c.id === id; });
    if (!ch) {
      document.body.innerHTML = '<div style="padding:80px;text-align:center"><h2>章节不存在</h2><a href="/">← 返回首页</a></div>';
      return;
    }

    // 上一篇 / 下一篇
    var idx = EXPLORE_CHAPTERS.indexOf(ch);
    var prev = idx > 0 ? EXPLORE_CHAPTERS[idx - 1] : null;
    var next = idx < EXPLORE_CHAPTERS.length - 1 ? EXPLORE_CHAPTERS[idx + 1] : null;

    var nav = '';
    if (prev || next) {
      nav = '<nav class="art-nav">' +
        (prev
          ? '<a class="art-nav-prev" href="/ch/' + esc(prev.id) + '/"><span class="art-nav-arrow">←</span><span class="art-nav-body"><span class="art-nav-lbl">上一篇</span><span class="art-nav-title">' + esc(prev.id) + ' · ' + esc(plainTitle(prev.title)) + '</span></span></a>'
          : '<span></span>') +
        (next
          ? '<a class="art-nav-next" href="/ch/' + esc(next.id) + '/"><span class="art-nav-body"><span class="art-nav-lbl">下一篇</span><span class="art-nav-title">' + esc(next.id) + ' · ' + esc(plainTitle(next.title)) + '</span></span><span class="art-nav-arrow">→</span></a>'
          : '') +
        '</nav>';
    }

    var main = document.querySelector('.rise');
    if (main) {
      main.innerHTML =
        '<article class="exp-article" data-chapter="' + esc(ch.id) + '" style="--accent-hue:' + Number(ch.accentHue || 35) + '">' +
          '<div class="exp-bg"><div class="exp-bg-gradient"></div></div>' +
          '<div class="exp-inner">' +
            '<a href="/" class="back-link">← 返回全部章节</a>' +
            '<div class="exp-ch-label mono">' +
              reagentNum(ch.id, ch.accentHue) +
              '<span class="exp-ch-cat">' + esc(ch.category) + '</span>' +
              (ch.date ? '<span class="exp-ch-date mono">📅 ' + esc(ch.date) + '</span>' : '') +
              scoreBadge(ch) +
            '</div>' +
            '<h1 class="exp-ch-title">' + rich(ch.title) + '</h1>' +
            '<div class="exp-ch-body-wrap">' + rich(ch.body) + '</div>' +
          '</div>' +
          '<div class="exp-data">' + dataItemsHTML(ch) + '</div>' +
          nav +
        '</article>';
    }

    // SEO：更新 title + og meta
    var t = plainTitle(ch.title);
    document.title = t + ' · 高考知识点精讲';
    var setMeta = function (attr, key, val) {
      var el = document.querySelector('meta[' + attr + '="' + key + '"]');
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', val);
    };
    setMeta('property', 'og:title', t);
    var dek = String(ch.body).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    setMeta('property', 'og:description', dek.slice(0, 120));
    setMeta('property', 'og:url', 'https://crazy-gaokao-tsinghua.pages.dev/ch/' + esc(ch.id) + '/');
  }

  // 今日精选横幅：自动跟随最新一章（数组最后一项），不再硬编码
  var last = (typeof EXPLORE_CHAPTERS !== 'undefined') ? EXPLORE_CHAPTERS[EXPLORE_CHAPTERS.length - 1] : null;
  var banner = document.getElementById('featuredBanner');
  if (banner && last) {
    var plain = String(last.body).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    var dek = plain.split(/[。；;]/)[0] || '';
    if (dek.length > 42) dek = dek.slice(0, 40) + '…';

    banner.href = 'https://www.xiaohongshu.com/user/profile/61ef879f000000001000d2ce';
    banner.style.setProperty('--tint', 'hsl(' + Number(last.accentHue || 35) + ', 65%, 50%)');
    var q = function (cls) { return banner.querySelector(cls); };
    q('.hb-src').textContent = '№ ' + last.id + ' · ' + last.category;
    q('.hb-title').textContent = last.title.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    q('.hb-dek').textContent = dek;
  }
})();
