// ============================================================
// 高考知识点精讲 · 内容数据文件
// ─────────────────────────────────────────────────
// 【怎么加新章节】在 EXPLORE_CHAPTERS 数组末尾复制一段改文字即可：
//   id        : 章节编号（递增字符串）
//   category  : "科目 · 主题"，如 "化学 · 晶体结构"
//   title     : 大标题，用 <span class="em">…</span> 标强调词，<br> 手动换行
//   body      : 正文段落，可含 <strong> 强调
//   dataItems : 底部 3 个要点卡 [{value, label}]
//   accentHue : 本章主题色相 0-360（橙35/蓝200/绿150/黄45/紫270/红10…）
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
  }
];
