// ESbrain 组装脚本：skeleton.html + data/*.js -> 项目根目录/index.html
// 同时执行验收清单第 8 条内容抽查。
const fs = require('fs');
const path = require('path');

const BUILD = __dirname;
const DATA = path.join(BUILD, 'data');
const ROOT = path.resolve(BUILD, '..');

const read = p => fs.readFileSync(p, 'utf8');

// ---------- 1. 加载数据文件（在同一 eval 作用域内合并 const） ----------
const dataSrc = ['core.js', 'words-p1a.js', 'words-p1b.js', 'words-p2a.js', 'words-p2b.js', 'words-p3.js', 'words-p4.js', 'words-p6.js', 'words-p7.js', 'b1-authentic.js', 'grammar.js', 'a22-grammar.js', 'b2-grammar.js', 'verbs.js', 'quiz-extra.js', 'speaking.js', 'input-starter.js', 'culture.js']
  .map(f => read(path.join(DATA, f))).join('\n');

const sandbox = {};
new Function('sandbox', dataSrc + `
  sandbox.STAGES = STAGES; sandbox.ALPHABET = ALPHABET; sandbox.DIGRAPHS = DIGRAPHS; sandbox.PHONEMES = PHONEMES;
  sandbox.RULES = RULES; sandbox.UNLOCK_QUIZ = UNLOCK_QUIZ;
  sandbox.GRAMMARS = GRAMMARS; sandbox.VERBS = VERBS;
  sandbox.BASE_WORDS = [...WORDS_P1A, ...WORDS_P1B, ...WORDS_P2A, ...WORDS_P2B, ...WORDS_P3, ...WORDS_A1_EXTRA];
  sandbox.B1_RAW_WORDS = [...WORDS_P4A, ...WORDS_P4B, ...B1_FILLER_WORDS, ...B1_REVIEW_WORDS];
  sandbox.A22_RAW_WORDS = [...WORDS_P6, ...A22_REVIEW_WORDS];
  sandbox.B2_RAW_WORDS = [...WORDS_P7A, ...WORDS_P7B, ...B2_COURSE_SUPPLEMENTS, ...B2_REVIEW_WORDS];
  sandbox.B1_EXISTING_WORDS = [...WORDS_P4A, ...WORDS_P4B];
  sandbox.B1_FILLER_WORDS = B1_FILLER_WORDS;
  sandbox.WORDS_ALL = [...sandbox.BASE_WORDS, ...sandbox.B1_RAW_WORDS, ...sandbox.A22_RAW_WORDS, ...sandbox.B2_RAW_WORDS];
  sandbox.NEW_WORDS = [...WORDS_P3, ...WORDS_A1_EXTRA];
  sandbox.DIALOGS_ALL = Object.assign({}, DIALOGS_P1A, DIALOGS_P1B, DIALOGS_P2A, DIALOGS_P2B, DIALOGS_P3, DIALOGS_P4A, DIALOGS_P4B, DIALOGS_P6, DIALOGS_P7A, DIALOGS_P7B);
  sandbox.LISTENING_ALL = Object.fromEntries([...LISTENING_P4A, ...LISTENING_P4B, ...LISTENING_P6, ...LISTENING_P7A, ...LISTENING_P7B].map(x => [x.id, x]));
  sandbox.STRESS_QUIZ = STRESS_QUIZ; sandbox.SER_ESTAR_QUIZ = SER_ESTAR_QUIZ;
  sandbox.POR_PARA_QUIZ = POR_PARA_QUIZ; sandbox.ARTICLE_EXCEPTIONS = ARTICLE_EXCEPTIONS;
  sandbox.FALSE_FRIENDS = FALSE_FRIENDS; sandbox.TENSE_CLOZE = TENSE_CLOZE;
  sandbox.SUBJUNCTIVE_QUIZ = SUBJUNCTIVE_QUIZ; sandbox.SHADOWING_SENTENCES = SHADOWING_SENTENCES;
  sandbox.LISTENING_LA = LISTENING_LA;
  sandbox.SPEAKING_TASKS = SPEAKING_TASKS;
  sandbox.INPUT_STARTER = INPUT_STARTER;
  sandbox.CULTURE_ARTICLES = CULTURE_ARTICLES;
  sandbox.FRENCH_COGNATES = FRENCH_COGNATES;
`)(sandbox);

const { STAGES, ALPHABET, DIGRAPHS, PHONEMES, RULES, UNLOCK_QUIZ, GRAMMARS, VERBS, WORDS_ALL, NEW_WORDS, DIALOGS_ALL, LISTENING_ALL, STRESS_QUIZ, SER_ESTAR_QUIZ, POR_PARA_QUIZ, ARTICLE_EXCEPTIONS, FALSE_FRIENDS, TENSE_CLOZE, SUBJUNCTIVE_QUIZ, SHADOWING_SENTENCES, LISTENING_LA, SPEAKING_TASKS, INPUT_STARTER, CULTURE_ARTICLES, FRENCH_COGNATES, BASE_WORDS, B1_RAW_WORDS, B1_EXISTING_WORDS, B1_FILLER_WORDS, A22_RAW_WORDS, B2_RAW_WORDS } = sandbox;

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
let extraSet = new Set(WORDS_DEDUP.filter(w => w.extra));
// 重编号会就地改写 id，先快照新词原始 id 供第 7 节续编校验
const OLD_MAX_RAW = Math.max(...BASE_WORDS.filter(w => !NEW_WORDS.includes(w)).map(w => parseInt(w.id.slice(1), 10)));
const NEW_RAW_IDS = NEW_WORDS.map(w => w.id);
const B1_RAW_IDS = B1_RAW_WORDS.map(w => w.id);
WORDS_DEDUP.forEach((w, i) => { w.id = 'w' + String(i + 1).padStart(4, '0'); });
let WORDS = [];
let byId = {};

