# ESbrain 接手说明

更新日期：2026-07-30

## 当前交付状态

- 工作区：`D:\esbrain`
- 线上仓库：`https://github.com/zhoulingtian/esbrain`
- 默认分支：`main`
- 最近合并：PR #1，合并提交 `a4807657e5584f37f56d205c902766493d1024cd`
- GitHub Pages：`https://zhoulingtian.github.io/esbrain/`
- Pages 来源：`main` 分支根目录，HTTPS 已启用。
- 本地目录当前没有 `.git`；不要假定可用本地 Git 推送。此前通过便携版 `D:\FrBrain\法语工具\tools\gh\current\gh.exe` 发布。

## 架构与修改边界

这是离线优先的单文件 PWA。根目录 `index.html` 是生成物，**不要直接编辑**。

| 修改类型 | 源文件 |
| --- | --- |
| UI、样式、运行时代码 | `build/skeleton.html` |
| 核心内容数据 | `build/data/core.js` |
| B1 词汇、课程、对话、课程听力 | `build/data/words-p4.js` |
| 虚拟式、跟读、拉美朗读等专项数据 | `build/data/quiz-extra.js` |
| 组装与结构校验 | `build/assemble.js` |
| 回归测试 | `build/smoke.js` |
| PWA 缓存策略 | `sw.js` |

## 标准工作流

在 `D:\esbrain` 执行：

```powershell
node build/assemble.js
node build/smoke.js
```

先组装，后冒烟测试。组装会覆盖根目录 `index.html`。当前基线：

```text
ALL_CONTENT_CHECKS_PASSED
SMOKE: 77 passed, 0 failed
```

凡是影响已部署资源的大更新，必须把 `sw.js` 的 `CACHE_NAME` 从当前 `esbrain-v8` 递增，例如下一次为 `esbrain-v9`，然后重新组装和测试。否则已安装用户可能继续命中旧缓存。

## 已完成内容

- 第五轮 B1 已完成：词库共 2424 词，B1.1 / B1.2 共 24 课（P4 / P5）。
- 每节 B1 课含核心词、扩展词、8 行对话、语法、80-150 词 TTS 听力和理解题；流程为先听、再显示原文、再答题。
- 虚拟式现在时 WEIRDO 模块含 90 题。
- 发音跟读含 41 句：优先 `SpeechRecognition`，不支持时降级为 `MediaRecorder` 录音回放。
- 拉美朗读对照有 es-MX / es-AR TTS 选择、3 则材料和理解题。浏览器的实际可用语音决定最终口音，界面不可保证具体音色。
- 课程全部开放，不要恢复进度锁；首页和工具箱仅作等级推荐。
- 工具错误会写入错题本，可针对语法、听力、重音和填空进行复习。

## PWA 与手机使用

- `manifest.json` 使用 `display: "standalone"`，提供 192 和 512 图标。
- `index.html` 已链接 Manifest 并注册 Service Worker；`sw.js` 负责核心资源预缓存和离线回退。
- GitHub Pages 线上核验：主页、`manifest.json`、`sw.js` 均返回成功；Manifest 为 standalone，缓存为 `esbrain-v8`。
- 手机应通过 HTTPS 地址首次联网打开，然后用浏览器“添加到主屏幕”安装。直接双击本地 HTML 不会启用 Service Worker。

## 维护约束

- 保持既有风格：行内 `onclick`、模板字符串、中文注释；不引入新依赖。
- 内容变更需人工审读西语：变位、重音、性别、代词位置和虚拟式形式。
- 词汇新增须保持 ID 连续；多音节新词需有 `stress`；地区异称需有 `variant` 或 `altWord`。`assemble.js` 已校验这些结构。
- 不要将缓存、临时工具或大生成物写到 C 盘；优先放在 D 盘或项目内。
- 项目中 `.publish-payload` 是此前 GitHub Git Data API 发布的临时请求载荷；不包含凭据，可忽略。若清理须先确认其不再用于恢复发布。

## 建议接手顺序

1. 阅读 `TASKBOOK.md`、`esbrain-handoff.md`、`esbrain-plan.md`。
2. 修改 `build/` 内源文件，不改根目录生成物。
3. 运行 assemble 与 smoke，并在真实浏览器检查手机宽度页面、控制台和离线安装流程。
4. 大更新时升级缓存版本。
5. 发布前重新确认远端 `main` 和 Pages 构建状态；本地没有 Git 元数据时，使用已登录的便携 `gh.exe` 或重新克隆仓库到 D 盘。
