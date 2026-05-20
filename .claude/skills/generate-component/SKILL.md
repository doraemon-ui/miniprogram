---
name: generate-component
description: 基于 `wux-weapp` 源码生成或重构 `packages/miniprogram.*` 组件，优先对齐 `packages/miniprogram.button` 的目录结构、代码风格、类型定义、文档、测试和 playground。
allowed-tools: Bash(npm *), Read, Grep, Write
---

# generate-component

## Context

- 参考实现：`packages/miniprogram.button`
- 目标组件目录：`packages/miniprogram.$COMPONENT`
- 外部源码来源：`wux-weapp` 对应组件
- 默认目标：不是“随便生成一个能跑的组件”，而是生成**可发布、可测试、可文档化、可 playground 演示**的 Doraemon UI 小程序组件

## 适用场景

- 从 `wux-weapp` 迁移一个新组件到 `packages/miniprogram.$COMPONENT`
- 将已有占位组件替换成真正实现
- 对现有组件进行“按 wux 源码重新对齐”的结构化重做

## Workflow

### 1. 先建立上下文

先读取这些文件：

1. `packages/miniprogram.button/package.json`
2. `packages/miniprogram.button/src/index.ts`
3. `packages/miniprogram.button/src/index.wxml`
4. `packages/miniprogram.button/assets/index.less`
5. `packages/miniprogram.button/assets/variables.less`
6. `packages/miniprogram.button/src/types.ts`
7. `packages/miniprogram.button/__tests__/index.spec.ts`
8. `packages/miniprogram.button/README.md`
9. `packages/miniprogram.$COMPONENT/src/*`
10. `packages/miniprogram.$COMPONENT/assets/*`
11. `packages/miniprogram.$COMPONENT/__tests__/*`
12. `packages/miniprogram.$COMPONENT/README.md`

同时确认：

- 目标包是否已经存在
- 现有实现是占位版本、半成品还是已有真实逻辑
- 该组件在 `wux-weapp` 中是基础组件、复合组件还是依赖 relation / popup / shared API 的组件
- 如果 `wux-weapp/src/$COMPONENT` 存在真实源码，后续实现默认以它为唯一行为来源；除 Doraemon UI 命名、类型和必要运行时适配外，不要自行发明 props、方法、事件、状态字段、helper 层或样式结构

### 2. 默认判断规则

#### 若目标包已存在

- 默认**保留现有目录结构**
- 优先改写 `src`、`assets`、`types`、`README`、`__tests__`、`playground`
- 不要删除已有包配置、测试脚手架、playground 目录，除非确认是错误内容
- 如果现有实现只是占位版本或已经偏离来源源码，需要主动删除这些“旧壳子能力”，不要为了兼容旧实现而保留来源里没有的 props / methods / helper / less 结构

#### 若目标包不存在

- 按 `packages/miniprogram.button` 的结构补齐：
  - `src/index.ts`
  - `src/index.wxml`
  - `src/index.less`
  - `src/index.json`
  - `src/types.ts`
  - `assets/index.less`
  - `assets/variables.less`
  - `__tests__/index.spec.ts`
  - `README.md`
  - `package.json`
  - `index.d.ts`
  - `jest.config.js`
  - `dora.config.js`
  - `playground/pages/index/*`

### 3. TS 实现规则

#### 组件写法

- 默认使用：
  - `defineComponentHOC`
  - `@Component`
  - `@Prop`
  - `@Watch`
  - `@Event` / `@Emit`（当事件转发逻辑清晰时）
- 组件命名与目录一致，例如：
  - `packages/miniprogram.filterbar/src/index.ts` -> `class Filterbar extends Doraemon`
  - `packages/miniprogram.floating-panel/src/index.ts` -> `class FloatingPanel extends Doraemon`

#### props 规则

- 公开 props 必须写进 class，并优先使用 `@Prop`
- `prefixCls` 保留在 `@Component.props`
- 其他业务字段优先写成 `@Prop`
- 不要保留“示例式占位 props”如只有 `disabled / hoverClass / wrapStyle` 的通用空壳，除非源码确实只需要这些字段

#### 类型规则

- `src/types.ts` 必须导出：
  - `XxxProps`
  - `XxxExpose`
  - `XxxInstance`
- 所有枚举型字符串 props，优先抽成类型别名
- 复合对象 props，优先抽成 interface / type
- 若 `wux-weapp` 原始 API 过于宽泛，不要直接给 `string | any`
- 能从 `@doraemon-ui/miniprogram.shared` 复用的类型优先复用

