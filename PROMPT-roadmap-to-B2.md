# ESbrain 后续开发总任务书（第 5.5 轮 → 第八轮）

**执行者**：kimi Code CLI
**项目路径**：`D:\esbrain`
**目标**：把 ESbrain 补完为一个零基础学习者能真正学好西语（A1 → B2）的自学工具，不留虚假模块。

---

## 阅读顺序与前提

先读这三个文件建立上下文，再动手：
1. `TASKBOOK.md` —— 已完成一至五轮的记录
2. `esbrain-handoff.md` —— 代码地图（注意：里面写的项目路径 `C:\Users\Administrator\esbrain` 已过期，现在是 `D:\esbrain`）
3. `esbrain-plan.md` —— 原始方案

**工作流铁律（每一轮都适用）**：
- **不要直接编辑根目录 `index.html`**，它是 `build/assemble.js` 的生成物，手改会在下次组装时被覆盖。
- 内容数据改 `build/data/*.js`，UI 与运行时逻辑改 `build/skeleton.html`。
- 每轮改完必须跑，两条都要全绿才算完成：
  ```bash
  cd /d/esbrain
  node build/assemble.js
  node build/smoke.js
  ```
- 新增数据文件必须三处登记：`assemble.js` 的 `dataSrc` 数组、`new Function(...)` 末尾的 `sandbox` 暴露、以及数据区输出（参考 `TENSE_CLOZE` 的写法）。
- 新增 screen 必须四处登记：`SCREENS` 数组、`NAV_MAP`、`SCREEN_TITLES`、`go(screen)` 里的渲染分支。
- 每轮结束 bump `sw.js` 的 `CACHE_NAME`（当前 v8，第 5.5 轮 → v9，第六轮 → v10，依次递增）。
- 每轮结束更新 `TASKBOOK.md` 进度表和 `esbrain-handoff.md`。

**已核实的现状基线（2026-08-02 第三方审核，可直接采信）**：
- 词库 2424 词，课程 60 课（A1.1/A1.2/A2.1/B1.1/B1.2 各 12），语法 g001–g061 共 61 条，动词 60 词 × 11 变位表 × 6 人称 = 3960 格。
- SRS 已是 SM-2 简化版（ease/suspended/365 天上限/hard 当天回队），实现正确，**不要再改**。
- IndexedDB 每周快照（保留 8 份）、复习负载预测、暂缓功能均已到位。
- 动词引擎（`build/data/verbs.js`）质量最高，旧 20 词逐格回归 0 差异，**不要碰**。
- 选项在运行时经 Fisher-Yates `shuffle()` 打乱，答案索引偏置不可利用。
- 语法内容是"规则 + 表格 + 例句 + 常见错误"四段式，质量高，后续新增语法点**必须沿用这个结构和详细程度**。
- 语法与课程的关联方式是 `GRAMMARS.find(g => g.lesson === id)`，靠语法条目里的 `lesson` 字段反向匹配。**这意味着新增语法点可以直接续编号，不需要重排现有的 g001–g061。**

---

# 第 5.5 轮：修复 B1 听力与数据 bug

**这一轮必须先做完，再进第六轮。** 原因见下。

## 任务 1：重写 B1 的 24 课听力（本轮主体）

### 问题诊断

`build/data/words-p4.js` 输出的 `LISTENING_P4A` / `LISTENING_P4B`（组装后为 `LISTENING_ALL`）共 24 条，是**同一模板批量生成的**：

- 24 条正文除了第二三句嵌入的两个本课例句不同，其余部分逐字相同，都是 "En esta actividad, dos personas conversan sobre una situación cotidiana... Al final, deciden revisar la información y volver a hablar más tarde."
- 24 课的两道题**完全一致**，永远是 `¿Qué hace la segunda persona?` 和 `¿Cómo termina la conversación?`，三个选项逐字相同，`answer` 恒为 `0`。
- 后果：学习者做过任意一课后，其余 23 课可以不听就全对——正确选项的文本已经认识了。运行时打乱选项也救不了，因为打乱只改位置不改文本。**这个模块目前零学习效果。**

### 要做的事

重写全部 24 条，每条必须是针对该课语法点和场景的真实材料。

