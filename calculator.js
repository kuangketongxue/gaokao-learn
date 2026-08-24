(function(){
  'use strict';
  var $ = window.xh && window.xh.$ ? window.xh.$ : function(id){ return document.getElementById(id); };
  var els = {
    current: $('currentScore'), target: $('targetScore'), age: $('age'),
    hours: $('hours'), effort: $('effort'), tier: $('tier'),
    major: $('major'), province: $('province'), aiDeg: $('aiDeg'),
  };
  var vals = { current: $('currentScoreVal'), target: $('targetScoreVal'), age: $('ageVal'), hours: $('hoursVal'), ai: $('aiVal') };
  var chosenPath = null;

  function fmt(n) { n = Math.round(n); if (n <= 0) return '0 万'; if (n >= 10000) return (n/10000).toFixed(1)+' 亿'; return n + ' 万'; }
  function tierName(s) {
    var p = s/750;
    if (p>=0.9) return '清北'; if (p>=0.8) return '985'; if (p>=0.68) return '211';
    if (p>=0.55) return '一本'; if (p>=0.4) return '二本'; return '专科';
  }
  function detectStatus(age) {
    var d = age - 18;
    if (d <= 0) return { repeat: 0 };
    return { repeat: Math.min(d, 4) };
  }

  var computed = {};
  function computeAll() {
    var cur = +els.current.value, tgt = +els.target.value, age = +els.age.value;
    var hours = +els.hours.value, eff = +els.effort.value, tBase = +els.tier.value;
    var mMul = +els.major.value, pMul = +els.province.value, ai = +els.aiDeg.value;
    var gap = Math.max(0, tgt - cur);
    var effortBonus = Math.min(0.5, (hours/16)*0.6) * tBase;
    var hitProb = Math.min(0.95, 0.3 + (gap/750) * eff * pMul);

    var cTier = Math.round((cur/750) * tBase);
    var conservative = Math.max(0, cTier * mMul) * ai;
    var reasonable = Math.max(0, (tBase * hitProb + effortBonus) * mMul) * ai;
    var aggressive = Math.max(0, (tBase * Math.min(0.95, hitProb+0.15) + effortBonus*1.2) * mMul) * ai;

    var maxGain = Math.max(10, Math.round(gap*0.4));
    var traj = [[0, cur]]; var sc = cur;
    for (var y=1; y<=4; y++) { var g = y===1?maxGain:y===2?Math.round(maxGain*0.5):y===3?Math.round(maxGain*0.1):-Math.round(maxGain*0.15); sc = Math.min(750,Math.max(200,sc+g)); traj.push([y,sc]); }
    function scorePrem(s) { var t=Math.round((s/750)*tBase); var p=Math.min(0.95,0.3+(s/750)*0.7); return Math.max(0,(t*p+effortBonus)*mMul)*ai; }

    var bestRY=1, bestRP=0;
    traj.forEach(function(r){ if(r[0]>0){var p=scorePrem(r[1]);if(p>bestRP){bestRP=p;bestRY=r[0];}} });

    var uPrem = Math.max(0, Math.round((cur/750)*tBase)*mMul*0.85)*ai;
    var gPaths = [{name:'学硕',cost:'~2万/年',yrs:3,boost:0.55},{name:'专硕',cost:'~5-15万',yrs:2,boost:0.45},{name:'海硕英港',cost:'25-50万',yrs:1,boost:0.65},{name:'海硕美加',cost:'40-100万',yrs:2,boost:0.8},{name:'博士',cost:'免学费',yrs:4,boost:1.0}];
    var gResults = gPaths.map(function(gp){ var gs=Math.min(750,cur+Math.round(gap*gp.boost)); return{name:gp.name,cost:gp.cost,yrs:gp.yrs,score:gs,tier:tierName(gs),prem:scorePrem(gs)}; });
    var bestGrad = gResults[4];

    var gaokao = new Date(GAOKAO_CONFIG.GAOKAO_DATE);
    var today = new Date(); today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    var remainDays = Math.max(1, Math.ceil((gaokao - today) / 864e5));

    computed = {
      cur:cur, tgt:tgt, age:age, gap:gap, ai:ai, tBase:tBase, mMul:mMul, effortBonus:effortBonus,
      conservative:conservative, reasonable:reasonable, aggressive:aggressive,
      traj:traj, bestRY:bestRY, bestRP:bestRP, scorePrem:scorePrem,
      uPrem:uPrem, gResults:gResults, bestGrad:bestGrad, remainDays:remainDays
    };
  }

  function updatePreviews() {
    computeAll();
    $('previewRepeat').textContent = fmt(computed.bestRP);
    $('previewGrad').textContent = fmt(computed.bestGrad.prem);
    $('previewWork').textContent = fmt(computed.uPrem);
  }

  window.choosePath = function(path) {
    chosenPath = path;
    document.querySelectorAll('.path-card').forEach(function(c) {
      c.classList.toggle('chosen', c.dataset.path === path);
    });
    $('resultPanel').style.display = 'block';
    renderResults(path);
    setTimeout(function() { $('resultPanel').scrollIntoView({ behavior:'smooth', block:'start' }); }, 100);
  };

  function renderResults(path) {
    var c = computed;
    var pathNames = { repeat:'复读冲刺', grad:'本科→考研', work:'直接工作' };
    var pathIcons = { repeat:'📚', grad:'🎓', work:'💼' };
    var chosenPrem = path==='repeat' ? c.bestRP : path==='grad' ? c.bestGrad.prem : c.uPrem;
    var altPaths = ['repeat','grad','work'].filter(function(p){ return p!==path; });
    function altPrem(p) { return p==='repeat'?c.bestRP:p==='grad'?c.bestGrad.prem:c.uPrem; }
    function altName(p) { return {repeat:'复读'+c.bestRY+'年',grad:'本科→考研',work:'直接工作'}[p]; }
    var diff1 = chosenPrem - altPrem(altPaths[0]);
    var diff2 = chosenPrem - altPrem(altPaths[1]);

    var verdict = '';
    if (path === 'repeat') {
      var rpTier = tierName(c.traj[c.bestRY][1]);
      verdict = '选择<strong>复读'+c.bestRY+'年</strong>冲到<strong>'+rpTier+'</strong>（'+c.traj[c.bestRY][1]+'分），终身溢价比直接工作多 <strong>' + fmt(Math.max(0,diff2)) + '</strong>，比本科→考研多 <strong>' + fmt(Math.max(0,diff1)) + '</strong>。';
      if (diff1 < 0) verdict += ' 但考研路径的确定性更高。';
      verdict += ' 代价：'+c.bestRY+'年时间 + 心理压力。';
    } else if (path === 'grad') {
      verdict = '选择<strong>本科→'+c.bestGrad.name+'</strong>，终身溢价比复读'+c.bestRY+'年 <span class="'+(diff1>=0?'neg':'')+'">'+(diff1>=0?'多':'少')+' '+fmt(Math.abs(diff1))+'</span>，比直接工作多 <strong>' + fmt(Math.max(0,diff2)) + '</strong>。';
      verdict += ' 代价：'+c.bestGrad.yrs+'年时间' + (c.bestGrad.cost.includes('万')?' + '+c.bestGrad.cost:'') + '。';
    } else {
      verdict = '选择<strong>直接工作</strong>，0额外时间成本，但终身溢价比复读'+c.bestRY+'年少 <strong>' + fmt(Math.abs(diff1)) + '</strong>，比考研少 <strong>' + fmt(Math.abs(diff2)) + '</strong>。';
      verdict += ' 适合已明确职业方向、不需要学历信号的情况。';
    }

    $('resultHeader').innerHTML =
      '<div class="rh-title">' + pathIcons[path] + ' 你选择了 ' + pathNames[path] + '</div>' +
      '<div class="rh-val">' + fmt(chosenPrem) + '</div>' +
      '<div class="rh-compare">' +
        '<div class="rh-compare-item '+(diff1>=0?'winner':'loser')+'"><div class="label">vs '+altName(altPaths[0])+'</div><div class="val">'+(diff1>=0?'+':'')+fmt(diff1)+'</div></div>' +
        '<div class="rh-compare-item '+(diff2>=0?'winner':'loser')+'"><div class="label">vs '+altName(altPaths[1])+'</div><div class="val">'+(diff2>=0?'+':'')+fmt(diff2)+'</div></div>' +
        '<div class="rh-compare-item"><div class="label">工作年限</div><div class="val">'+Math.max(1,GAOKAO_CONFIG.RETIRE_AGE-c.age)+'年</div></div>' +
      '</div>' +
      '<div class="rh-verdict">' + verdict + '</div>';

    var stack = $('resultStack');
    stack.innerHTML = '';
    if (path === 'repeat') {
      $('resultTitle').textContent = '复读轨迹详情';
      c.traj.forEach(function(r) {
        var y=r[0], s=r[1], p=c.scorePrem(s), isBest=y===c.bestRY;
        var label = y===0 ? '不复读（当前）' : (isBest ? '⭐ 最优：复读'+y+'年' : '复读'+y+'年');
        stack.innerHTML += '<div class="result-card'+(isBest?' reasonable':'')+'"><div><div class="label">'+label+'</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+tierName(s)+' · '+s+'分</div></div><div class="value" style="color:'+(isBest?'#10b981':'var(--ink)')+'">'+fmt(p)+'</div></div>';
      });
    } else if (path === 'grad') {
      $('resultTitle').textContent = '考研各路径详情';
      stack.innerHTML += '<div class="result-card conservative"><div><div class="label">不考研 · 本科直接工作</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+tierName(c.cur)+'本科</div></div><div class="value">'+fmt(c.uPrem)+'</div></div>';
      c.gResults.forEach(function(gr) {
        var isBest = gr.name === c.bestGrad.name;
        stack.innerHTML += '<div class="result-card'+(isBest?' reasonable':'')+'"><div><div class="label">'+(isBest?'⭐ ':'')+gr.name+'</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+gr.tier+' · '+gr.yrs+'年 · '+gr.cost+'</div></div><div class="value" style="color:'+(isBest?'#10b981':'var(--ink)')+'">'+fmt(gr.prem)+'</div></div>';
      });
    } else {
      $('resultTitle').textContent = '直接工作的代价';
      stack.innerHTML += '<div class="result-card"><div><div class="label">当前分数直接就业</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+tierName(c.cur)+' · 本科毕业即工作</div></div><div class="value">'+fmt(c.uPrem)+'</div></div>';
      stack.innerHTML += '<div class="result-card conservative"><div><div class="label">如果复读'+c.bestRY+'年</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+tierName(c.traj[c.bestRY][1])+' · 终身溢价增量</div></div><div class="value">+'+fmt(Math.max(0,c.bestRP-c.uPrem))+'</div></div>';
      stack.innerHTML += '<div class="result-card reasonable"><div><div class="label">如果本科→'+c.bestGrad.name+'</div><div style="font-size:12px;color:var(--muted);margin-top:2px">'+c.bestGrad.tier+' · 终身溢价增量</div></div><div class="value">+'+fmt(Math.max(0,c.bestGrad.prem-c.uPrem))+'</div></div>';
    }

    renderPaths();
    renderDailyTable();
  }

  function renderPaths() {
    var c = computed;
    var pathAEl = $('pathA'); pathAEl.innerHTML = '';
    c.traj.forEach(function(r){
      var y=r[0], s=r[1], p=c.scorePrem(s), isBest=y===c.bestRY;
      var cls='cs-card a'+(isBest?' highlight':'');
      var badge = y===0?'起点':(isBest?'⭐ 最优':'第'+y+'年');
      var gainStr = y===0?'起点'+s+'分':((s>c.traj[y-1][1]?'+':'')+(s-c.traj[y-1][1])+'分');
      pathAEl.innerHTML += '<div class="'+cls+'"><div class="tier">'+badge+'</div><div class="val">'+fmt(p)+'</div><div class="note">'+tierName(s)+' · '+s+'分 · '+gainStr+'</div></div>';
    });

    var pathBEl = $('pathB'); pathBEl.innerHTML = '<div class="cs-card b"><div class="tier">不考研</div><div class="val">'+fmt(c.uPrem)+'</div><div class="note">'+tierName(c.cur)+'本科 · 直接工作</div></div>';
    c.gResults.forEach(function(gr){ pathBEl.innerHTML += '<div class="cs-card b"><div class="tier">'+gr.name+'</div><div class="val">'+fmt(gr.prem)+'</div><div class="note">'+gr.tier+' · '+gr.yrs+'年 · '+gr.cost+'</div></div>'; });

    var diff = c.bestRP - c.bestGrad.prem;
    var rpName = '复读'+c.bestRY+'年'; var rpTier = tierName(c.traj[c.bestRY][1]);
    var gapEl = $('csGap');
    var txt = diff>0
      ? '<div class="g-title">'+rpName+'冲'+rpTier+' 比 '+c.bestGrad.name+' 多赚</div><div class="g-val">'+fmt(diff)+'</div><div class="g-note">'+rpName+'到'+rpTier+'('+c.traj[c.bestRY][1]+'分)，终身溢价比本科→'+c.bestGrad.name+'多 '+fmt(diff)+'。但复读有心理风险。</div>'
      : '<div class="g-title">'+c.bestGrad.name+'可以追回</div><div class="g-val">'+fmt(-diff)+'</div><div class="g-note">即使不复读，本科→'+c.bestGrad.name+'，终身溢价可追上'+rpName+'。代价是'+c.bestGrad.yrs+'年时间。</div>';
    if (c.ai<=0.5) txt += '<div class="cs-ai-note">🤖 AI严重贬值：学历=筛选信号，技能>文凭。技术方向保值。</div>';
    else if (c.ai<=0.7) txt += '<div class="cs-ai-note">🤖 AI中度贬值：名校仍有筛选价值，建议技术方向优先。</div>';
    gapEl.innerHTML = txt;
  }

  function renderDailyTable() {
    var c = computed;
    var tbody = $('dailyBody'); tbody.innerHTML = '';
    var status = detectStatus(c.age);
    var levels;
    if (status.repeat === 0) {
      levels = [['高一',365*3,false],['高二',365*2,false],['高三(当前)',c.remainDays,true],
       ['高四(复读1年)',365,false],['高五(复读2年)',365*2,false],['高六(复读3年)',365*3,false],['高七(复读4年)',365*4,false]];
    } else {
      levels = [['复读第'+status.repeat+'年(当前)',c.remainDays,true]];
      for(var i=status.repeat; i<4; i++) levels.push(['高'+(5+i), 365*(i-status.repeat+1), false]);
    }
    levels.forEach(function(lv){
      var daily = Math.round(c.reasonable*10000/lv[1]);
      var yrs = Math.floor(lv[1]/365), rem = lv[1]%365;
      var dStr = yrs>0 ? yrs+'年'+(rem>0?rem+'天':'') : lv[1]+'天';
      var tr = document.createElement('tr'); if(lv[2]) tr.className='current';
      tr.innerHTML = '<td>'+lv[0]+'</td><td>'+dStr+'</td><td>¥'+daily.toLocaleString()+'</td>';
      tbody.appendChild(tr);
    });
  }

  function calc() {
    vals.current.textContent = els.current.value;
    vals.target.textContent = els.target.value;
    vals.age.textContent = els.age.value + ' 岁';
    vals.hours.textContent = els.hours.value + ' 小时';
    vals.ai.textContent = (+els.aiDeg.value).toFixed(2);
    updatePreviews();
    if (chosenPath) renderResults(chosenPath);
  }

  /* ── Turnstile 验证回调 ── */
  window.onTurnstileSuccess = function(token) {
    document.getElementById('turnstile-gate').style.display = 'none';
    document.getElementById('calc-content').style.display = '';
  };

  Object.keys(els).forEach(function(k){ els[k].addEventListener('input', calc); });
  updatePreviews();
})();