// B1 每课固定 13 核心 + 26 扩展。先保留已有 B1 条目，再从高频补词中补齐；
// 未入课程的词保留在 B1 总复习词库，不伪造课程容量。
const B1_IDS = [...Array(12)].map((_, i) => `B1.1-L${String(i + 1).padStart(2, '0')}`)
  .concat([...Array(12)].map((_, i) => `B1.2-L${String(i + 1).padStart(2, '0')}`));
const b1RawSet = new Set(B1_RAW_WORDS);
const b1ExistingSet = new Set(B1_EXISTING_WORDS);
const b1FillerSet = new Set(B1_FILLER_WORDS);
const survivingB1 = WORDS_DEDUP.filter(w => b1RawSet.has(w));
const usedB1 = new Set();
const fillerQueue = survivingB1.filter(w => b1FillerSet.has(w) || !b1ExistingSet.has(w));
let fillerAt = 0;
for (const id of B1_IDS) {
  const own = survivingB1.filter(w => b1ExistingSet.has(w) && w.lesson === id && !usedB1.has(w));
  const selected = own.slice(0, 39);
  selected.forEach(w => usedB1.add(w));
  while (selected.length < 39 && fillerAt < fillerQueue.length) {
    const w = fillerQueue[fillerAt++];
    if (!usedB1.has(w)) { selected.push(w); usedB1.add(w); }
  }
  selected.forEach((w, i) => { w.lesson = id; w.extra = i >= 13; });
}
survivingB1.filter(w => !usedB1.has(w)).forEach(w => { w.lesson = 'B1-REV'; w.extra = true; });

// B2 source words can overlap earlier levels. After global deduplication,
// promote the remaining course-specific terms into the stable 13 + 26 layout
// instead of letting the original index decide which ones are "core".
const B2_IDS = [...Array(12)].map((_, i) => `B2.1-L${String(i + 1).padStart(2, '0')}`)
  .concat([...Array(12)].map((_, i) => `B2.2-L${String(i + 1).padStart(2, '0')}`));
const b2RawSet = new Set(B2_RAW_WORDS);
const survivingB2 = WORDS_DEDUP.filter(w => b2RawSet.has(w));
for (const id of B2_IDS) {
  const own = survivingB2.filter(w => w.lesson === id).slice(0, 39);
  own.forEach((w, i) => { w.extra = i >= 13; });
}
extraSet = new Set(WORDS_DEDUP.filter(w => w.extra));
WORDS = WORDS_DEDUP.map(w => {
  const { extra, ...rest } = w;
  return FRENCH_COGNATES[rest.word] ? { ...rest, fr: FRENCH_COGNATES[rest.word] } : rest;
});
byId = Object.fromEntries(WORDS.map(w => [w.id, w]));

// B1 源数据中有少量同一 id 的历史草稿（例如 w1462），按词条保留后续 id
// 续编检查只要求去重后的新 id 连续，不把草稿重复视为可用词。

