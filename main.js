// ============================================================
// 高考知识点精讲 · 主脚本
// 功能：导航、主题切换、滚动动画
// ============================================================

(function () {
  'use strict';

  // ---------- 工具函数 ----------
  var $ = function (id) { return document.getElementById(id); };
  window.xh = window.xh || {};
  window.xh.$ = $;

  // ---------- 1. 移动端导航 ----------
  var toggle = $('navToggle');
  var links = $('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---------- 2. 页脚年份 ----------
  var y = $('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---------- 3. 主题切换 ----------
  var themeBtn = $('btnTheme');
  var icon = themeBtn ? themeBtn.querySelector('.ico') : null;

  function getTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function setTheme(t) {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('xh-theme', t); } catch (e) {}
    if (icon) icon.textContent = t === 'dark' ? '🌙' : '☀️';
  }

  // 初始化主题（head 内联脚本已处理，这里做兜底）
  try {
    var saved = localStorage.getItem('xh-theme');
    if (!saved) {
      saved = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    setTheme(saved);
  } catch (e) {
    setTheme('light');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // ---------- 4. 滚动渐入动画 ----------
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    // 观察所有 section、卡片 + 知识探索章节
    document.querySelectorAll('.section, .card, .home-banner').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s cubic-bezier(.2,.7,.2,1), transform .5s cubic-bezier(.2,.7,.2,1)';
      observer.observe(el);
    });

    // 知识探索章节：滚动成型（两阶段动画 + 数字计数）
    document.querySelectorAll('.exp-chapter').forEach(function (el) {
      // 数字计数动画
      var counters = el.querySelectorAll('.exp-d-num');
      var counted = false;

      function animateCounters() {
        if (counted) return;
        counted = true;
        counters.forEach(function (counter) {
          var text = counter.textContent.trim();
          // 只对纯数字开头的做计数动画
          var match = text.match(/^([\d,]+\.?\d*)/);
          if (!match) return;
          var target = parseFloat(match[1].replace(/,/g, ''));
          if (isNaN(target) || target === 0) return;
          var suffix = text.replace(match[1], '');
          var prefix = text.substring(0, text.indexOf(match[1]));
          var duration = 1200;
          var start = performance.now();

          function step(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            // ease-out
            var ease = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(target * ease);
            if (target >= 1000) {
              counter.textContent = prefix + current.toLocaleString() + suffix;
            } else if (target % 1 !== 0) {
              counter.textContent = prefix + (target * ease).toFixed(1) + suffix;
            } else {
              counter.textContent = prefix + current + suffix;
            }
            if (progress < 1) {
              requestAnimationFrame(step);
            }
          }
          requestAnimationFrame(step);
        });
      }

      // 进入视口：两阶段触发
      var revealTimer = null;

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            el.classList.add('in');
            revealTimer = setTimeout(function () {
              el.classList.add('reveal');
              animateCounters();
            }, 700);
          } else {
            el.classList.remove('in', 'reveal');
            clearTimeout(revealTimer);
            counted = false;
            // 恢复原始文本
            counters.forEach(function (counter) {
              var text = counter.textContent.trim();
              // 如果包含 HTML data 属性存储的原始值
              var orig = counter.getAttribute('data-value');
              if (orig) counter.textContent = orig;
            });
            io.unobserve(el);
            // 重新观察（下次滚入时重新触发）
            setTimeout(function () { io.observe(el); }, 100);
          }
        });
      }, { threshold: 0.1 });

      io.observe(el);
    });
  }

  // 动画 CSS 类
  var style = document.createElement('style');
  style.textContent = '.in { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);

})();
