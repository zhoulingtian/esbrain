# ESbrain 任务书

**依据**:`C:/Users/Administrator/Desktop/esbrain-plan.md`(Claude 方案),已对照现有代码核实。
**目标**:把现有 ESbrain(单文件 PWA,`index.html` ~14k 行,706 词,20 动词 × 5 时态)按轮次改造为零基础 → B2 的西语自学工具。
**执行方式**:每轮完成后验证(浏览器可开、功能可用、数据兼容),再进入下一轮;每轮结束更新本文件的进度表。

---

## 现状基线(已核实,2026-07-29)

- SRS:`REVIEW_INTERVALS = [1,3,7,15,30]` 固定阶梯、30 天封顶(`index.html:13109`),无 ease factor,复习记录 `{wordId,due,interval,reps,lastReview}`(`:13011`)。
- 存储:仅 `localStorage` + 手动导出 JSON(`:14093`),无自动快照、无云备份。
- 变体:写死 es-ES(`pickSpanishVoice` `:13124`),无地区变体设置;vosotros 变位全量存在。
- 动词实验室:20 词 × 5 时态(presente/perfecto/indefinido/futuro/condicional),无 imperfecto、虚拟式、命令式。
- 已有课文级内容:ser/estar 入门(g0xx)、重音规则、阴阳性例外、indefinido 规则。
- 缺失模块:重音听辨训练、ser/estar 快答、por/para、两过去时段落填空、假朋友、成段听力、变位填空测验、时态选择测验。

## 与方案的偏差(执行前已确认)

1. **GitHub Gist 云备份从第一轮移到第七轮(可选增强)**。第一轮先做本地自动快照(IndexedDB,每周一份)+ 导出强化。原因:Gist 需要用户 token,无法在本环境验证,先把无外部依赖的部分做扎实。
2. 变体设置第一轮只接 **TTS 语音选择**与设置项存储;vosotros/ustedes 人称表过滤等内容层改造并入第三轮(动词系统)。

---

## 第一轮:地基修复

**范围**
1. SRS 算法重做(`:13109`、`:13563` rate()、`:13490` addToReview、`normalizeState` `:13044`):
   - 复习记录增加 `ease`(初始 2.5)与 `suspended`(默认 false)字段,导入旧数据时自动补默认值。
   - 新算法:easy → ease+0.15、间隔 × ease;mid → 间隔 × ease;hard → ease−0.2(下限 1.3)、间隔 ×1.2;间隔上限 365 天,下限 1 天,向上取整。
   - hard 时卡片当天重新入队(队尾),与 Anki 一致。
   - 复习页显示"未来 7 天 / 30 天复习负载"数字;错题本或词库行提供"暂缓/恢复"操作,suspended 词不进复习队列和测验池。
2. 备份强化:每周日(首次打开时)自动把 state 快照存入 IndexedDB(保留最近 8 份),设置页可查看快照列表并恢复/导出任一份。
3. 设置页新增"地区变体":`es-ES`(西班牙)/ `es-LA`(拉美),默认 es-ES;`pickSpanishVoice` 按变体优先选 es-es 或 es-mx/es-us;语音自检提示随变体更新文案。

**验收**
- 旧 localStorage 数据(`esbrain_v1`)导入后自动补 ease/suspended,不丢复习进度。
- rate('easy') 三次后间隔可超过 30 天;hard 后 ease 降到 ≥1.3 且间隔只 ×1.2。
- 设置页切换变体后,朗读实际使用对应口音语音。
- 快照在 IndexedDB 可见、可恢复。

## 第二轮:西语专属模块(一)

**范围**
1. 新增"重音训练"模块:规则课文已有,新增"听音标重音位置"练习(播放词 → 点击重音音节),词库词需补 `stress` 字段;先覆盖已学词中含重音符号或非常规重音的词(约 100-200 词)。
2. 新增"ser/estar 快答":二选一高频快答,含改义形容词搭配(ser listo / estar listo 等),题量 ≥60。
3. 新增"por/para 场景选择":完整句子上下文选择题,题量 ≥50。
4. 发音模块核查:现有规则收敛为 6-8 条核心(seseo/ceceo、yeísmo、r/rr、h 不发音、g/j、qu/gu、ñ),多余内容移入课程备注。
5. "选冠词"测验改造为例外名词专项(el problema、la mano、el agua、-ista 通性词等,清单约 40 词)。
6. 新增"假朋友"模块:embarazada、éxito、actualmente、realizar、asistir、sensible、carpeta、largo 等 ≥24 条,每条含错误理解、正确含义、"那个词"的真正西语说法。

**验收**:三个新模块均可从工具箱进入并完成一轮练习;冠词测验只考例外词。

## 第三轮:动词系统

