# ESbrain 第 5.5 轮修复任务

**背景**：ESbrain 已完成第一至五轮（词库 2424、60 课、动词 60×11 时态、各专项模块）。第三方审核发现 B1 听力模块存在结构性缺陷，另有 3 处数据 bug 和 1 处校验盲区。本轮为修复轮，**必须在进入第六轮（B2 内容）之前完成**。

**项目路径**：`D:\esbrain`（注意：`esbrain-handoff.md` 里写的 `C:\Users\Administrator\esbrain` 是旧路径，已迁移）

**工作流铁律**：
- 不要直接编辑根目录 `index.html`，它是 `build/assemble.js` 的生成物。
- 内容改 `build/data/*.js`，UI/运行时改 `build/skeleton.html`。
- 每次改完必须跑：
  ```bash
  cd /d/esbrain
  node build/assemble.js
  node build/smoke.js
  ```
- 本轮结束 bump `sw.js` 的 `CACHE_NAME` 到 v9。

---

## 任务一（最重要）：重写 B1 的 24 课听力内容

### 问题诊断

`build/data/words-p4.js` 里输出的 `LISTENING_P4A` / `LISTENING_P4B`（组装后成为 `index.html` 的 `LISTENING_ALL`，行 46601 起）共 24 条，是**同一个模板批量生成的**，具体表现：

1. **正文高度重复**。24 条的 `text` 除了第二、三句中嵌入的两个本课例句不同，其余部分逐字相同，都是：
   > "En esta actividad, dos personas conversan sobre una situación cotidiana. Una de ellas dice: «...». La otra responde: «...». Después hablan de sus planes, explican sus razones y escuchan con atención la opinión de la otra persona. No siempre están completamente de acuerdo, pero intentan encontrar una solución práctica. Al final, deciden revisar la información y volver a hablar más tarde. El diálogo muestra cómo usar las expresiones de la lección en un contexto natural y respetuoso."

2. **题目 24 课完全一致**。两道题永远是 `¿Qué hace la segunda persona?` 和 `¿Cómo termina la conversación?`，三个选项逐字相同，`answer` 永远是 `0`。

3. **后果**：学习者做过任意一课后，其余 23 课可以不听就全对——因为正确选项的文本（"Responde a la primera persona" / "Deciden revisar la información"）已经认识了。选项虽然在运行时被 `shuffle()` 打乱，但打乱只改变位置，不改变正确选项的文本，所以救不了。**这个模块目前不产生任何学习效果。**

### 要做的事

重写全部 24 条听力，每条必须是**针对该课语法点和场景的真实材料**。

**第一步：先读出每课的实际教学目标。** 不要凭课程标题猜。对 B1.1-L01 到 B1.2-L12 每一课，从 `build/data/grammar.js` 里找到该课 `grammar_id` 对应的语法点（g038–g061），读它的规则说明和例句；同时读该课在 `words-p4.js` 里的核心词（`words` 字段，13 个）和对话（`dialog`，8 行）。听力材料必须建立在这三者之上。

**第二步：按下列规格重写每条。**

正文（`text`）要求：
- 长度 80–150 词（保持现有量级）。
- **必须是有具体情境、具体人物、具体冲突或进展的独白或对话**，不是"两个人讨论了一个日常情况"这种空壳描述。给人物真名、给具体地点、给具体事件。
- 自然地包含该课语法点的 3–5 处实际用例（例如虚拟式课就要有多处真实的虚拟式触发场景，而不是只在引号里塞两个例句）。
- 复用该课核心词至少 6 个。
- 24 条之间**场景不得重复**：分散到工作、租房、就医、旅行、学业、社交、消费、交通、家庭、社区、媒体、行政手续等不同场景。
- 语体和难度对齐 B1：可以有从句和时态混用，但不要出现 B2 才教的结构（虚拟式未完成过去时、条件句第二三型）。