**第一步，先读出每课的实际教学目标，不要凭课程标题猜。** 对 B1.1-L01 到 B1.2-L12 每一课：
- 从 `build/data/grammar.js` 找到该课对应的语法点（B1 是 g038–g061，靠 `lesson` 字段匹配），读它的规则说明和例句；
- 读该课在 `words-p4.js` 里的 13 个核心词（`words` 字段）和 8 行对话（`dialog`）。

听力材料必须建立在这三者之上。

**第二步，按下列规格重写。**

正文（`text`）：
- 长度 80–150 词。
- **必须有具体人物、具体地点、具体事件或冲突**。给人名、给城市、给能问出细节的情节。禁止"两个人讨论了一个日常情况"这类空壳描述。
- 自然包含该课语法点的 3–5 处**真实用例**（虚拟式课就要有多处真实触发场景，不是只在引号里塞两个例句）。
- 复用该课核心词至少 6 个。
- 24 条之间场景不得重复，分散到：工作面试、租房纠纷、就医问诊、机场改签、大学选课、朋友邀约、退换货、公交地铁、家庭聚会、社区活动、新闻讨论、银行开户、办居留、点餐投诉、搬家、看房、健身、旅行计划、志愿活动、网购、修电脑、找工作、图书馆、看演出等不同场景。
- 难度对齐 B1：可以从句和时态混用，但不要出现 B2 才教的结构（虚拟式未完成过去时、条件句第二三型）。

题目（`questions`）：
- 每条 2–3 题。
- **题干必须针对该条正文的具体内容**：问某人做了什么、为什么、结果如何、某个时间或数字是多少。**禁止任何可以套用到别的材料上的通用问法。**
- 至少一题考该课语法点承载的信息（例如虚拟式课问"说话人希望对方做什么"，答案必须从虚拟式从句里取）。
- 三个选项都要是基于正文的合理干扰项：说过但不是问的那件事、部分对但细节错、发音相近的误听。不要用明显荒谬的选项凑数。
- 全部 24 课约 50–70 题的 `answer` 索引要**大致均匀分布在 0/1/2**，任一取值不超过 60%。
- `tip` 指向正文的具体线索（"注意她解释迟到原因的那句"），不要写"听第二句"这种和内容脱钩的提示。

**第三步，数据结构保持不变**：仍是以课程 ID 为键的对象，字段 `id` / `text` / `questions[{q, options, answer, tip}]`。改结构会连带骨架渲染和 smoke 断言一起要动。

**工作量**：24 课，每课约 15 分钟。**如果再次套模板，等于什么都没修。**

## 任务 2：修三处数据 bug

**2.1 哥伦比亚听力语音代码错误。** `build/data/quiz-extra.js` 的 `LISTENING_LA` 第三条 `la-co`，`label` 写"哥伦比亚 · es-MX"、`lang` 也填 `es-MX`，应为 `es-CO`。现状是用墨西哥音读哥伦比亚材料，"三种拉美口音对比"实际只有两种。改成 `es-CO` 后，还要确认朗读逻辑有降级：如果设备没有 es-CO 语音包，要退到其他拉美语音而不是静默失败，并在界面提示"当前设备无该口音，已用 XX 代替"。检查 `pickSpanishVoice` 和听力模块实际调用的朗读路径。

**2.2 阿根廷听力缺 voseo。** 同一数组里 `la-ar` 那条，说明写着"voseo 识别语境"，但正文没有任何 voseo 形式。重写正文，自然包含 3–4 处 voseo（`¿Vos sabés dónde queda?` / `Tenés que llegar temprano` / `Si querés, te acompaño`），并在 `zh` 或新增字段里标注"阿根廷 voseo：vos + 变位（sabés/tenés/querés），对应西班牙的 tú sabes/tienes/quieres"。voseo 只要求被动识别，题目考"听懂说了什么"，不要考"把 tú 改成 vos"。

**2.3 阴阳性异义词处理。** `words-p4.js` 里 `w1428` 的 `orden` 标了 `gender: "f"` 但 `zh` 写"命令；顺序"两义。实际是 `el orden`（顺序/秩序）和 `la orden`（命令）两个不同的词。

推荐做法：拆成两个独立词条，各配对应例句。

然后**全库扫一遍同类词**，把 `gender` 单值但 `zh` 含多义的找出来核对。常见阴阳性异义词：`el/la orden`、`el/la mañana`（早晨 vs 明天）、`el/la capital`（资本 vs 首都）、`el/la cura`（神父 vs 治疗）、`el/la guía`（导游 vs 指南）、`el/la papa`（教皇 vs 土豆）、`el/la policía`（警员 vs 警方）、`el/la radio`（收音机 vs 广播电台）。发现的一并按同一方案处理。

