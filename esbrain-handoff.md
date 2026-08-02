# ESbrain 项目 Handoff 文档

**生成时间**:2026-08-03
**当前代理**:Codex
**接手对象**:Codex(或下一个代理)
**项目路径**: `D:\esbrain`
**方案依据**: `C:\Users\Administrator\Desktop\esbrain-plan.md`(Claude 方案)

---

## 1. 项目是什么

ESbrain 是一个单文件 PWA 西语自学工具,目标是从零基础覆盖到 B2。所有前端逻辑、样式、数据全部打包在根目录的 `index.html` 中(当前 ~32580 行)。源码工作流是:

- **不要直接编辑根目录 `index.html`**,它是生成物。
- UI / 运行时代码在 `build/skeleton.html`。
- 内容数据在 `build/data/*.js`。
- 组装脚本 `build/assemble.js` 把骨架和数据合并成根 `index.html`。
- 每次改动后必须跑:
  ```bash
  cd /d/esbrain
  node build/assemble.js
  node build/smoke.js
  ```
- Service Worker 缓存在 `sw.js` 中,每轮大更新应 bump `CACHE_NAME` 版本号。

---

## 2. 已完成的轮次(1–4 轮)

### 2026-08-03 更新：第六轮 A2.2

- 新增 `build/data/words-p6.js`：A2.2-L01 至 A2.2-L12 的课程词汇、8 行中西对照对话和具体场景听力；组装后每课有 12–13 个核心词、18–21 个扩展词。
- 新增 `build/data/a22-grammar.js`：g062–g073；每条都含规则、对照表、例句和面向中文母语者的常见错误。`P3B A2.2 独立表达` 已插入 `P3 A2.1` 与 `P4 B1.1` 之间。
- `assemble.js` 已注册新数据并校验 2800 词、72 课、73 语法、A2.2 顺序/课程规模/听力/四段式语法；`smoke.js` 覆盖课程顺序和 A2.2 学习流。
- 最新验证：`node build/assemble.js` 为 `SYNTAX_OK` 和 `ALL_CONTENT_CHECKS_PASSED`；`node build/smoke.js` 为 `82 passed, 0 failed`。缓存版本为 `v10`。

### 2026-08-03 更新：第 5.5 轮

- `build/data/b1-authentic.js` 现为 B1 课程对话与听力的唯一有效来源；`words-p4.js` 中的旧批量模板保留为 `*_LEGACY`，不再接入运行时。
- 24 条 B1 听力均含具体人物、地点和事件；每条有 8 行中西对照对话、2 条材料相关理解题。构建器会检查听力正文、题干集合、选项集合去重和答案索引分布。
- 拉美听力保留 `es-MX` / `es-AR` / `es-CO`，其中阿根廷文本明确说明 voseo。区域语音缺失时界面显示实际使用的拉美替代语音。
- 最新验证：`node build/assemble.js` 为 `SYNTAX_OK` 和 `ALL_CONTENT_CHECKS_PASSED`；`node build/smoke.js` 为 `81 passed, 0 failed`。缓存版本为 `v9`。

| 轮次 | 状态 | 关键交付 | 验证 |
|------|------|---------|------|
| 一 地基 | 已完成 | SRS 改 SM-2 简化版(ease/suspended/365 天上限);IndexedDB 每周快照(保留 8 份,设置页可恢复/导出);地区变体 es-ES/es-LA 接 TTS | assemble + smoke 全过,sw v2 |
| 二 专属模块(一) | 已完成 | 重音训练 76 词(新 screen-stress);ser/estar 66 题、por/para 59 题、假朋友 31 条(新 screen-falsefriends);冠词测验改例外专项 40 词;发音规则收敛为 8 核心 + 7 细节折叠 | assemble + smoke 全过,sw v3 |
| 三 动词系统 | 已完成 | 变位引擎(data/verbs.js,规则表 + 例外覆盖);60 词 × 14 时态;旧 20 词经 verbs-legacy-fixture.js 逐格回归;动词实验室时态分组标签页;es-LA 隐藏 vosotros;变位填空测验 conj;不规则过去时池;词干变化三组练习 | assemble + smoke 61 条全过,sw v4 |
| 四 A1-A2 | 已完成 | 词库 1328 词(去重后);A1.1/A1.2/A2.1 共 36 课;时态选择段落填空 16 段/122 空(新 screen-cloze);新词补 stress/variant/altWord 字段 | assemble + smoke 69 条全过,sw v6 |
| 六 A2.2 过渡层 | 已完成 | 新增 A2.2 十二课与 g062–g073；P3B 插在 A2.1 与 B1.1 之间；每课有词汇、对话和具体场景听力 | 2800 词、72 课、73 语法；assemble 全绿，smoke 82 passed / 0 failed，sw v10 |

