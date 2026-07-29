// ESbrain 组装脚本：skeleton.html + data/*.js -> 项目根目录/index.html
// 同时执行验收清单第 8 条内容抽查。
const fs = require('fs');
const path = require('path');

const BUILD = __dirname;
const DATA = path.join(BUILD, 'data');
const ROOT = path.resolve(BUILD, '..');

const read = p => fs.readFileSync(p, 'utf8');

// ---------- 1. 加载数据文件（在同一 eval 作用域内合并 const） ----------
const dataSrc = ['core.js', 'words-p1a.js', 'words-p1b.js', 'words-p2a.js', 'words-p2b.js', 'grammar.js', 'verbs.js']
  .map(f => read(path.join(DATA, f))).join('\n');

const sandbox = {};
new Function('sandbox', dataSrc + `
  sandbox.STAGES = STAGES; sandbox.ALPHABET = ALPHABET; sandbox.PHONEMES = PHONEMES;
  sandbox.RULES = RULES; sandbox.UNLOCK_QUIZ = UNLOCK_QUIZ;
  sandbox.GRAMMARS = GRAMMARS; sandbox.VERBS = VERBS;
  sandbox.WORDS_ALL = [...WORDS_P1A, ...WORDS_P1B, ...WORDS_P2A, ...WORDS_P2B];
  sandbox.DIALOGS_ALL = Object.assign({}, DIALOGS_P1A, DIALOGS_P1B, DIALOGS_P2A, DIALOGS_P2B);
`)(sandbox);

const { STAGES, ALPHABET, PHONEMES, RULES, UNLOCK_QUIZ, GRAMMARS, VERBS, WORDS_ALL, DIALOGS_ALL } = sandbox;

// ---------- 2. 词库：排序 + 去重（同词同词性同释义保留最早一条）+ 重编号 w0001... ----------
WORDS_ALL.sort((a, b) => a.id.localeCompare(b.id));
const seen = new Set();
for (const w of WORDS_ALL) {
  if (seen.has(w.id)) throw new Error('重复 id: ' + w.id);
  seen.add(w.id);
}
const dupSeen = new Set();
const dupDropped = [];
const WORDS_DEDUP = WORDS_ALL.filter(w => {
  const key = `${w.word}|${w.pos}|${w.zh}`;
  if (dupSeen.has(key)) { dupDropped.push(`${w.word}（${w.lesson}，与更早条目重复）`); return false; }
  dupSeen.add(key);
  return true;
});
const extraSet = new Set(WORDS_DEDUP.filter(w => w.extra));
WORDS_DEDUP.forEach((w, i) => { w.id = 'w' + String(i + 1).padStart(4, '0'); });
const WORDS = WORDS_DEDUP.map(w => {
  const { extra, ...rest } = w;
  return rest;
});
const byId = Object.fromEntries(WORDS.map(w => [w.id, w]));

// ---------- 3. 课程表（24 课） ----------
const LESSON_TABLE = [
  ['A1.1-L01', 'P1', '问候与自我介绍'], ['A1.1-L02', 'P1', '家庭与描述'],
  ['A1.1-L03', 'P1', '在咖啡馆'],       ['A1.1-L04', 'P1', '时间与日常'],
  ['A1.1-L05', 'P1', '购物与询价'],     ['A1.1-L06', 'P1', '数字日期星期月份'],
  ['A1.1-L07', 'P1', '天气与季节'],     ['A1.1-L08', 'P1', '爱好与运动'],
  ['A1.1-L09', 'P1', '身体与健康'],     ['A1.1-L10', 'P1', '交通出行'],
  ['A1.1-L11', 'P1', '城市与地点方位'], ['A1.1-L12', 'P1', '学校与工作'],
  ['A1.2-L01', 'P2', '购物进阶'],       ['A1.2-L02', 'P2', '点餐进阶'],
  ['A1.2-L03', 'P2', '问路指路'],       ['A1.2-L04', 'P2', '打电话'],
  ['A1.2-L05', 'P2', '约会邀请'],       ['A1.2-L06', 'P2', '看病'],
  ['A1.2-L07', 'P2', '旅行交通'],       ['A1.2-L08', 'P2', '住宿酒店'],
  ['A1.2-L09', 'P2', '谈论过去经历'],   ['A1.2-L10', 'P2', '未来计划'],
  ['A1.2-L11', 'P2', '节日与文化'],     ['A1.2-L12', 'P2', 'A1 总复习'],
];

