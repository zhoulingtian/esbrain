// 第 5.5 轮一次性合并脚本：把 .frag/content-*.js 的 24 课听力+对话并入 words-p4.js，
// 替换文件末尾的模板生成块（B1_DIALOGUE_META / makeB1Dialogue / B1_LISTENING_META）。
// 用法：node build/merge-p4-content.js
const fs = require('fs');
const path = require('path');

const BUILD = __dirname;
const FRAG_DIR = path.join(BUILD, '.frag');
const TARGET = path.join(BUILD, 'data', 'words-p4.js');

const fragFiles = fs.readdirSync(FRAG_DIR).filter(f => /^content-.*\.js$/.test(f)).sort();
if (fragFiles.length !== 4) { console.error('期望 4 个 content-*.js 片段，实际 ' + fragFiles.length); process.exit(1); }

const merged = {};
for (const f of fragFiles) {
  const src = fs.readFileSync(path.join(FRAG_DIR, f), 'utf8');
  const sandbox = {};
  new Function('sandbox', src + '\nsandbox.LESSON_CONTENT = LESSON_CONTENT;')(sandbox);
  Object.assign(merged, sandbox.LESSON_CONTENT);
}

const IDS_A = [...Array(12)].map((_, i) => `B1.1-L${String(i + 1).padStart(2, '0')}`);
const IDS_B = [...Array(12)].map((_, i) => `B1.2-L${String(i + 1).padStart(2, '0')}`);
const missing = [...IDS_A, ...IDS_B].filter(id => !merged[id]);
if (missing.length) { console.error('缺课: ' + missing.join(', ')); process.exit(1); }

// 结构自检
for (const id of [...IDS_A, ...IDS_B]) {
  const c = merged[id];
  if (!Array.isArray(c.dialog) || c.dialog.length !== 8) { console.error(id + ' dialog ≠ 8 行'); process.exit(1); }
  c.dialog.forEach((d, i) => {
    if (d.speaker !== (i % 2 === 0 ? 'A' : 'B') || !d.es || !d.zh) { console.error(`${id} dialog 第 ${i + 1} 行结构异常`); process.exit(1); }
  });
  const l = c.listening;
  const wc = String(l.text).trim().split(/\s+/).length;
  if (l.id !== id || wc < 80 || wc > 150) { console.error(`${id} listening id/词数异常（${wc} 词）`); process.exit(1); }
  if (!Array.isArray(l.questions) || l.questions.length < 2 || l.questions.length > 3) { console.error(id + ' 题数异常'); process.exit(1); }
  l.questions.forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length < 3 || !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length || !q.tip) {
      console.error(`${id} 第 ${i + 1} 题结构异常`); process.exit(1);
    }
  });
}
// 答案分布
const dist = {};
let total = 0;
for (const id of [...IDS_A, ...IDS_B]) for (const q of merged[id].listening.questions) { dist[q.answer] = (dist[q.answer] || 0) + 1; total++; }
console.log('答案分布:', JSON.stringify(dist), '总题数', total);
for (const [idx, n] of Object.entries(dist)) if (n / total > 0.6) { console.error(`答案索引 ${idx} 占比超 60%`); process.exit(1); }

const J = o => JSON.stringify(o, null, 2);
const block =
  '// 第 5.5 轮重写：24 课真实对话（zh 为真实翻译，不再用占位注释）\n' +
  'const DIALOGS_P4A = ' + J(Object.fromEntries(IDS_A.map(id => [id, merged[id].dialog]))) + ';\n' +
  'const DIALOGS_P4B = ' + J(Object.fromEntries(IDS_B.map(id => [id, merged[id].dialog]))) + ';\n\n' +
  '// 第 5.5 轮重写：24 条真实听力（具体场景、针对性题目、答案索引分散）\n' +
  'const LISTENING_P4A = ' + J(IDS_A.map(id => merged[id].listening)) + ';\n' +
  'const LISTENING_P4B = ' + J(IDS_B.map(id => merged[id].listening)) + ';';

let src = fs.readFileSync(TARGET, 'utf8');
const startMark = 'const B1_DIALOGUE_META = [';
const endMark = 'const LISTENING_P4B = B1_LISTENING_META.slice(12);';
const start = src.indexOf(startMark);
const end = src.indexOf(endMark);
if (start < 0 || end < 0 || end <= start) { console.error('未找到模板生成块标记'); process.exit(1); }
src = src.slice(0, start) + block + src.slice(end + endMark.length);
fs.writeFileSync(TARGET, src);
console.log('MERGED_OK: words-p4.js 已替换 24 课对话与听力');