**最近一次验证结果**(2026-08-03):
- `node build/assemble.js`: SYNTAX_OK, ALL_CONTENT_CHECKS_PASSED
- `node build/smoke.js`: 82 passed, 0 failed
- 词库 2800, 课 72, 语法 73, 动词 60, 时态填空 16 段

---

## 3. 当前代码地图

### 3.1 数据文件(build/data/)

| 文件 | 内容 | 备注 |
|------|------|------|
| `core.js` | 阶段配置 STAGES、字母表 ALPHABET、音素 PHONEMES、发音规则 RULES、解锁测验 UNLOCK_QUIZ | 阶段为 P0/P1/P2/P3/P3B/P4/P5，P3B 是 A2.2 |
| `words-p1a.js` | A1.1 L01-L06 词库 + 对话 | 原始 184 条 |
| `words-p1b.js` | A1.1 L07-L12 词库 + 对话 | 原始 184 条 |
| `words-p2a.js` | A1.2 L01-L06 词库 + 对话 | 原始 184 条 |
| `words-p2b.js` | A1.2 L07-L12 词库 + 对话 | 原始 185 条 |
| `words-p3.js` | A2.1 L01-L12 词库 + A1 补词 + 对话 | 新建 |
| `grammar.js` | 语法点 g001-g037 | A1.1/A1.2/A2.1 全部 |
| `a22-grammar.js` | 语法点 g062-g073 | A2.2 十二课的四段式讲解 |
| `words-p6.js` | A2.2 十二课词汇、对话与听力 | 输出 WORDS_P6、DIALOGS_P6、LISTENING_P6 |
| `verbs.js` | 60 动词 × 14 时态变位引擎 + 例外覆盖 | 构建时展开成全量表 |
| `quiz-extra.js` | 重音/STRESS_QUIZ、ser/estar、por/para、冠词例外、假朋友、时态填空 TENSE_CLOZE | 模块数据 |
| `verbs-legacy-fixture.js` | 旧 20 词 × 5 时态全量表 | 仅作迁移回归 |

### 3.2 骨架文件(build/skeleton.html)

主要 screen 与对应 JS 函数:

| Screen | 入口/渲染函数 | 说明 |
|--------|--------------|------|
| `screen-home` | `go('home')`, `renderHome()` | 首页、每日目标、学习统计 |
| `screen-phonetics` | `go('phonetics')`, `renderPhonetics()` | P0 发音、8 核心规则 |
| `screen-lessons` | `go('lessons')`, `renderLessons()` | 课程列表,阶段分组 |
| `screen-learn` | `openLesson(id)`, `renderLearn()` | 学习流程:词卡 → 语法 → 对话 → 小测 |
| `screen-review` | `go('review')`, `renderReview()` | SRS 复习卡片,已改 SM-2 |
| `screen-quiz` | `go('quiz')`, `startQuiz(type)` | 测验中心 |
| `screen-tools` | `go('tools')`, `renderTools()` | 工具箱入口 |
| `screen-stress` | `go('stress')`, `renderStress()` | 重音训练 |
| `screen-falsefriends` | `go('falsefriends')` | 假朋友 |
| `screen-verbs` | `go('verbs')`, `renderVerbs()` | 动词实验室 |
| `screen-preterite` | `go('preterite')`, `renderPreterite()` | 不规则过去时练习 |
| `screen-stemchange` | `go('stemchange')`, `renderStemChange()` | 词干变化练习 |
| `screen-cloze` | `go('cloze')`, `startCloze(id)` | 时态选择段落填空 |
| `screen-settings` | `go('settings')`, `applyTheme()` 等 | 设置,含地区变体、快照 |