const LESSONS = LESSON_TABLE.map(([id, stage, title]) => {
  const main = WORDS_DEDUP.filter(w => w.lesson === id && !extraSet.has(w)).map(w => w.id);
  const extra = WORDS_DEDUP.filter(w => w.lesson === id && extraSet.has(w)).map(w => w.id);
  const dialog = DIALOGS_ALL[id];
  if (!dialog) throw new Error('缺少对话: ' + id);
  const g = GRAMMARS.find(g => g.lesson === id);
  return { id, stage, title, words: main, extra_words: extra, grammar_id: g ? g.id : null, dialog };
});

// ---------- 4. 生成数据区文本 ----------
const J = o => JSON.stringify(o, null, 2);
const dataSection = '//__DATA_BEGIN__\n'
  + 'const STAGES = ' + J(STAGES) + ';\n'
  + 'const ALPHABET = ' + J(ALPHABET) + ';\n'
  + 'const PHONEMES = ' + J(PHONEMES) + ';\n'
  + 'const RULES = ' + J(RULES) + ';\n'
  + 'const UNLOCK_QUIZ = ' + J(UNLOCK_QUIZ) + ';\n'
  + 'const WORDS = ' + J(WORDS) + ';\n'
  + 'const LESSONS = ' + J(LESSONS) + ';\n'
  + 'const GRAMMARS = ' + J(GRAMMARS) + ';\n'
  + 'const VERBS = ' + J(VERBS) + ';\n'
  + '//__DATA_END__';

// ---------- 5. 替换骨架数据区 ----------
const skeleton = read(path.join(BUILD, 'skeleton.html'));
const begin = skeleton.indexOf('//__DATA_BEGIN__');
const end = skeleton.indexOf('//__DATA_END__');
if (begin < 0 || end < 0 || end <= begin) throw new Error('骨架数据区标记缺失');
const endLine = skeleton.indexOf('\n', end);
const finalHtml = skeleton.slice(0, begin) + dataSection + skeleton.slice(endLine + 1);
fs.writeFileSync(path.join(ROOT, 'index.html'), finalHtml);