// ---------- 3. 课程表（72 课） ----------
const LESSON_TABLE = [
  ['A1.1-L01', 'P1', '问候与自我介绍'], ['A1.1-L02', 'P1', '家庭与描述'],
  ['A1.1-L03', 'P1', '在咖啡馆'],       ['A1.1-L04', 'P1', '时间与日常'],
  ['A1.1-L05', 'P1', '购物与询价'],     ['A1.1-L06', 'P1', '日期、星期与月份'],
  ['A1.1-L07', 'P1', '天气与季节'],     ['A1.1-L08', 'P1', '爱好与运动'],
  ['A1.1-L09', 'P1', '身体与健康'],     ['A1.1-L10', 'P1', '交通出行'],
  ['A1.1-L11', 'P1', '城市与地点方位'], ['A1.1-L12', 'P1', '学校与工作'],
  ['A1.2-L01', 'P2', '购物进阶'],       ['A1.2-L02', 'P2', '点餐进阶'],
  ['A1.2-L03', 'P2', '问路指路'],       ['A1.2-L04', 'P2', '打电话'],
  ['A1.2-L05', 'P2', '约会邀请'],       ['A1.2-L06', 'P2', '看病'],
  ['A1.2-L07', 'P2', '旅行交通'],       ['A1.2-L08', 'P2', '住宿酒店'],
  ['A1.2-L09', 'P2', '谈论过去经历'],   ['A1.2-L10', 'P2', '未来计划'],
  ['A1.2-L11', 'P2', '节日与文化'],     ['A1.2-L12', 'P2', 'A1 总复习'],
  ['A2.1-L01', 'P3', '童年与回忆'],     ['A2.1-L02', 'P3', '讲过去的故事'],
  ['A2.1-L03', 'P3', '直接宾语代词'],   ['A2.1-L04', 'P3', '间接宾语代词'],
  ['A2.1-L05', 'P3', '双代词'],         ['A2.1-L06', 'P3', '命令式肯定'],
  ['A2.1-L07', 'P3', '命令式否定与 usted'], ['A2.1-L08', 'P3', '词干变化总复习'],
  ['A2.1-L09', 'P3', '比较级与最高级'], ['A2.1-L10', 'P3', '定语从句入门'],
  ['A2.1-L11', 'P3', '过去进行时与 llevar'], ['A2.1-L12', 'P3', '将来时'],
  ['A2.2-L01', 'P3B', '表达观点：赞同与反对'], ['A2.2-L02', 'P3B', '表达情感与愿望'],
  ['A2.2-L03', 'P3B', '写信与电子邮件'], ['A2.2-L04', 'P3B', '烹饪与食谱'],
  ['A2.2-L05', 'P3B', '搬家与住房'], ['A2.2-L06', 'P3B', '银行与钱'],
  ['A2.2-L07', 'P3B', '行政手续（证件、保险）'], ['A2.2-L08', 'P3B', '旅行中的意外'],
  ['A2.2-L09', 'P3B', '电影与娱乐'], ['A2.2-L10', 'P3B', '西语世界的节日'],
  ['A2.2-L11', 'P3B', '假设与愿望（条件式）'], ['A2.2-L12', 'P3B', 'A2 总复习'],
  ['B1.1-L01', 'P4', '虚拟式现在时：WEIRDO'], ['B1.1-L02', 'P4', '不确定与未发生的事'],
  ['B1.1-L03', 'P4', '将来时间从句'], ['B1.1-L04', 'P4', '目的与让步'],
  ['B1.1-L05', 'P4', '条件式现在时'], ['B1.1-L06', 'P4', '第一类条件句'],
  ['B1.1-L07', 'P4', '复合过去时辨析'], ['B1.1-L08', 'P4', 'se 的三种用法'],
  ['B1.1-L09', 'P4', '关系从句进阶'], ['B1.1-L10', 'P4', '间接引语入门'],
  ['B1.1-L11', 'P4', '连接词与论述结构'], ['B1.1-L12', 'P4', 'B1 上半复习'],
  ['B1.2-L01', 'P5', '情感与评价'], ['B1.2-L02', 'P5', '比较与否定'],
  ['B1.2-L03', 'P5', '动名词副句'], ['B1.2-L04', 'P5', '前置词加不定式'],
  ['B1.2-L05', 'P5', '代词 se 进阶'], ['B1.2-L06', 'P5', '名词化表达'],
  ['B1.2-L07', 'P5', '高频动词短语'], ['B1.2-L08', 'P5', '图表与趋势'],
  ['B1.2-L09', 'P5', '社会议题词汇'], ['B1.2-L10', 'P5', '观点与辩论'],
  ['B1.2-L11', 'P5', '语体差异识别'], ['B1.2-L12', 'P5', 'B1 总复习与 B2 预览'],
  ['B2.1-L01', 'P6', '虚拟式未完成过去时：-ra 与 -se'], ['B2.1-L02', 'P6', '第二类条件句：si + subjuntivo imperfecto'],
  ['B2.1-L03', 'P6', '第三类条件句：过去反事实'], ['B2.1-L04', 'P6', '虚拟式完成时与愈过去时'],
  ['B2.1-L05', 'P6', '间接引语的时态后移'], ['B2.1-L06', 'P6', '被动语态：ser、estar 与 participio'],
  ['B2.1-L07', 'P6', '分词与副动词的独立结构'], ['B2.1-L08', 'P6', '名词化与抽象表达'],
  ['B2.1-L09', 'P6', '让步结构：aunque 的语义差异'], ['B2.1-L10', 'P6', '原因与结果的连接方式'],
  ['B2.1-L11', 'P6', '论说文结构'], ['B2.1-L12', 'P6', 'B2.1 总复习'],
  ['B2.2-L01', 'P7', '语体差异：书面、口语、正式与非正式'], ['B2.2-L02', 'P7', '西班牙与拉美表达差异'],
  ['B2.2-L03', 'P7', '习语与固定搭配'], ['B2.2-L04', 'P7', '委婉与含蓄表达'],
  ['B2.2-L05', 'P7', '报刊语言与新闻体'], ['B2.2-L06', 'P7', '正式信函与投诉信'],
  ['B2.2-L07', 'P7', '图表描述与数据评论'], ['B2.2-L08', 'P7', '辩论中的反驳技巧'],
  ['B2.2-L09', 'P7', '口语填充与话轮转换'], ['B2.2-L10', 'P7', '幽默与讽刺的识别'],
  ['B2.2-L11', 'P7', '文学片段阅读入门'], ['B2.2-L12', 'P7', 'B2 总复习：精确、得体与论证'],
];

const LESSONS = LESSON_TABLE.map(([id, stage, title]) => {
  const main = WORDS_DEDUP.filter(w => w.lesson === id && !extraSet.has(w)).map(w => w.id);
  const extra = WORDS_DEDUP.filter(w => w.lesson === id && extraSet.has(w)).map(w => w.id);
  const dialog = DIALOGS_ALL[id];
  if (!dialog) throw new Error('缺少对话: ' + id);
  const g = GRAMMARS.find(g => g.lesson === id);
  return { id, stage, title, words: main, extra_words: extra, grammar_id: g ? g.id : null, dialog, listening: LISTENING_ALL[id] || null };
});

