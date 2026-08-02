# ESbrain 项目 Handoff

**更新时间**: 2026-08-03
**项目路径**: `D:\esbrain`
**当前状态**: 路线图第 5.5 至第八轮均已完成并验收；根目录 `index.html` 是生成物。

## 1. 项目与工作流

ESbrain 是离线单文件 PWA 西语自学工具，课程从 A1 覆盖至 B2。

- 不要直接编辑根目录 `index.html`。UI 和运行时逻辑在 `build/skeleton.html`，内容数据在 `build/data/*.js`。
- 每次改动后必须依次运行：
  ```powershell
  node build/assemble.js
  node build/smoke.js
  ```
- `sw.js` 目前使用 `esbrain-v12`。仅在新的功能轮次结束时升级缓存版本。
- 不改 SRS 行为；除已完成的 B2 时态扩展外，不改动词规则和例外结构。

## 2. 已完成轮次

| 轮次 | 主要交付 | 最终验证 |
|---|---|---|
| 一至四 | 地基、专项、动词系统、A1 至 A2.1 课程与时态填空 | 已完成 |
| 五 | B1.1/B1.2 24 课、虚拟式专项、跟读、拉美听力 | 已完成 |
| 5.5 | B1 24 条具体情境听力与对话、拉美语音和异性同形词修复 | smoke 81 / 0，sw v9 |
| 六 | A2.2 12 课、g062 至 g073，阶段 P3B | 2800 词、72 课、73 语法；smoke 82 / 0，sw v10 |
| 七 | B2.1/B2.2 24 课、g074 至 g097、B2 时态、40 个口语自查任务 | 3825 词、96 课、97 语法；smoke 86 / 0，sw v11 |
| 八 | 学习计划向导、分级错题/周报、私密 Gist 备份与冲突选择 | smoke 89 / 0，sw v12 |

### 第八轮验收细节

- 首次向导收集目标级别、每日 15/30/60 分钟和学习偏好。每日计划保持建议性质，不锁课程。
- 计划使用真实到期词数；每周日按本周打卡完成率重算：低于 60% 自动减至 75%，高于 90% 增至 120%。首页始终显示课程、到期复习、语法、听力、重音五项任务。
- 错题本分为词汇、语法与专项、听力。课程听力错答会写入 `listening`，拉美听力错答会写入 `listeningla`，周报使用真实错题日志。
- Gist token 只保留在本机状态；普通导出、快照导出和 Gist 上传均剥离 token。`lastSync` 分叉时要求选择本地上传、采用云端或手动导出，绝不静默覆盖。
- 浏览器实际验收已覆盖：向导第三步生成 B2/60 分钟/偏听说计划、首页五项任务、课程听力先听后看与错答归档、错题本听力分类、周报听力统计、设置页 Gist 面板。

## 3. 当前数据与代码地图

### 阶段

`build/data/core.js` 的阶段链为：`P0 -> P1 -> P2 -> P3 -> P3B -> P4 -> P5 -> P6 -> P7 -> null`。

### 数据文件

| 文件 | 作用 |
|---|---|
| `core.js` | 阶段、字母、音素、发音规则和解锁测验 |
| `words-p1a.js` 至 `words-p3.js` | A1.1、A1.2、A2.1 课程数据 |
| `words-p4.js`、`b1-authentic.js` | B1 词汇与运行时采用的具体对话/听力 |
| `words-p6.js`、`a22-grammar.js` | A2.2 课程与 g062 至 g073 |
| `words-p7.js`、`b2-grammar.js` | B2 课程与 g074 至 g097 |
| `grammar.js` | g001 至 g061 |
| `verbs.js` | 60 动词和 B2 完成时/虚拟式扩展 |
| `quiz-extra.js` | 重音、专项题、拉美听力、时态填空 |
| `speaking.js` | 20 个角色扮演和 20 个即兴陈述任务 |
| `verbs-legacy-fixture.js` | 旧 20 动词回归 fixture |

### 运行时要点

- `build/skeleton.html`：屏幕注册、学习流、SRS、向导、计划、错题、周报、Gist 同步。
- `dailyPlan()`：根据上一个完整周的完成率调整计划；周日以当周为已完成周。
- `answerLessonListening()`：课程听力只记录首次作答；错答调用 `addSkillMistake('listening')`。
- `SKILL_MISTAKE_META`：听力项必须使用 `quizType: 'listen'`，以便错题本和周报归类。
- `exportableState()`：必须继续剥离 `cloudBackup.token`。

### 状态结构

```js
{
  onboarding: false,
  progress: { completed: [], p0Passed: false },
  reviews: [],
  reviewLog: [],
  mistakes: [],
  mistakeLog: [],
  skillMistakes: [],
  skillMistakeLog: [],
  settings: { dailyGoal, voiceRate, theme, variant },
  learningPlan: { level, minutes, focus, configuredAt },
  cloudBackup: { token, gistId, lastSync },
  checkins: {},
  streak: { current, lastDate, makeupUsed, makeupDates }
}
```

## 4. 最后验证结果

- `node build/assemble.js`: `SYNTAX_OK (3 script blocks)`、`ALL_CONTENT_CHECKS_PASSED`
- `node build/smoke.js`: `89 passed, 0 failed`
- 内容规模：3825 词、96 课、97 条语法、60 动词、40 个口语任务。
- 所有用户操作可在课程间自由跳转；学习计划只提供建议。

## 5. Git 与后续工作

- 已提交：`eaa4319 Complete round 7 B2 curriculum and speaking`、`0707524 Complete round 8 learning plans and safe Gist sync`。
- 当前需要提交的是第八轮审计收尾：课程听力错题归类、计划完成率/五任务 smoke 覆盖、生成的 `index.html`、以及本 handoff 和 `TASKBOOK.md` 的最终数字。
- 工作区有用户已有的无关改动和未跟踪文件；提交时只能显式暂存本轮文件，禁止 `git add .`。