题目（`questions`）要求：
- 每条 2–3 题。
- **题干必须针对该条正文的具体内容**，问具体的人做了什么、原因是什么、结果如何、某个数字或时间是多少。禁止出现"第二个人做了什么""对话怎么结束"这类可以套用到任何材料的通用问法。
- 至少有一题考该课语法点承载的信息（例如虚拟式课，可以问"说话人希望对方做什么"，答案必须从虚拟式从句里取）。
- 三个选项都要是**基于正文的合理干扰项**（说了但不是问的那件事、部分正确但细节错、常见误听），不要用明显荒谬的选项凑数。
- `answer` 的索引在 24 课总计约 50–70 题里要**大致均匀分布在 0/1/2**，不要集中在 0。
- `tip` 要指向正文的具体位置或线索（"注意她解释原因的那句"），不要写"听第二句"这种和内容脱钩的话。

**第三步：数据结构保持不变**，仍是以课程 ID 为键的对象，字段 `id` / `text` / `questions[{q, options, answer, tip}]`。不要改结构，否则骨架里的渲染和 smoke 断言都要动。

**工作量提示**：24 课，每课约 15 分钟，预计半天。这是本轮的主体工作，不要为了赶进度再次套模板——如果套模板，等于什么都没修。

---

## 任务二：修复 3 处数据 bug

### 2.1 哥伦比亚听力的语音代码错误

`index.html` 行 48545–48548（源头在 `build/data/quiz-extra.js` 的 `LISTENING_LA`），第三条：

```json
{
  "id": "la-co",
  "label": "哥伦比亚 · es-MX",
  "lang": "es-MX",
  ...
}
```

`label` 和 `lang` 都填了 `es-MX`，应为 `es-CO`。现状是用墨西哥口音朗读哥伦比亚材料，所谓"三种拉美口音对比"实际只有两种。

改为 `"label": "哥伦比亚 · es-CO"`、`"lang": "es-CO"`。同时在朗读逻辑里确认：如果用户设备没有 es-CO 语音包，要能优雅降级到其他拉美语音而不是静默失败——检查 `pickSpanishVoice`（`index.html` 行 48710 附近）和听力模块实际调用的朗读路径，确保 `lang` 指定的语音不存在时有 fallback，并在界面上提示"当前设备无该口音语音，已用 XX 代替"。

### 2.2 阿根廷听力缺 voseo

同一个 `LISTENING_LA` 里 `la-ar` 那条，说明写着"voseo 识别语境"，但正文没有任何 voseo 形式（没有 `vos`、`tenés`、`sos`、`querés`、`podés`）。标签与内容不符。

重写这条正文，自然地包含 3–4 处 voseo 形式（例如 `¿Vos sabés dónde queda?` / `Tenés que llegar temprano` / `Si querés, te acompaño`），并在 `zh` 或新增一个说明字段里标注"阿根廷 voseo：vos + 变位（sabés/tenés/querés），对应西班牙的 tú sabes/tienes/quieres"。voseo 只要求被动识别，不要求学习者主动产出，所以题目不要考"怎么把 tú 改成 vos"，而要考"听懂说了什么"。

### 2.3 阴阳性各有含义的词条处理

`build/data/words-p4.js` 行 28（`index.html` 里对应词条）：

```javascript
{ id: "w1428", word: "orden", pos: "n", gender: "f", article: "la", ... zh: "命令；顺序", ... }
```

`orden` 是阴阳性各有含义的词：`el orden` = 顺序/秩序，`la orden` = 命令。现在只标 `gender: "f"` 但 `zh` 同时给了"命令；顺序"两个义，会让学习者以为"顺序"也是阴性。

处理方式（二选一，选定后全局一致）：
- **方案 A（推荐）**：拆成两个词条，`el orden`（顺序）和 `la orden`（命令），各自配对应例句。
- **方案 B**：保留单条，但 `zh` 明确写成"（la）命令；（el）顺序"，并在词条加 `gender_note` 字段说明，同时确认骨架里词卡和冠词测验会显示这个字段。

