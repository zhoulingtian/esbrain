// ESbrain 终版 index.html 冒烟测试：DOM 桩 + 全屏渲染 + 学习流/测验/语音/导入导出
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const main = scripts.reduce((a, b) => (b.length > a.length ? b : a));

// ---------- DOM 桩 ----------
const storageLog = [];
function makeLocalStorage() {
  const m = new Map();
  return {
    getItem: k => (storageLog.push(['get', k]), m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { storageLog.push(['set', k]); m.set(k, String(v)); },
    removeItem: k => { storageLog.push(['rm', k]); m.delete(k); },
    clear: () => m.clear(),
  };
}
function makeEl(id) {
  const el = {
    id, innerHTML: '', textContent: '', value: '', disabled: false,
    style: {}, dataset: {}, files: [],
    classList: {
      _s: new Set(),
      add(...c) { c.forEach(x => this._s.add(x)); },
      remove(...c) { c.forEach(x => this._s.delete(x)); },
      contains(c) { return this._s.has(c); },
      toggle(c) { this._s.has(c) ? this._s.delete(c) : this._s.add(c); },
    },
    addEventListener() {}, removeEventListener() {},
    appendChild() {}, remove() {}, click() {}, focus() {}, blur() {},
    querySelector() { return makeEl('q'); }, querySelectorAll() { return [makeEl('a'), makeEl('b'), makeEl('c'), makeEl('d'), makeEl('e'), makeEl('f')]; },
    setAttribute() {}, getAttribute() { return null; },
    selectionStart: 0, selectionEnd: 0,
  };
  return el;
}
const elCache = new Map();
let voices = [];
let lastUtterance = null;
let lastBlob = null;

globalThis.localStorage = makeLocalStorage();
globalThis.document = {
  getElementById(id) { if (!elCache.has(id)) elCache.set(id, makeEl(id)); return elCache.get(id); },
  querySelector() { return makeEl('q'); },
  querySelectorAll() { return [makeEl('a'), makeEl('b'), makeEl('c'), makeEl('d'), makeEl('e'), makeEl('f')]; },
  createElement() { return makeEl('new'); },
  addEventListener() {}, removeEventListener() {},
  documentElement: makeEl('html'),
  body: makeEl('body'),
  hidden: false,
  visibilityState: 'visible',
  activeElement: null,
};
globalThis.window = globalThis;
globalThis.matchMedia = () => ({ matches: true, addEventListener() {}, addListener() {} });
globalThis.addEventListener = () => {};
globalThis.scrollTo = () => {};
globalThis.setInterval = () => 1;
globalThis.clearInterval = () => {};
const realSetTimeout = setTimeout;
globalThis.setTimeout = (fn) => 1;
globalThis.clearTimeout = () => {};
globalThis.confirm = () => true;
globalThis.location = { reload() {} };
globalThis.navigator = {};
globalThis.speechSynthesis = {
  getVoices: () => voices,
  speak(u) { lastUtterance = u; },
  cancel() {},
  onvoiceschanged: null,
};
globalThis.SpeechSynthesisUtterance = class {
  constructor(text) { this.text = text; this.lang = ''; this.rate = 1; this.voice = null; }
};
globalThis.Blob = class { constructor(parts) { this.parts = parts; lastBlob = parts.join(''); } };
globalThis.URL = { createObjectURL: () => 'blob:x', revokeObjectURL() {} };
globalThis.FileReader = class { readAsText() {} };

// ---------- 执行主脚本 ----------
const api = `
;globalThis.__api = {
  get state() { return state; },
  set state(v) { state = v; },
  get quiz() { return currentQuiz; },
  get lesson() { return currentLesson; },
  get voice() { return cachedVoice; },
  get learnCtx() { return { learnStep, learnWordIndex, learnMode, extraWordIndex }; },
  setLearn(o) { if ('learnStep' in o) learnStep = o.learnStep; if ('learnMode' in o) learnMode = o.learnMode; if ('learnWordIndex' in o) learnWordIndex = o.learnWordIndex; if ('extraWordIndex' in o) extraWordIndex = o.extraWordIndex; },
  html(id) { return document.getElementById(id).innerHTML; },
  get stress() { return stressSession; },
  get STRESS_QUIZ() { return STRESS_QUIZ; },
  get SER_ESTAR_QUIZ() { return SER_ESTAR_QUIZ; },
  get POR_PARA_QUIZ() { return POR_PARA_QUIZ; },
  get ARTICLE_EXCEPTIONS() { return ARTICLE_EXCEPTIONS; },
  get FALSE_FRIENDS() { return FALSE_FRIENDS; },
  get TENSE_CLOZE() { return TENSE_CLOZE; },
  get cloze() { return clozeSession; },
  get VERBS() { return VERBS; },
  get PHONEMES() { return PHONEMES; },
  get DIGRAPHS() { return DIGRAPHS; },
  get WORDS() { return WORDS; },
  get LESSONS() { return LESSONS; },
  get GRAMMARS() { return GRAMMARS; },
  get LISTENING_ALL() { return LISTENING_ALL; },
  get LISTENING_LA() { return LISTENING_LA; },
  get SPEAKING_TASKS() { return SPEAKING_TASKS; },
  get drill() { return drill; },
};`;
(0, eval)(main + api);
const A = globalThis.__api;

let pass = 0, fail = 0;
const t = (name, fn) => {
  try { const r = fn(); if (r === false) { fail++; console.log('✗ ' + name); } else { pass++; } }
  catch (e) { fail++; console.log('✗ ' + name + ' → ' + e.message); }
};
const eq = (a, b) => a === b;

// 1. 顶层执行 + init 已完成
t('脚本执行+init 无异常', () => !!A.state && !!A.state.settings);

t('发音数据区分二合字母与滑音', () => {
  renderPhonetics();
  const digraphs = A.DIGRAPHS;
  const glideW = A.PHONEMES.find(p => p.sym === 'w');
  const glideJ = A.PHONEMES.find(p => p.sym === 'j');
  const h = A.html('digraph-list') + A.html('phoneme-list');
  return digraphs.length === 2
    && digraphs.some(d => d.letters === 'ch' && d.ipa === '/tʃ/')
    && digraphs.some(d => d.letters === 'll' && d.ipa.includes('/ʝ/'))
    && glideW && glideW.kind === 'glide' && glideJ && glideJ.kind === 'glide'
    && h.includes('ch') && h.includes('ll') && h.includes('[w]') && h.includes('[j]');
});
t('拉美变体在字母表显示 c/z 的地区 IPA', () => {
  A.state.settings.variant = 'es-LA';
  renderPhonetics();
  const latin = A.html('alphabet-list');
  A.state.settings.variant = 'es-ES';
  renderPhonetics();
  return latin.includes('/se/') && latin.includes('/ˈseta/');
});

// 2. 19 屏 go() 不报错
for (const s of ['home', 'phonetics', 'lessons', 'review', 'quiz', 'numbers', 'mistakes', 'tools', 'stress', 'falsefriends', 'verbs', 'preterite', 'stemchange', 'words', 'stats', 'weekly', 'settings', 'learn', 'cloze', 'subjunctive', 'shadowing', 'speaking', 'listening-la']) {
  t('go(' + s + ')', () => { go(s); return true; });
}
t('口语模块提供两类真实任务与明确的自查边界', () => {
  const roles = A.SPEAKING_TASKS.filter(x => x.type === 'roleplay');
  const monos = A.SPEAKING_TASKS.filter(x => x.type === 'monologue');
  if (roles.length < 20 || monos.length < 20) throw new Error('任务类型数量不足');
  if (!roles.some(x => x.id === 'sp-rp-001' && x.requiredElements.length >= 4)) throw new Error('代表角色扮演缺失');
  if (!monos.some(x => x.id === 'sp-mono-001' && x.prepTime === 60 && x.targetDuration === 120)) throw new Error('代表陈述缺失');
  go('speaking');
  const list = A.html('speaking-area');
  openSpeaking('sp-mono-001');
  const detail = A.html('speaking-area');
  return list.includes('角色扮演') && list.includes('即兴陈述') && list.includes('不是语法或地道度评分') && detail.includes('SpeechRecognition') && detail.includes('teletrabajo');
});

// 3. lessons：96 课、A2.2 过渡层、B1 与 B2 条目
t('lessons 含 96 课与 A2.2/B1/B2 分段', () => {
  renderLessons();
  const h = A.html('lesson-groups');
  const items = (h.match(/lesson-item/g) || []).length;
  if (items < 97) throw new Error('课程条目仅 ' + items);
  const a21 = h.indexOf('A2.1-L12');
  const a22 = h.indexOf('A2.2-L01');
  const b11 = h.indexOf('B1.1-L01');
  const b21 = h.indexOf('B2.1-L01');
  return h.includes('发音入门') && h.includes('问候与自我介绍') && h.includes('A2.2 独立表达')
    && h.includes('A2.2-L12') && h.includes('B1.2-L12') && h.includes('B2.2-L12') && a21 < a22 && a22 < b11 && b11 < b21;
});

// 3b. A2.1/A2.2 与 B1 课程挂载、词库总量、语法条数
t('词库总数 ≥3800 且 A2.2/B1/B2 课程齐全', () => {
  if (A.WORDS.length < 3800) throw new Error('词库仅 ' + A.WORDS.length);
  const a21 = A.LESSONS.filter(l => l.stage === 'P3');
  if (a21.length !== 12) throw new Error('A2.1 课数 ' + a21.length);
  if (A.GRAMMARS.length !== 97) throw new Error('语法条数 ' + A.GRAMMARS.length);
  for (const l of a21) {
    if (!l.grammar_id) throw new Error(l.id + ' 缺语法点');
    if (l.words.length + l.extra_words.length < 30) throw new Error(l.id + ' 词数不足 30');
    if (!l.dialog || l.dialog.length < 6) throw new Error(l.id + ' 对话不足 6 句');
  }
  const a22 = A.LESSONS.filter(l => l.stage === 'P3B');
  if (a22.length !== 12) throw new Error('A2.2 课数 ' + a22.length);
  for (const [i, l] of a22.entries()) {
    if (l.id !== `A2.2-L${String(i + 1).padStart(2, '0')}`) throw new Error('A2.2 顺序错误: ' + l.id);
    if (l.words.length < 12 || l.words.length > 14 || l.extra_words.length < 18 || l.extra_words.length > 26) throw new Error(l.id + ' 词数异常');
    if (!l.listening || l.dialog.length !== 8 || l.grammar_id !== `g${String(i + 62).padStart(3, '0')}`) throw new Error(l.id + ' 缺听力、对话或对应语法');
    const grammar = A.GRAMMARS.find(g => g.id === l.grammar_id);
    if (!grammar || !/规则：/.test(grammar.content) || !/<table>/.test(grammar.content) || !/例句：/.test(grammar.content) || !/常见错误：/.test(grammar.content)) throw new Error(l.id + ' 语法不是四段式');
  }
  return true;
});
t('B1 课程、听力字段与虚拟式专项可用', () => {
  const b1 = A.LESSONS.filter(l => l.stage === 'P4' || l.stage === 'P5');
  if (b1.length !== 24) throw new Error('B1 课数 ' + b1.length);
  for (const l of b1) {
    if (l.words.length < 12 || l.words.length > 14 || l.extra_words.length < 18 || l.extra_words.length > 26) throw new Error(l.id + ' 词数异常');
    if (!l.listening || l.dialog.length !== 8) throw new Error(l.id + ' 缺听力或对话');
  }
  renderSubjunctive(); renderShadowing(); renderListeningLA();
  startQuiz('subjunctive');
  return A.quiz && A.quiz.questions.length >= 80 && A.html('subjunctive-area').includes('WEIRDO');
});
t('B1 课程把听力接入学习流程并提供理解题', () => {
  openLesson('B1.1-L01');
  A.setLearn({ learnStep: 3, learnMode: 'core' }); renderLearn();
  if (!A.html('learn-container').includes('先听后看') || A.html('learn-container').includes('<div class="lab">原文</div>')) throw new Error('听力未默认隐藏原文');
  revealLessonListening();
  if (!A.html('learn-container').includes(A.lesson.listening.text) || !A.html('learn-container').includes(A.lesson.listening.questions[0].q)) throw new Error('听力原文或理解题未渲染');
  A.lesson.listening.questions.forEach((q, i) => answerLessonListening(i, q.answer));
  A.setLearn({ learnStep: 4 }); renderLearn();
  return A.quiz && A.quiz.questions.length === 5;
});
t('lesson 筛选渲染含 A2.1 分组与课程', () => {
  renderLessons();
  const h = A.html('lesson-groups');
  return h.includes('A2.1 进阶西语') && h.includes('A2.1-L01') && h.includes('A2.1-L12') && h.includes('将来时');
});
t('A2.2 学习流可渲染语法、对话与具体听力', () => {
  openLesson('A2.2-L08');
  A.setLearn({ learnStep: 1, learnMode: 'core' }); renderLearn();
  if (!A.html('learn-container').includes('Se me olvidó')) throw new Error('A2.2 g069 未渲染');
  A.setLearn({ learnStep: 2 }); renderLearn();
  if (!A.html('learn-container').includes('Se me ha perdido la maleta')) throw new Error('A2.2 对话未渲染');
  A.setLearn({ learnStep: 3 }); renderLearn();
  revealLessonListening();
  return A.html('learn-container').includes('Durante un viaje a Córdoba') && A.lesson.listening.questions.length === 2;
});
// 5.5 轮：听力内容区分度（生成物层面拦"同模板换例句"）
t('听力正文与题干全库无重复', () => {
  const norm = s => String(s || '').replace(/«[^»]*»/g, ' ').toLowerCase().replace(/[¿?¡!.,;:()"]/g, ' ').replace(/\s+/g, ' ').trim();
  const texts = Object.values(A.LISTENING_ALL).map(l => norm(l.text));
  if (new Set(texts).size !== texts.length) throw new Error('听力正文存在重复');
  const qSets = Object.values(A.LISTENING_ALL).map(l => l.questions.map(q => norm(q.q)).sort().join('||'));
  if (new Set(qSets).size !== qSets.length) throw new Error('听力题干集合存在重复');
  for (const l of Object.values(A.LISTENING_ALL)) {
    const qs = l.questions.map(q => norm(q.q));
    if (new Set(qs).size !== qs.length) throw new Error(l.id + ' 内部题干重复');
  }
  return true;
});
t('听力答案索引分布均匀（任一取值 ≤60%）', () => {
  const dist = {};
  let total = 0;
  for (const l of Object.values(A.LISTENING_ALL)) for (const q of l.questions) { dist[q.answer] = (dist[q.answer] || 0) + 1; total++; }
  for (const [idx, n] of Object.entries(dist)) if (n / total > 0.6) throw new Error(`答案索引 ${idx} 占比 ${(n / total * 100).toFixed(0)}%`);
  if (!dist[0] || !dist[1] || !dist[2]) throw new Error('答案索引未覆盖 0/1/2');
  return true;
});
t('B1 对话 zh 为真实翻译且各课对话不重复', () => {
  const norm = s => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
  const b1 = A.LESSONS.filter(l => l.stage === 'P4' || l.stage === 'P5');
  const PLACEHOLDER = /^(提出本课|用目标结构回应|追问原因|说明个人理由|邀请给出建议|用虚拟式提出建议|表示认同|确认下一步)/;
  const seen = new Set();
  for (const l of b1) {
    const key = l.dialog.map(d => norm(d.es)).join('||');
    if (seen.has(key)) throw new Error(l.id + ' 对话与其他课逐句相同');
    seen.add(key);
    l.dialog.forEach((d, i) => { if (PLACEHOLDER.test(d.zh)) throw new Error(`${l.id} 对话第 ${i + 1} 句 zh 是占位注释`); });
  }
  return true;
});
t('拉美听力三种口音与 voseo', () => {
  const langs = A.LISTENING_LA.map(x => x.lang);
  if (langs.join(',') !== 'es-MX,es-AR,es-CO') throw new Error('口音序列 ' + langs.join(','));
  const ar = A.LISTENING_LA.find(x => x.id === 'la-ar');
  if (!/tenés|sabés|querés|podés|sos\b/.test(ar.text)) throw new Error('la-ar 缺 voseo');
  if (!ar.zh.includes('voseo')) throw new Error('la-ar 缺 voseo 标注');
  return true;
});
t('A2.1 新课学习流可渲染（词卡→语法→对话→小测）', () => {
  openLesson('A2.1-L01');
  let guard = 0;
  while (A.learnCtx.learnMode === 'core' && A.learnCtx.learnStep === 0 && guard++ < 50) nextLearnWord();
  if (A.learnCtx.learnMode !== 'choice') throw new Error('核心词流程未走完');
  A.setLearn({ learnStep: 1, learnMode: 'core' }); renderLearn();
  const hg = A.html('learn-container');
  if (!hg.includes('语法点') || !hg.includes('hablaba')) throw new Error('g026 imperfecto 内容未渲染');
  A.setLearn({ learnStep: 2 }); renderLearn();
  if (!A.html('learn-container').includes('迷你对话')) throw new Error('对话步未渲染');
  A.setLearn({ learnStep: 3 }); renderLearn();
  const q = A.quiz;
  if (!q || q.questions.length !== 5) throw new Error('小测题数异常');
  for (const qu of q.questions) if (!qu.options.includes(qu.answer)) throw new Error('答案不在选项中');
  return true;
});

// 4. 学习流 L01 端到端
t('learn L01 全流程', () => {
  openLesson('A1.1-L01');
  let guard = 0;
  while (A.learnCtx.learnMode === 'core' && A.learnCtx.learnStep === 0 && guard++ < 50) nextLearnWord();
  if (A.learnCtx.learnMode !== 'choice') return false;
  const learned = A.state.reviews.length;
  if (learned < 10) throw new Error('入队词数异常: ' + learned);
  // 扩展词走一遍
  A.setLearn({ learnMode: 'extra', extraWordIndex: 0 }); renderLearn();
  guard = 0;
  while (A.learnCtx.learnMode === 'extra' && guard++ < 60) nextExtraWord();
  A.setLearn({ learnStep: 1, learnMode: 'core' }); renderLearn();
  if (!A.html('learn-container').includes('语法点')) throw new Error('语法步未渲染');
  if (!A.html('learn-container').includes('ser')) throw new Error('g001 内容缺失');
  A.setLearn({ learnStep: 2 }); renderLearn();
  if (!A.html('learn-container').includes('¿Cómo')) throw new Error('对话步缺 ¿Cómo');
  A.setLearn({ learnStep: 3 }); renderLearn();
  const q = A.quiz;
  if (!q || q.questions.length !== 5) throw new Error('小测题数异常');
  for (const qu of q.questions) if (!qu.options.includes(qu.answer)) throw new Error('答案不在选项中');
  // 全部答对
  guard = 0;
  while (guard++ < 10) {
    const cur = A.quiz; if (!cur || cur.index >= cur.questions.length) break;
    const qu = cur.questions[cur.index];
    answerQuiz(qu.options.indexOf(qu.answer));
    nextQuestion();
    if (A.quiz === cur && cur.index >= cur.questions.length) break;
    if (!A.quiz || A.html('learn-container').includes('恭喜通过')) break;
  }
  if (!A.html('learn-container').includes('恭喜通过')) throw new Error('未进入通过页: score=' + (A.quiz && A.quiz.score));
  completeLesson();
  return A.state.progress.completed.includes('A1.1-L01');
});

// 5. 无语法课与三语法课
t('L09(P2) 渲染 3 条语法', () => {
  openLesson('A1.2-L09'); A.setLearn({ learnStep: 1 }); renderLearn();
  const h = A.html('learn-container');
  return h.includes('acabar') && h.includes('perfecto') && h.includes('indefinido');
});
t('L01(P2) 无语法提示', () => {
  openLesson('A1.2-L01'); A.setLearn({ learnStep: 1 }); renderLearn();
  return A.html('learn-container').includes('本课无新增语法点');
});

// 6. 发音自检可重复，80% 记录完成
t('发音自检 10 题 80% 通过且可重做', () => {
  startUnlockQuiz();
  const q = A.quiz;
  if (!q || q.questions.length !== 10) throw new Error('题数≠10');
  for (const qu of q.questions) {
    if (qu.options.length !== 3) throw new Error('选项≠3');
    if (!qu.options.includes(qu.answer)) throw new Error('答案不在选项');
  }
  let guard = 0;
  while (A.quiz && A.quiz.index < A.quiz.questions.length && guard++ < 20) {
    const cur = A.quiz, qu = cur.questions[cur.index];
    const correct = cur.index < 8;
    const idx = correct ? qu.options.indexOf(qu.answer) : (qu.options.indexOf(qu.answer) + 1) % 3;
    answerQuiz(idx); nextQuestion();
  }
  if (A.state.progress.p0Passed !== true) return false;
  startUnlockQuiz();
  return A.quiz && A.quiz.questions.length === 10;
});
t('专项错题进入知识点复习区', () => {
  startQuiz('serestar');
  const q = A.quiz.questions[0];
  answerQuiz(q.options.findIndex(x => x !== q.answer));
  const item = A.state.skillMistakes.find(x => x.key === 'serestar');
  return !!item && item.count >= 1;
});

// 7. 四种自由测验
for (const type of ['es2zh', 'zh2es', 'listen', 'article']) {
  t('自由测验 ' + type, () => {
    startQuiz(type);
    const q = A.quiz;
    if (!q || !q.questions || !q.questions.length) throw new Error('未生成题目');
    for (const qu of q.questions) {
      if (qu.options && !qu.options.includes(qu.answer)) throw new Error('答案不在选项');
    }
    restoreQuizMenu();
    return true;
  });
}
t('空词池优雅拒绝', () => {
  const bak = A.state.reviews;
  A.state = { ...A.state, reviews: [] };
  try { startQuiz('es2zh'); } catch (e) { return false; }
  A.state = { ...A.state, reviews: bak };
  return true;
});

// 7b. 第二轮专项：冠词例外、ser/estar、por/para、假朋友
t('冠词测验只出例外词（空词池也可用）', () => {
  const bak = A.state.reviews;
  A.state = { ...A.state, reviews: [] };
  startQuiz('article');
  const q = A.quiz;
  A.state = { ...A.state, reviews: bak };
  if (!q || q.questions.length !== 10) throw new Error('题数≠10');
  for (const qu of q.questions) {
    if (!qu.options.includes(qu.answer)) throw new Error('答案不在选项');
    if (!qu.tip) throw new Error('缺解析');
    if (!A.ARTICLE_EXCEPTIONS.some(w => qu.q.startsWith(w.word + '（'))) throw new Error('非例外词出题: ' + qu.q);
  }
  restoreQuizMenu();
  return true;
});
t('冠词专项覆盖通性名词', () => {
  const bothQ = [];
  for (let i = 0; i < 10; i++) { // 抽多轮，通性题应出现且答案为「都可以」
    startQuiz('article');
    A.quiz.questions.forEach(qu => { if (qu.options.includes('el / la 都可以')) bothQ.push(qu); });
    restoreQuizMenu();
  }
  if (!bothQ.length) throw new Error('10 轮未抽到通性题');
  return bothQ.every(qu => qu.answer === 'el / la 都可以');
});
for (const type of ['serestar', 'porpara', 'ff']) {
  t('专项测验 ' + type, () => {
    startQuiz(type);
    const q = A.quiz;
    if (!q || !q.questions.length) throw new Error('未生成题目');
    for (const qu of q.questions) {
      if (!qu.options.includes(qu.answer)) throw new Error('答案不在选项');
      if (new Set(qu.options).size !== qu.options.length) throw new Error('选项重复');
      if (!qu.tip) throw new Error('缺解析');
    }
    restoreQuizMenu();
    return true;
  });
}
t('假朋友小测含误解干扰项', () => {
  startQuiz('ff');
  const hit = A.quiz.questions.some(qu => A.FALSE_FRIENDS.some(f => qu.q.startsWith(f.word + ' ') && qu.options.includes(f.wrong) && qu.answer === f.correct));
  restoreQuizMenu();
  return hit;
});
t('重音训练完整流程', () => {
  startStress();
  if (!A.html('stress-area').includes('重音')) throw new Error('题目页未渲染');
  let guard = 0;
  while (A.stress && A.stress.index < A.stress.questions.length && guard++ < 20) {
    const q = A.stress.questions[A.stress.index];
    answerStress(q.stress - 1); // 全答对
    nextStress();
  }
  if (A.stress !== null) throw new Error('结束后 session 未清空');
  return A.html('stress-area').includes('训练完成');
});
t('重音题数据自洽', () => A.STRESS_QUIZ.length >= 60 && A.STRESS_QUIZ.length <= 80
  && A.STRESS_QUIZ.every(q => q.syllables.join('') === q.word && q.stress >= 1 && q.stress <= q.syllables.length));
t('专项题量达标', () => A.SER_ESTAR_QUIZ.length >= 60 && A.POR_PARA_QUIZ.length >= 50
  && A.ARTICLE_EXCEPTIONS.length >= 38 && A.FALSE_FRIENDS.length >= 24);
t('假朋友词条列表渲染', () => {
  renderFalseFriends();
  const h = A.html('ff-list');
  return h.includes('embarazada') && h.includes('怀孕') && h.includes('avergonzada');
});
t('发音规则核心+更多细节折叠', () => {
  renderPhonetics();
  const h = A.html('rule-list');
  return h.includes('<details') && h.includes('更多细节') && h.includes('seseo') && h.includes('重音规则');
});

// 7d. 第四轮：时态选择段落填空
t('时态填空数据自洽（≥15 段、占位与空一一对应）', () => {
  if (A.TENSE_CLOZE.length < 15) throw new Error('段数 ' + A.TENSE_CLOZE.length);
  const ids = new Set();
  for (const p of A.TENSE_CLOZE) {
    if (!p.id || ids.has(p.id)) throw new Error('id 缺失或重复: ' + p.id);
    ids.add(p.id);
    if (!p.title || !p.zh || !p.text) throw new Error(p.id + ' 字段不全');
    if (p.blanks.length < 5 || p.blanks.length > 8) throw new Error(p.id + ' 空数 ' + p.blanks.length);
    const marks = [...p.text.matchAll(/\[\[(\d+)\]\]/g)].map(m => Number(m[1]));
    if (marks.length !== p.blanks.length || !marks.every((n, i) => n === i)) throw new Error(p.id + ' 占位标记与空不对应');
    p.blanks.forEach((b, i) => {
      if (b.options.length !== 2 || b.options[0] === b.options[1]) throw new Error(p.id + ' 空 ' + i + ' 选项异常');
      if (b.answer !== 0 && b.answer !== 1) throw new Error(p.id + ' 空 ' + i + ' answer 越界');
      if (!b.tip) throw new Error(p.id + ' 空 ' + i + ' 缺 tip');
    });
  }
  return true;
});
t('时态填空选篇列表渲染', () => {
  clozeBack();
  const h = A.html('cloze-area');
  const p0 = A.TENSE_CLOZE[0];
  return h.includes('选一篇短文开始') && h.includes(p0.title) && h.includes(p0.zh);
});
t('时态填空判分（选对 / 选错 / 锁定）', () => {
  startCloze(A.TENSE_CLOZE[0].id);
  const s = A.cloze;
  const p = s.passage;
  answerCloze(0, p.blanks[0].answer); // 选对
  if (s.score !== 1 || s.done !== 1) throw new Error('选对未加分');
  answerCloze(0, (p.blanks[0].answer + 1) % 2); // 已锁定，应无效
  if (s.score !== 1 || s.done !== 1 || s.picked[0] !== p.blanks[0].answer) throw new Error('锁定失效');
  answerCloze(1, (p.blanks[1].answer + 1) % 2); // 选错
  if (s.score !== 1 || s.done !== 2) throw new Error('选错误判分');
  const h = A.html('cloze-area');
  if (!h.includes(p.blanks[0].tip) || !h.includes(p.blanks[1].tip)) throw new Error('tip 未显示');
  if (!h.includes('✗ 应为 ' + p.blanks[1].options[p.blanks[1].answer])) throw new Error('错答未给正确答案');
  return h.includes('已答 2/' + p.blanks.length) && h.includes('disabled');
});
t('时态填空端到端（走完一段 + 重做 + 返回）', () => {
  startCloze(A.TENSE_CLOZE[1].id);
  const s = A.cloze;
  const p = s.passage;
  p.blanks.forEach((b, i) => answerCloze(i, b.answer)); // 全答对
  if (s.done !== p.blanks.length || s.score !== p.blanks.length) throw new Error('未完成或判分异常');
  const h = A.html('cloze-area');
  if (!h.includes('本篇完成') || !h.includes('重做本篇')) throw new Error('结算页未渲染');
  startCloze(p.id); // 重做
  if (A.cloze.done !== 0 || A.cloze.score !== 0) throw new Error('重做未重置');
  clozeBack();
  if (A.cloze !== null) throw new Error('返回后 session 未清空');
  return A.html('cloze-area').includes('选一篇短文开始');
});

// 7c. 第三轮：变位基准表（手工核对的硬门槛，覆盖 ser/ir 全 14 时态、hablar/comer/vivir 规则全量、
// 不规则 indefinido、futuro 不规则词干、词干变化代表格、命令式肯定/否定）
const VP = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
const vByInf = Object.fromEntries(A.VERBS.map(v => [v.inf, v]));
// 形式：['inf', 'tense', 'f1/f2/...'(按 6 人称顺序)] 或 ['inf', 'tense', {person: form}] 或 ['inf', 'tense', '单形式']
const CONJ_BENCH = [
  // --- ser 全部 14 时态语式 ---
  ['ser', 'presente', 'soy/eres/es/somos/sois/son'],
  ['ser', 'indefinido', 'fui/fuiste/fue/fuimos/fuisteis/fueron'],
  ['ser', 'imperfecto', 'era/eras/era/éramos/erais/eran'],
  ['ser', 'futuro', 'seré/serás/será/seremos/seréis/serán'],
  ['ser', 'condicional', 'sería/serías/sería/seríamos/seríais/serían'],
  ['ser', 'perfecto', 'he sido/has sido/ha sido/hemos sido/habéis sido/han sido'],
  ['ser', 'pluscuamperfecto', 'había sido/habías sido/había sido/habíamos sido/habíais sido/habían sido'],
  ['ser', 'subj_pres', 'sea/seas/sea/seamos/seáis/sean'],
  ['ser', 'subj_imp', 'fuera/fueras/fuera/fuéramos/fuerais/fueran'],
  ['ser', 'imp_af', '—/sé/sea/seamos/sed/sean'],
  ['ser', 'imp_neg', '—/no seas/no sea/no seamos/no seáis/no sean'],
  ['ser', 'gerundio', 'siendo'],
  ['ser', 'participio', 'sido'],
  // --- ir 全部 14 时态语式 ---
  ['ir', 'presente', 'voy/vas/va/vamos/vais/van'],
  ['ir', 'indefinido', 'fui/fuiste/fue/fuimos/fuisteis/fueron'],
  ['ir', 'imperfecto', 'iba/ibas/iba/íbamos/ibais/iban'],
  ['ir', 'futuro', 'iré/irás/irá/iremos/iréis/irán'],
  ['ir', 'condicional', 'iría/irías/iría/iríamos/iríais/irían'],
  ['ir', 'perfecto', 'he ido/has ido/ha ido/hemos ido/habéis ido/han ido'],
  ['ir', 'pluscuamperfecto', 'había ido/habías ido/había ido/habíamos ido/habíais ido/habían ido'],
  ['ir', 'subj_pres', 'vaya/vayas/vaya/vayamos/vayáis/vayan'],
  ['ir', 'subj_imp', 'fuera/fueras/fuera/fuéramos/fuerais/fueran'],
  ['ir', 'imp_af', '—/ve/vaya/vayamos/id/vayan'],
  ['ir', 'imp_neg', '—/no vayas/no vaya/no vayamos/no vayáis/no vayan'],
  ['ir', 'gerundio', 'yendo'],
  ['ir', 'participio', 'ido'],
  // --- hablar / comer / vivir：规则动词全 14 时态（词尾表已人工核对） ---
  ['hablar', 'presente', 'hablo/hablas/habla/hablamos/habláis/hablan'],
  ['hablar', 'indefinido', 'hablé/hablaste/habló/hablamos/hablasteis/hablaron'],
  ['hablar', 'imperfecto', 'hablaba/hablabas/hablaba/hablábamos/hablabais/hablaban'],
  ['hablar', 'futuro', 'hablaré/hablarás/hablará/hablaremos/hablaréis/hablarán'],
  ['hablar', 'condicional', 'hablaría/hablarías/hablaría/hablaríamos/hablaríais/hablarían'],
  ['hablar', 'perfecto', 'he hablado/has hablado/ha hablado/hemos hablado/habéis hablado/han hablado'],
  ['hablar', 'pluscuamperfecto', 'había hablado/habías hablado/había hablado/habíamos hablado/habíais hablado/habían hablado'],
  ['hablar', 'subj_pres', 'hable/hables/hable/hablemos/habléis/hablen'],
  ['hablar', 'subj_imp', 'hablara/hablaras/hablara/habláramos/hablarais/hablaran'],
  ['hablar', 'imp_af', '—/habla/hable/hablemos/hablad/hablen'],
  ['hablar', 'imp_neg', '—/no hables/no hable/no hablemos/no habléis/no hablen'],
  ['hablar', 'gerundio', 'hablando'],
  ['hablar', 'participio', 'hablado'],
  ['comer', 'presente', 'como/comes/come/comemos/coméis/comen'],
  ['comer', 'indefinido', 'comí/comiste/comió/comimos/comisteis/comieron'],
  ['comer', 'imperfecto', 'comía/comías/comía/comíamos/comíais/comían'],
  ['comer', 'futuro', 'comeré/comerás/comerá/comeremos/comeréis/comerán'],
  ['comer', 'condicional', 'comería/comerías/comería/comeríamos/comeríais/comerían'],
  ['comer', 'perfecto', 'he comido/has comido/ha comido/hemos comido/habéis comido/han comido'],
  ['comer', 'pluscuamperfecto', 'había comido/habías comido/había comido/habíamos comido/habíais comido/habían comido'],
  ['comer', 'subj_pres', 'coma/comas/coma/comamos/comáis/coman'],
  ['comer', 'subj_imp', 'comiera/comieras/comiera/comiéramos/comierais/comieran'],
  ['comer', 'imp_af', '—/come/coma/comamos/comed/coman'],
  ['comer', 'imp_neg', '—/no comas/no coma/no comamos/no comáis/no coman'],
  ['comer', 'gerundio', 'comiendo'],
  ['comer', 'participio', 'comido'],
  ['vivir', 'presente', 'vivo/vives/vive/vivimos/vivís/viven'],
  ['vivir', 'indefinido', 'viví/viviste/vivió/vivimos/vivisteis/vivieron'],
  ['vivir', 'imperfecto', 'vivía/vivías/vivía/vivíamos/vivíais/vivían'],
  ['vivir', 'futuro', 'viviré/vivirás/vivirá/viviremos/viviréis/vivirán'],
  ['vivir', 'condicional', 'viviría/vivirías/viviría/viviríamos/viviríais/vivirían'],
  ['vivir', 'perfecto', 'he vivido/has vivido/ha vivido/hemos vivido/habéis vivido/han vivido'],
  ['vivir', 'pluscuamperfecto', 'había vivido/habías vivido/había vivido/habíamos vivido/habíais vivido/habían vivido'],
  ['vivir', 'subj_pres', 'viva/vivas/viva/vivamos/viváis/vivan'],
  ['vivir', 'subj_imp', 'viviera/vivieras/viviera/viviéramos/vivierais/vivieran'],
  ['vivir', 'imp_af', '—/vive/viva/vivamos/vivid/vivan'],
  ['vivir', 'imp_neg', '—/no vivas/no viva/no vivamos/no viváis/no vivan'],
  ['vivir', 'gerundio', 'viviendo'],
  ['vivir', 'participio', 'vivido'],
  // --- 不规则 indefinido 全人称（练习池 12 词，ser/ir 已在上面覆盖） ---
  ['tener', 'indefinido', 'tuve/tuviste/tuvo/tuvimos/tuvisteis/tuvieron'],
  ['estar', 'indefinido', 'estuve/estuviste/estuvo/estuvimos/estuvisteis/estuvieron'],
  ['hacer', 'indefinido', 'hice/hiciste/hizo/hicimos/hicisteis/hicieron'],
  ['decir', 'indefinido', 'dije/dijiste/dijo/dijimos/dijisteis/dijeron'],
  ['poder', 'indefinido', 'pude/pudiste/pudo/pudimos/pudisteis/pudieron'],
  ['poner', 'indefinido', 'puse/pusiste/puso/pusimos/pusisteis/pusieron'],
  ['saber', 'indefinido', 'supe/supiste/supo/supimos/supisteis/supieron'],
  ['querer', 'indefinido', 'quise/quisiste/quiso/quisimos/quisisteis/quisieron'],
  ['venir', 'indefinido', 'vine/viniste/vino/vinimos/vinisteis/vinieron'],
  ['traer', 'indefinido', 'traje/trajiste/trajo/trajimos/trajisteis/trajeron'],
  ['dar', 'indefinido', 'di/diste/dio/dimos/disteis/dieron'],
  ['ver', 'indefinido', 'vi/viste/vio/vimos/visteis/vieron'],
  // --- futuro/condicional 不规则词干（tendr-/har-/dir-/podr-/pondr-/saldr-/vendr-/querr-/sabr-/habr-） ---
  ['tener', 'futuro', { 'yo': 'tendré', 'nosotros': 'tendremos' }],
  ['hacer', 'futuro', { 'yo': 'haré', 'ellos/ellas/ustedes': 'harán' }],
  ['decir', 'futuro', { 'yo': 'diré', 'él/ella/usted': 'dirá' }],
  ['poder', 'futuro', { 'yo': 'podré', 'vosotros': 'podréis' }],
  ['poner', 'futuro', { 'yo': 'pondré' }],
  ['salir', 'futuro', { 'yo': 'saldré' }],
  ['venir', 'futuro', { 'yo': 'vendré' }],
  ['querer', 'futuro', { 'yo': 'querré' }],
  ['saber', 'futuro', { 'yo': 'sabré' }],
  ['haber', 'futuro', { 'yo': 'habré', 'él/ella/usted': 'habrá' }],
  ['tener', 'condicional', { 'yo': 'tendría' }],
  ['hacer', 'condicional', { 'yo': 'haría' }],
  ['decir', 'condicional', { 'yo': 'diría' }],
  // --- 词干变化三类代表格（yo 变 / nosotros、vosotros 不变） ---
  ['querer', 'presente', { 'yo': 'quiero', 'nosotros': 'queremos', 'vosotros': 'queréis' }],
  ['pensar', 'presente', { 'yo': 'pienso', 'nosotros': 'pensamos' }],
  ['cerrar', 'presente', { 'yo': 'cierro', 'nosotros': 'cerramos' }],
  ['entender', 'presente', { 'yo': 'entiendo', 'nosotros': 'entendemos' }],
  ['poder', 'presente', { 'yo': 'puedo', 'nosotros': 'podemos', 'vosotros': 'podéis' }],
  ['encontrar', 'presente', { 'yo': 'encuentro', 'nosotros': 'encontramos' }],
  ['volver', 'presente', { 'yo': 'vuelvo', 'nosotros': 'volvemos' }],
  ['jugar', 'presente', { 'yo': 'juego', 'nosotros': 'jugamos' }],
  ['pedir', 'presente', { 'yo': 'pido', 'tú': 'pides', 'nosotros': 'pedimos', 'vosotros': 'pedís' }],
  ['servir', 'presente', { 'yo': 'sirvo', 'nosotros': 'servimos' }],
  ['seguir', 'presente', { 'yo': 'sigo', 'tú': 'sigues', 'nosotros': 'seguimos' }],
  // --- -ir 类次级变化：subj nosotros/vosotros、indefinido 第三人称、动名词 ---
  ['pedir', 'subj_pres', { 'yo': 'pida', 'nosotros': 'pidamos', 'vosotros': 'pidáis' }],
  ['pedir', 'indefinido', { 'él/ella/usted': 'pidió', 'ellos/ellas/ustedes': 'pidieron' }],
  ['pedir', 'gerundio', 'pidiendo'],
  ['dormir', 'subj_pres', { 'yo': 'duerma', 'nosotros': 'durmamos', 'vosotros': 'durmáis' }],
  ['dormir', 'indefinido', { 'él/ella/usted': 'durmió', 'ellos/ellas/ustedes': 'durmieron' }],
  ['dormir', 'gerundio', 'durmiendo'],
  ['sentir', 'subj_pres', { 'yo': 'sienta', 'nosotros': 'sintamos' }],
  ['sentir', 'indefinido', { 'él/ella/usted': 'sintió', 'ellos/ellas/ustedes': 'sintieron' }],
  ['sentir', 'gerundio', 'sintiendo'],
  ['preferir', 'subj_pres', { 'nosotros': 'prefiramos' }],
  ['preferir', 'indefinido', { 'él/ella/usted': 'prefirió' }],
  ['morir', 'subj_pres', { 'nosotros': 'muramos' }],
  ['morir', 'indefinido', { 'él/ella/usted': 'murió' }],
  ['morir', 'gerundio', 'muriendo'],
  ['morir', 'participio', 'muerto'],
  ['decir', 'subj_pres', { 'yo': 'diga', 'nosotros': 'digamos' }],
  ['decir', 'gerundio', 'diciendo'],
  ['seguir', 'gerundio', 'siguiendo'],
  ['seguir', 'indefinido', { 'él/ella/usted': 'siguió' }],
  // --- -ar/-er 类虚拟式 nosotros 还原（不变词干） ---
  ['querer', 'subj_pres', { 'yo': 'quiera', 'nosotros': 'queramos' }],
  ['poder', 'subj_pres', { 'yo': 'pueda', 'nosotros': 'podamos' }],
  ['jugar', 'subj_pres', { 'yo': 'juegue', 'nosotros': 'juguemos' }],
  ['cerrar', 'subj_pres', { 'yo': 'cierre', 'nosotros': 'cerremos' }],
  ['tener', 'subj_pres', { 'yo': 'tenga', 'nosotros': 'tengamos' }],
  ['venir', 'subj_pres', { 'yo': 'venga', 'nosotros': 'vengamos' }],
  // --- 虚拟式未完成过去时（-ra 式）抽查 ---
  ['tener', 'subj_imp', 'tuviera/tuvieras/tuviera/tuviéramos/tuvierais/tuvieran'],
  ['hacer', 'subj_imp', { 'yo': 'hiciera', 'nosotros': 'hiciéramos' }],
  ['decir', 'subj_imp', { 'yo': 'dijera', 'nosotros': 'dijéramos' }],
  ['dormir', 'subj_imp', { 'yo': 'durmiera', 'nosotros': 'durmiéramos' }],
  // --- 拼写保持：c→qu / g→gu / z→c ---
  ['buscar', 'subj_pres', { 'yo': 'busque' }],
  ['buscar', 'indefinido', { 'yo': 'busqué' }],
  ['empezar', 'subj_pres', { 'yo': 'empiece', 'nosotros': 'empecemos' }],
  ['empezar', 'indefinido', { 'yo': 'empecé' }],
  ['jugar', 'indefinido', { 'yo': 'jugué' }],
  // --- 命令式肯定 tú 格（八个不规则）+ 否定 ---
  ['venir', 'imp_af', { 'tú': 'ven' }],
  ['hacer', 'imp_af', { 'tú': 'haz' }],
  ['decir', 'imp_af', { 'tú': 'di' }],
  ['poner', 'imp_af', { 'tú': 'pon' }],
  ['salir', 'imp_af', { 'tú': 'sal' }],
  ['ser', 'imp_af', { 'tú': 'sé' }],
  ['ir', 'imp_af', { 'tú': 've' }],
  ['tener', 'imp_af', { 'tú': 'ten' }],
  ['venir', 'imp_neg', { 'tú': 'no vengas', 'nosotros': 'no vengamos' }],
  ['hablar', 'imp_neg', { 'tú': 'no hables', 'vosotros': 'no habléis' }],
  ['pedir', 'imp_af', { 'tú': 'pide', 'vosotros': 'pedid' }],
  ['dormir', 'imp_af', { 'tú': 'duerme', 'nosotros': 'durmamos' }],
  // --- 自反动词（含命令式重音移位） ---
  ['llamarse', 'presente', { 'yo': 'me llamo', 'vosotros': 'os llamáis' }],
  ['llamarse', 'imp_af', { 'tú': 'llámate', 'nosotros': 'llamémonos', 'vosotros': 'llamaos' }],
  ['llamarse', 'imp_neg', { 'tú': 'no te llames' }],
  ['llamarse', 'gerundio', 'llamándose'],
  ['levantarse', 'imp_af', { 'tú': 'levántate', 'ellos/ellas/ustedes': 'levántense' }],
  ['sentarse', 'imp_af', { 'tú': 'siéntate', 'nosotros': 'sentémonos', 'vosotros': 'sentaos' }],
  ['sentarse', 'presente', { 'yo': 'me siento', 'nosotros': 'nos sentamos' }],
  ['vestirse', 'imp_af', { 'tú': 'vístete', 'nosotros': 'vistámonos', 'vosotros': 'vestíos' }],
  ['vestirse', 'subj_pres', { 'nosotros': 'nos vistamos' }],
  ['vestirse', 'gerundio', 'vistiéndose'],
  // --- 不规则过去分词 ---
  ['hacer', 'participio', 'hecho'],
  ['poner', 'participio', 'puesto'],
  ['decir', 'participio', 'dicho'],
  ['ver', 'participio', 'visto'],
  ['abrir', 'participio', 'abierto'],
  ['escribir', 'participio', 'escrito'],
  ['volver', 'participio', 'vuelto'],
  // --- y-类动词（oír/leer/creer/construir） ---
  ['oír', 'presente', 'oigo/oyes/oye/oímos/oís/oyen'],
  ['oír', 'indefinido', 'oí/oíste/oyó/oímos/oísteis/oyeron'],
  ['oír', 'gerundio', 'oyendo'],
  ['oír', 'participio', 'oído'],
  ['oír', 'futuro', { 'yo': 'oiré' }],
  ['leer', 'indefinido', { 'él/ella/usted': 'leyó', 'ellos/ellas/ustedes': 'leyeron' }],
  ['leer', 'gerundio', 'leyendo'],
  ['leer', 'participio', 'leído'],
  ['creer', 'indefinido', { 'él/ella/usted': 'creyó' }],
  ['construir', 'presente', 'construyo/construyes/construye/construimos/construís/construyen'],
  ['construir', 'indefinido', { 'él/ella/usted': 'construyó', 'ellos/ellas/ustedes': 'construyeron' }],
  ['construir', 'gerundio', 'construyendo'],
  // --- imperfecto 仅有的三个不规则 ---
  ['ser', 'imperfecto', { 'nosotros': 'éramos' }],
  ['ir', 'imperfecto', { 'nosotros': 'íbamos' }],
  ['ver', 'imperfecto', 'veía/veías/veía/veíamos/veíais/veían'],
];
const BENCH_CELLS = CONJ_BENCH.reduce((n, [, , f]) => n + (typeof f === 'string' ? (f.includes('/') ? 6 : 1) : Object.keys(f).length), 0);
t(`变位基准表（${BENCH_CELLS} 格手工核对）`, () => {
  if (BENCH_CELLS < 200) throw new Error('基准格数不足 200: ' + BENCH_CELLS);
  for (const [inf, tense, forms] of CONJ_BENCH) {
    const v = vByInf[inf];
    if (!v) throw new Error('缺动词 ' + inf);
    if (typeof forms === 'string' && !forms.includes('/')) {
      if (v[tense] !== forms) throw new Error(`${inf}.${tense} 应为 ${forms}，实际 ${v[tense]}`);
    } else if (typeof forms === 'string') {
      const exp = forms.split('/');
      VP.forEach((p, i) => {
        if (v[tense][p] !== exp[i]) throw new Error(`${inf}.${tense}.${p} 应为 ${exp[i]}，实际 ${v[tense][p]}`);
      });
    } else {
      for (const [p, exp] of Object.entries(forms)) {
        if (v[tense][p] !== exp) throw new Error(`${inf}.${tense}.${p} 应为 ${exp}，实际 ${v[tense][p]}`);
      }
    }
  }
  return true;
});
t('动词库 60 词且 B2 时态齐全', () => {
  if (A.VERBS.length !== 60) throw new Error('动词数 ' + A.VERBS.length);
  const tables = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional', 'perfecto', 'pluscuamperfecto', 'futuro_perfecto', 'condicional_perfecto', 'subj_pres', 'subj_perfecto', 'subj_imp', 'subj_imp_se', 'subj_pluscuamperfecto', 'imp_af', 'imp_neg'];
  for (const v of A.VERBS) {
    if (!v.zh) throw new Error(v.inf + ' 缺中文释义');
    for (const te of tables) for (const p of VP) if (!v[te][p]) throw new Error(`${v.inf} 缺 ${te}.${p}`);
    if (!v.gerundio || !v.participio) throw new Error(v.inf + ' 缺非人称形式');
  }
  return true;
});
t('B2 完成时与 -se 虚拟式变位正确', () => {
  const hablar = A.VERBS.find(v => v.inf === 'hablar');
  const ser = A.VERBS.find(v => v.inf === 'ser');
  return hablar.futuro_perfecto.yo === 'habré hablado'
    && hablar.condicional_perfecto.nosotros === 'habríamos hablado'
    && hablar.subj_perfecto.tú === 'hayas hablado'
    && hablar.subj_imp_se.nosotros === 'hablásemos'
    && ser.subj_pluscuamperfecto.yo === 'hubiera sido';
});
t('变位填空 conj 全流程（软键盘判分）', () => {
  startQuiz('conj');
  const q = A.quiz;
  if (!q || q.questions.length !== 10) throw new Error('题数≠10');
  for (const qu of q.questions) {
    if (qu.type !== 'conj' || !qu.answer) throw new Error('题目异常');
    if (!qu.tip) throw new Error('缺规律提示');
    if (qu.q.includes('（') === false) throw new Error('缺中文标注: ' + qu.q);
  }
  let guard = 0;
  while (A.quiz && A.quiz.index < A.quiz.questions.length && guard++ < 20) {
    const cur = A.quiz.questions[A.quiz.index];
    document.getElementById('spell-input').value = cur.answer; // 全答对
    submitSpell();
    nextQuestion();
  }
  const score = q.score;
  restoreQuizMenu();
  if (score !== 10) throw new Error('全对判分异常: ' + score);
  return true;
});
t('变位填空严格判重音（hablo ≠ habló）', () => {
  startQuiz('conj');
  A.quiz.questions[A.quiz.index] = { type: 'conj', id: null, q: 'hablar（说，讲）· él/ella/usted · 简单过去时', answer: 'habló', tip: 'x' };
  document.getElementById('spell-input').value = 'hablo'; // 缺重音应判错
  submitSpell();
  const wrong = A.quiz.score === 0 && A.quiz.wrong.length === 1;
  restoreQuizMenu();
  return wrong;
});
t('es-LA 隐藏 vosotros 且提示拉美模式', () => {
  const bak = A.state.settings.variant;
  A.state = { ...A.state, settings: { ...A.state.settings, variant: 'es-LA' } };
  go('verbs');
  if (!A.html('verb-list').includes('拉美模式：已隐藏 vosotros')) throw new Error('列表页缺拉美提示');
  openVerb(0); // ser
  const h = A.html('verb-detail');
  if (h.includes('<th>vosotros</th>')) throw new Error('详情页仍含 vosotros 行');
  if (!h.includes('拉美模式：已隐藏 vosotros')) throw new Error('详情页缺拉美提示');
  // conj 与练习均不出 vosotros 题
  let hit = false;
  for (let i = 0; i < 15; i++) {
    startQuiz('conj');
    A.quiz.questions.forEach(qu => { if (qu.q.includes('vosotros')) hit = true; });
    restoreQuizMenu();
  }
  startPreteriteDrill('tener');
  if (A.drill.items.length !== 5) { drillBack(); throw new Error('es-LA 练习仍含 vosotros 格'); }
  drillBack();
  A.state = { ...A.state, settings: { ...A.state.settings, variant: bak } };
  go('verbs'); openVerb(0);
  if (!A.html('verb-detail').includes('<th>vosotros</th>')) throw new Error('es-ES 恢复失败');
  return !hit;
});
t('不规则过去时分组练习全流程', () => {
  go('preterite');
  if (!A.html('pret-area').includes('tener') || !A.html('pret-area').includes('traer')) throw new Error('菜单未渲染');
  startPreteriteDrill('tener');
  if (!A.drill || A.drill.items.length !== 6) throw new Error('题数≠6');
  let guard = 0;
  while (A.drill && A.drill.index < A.drill.items.length && guard++ < 10) {
    document.getElementById('drill-input').value = A.drill.items[A.drill.index].answer;
    submitDrill();
    nextDrill();
  }
  if (A.drill.right !== 6) throw new Error('判分异常: ' + A.drill.right);
  if (!A.html('pret-area').includes('正确率 100%')) throw new Error('未显示正确率');
  drillBack();
  return A.drill === null;
});
t('词干变化三组清单与练习（答案与变位表一致）', () => {
  go('stemchange');
  const h = A.html('sc-area');
  if (!h.includes('e → ie') || !h.includes('o → ue') || !h.includes('e → i')) throw new Error('三组未渲染');
  if (!h.includes('querer') || !h.includes('pedir') || !h.includes('jugar')) throw new Error('清单缺词');
  startStemDrill('e_i');
  const d = A.drill;
  if (!d || d.items.length !== 10) throw new Error('题数≠10');
  for (const it of d.items) {
    const inf = it.q.match(/^([^（]+)（/)[1];
    const person = it.q.match(/· ([^·]+) ·/)[1].trim();
    const v = A.VERBS.find(x => x.inf === inf);
    if (!v || v.presente[person] !== it.answer) throw new Error('答案与变位表不一致: ' + it.q);
  }
  drillBack();
  return true;
});

// 8. SRS 三档（SM-2 简化版：easy 提 ease、间隔 ×ease；hard 降 ease、间隔 ×1.2）
t('SRS rate 三档调度', () => {
  A.state = { ...A.state, reviews: [{ wordId: 'w0001', due: '2000-01-01', interval: 1, reps: 0, lastReview: '' }] };
  renderReview();
  rate('easy');
  let r = A.state.reviews[0];
  if (r.interval !== 3 || r.ease !== 2.65) throw new Error(`easy 应为 ease 2.65 / 间隔 3，实际 ${r.ease}/${r.interval}`);
  r.due = '2000-01-01'; renderReview(); rate('hard');
  r = A.state.reviews[0];
  if (r.interval !== 4 || r.ease !== 2.45) throw new Error(`hard 应为 ease 2.45 / 间隔 ×1.2=4，实际 ${r.ease}/${r.interval}`);
  return true;
});

// 9. 数字
const NUM = { 0: 'cero', 1: 'uno', 5: 'cinco', 11: 'once', 16: 'dieciséis', 17: 'diecisiete', 21: 'veintiuno', 22: 'veintidós', 30: 'treinta', 31: 'treinta y uno', 50: 'cincuenta', 99: 'noventa y nueve', 100: 'cien' };
t('numberToSpanish', () => {
  for (const [n, s] of Object.entries(NUM)) {
    const got = numberToSpanish(Number(n));
    if (got !== s) throw new Error(`${n}: ${got} ≠ ${s}`);
  }
  return true;
});

// 10. 语音选择
t('语音优先级 es-MX 回退', () => {
  voices = [{ name: 'MX Voice', lang: 'es-MX' }, { name: 'Zira', lang: 'en-US' }];
  pickSpanishVoice();
  if (!A.voice || A.voice.lang !== 'es-MX') throw new Error('未选 es-MX');
  speakText('hola');
  return lastUtterance && lastUtterance.voice && lastUtterance.voice.lang === 'es-MX';
});
t('无西语语音只设 lang', () => {
  voices = [{ name: 'Zira', lang: 'en-US' }];
  pickSpanishVoice();
  speakText('hola');
  return lastUtterance && !lastUtterance.voice && lastUtterance.lang === 'es-ES';
});
t('es-ES 优先', () => {
  voices = [{ name: 'MX', lang: 'es-MX' }, { name: 'Elvira', lang: 'es-ES' }];
  pickSpanishVoice();
  return A.voice && A.voice.lang === 'es-ES';
});

// 11. 导出/导入
t('导出 JSON 可解析', () => {
  exportData();
  const data = JSON.parse(lastBlob);
  return data && data.settings && Array.isArray(data.reviews);
});
t('normalizeState 抗残缺', () => {
  const n1 = normalizeState({ settings: { theme: 'dark' } });
  const n2 = normalizeState({ reviews: 'x', streak: 5, checkins: null });
  const n3 = normalizeState(null);
  return n1.settings.theme === 'dark' && Array.isArray(n2.reviews) && typeof n2.streak === 'object' && !!n3;
});

// 12. localStorage key 白名单（esbrain_v1 主数据 + esbrain_last_snapshot 快照时间戳）
t('localStorage 只用 esbrain_v1', () => {
  const keys = new Set(storageLog.map(([, k]) => k));
  keys.delete('esbrain_v1');
  keys.delete('esbrain_last_snapshot');
  return keys.size === 0 ? true : (() => { throw new Error('额外 key: ' + [...keys].join(',')); })();
});

// 13. 补签边界
t('补签一生一次且需断签 1 天', () => {
  const today = fmtDate(), y = fmtDate(addDays(new Date(), -1)), d2 = fmtDate(addDays(new Date(), -2));
  A.state = { ...A.state, checkins: { [d2]: 10 }, streak: { current: 1, lastDate: d2, makeupUsed: false, makeupDates: [] } };
  useMakeup();
  if (!A.state.streak.makeupDates.includes(y)) throw new Error('未补昨天');
  useMakeup(); // 第二次应无效
  return A.state.streak.makeupDates.length === 1;
});

// 14. 课程访问（全部课程开放）
t('全新账号全部课程可进入', () => {
  A.state = normalizeState(null);
  return ['A1.1-L01', 'A1.2-L01', 'A2.1-L01', 'A2.2-L01', 'B1.1-L01', 'B1.2-L12', 'B2.1-L01', 'B2.2-L12']
    .every(id => isLessonUnlocked(getLesson(id)));
});

// 15. 导入严格校验（P1-1 回归）
t('恶意 mistakes 字段被净化', () => {
  const n = normalizeState({ mistakes: [
    { wordId: 'w0001', count: '<img src=x onerror=alert(1)>', lastAt: '<svg onload=alert(1)>' },
    { wordId: "x' onmouseover='alert(1)", count: 5, lastAt: '2024-01-01' },
    { wordId: 'w0002', count: 3, lastAt: '2024-06-01' },
  ]});
  if (n.mistakes.length !== 2) throw new Error('非法 wordId 未过滤，剩 ' + n.mistakes.length);
  if (typeof n.mistakes[0].count !== 'number') throw new Error('count 未强制为数字');
  if (n.mistakes[0].lastAt !== '') throw new Error('非法 lastAt 未清空');
  if (n.mistakes[1].count !== 3 || n.mistakes[1].lastAt !== '2024-06-01') throw new Error('合法条目被误伤');
  return true;
});
t('checkins/reviewLog 严格校验', () => {
  const n = normalizeState({
    checkins: { '2024-01-01': 25, 'bad key': 10, '2024-01-02': '<img>', '2024-01-03': 99999, '2024-02-31': 15 },
    reviewLog: [{ date: '2024-01-01', wordId: 'w0001', level: 'easy' }, { date: 'x', wordId: 'w0001', level: 'easy' }, { date: '2024-01-01', wordId: 'w0001', level: 'root' }],
  });
  if (Object.keys(n.checkins).length !== 2) throw new Error('checkins 过滤异常');
  if (n.checkins['2024-01-03'] !== 1440) throw new Error('checkins 未封顶');
  if (n.reviewLog.length !== 1) throw new Error('reviewLog 过滤异常');
  return true;
});

// 16. 导入以默认状态为基底（P2-3 回归）
t('导入缺失字段不保留旧数据', () => {
  A.state = { ...A.state, checkins: { '2024-01-01': 30 }, streak: { current: 9, lastDate: '2024-01-01', makeupUsed: true, makeupDates: [] } };
  const n = normalizeState({ settings: { theme: 'dark', voiceRate: 1, dailyGoal: 10 } });
  return Object.keys(n.checkins).length === 0 && n.streak.current === 0 && n.streak.makeupUsed === false;
});

// 17. PWA 回退只用于页面导航
t('SW 静态资源失败不回退首页 HTML', () => {
  const sw = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');
  if (!sw.includes("event.request.mode === 'navigate'")) throw new Error('缺少导航分支');
  if (!sw.includes('catch(() => Response.error())')) throw new Error('静态资源失败未返回网络错误');
  return true;
});

t('B2 curriculum has stable lesson, grammar, dialogue, and listening coverage', () => {
  const b2 = A.LESSONS.filter(l => l.stage === 'P6' || l.stage === 'P7');
  if (b2.length !== 24) throw new Error('B2 course count ' + b2.length);
  for (const [index, lesson] of b2.entries()) {
    const expected = index < 12 ? 'B2.1-L' + String(index + 1).padStart(2, '0') : 'B2.2-L' + String(index - 11).padStart(2, '0');
    const grammarId = 'g' + String(74 + index).padStart(3, '0');
    if (lesson.id !== expected || lesson.grammar_id !== grammarId) throw new Error('B2 ordering or grammar mismatch: ' + lesson.id);
    if (lesson.words.length !== 13 || lesson.extra_words.length !== 26 || lesson.dialog.length !== 8) throw new Error('B2 lesson shape: ' + lesson.id);
    if (!lesson.listening || lesson.listening.questions.length < 2) throw new Error('B2 listening missing: ' + lesson.id);
  }
  openLesson('B2.1-L03');
  A.setLearn({ learnStep: 1, learnMode: 'core' }); renderLearn();
  const grammarView = A.html('learn-container');
  A.setLearn({ learnStep: 3 }); renderLearn(); revealLessonListening();
  const listeningView = A.html('learn-container');
  return grammarView.includes('hubieran') && listeningView.includes('Noroeste') && A.GRAMMARS.find(g => g.id === 'g097').content.includes('B2');
});

console.log(`\nSMOKE: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