## 任务 3：补校验盲区

现有 smoke 77 条断言全绿、assemble 400+ 行校验，但**只验数量和字段存在，不验内容区分度**——任务 1 那个模板问题就是这么漏过去的（`if (!l.listening) throw` 只检查字段在不在）。

在 `build/assemble.js` 内容校验区新增（失败 `process.exit(1)`）：

1. **正文去重**：每条听力 `text` 剔除 `«...»` 引号内容后归一化比对，任意两条相同则报错。这条专门拦"同模板换例句"。
2. **题干去重**：任意两条听力的 `questions[].q` 集合不得完全相同；单条内部两题的 `q` 也不得相同。
3. **答案分布**：全部听力题的 `answer` 索引，任一取值占比不得超过 60%。
4. **选项去重**：任意两条听力的 `options` 数组不得完全相同。

这四条不只管听力，后续所有内容型模块（对话、例句、题库）都要能复用同样的思路。在 `build/smoke.js` 补至少 2 条对应断言。

**顺带**：TASKBOOK 第一轮备注提到"smoke 两条旧断言（SRS 阶梯、localStorage 单 key）与新设计不符，待后续更新"，本轮一并修掉，别再挂着。

## 第 5.5 轮验收

- assemble 输出 `SYNTAX_OK` + `ALL_CONTENT_CHECKS_PASSED`，4 条新校验全过。
- smoke 全绿，条数从 77 增加。
- 人工抽查任意 3 课 B1 听力：场景各不相同、题目针对具体内容、**不看正文答不出来**。
- `LISTENING_LA` 三条 `lang` 分别为 `es-MX` / `es-AR` / `es-CO`，阿根廷条含 voseo。
- 阴阳性异义词处理一致，冠词测验不出现自相矛盾的题。
- `sw.js` bump 到 v9。

---

# 第六轮：补 A2.2（填补级别断层）

## 为什么要补

现在级别序列是 A1.1 → A1.2 → A2.1 → **B1.1**，A2.2 整个缺失。对零基础自学者这是个真实的坎：A2.1 结束时刚学完两个过去时和宾语代词，B1.1 第一课直接上虚拟式 WEIRDO，中间缺了表达观点、书面沟通、条件式入门这一层过渡。补上之后课程数 60 → 72。

## 内容规格

新建 `build/data/words-p6.js`（**注意**：现有文件已用到 `words-p4.js`，且 stage 编号 P1–P5 已占用，A2.2 用 **stage P3B**，插在 P3 和 P4 之间；如果骨架的阶段排序逻辑不支持这种命名，就改成把 A2.2 设为 P4、B1.1 顺延为 P5、B1.2 为 P6，但那样要同步改 `LESSON_TABLE`、`STAGES`、smoke 里所有 `stage === 'P4'/'P5'` 的断言，工作量更大，优先试 P3B）。

输出：`WORDS_P6`、`DIALOGS_P6`、`LISTENING_P6`。

**12 课大纲**（`LESSON_TABLE` 里的标题按此填）：

| 课 | 标题 | 语法点 |
|---|---|---|
| A2.2-L01 | 表达观点：赞同与反对 | creo que / me parece que / estoy de acuerdo（陈述式）与 no creo que（虚拟式预告） |
| A2.2-L02 | 表达情感与愿望 | me alegra / me molesta / espero + 不定式 vs + que |
| A2.2-L03 | 写信与电子邮件 | 正式与非正式称呼语、结尾套语、usted 与 tú 的书面选择 |
| A2.2-L04 | 烹饪与食谱 | 非人称 se（se añade, se cocina）、命令式复习、量词表达 |
| A2.2-L05 | 搬家与住房 | 位置前置词（encima de / al lado de / enfrente de）、hay vs está 辨析 |
| A2.2-L06 | 银行与钱 | 数字大额表达、条件式礼貌用法（quisiera / me gustaría）入门 |
| A2.2-L07 | 行政手续（证件、保险） | tener que / deber / hay que 的义务表达差异、被动 se |
| A2.2-L08 | 旅行中的意外 | 意外的 se（se me olvidó / se me perdió）、过去时叙事复习 |
| A2.2-L09 | 电影与娱乐 | 定语从句复习 + lo que、感受动词（parecer / encantar）扩展 |
| A2.2-L10 | 西语世界的节日 | 时间从句（cuando + 陈述式表习惯）、频率副词 |
| A2.2-L11 | 假设与愿望（条件式） | 条件式现在时完整讲解 + si + presente → futuro 第一类条件句 |
| A2.2-L12 | A2 总复习 | 全阶段综合，含两个过去时、代词、命令式的混合练习 |