测验题型注册在 `buildQuestions(type, pool)` 附近,现有类型:`lesson`, `es2zh`, `zh2es`, `listen`, `article`, `serestar`, `porpara`, `ff`, `conj`。

### 3.3 状态结构(`state`)

```js
{
  onboarding: false,
  progress: { completed: [], p0Passed: false },
  reviews: [{ wordId, due, interval, reps, lastReview, ease, suspended }],
  reviewLog: [{ date, wordId, level }],
  mistakes: [{ wordId, count, lastAt }],
  mistakeLog: [{ date, wordId }],
  settings: { dailyGoal, voiceRate, theme, variant },
  checkins: {},
  streak: { current, lastDate, makeupUsed, makeupDates }
}
```

---

## 4. 下一轮(第五轮:B1 内容)—— 待完成

### 4.1 目标

按 Claude 方案第五轮:
- 词汇 1328 → 2400(新增约 1100 词)
- 新增 B1 课程 24 课(建议 B1.1-L01~L12, B1.2-L01~L12)
- 虚拟式现在时完整模块(WEIRDO 触发场景 + 练习)
- 发音跟读模块(SpeechRecognition `lang='es-ES'`, 不支持时降级 MediaRecorder 录音回放)
- 成段听力加入拉美口音材料(可用 TTS + 变体切换实现)

### 4.2 建议课程/语法大纲(g038 起)

1. 虚拟式现在时入门(WEIRDO)
2. 虚拟式用于不确定/未发生的事
3. 虚拟式与将来时间(cuando/después de que/tan pronto como)
4. 目的与让步(para que / aunque / a menos que / con tal de que)
5. 条件式现在时(礼貌请求与假设结论)
6. 条件句第一型(si + presente → futuro)
7. 复合时态辨析(perfecto vs pluscuamperfecto)
8. se 的被动/非人称/意外用法
9. 关系从句进阶(cuyo / el que / lo que)
10. 间接引语入门
11. 连接词与论述结构
12. B1 上半复习
13. 虚拟式与情感/评价(ojalá / quizá / es una lástima)
14. 虚拟式在比较与否定中
15. 动名词副句(al + inf, gerundio)
16. 前置词 + infinitivo
17. 代词 se 进阶(自复利益)
18. 名词化(lo + adj, el + adj)
19. 动词短语(darse cuenta, acabar de, dejar de, volver a)
20. 描述图表与趋势
21. 社会话题词汇
22. 表达观点与辩论
23. 语体差异识别
24. B1 总复习 + B2 预览

### 4.3 数据文件建议

新建 `build/data/words-p4.js`,输出:
- `WORDS_P4A`:B1.1 课程词条
- `WORDS_P4B`:B1.2 课程词条
- `DIALOGS_P4A` / `DIALOGS_P4B`:每课 8 行对话
- `LISTENING_P4A` / `LISTENING_P4B`:每课听力原文 + 2-3 道理解题(本轮无预生成音频,用 TTS 朗读)

在 `assemble.js` 中注册并扩展校验:
- 词库 ≥2400
- B1 课程 24
- 每课核心 12-14、扩展 18-26、对话 8
- listening 结构 `{ text, questions:[{q, options, answer, tip}] }`
- 新词 id 续编连续,多音节新词带 `stress`,地区异称带 `variant`/`altWord`

### 4.4 虚拟式模块

建议做法:在 `quiz-extra.js` 新增 `SUBJUNCTIVE_QUIZ`,题型 ≥80 题:
- 二选一"陈述式 / 虚拟式"
- 软键盘填空:给动词,填虚拟式现在时
- 连词选择(para que / aunque / cuando)