// ---------- 6. 语法检查：提取全部 script 块 ----------
const scripts = [...finalHtml.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach((s, i) => {
  const tmp = path.join(BUILD, `_check_${i}.js`);
  fs.writeFileSync(tmp, s);
});
const { execSync } = require('child_process');
scripts.forEach((s, i) => {
  const tmp = path.join(BUILD, `_check_${i}.js`);
  try { execSync(`node --check "${tmp}"`, { stdio: 'pipe' }); }
  catch (e) { console.error(`script #${i} 语法错误:\n` + e.stderr); process.exit(1); }
  fs.unlinkSync(tmp);
});
console.log(`SYNTAX_OK (${scripts.length} script blocks)`);

// ---------- 7. 验收清单第 8 条：内容抽查 ----------
const errors = [];
const warn = [];
const ck = (cond, msg) => { if (!cond) errors.push(msg); };

// 数量
ck(WORDS.length >= 450, `词库仅 ${WORDS.length}，期望 ≥450`);
ck(ALPHABET.length === 27, `字母 ${ALPHABET.length} ≠ 27`);
ck(PHONEMES.length >= 25, `音素 ${PHONEMES.length} < 25`);
ck(RULES.length === 18, `规则 ${RULES.length} ≠ 18`);
ck(UNLOCK_QUIZ.length === 10, `解锁测验 ${UNLOCK_QUIZ.length} ≠ 10`);
ck(GRAMMARS.length === 25, `语法 ${GRAMMARS.length} ≠ 25`);
ck(VERBS.length === 20, `动词 ${VERBS.length} ≠ 20`);
ck(LESSONS.length === 24, `课程 ${LESSONS.length} ≠ 24`);

// 每课规模与对话
for (const l of LESSONS) {
  ck(l.words.length >= 10 && l.words.length <= 12, `${l.id} 正文词 ${l.words.length} 不在 10–12`);
  ck(l.extra_words.length >= 15 && l.extra_words.length <= 25, `${l.id} 扩展词 ${l.extra_words.length} 不在 15–25`);
  ck(l.dialog.length >= 5 && l.dialog.length <= 6, `${l.id} 对话 ${l.dialog.length} 句不在 5–6`);
  l.dialog.forEach((d, i) => {
    ck(d.es && d.zh, `${l.id} 对话第 ${i + 1} 句缺 es/zh`);
    ck(d.speaker === (i % 2 === 0 ? 'A' : 'B'), `${l.id} 对话第 ${i + 1} 句 speaker 未交替`);
  });
}

// 词条结构（名词冠词允许 el/la/los/las；el agua / el hambre 为合法的「阴性用 el」特例）
const FEM_EL = new Set(['agua', 'hambre']);
for (const w of WORDS) {
  if (w.pos === 'n') ck(w.gender === 'm' || w.gender === 'f', `${w.id} ${w.word} 名词缺 gender`);
  if (w.pos === 'n') ck(['el', 'la', 'los', 'las'].includes(w.article), `${w.id} ${w.word} 名词缺 article`);
  if (w.pos === 'n' && w.gender === 'm') ck(w.article === 'el' || w.article === 'los', `${w.id} ${w.word} 阳性应为 el/los`);
  if (w.pos === 'n' && w.gender === 'f' && !FEM_EL.has(w.word)) ck(w.article === 'la' || w.article === 'las', `${w.id} ${w.word} 阴性应为 la/las`);
  if (w.pos === 'n' && w.gender === 'f' && FEM_EL.has(w.word)) ck(w.article === 'el', `${w.id} ${w.word} 应为 el（阴性特例）`);
  if (w.pos === 'v') ck([1, 2, 3].includes(w.conj_group), `${w.id} ${w.word} 动词缺 conj_group`);
  ck(typeof w.ipa === 'string' && w.ipa.startsWith('/'), `${w.id} ${w.word} IPA 异常`);
  ck(w.zh && w.example && w.example_zh, `${w.id} ${w.word} 缺释义/例句`);
}

// 不规则阴阳性
const findWord = t => WORDS.find(w => w.word === t);
const G = { 'problema': ['m', 'el'], 'mano': ['f', 'la'], 'día': ['m', 'el'], 'foto': ['f', 'la'], 'mapa': ['m', 'el'], 'moto': ['f', 'la'], 'padres': ['m', 'los'] };
for (const [word, [g, a]] of Object.entries(G)) {
  const w = findWord(word);
  ck(w, `缺少必备词 ${word}`);
  if (w) ck(w.gender === g && w.article === a, `${word} 应为 ${a}(${g})，实际 ${w.article}(${w.gender})`);
}

// distinción：θ 抽查
for (const t of ['gracias', 'zapato', 'cena']) {
  const w = findWord(t);
  ck(w, `缺少词 ${t}`);
  if (w) ck(w.ipa.includes('θ'), `${t} 的 IPA ${w.ipa} 未标 /θ/`);
}
// 全文 IPA 中不该有 /s/ 标的 cena/zapato 类错误已在上；再查常见 distinción 词
for (const t of ['canción', 'estación']) {
  const w = findWord(t);
  if (w) ck(w.ipa.includes('θ'), `${t} 的 IPA ${w.ipa} 未标 /θ/`); else warn.push(`缺词 ${t}（可选）`);
}

// 重音符号（全文文本检查）
for (const s of ['canción', 'médico', 'veintiún', '¿Cómo', 'estación']) {
  ck(finalHtml.includes(s), `最终文件缺少「${s}」`);
}
ck(!finalHtml.includes('机 Long'), '最终文件含有损坏文本「机 Long」');

// 动词变位锚点
const vByInf = Object.fromEntries(VERBS.map(v => [v.inf, v]));
const P = ['yo', 'tú', 'él/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'];
const CONJ = {
  ser:   { presente: ['soy', 'eres', 'es', 'somos', 'sois', 'son'], indefinido: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
  ir:    { presente: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'], indefinido: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'] },
  tener: { presente: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'], indefinido: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'] },
  hacer: { presente: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'], indefinido: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'] },
};
for (const [inf, tenses] of Object.entries(CONJ)) {
  const v = vByInf[inf];
  ck(v, `缺动词 ${inf}`);
  if (!v) continue;
  for (const [tense, forms] of Object.entries(tenses)) {
    P.forEach((p, i) => ck(v[tense][p] === forms[i], `${inf}.${tense}.${p} 应为 ${forms[i]}，实际 ${v[tense][p]}`));
  }
}
// 自反动词抽查
ck(vByInf.llamarse.presente['vosotros'] === 'os llamáis', 'llamarse vosotros 变位错误');
ck(vByInf.levantarse.indefinido['él/ella/usted'] === 'se levantó', 'levantarse indefinido 变位错误');
// 每个动词 5 时态 6 人称齐全
for (const v of VERBS) {
  for (const t of ['presente', 'perfecto', 'indefinido', 'futuro', 'condicional']) {
    for (const p of P) ck(v[t] && typeof v[t][p] === 'string' && v[t][p], `${v.inf} 缺 ${t}.${p}`);
  }
}