// ---------- 4. 生成数据区文本 ----------
const J = o => JSON.stringify(o, null, 2);
const dataSection = '//__DATA_BEGIN__\n'
  + 'const STAGES = ' + J(STAGES) + ';\n'
  + 'const ALPHABET = ' + J(ALPHABET) + ';\n'
  + 'const DIGRAPHS = ' + J(DIGRAPHS) + ';\n'
  + 'const PHONEMES = ' + J(PHONEMES) + ';\n'
  + 'const RULES = ' + J(RULES) + ';\n'
  + 'const UNLOCK_QUIZ = ' + J(UNLOCK_QUIZ) + ';\n'
  + 'const WORDS = ' + J(WORDS) + ';\n'
  + 'const LESSONS = ' + J(LESSONS) + ';\n'
  + 'const GRAMMARS = ' + J(GRAMMARS) + ';\n'
  + 'const VERBS = ' + J(VERBS) + ';\n'
  + 'const STRESS_QUIZ = ' + J(STRESS_QUIZ) + ';\n'
  + 'const SER_ESTAR_QUIZ = ' + J(SER_ESTAR_QUIZ) + ';\n'
  + 'const POR_PARA_QUIZ = ' + J(POR_PARA_QUIZ) + ';\n'
  + 'const ARTICLE_EXCEPTIONS = ' + J(ARTICLE_EXCEPTIONS) + ';\n'
  + 'const FALSE_FRIENDS = ' + J(FALSE_FRIENDS) + ';\n'
  + 'const TENSE_CLOZE = ' + J(TENSE_CLOZE) + ';\n'
  + 'const LISTENING_ALL = ' + J(LISTENING_ALL) + ';\n'
  + 'const SUBJUNCTIVE_QUIZ = ' + J(SUBJUNCTIVE_QUIZ) + ';\n'
  + 'const SHADOWING_SENTENCES = ' + J(SHADOWING_SENTENCES) + ';\n'
  + 'const LISTENING_LA = ' + J(LISTENING_LA) + ';\n'
  + 'const SPEAKING_TASKS = ' + J(SPEAKING_TASKS) + ';\n'
  + 'const INPUT_STARTER = ' + J(INPUT_STARTER) + ';\n'
  + 'const CULTURE_ARTICLES = ' + J(CULTURE_ARTICLES) + ';\n'
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
ck(WORDS.length >= 3800, `词库仅 ${WORDS.length}，期望 ≥3800`);
ck(ALPHABET.length === 27, `字母 ${ALPHABET.length} ≠ 27`);
ck(ALPHABET.find(x => x.letter === 'C')?.ipa_la === '/se/', '拉美 C 字母名 IPA 应为 /se/');
ck(ALPHABET.find(x => x.letter === 'Z')?.ipa_la === '/ˈseta/', '拉美 Z 字母名 IPA 应为 /ˈseta/');
ck(Array.isArray(DIGRAPHS) && DIGRAPHS.length === 2, `二合字母 ${DIGRAPHS.length} ≠ 2`);
ck(DIGRAPHS.some(d => d.letters === 'ch' && d.ipa === '/tʃ/'), '缺少 ch /tʃ/ 二合字母');
ck(DIGRAPHS.some(d => d.letters === 'll' && d.ipa.includes('/ʝ/')), '缺少 ll 地区变体说明');
ck(PHONEMES.length >= 25, `音素 ${PHONEMES.length} < 25`);
ck(RULES.length === 15, `规则 ${RULES.length} ≠ 15（8 核心 + 7 细节）`);
ck(RULES.filter(r => r.core).length === 8, `核心规则 ${RULES.filter(r => r.core).length} ≠ 8`);
ck(UNLOCK_QUIZ.length === 10, `解锁测验 ${UNLOCK_QUIZ.length} ≠ 10`);
ck(GRAMMARS.length === 97, `语法 ${GRAMMARS.length} ≠ 97`);
ck(VERBS.length === 60, `动词 ${VERBS.length} ≠ 60`);
ck(LESSONS.length === 96, `课程 ${LESSONS.length} ≠ 96`);

// 每课规模与对话（A2.1 课容量更大、对话更长）
for (const l of LESSONS) {
  if (l.stage === 'P3B' || l.stage === 'P4' || l.stage === 'P5' || l.stage === 'P6' || l.stage === 'P7') {
    ck(l.words.length >= 12 && l.words.length <= 14, `${l.id} 正文词 ${l.words.length} 不在 12–14`);
    ck(l.extra_words.length >= 18 && l.extra_words.length <= 26, `${l.id} 扩展词 ${l.extra_words.length} 不在 18–26`);
    ck(l.dialog.length === 8, `${l.id} 对话 ${l.dialog.length} 句 ≠ 8`);
    const listening = l.listening;
    ck(listening && typeof listening.text === 'string' && listening.text.trim().split(/\s+/).length >= 80 && listening.text.trim().split(/\s+/).length <= 150, `${l.id} listening 正文不在 80–150 词`);
    ck(listening && Array.isArray(listening.questions) && listening.questions.length >= 2 && listening.questions.length <= 3, `${l.id} listening 题数异常`);
    (listening?.questions || []).forEach((q, i) => ck(q.q && Array.isArray(q.options) && q.options.length >= 3 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length && q.tip, `${l.id} listening 第 ${i + 1} 题结构异常`));
  } else if (l.stage === 'P3') {
    ck(l.words.length >= 12 && l.words.length <= 14, `${l.id} 正文词 ${l.words.length} 不在 12–14`);
    ck(l.extra_words.length >= 18 && l.extra_words.length <= 26, `${l.id} 扩展词 ${l.extra_words.length} 不在 18–26`);
    ck(l.words.length + l.extra_words.length >= 30 && l.words.length + l.extra_words.length <= 40, `${l.id} 总词数 ${l.words.length + l.extra_words.length} 不在 30–40`);
    ck(l.dialog.length >= 6 && l.dialog.length <= 10, `${l.id} 对话 ${l.dialog.length} 句不在 6–10`);
  } else {
    ck(l.words.length >= 10 && l.words.length <= 14, `${l.id} 正文词 ${l.words.length} 不在 10–14`);
    ck(l.extra_words.length >= 15 && l.extra_words.length <= 35, `${l.id} 扩展词 ${l.extra_words.length} 不在 15–35`);
    ck(l.dialog.length >= 5 && l.dialog.length <= 6, `${l.id} 对话 ${l.dialog.length} 句不在 5–6`);
  }
  l.dialog.forEach((d, i) => {
    ck(d.es && d.zh, `${l.id} 对话第 ${i + 1} 句缺 es/zh`);
    ck(d.speaker === (i % 2 === 0 ? 'A' : 'B'), `${l.id} 对话第 ${i + 1} 句 speaker 未交替`);
  });
}

// 第六轮 A2.2：12 课、语法和四段式讲解必须一起存在。
{
  const a22 = LESSONS.filter(l => l.stage === 'P3B');
  ck(a22.length === 12, `A2.2 课程 ${a22.length} ≠ 12`);
  a22.forEach((l, i) => {
    ck(l.id === `A2.2-L${String(i + 1).padStart(2, '0')}`, `A2.2 课程顺序错误: ${l.id}`);
    ck(l.grammar_id === `g${String(62 + i).padStart(3, '0')}`, `${l.id} 语法应为 g${String(62 + i).padStart(3, '0')}`);
    const g = GRAMMARS.find(x => x.id === l.grammar_id);
    ck(g && /规则：/.test(g.content) && /<table>/.test(g.content) && /例句：/.test(g.content) && /常见错误：/.test(g.content), `${l.id} 语法未满足规则、表格、例句、常见错误四段式`);
  });
}