在骨架中新增 `screen-subjunctive` 或注册为 quiz 题型 `subjunctive`(参考 `serestar`/`porpara`/`conj` 的数据驱动方式),工具箱加入口。

### 4.5 发音跟读模块

骨架中新增 `screen-shadowing`:
- 显示一句原文 + 中文提示。
- "开始录音"按钮调用 `SpeechRecognition`(`lang='es-ES'` 或按变体 `es-MX`)。
- 如果浏览器不支持,降级为 `MediaRecorder` 录制音频并本地回放(不识别,只对比)。
- 可挑选 30-50 句覆盖 seseo/ceceo、rr、重音、虚拟式等难点。
- 工具箱加入口。

### 4.6 拉美口音听力

可复用 `settings.variant`:听力练习中主动切到 `es-MX`/`es-AR` TTS 朗读几段短文,与西班牙口音形成对比。数据可放在 `quiz-extra.js` 的 `LISTENING_LA`。

---

## 5. 后续轮次（第七轮及之后）

### 第七轮:B2 内容与产出
- 词汇 2400 → 3800
- B2 课程 24 课
- 虚拟式未完成过去时 + 条件句三型
- 口语任务模块(角色扮演提示卡 + 两分钟即兴陈述计时器)
- 语体差异对照(书面/口语、西班牙/拉美)

### 第七轮:辅助与增强
- GitHub Gist 云备份(token + gist id, lastSync 冲突检测)
- 学习计划向导(目标级别 + 每日时间 → 每日任务,周日按完成情况调整)
- 错题本分类与周报增强
- 可选文化模块(西班牙各自治区 + 拉美主要国家)
- 可选"法语对照"开关(词条加 `fr` 字段,默认关闭)

---

## 6. 常见陷阱/约定

1. **不要直接改 `index.html`**。改完数据/骨架后必须跑 `node build/assemble.js`。
2. 新增 screen 必须同时更新:
   - `SCREENS` 数组
   - `NAV_MAP`(归入合适的导航项,通常是 `'tools'`)
   - `SCREEN_TITLES`
   - `go(screen)` 函数中的 `if (screen === 'xxx') renderXxx()`
3. 新增数据文件必须:
   - 在 `assemble.js` 的 `dataSrc` 数组中注册
   - 在 `assemble.js` 的 `new Function(...)` 末尾暴露到 `sandbox`
   - 在生成的数据区中输出(参考 TENSE_CLOZE 写法)
4. 任何新数据都要在 `assemble.js` 内容校验区加检查,并在 `smoke.js` 补至少一条端到端断言。
5. `sw.js` 的 `CACHE_NAME` 每轮大更新应 bump(当前 v6)。
6. 词条内容去重规则:`${word}|${pos}|${zh}` 完全相同的会被 assemble 丢弃,注意避免同词目同词性同释义重复。
7. 多音节新词必须加 `stress` 字段(1=倒数第一,2=倒数第二,3=倒数第三)。
8. 变位引擎在 `build/data/verbs.js`,新加动词要符合其规则/例外结构;不确定的动词存全量覆盖表,不要依赖规则生成。

---

## 7. 当前 git 状态(未提交)

项目有 git 仓库。截至本文档生成,所有改动都在工作区,未提交、未推送。接手后建议先:

```bash
cd /c/Users/Administrator/esbrain
git status
git diff --stat
```

---

## 8. 立即验证命令

```bash
cd /c/Users/Administrator/esbrain
node build/assemble.js
node build/smoke.js
```

期望:assemble 全绿,smoke 69 passed / 0 failed。

---

## 9. 联系人/上下文

- 用户:Administrator
- 方案文档:`C:\Users\Administrator\Desktop\esbrain-plan.md`
- 任务书:`C:\Users\Administrator\esbrain\TASKBOOK.md`(每完成一轮更新进度表)
- 本 handoff:`C:\Users\Administrator\Desktop\esbrain-handoff.md`