**范围**
1. 动词库 20 → 60 词;时态 5 → 14:补 imperfecto、pluscuamperfecto、虚拟式现在时、虚拟式未完成过去时、命令式(肯定/否定)、动名词、过去分词(后两者作为形式而非完整时态行)。
2. 简单过去时不规则形式独立练习池(ser/ir、tener、estar、hacer、decir、poder、poner、saber、querer、venir、traer、dar、ver)。
3. stem-changing 三类(e→ie / o→ue / e→i)分组练习。
4. 新增"变位填空"测验类型(给不定式+人称+时态,键盘输入,复用软键盘)。
5. 变体设置接入动词模块:es-LA 时人称表隐藏 vosotros 行、只显示 ustedes。

**验收**:60 词 × 14 时态数据完整可浏览;不规则过去时池可刷;变位填空判分正确(含重音符号)。

## 第四轮:A1–A2 内容

**范围**:词汇 706 → 1300(DELE A1-A2 分级词表为准,不批量生成生僻词);课程补齐 24 课;新增"时态选择"段落填空模块(indefinido/imperfecto 二选一,成段叙事文本,≥15 段);词条补 `stress`、`variant`、`altWord` 字段。预生成音频本轮暂缓(无 TTS 后端),listening 字段先留空。

**验收**:词库分级筛选正确;段落填空可完整做题并讲解。

## 第五轮:B1 内容

**范围**:词汇 → 2400;新增 B1 课程 24 课;虚拟式现在时完整模块(WEIRDO 触发场景 + 练习);发音跟读(`SpeechRecognition`,`lang='es-ES'`,不支持时降级 MediaRecorder 录音回放)。

## 第六轮:B2 内容与产出

**范围**:词汇 → 3800;B2 课程 24 课;虚拟式未完成过去时 + 条件句三型模块;口语任务模块(角色扮演提示卡 + 两分钟即兴陈述计时器);语体差异对照(书面/口语、西班牙/拉美)。

## 第七轮:辅助与增强

**范围**:GitHub Gist 云备份(token + gist id 设置项,lastSync 冲突检测);学习计划向导(目标级别 + 每日时间 → 每日任务,周日调整);错题本分类 + 周报增强;可选文化模块;可选"法语对照"开关(词条加 `fr` 字段,默认关闭)。

---

## 进度

| 轮次 | 状态 | 完成日期 | 备注 |
|------|------|---------|------|
| 一 地基 | 已完成 | 2026-07-29 | SRS 改 SM-2 简化版(ease/suspended);IndexedDB 每周快照(8 份);地区变体 es-ES/es-LA;sw.js 缓存 bump v2。注:build/smoke.js 两条旧断言(SRS 阶梯、localStorage 单 key)与新设计不符,待后续更新 |
| 二 专属模块(一) | 已完成 | 2026-07-29 | 重音训练 76 词(新 screen-stress,音节人工标注);ser/estar 66 题、por/para 59 题、假朋友小测走测验中心数据驱动类型(serestar/porpara/ff,带解析);冠词测验改例外专项 40 词(含通性题);发音规则收敛 8 核心+7 细节折叠;假朋友 31 词条新 screen;sw.js 缓存 bump v3 |
| 三 动词系统 | 已完成 | 2026-07-29 | 变位引擎（data/verbs.js，词尾规则表+例外覆盖）60 词 × 14 时态；旧 20 词经 build/verbs-legacy-fixture.js 逐格回归（600 格 0 差异）；动词实验室时态四组标签页；es-LA 隐藏 vosotros 并带快捷切换；测验中心新增变位填空 conj（软键盘严格判重音、词尾规律提示）；工具箱新增不规则过去时（14 组）与词干变化三组练习（变化格 85% 权重）；smoke 基准断言 594 格 + 功能测试共 61 条全过；sw.js 缓存 bump v4 |
| 四 A1-A2 | 已完成 | 2026-07-29 | 词库 706→1328(去重后);A2.1 十二课(g026-g037);时态选择段落填空 16 段/122 空(新 screen-cloze,indefinido/imperfecto 二选一,答过锁定,逐空 tip);sw.js 缓存 bump v6;assemble + smoke 69 条全过;去重移除 31 条完全重复词条(原有重复,无功能影响);listening 字段本轮暂缓 |
| 五 B1 | 已完成 | 2026-07-30 | 词库 1328→2424（去重后）；新增 B1.1/B1.2 共 24 课（P4/P5），每课 13 核心词 + 26 扩展词、8 行对话、80–150 词 TTS 听力与 g038–g061；虚拟式现在时 WEIRDO 专项 90 题（选择/软键盘/连词）；新增 41 句发音跟读（SpeechRecognition 优先，MediaRecorder 回放降级）和 3 则 es-MX/es-AR 拉美听力对比。后续教学闭环补强：B1 听力接入课程（先听后看+理解题）、拉美材料加入理解题与实际语音提示、发音自检可重做、工具按等级推荐但不锁课、专项错题可定向复习；修正重音与虚拟式内容；assemble + smoke 77 passed, 0 failed；sw.js 缓存 bump v8。|
| 六 B2 | 未开始 | | |
| 七 辅助 | 未开始 | | 含 Gist 备份 |