每课要求：
- 核心词 12–14 个（`words`），扩展词 18–26 个（`extra_words`），与 B1 各课的量级一致。
- 对话 8 行（`dialog`），中西对照。
- 听力 1 条（`LISTENING_P6`），规格**完全按第 5.5 轮任务 1 的标准**：具体人物场景、针对性题目、答案索引分散。不要重演模板问题。
- 语法点新增 12 条，编号 **g062–g073**（因为 `GRAMMARS.find(g => g.lesson === id)` 靠 `lesson` 字段匹配，续编号不影响现有 g038–g061 的 B1 关联）。每条必须沿用现有四段式结构：`<p><b>规则：</b>...</p>` + 变位/对照表格 + `<p><b>例句：</b></p><ul>` 中西对照 + 结尾"常见错误"段，并且**要点出中文母语者的典型错误**（现有 g001–g061 都做到了这一点，保持水准）。
- 新词补 `stress` 字段（多音节词必须有，1=倒数第一音节，2=倒数第二，3=倒数第三）、地区异称补 `variant`/`altWord`。
- 词汇量：2424 → 约 2800（A2.2 新增约 380 词）。

## 校验扩展

`assemble.js` 加：A2.2 课数 = 12；每课核心 12–14、扩展 18–26、对话 8 行、听力非空；语法 g062–g073 齐全且各自 `lesson` 字段能匹配到课程；词库 ≥2800。smoke 补 `go('lessons')` 后 A2.2 十二课可见、课程列表阶段顺序正确（A2.1 之后是 A2.2 再到 B1.1）。

bump `sw.js` → v10。

---

# 第七轮：B2 内容与口语产出

## 词汇与课程

词汇 2800 → 3800（B2 下限，新增约 1000 词）。新建 `build/data/words-p7.js`，输出 `WORDS_P7A`/`WORDS_P7B`、`DIALOGS_P7A`/`DIALOGS_P7B`、`LISTENING_P7A`/`LISTENING_P7B`。

新增 B2.1 / B2.2 各 12 课（stage P6 / P7，或按第六轮实际采用的编号顺延），共 24 课。课程总数 72 → 96。

**词表来源**：以 DELE B2 官方分级词表或 *Vocabulario en uso B2*（Edelsa）为准。**不要从通用词典批量抓取**——那样会混进大量该级别用不到的生僻词，稀释复习效率。B2 的词应该是"论述和正式表达里真实高频"的词：抽象名词、论证连接词、语体标记词、社会议题词汇。

**B2.1 十二课大纲**：虚拟式未完成过去时（形态与 -ra/-se 两形）、条件句第二类（si + subj imp → condicional）、条件句第三类（si + pluscuamperfecto subj → condicional compuesto）、虚拟式完成时体系（haya hecho / hubiera hecho）、间接引语的时态后移、被动语态与 ser/estar + participio、分词与副动词的独立结构、名词化与抽象表达、让步结构（aunque + 陈述式 vs 虚拟式的语义差异）、原因与结果的多种连接方式、论述文结构（提出立场 → 限定范围 → 承认反方 → 推出结论）、B2.1 复习。

**B2.2 十二课大纲**：语体差异（书面 vs 口语、正式 vs 非正式）、西班牙与拉美的表达分歧（词汇、时态偏好、vosotros/ustedes）、习语与固定搭配、委婉与含蓄表达、报刊语言与新闻体、正式信函与投诉信、图表描述与数据评论、辩论中的反驳技巧、口语填充与话轮转换（bueno, o sea, es decir, en fin）、幽默与讽刺的识别、文学片段阅读入门、B2 总复习。

每课规格同前：核心 12–14、扩展 18–26、对话 8 行、听力 1 条（严格按第 5.5 轮标准）。语法新增 24 条，编号 g074–g097，四段式结构。

## 动词表补全

`build/data/verbs.js` 现有 11 个变位表，B2 会用到但缺以下几项，请补：

