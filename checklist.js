(function(){
  'use strict';
  var $ = window.xh && window.xh.$ ? window.xh.$ : function(id){ return document.getElementById(id); };

  var START = new Date(GAOKAO_CONFIG.START_DATE);
  var DEADLINE = new Date(GAOKAO_CONFIG.DEADLINE);
  var GAOKAO = new Date(GAOKAO_CONFIG.GAOKAO_DATE);
  var TODAY_KEY = (function(){ var d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); })();
  var NOW = new Date();
  var HOUR = NOW.getHours();

  var PERIODS = [
    { id:'morning', icon:'🌅', title:'早起', time:'5:30~7:00', tasks:[
      { id:'d11', label:'记录睡眠', hint:'入睡/起床/总时长7-8h', sleep:true }
    ]},
    { id:'am', icon:'📚', title:'上午学习', time:'8:00~12:00', tasks:[
      { id:'d1', label:'数学压轴题≥3道', hint:'导数/圆锥曲线轮换' },
      { id:'d2', label:'物理电磁综合≥2道', hint:'带电粒子/电磁感应/动量能量' },
      { id:'d3', label:'化学工业流程≥3道', hint:'原料预处理→核心反应→分离提纯' },
      { id:'d4', label:'真题/模拟卷≥1套', hint:'隔天轮换：做一套→分析一套' },
      { id:'d5', label:'选填限时≤45min', hint:'超39min橙警，超45min未达标' },
      { id:'d6', label:'草稿纸分区书写', hint:'每道题划区，乱写=未达标' }
    ]},
    { id:'noon', icon:'🍚', title:'午间', time:'12:00~13:00', tasks:[
      { id:'d9', label:'分析昨日丢分', hint:'题号→丢分→归因→下次动作' },
      { id:'d13', label:'碎片时间≥15min', hint:'排队/走路/吃饭时背单词/古诗/政治' }
    ]},
    { id:'pm', icon:'📝', title:'下午学习', time:'13:00~18:00', tasks:[
      { id:'d7', label:'每科专项检查≥10min', hint:'计算过程/抄写数字/单位换算' },
      { id:'d8', label:'不会的先跳过', hint:'记录用时+回头做完时间' },
      { id:'d10', label:'手机锁起来/关机', hint:'Forest+番茄钟，摸一次=未达标' },
      { id:'d12', label:'60%时间给提分最大科目', hint:'按距满分差距排序' }
    ]},
    { id:'night', icon:'🌙', title:'每日总结', time:'22:00~22:30', tasks:[
      { id:'d14', label:'打勾总结+明日3件事', hint:'5分钟闭环', note:true }
    ]}
  ];

  var WEEKLY = [
    { id:'w1', label:'非必要社交归零', hint:'不参加无助于高考的聚会/聊天/活动' },
    { id:'w2', label:'⚠️不熟知识点清零', hint:'对照上周不熟清单，本周全部搞定' },
    { id:'w3', label:'压轴题专项达标', hint:'导数+圆锥各≥10/电磁≥7/工业流程≥15' },
    { id:'w4', label:'周末限时模拟考', hint:'语文150→数学120→英语120→选科各75' },
    { id:'w5', label:'有效学习≥70小时', hint:'日均10h×7，不够周日补到70' },
    { id:'w6', label:'周日晚制定下周计划', hint:'按科目分解到每天，含目标和任务量' }
  ];

  var MONTHLY = [
    { id:'m1', label:'真题≥6套', hint:'累积到21套通关' },
    { id:'m2', label:'高频题型变体≥50道', hint:'按题型清单逐一打勾' },
    { id:'m3', label:'知识点地毯式排查', hint:'过所有考纲知识点，标注会/不会/不熟' },
    { id:'m4', label:'自我评估+下月优先级', hint:'提1分耗时最短的优先' }
  ];

  var MILESTONES = [
    { id:'ms1', icon:'①', title:'一轮复习5.28~8.31', desc:'知识点覆盖100%，各科公式能自己推导' },
    { id:'ms2', icon:'②', title:'二轮复习9~12月', desc:'强化提升所有知识点，各科题型专项突破' },
    { id:'ms3', icon:'③', title:'三轮复习1~3月', desc:'真题模拟题全覆盖，近10年真题≥21套' },
    { id:'ms4', icon:'④', title:'冲刺阶段4~5月', desc:'英语写作+语文作文+各科查漏补缺' },
    { id:'ms5', icon:'❂', title:'高频题型≥50道变体/题型', desc:'化学工业流程每类≥100道' },
    { id:'ms6', icon:'❃', title:'考纲公式独立推导', desc:'不看书不查资料，卡住=没真懂' },
    { id:'ms7', icon:'⭐', title:'高考总分≥688', desc:'每天追踪距688差距' }
  ];

  var TARGETS = [
    { subject:'语文', current:90, target:130 },
    { subject:'数学', current:80, target:130 },
    { subject:'英语', current:100, target:140 },
    { subject:'物理', current:60, target:90 },
    { subject:'化学', current:60, target:90 },
    { subject:'政治', current:80, target:95 }
  ];

  function weekKey(){var d=new Date(),jan1=new Date(d.getFullYear(),0,1),days=Math.floor((d-jan1)/864e5);return d.getFullYear()+'-W'+String(Math.ceil((days+jan1.getDay()+1)/7)).padStart(2,'0');}
  function monthKey(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');}
  function daysBetween(a,b){return Math.ceil((b-a)/864e5);}
  function dateKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function loadObj(k){try{var r=localStorage.getItem(k);return r?JSON.parse(r):{};}catch(e){return {};}}
  function saveObj(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  var SK={daily:'ck_daily',weekly:'ck_weekly',monthly:'ck_monthly',ms:'ck_ms',targets:'ck_targets',notes:'ck_notes',sleep:'ck_sleep',tab:'ck_tab'};

  function getCurrentPeriod(){
    if(HOUR<7)return'morning';if(HOUR<12)return'am';if(HOUR<13)return'noon';if(HOUR<18)return'pm';return'night';
  }

  function updateNowBanner(){
    var map=loadObj(SK.daily)[TODAY_KEY]||{};
    var currentId=getCurrentPeriod();
    var period=PERIODS.find(function(p){return p.id===currentId;});
    var banner=$('nowBanner');
    var allDone=period.tasks.every(function(t){return!!map[t.id];});
    var doneCount=period.tasks.filter(function(t){return!!map[t.id];}).length;
    if(allDone){
      var next=null;
      for(var i=0;i<PERIODS.length;i++){var p=PERIODS[i];if(!p.tasks.every(function(t){return!!map[t.id];})){next=p;break;}}
      if(next){banner.className='ck-now';banner.innerHTML='<div class="now-label">✅ '+period.title+' 已完成</div><div class="now-text">接下来：'+next.icon+' '+next.title+'</div><div class="now-hint">'+next.time+' · '+next.tasks.length+'项待完成</div>';}
      else{banner.className='ck-now done-all';banner.innerHTML='<div class="now-label">🎉 今日全部完成！</div><div class="now-text">完美的一天，明天继续！</div>';}
    }else{
      banner.className='ck-now';banner.innerHTML='<div class="now-label">⚡ 当前时段</div><div class="now-text">'+period.icon+' '+period.title+'（'+period.time+'）</div><div class="now-hint">'+doneCount+'/'+period.tasks.length+' 已完成，'+(period.tasks.length-doneCount)+' 项待做</div>';
    }
  }

  function updateCountdowns(){
    var today=new Date(NOW.getFullYear(),NOW.getMonth(),NOW.getDate());
    $('cdGaokao').textContent=Math.max(0,daysBetween(today,GAOKAO));
    $('cdDeadline').textContent=Math.max(0,daysBetween(today,DEADLINE));
    $('cdElapsed').textContent=Math.max(0,daysBetween(START,today)+1);
  }

  function updateRing(pct){$('progressPct').textContent=pct+'%';}

  function renderDaily(){
    var panel=$('panel-daily');
    var map=loadObj(SK.daily)[TODAY_KEY]||{};
    var currentId=getCurrentPeriod();
    var totalDone=0,totalAll=0;
    var html='';
    PERIODS.forEach(function(period){
      var done=0;
      var isNow=period.id===currentId;
      html+='<div class="ck-period'+(isNow?' now':'')+'" id="period-'+period.id+'">';
      html+='<div class="ck-period-head"><span class="ck-period-icon">'+period.icon+'</span><span class="ck-period-title">'+period.title+'</span><span class="ck-period-time">'+period.time+'</span>';
      var pct=period.tasks.length?Math.round(period.tasks.filter(function(t){return!!map[t.id];}).length/period.tasks.length*100):0;
      html+='<div class="ck-period-bar"><div class="ck-period-bar-fill" style="width:'+pct+'%"></div></div></div>';
      period.tasks.forEach(function(t){
        totalAll++;
        var isDone=!!map[t.id];if(isDone){done++;totalDone++;}
        html+='<div class="ck-task'+(isDone?' done':'')+'" data-id="'+t.id+'"><div class="ck-cb"></div><div class="ck-body"><div class="ck-label">'+t.label+'</div>';
        if(t.hint)html+='<div class="ck-hint">'+t.hint+'</div>';
        if(t.sleep){
          var sl=loadObj(SK.sleep)[TODAY_KEY]||{};
          html+='<div class="ck-sleep"><div><div class="ck-sleep-l">入睡</div><input type="time" data-field="in" value="'+(sl.in||'')+'"></div><div><div class="ck-sleep-l">起床</div><input type="time" data-field="out" value="'+(sl.out||'')+'"></div><div><div class="ck-sleep-l">时长</div><input type="time" data-field="dur" value="'+(sl.dur||'')+'" readonly style="opacity:.6"></div></div>';
        }
        html+='</div></div>';
      });
      html+='</div>';
    });
    html+='<div class="ck-period"><div class="ck-period-head"><span class="ck-period-icon">📋</span><span class="ck-period-title">每日总结</span></div><textarea class="ck-note" placeholder="今日复盘+明日最重要的3件事…">'+(loadObj(SK.notes)[TODAY_KEY]||'')+'</textarea></div>';
    panel.innerHTML=html;
    var pct=totalAll?Math.round(totalDone/totalAll*100):0;
    updateRing(pct);$('progCount').textContent=totalDone+'/'+totalAll;
    updateNowBanner();
    setTimeout(function(){var el=document.getElementById('period-'+currentId);if(el)el.scrollIntoView({behavior:'smooth',block:'center'});},300);
  }

  function renderPeriodTasks(panelId,data,storageKey,timeKey,title){
    var panel=$(panelId);var tk=timeKey();var map=loadObj(storageKey)[tk]||{};
    var html='<div class="ck-group"><div class="ck-group-title">'+title+'（'+tk+'）</div>';
    data.forEach(function(t){var d=!!map[t.id];html+='<div class="ck-task'+(d?' done':'')+'" data-id="'+t.id+'"><div class="ck-cb"></div><div class="ck-body"><div class="ck-label">'+t.label+'</div><div class="ck-hint">'+t.hint+'</div></div></div>';});
    html+='</div>';panel.innerHTML=html;
  }
  function renderWeekly(){renderPeriodTasks('panel-weekly',WEEKLY,SK.weekly,weekKey,'本周任务');}
  function renderMonthly(){renderPeriodTasks('panel-monthly',MONTHLY,SK.monthly,monthKey,'本月任务');}

  function renderLongterm(){
    var panel=$('panel-longterm');var map=loadObj(SK.ms);var html='';
    MILESTONES.forEach(function(m){var d=!!map[m.id];html+='<div class="ck-milestone'+(d?' done':'')+'" data-id="'+m.id+'"><div class="ck-ms-icon"></div><div class="ck-ms-body"><div class="ck-ms-title">'+m.icon+' '+m.title+'</div><div class="ck-ms-desc">'+m.desc+'</div></div></div>';});
    panel.innerHTML=html;
  }

  function renderTargets(){
    var panel=$('panel-targets');var saved=loadObj(SK.targets);var totalCur=0;
    var html='<div class="ck-targets">';
    TARGETS.forEach(function(t){var cur=saved[t.subject]!==undefined?saved[t.subject]:t.current;totalCur+=cur;var pct=Math.round(cur/t.target*100);
      html+='<div class="ck-tc"><div class="sub">'+t.subject+'</div><div class="val">'+cur+' / '+t.target+'</div><div class="gap">差 '+(t.target-cur)+' 分</div><div class="bar"><div class="bar-fill" style="width:'+Math.min(100,pct)+'%"></div></div><input type="range" min="0" max="'+t.target+'" value="'+cur+'" data-subject="'+t.subject+'"></div>';});
    html+='<div class="ck-tc total"><div class="sub">总分</div><div class="val">'+totalCur+' / '+TARGET+'</div><div class="gap">距清华差 '+Math.max(0,TARGET-totalCur)+' 分</div><div class="bar"><div class="bar-fill" style="width:'+Math.min(100,Math.round(totalCur/TARGET*100))+'%"></div></div></div></div>';
    panel.innerHTML=html;
  }

  var renderers={daily:renderDaily,weekly:renderWeekly,monthly:renderMonthly,longterm:renderLongterm,targets:renderTargets};
  function switchTab(tab){
    document.querySelectorAll('.ck-tab').forEach(function(b){b.classList.toggle('on',b.dataset.tab===tab);});
    document.querySelectorAll('.ck-panel').forEach(function(p){p.classList.toggle('on',p.id==='panel-'+tab);});
    if(renderers[tab])renderers[tab]();
    try{localStorage.setItem(SK.tab,tab);}catch(e){}
  }
  document.querySelectorAll('.ck-tab').forEach(function(b){b.addEventListener('click',function(){switchTab(this.dataset.tab);});});

  /* ── Single delegated event listeners ── */
  $('panel-daily').addEventListener('click',function(e){
    var task=e.target.closest('.ck-task');if(!task||e.target.tagName==='INPUT')return;
    var id=task.dataset.id;var all=loadObj(SK.daily);if(!all[TODAY_KEY])all[TODAY_KEY]={};
    all[TODAY_KEY][id]=!all[TODAY_KEY][id];saveObj(SK.daily,all);renderDaily();
  });
  $('panel-daily').addEventListener('change',function(e){
    if(e.target.matches('.ck-sleep input[type="time"]')){
      var sleepDiv=e.target.closest('.ck-task');var sl=loadObj(SK.sleep);var vals={};
      sleepDiv.querySelectorAll('input[type="time"]').forEach(function(i){vals[i.dataset.field]=i.value;});
      sl[TODAY_KEY]=vals;
      if(vals.in&&vals.out){var parts=function(s){var p=s.split(':');return+p[0]*60+ +p[1];};var diff=parts(vals.out)-parts(vals.in);if(diff<0)diff+=24*60;vals.dur=Math.floor(diff/60)+':'+String(diff%60).padStart(2,'0');sleepDiv.querySelector('[data-field="dur"]').value=vals.dur;}
      saveObj(SK.sleep,sl);
    }
  });
  var noteTimer;
  $('panel-daily').addEventListener('input',function(e){
    if(e.target.matches('.ck-note')){var self=e.target;clearTimeout(noteTimer);noteTimer=setTimeout(function(){var n=loadObj(SK.notes);n[TODAY_KEY]=self.value;saveObj(SK.notes,n);},400);}
  });
  $('panel-weekly').addEventListener('click',function(e){
    var task=e.target.closest('.ck-task');if(!task)return;var id=task.dataset.id;var wk=weekKey();
    var all=loadObj(SK.weekly);if(!all[wk])all[wk]={};all[wk][id]=!all[wk][id];saveObj(SK.weekly,all);renderWeekly();
  });
  $('panel-monthly').addEventListener('click',function(e){
    var task=e.target.closest('.ck-task');if(!task)return;var id=task.dataset.id;var mk=monthKey();
    var all=loadObj(SK.monthly);if(!all[mk])all[mk]={};all[mk][id]=!all[mk][id];saveObj(SK.monthly,all);renderMonthly();
  });
  $('panel-longterm').addEventListener('click',function(e){
    var el=e.target.closest('.ck-milestone');if(!el)return;
    var all=loadObj(SK.ms);all[el.dataset.id]=!all[el.dataset.id];saveObj(SK.ms,all);renderLongterm();
  });
  $('panel-targets').addEventListener('input',function(e){
    if(e.target.matches('input[type="range"]')){
      var sv=loadObj(SK.targets);sv[e.target.dataset.subject]=+e.target.value;saveObj(SK.targets,sv);
      var card=e.target.closest('.ck-tc');if(card){
        var val=+e.target.value;var t=TARGETS.find(function(t){return t.subject===e.target.dataset.subject;});
        if(t){card.querySelector('.val').textContent=val+' / '+t.target;card.querySelector('.gap').textContent='差 '+(t.target-val)+' 分';card.querySelector('.bar-fill').style.width=Math.min(100,Math.round(val/t.target*100))+'%';}
        var totalCur=0;TARGETS.forEach(function(tgt){var sv2=loadObj(SK.targets);totalCur+=(sv2[tgt.subject]!==undefined?sv2[tgt.subject]:tgt.current);});
        var totalCard=document.querySelector('.ck-tc.total');if(totalCard){totalCard.querySelector('.val').textContent=totalCur+' / '+TARGET;totalCard.querySelector('.gap').textContent='距清华差 '+Math.max(0,TARGET-totalCur)+' 分';totalCard.querySelector('.bar-fill').style.width=Math.min(100,Math.round(totalCur/TARGET*100))+'%';}
      }
    }
  });

  /* ── Init ── */
  updateCountdowns();renderDaily();
  try{var st=localStorage.getItem(SK.tab);if(st&&renderers[st])switchTab(st);}catch(e){}

  setInterval(function(){
    var d=new Date();var k=dateKey(d);
    if(k!==TODAY_KEY)location.reload();
    updateCountdowns();NOW=d;var newH=d.getHours();
    if(newH!==HOUR){HOUR=newH;renderDaily();}
  },60000);

})();
