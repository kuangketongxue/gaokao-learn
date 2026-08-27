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

  // 路由判断：/ch/{id}/
  var m = location.pathname.match(/^\/ch\/(\d+)\/?$/);
  if (m) {
    renderStandalone(m[1]);
  } else {
    renderList();
  }

  // 首页：渲染章节卡片列表（原逻辑）
  function renderList() {
    var mount = document.getElementById('exploreMount');
    if (!mount || typeof EXPLORE_CHAPTERS === 'undefined' || !EXPLORE_CHAPTERS.length) return;

    mount.innerHTML = EXPLORE_CHAPTERS.map(function (ch, i) {
      var items = (ch.dataItems || []).map(function (d) {
        return '<div class="exp-d-item">' +
          '<span class="exp-d-num" data-value="' + esc(d.value) + '">' + esc(d.value) + '</span>' +
          '<span class="exp-d-label">' + esc(d.label) + '</span>' +
          '</div>';
      }).join('');

      // 每张卡片包 <a href="/ch/{id}/"> 跳转到独立页
      return '<a class="exp-chapter-link" href="/ch/' + esc(ch.id) + '/">' +
        '<div class="exp-chapter" data-chapter="' + esc(ch.id) + '">' +
          '<div class="exp-bg" style="--accent-hue: ' + Number(ch.accentHue || 35) + '">' +
            '<div class="exp-bg-gradient"></div></div>' +
          '<div class="exp-inner">' +
            '<div class="exp-ch-label mono"><span class="exp-ch-num">' + esc(ch.id) + '</span>' +
            '<span class="exp-ch-cat">' + esc(ch.category) + '</span>' +
            (ch.date ? '<span class="exp-ch-date mono">📅 ' + esc(ch.date) + '</span>' : '') + '</div>' +
            '<h2 class="exp-ch-title">' + rich(ch.title) + '</h2>' +
            '<div class="exp-body-wrap"><p class="exp-ch-body">' + rich(ch.body) + '</p></div>' +
          '</div>' +
          '<div class="exp-data">' + items + '</div>' +
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
      document.body.innerHTML = '<div style="padding:60px;text-align:center"><h2>章节不存在</h2><a href="/">← 返回首页</a></div>';
      return;
    }

    var items = (ch.dataItems || []).map(function (d) {
      return '<div class="exp-d-item">' +
        '<span class="exp-d-num" data-value="' + esc(d.value) + '">' + esc(d.value) + '</span>' +
        '<span class="exp-d-label">' + esc(d.label) + '</span>' +
        '</div>';
    }).join('');

    var main = document.querySelector('.rise');
    if (main) {
      main.innerHTML =
        '<article class="exp-article" data-chapter="' + esc(ch.id) + '" style="--accent-hue:' + Number(ch.accentHue || 35) + '">' +
          '<div class="exp-bg"><div class="exp-bg-gradient"></div></div>' +
          '<div class="exp-inner">' +
            '<div class="exp-ch-label mono"><a href="/" class="back-link">← 返回首页</a><span class="exp-ch-num">' + esc(ch.id) + '</span>' +
            '<span class="exp-ch-cat">' + esc(ch.category) + '</span>' +
            (ch.date ? '<span class="exp-ch-date mono">📅 ' + esc(ch.date) + '</span>' : '') + '</div>' +
            '<h1 class="exp-ch-title">' + rich(ch.title) + '</h1>' +
            '<div class="exp-ch-body-wrap">' + rich(ch.body) + '</div>' +
          '</div>' +
          '<div class="exp-data">' + items + '</div>' +
        '</article>';
    }

    // 更新 SEO meta（动态）
    document.title = ch.title.replace(/<[^>]+>/g, ' ').trim() + ' · 高考知识点精讲';
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