- `futuro_perfecto`（将来完成时：habré hablado）
- `condicional_perfecto`（条件式完成时：habría hablado）
- `subj_perfecto`（虚拟式现在完成时：haya hablado）
- `subj_pluscuamperfecto`（虚拟式愈过去时：hubiera/hubiese hablado）
- `subj_imp` 现在只有 `-ra` 形（fuera/fueras），补并列的 `-se` 形（fuese/fueses）——正式书面语和文学里会遇到，B2 阅读必需。可以在同一格里给两形，用 `/` 分隔，或新增 `subj_imp_se` 字段（后者更利于变位填空测验判分，推荐）。

补完是 60 词 × 15–16 个变位表。**这是唯一允许改 verbs.js 的地方**，规则表与例外覆盖结构不要动，旧 20 词的回归 fixture（`build/verbs-legacy-fixture.js`）必须继续 0 差异。

动词实验室的时态分组标签页要把新时态归入合适的组（建议新增"完成时体系"和"虚拟式"两组，或扩充现有分组）。变位填空测验（`conj`）的 `TENSES` 池要包含新时态。

## 口语任务模块（新）

新建 `screen-speaking`，数据放 `build/data/speaking.js`，输出 `SPEAKING_TASKS`。

两类任务，共 ≥40 条：

**角色扮演（A2–B1 难度，≥20 条）**：给定场景和角色，学习者录音应答。
```javascript
{
  id: "sp-rp-001",
  level: "B1",
  type: "roleplay",
  scenario: "你在马德里租的公寓热水器坏了三天，房东一直不回消息。你打电话给他，说明问题、表达不满、要求本周内解决。",
  requiredElements: ["calentador", "no funciona", "tres días", "esta semana"],
  sampleAnswer: "Buenos días, le llamo porque el calentador no funciona desde hace tres días...",
  sampleAnswer_zh: "早上好，我打电话是因为热水器三天前就坏了……"
}
```

**即兴陈述（B1–B2 难度，≥20 条）**：给话题，准备 60 秒，陈述 120 秒。
```javascript
{
  id: "sp-mono-001",
  level: "B2",
  topic: "¿Cree que el teletrabajo mejora la calidad de vida?",
  topic_zh: "你认为远程办公改善了生活质量吗？",
  prepTime: 60,
  targetDuration: 120,
  requiredStructure: ["postura", "argumento1", "argumento2", "concesión", "conclusión"],
  usefulPhrases: ["desde mi punto de vista", "por un lado... por otro lado", "si bien es cierto que", "en definitiva"],
  sampleAnswer: "...",
  sampleAnswer_zh: "..."
}
```

界面与判分：
- 准备阶段倒计时，陈述阶段计时器，到点提示但不强制打断。
- 优先用 `SpeechRecognition`（`lang` 跟随 `state.settings.variant`，es-ES 或 es-MX）识别成文本；不支持时降级 `MediaRecorder` 录音回放（复用第五轮跟读模块已有的降级逻辑，不要重写）。
- **自动可查的**：时长是否达标、`requiredElements` / `requiredStructure` 关键词是否出现、词汇重复率（同一实词重复超过 4 次给提示）。
- **不要假装能自动评分语法和地道度**——识别文本后展示"你说的内容"与 `sampleAnswer` 对照，让学习者自己比对，并明确告知这是自查而非评分。这一点很重要：给一个假的分数比不给分更有害。

工具箱加入口，`SCREENS` / `NAV_MAP` / `SCREEN_TITLES` / `go()` 四处登记。

bump `sw.js` → v11。

---

# 第八轮：学习路径与辅助（收尾）

## 学习计划向导（对零基础最关键的一项）

新建首次启动向导（也可从设置手动重启），三问：
1. 目标级别？A1 / A2 / B1 / B2
2. 每天可用时间？15 / 30 / 60 分钟
3. 偏好？均衡 / 偏词汇 / 偏语法 / 偏听说

根据回答在首页生成**每日任务清单**，例如 30 分钟均衡：
```
今日任务（约 30 分钟）
□ 学习 A1.1-L03（10 分钟）
□ 复习到期词 12 个（8 分钟）
□ 语法练习 g003（5 分钟）
□ 听力 A1.1-L02（4 分钟）
□ 重音训练 10 题（3 分钟）
```

要求：
- 任务量根据实际到期复习数动态调整，不要给固定假数字。
- 每周日按上周完成率重算下周计划：完成率低于 60% 时自动减量并提示"上周有欠账，本周先补齐"，高于 90% 时可提议加量。
- 计划只是建议，任何模块都不能被锁住——学习者想跳着学必须允许。