#### 状态与副作用

- 先梳理 `wux-weapp` 组件的真实行为，再决定哪些保留为内部状态
- 来源源码里已有的方法命名、参数和职责，默认照抄；不要替换成你自己的抽象命名
- 不要把所有内部变量都暴露到类型里
- `watcher` 只保留真实需要的联动逻辑
- 若依赖 relation、popup、scroll、dom 查询，补齐最小可用的类型和调用路径
- 没有在 `wxml` / `wxs` / `less` 中直接消费的组件内部字段，统一加 `_` 前缀，例如 `_closeTimer`、`_touching`
- 若组件同时支持声明式和函数式：
  - 组件本体优先只保留声明式 props 和必要的 `onClick / onClose / onClosed` 等实例方法
  - 不要继续保留已经被函数式 helper 取代的旧实例 `show()` / `hide()` 方案
  - 函数式入口单独放到 `src/$component.ts` 或 `src/index.ts` 邻近 helper 文件中
  - 组件内部自己处理 props 到渲染状态的同步，不要在 helper 里新增 `normalizeRenderProps`、`setXxx` 之类的额外映射层

### 4. WXML 规则

- 模板结构以 `wux-weapp` 行为为准，但命名体系必须切到 `dora-*`
- 如果来源模板存在真实结构，不要为了“更通用”或“更现代”改模板层级、slot 分布、条件分支或 class 组织
- 根节点 class 默认使用：

```wxml
<view class="dora-class {{ classes.wrap }}">
```

- 需要交互时，优先使用真实小程序事件入口，不要把所有交互都压成一个抽象 click
- slot 保留策略：
  - `wux-weapp` 有明确扩展点的，保留 slot
  - 没有明确扩展点的，不要硬加 slot

### 4.1 函数式组件固定格式

- 如果组件需要像 `dialog`、`gallery`、`notification` 一样同时支持声明式和函数式，函数式 helper 默认采用固定结构：
  - `mergeOptions`
  - `clear`
  - `mountComponent`
  - `show`
- 除非来源源码明确不同，不要自定义成别的命名
- `mountComponent` 内优先通过 `usePopupStateHOC(...)` 控制 `visible`
- helper 只负责：
  - 查找组件实例
  - 注入函数式回调
  - 控制显示/销毁
- 不要在 helper 里塞组件业务状态，也不要额外包装一层与来源无关的对象结构
- 所有支持函数式的组件都不需要在 `@Component` 里声明 `expose`
- 类型上只需要补齐 `XxxExpose` 的函数属性定义
- `XxxShowProps` 优先写成：

```ts
type XxxShowProps = Omit<XxxProps, 'visible'> & XxxExpose
```

### 5. LESS 规则

#### 总原则

- 参考 `packages/miniprogram.button/assets/index.less` 的组织方式
- 不要照搬 `wux-weapp` 的 class 前缀和品牌命名，但结构、选择器关系、状态分支和视觉逻辑应尽量保持一致
- 样式变量分两层：
  - 组件语义变量：只保留确实有语义的 `--background-color`、`--text-color`、`--activated-text-color` 等
  - 主题 token：优先复用 `@doraemon-ui/style/lib/index.less` / `theme.default.less` 里的现成 token

#### 颜色规则

- 如果组件支持主题色：
  - TS 中统一使用 `color: PresetColor`
  - 引入类型：

```ts
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'
```

  - 默认值统一为 `positive`
  - classes 中补齐：

```ts
['dora-color']: color,
[`dora-color--${color}`]: color,
```

- package.json 中补齐：

```json
"@doraemon-ui/miniprogram.shared": "workspace:*"
```

- 若 `wux-weapp` 原始 API 使用 `theme`：
  - 统一改成 `color`
  - class 内所有 `theme` 引用都替换成 `color`
  - 补齐 `PresetColor` 类型断言
- LESS 中优先使用 `dora-color` 体系，而不是维护旧的 `--light / --balanced / ...` 组件私有类分支
- 自定义颜色 mixin 命名统一改成 `xxx-color(...)`，不要保留 `xxx-style(...)`
- mixin 负责生成组件内部消费的 CSS 变量，放在 `assets/index.less` 文件底部
- 组件默认颜色必须在根节点默认调用一次，例如：

```less
.tab-color(#get-color(positive)[]);

&.@{dora-prefix}-color {
  .tab-color(#current-color(base)[]);
}
```

