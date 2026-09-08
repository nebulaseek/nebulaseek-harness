# Agent Note：出厂品牌改为星云寻知，用户可见文案去掉“Harness”

Status: implemented

[English](2026-09-08-xingyunxunzhi-brand.md) | 中文

## 问题

本仓库是下游发行版，但每一处品牌界面仍然是 DeepSeek 的身份：侧栏与会话首屏渲染上游鱼形标记，文字标识以矢量字形拼出上游名称，两个 favicon 与 Web manifest 都带着这条鱼，文档、CLI 描述、system prompt 身份行和录制快照中共有 526 处文字写着“DeepSeek Harness”。[`BRAND_GUIDELINES.zh.md`](../../../../BRAND_GUIDELINES.zh.md) 本身就写明“DeepSeek Harness”是注册商标、下游项目不得在项目名中使用，因此保留这些界面不只是观感问题，也是许可问题。

npm scope、`dsh` 命令、`DSH_*` 环境变量和 `deepseek_harness` Python 模块属于另一类名字：它们解析已发布产物和导入方，重命名需要以本项目并不拥有的名字重新发布。

## 决策

品牌界面改为星云寻知 / Xingyunxunzhi；分发标识不动。产品名不带后缀：是「星云寻知」而不是「星云寻知 Harness」，锁定图形到名称为止。

用户可见文案把该组件称作内核 / 內核 / Core，而不是 Harness——涉及欢迎弹窗与根 README 的品类说明。代码标识符（`HarnessError`、`HarnessClient`、`makeHarness`、`harness.run`、`HARNESS_HOME`）、目录名与 `xingyunxunzhi-harness` 仓库名保留该技术术语，因为改名属于破坏性 API 变更，且不带来任何品牌可见度收益。

[`BrandLogo`](../../../../packages/client/ui-primitives/src/BrandLogo.tsx) 取代 `FishLogo`，并自带图形本身的两条渐变而不随 `currentColor`，因为这个标记必须在浅色与深色界面上保持同一个身份。两条渐变的 id 都取自 `useId`，因此侧栏的两个渲染点与会话首屏不会相互冲突。[`BrandWordmark`](../../../../packages/client/ui-primitives/src/BrandWordmark.tsx) 在同一套几何上以 `<text>` 绘制名称取代烘焙字形，并去掉上游锁定图形结尾的填充产品徽标；名称是模块常量，标明它是文字标识的字面，而不是由 locale 字典拥有的文案。

[会话首屏](../../../../packages/client/ui-conversation/src/client/skeleton/EmptyHero.tsx)回退去掉了 SMIL 游动形变。形变目标是按鱼形几何手工推导出的变形——摆尾与摆鳍——对云形没有意义。样式表的悬停摇摆以 `hero-mark-float` 保留，因此悬停仍有动画。

文字替换按行判断语种：含 CJK 的行取 `星云寻知`，其余行取 `Xingyunxunzhi`。录制快照沿用同一替换，与它们捕获的 system prompt 和 Web GUI 字符串保持一致。

`BRAND_GUIDELINES` 重写为本项目自身的规范，并新增上游归属一节，写明 MIT 来源、声明不存在隶属关系，并记录保留上游标识的原因。

## 备选方案

- 连同 npm scope、`dsh` 与 `deepseek_harness` 一并改名：本项目无法在 `@deepseek-ai` 下发布，改名会破坏所有导入方，而这些名字都不出现在 UI 中，品牌可见度没有收益。
- 保留 `FishLogo` 导出名只换图形：这个名字将无法描述文件里的任何东西。
- 把新标记改成 `currentColor` 以与图标集一致：渐变本身就是品牌，而图标集的规则存在是为了让字形继承周围墨色，标志不应如此。
- 把上游 Discord 与企微社区链接改指本项目：那是上游的渠道，其二维码图片由 `cdn.deepseek.com` 提供。改为删除该小节。

## 影响

`FishLogo`、`FISH_LOGO_PATH` 与 `FISH_LOGO_VIEWBOX` 已从 `dsh-client-ui-primitives` 的 barrel 中移除；使用方改用 `BrandLogo` 与 `BRAND_LOGO_*` 常量。文字标识的固有宽度由 182 变为 100（不含标记时为 72），任何硬编码这些数字的布局都需要复查。

[`sidebar-snapshot.client.spec.tsx.snap`](../../../../packages/client/ui-sidebar/tests/__snapshots__/sidebar-snapshot.client.spec.tsx.snap) 已重新录制：三个渲染点的品牌标记均为 `viewBox="0 0 50 50"` 的 24x24。

三个 spec 钉住了本次移动的文案，已随之更新：欢迎弹窗的英文正文，以及文档站投影的首页标题与 llms.txt 标题。两个语种的首页不再共用同一个标题，该断言改为按 route 各自校验对应的品牌形式。

`pnpm run test` 通过 19232/19620，三个失败文件均未被本次改动触及：`code-runtime-python` 需要 CPython 3.10 及以上而宿主为 3.9.6，`spawn-runner` 校验的是 Windows PATH 语义。`typecheck`、`lint`、`doc-sync`、`test:snapshot` 与 `test:expected` 仍未运行。

`LICENSE` 保留上游版权声明；DeepSeek 模型服务的标识——`DeepSeekAdapter`、`deepseek-official`、`web-search-deepseek`、`DEEPSEEK_API_KEY`——均未改动，因为它们指向的是一个模型服务，而不是本产品。