## 错题本分级与周报

错题分三类存储与展示：词汇、语法/专项（含 ser/estar、por/para、虚拟式、变位、重音）、听力。每类可单独进入定向复习。

每周日生成薄弱点报告：本周新错的词与语法点、各专项正确率、以及**具体的下一步建议**（"虚拟式否定判断类错误率 62%，建议重做 g038 的练习"）。报告要引用真实统计，不要写泛泛的鼓励语。

## GitHub Gist 云备份

设置页加 token + gist id 输入，`lastSync` 时间戳做冲突检测：本地与云端的 `lastSync` 分叉时弹出对比界面（两边的词汇量、打卡天数、最后学习日期），让用户选择保留哪份或手动合并，**不要静默覆盖**。

IndexedDB 本地快照保持不变，Gist 是额外的一层，不是替代。

## 可选模块（按剩余精力做）

**文化模块**（`screen-culture`）：西班牙各自治区（马德里、加泰罗尼亚、安达卢西亚、巴斯克、加利西亚）+ 拉美主要国家（墨西哥、阿根廷、哥伦比亚、秘鲁、智利、古巴），每篇 200–300 词，A2 及以下中西对照、B1 以上西语原文加中文摘要，配 5–8 个生词注释。

**法语对照开关**：词条加可选 `fr` 字段存法语同源词，设置里开关控制显示，**默认关闭**。这是给有法语基础的用户加速用的（西法同源词覆盖率极高），关闭时对其他用户完全不可见。开启时另外显示三到五条"法语学习者专属发音陷阱"提示：法语小舌音会污染西语 `r`、法语鼻化元音会让 `-an/-on` 读错、法语词尾辅音不发音的习惯会吃掉西语的 `-s` 和 `-n`（而西语词尾 s 承载复数和第二人称，吃掉就是语法错误）。

bump `sw.js` → v12。

---

## 贯穿所有轮次的内容质量红线

这几条是审核第五轮时发现问题的根源，请当作硬约束：

1. **禁止模板批量生成内容型数据**。听力、对话、例句、题干、选项都算。assemble 的去重校验会拦，但更重要的是不要试图绕过它——生成前先问自己"如果学习者做完第一条，第二条还有信息量吗"。
2. **题目必须针对具体材料**。任何能套用到别的材料上的问法都是无效题。
3. **答案索引要分散**。虽然运行时会打乱选项，但数据层的均匀分布是内容质量的体检指标：如果 90% 答案在索引 0，通常说明是模板生成的。
4. **不要假装自动评分**。发音、口语、写作的自动评估只做能客观查的部分（关键词、时长、重复率），主观质量交给学习者对照参考答案自查，并明确告知这是自查。
5. **语法讲解必须点出中文母语者的典型错误**。现有 g001–g061 都做到了（例如 g001 点出 ×Soy un piloto、g004 点出 ×quieremos），新增的必须保持这个水准。
6. **数量达标不等于质量达标**。每轮自检时人工抽查 3 条新内容，问自己"这条如果给一个真的零基础学生，他能学到东西吗"。

## 每轮完成后的自检清单

```bash
cd /d/esbrain
node build/assemble.js   # 必须 SYNTAX_OK + ALL_CONTENT_CHECKS_PASSED
node build/smoke.js      # 必须 0 failed
```

然后：
- [ ] 人工抽查 3 条本轮新增内容，确认有真实区分度
- [ ] `sw.js` 的 `CACHE_NAME` 已 bump
- [ ] `TASKBOOK.md` 进度表已更新（写清做了什么、数据量变化）
- [ ] `esbrain-handoff.md` 已同步（轮次表、数据文件清单、screen 列表、状态结构；项目路径写 `D:\esbrain`）
- [ ] git 提交，commit message 写明轮次和主要变更

## 不要做的事

- 不要改 SRS 算法（已是正确的 SM-2 简化版）。
- 不要动 `verbs.js` 的规则表与例外结构，只在第七轮按指定方式补新时态，且旧 20 词回归必须继续 0 差异。
- 不要为了让新校验通过而删减内容条目。
- 不要改 `LISTENING_ALL` 的数据结构。
- 不要跨轮次合并施工——一轮做完验证通过再进下一轮，改动范围可控才好定位问题。