// 解锁测验结构
UNLOCK_QUIZ.forEach((q, i) => {
  ck(Array.isArray(q.options) && q.options.length === 3, `解锁题 ${i + 1} 选项数异常`);
  ck(Number.isInteger(q.a) && q.a >= 0 && q.a < 3, `解锁题 ${i + 1} a 越界`);
  ck(new Set(q.options).size === 3, `解锁题 ${i + 1} 选项重复`);
});

// 课程词 id 引用有效
for (const l of LESSONS) for (const id of [...l.words, ...l.extra_words]) ck(byId[id], `${l.id} 引用无效词 id ${id}`);
// 语法挂载课有效
const lessonIds = new Set(LESSONS.map(l => l.id));
for (const g of GRAMMARS) ck(lessonIds.has(g.lesson), `${g.id} 挂载无效课 ${g.lesson}`);

// 重复词目（仅警告）
const dup = {};
WORDS.forEach(w => { dup[w.word] = (dup[w.word] || 0) + 1; });
Object.entries(dup).filter(([, n]) => n > 1).forEach(([w, n]) => warn.push(`词目重复 ×${n}: ${w}`));

console.log(`\nSTATS: 词 ${WORDS.length}（正文 ${LESSONS.reduce((s, l) => s + l.words.length, 0)} / 扩展 ${LESSONS.reduce((s, l) => s + l.extra_words.length, 0)}），课 ${LESSONS.length}，语法 ${GRAMMARS.length}，动词 ${VERBS.length}，字母 ${ALPHABET.length}，音素 ${PHONEMES.length}，规则 ${RULES.length}，测验 ${UNLOCK_QUIZ.length}`);
console.log(`去重移除 ${dupDropped.length} 条完全重复词条`);
if (dupDropped.length) console.log(dupDropped.map(d => '  - ' + d).join('\n'));
if (warn.length) console.log('\nWARNINGS:\n' + warn.map(w => '  - ' + w).join('\n'));
if (errors.length) { console.error('\nCHECK_FAILED (' + errors.length + '):\n' + errors.map(e => '  ✗ ' + e).join('\n')); process.exit(1); }
console.log('\nALL_CONTENT_CHECKS_PASSED');
console.log('index.html 行数: ' + finalHtml.split('\n').length);
