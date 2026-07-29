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

// 2. 14 屏 go() 不报错
for (const s of ['home', 'phonetics', 'lessons', 'review', 'quiz', 'numbers', 'mistakes', 'tools', 'verbs', 'words', 'stats', 'weekly', 'settings', 'learn']) {
  t('go(' + s + ')', () => { go(s); return true; });
}

// 3. lessons：P3/P4 敬请期待、24 课、P0 条目
t('lessons 含 24 课与敬请期待', () => {
  renderLessons();
  const h = A.html('lesson-groups');
  const items = (h.match(/lesson-item/g) || []).length;
  if (items < 25) throw new Error('课程条目仅 ' + items);
  if ((h.match(/敬请期待/g) || []).length !== 2) throw new Error('敬请期待数量异常');
  return h.includes('发音入门') && h.includes('问候与自我介绍') && h.includes('A1 总复习') && h.includes('A1.2-L12');
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

// 6. 解锁测验 80% 通过
t('解锁测验 10 题 80% 通过', () => {
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
  return A.state.progress.p0Passed === true;
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

// 8. SRS 三档
t('SRS rate 三档调度', () => {
  A.state = { ...A.state, reviews: [{ wordId: 'w0001', due: '2000-01-01', interval: 1, reps: 0, lastReview: '' }] };
  renderReview();
  rate('easy');
  let r = A.state.reviews[0];
  if (r.interval !== 7) throw new Error('easy 应跳到 7，实际 ' + r.interval);
  r.due = '2000-01-01'; renderReview(); rate('hard');
  r = A.state.reviews[0];
  if (r.interval !== 1) throw new Error('hard 应回到 1，实际 ' + r.interval);
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

// 12. localStorage key 唯一
t('localStorage 只用 esbrain_v1', () => {
  const keys = new Set(storageLog.map(([, k]) => k));
  keys.delete('esbrain_v1');
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

// 14. 跨阶段锁定（P1-2 回归）
t('全新账号 A1.2-L01 锁定', () => {
  A.state = normalizeState(null);
  if (!isLessonUnlocked(getLesson('A1.1-L01'))) throw new Error('A1.1-L01 应解锁');
  if (isLessonUnlocked(getLesson('A1.2-L01'))) throw new Error('A1.2-L01 应锁定');
  // 完成 A1.1 全部后 A1.2-L01 解锁
  const p1 = ['A1.1-L01','A1.1-L02','A1.1-L03','A1.1-L04','A1.1-L05','A1.1-L06','A1.1-L07','A1.1-L08','A1.1-L09','A1.1-L10','A1.1-L11','A1.1-L12'];
  A.state = { ...A.state, progress: { completed: p1, p0Passed: true } };
  return isLessonUnlocked(getLesson('A1.2-L01'));
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

console.log(`\nSMOKE: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