**另外请全库扫一遍同类词**，把 `gender` 单值但 `zh` 含多义的词条找出来核对。常见的阴阳性异义词：`el/la orden`、`el/la mañana`（早晨/上午 vs 明天）、`el/la capital`（资本 vs 首都）、`el/la cura`（神父 vs 治疗）、`el/la guía`（导游 vs 指南）、`el/la papa`（教皇 vs 土豆）、`el/la policía`（警员 vs 警方）。发现的一并按选定方案处理。

---

## 任务三：补上校验盲区

### 问题

`build/smoke.js` 现有 77 条断言全绿，`assemble.js` 有 400 多行内容校验，但都**只验数量和字段存在，不验内容区分度**。任务一那个模板问题就是这样漏过去的——smoke 里的 `if (!l.listening) throw ...` 只检查字段在不在。

### 要加的校验

在 `build/assemble.js` 的内容校验区新增（失败要 `process.exit(1)`）：

1. **听力正文去重**：把每条 `LISTENING_ALL` 的 `text` 去掉 `«...»` 引号内的内容后做归一化比对，任意两条相同则报错。这条专门拦"同模板换例句"。
2. **听力题干去重**：任意两条听力之间，`questions[].q` 不得完全相同集合；单条内部两道题的 `q` 也不得相同。
3. **答案分布检查**：`LISTENING_ALL` 全部题目的 `answer` 索引，任一取值占比不得超过 60%。
4. **选项内容去重**：任意两条听力的 `options` 数组不得完全相同。

在 `build/smoke.js` 补对应的端到端断言（至少 2 条），确保生成物层面也拦得住。

**顺带**：TASKBOOK 第一轮备注里提到"build/smoke.js 两条旧断言（SRS 阶梯、localStorage 单 key）与新设计不符，待后续更新"——本轮一并修掉这两条过时断言，别再挂着。

---

## 任务四：同步文档

1. **更新 `esbrain-handoff.md`**：当前它记的是第四轮完成，而 TASKBOOK 记到第五轮，两份文档不同步。把 handoff 更新到本轮（5.5）完成后的真实状态：轮次表、数据文件清单（补 `words-p4.js`）、screen 列表（补 `screen-subjunctive`、`screen-shadowing`、`screen-listening-la`）、状态结构、以及项目路径从 `C:\Users\Administrator\esbrain` 改为 `D:\esbrain`。
2. **更新 `TASKBOOK.md`** 进度表，加一行第 5.5 轮，写明修了什么。
3. **在 handoff 的"常见陷阱/约定"里加一条**：内容型数据（听力、对话、例句、题目）禁止用固定模板批量生成，assemble 已加去重校验会直接拦下。

---

## 验收标准

跑完 `node build/assemble.js` 和 `node build/smoke.js` 后：

- assemble 输出 `SYNTAX_OK` + `ALL_CONTENT_CHECKS_PASSED`，新增的 4 条内容校验全过。
- smoke 全绿，条数应从 77 增加（新增听力质量断言 + 修掉 2 条过时断言）。
- 人工抽查任意 3 课 B1 听力：正文场景各不相同、题目针对具体内容、不看正文答不出来。
- `LISTENING_LA` 三条的 `lang` 分别是 `es-MX` / `es-AR` / `es-CO`，阿根廷那条正文含 voseo。
- 阴阳性异义词处理一致，冠词测验不会出现自相矛盾的题。
- `sw.js` 的 `CACHE_NAME` 已 bump 到 v9。

---

## 不要做的事

- 不要在本轮顺手开始第六轮（B2 内容）。本轮只修复，改动范围可控才好验证。
- 不要为了让新校验通过而删减听力条目——24 课都要有，且都要是真实内容。
- 不要改 `LISTENING_ALL` 的数据结构，骨架渲染和断言都依赖它。
- 不要动动词引擎（`build/data/verbs.js`）。审核确认那部分 3960 个变位格全字段齐全、旧 20 词逐格回归 0 差异，是当前质量最高的模块，别碰。
