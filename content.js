// ============================================================
// 高考知识点精讲 · 内容数据文件
// ─────────────────────────────────────────────────
// 【怎么加新章节】在 EXPLORE_CHAPTERS 数组末尾复制一段改文字即可：
//   id        : 章节编号（递增字符串）
//   category  : "主题 · 科目"，如 "物质分类 · 化学"
//   title     : 大标题，用 <span class="em">…</span> 标强调词，<br> 手动换行
//   body      : 正文段落，可含 <strong> 强调
//   dataItems : 底部 3 个要点卡 [{value, label}]
//   accentHue : 本章主题色相 0-360（橙35/蓝200/绿150/黄45/紫285/红12…）
// ============================================================

var EXPLORE_CHAPTERS = [
  {
    id: '01',
    date: '2026-08-24',
    category: '物质分类 · 化学',
    title: '键型看<span class="em">构成微粒</span>，<br>不看名字猜。',
    body: '铌酸锂：Li⁺ 与 NbO₃⁻ 阴阳离子相吸 → <strong>离子晶体</strong>；SiC：原子间共价网状结合 → 原子晶体。合金硬度通常<strong>大于</strong>纯金属；He 是单原子分子——原子之间<strong>没有化学键</strong>。',
    dataItems: [
      { value: 'LiNbO₃', label: '离子晶体（含离子键）' },
      { value: 'SiC', label: '原子晶体·高温结构陶瓷' },
      { value: 'He', label: '无化学键的单原子分子' }
    ],
    accentHue: 285
  },
  {
    id: '02',
    date: '2026-08-24',
    category: '分离提纯 · 化学',
    title: '蒸馏：按沸点，<br><span class="em">分批带走</span>。',
    body: '乙酸乙酯是液体，沸点较低（约 77℃）。加热蒸馏，它先汽化、再冷凝收集——<strong>固体干燥剂和高沸点杂质留在烧瓶里</strong>。<br>这是有机液体提纯常用的最后一步。',
    dataItems: [
      { value: '≈77℃', label: '乙酸乙酯沸点' },
      { value: '蒸发 + 冷凝', label: '蒸馏两步走' },
      { value: '留瓶中', label: '干燥剂·高沸点杂质' }
    ],
    accentHue: 12
  },
  {
    id: '03',
    date: '2026-08-24',
    category: '高分子材料 · 化学',
    title: '塑料也能被自然<br><span class="em">「吃掉」</span>。',
    body: '用聚乳酸制作可降解的一次性餐具，利用的是 PLA 良好的<strong>生物可降解性</strong>——<br>微生物能把它分解成二氧化碳和水，不留百年垃圾。',
    dataItems: [
      { value: 'PLA', label: '聚乳酸·可降解塑料' },
      { value: '生物可降解', label: '餐具选材依据' },
      { value: 'CO₂ + H₂O', label: '最终降解产物' }
    ],
    accentHue: 130
  },
  {
    id: '04',
    date: '2026-08-24',
    category: '硫及其化合物 · 化学',
    title: '褪色分两种：<br><span class="em">漂白</span>和<span class="em">被氧化</span>。',
    body: '铜与浓硫酸加热：Cu + 2H₂SO₄(浓) → CuSO₄ + SO₂↑ + 2H₂O，体现浓硫酸的<strong>强氧化性</strong>。<br>SO₂ 使酸性 KMnO₄ 溶液褪色，靠的不是漂白性，而是 <strong>+4 价硫的还原性</strong>——它把 MnO₄⁻ 还原了。',
    dataItems: [
      { value: 'Cu→CuSO₄', label: '浓硫酸·强氧化性（需加热）' },
      { value: 'SO₂→SO₄²⁻', label: '硫升价·表现还原性' },
      { value: '紫色褪去', label: 'MnO₄⁻ 被 SO₂ 还原' }
    ],
    accentHue: 55
  },
  {
    id: '05',
    date: '2026-08-27',
    category: '机械能守恒 · 物理',
    title: '只有重力弹力做功，<br><span class="em">机械能</span>不变。',
    body: '在只有<strong>重力或弹力</strong>做功的物体系统内，动能与势能可以相互转化，而总的机械能保持不变。<br>判断关键看「有没有非保守力做功」——摩擦力、空气阻力做功会消耗机械能，机械能就不守恒。',
    dataItems: [
      { value: 'E机 = 常量', label: '机械能守恒条件' },
      { value: '动能 ⇌ 势能', label: '两者相互转化' },
      { value: '无非保守力', label: '摩擦/空气阻力不可做功' }
    ],
    accentHue: 200
  },
  {
    id: '06',
    date: '2026-08-27',
    category: '天体运动 · 物理',
    title: '绕同一天体：<br><span class="em">高轨低速</span>大周期。',
    body: '绕同一中心天体（地球）的所有卫星：轨道越高，线速度 v 越<strong>小</strong>、角速度 ω 越<strong>小</strong>、周期 T 越<strong>大</strong>。<br>赤道上随地球自转的地面物体，与同步卫星<strong>周期 T、角速度 ω 相同</strong>——因为同 ω，故 v=ωr、a=ω²r（r 不同所以 v、a 不同）。',
    dataItems: [
      { value: '高轨', label: 'v小·ω小·T大' },
      { value: 'v = ωr', label: '同 ω 系统的线速度' },
      { value: 'a = ω²r', label: '同 ω 系统的向心加速度' }
    ],
    accentHue: 175
  },
  {
    id: '07',
    date: '2026-08-27',
    category: '宇宙速度 · 物理',
    title: '近地卫星的速度，<br>是<span class="em">第一宇宙速度</span>。',
    body: '近地卫星的环绕速度（贴近地表做圆周运动的速度）即<strong>第一宇宙速度</strong>，约 <strong>7.9 km/s</strong>。<br>它是人造卫星的最小发射速度，也是最大的环绕速度——轨道越高，环绕速度反而越小。',
    dataItems: [
      { value: '7.9 km/s', label: '第一宇宙速度' },
      { value: '最小发射', label: '能上天的最小速度' },
      { value: '最大环绕', label: '近地轨道环绕最快' }
    ],
    accentHue: 260
  }
];
