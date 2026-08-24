// ============================================================
// 高考知识点精讲 · 内容数据文件
// ─────────────────────────────────────────────────
// 【怎么加新章节】在 EXPLORE_CHAPTERS 数组末尾复制一段改文字即可：
//   id        : 章节编号（递增字符串）
//   category  : "主题 · 科目"，如 "化学平衡 · 化学"
//   title     : 大标题，用 <span class="em">…</span> 标强调词，<br> 手动换行
//   body      : 正文段落，可含 <strong> 强调
//   dataItems : 底部 3 个要点卡 [{value, label}]
//   accentHue : 本章主题色相 0-360（橙35/蓝200/绿150/黄45/紫285/红12…）
// ============================================================

var EXPLORE_CHAPTERS = [
  {
    id: '01',
    category: '导数 · 数学',
    title: '导数不是公式，<br>是<span class="em">正在发生的</span>变化。',
    body: '加速度表的指针在动，那根指针的"动得有多快"就是导数。<br>它不是死记的符号，是任何连续变化的<strong>瞬时快慢</strong>。',
    dataItems: [
      { value: "f'(x)", label: '瞬时变化率' },
      { value: '切线斜率', label: '几何意义' },
      { value: "f'(x) = 0", label: '极值点条件' }
    ],
    accentHue: 35
  },
  {
    id: '02',
    category: '受力分析 · 物理',
    title: '所有力，先<span class="em">拆</span>再<span class="em">合</span>。',
    body: '把物体从世界中孤立出来，只留它和周围的相互作用。<br>重力、弹力、摩擦力——三个清单列完，受力图就画完了。',
    dataItems: [
      { value: 'ΣF = ma', label: '牛顿第二定律' },
      { value: '正交分解', label: 'X/Y 轴分别列' },
      { value: 'ΣF = 0', label: '平衡条件' }
    ],
    accentHue: 200
  },
  {
    id: '03',
    category: '化学平衡 · 化学',
    title: '平衡不是<span class="em">静止</span>，<br>是<span class="em">势均力敌</span>。',
    body: '正反应速率 = 逆反应速率，不是"不动了"——<br>是两股力量相互抵消，<strong>动态的均势</strong>。',
    dataItems: [
      { value: 'v正 = v逆', label: '平衡条件' },
      { value: '勒夏特列', label: '移动方向判断' },
      { value: 'K = [产物]/[反应物]', label: '平衡常数' }
    ],
    accentHue: 150
  },
  {
    id: '04',
    category: '三角函数 · 数学',
    title: '圆周运动，<br><span class="em">投影到直尺</span>上。',
    body: '一个点在圆上转，它在水平轴上的投影就是 sin。<br>旋转 → 投影 → 波形——<strong>一句话讲完三角函数的本质</strong>。',
    dataItems: [
      { value: 'sin² + cos² = 1', label: '核心恒等式' },
      { value: 'y = A sin(ωx+φ)', label: '振幅 / 频率 / 相位' },
      { value: '弧长 = rθ', label: '弧度制' }
    ],
    accentHue: 45
  },
  {
    id: '05',
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
    id: '06',
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
    id: '07',
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
    id: '08',
    category: '硫及其化合物 · 化学',
    title: '褪色分两种：<br><span class="em">漂白</span>和<span class="em">被氧化</span>。',
    body: '铜与浓硫酸加热：Cu + 2H₂SO₄(浓) → CuSO₄ + SO₂↑ + 2H₂O，体现浓硫酸的<strong>强氧化性</strong>。<br>SO₂ 使酸性 KMnO₄ 溶液褪色，靠的不是漂白性，而是 <strong>+4 价硫的还原性</strong>——它把 MnO₄⁻ 还原了。',
    dataItems: [
      { value: 'Cu→CuSO₄', label: '浓硫酸·强氧化性（需加热）' },
      { value: 'SO₂→SO₄²⁻', label: '硫升价·表现还原性' },
      { value: '紫色褪去', label: 'MnO₄⁻ 被 SO₂ 还原' }
    ],
    accentHue: 55
  }
];