// 词条结构（名词冠词允许 el/la/los/las；el agua / el hambre 为合法的「阴性用 el」特例）
// Round 7: every B2 grammar entry remains reachable from its matching lesson
// and retains the same four-part instructional standard as A2.2.
{
  const b2 = LESSONS.filter(l => l.stage === 'P6' || l.stage === 'P7');
  ck(b2.length === 24, `B2 course count ${b2.length} != 24`);
  b2.forEach((l, i) => {
    const expectedId = i < 12 ? `B2.1-L${String(i + 1).padStart(2, '0')}` : `B2.2-L${String(i - 11).padStart(2, '0')}`;
    const expectedGrammar = `g${String(74 + i).padStart(3, '0')}`;
    ck(l.id === expectedId, `B2 order error: ${l.id}`);
    ck(l.grammar_id === expectedGrammar, `${l.id} grammar should be ${expectedGrammar}`);
    const g = GRAMMARS.find(x => x.id === l.grammar_id);
    ck(g && /规则：/.test(g.content) && /<table>/.test(g.content) && /例句：/.test(g.content) && /常见错误：/.test(g.content), `${l.id} grammar lacks four-part explanation`);
  });
}

const FEM_EL = new Set(['agua', 'hambre']);
for (const w of WORDS) {
  if (w.pos === 'n') ck(w.gender === 'm' || w.gender === 'f', `${w.id} ${w.word} 名词缺 gender`);
  if (w.pos === 'n') ck(['el', 'la', 'los', 'las'].includes(w.article), `${w.id} ${w.word} 名词缺 article`);
  if (w.pos === 'n' && w.gender === 'm') ck(w.article === 'el' || w.article === 'los', `${w.id} ${w.word} 阳性应为 el/los`);
  if (w.pos === 'n' && w.gender === 'f' && !FEM_EL.has(w.word)) ck(w.article === 'la' || w.article === 'las', `${w.id} ${w.word} 阴性应为 la/las`);
  if (w.pos === 'n' && w.gender === 'f' && FEM_EL.has(w.word)) ck(w.article === 'el', `${w.id} ${w.word} 应为 el（阴性特例）`);
  if (w.pos === 'v' && !String(w.lesson).startsWith('B1')) ck([1, 2, 3].includes(w.conj_group), `${w.id} ${w.word} 动词缺 conj_group`);
  ck(typeof w.ipa === 'string' && w.ipa.startsWith('/'), `${w.id} ${w.word} IPA 异常`);
  ck(w.zh && w.example && w.example_zh, `${w.id} ${w.word} 缺释义/例句`);
  if (w.stress !== undefined) ck(Number.isInteger(w.stress) && w.stress >= 1 && w.stress <= 4, `${w.id} ${w.word} stress 非法（应为 1–4）: ${w.stress}`);
}

// 第五轮新词：P4 源词 id 在上一轮词库 w1406 后连续续编。
{
  const nums = B1_RAW_IDS.map(id => parseInt(id.slice(1), 10)).sort((a, b) => a - b);
  ck(nums[0] === 1407, `B1 新词起始 id 应为 w1407，实际 w${nums[0]}`);
  const uniqueNums = [...new Set(nums)];
  for (let i = 1; i < uniqueNums.length; i++) ck(uniqueNums[i] === uniqueNums[i - 1] + 1, `B1 新词 id 不连续: w${uniqueNums[i - 1]} 后是 w${uniqueNums[i]}`);
}