- 除 `prefix-cls` 外，LESS 变量只有在**同一组件中被使用超过 2 个地方**时才允许定义
- 不要滥造 `--button-background-color`、`--icon-color` 这类与仓库既有模式不一致的私有变量名
- 每个组件都要根据自己真实的类名和颜色消费点设计 CSS 变量，不要直接照抄 button / tab 示例

#### 单位规则

- 默认使用 px，不沿用 `wux-weapp` 的 rpx
- 若原始样式来自 rpx，按仓库现有标准换算
- 可参考 `convert-rpx-to-px` skill，但不要机械批量替换后不校验视觉含义

### 6. package.json 规则

- 结构对齐 `packages/miniprogram.button/package.json`
- 组件名使用：
  - `@doraemon-ui/miniprogram.$COMPONENT`
- 默认依赖：
  - `@doraemon-ui/miniprogram.core-js`
  - `@doraemon-ui/style`
- 只有用到 shared 中的类型或能力时，才加：
  - `@doraemon-ui/miniprogram.shared`

### 7. README 规则

- README 不是占位页，至少要包含：
  - 组件标题与一句话描述
  - 安装方式
  - page.json 引入示例
  - playground 示例引用
  - props API 表格
  - events / slots / externalClasses
  - CSS Variables 表格

- 文档写法对齐 `packages/miniprogram.button/README.md`
- 如果组件来自 `wux-weapp`，文档内容也要改写成 Doraemon UI 口径，不要保留 `wux` 品牌或路径
- 但 API 表、事件、slot、示例代码必须优先反映来源组件的真实输入输出，不要把旧占位实现或你自定义的能力写进 README

### 8. 测试规则

- 测试文件位置：`packages/miniprogram.$COMPONENT/__tests__/index.spec.ts`
- 优先复用 `.claude/skills/generate-test/SKILL.md` 的规则
- 最少覆盖：
  - mount / unmount
  - 一个 snapshot
  - 关键 props 分支
  - 关键事件
  - 一个最容易回归的交互行为

- 不要只补快照
- 不要只测占位 props
- 优先通过真实节点事件触发行为

### 9. Playground 规则

- 每个生成组件都要有最小可演示 playground
- 如果 `wux-weapp/example/pages/$COMPONENT` 存在：
  - playground **必须优先参考该 example 页面**
  - 优先复用它的场景结构、数据流、交互入口和表单/弹层联动方式
  - 不要把复杂示例降级成静态展示壳子
  - 允许切换成 `dora-*` 组件和 Doraemon UI 口径，但不要丢掉原示例的核心行为
- 至少包含：
  - `playground/pages/index/index.json`
  - `playground/pages/index/index.wxml`
  - `playground/pages/index/index.js`
  - `playground/pages/index/index.wxss`

- 示例要覆盖该组件最核心的 1 到 3 个场景
- 对于 `form`、`picker`、`popup`、`selector` 这类复合组件，playground 不能只放 1 个静态块，必须包含来源示例中的核心交互链
- 不要保留“disabled + hover + wrapStyle”式的空壳 demo

### 10. 实施顺序

推荐严格按这个顺序推进：

1. 读 button 参考实现
2. 读目标组件当前包
3. 读 `wux-weapp` 对应组件源码
4. 先确定 props / events / slots / expose
5. 实现 `src/index.ts`
6. 实现 `src/index.wxml`
7. 实现 `assets/variables.less`
8. 实现 `assets/index.less`
9. 更新 `src/types.ts`
10. 更新 `README.md`
11. 补 `__tests__/index.spec.ts`
12. 更新 playground
13. 执行测试
14. 执行构建

### 11. 验证命令

优先在组件包目录做最小范围验证，不要直接跑全仓：

```bash
cd packages/miniprogram.$COMPONENT
pnpm test -- --runInBand __tests__/index.spec.ts
pnpm build
```

若需要再补：

```bash
pnpm serve
```

## Output requirements

- 默认以 `packages/miniprogram.button` 为结构标杆，而不是按 `wux-weapp` 原仓库布局迁移
- 优先生成真实可用实现，不接受“只有 disabled / hover / wrapStyle 的统一占位组件”
- 优先保留并改造现有包，不要无故重建目录
- 每次实现后都要同步：
  - `src`
  - `types`
  - `assets`
  - `README`
  - `__tests__`
  - `playground`
- 输出结果必须能解释：
  - 参考了哪个 `wux-weapp` 组件
  - 复用了哪些 `button` 风格约定
  - 当前组件还剩哪些未实现能力