// 新词（words-p3.js：A2.1 词条 + A1 补词）id 从旧库最大值续编且连续
{
  const newNums = NEW_RAW_IDS.map(id => parseInt(id.slice(1), 10)).sort((a, b) => a - b);
  ck(newNums.length > 0, 'words-p3.js 无新词');
  ck(newNums[0] === OLD_MAX_RAW + 1, `新词起始 id w${newNums[0]} ≠ 旧库最大值 w${OLD_MAX_RAW} + 1`);
  for (let i = 1; i < newNums.length; i++) ck(newNums[i] === newNums[i - 1] + 1, `新词 id 不连续: w${newNums[i - 1]} 之后是 w${newNums[i]}`);
  // 多音节新词应标 stress（粗略音节数：元音组 ≥2 的单词；多词短语与单音节豁免）
  const noStress = NEW_WORDS.filter(w => {
    if (w.stress !== undefined) return false;
    if (w.word.includes(' ')) return false;
    const groups = w.word.toLowerCase().replace(/[¿?¡!.,]/g, '').match(/[aeiouáéíóúü]+/g);
    return groups && groups.length >= 2;
  });
  ck(noStress.length === 0, `多音节新词缺 stress: ${noStress.slice(0, 8).map(w => w.word).join(', ')}${noStress.length > 8 ? ' 等 ' + noStress.length + ' 词' : ''}`);
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
// 每个动词 12 个人称时态 × 6 人称齐全 + 动名词/过去分词单形式
const VERB_TENSE_TABLES = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional', 'perfecto', 'pluscuamperfecto', 'futuro_perfecto', 'condicional_perfecto', 'subj_pres', 'subj_perfecto', 'subj_imp', 'subj_imp_se', 'subj_pluscuamperfecto', 'imp_af', 'imp_neg'];
for (const v of VERBS) {
  ck(v.zh, `${v.inf} 缺中文释义`);
  for (const t of VERB_TENSE_TABLES) {
    for (const p of P) ck(v[t] && typeof v[t][p] === 'string' && v[t][p], `${v.inf} 缺 ${t}.${p}`);
  }
  ck(typeof v.gerundio === 'string' && v.gerundio, `${v.inf} 缺 gerundio`);
  ck(typeof v.participio === 'string' && v.participio, `${v.inf} 缺 participio`);
}
// 旧 20 词 × 旧 5 时态逐格回归（迁移保真，夹具为第三轮前的全量手编表）
const LEGACY_VERBS = require(path.join(BUILD, 'verbs-legacy-fixture.js'));
for (const old of LEGACY_VERBS) {
  const nv = vByInf[old.inf];
  ck(nv, `旧动词缺失: ${old.inf}`);
  if (!nv) continue;
  for (const t of ['presente', 'perfecto', 'indefinido', 'futuro', 'condicional']) {
    for (const p of P) ck(nv[t] && nv[t][p] === old[t][p], `迁移不一致 ${old.inf}.${t}.${p}: 旧 ${old[t][p]} / 新 ${nv[t] && nv[t][p]}`);
  }
}
// 三类词干变化每类 ≥6 词
const scCount = t => VERBS.filter(v => v.stemChange === t).length;
ck(scCount('e_ie') >= 6, `e→ie 词干变化仅 ${scCount('e_ie')} 词 < 6`);
ck(scCount('o_ue') >= 6, `o→ue 词干变化仅 ${scCount('o_ue')} 词 < 6`);
ck(scCount('e_i') >= 6, `e→i 词干变化仅 ${scCount('e_i')} 词 < 6`);

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

// 第二轮专项数据
ck(STRESS_QUIZ.length >= 60 && STRESS_QUIZ.length <= 80, `重音题 ${STRESS_QUIZ.length} 不在 60–80`);
STRESS_QUIZ.forEach((q, i) => {
  ck(q.syllables.join('') === q.word, `重音题 ${i + 1} 音节拼接 ≠ 词形: ${q.word}`);
  ck(Number.isInteger(q.stress) && q.stress >= 1 && q.stress <= q.syllables.length, `重音题 ${i + 1} stress 越界: ${q.word}`);
  ck(q.tip, `重音题 ${i + 1} 缺 tip: ${q.word}`);
});
ck(SER_ESTAR_QUIZ.length >= 60, `ser/estar 题 ${SER_ESTAR_QUIZ.length} < 60`);
SER_ESTAR_QUIZ.forEach((q, i) => {
  ck(q.sentence.includes('___'), `ser/estar 题 ${i + 1} 缺空缺符: ${q.sentence}`);
  ck(Array.isArray(q.options) && q.options.length === 2, `ser/estar 题 ${i + 1} 选项数异常`);
  ck(q.answer === 0 || q.answer === 1, `ser/estar 题 ${i + 1} answer 越界`);
  ck(q.tip, `ser/estar 题 ${i + 1} 缺 tip`);
});
ck(POR_PARA_QUIZ.length >= 50, `por/para 题 ${POR_PARA_QUIZ.length} < 50`);
POR_PARA_QUIZ.forEach((q, i) => {
  ck(q.sentence.includes('___'), `por/para 题 ${i + 1} 缺空缺符: ${q.sentence}`);
  const lower = q.options.map(o => o.toLowerCase());
  ck(lower.includes('por') && lower.includes('para'), `por/para 题 ${i + 1} 选项不是 por/para: ${q.options}`);
  ck(q.answer === 0 || q.answer === 1, `por/para 题 ${i + 1} answer 越界`);
});
ck(ARTICLE_EXCEPTIONS.length >= 38, `冠词例外 ${ARTICLE_EXCEPTIONS.length} < 38`);
ARTICLE_EXCEPTIONS.forEach((w, i) => {
  ck(['el', 'la', 'both'].includes(w.article), `冠词例外 ${i + 1} article 异常: ${w.word}`);
  ck(w.note, `冠词例外 ${i + 1} 缺 note: ${w.word}`);
});
for (const t of ['problema', 'tema', 'mapa', 'día', 'agua', 'mano', 'foto', 'moto', 'programa', 'sistema', 'idioma', 'clima', 'planeta', 'poema', 'periodista', 'turista']) {
  ck(ARTICLE_EXCEPTIONS.some(w => w.word === t), `冠词例外缺必备词 ${t}`);
}
ck(FALSE_FRIENDS.length >= 24, `假朋友 ${FALSE_FRIENDS.length} < 24`);
FALSE_FRIENDS.forEach((f, i) => {
  ck(f.word && f.wrong && f.correct && f.decoy && f.example && f.exampleZh, `假朋友 ${i + 1} 字段不全: ${f.word}`);
});
for (const t of ['embarazada', 'éxito', 'actualmente', 'realizar', 'asistir', 'sensible', 'carpeta', 'largo', 'constipado', 'disgusto', 'sopa', 'ropa', 'suceso', 'lectura', 'librería', 'raro', 'apellido', 'vaso', 'once', 'pie', 'red', 'oficina', 'firma', 'campo']) {
  ck(FALSE_FRIENDS.some(f => f.word === t), `假朋友缺必备词 ${t}`);
}

// 第四轮：时态选择段落填空（indefinido / imperfecto 二选一）
ck(TENSE_CLOZE.length >= 15, `时态填空段落 ${TENSE_CLOZE.length} < 15`);
const tcIds = new Set();
TENSE_CLOZE.forEach((p, pi) => {
  ck(p.id && !tcIds.has(p.id), `时态填空第 ${pi + 1} 段 id 缺失或重复: ${p.id}`);
  tcIds.add(p.id);
  ck(p.title && p.zh && p.text, `${p.id} 缺 title/zh/text`);
  ck(p.blanks.length >= 5 && p.blanks.length <= 8, `${p.id} 空数 ${p.blanks.length} 不在 5–8`);
  const marks = [...p.text.matchAll(/\[\[(\d+)\]\]/g)].map(m => Number(m[1]));
  ck(marks.length === p.blanks.length, `${p.id} 占位标记 ${marks.length} 个 ≠ 空数 ${p.blanks.length}`);
  ck(marks.every((n, i) => n === i), `${p.id} 占位标记序号不是 0..${p.blanks.length - 1} 连续`);
  p.blanks.forEach((b, bi) => {
    ck(Array.isArray(b.options) && b.options.length === 2, `${p.id} 空 ${bi} 选项数异常`);
    ck(b.options[0] !== b.options[1], `${p.id} 空 ${bi} 两个选项相同`);
    ck(b.answer === 0 || b.answer === 1, `${p.id} 空 ${bi} answer 越界`);
    ck(b.tip, `${p.id} 空 ${bi} 缺 tip`);
  });
});

// 第五轮专项数据
ck(SUBJUNCTIVE_QUIZ.length >= 80, `虚拟式题 ${SUBJUNCTIVE_QUIZ.length} < 80`);
const subjKinds = new Set(SUBJUNCTIVE_QUIZ.map(q => q.kind));
ck(subjKinds.has('choice') && subjKinds.has('fill') && subjKinds.has('connector'), '虚拟式题缺二选一、填空或连词题型');
SUBJUNCTIVE_QUIZ.forEach((q, i) => {
  ck(q.q && q.answer !== undefined && q.tip, `虚拟式题 ${i + 1} 字段不全`);
  if (q.kind !== 'fill') ck(Array.isArray(q.options) && q.options.length >= 2, `虚拟式题 ${i + 1} 选项异常`);
});
ck(SHADOWING_SENTENCES.length >= 30 && SHADOWING_SENTENCES.length <= 50, `跟读句 ${SHADOWING_SENTENCES.length} 不在 30–50`);
SHADOWING_SENTENCES.forEach((x, i) => ck(Array.isArray(x) && x.length === 3 && x.every(Boolean), `跟读句 ${i + 1} 结构异常`));

// Round 7: speaking prompts are content, not a placeholder UI. Keep each
// task independently usable and require enough material for repeated practice.
{
  ck(Array.isArray(SPEAKING_TASKS) && SPEAKING_TASKS.length >= 40, `口语任务 ${SPEAKING_TASKS && SPEAKING_TASKS.length} < 40`);
  const ids = new Set();
  const roleplays = (SPEAKING_TASKS || []).filter(t => t.type === 'roleplay');
  const monologues = (SPEAKING_TASKS || []).filter(t => t.type === 'monologue');
  ck(roleplays.length >= 20, `角色扮演 ${roleplays.length} < 20`);
  ck(monologues.length >= 20, `即兴陈述 ${monologues.length} < 20`);
  for (const task of SPEAKING_TASKS || []) {
    ck(task.id && !ids.has(task.id), `口语任务 id 缺失或重复: ${task.id}`); ids.add(task.id);
    ck(['A2', 'B1', 'B2'].includes(task.level), `${task.id} level 异常`);
    ck(task.scenario || task.topic, `${task.id} 缺少场景或话题`);
    ck(typeof task.sampleAnswer === 'string' && task.sampleAnswer.trim().split(/\s+/).length >= 12 && task.sampleAnswer_zh, `${task.id} 缺少可用的中西样例`);
    if (task.type === 'roleplay') ck(Array.isArray(task.requiredElements) && task.requiredElements.length >= 4 && task.requiredElements.every(Boolean), `${task.id} 缺少可检查的角色扮演要点`);
    if (task.type === 'monologue') ck(task.topic_zh && task.prepTime >= 30 && task.targetDuration >= 60 && Array.isArray(task.requiredStructure) && task.requiredStructure.length >= 4 && Array.isArray(task.usefulPhrases) && task.usefulPhrases.length >= 4, `${task.id} 缺少陈述时间、结构或提示语`);
  }
}
ck(LISTENING_LA.length >= 3, `拉美听力材料 ${LISTENING_LA.length} < 3`);
LISTENING_LA.forEach((x, i) => ck(x.id && /^es-(MX|AR|CO)$/.test(x.lang) && x.text && x.zh, `拉美听力 ${i + 1} 结构或语音异常`));
ck(LISTENING_LA.find(x => x.id === 'la-co')?.lang === 'es-CO', '拉美听力 la-co 语音应为 es-CO');
ck(/tenés|sabés|querés|podés|sos\b/.test(LISTENING_LA.find(x => x.id === 'la-ar')?.text || ''), '拉美听力 la-ar 正文缺 voseo 形式');
LISTENING_LA.forEach((x, i) => {
  ck(Array.isArray(x.questions) && x.questions.length >= 2 && x.questions.length <= 3, `拉美听力 ${i + 1} 缺理解题`);
  (x.questions || []).forEach((q, qi) => ck(q.q && Array.isArray(q.options) && q.options.length >= 3 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length && q.tip, `拉美听力 ${i + 1} 第 ${qi + 1} 题结构异常`));
});
ck(STRESS_QUIZ.find(q => q.word === 'también')?.tip.includes('仍是一个二重元音'), 'también 重音说明未修正');
ck(STRESS_QUIZ.find(q => q.word === 'adiós')?.tip.includes('仍是一个二重元音'), 'adiós 重音说明未修正');
ck(SUBJUNCTIVE_QUIZ.some(q => q.tip && q.tip.includes('Me alegra que esté aquí.')), '虚拟式 ella / esté 示例未修正');

// 第九轮文化阅读与法语同源词：避免只有空入口或统一模板的短文。
{
  const requiredPlaces = ['马德里', '加泰罗尼亚', '安达卢西亚', '巴斯克', '加利西亚', '墨西哥', '阿根廷', '哥伦比亚', '秘鲁', '智利', '古巴'];
  ck(Array.isArray(CULTURE_ARTICLES) && CULTURE_ARTICLES.length === requiredPlaces.length, `文化条目 ${CULTURE_ARTICLES && CULTURE_ARTICLES.length} ≠ ${requiredPlaces.length}`);
  const ids = new Set(), texts = new Set();
  for (const article of CULTURE_ARTICLES || []) {
    const words = String(article.text || '').trim().split(/\s+/).filter(Boolean).length;
    ck(article.id && !ids.has(article.id), `文化条目 id 缺失或重复: ${article.id}`); ids.add(article.id);
    ck(requiredPlaces.includes(article.place), `文化地点不在任务书范围: ${article.place}`);
    ck(['A2', 'B1'].includes(article.level), `${article.id} 阅读等级异常`);
    ck(words >= 200 && words <= 300, `${article.id} 正文 ${words} 词，不在 200–300`);
    ck(Array.isArray(article.notes) && article.notes.length >= 5 && article.notes.length <= 8 && article.notes.every(n => n.word && n.zh), `${article.id} 生词注释不在 5–8`);
    const normalized = String(article.text || '').toLowerCase().replace(/[¿?¡!.,;:()"\u201C\u201D]/g, ' ').replace(/\s+/g, ' ').trim();
    ck(!texts.has(normalized), `${article.id} 正文与其他文化条目重复`); texts.add(normalized);
    if (article.level === 'A2') ck(typeof article.translation === 'string' && article.translation.length >= 300, `${article.id} 缺少 A2 中西对照`);
    if (article.level === 'B1') ck(typeof article.summary === 'string' && article.summary.length >= 60, `${article.id} 缺少 B1 中文摘要`);
  }
  ck((CULTURE_ARTICLES || []).filter(a => a.level === 'A2').length === 5, '文化 A2 条目应为 5 篇');
  ck((CULTURE_ARTICLES || []).filter(a => a.level === 'B1').length === 6, '文化 B1 条目应为 6 篇');
  const cognateWords = WORDS.filter(w => typeof w.fr === 'string' && w.fr.length > 1);
  ck(cognateWords.length >= 30, `法语同源词仅 ${cognateWords.length} 条，期望至少 30`);
}

// ---------- 7b. 内容区分度校验（第 5.5 轮新增：拦"同模板换例句"） ----------
// 归一化：去掉 «...» 引号内容、转小写、去标点、压缩空白
const normContent = s => String(s || '').replace(/«[^»]*»/g, ' ').toLowerCase().replace(/[¿?¡!.,;:()"\u201C\u201D]/g, ' ').replace(/\s+/g, ' ').trim();
const listeningEntries = Object.values(LISTENING_ALL);
// 1. 听力正文去重：任意两条归一化后不得相同
{
  const seenText = new Map();
  for (const l of listeningEntries) {
    const n = normContent(l.text);
    if (seenText.has(n)) errors.push(`听力正文重复: ${seenText.get(n)} 与 ${l.id} 归一化后相同`);
    else seenText.set(n, l.id);
  }
}
// 2. 听力题干去重：两条听力之间 q 集合不得完全相同；单条内部 q 不得重复
{
  const seenQ = new Map();
  for (const l of listeningEntries) {
    const qs = (l.questions || []).map(q => normContent(q.q));
    if (new Set(qs).size !== qs.length) errors.push(`${l.id} 听力内部题干重复`);
    const key = [...qs].sort().join('||');
    if (seenQ.has(key)) errors.push(`听力题干集合重复: ${seenQ.get(key)} 与 ${l.id}`);
    else seenQ.set(key, l.id);
  }
}
// 3. 答案分布：全部听力题 answer 任一取值占比不得超过 60%
{
  const dist = {};
  let total = 0;
  for (const l of listeningEntries) for (const q of l.questions || []) { dist[q.answer] = (dist[q.answer] || 0) + 1; total++; }
  for (const [idx, n] of Object.entries(dist)) ck(n / total <= 0.6, `听力答案索引 ${idx} 占比 ${(n / total * 100).toFixed(0)}%（${n}/${total}）超过 60%`);
}
// 4. 选项去重：任意两条听力的 options 数组不得完全相同（逐题比对与整体比对）
{
  const seenOpts = new Map();
  for (const l of listeningEntries) {
    const key = (l.questions || []).map(q => [...q.options].map(normContent).sort().join('|')).sort().join('||');
    if (seenOpts.has(key)) errors.push(`听力选项集合重复: ${seenOpts.get(key)} 与 ${l.id}`);
    else seenOpts.set(key, l.id);
  }
}
// 5. 对话去重与假翻译拦截：两课对话不得逐句相同；zh 不得是占位注释
{
  const seenDlg = new Map();
  const PLACEHOLDER_ZH = /^(提出本课|用目标结构回应|追问原因|说明个人理由|邀请给出建议|用虚拟式提出建议|表示认同|确认下一步)/;
  for (const l of LESSONS) {
    const key = (l.dialog || []).map(d => normContent(d.es)).join('||');
    if (seenDlg.has(key)) errors.push(`对话内容重复: ${seenDlg.get(key)} 与 ${l.id} 逐句相同`);
    else seenDlg.set(key, l.id);
    (l.dialog || []).forEach((d, i) => {
      if (PLACEHOLDER_ZH.test(String(d.zh || ''))) errors.push(`${l.id} 对话第 ${i + 1} 句 zh 是占位注释而非翻译`);
    });
  }
}

console.log(`\nSTATS: 词 ${WORDS.length}（正文 ${LESSONS.reduce((s, l) => s + l.words.length, 0)} / 扩展 ${LESSONS.reduce((s, l) => s + l.extra_words.length, 0)}），课 ${LESSONS.length}，语法 ${GRAMMARS.length}，动词 ${VERBS.length}，字母 ${ALPHABET.length}，音素 ${PHONEMES.length}，规则 ${RULES.length}（核心 ${RULES.filter(r => r.core).length}），测验 ${UNLOCK_QUIZ.length}，重音 ${STRESS_QUIZ.length}，ser/estar ${SER_ESTAR_QUIZ.length}，por/para ${POR_PARA_QUIZ.length}，冠词例外 ${ARTICLE_EXCEPTIONS.length}，假朋友 ${FALSE_FRIENDS.length}，时态填空 ${TENSE_CLOZE.length} 段 / ${TENSE_CLOZE.reduce((s, p) => s + p.blanks.length, 0)} 空`);
console.log(`去重移除 ${dupDropped.length} 条完全重复词条`);
if (dupDropped.length) console.log(dupDropped.map(d => '  - ' + d).join('\n'));
if (warn.length) console.log('\nWARNINGS:\n' + warn.map(w => '  - ' + w).join('\n'));
if (errors.length) { console.error('\nCHECK_FAILED (' + errors.length + '):\n' + errors.map(e => '  ✗ ' + e).join('\n')); process.exit(1); }
console.log('\nALL_CONTENT_CHECKS_PASSED');
console.log('index.html 行数: ' + finalHtml.split('\n').length);
